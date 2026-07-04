export type ReminderCategory = "motivational" | "work" | "streak" | "custom" | "reflection";

export type NotificationPrefs = {
  enabled: boolean;
  motivational: boolean;
  work: boolean;
  streak: boolean;
  reflection: boolean;
  motivationalFrequency: "daily" | "twiceDaily" | "weekly";
  quietHoursStart: string; // "HH:mm" or ""
  quietHoursEnd: string;
  vapidPublicKey: string;
  syncWebhookUrl: string;
};

export type ScheduledReminder = {
  id: string;
  title: string;
  body: string;
  category: ReminderCategory;
  fireAt: number; // epoch ms
  repeatMs?: number; // for recurring
  url?: string;
};
