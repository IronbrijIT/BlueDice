## Goal

Transform the Work Tracker from a passive stopwatch into a proactive, encouraging assistant that guides the user throughout the day via smart local notifications, contextual UI cues, and end-of-day reflections — all built on the existing `services/notifications` + `services/tracker` layers so the n8n webhook path keeps working unchanged.

## 1. Assistant scheduling engine

New module `src/services/assistant/scheduler.ts` — a single "assistant heartbeat" that runs on app load, on visibility change, and every 60s. It reconciles what should be scheduled today based on `TrackerPrefs` + `NotificationPrefs`, using idempotent IDs so duplicates can't happen.

Per workday (respecting `workdays`, `startTime`, `dailyHours`, timezone via `Date`):
- `assistant:start:YYYY-MM-DD` — fires at start time. "Good morning! 🌞 Ready to make today count?"
- `assistant:hour:YYYY-MM-DD:N` — hourly encouragement during an active session (uses existing `hourlyPing` toggle).
- `assistant:half:YYYY-MM-DD` — at 50% of daily goal (computed from active session elapsed + today's totals).
- `assistant:last30:YYYY-MM-DD` — when 30 min remain.
- `assistant:complete:YYYY-MM-DD` — when today's goal hits 100% → opens end-of-day reflection.
- `assistant:missed:YYYY-MM-DD` — fires 2h after start time if no session was ever started today; supportive tone, never shaming.

All reminders go through the existing `scheduleReminder()` so quiet hours, category toggles, and the n8n webhook forwarder are respected automatically. New copy lives in `src/services/assistant/messages.ts` (friendly tone bank, random pick per fire).

New `TrackerPrefs` field: `autoStartSession: boolean` ("automatically create today's session at start time"). When true, the start-time handler also calls `startSession()` if none is active.

## 2. Setup wizard update

`src/routes/tracker.setup.tsx` gains a final step:
- "Do you want automatic work reminders?" → sets `autoReminders` + requests Notification permission.
- "Auto-start my session at start time?" → sets `autoStartSession`.
- "End-of-day check-in?" → toggles reflection prompt category.

`src/routes/tracker.settings.tsx` mirrors these toggles.

## 3. End-of-day Work Journal

New route `src/routes/tracker.checkin.tsx`:
- Mood picker: 😊 Great / 🙂 Good / 😐 Okay / 😞 Tough
- Optional textarea: "What was the highlight of today?"
- Saves to `bluedice.workJournal` via new `src/services/tracker/journal.ts` (`{ date, mood, note, hours }`).

The `assistant:complete` and `assistant:missed` reminders deep-link here via `url: "/tracker/checkin?date=..."`.

New route `src/routes/tracker.journal.tsx` — chronological list of past check-ins, staggered entry, linked from the tracker dashboard header.

## 4. Home screen "Start Work" card

`src/routes/index.tsx`: replace the current tracker chip with a proper `WorkTrackerCard` component.

Three visual states driven by current time vs `startTime` and session state:
- **Idle / before work** — calm card, subtitle "Starts at 9:00".
- **Active window, no session** — pulsing blue glow (`box-shadow` keyframe), 1.02 scale, animated "Start Work" badge, primary CTA that calls `startSession()` and navigates to `/tracker`.
- **Session running** — live elapsed, mini progress bar, "Pause / Finish" quick actions.

New keyframe `pulse-glow` added to `src/styles.css`.

## 5. Context-aware dice

`src/components/Dice3D.tsx` gains an `idleAssist` prop (default false). When true and no active session:
- Rotation speed +30%.
- Every ~5s: gentle bounce via `framer-motion` `animate` keyframes.
- Soft blue drop-shadow glow (already have primary color token).
- Floating tooltip: "🎲 Roll the dice to discover today's focus." — fades in after 3s idle, dismissible.

Home screen passes `idleAssist={!activeSession}`. Click behavior unchanged (rolls for reflection).

## 6. In-app foreground handling

New `src/hooks/useAssistantEvents.ts` mounted in `__root.tsx`:
- Listens for the existing `bluedice:reminder` custom event.
- If category is `work` and app is focused: shows a full-width top banner (new `AssistantBanner` component) with "Start Now" CTA instead of relying on OS notification.
- If category is `reflection`: same banner with "Reflect" CTA → `/tracker/checkin`.

Banner uses `AnimatePresence` slide-down; auto-dismisses after 8s or on action.

## 7. Notification robustness

Extend `src/services/notifications/scheduler.ts`:
- Add `dedupeKey` (defaults to `id`) — repeated `scheduleReminder` calls with the same key are a no-op if a matching future one exists. Prevents assistant heartbeat from double-scheduling.
- On `visibilitychange` and `focus`, the assistant scheduler recomputes today's plan (handles timezone shifts / device sleep).
- `push-sw.js` `notificationclick` handler already navigates to `data.url` — verify it opens `/tracker` and `/tracker/checkin` correctly and add `?src=notif` for analytics-ready deep links.

## 8. Copy bank

`src/services/assistant/messages.ts` exports arrays for: morning, hourly, halfway, last30, complete, missed, hydration. Consumer picks pseudo-randomly seeded by date so the same day always shows the same message (avoids feeling random/spammy on re-renders).

## Technical notes

- All state stays in `localStorage` under the existing `bluedice.*` namespace; nothing server-side changes.
- Zero new dependencies.
- All new reminders flow through `scheduleReminder()` so the n8n `syncWebhookUrl` is called automatically — the backend gets the same payload shape it already handles.
- Timezone: use `new Date()` + local `getHours/getMinutes`; recompute on `focus` so travel / DST is handled.
- Reduced-motion: pulse/glow/bounce respect `useReducedMotion` (already in the codebase).

## Files touched

```text
NEW  src/services/assistant/scheduler.ts
NEW  src/services/assistant/messages.ts
NEW  src/services/tracker/journal.ts
NEW  src/routes/tracker.checkin.tsx
NEW  src/routes/tracker.journal.tsx
NEW  src/components/WorkTrackerCard.tsx
NEW  src/components/AssistantBanner.tsx
NEW  src/hooks/useAssistantEvents.ts
EDIT src/services/tracker/types.ts        (add autoStartSession)
EDIT src/services/tracker/prefs.ts        (default)
EDIT src/services/notifications/scheduler.ts (dedupe)
EDIT src/routes/__root.tsx                (mount assistant + banner)
EDIT src/routes/index.tsx                 (WorkTrackerCard + idleAssist dice)
EDIT src/routes/tracker.setup.tsx         (new questions)
EDIT src/routes/tracker.settings.tsx      (mirror toggles + journal link)
EDIT src/components/Dice3D.tsx            (idleAssist mode + tooltip)
EDIT src/styles.css                       (pulse-glow keyframe)
EDIT public/push-sw.js                    (verify deep-link routing)
```
