import { createServerFn } from "@tanstack/react-start";
import { SYSTEM_PROMPT, ReflectionSchema } from "./reflection";

/**
 * Server-side proxy for the reflection webhook.
 * Runs on the server (Nitro/Cloudflare Worker) so there are no CORS issues.
 */
export const fetchReflectionFromWebhook = createServerFn({ method: "POST" })
  .validator(
    (data: { prompt?: string }) => data,
  )
  .handler(async ({ data }) => {
    const WEBHOOK_URL =
      (process.env.VITE_REFLECTION_WEBHOOK_URL as string | undefined) ??
      "https://vmi3182726.contaboserver.net/webhook/blue-dice-reflection";

    const userPrompt = data.prompt?.trim();
    const finalSystemPrompt = userPrompt
      ? `${SYSTEM_PROMPT}\n\nThe user says: "${userPrompt}"`
      : SYSTEM_PROMPT;

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "blue-dice",
        at: new Date().toISOString(),
        prompt: userPrompt || undefined,
        systemPrompt: finalSystemPrompt,
        system_prompt: finalSystemPrompt,
      }),
    });

    if (!res.ok) {
      throw new Error(`Reflection webhook failed (${res.status})`);
    }

    const json = await res.json();
    return extractReflection(json);
  });

// --- Extraction helpers (same logic as in reflection.ts) ---

function extractReflection(raw: unknown): Record<string, unknown> {
  let data: unknown = Array.isArray(raw) ? raw[0] : raw;

  if (typeof data !== "object" || data === null) {
    if (typeof data === "string") {
      return parseJsonString(data);
    }
    throw new Error("Webhook returned unexpected data type");
  }

  const obj = data as Record<string, unknown>;

  if ("title" in obj && "message" in obj) {
    return obj;
  }

  const WRAPPER_KEYS = ["output", "text", "response", "message", "content", "data", "result"];
  for (const key of WRAPPER_KEYS) {
    const value = obj[key];
    if (value == null) continue;

    if (typeof value === "object" && !Array.isArray(value) && "title" in (value as Record<string, unknown>)) {
      return value as Record<string, unknown>;
    }

    if (typeof value === "string") {
      try {
        return parseJsonString(value);
      } catch {
        continue;
      }
    }
  }

  return obj;
}

function parseJsonString(str: string): Record<string, unknown> {
  let cleaned = str.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  cleaned = cleaned.trim();
  const parsed = JSON.parse(cleaned);
  if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
    return parsed as Record<string, unknown>;
  }
  throw new Error("Parsed value is not an object");
}
