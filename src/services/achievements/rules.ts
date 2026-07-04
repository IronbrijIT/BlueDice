import { getHistory } from "../storage";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  progress?: { value: number; goal: number };
};

export function computeAchievements(): Achievement[] {
  const reflections = getHistory();

  const list: Achievement[] = [
    {
      id: "first_roll",
      title: "First Roll",
      description: "Rolled the dice for the first time.",
      earned: reflections.length >= 1,
    },
    {
      id: "ten_reflections",
      title: "Ten Reflections",
      description: "Collected 10 reflections.",
      earned: reflections.length >= 10,
      progress: { value: Math.min(reflections.length, 10), goal: 10 },
    },
    {
      id: "hundred_reflections",
      title: "Hundred Reflections",
      description: "Collected 100 reflections.",
      earned: reflections.length >= 100,
      progress: { value: Math.min(reflections.length, 100), goal: 100 },
    },
  ];
  return list;
}
