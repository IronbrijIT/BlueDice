import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const STORAGE_KEYS = {
  history: "bluedice.history",
  favorites: "bluedice.favorites",
  notifPrefs: "bluedice.notifPrefs",
  settings: "bluedice.settings",
} as const;

let isSyncingFromServer = false;

// Helper to write to local storage and dispatch the event
function writeLocal(key: string, value: any) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("bluedice:storage", { detail: { key } }));
  } catch (e) {
    console.error("Local storage write error:", e);
  }
}

// Helper to read from local storage
function readLocal(key: string, fallback: any) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export async function syncUserData(uid: string) {
  if (isSyncingFromServer) return;
  isSyncingFromServer = true;

  try {
    console.log("Syncing user data from Firestore for UID:", uid);

    // Sync History
    const historyDocRef = doc(db, "users", uid, "data", "history");
    const historySnap = await getDoc(historyDocRef);
    const localHistory = readLocal(STORAGE_KEYS.history, []);
    if (historySnap.exists()) {
      const serverHistory = historySnap.data().items || [];
      // Merge unique by ID
      const merged = mergeById(localHistory, serverHistory);
      writeLocal(STORAGE_KEYS.history, merged);
      await setDoc(historyDocRef, { items: merged });
    } else if (localHistory.length > 0) {
      await setDoc(historyDocRef, { items: localHistory });
    }

    // Sync Favorites
    const favoritesDocRef = doc(db, "users", uid, "data", "favorites");
    const favoritesSnap = await getDoc(favoritesDocRef);
    const localFavorites = readLocal(STORAGE_KEYS.favorites, []);
    if (favoritesSnap.exists()) {
      const serverFavorites = favoritesSnap.data().items || [];
      const merged = mergeById(localFavorites, serverFavorites);
      writeLocal(STORAGE_KEYS.favorites, merged);
      await setDoc(favoritesDocRef, { items: merged });
    } else if (localFavorites.length > 0) {
      await setDoc(favoritesDocRef, { items: localFavorites });
    }


    // Sync Notification Preferences
    const notifPrefsDocRef = doc(db, "users", uid, "data", "notifPrefs");
    const notifPrefsSnap = await getDoc(notifPrefsDocRef);
    const localNotifPrefs = readLocal(STORAGE_KEYS.notifPrefs, null);
    if (notifPrefsSnap.exists()) {
      const serverNotifPrefs = notifPrefsSnap.data().prefs || {};
      const merged = { ...localNotifPrefs, ...serverNotifPrefs };
      writeLocal(STORAGE_KEYS.notifPrefs, merged);
      await setDoc(notifPrefsDocRef, { prefs: merged });
    } else if (localNotifPrefs) {
      await setDoc(notifPrefsDocRef, { prefs: localNotifPrefs });
    }

    // Sync Settings
    const settingsDocRef = doc(db, "users", uid, "data", "settings");
    const settingsSnap = await getDoc(settingsDocRef);
    const localSettings = readLocal(STORAGE_KEYS.settings, null);
    if (settingsSnap.exists()) {
      const serverSettings = settingsSnap.data().settings || {};
      const merged = { ...localSettings, ...serverSettings };
      writeLocal(STORAGE_KEYS.settings, merged);
      await setDoc(settingsDocRef, { settings: merged });
    } else if (localSettings) {
      await setDoc(settingsDocRef, { settings: localSettings });
    }

    console.log("Data sync complete.");
  } catch (error) {
    console.error("Error syncing user data:", error);
  } finally {
    isSyncingFromServer = false;
  }
}

function mergeById(local: any[], server: any[]): any[] {
  const map = new Map();
  // Server items usually take precedence or they are combined. Let's put local items first
  local.forEach((item) => {
    if (item && item.id) map.set(item.id, item);
  });
  server.forEach((item) => {
    if (item && item.id) map.set(item.id, item);
  });
  // Sort by createdAt or date if available, or just output values.
  const list = Array.from(map.values());
  list.sort((a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : a.startedAt || 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : b.startedAt || 0;
    return timeB - timeA; // Descending order (newest first)
  });
  return list;
}

export function setupSyncListener(uid: string) {
  const handleStorageChange = async (event: Event) => {
    if (isSyncingFromServer) return;
    const customEvent = event as CustomEvent<{ key: string }>;
    const key = customEvent.detail?.key;
    if (!key) return;

    try {
      if (key === STORAGE_KEYS.history) {
        const val = readLocal(key, []);
        await setDoc(doc(db, "users", uid, "data", "history"), { items: val });
      } else if (key === STORAGE_KEYS.favorites) {
        const val = readLocal(key, []);
        await setDoc(doc(db, "users", uid, "data", "favorites"), { items: val });
      } else if (key === STORAGE_KEYS.notifPrefs) {
        const val = readLocal(key, {});
        await setDoc(doc(db, "users", uid, "data", "notifPrefs"), { prefs: val });
      } else if (key === STORAGE_KEYS.settings) {
        const val = readLocal(key, {});
        await setDoc(doc(db, "users", uid, "data", "settings"), { settings: val });
      }
    } catch (e) {
      console.error("Error writing storage change to firestore:", e);
    }
  };

  window.addEventListener("bluedice:storage", handleStorageChange);
  return () => {
    window.removeEventListener("bluedice:storage", handleStorageChange);
  };
}

export function clearLocalStorage() {
  // Clear keys related to user data
  Object.values(STORAGE_KEYS).forEach((key) => {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent("bluedice:storage", { detail: { key } }));
  });
  window.localStorage.removeItem("bluedice.lastReflection");
  window.dispatchEvent(new CustomEvent("bluedice:storage", { detail: { key: "bluedice.lastReflection" } }));
}
