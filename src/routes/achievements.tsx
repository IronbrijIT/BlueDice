import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Trophy, Lock } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { useAchievements } from "../hooks/useAchievements";
import { StaggerList, StaggerItem } from "../components/motion/StaggerList";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Blue Dice" },
      { name: "description", content: "Milestones for showing up." },
    ],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const list = useAchievements();
  const earned = list.filter((a) => a.earned).length;

  return (
    <PageShell>
      <Link to="/profile" className="mb-4 inline-flex items-center text-sm text-muted-foreground">
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="text-[28px] font-semibold text-foreground">Achievements</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {earned} of {list.length} earned.
      </p>

      <StaggerList className="mt-6 grid grid-cols-2 gap-3">
        {list.map((a) => (
          <StaggerItem
            key={a.id}
            className={`flex flex-col items-start rounded-2xl p-4 ring-1 transition ${
              a.earned ? "bg-primary/5 ring-primary/20" : "bg-card ring-border opacity-70"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                a.earned ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
              }`}
            >
              {a.earned ? <Trophy className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
            </div>
            <div className="mt-3 text-sm font-semibold text-foreground">{a.title}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{a.description}</div>
            {a.progress && !a.earned ? (
              <div className="mt-3 w-full">
                <div className="h-1 rounded-full bg-border">
                  <div
                    className="h-1 rounded-full bg-primary transition-all"
                    style={{
                      width: `${Math.round((a.progress.value / a.progress.goal) * 100)}%`,
                    }}
                  />
                </div>
                <div className="mt-1 text-[10px] text-muted-foreground">
                  {a.progress.value} / {a.progress.goal}
                </div>
              </div>
            ) : null}
          </StaggerItem>
        ))}
      </StaggerList>
    </PageShell>
  );
}
