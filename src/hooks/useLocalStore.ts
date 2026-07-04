import { useEffect, useState } from "react";
import {
  getFavorites,
  getHistory,
  getLastReflection,
  getSettings,
  setSettings as writeSettings,
  type Settings,
} from "../services/storage";
import type { Reflection } from "../services/reflection";

function useLocalValue<T>(read: () => T): T {
  const [value, setValue] = useState<T>(read);
  useEffect(() => {
    const refresh = () => setValue(read());
    refresh();
    window.addEventListener("bluedice:storage", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("bluedice:storage", refresh);
      window.removeEventListener("storage", refresh);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
}

export function useHistory(): Reflection[] {
  return useLocalValue(getHistory);
}
export function useFavorites(): Reflection[] {
  return useLocalValue(getFavorites);
}
export function useLastReflection(): Reflection | null {
  return useLocalValue(getLastReflection);
}
export function useSettings(): [Settings, (patch: Partial<Settings>) => void] {
  const settings = useLocalValue(getSettings);
  return [settings, (patch) => writeSettings(patch)];
}

export function useHaptics() {
  return (pattern: number | number[] = 12) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        /* noop */
      }
    }
  };
}
