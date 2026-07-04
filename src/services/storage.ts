import type { Reflection } from "./reflection";

const KEYS = {
  history: "bluedice.history",
  favorites: "bluedice.favorites",
  settings: "bluedice.settings",
  last: "bluedice.lastReflection",
} as const;

export type Settings = {
  webhookUrl: string;
  notifications: boolean;
  darkMode: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  webhookUrl: "https://vmi3182726.contaboserver.net/webhook/blue-dice-reflection",
  notifications: false,
  darkMode: false,
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("bluedice:storage", { detail: { key } }));
  } catch {
    /* ignore quota errors */
  }
}

export function getHistory(): Reflection[] {
  return read<Reflection[]>(KEYS.history, []);
}
export function addToHistory(r: Reflection): void {
  const next = [r, ...getHistory()].slice(0, 200);
  write(KEYS.history, next);
  write(KEYS.last, r);
}
export function clearHistory(): void {
  write(KEYS.history, []);
  write(KEYS.last, null);
}

export function getFavorites(): Reflection[] {
  return read<Reflection[]>(KEYS.favorites, []);
}
export function toggleFavorite(r: Reflection): boolean {
  const list = getFavorites();
  const exists = list.some((x) => x.id === r.id);
  const next = exists ? list.filter((x) => x.id !== r.id) : [r, ...list];
  write(KEYS.favorites, next);
  return !exists;
}
export function isFavorite(id: string): boolean {
  return getFavorites().some((r) => r.id === id);
}

export function getLastReflection(): Reflection | null {
  return read<Reflection | null>(KEYS.last, null);
}
export function setLastReflection(r: Reflection | null): void {
  write(KEYS.last, r);
}

export function getSettings(): Settings {
  return { ...DEFAULT_SETTINGS, ...read<Partial<Settings>>(KEYS.settings, {}) };
}
export function setSettings(patch: Partial<Settings>): Settings {
  const next = { ...getSettings(), ...patch };
  write(KEYS.settings, next);
  return next;
}
