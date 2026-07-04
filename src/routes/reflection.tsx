import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Dice3D } from "../components/Dice3D";
import { PageShell } from "../components/PageShell";
import { ReflectionCard } from "../components/ReflectionCard";
import { useLastReflection, useHaptics } from "../hooks/useLocalStore";
import { addToHistory } from "../services/storage";
import { getReflection } from "../services/reflection";

export const Route = createFileRoute("/reflection")({
  head: () => ({
    meta: [
      { title: "Today's Reflection — Blue Dice" },
      { name: "description", content: "Your latest Blue Dice reflection." },
    ],
  }),
  component: ReflectionPage,
});

function ReflectionPage() {
  const last = useLastReflection();
  const navigate = useNavigate();
  const haptic = useHaptics();
  const [rolling, setRolling] = useState(false);

  const rollAgain = async () => {
    setRolling(true);
    haptic([12, 30, 12]);
    try {
      const r = await getReflection();
      addToHistory(r);
      haptic(20);
    } finally {
      setRolling(false);
    }
  };

  if (!last) {
    return (
      <PageShell title="Reflection">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-secondary/60 p-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            No reflection yet. Roll the dice to receive today's.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Roll the dice
          </Link>
        </motion.div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mb-4">
        <button
          onClick={() => navigate({ to: "/" })}
          className="text-sm font-medium text-muted-foreground active:text-foreground"
        >
          ← Home
        </button>
      </div>
      <AnimatePresence mode="wait">
        {rolling ? (
          <motion.div
            key="rolling"
            className="flex flex-col items-center justify-center py-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Dice3D rolling onTap={() => {}} disabled />
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm text-muted-foreground"
            >
              Finding today's reflection…
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ReflectionCard key={last.id} reflection={last} onRollAgain={rollAgain} />
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
