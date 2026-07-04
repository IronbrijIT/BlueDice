import { useEffect, useState } from "react";
import { getHistory } from "../services/storage";

export function useStreak() {
  const [state, setState] = useState(() => compute());
  useEffect(() => {
    const r = () => setState(compute());
    window.addEventListener("bluedice:storage", r);
    return () => window.removeEventListener("bluedice:storage", r);
  }, []);
  return state;
}

function compute() {
  // reflection streak: consecutive days with at least one reflection
  const days = new Set(
    getHistory().map((r) => {
      const d = new Date(r.createdAt);
      d.setHours(0, 0, 0, 0);
      return d.toISOString();
    }),
  );
  let reflectionStreak = 0;
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    d.setHours(0, 0, 0, 0);
    if (days.has(d.toISOString())) reflectionStreak++;
    else break;
  }
  return {
    reflectionStreak,
  };
}
