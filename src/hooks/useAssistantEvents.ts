import { useEffect, useState } from "react";
import type { ScheduledReminder } from "../services/notifications/types";

/** Listens for local reminder events fired by the notification scheduler. */
export function useAssistantEvents() {
  const [reminder, setReminder] = useState<ScheduledReminder | null>(null);

  useEffect(() => {
    const onReminder = (e: Event) => {
      const r = (e as CustomEvent<ScheduledReminder>).detail;
      if (!r) return;

      // Show an in-app banner when the tab is visible; toast when browser
      // notifications are unavailable and the tab is hidden.
      if (document.visibilityState === "visible") {
        setReminder(r);
        window.setTimeout(() => setReminder((cur) => (cur?.id === r.id ? null : cur)), 8000);
      } else if (!("Notification" in window) || Notification.permission !== "granted") {
        import("sonner").then(({ toast }) => toast(r.title, { description: r.body }));
      }
    };
    window.addEventListener("bluedice:reminder", onReminder);
    return () => window.removeEventListener("bluedice:reminder", onReminder);
  }, []);

  return { reminder, dismiss: () => setReminder(null) };
}