import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "../components/PageShell";
import { useHistory } from "../hooks/useLocalStore";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — Blue Dice" },
      { name: "description", content: "Your reflections by day." },
    ],
  }),
  component: CalendarPage,
});

function CalendarPage() {
  const history = useHistory();
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [selected, setSelected] = useState<Date | null>(null);

  const days = useMemo(() => {
    const first = new Date(cursor);
    const last = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
    const leading = (first.getDay() + 6) % 7;
    const cells: (Date | null)[] = [];
    for (let i = 0; i < leading; i++) cells.push(null);
    for (let d = 1; d <= last.getDate(); d++) {
      cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [cursor]);

  const reflectionDays = useMemo(() => {
    const s = new Set<string>();
    for (const r of history) {
      const d = new Date(r.createdAt);
      d.setHours(0, 0, 0, 0);
      s.add(d.toDateString());
    }
    return s;
  }, [history]);

  const selectedReflections = selected
    ? history.filter((r) => {
        const d = new Date(r.createdAt);
        return d.toDateString() === selected.toDateString();
      })
    : [];

  return (
    <PageShell>
      <Link to="/profile" className="mb-4 inline-flex items-center text-sm text-muted-foreground">
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="text-[28px] font-semibold text-foreground">Calendar</h1>

      <div className="mt-6 rounded-3xl bg-card p-4 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="rounded-xl bg-secondary p-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-sm font-semibold text-foreground">
            {cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
          </div>
          <button
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="rounded-xl bg-secondary p-2"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {days.map((d, i) => {
            if (!d) return <div key={i} className="aspect-square" />;
            const hasReflection = reflectionDays.has(d.toDateString());
            const isToday = d.toDateString() === new Date().toDateString();
            const isSelected = selected?.toDateString() === d.toDateString();
            return (
              <button
                key={i}
                onClick={() => setSelected(d)}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-lg text-xs transition ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : isToday
                      ? "bg-secondary font-semibold text-foreground"
                      : "text-foreground hover:bg-secondary"
                }`}
              >
                {d.getDate()}
                {hasReflection ? (
                  <span
                    className={`absolute bottom-1 h-1 w-1 rounded-full ${
                      isSelected ? "bg-white" : "bg-primary"
                    }`}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {selected ? (
        <div className="mt-4 rounded-2xl bg-card p-4 ring-1 ring-border">
          <div className="text-sm font-semibold text-foreground">
            {selected.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {selectedReflections.length} reflection
            {selectedReflections.length === 1 ? "" : "s"}
          </div>
          {selectedReflections.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {selectedReflections.map((r) => (
                <li key={r.id} className="rounded-xl bg-secondary/60 p-3 text-sm text-foreground">
                  <div className="font-medium">{r.title}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{r.mood}</div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </PageShell>
  );
}
