import type { Reflection } from "../services/reflection";

export async function shareReflection(r: Reflection): Promise<"shared" | "copied"> {
  const text = `${r.title}\n\n${r.message}\n\n— Blue Dice`;
  if (typeof navigator !== "undefined" && "share" in navigator) {
    try {
      await navigator.share({ title: r.title, text });
      return "shared";
    } catch {
      /* fall through to clipboard */
    }
  }
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  }
  return "copied";
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}