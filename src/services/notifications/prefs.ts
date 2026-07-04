import type { NotificationPrefs, ScheduledReminder } from "./types";

const KEYS = {
  prefs: "bluedice.notifPrefs",
  queue: "bluedice.notifQueue",
  waitlist: "bluedice.waitlist",
  votes: "bluedice.votes",
  feedback: "bluedice.feedback",
} as const;

export const DEFAULT_NOTIF_PREFS: NotificationPrefs = {
  enabled: false,
  motivational: true,
  work: true,
  streak: true,
  reflection: true,
  motivationalFrequency: "daily",
  quietHoursStart: "22:00",
  quietHoursEnd: "07:30",
  vapidPublicKey: "",
  syncWebhookUrl: "",
};

function read<T>(key: string, fb: T): T {
  if (typeof window === "undefined") return fb;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fb;
  } catch {
    return fb;
  }
}
function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("bluedice:storage", { detail: { key } }));
}

export function getNotifPrefs(): NotificationPrefs {
  return { ...DEFAULT_NOTIF_PREFS, ...read<Partial<NotificationPrefs>>(KEYS.prefs, {}) };
}
export function setNotifPrefs(patch: Partial<NotificationPrefs>): NotificationPrefs {
  const next = { ...getNotifPrefs(), ...patch };
  write(KEYS.prefs, next);
  return next;
}

export function getQueue(): ScheduledReminder[] {
  return read<ScheduledReminder[]>(KEYS.queue, []);
}
export function setQueue(q: ScheduledReminder[]) {
  write(KEYS.queue, q);
}

// Waitlist / votes / feedback for preview pages
export function getWaitlist(): Record<string, string[]> {
  return read(KEYS.waitlist, {});
}
export function joinWaitlist(feature: string, email: string) {
  const w = getWaitlist();
  w[feature] = Array.from(new Set([...(w[feature] ?? []), email]));
  write(KEYS.waitlist, w);
}
export function getVotes(): Record<string, number> {
  return read(KEYS.votes, {});
}
export function toggleVote(feature: string): number {
  const v = getVotes();
  const voted = read<Record<string, boolean>>("bluedice.myVotes", {});
  if (voted[feature]) {
    v[feature] = Math.max(0, (v[feature] ?? 1) - 1);
    delete voted[feature];
  } else {
    v[feature] = (v[feature] ?? 0) + 1;
    voted[feature] = true;
  }
  write(KEYS.votes, v);
  write("bluedice.myVotes", voted);
  return v[feature];
}
export function hasVoted(feature: string): boolean {
  return !!read<Record<string, boolean>>("bluedice.myVotes", {})[feature];
}
export function saveFeedback(feature: string, text: string) {
  const f = read<Record<string, string[]>>(KEYS.feedback, {});
  f[feature] = [...(f[feature] ?? []), text];
  write(KEYS.feedback, f);
}
