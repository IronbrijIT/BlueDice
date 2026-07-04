// Assistant scheduling engine — simplified to reflection reminders only.
// Runs on app boot, on focus/visibilitychange, and every 60s.

import { getNotifPrefs } from "../notifications/prefs";
import { scheduleReminder } from "../notifications/scheduler";

function dateKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Reconcile today's assistant reminders. Idempotent — safe to call often. */
export function reconcileAssistant(): void {
  if (typeof window === "undefined") return;
  const notif = getNotifPrefs();
  if (!notif.enabled) return;

  const key = dateKey();

  // Schedule a daily reflection reminder at 8 PM
  const d = new Date();
  d.setHours(20, 0, 0, 0);
  const fireAt = d.getTime();

  if (fireAt > Date.now()) {
    scheduleReminder({
      id: `assistant:reflect:${key}`,
      title: "Time to reflect 🎲",
      body: "Take a moment to roll the dice and capture today's thoughts.",
      category: "reflection",
      fireAt,
      url: `/?src=notif`,
    });
  }
}

let heartbeat: ReturnType<typeof setInterval> | null = null;

/** Mount once from the root component. */
export function initAssistant(): void {
  if (typeof window === "undefined") return;
  reconcileAssistant();
  if (heartbeat != null) clearInterval(heartbeat);
  heartbeat = setInterval(reconcileAssistant, 60_000);
  const onFocus = () => reconcileAssistant();
  const onStorage = (e: Event) => {
    const key = (e as CustomEvent<{ key?: string }>).detail?.key;
    if (key === "bluedice.notifPrefs") {
      reconcileAssistant();
    }
  };
  window.addEventListener("focus", onFocus);
  window.addEventListener("visibilitychange", onFocus);
  window.addEventListener("bluedice:storage", onStorage);
}