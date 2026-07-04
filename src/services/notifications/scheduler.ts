// Local notification scheduler. Uses browser Notification API while the tab
// is open; persists queue so reminders re-arm on load. When a webhook URL is
// set, the same event is also posted to n8n so it can deliver via push when
// the tab is closed.
import { getQueue, setQueue, getNotifPrefs } from "./prefs";
import { forwardReminder } from "./webhook";
import type { ReminderCategory, ScheduledReminder } from "./types";

const timers = new Map<string, ReturnType<typeof setTimeout>>();
const SHORT_WINDOW_MS = 6 * 60 * 60 * 1000; // 6h

function inQuietHours(now: Date): boolean {
  const p = getNotifPrefs();
  if (!p.quietHoursStart || !p.quietHoursEnd) return false;
  const [sh, sm] = p.quietHoursStart.split(":").map(Number);
  const [eh, em] = p.quietHoursEnd.split(":").map(Number);
  const mins = now.getHours() * 60 + now.getMinutes();
  const start = sh * 60 + sm;
  const end = eh * 60 + em;
  return start <= end ? mins >= start && mins < end : mins >= start || mins < end;
}

function categoryAllowed(cat: ReminderCategory): boolean {
  const p = getNotifPrefs();
  if (!p.enabled) return false;
  if (cat === "motivational") return p.motivational;
  if (cat === "work") return p.work;
  if (cat === "streak") return p.streak;
  if (cat === "reflection") return p.reflection;
  return true;
}

function fire(reminder: ScheduledReminder) {
  if (typeof window === "undefined") return;
  if (!categoryAllowed(reminder.category)) return;
  if (inQuietHours(new Date())) return;

  try {
    if ("Notification" in window && Notification.permission === "granted") {
      const n = new Notification(reminder.title, {
        body: reminder.body,
        icon: "/icon-192.png",
        tag: reminder.id,
        data: { url: reminder.url ?? "/" },
      });
      n.onclick = () => {
        window.focus();
        if (reminder.url) window.location.assign(reminder.url);
        n.close();
      };
    }
  } catch {
    /* fall through to in-app toast via event */
  }
  window.dispatchEvent(new CustomEvent("bluedice:reminder", { detail: reminder }));
}

function armTimer(r: ScheduledReminder) {
  const delay = Math.max(0, r.fireAt - Date.now());
  if (delay > SHORT_WINDOW_MS) return; // re-checked on load
  if (timers.has(r.id)) clearTimeout(timers.get(r.id));
  timers.set(
    r.id,
    setTimeout(() => {
      fire(r);
      timers.delete(r.id);
      const q = getQueue();
      if (r.repeatMs) {
        const next: ScheduledReminder = { ...r, fireAt: r.fireAt + r.repeatMs };
        setQueue([...q.filter((x) => x.id !== r.id), next]);
        armTimer(next);
      } else {
        setQueue(q.filter((x) => x.id !== r.id));
      }
    }, delay),
  );
}

export function scheduleReminder(r: ScheduledReminder) {
  const q = getQueue().filter((x) => x.id !== r.id);
  setQueue([...q, r]);
  armTimer(r);
  void forwardReminder(r);
}

export function cancelReminder(id: string) {
  clearTimeout(timers.get(id));
  timers.delete(id);
  setQueue(getQueue().filter((r) => r.id !== id));
}

export function cancelCategory(cat: ReminderCategory) {
  const keep = getQueue().filter((r) => {
    if (r.category !== cat) return true;
    clearTimeout(timers.get(r.id));
    timers.delete(r.id);
    return false;
  });
  setQueue(keep);
}

export function initScheduler() {
  if (typeof window === "undefined") return;
  const rearm = () => {
    const now = Date.now();
    const q = getQueue();
    const kept: ScheduledReminder[] = [];
    for (const r of q) {
      if (r.fireAt <= now) {
        if (r.repeatMs) {
          // advance to next future occurrence
          const missed = Math.ceil((now - r.fireAt) / r.repeatMs);
          const next = { ...r, fireAt: r.fireAt + missed * r.repeatMs };
          kept.push(next);
          armTimer(next);
        }
        // otherwise: expired, drop
      } else {
        kept.push(r);
        armTimer(r);
      }
    }
    setQueue(kept);
  };
  rearm();
  window.addEventListener("visibilitychange", rearm);
  window.addEventListener("focus", rearm);
}

export function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
