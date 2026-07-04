import { useEffect, useState } from "react";
import { getNotifPrefs, setNotifPrefs, getQueue } from "../services/notifications/prefs";
import type { NotificationPrefs, ScheduledReminder } from "../services/notifications/types";

export function useNotifPrefs(): [NotificationPrefs, (p: Partial<NotificationPrefs>) => void] {
  const [prefs, setPrefs] = useState<NotificationPrefs>(() => getNotifPrefs());
  useEffect(() => {
    const refresh = () => setPrefs(getNotifPrefs());
    window.addEventListener("bluedice:storage", refresh);
    return () => window.removeEventListener("bluedice:storage", refresh);
  }, []);
  return [prefs, (p) => setPrefs(setNotifPrefs(p))];
}

export function useNotifQueue(): ScheduledReminder[] {
  const [q, setQ] = useState<ScheduledReminder[]>(() => getQueue());
  useEffect(() => {
    const refresh = () => setQ(getQueue());
    window.addEventListener("bluedice:storage", refresh);
    return () => window.removeEventListener("bluedice:storage", refresh);
  }, []);
  return q;
}

export function useNotifPermission(): NotificationPermission | "unsupported" {
  const [p, setP] = useState<NotificationPermission | "unsupported">(() =>
    typeof window === "undefined" || !("Notification" in window)
      ? "unsupported"
      : Notification.permission,
  );
  useEffect(() => {
    const t = setInterval(() => {
      if ("Notification" in window) setP(Notification.permission);
    }, 2000);
    return () => clearInterval(t);
  }, []);
  return p;
}
