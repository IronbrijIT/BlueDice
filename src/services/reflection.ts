// ============================================================================
// Blue Dice — Reflection Service
// ----------------------------------------------------------------------------
// The webhook URL is hardcoded below. To change it, update DEFAULT_WEBHOOK_URL
// or set VITE_REFLECTION_WEBHOOK_URL in your environment.
// The endpoint must accept POST and return JSON matching ReflectionSchema.
// ============================================================================
import { z } from "zod";

export const ReflectionSchema = z.object({
  title: z.string(),
  message: z.string(),
  affirmation: z.string(),
  journal_prompt: z.string(),
  action: z.string(),
  mood: z.string(),
});

export type Reflection = z.infer<typeof ReflectionSchema> & {
  id: string;
  createdAt: string;
};

const DEFAULT_WEBHOOK_URL =
  (import.meta.env.VITE_REFLECTION_WEBHOOK_URL as string | undefined) ??
  "https://vmi3182726.contaboserver.net/webhook/blue-dice-reflection";

function resolveWebhookUrl(): string {
  return DEFAULT_WEBHOOK_URL;
}

// Local fallback so the app is demoable without a webhook configured.
const MOCK_POOL: Array<z.infer<typeof ReflectionSchema>> = [
  {
    title: "Begin Where You Are",
    message:
      "You don't need the perfect moment to begin. The path unfolds beneath the first honest step you take today.",
    affirmation: "I trust the pace of my own becoming.",
    journal_prompt: "What small step have I been postponing, and why?",
    action: "Spend five uninterrupted minutes on the thing you keep avoiding.",
    mood: "Grounded",
  },
  {
    title: "The Quiet Between",
    message:
      "Notice the pause between thoughts. That silence is not empty — it is where clarity lives.",
    affirmation: "Stillness is a place I can return to.",
    journal_prompt: "When did I last feel truly quiet? What made it possible?",
    action: "Sit for three minutes today without reaching for your phone.",
    mood: "Peaceful",
  },
  {
    title: "Small Weather",
    message:
      "Feelings pass like weather across an open sky. You are the sky, not the storm moving through it.",
    affirmation: "I am larger than what I feel today.",
    journal_prompt: "What emotion am I giving too much authority?",
    action: "Name one feeling out loud, then let it move on.",
    mood: "Hopeful",
  },
  {
    title: "A Kinder Angle",
    message:
      "The story you tell yourself about today is a choice. Choose the version that lets you keep going.",
    affirmation: "I speak to myself the way I'd speak to a friend.",
    journal_prompt: "What is one thought I could reframe more generously?",
    action: "Write down one thing you appreciate about yourself.",
    mood: "Warm",
  },
  {
    title: "Return to the Body",
    message:
      "The mind wanders far. The body always waits patiently in the present, ready to bring you home.",
    affirmation: "I am here, in this breath, in this moment.",
    journal_prompt: "Where in my body am I holding tension I haven't noticed?",
    action: "Take three slow breaths and unclench your jaw and shoulders.",
    mood: "Calm",
  },
];

function pickMock(): z.infer<typeof ReflectionSchema> {
  return MOCK_POOL[Math.floor(Math.random() * MOCK_POOL.length)];
}

function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export const SYSTEM_PROMPT = `Act as Blue Dice AI. Return ONLY valid JSON:
{
  "title": "3-4 word title",
  "message": "2 sentence calming reflection addressing user's context.",
  "affirmation": "First-person present affirmation",
  "journal_prompt": "deep question",
  "action": "2-min physical task",
  "mood": "Grounded/Peaceful/Hopeful/Warm/Calm"
}`;

/**
 * n8n's LangChain / AI nodes wrap the actual AI output in various ways:
 *   - { output: "{...}" }          ← JSON string inside "output"
 *   - { text: "{...}" }            ← JSON string inside "text"
 *   - { output: { title: ... } }   ← already-parsed object
 *   - [ { output: "..." } ]        ← array with one item
 *   - { response: "..." }          ← another common key
 *   - { message: "..." }           ← yet another
 *   - { content: "..." }           ← content key variant
 *
 * This function digs through all of those to find the actual reflection object.
 */
function extractReflection(raw: unknown): Record<string, unknown> {
  // If it's an array, take the first element
  let data: unknown = Array.isArray(raw) ? raw[0] : raw;

  if (typeof data !== "object" || data === null) {
    // Maybe the whole response is a JSON string
    if (typeof data === "string") {
      return parseJsonString(data);
    }
    throw new Error("Webhook returned unexpected data type");
  }

  const obj = data as Record<string, unknown>;

  // If the object already has the expected keys, return it directly
  if ("title" in obj && "message" in obj) {
    return obj;
  }

  // Try common wrapper keys used by n8n nodes
  const WRAPPER_KEYS = ["output", "text", "response", "message", "content", "data", "result"];
  for (const key of WRAPPER_KEYS) {
    const value = obj[key];
    if (value == null) continue;

    // Value is already a parsed object with expected shape
    if (typeof value === "object" && !Array.isArray(value) && "title" in (value as Record<string, unknown>)) {
      return value as Record<string, unknown>;
    }

    // Value is a JSON string — parse it
    if (typeof value === "string") {
      try {
        return parseJsonString(value);
      } catch {
        continue; // not valid JSON, try next key
      }
    }
  }

  // Last resort: return the raw object and let Zod report what's missing
  return obj;
}

/** Strip markdown fences (```json ... ```) and parse a JSON string. */
function parseJsonString(str: string): Record<string, unknown> {
  let cleaned = str.trim();
  // Remove ```json ... ``` or ``` ... ``` wrappers
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  cleaned = cleaned.trim();
  const parsed = JSON.parse(cleaned);
  if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
    return parsed as Record<string, unknown>;
  }
  throw new Error("Parsed value is not an object");
}

/**
 * Fetch a reflection from your configured webhook.
 * Uses a server-side proxy (TanStack server function) to avoid CORS issues.
 * Falls back to a local mock pool when no URL is set — so the UI is always
 * demoable.
 */
export async function getReflection(prompt?: string): Promise<Reflection> {
  const url = resolveWebhookUrl();

  let payload: z.infer<typeof ReflectionSchema>;

  if (!url) {
    // No webhook configured — use local mock so the app still works.
    await new Promise((r) => setTimeout(r, 1800));
    payload = pickMock();
  } else {
    // Call through server-side proxy to avoid CORS
    const { fetchReflectionFromWebhook } = await import("./reflection.server");
    const result = await fetchReflectionFromWebhook({ data: { prompt: prompt?.trim() } });
    payload = ReflectionSchema.parse(result);
  }

  return {
    ...payload,
    id: makeId(),
    createdAt: new Date().toISOString(),
  };
}
