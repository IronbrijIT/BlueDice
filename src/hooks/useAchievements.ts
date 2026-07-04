import { useEffect, useState } from "react";
import { computeAchievements, type Achievement } from "../services/achievements/rules";

export function useAchievements(): Achievement[] {
  const [list, setList] = useState<Achievement[]>(() => computeAchievements());
  useEffect(() => {
    const r = () => setList(computeAchievements());
    window.addEventListener("bluedice:storage", r);
    return () => window.removeEventListener("bluedice:storage", r);
  }, []);
  return list;
}
