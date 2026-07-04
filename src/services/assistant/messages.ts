// Friendly copy bank for the assistant. Consumers pick one entry per day
// using a date-seeded index so the message stays stable across re-renders
// while still feeling varied day to day.

export type Msg = { title: string; body: string };

export const messages = {
  reflection: [
    { title: "Time to reflect 🎲", body: "Take a moment to roll the dice and capture today's thoughts." },
    { title: "Daily check-in ✨", body: "How was your day? Roll the dice and see what comes up." },
    { title: "Pause and reflect 🌙", body: "A quick reflection can make tomorrow even better." },
  ] satisfies Msg[],
};

/** Stable pseudo-random pick seeded by an ISO date string. */
export function pickForDate<T>(arr: T[], dateKey: string): T {
  let h = 0;
  for (let i = 0; i < dateKey.length; i++) h = (h * 31 + dateKey.charCodeAt(i)) | 0;
  return arr[Math.abs(h) % arr.length];
}