import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "../components/PageShell";
import { MoodBadge } from "../components/MoodBadge";
import { ReflectionCard } from "../components/ReflectionCard";
import { StaggerList, StaggerItem } from "../components/motion/StaggerList";
import { PressableCard } from "../components/motion/PressableCard";
import { useHistory } from "../hooks/useLocalStore";
import { setLastReflection } from "../services/storage";
import { formatDate } from "../utils/share";
import { useState } from "react";
import type { Reflection } from "../services/reflection";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — Blue Dice" },
      { name: "description", content: "Every reflection you've received." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const history = useHistory();
  const [open, setOpen] = useState<Reflection | null>(null);

  return (
    <PageShell
      title="History"
      subtitle={`${history.length} reflection${history.length === 1 ? "" : "s"}`}
    >
      {open ? (
        <div>
          <button
            onClick={() => setOpen(null)}
            className="mb-4 text-sm font-medium text-muted-foreground active:text-foreground"
          >
            ← Back
          </button>
          <ReflectionCard reflection={open} />
        </div>
      ) : history.length === 0 ? (
        <div className="rounded-3xl bg-secondary/60 p-6 text-center text-sm text-muted-foreground">
          Your reflections will appear here after your first roll.
        </div>
      ) : (
        <StaggerList className="space-y-2">
          {history.map((r) => (
            <StaggerItem key={r.id}>
              <PressableCard
                onClick={() => {
                  setLastReflection(r);
                  setOpen(r);
                }}
                className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left ring-1 ring-black/5"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {formatDate(r.createdAt)}
                    </span>
                    <MoodBadge mood={r.mood} />
                  </div>
                  <div className="mt-1 text-[15px] font-medium text-foreground">{r.title}</div>
                </div>
                <span className="text-muted-foreground">›</span>
              </PressableCard>
            </StaggerItem>
          ))}
        </StaggerList>
      )}
    </PageShell>
  );
}
