import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Dice3D } from "../components/Dice3D";
import { PageShell } from "../components/PageShell";
import { getReflection } from "../services/reflection";
import { addToHistory } from "../services/storage";
import { useHaptics } from "../hooks/useLocalStore";
import { useStreak } from "../hooks/useStreak";
import { Flame } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blue Dice — Roll for today's reflection" },
      {
        name: "description",
        content:
          "Every roll brings a new perspective. Tap the dice for a calm, thoughtful reflection.",
      },
      { property: "og:title", content: "Blue Dice" },
      { property: "og:description", content: "Roll for today's reflection." },
    ],
  }),
  component: Index,
});

function Index() {
  const [rolling, setRolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const haptic = useHaptics();
  const streak = useStreak();


  const roll = async () => {
    if (rolling) return;
    setError(null);
    setRolling(true);
    haptic([12, 30, 12]);

    try {
      const minSpin = new Promise((r) => setTimeout(r, 1200));
      const [reflection] = await Promise.all([getReflection(prompt), minSpin]);
      addToHistory(reflection);
      setPrompt("");
      haptic(20);
      navigate({ to: "/reflection" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setRolling(false);
    }
  };

  return (
    <PageShell>
      <div className="mb-2 flex items-center justify-center gap-2">
        {streak.reflectionStreak > 0 ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
            <Flame className="h-3 w-3" /> {streak.reflectionStreak}-day streak
          </span>
        ) : null}
      </div>
      <div className="flex flex-col items-center pt-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-primary">
            Blue Dice
          </p>
          <h1 className="mt-3 text-[34px] font-semibold leading-tight text-foreground">
            Roll for today's
            <br />
            reflection.
          </h1>
          <p className="mx-auto mt-3 max-w-xs text-sm text-muted-foreground">
            Every roll brings a new perspective.
          </p>
        </motion.div>

        <div className="relative mt-14 mb-16">
          <Dice3D rolling={rolling} onTap={roll} />
          <Particles active={rolling} />
        </div>

        <div className="w-full max-w-sm px-1">
          <label htmlFor="prompt" className="sr-only">
            Tell the dice something
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={rolling}
            rows={2}
            placeholder="Tell the dice what's on your mind… (optional)"
            className="w-full resize-none rounded-2xl border border-border bg-secondary/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:bg-background disabled:opacity-60"
          />
        </div>

        <AnimatePresence mode="wait">
          {rolling ? (
            <motion.p
              key="loading"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-6 text-sm text-muted-foreground"
            >
              Finding today's reflection…
            </motion.p>
          ) : (
            <motion.button
              key="cta"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={roll}
              className="mt-6 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition active:scale-[0.97]"
            >
              {prompt.trim() ? "Roll for an answer" : "Tap the dice to roll"}
            </motion.button>
          )}
        </AnimatePresence>

        {error ? <p className="mt-4 text-xs text-destructive">{error}</p> : null}
      </div>

    </PageShell>
  );
}

function Particles({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const dx = Math.cos(angle) * 90;
        const dy = Math.sin(angle) * 90;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], x: dx, y: dy, scale: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeOut",
            }}
            className="absolute h-1.5 w-1.5 rounded-full bg-primary/70"
          />
        );
      })}
    </div>
  );
}
