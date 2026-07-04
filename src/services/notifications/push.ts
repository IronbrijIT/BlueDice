// Push subscription: registers /push-sw.js, subscribes to PushManager using
// the VAPID public key from Notification Settings, and forwards the
// subscription JSON to the user's n8n webhook.
import { postToWebhook } from "./webhook";
import { getNotifPrefs } from "./prefs";
import { auth, db } from "../firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";


function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

export function pushSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

export async function requestPermission(): Promise<NotificationPermission> {
  if (!("Notification" in window)) return "denied";
  if (Notification.permission === "default") return await Notification.requestPermission();
  return Notification.permission;
}

export async function registerPushWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!pushSupported()) return null;
  try {
    return await navigator.serviceWorker.register("/push-sw.js", { scope: "/" });
  } catch (e) {
    console.warn("Push SW registration failed", e);
    return null;
  }
}

export async function subscribePush(): Promise<PushSubscription | null> {
  const reg = await registerPushWorker();
  if (!reg) return null;
  const key = getNotifPrefs().vapidPublicKey.trim();
  if (!key) throw new Error("Paste your VAPID public key in Notification Settings first.");
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(key).buffer as ArrayBuffer,
  });
  
  const subJson = sub.toJSON();
  await postToWebhook({ type: "push.subscribed", subscription: subJson });

  if (auth.currentUser) {
    const subId = btoa(sub.endpoint).replace(/[^a-zA-Z0-9]/g, "").slice(-20);
    try {
      await setDoc(doc(db, "users", auth.currentUser.uid, "subscriptions", subId), {
        subscription: subJson,
        updatedAt: new Date().toISOString(),
      });
    } catch (e) {
      console.error("Failed to save push subscription to firestore:", e);
    }
  }

  return sub;
}

export async function unsubscribePush(): Promise<void> {
  if (!pushSupported()) return;
  const reg = await navigator.serviceWorker.getRegistration("/");
  const sub = await reg?.pushManager.getSubscription();
  if (sub) {
    await postToWebhook({ type: "push.unsubscribed", endpoint: sub.endpoint });
    
    if (auth.currentUser) {
      const subId = btoa(sub.endpoint).replace(/[^a-zA-Z0-9]/g, "").slice(-20);
      try {
        await deleteDoc(doc(db, "users", auth.currentUser.uid, "subscriptions", subId));
      } catch (e) {
        console.error("Failed to remove push subscription from firestore:", e);
      }
    }

    await sub.unsubscribe();
  }
}

export async function getPushSubscription(): Promise<PushSubscription | null> {
  if (!pushSupported()) return null;
  const reg = await navigator.serviceWorker.getRegistration("/");
  return (await reg?.pushManager.getSubscription()) ?? null;
}
