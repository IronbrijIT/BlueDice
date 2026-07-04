import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../components/PageShell";
import { useNotifPrefs, useNotifQueue, useNotifPermission } from "../hooks/useNotifications";
import { requestPermission, subscribePush, unsubscribePush } from "../services/notifications/push";
import { cancelReminder, makeId, scheduleReminder } from "../services/notifications/scheduler";

export const Route = createFileRoute("/settings/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Blue Dice" },
      { name: "description", content: "Control reminders and push notifications." },
    ],
  }),
  component: NotificationSettings,
});

function NotificationSettings() {
  const [prefs, setPrefs] = useNotifPrefs();
  const permission = useNotifPermission();
  const queue = useNotifQueue();
  const [status, setStatus] = useState<string | null>(null);

  const enablePush = async () => {
    try {
      const p = await requestPermission();
      if (p !== "granted") {
        setStatus("Permission was not granted.");
        return;
      }
      setPrefs({ enabled: true });
      await subscribePush();
      setStatus("Push notifications enabled.");
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Failed to enable push.");
    }
    setTimeout(() => setStatus(null), 3000);
  };

  const disablePush = async () => {
    await unsubscribePush();
    setPrefs({ enabled: false });
    setStatus("Push notifications disabled.");
    setTimeout(() => setStatus(null), 2000);
  };

  return (
    <PageShell>
      <Link to="/profile" className="mb-4 inline-flex items-center text-sm text-muted-foreground">
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="text-[28px] font-semibold text-foreground">Notifications</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Local reminders and web push through your n8n webhook.
      </p>

      <SectionTitle>Permission</SectionTitle>
      <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Browser notifications</div>
            <div className="text-xs text-muted-foreground">
              Status: {permission === "unsupported" ? "not supported on this device" : permission}
            </div>
          </div>
          {prefs.enabled ? (
            <button
              onClick={disablePush}
              className="rounded-xl bg-secondary px-3 py-2 text-sm font-medium"
            >
              Disable
            </button>
          ) : (
            <button
              onClick={enablePush}
              className="rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              Enable
            </button>
          )}
        </div>
        {status ? <p className="mt-2 text-xs text-primary">{status}</p> : null}
      </div>

      <SectionTitle>Categories</SectionTitle>
      <Toggle
        label="Motivational reminders"
        value={prefs.motivational}
        onChange={(v) => setPrefs({ motivational: v })}
      />
      <Toggle label="Work reminders" value={prefs.work} onChange={(v) => setPrefs({ work: v })} />
      <Toggle
        label="Streak reminders"
        value={prefs.streak}
        onChange={(v) => setPrefs({ streak: v })}
      />
      <Toggle
        label="Reflection reminders"
        value={prefs.reflection}
        onChange={(v) => setPrefs({ reflection: v })}
      />

      <SectionTitle>Motivational frequency</SectionTitle>
      <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
        <div className="flex gap-2">
          {(["daily", "twiceDaily", "weekly"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setPrefs({ motivationalFrequency: f })}
              className={`flex-1 rounded-xl py-2 text-xs font-medium ${
                prefs.motivationalFrequency === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              {f === "twiceDaily" ? "2× daily" : f}
            </button>
          ))}
        </div>
      </div>

      <SectionTitle>Quiet hours</SectionTitle>
      <div className="flex gap-2">
        <div className="flex-1 rounded-2xl bg-card p-3 ring-1 ring-border">
          <div className="text-xs text-muted-foreground">From</div>
          <input
            type="time"
            value={prefs.quietHoursStart}
            onChange={(e) => setPrefs({ quietHoursStart: e.target.value })}
            className="mt-1 w-full bg-transparent text-lg font-semibold outline-none"
          />
        </div>
        <div className="flex-1 rounded-2xl bg-card p-3 ring-1 ring-border">
          <div className="text-xs text-muted-foreground">To</div>
          <input
            type="time"
            value={prefs.quietHoursEnd}
            onChange={(e) => setPrefs({ quietHoursEnd: e.target.value })}
            className="mt-1 w-full bg-transparent text-lg font-semibold outline-none"
          />
        </div>
      </div>

      <SectionTitle>Push delivery (n8n)</SectionTitle>
      <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
        <label className="text-xs text-muted-foreground">VAPID public key</label>
        <input
          type="text"
          placeholder="BFn8… (from `npx web-push generate-vapid-keys`)"
          value={prefs.vapidPublicKey}
          onChange={(e) => setPrefs({ vapidPublicKey: e.target.value })}
          className="mt-1 w-full rounded-xl bg-secondary px-3 py-2 text-sm outline-none"
        />
        <label className="mt-3 block text-xs text-muted-foreground">n8n sync webhook URL</label>
        <input
          type="url"
          placeholder="https://your-n8n.example.com/webhook/blue-dice-sync"
          value={prefs.syncWebhookUrl}
          onChange={(e) => setPrefs({ syncWebhookUrl: e.target.value })}
          className="mt-1 w-full rounded-xl bg-secondary px-3 py-2 text-sm outline-none"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Push subscriptions and custom reminders are POSTed here. n8n signs and
          sends web-push using your VAPID private key server-side.
        </p>
      </div>

      <SectionTitle>Custom reminders</SectionTitle>
      <CustomReminderForm />

      {queue.length > 0 ? (
        <div className="mt-3 space-y-2">
          {queue
            .slice()
            .sort((a, b) => a.fireAt - b.fireAt)
            .map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-2xl bg-card p-3 ring-1 ring-border"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{r.title}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {new Date(r.fireAt).toLocaleString()} · {r.category}
                    {r.repeatMs ? " · repeating" : ""}
                  </div>
                </div>
                <button
                  onClick={() => cancelReminder(r.id)}
                  className="rounded-xl bg-secondary p-2 text-muted-foreground"
                  aria-label="Cancel reminder"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
        </div>
      ) : (
        <p className="mt-3 text-xs text-muted-foreground">No reminders scheduled.</p>
      )}
    </PageShell>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-6 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </h2>
  );
}
function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="mb-2 flex items-center justify-between rounded-2xl bg-card p-4 ring-1 ring-border">
      <div className="text-sm font-medium text-foreground">{label}</div>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative h-7 w-12 rounded-full transition ${value ? "bg-primary" : "bg-border"}`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${value ? "left-[22px]" : "left-0.5"}`}
        />
      </button>
    </div>
  );
}

function CustomReminderForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [when, setWhen] = useState("");
  const [repeat, setRepeat] = useState<"none" | "daily" | "weekly">("none");

  const submit = () => {
    if (!title || !when) return;
    const fireAt = new Date(when).getTime();
    if (Number.isNaN(fireAt) || fireAt < Date.now()) return;
    scheduleReminder({
      id: makeId(),
      title,
      body,
      category: "custom",
      fireAt,
      repeatMs:
        repeat === "daily"
          ? 24 * 60 * 60 * 1000
          : repeat === "weekly"
            ? 7 * 24 * 60 * 60 * 1000
            : undefined,
    });
    setTitle("");
    setBody("");
    setWhen("");
  };

  return (
    <div className="rounded-2xl bg-card p-4 ring-1 ring-border">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl bg-secondary px-3 py-2 text-sm outline-none"
      />
      <input
        placeholder="Message (optional)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="mt-2 w-full rounded-xl bg-secondary px-3 py-2 text-sm outline-none"
      />
      <div className="mt-2 flex gap-2">
        <input
          type="datetime-local"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
          className="flex-1 rounded-xl bg-secondary px-3 py-2 text-sm outline-none"
        />
        <select
          value={repeat}
          onChange={(e) => setRepeat(e.target.value as "none" | "daily" | "weekly")}
          className="rounded-xl bg-secondary px-3 py-2 text-sm outline-none"
        >
          <option value="none">Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <button
        onClick={submit}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground"
      >
        <Plus className="h-4 w-4" /> Schedule reminder
      </button>
    </div>
  );
}
