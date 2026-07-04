// Forwards events (subscription, custom reminders) to the
// user's n8n webhook. All calls are best-effort — offline / no URL is fine.
import { getDeviceId } from "../deviceId";
import { getNotifPrefs } from "./prefs";
import type { ScheduledReminder } from "./types";

type WebhookEvent =
  | { type: "reminder.scheduled"; reminder: ScheduledReminder }
  | { type: "push.subscribed"; subscription: PushSubscriptionJSON }
  | { type: "push.unsubscribed"; endpoint: string }
  | { type: "prefs.updated"; prefs: unknown }
  | { type: "waitlist.joined"; feature: string; email: string }
  | { type: "feature.voted"; feature: string; delta: 1 | -1 }
  | { type: "feature.feedback"; feature: string; text: string };

export async function postToWebhook(event: WebhookEvent): Promise<void> {
  const url = getNotifPrefs().syncWebhookUrl?.trim();
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "blue-dice",
        deviceId: getDeviceId(),
        at: new Date().toISOString(),
        ...event,
      }),
      keepalive: true,
    });
  } catch {
    /* silent — n8n is optional */
  }
}

export const forwardReminder = (r: ScheduledReminder) =>
  postToWebhook({ type: "reminder.scheduled", reminder: r });
