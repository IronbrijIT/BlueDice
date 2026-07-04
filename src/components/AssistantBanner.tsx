import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import type { ScheduledReminder } from "../services/notifications/types";

type Props = {
  reminder: ScheduledReminder | null;
  onDismiss: () => void;
};

export function AssistantBanner({ reminder, onDismiss }: Props) {
  const navigate = useNavigate();

  const cta =
    reminder?.category === "reflection"
      ? "Reflect"
      : reminder?.url?.includes("assistant=start")
        ? "Start now"
        : "Open";

  const go = () => {
    if (reminder?.url) {
      const url = reminder.url;
      const [path, query = ""] = url.split("?");
      navigate({ to: path, search: Object.fromEntries(new URLSearchParams(query)) as never });
    }
    onDismiss();
  };

  return (
    <AnimatePresence>
      {reminder ? (
        <motion.div
          key={reminder.id}
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 top-0 z-50 px-3 pt-[calc(env(safe-area-inset-top)+8px)]"
        >
          <div className="mx-auto flex max-w-xl items-center gap-3 rounded-2xl bg-foreground/95 p-3 pr-2 text-background shadow-xl backdrop-blur">
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{reminder.title}</div>
              <div className="truncate text-xs opacity-80">{reminder.body}</div>
            </div>
            <button
              onClick={go}
              className="rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground active:scale-95"
            >
              {cta}
            </button>
            <button
              onClick={onDismiss}
              aria-label="Dismiss"
              className="rounded-lg p-1.5 opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}