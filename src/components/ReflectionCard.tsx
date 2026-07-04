import { motion } from "framer-motion";
import { Heart, RotateCcw, Share2, Volume2, Square } from "lucide-react";
import { useState } from "react";
import { MoodBadge } from "./MoodBadge";
import type { Reflection } from "../services/reflection";
import { isFavorite, toggleFavorite } from "../services/storage";
import { shareReflection } from "../utils/share";
import { useHaptics } from "../hooks/useLocalStore";

type Props = {
  reflection: Reflection;
  onRollAgain?: () => void;
};

export function ReflectionCard({ reflection, onRollAgain }: Props) {
  const [saved, setSaved] = useState(() => isFavorite(reflection.id));
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared">("idle");
  const [speaking, setSpeaking] = useState(false);
  const haptic = useHaptics();

  const handleSave = () => {
    haptic(10);
    const nowSaved = toggleFavorite(reflection);
    setSaved(nowSaved);
  };

  const handleShare = async () => {
    haptic(10);
    const result = await shareReflection(reflection);
    setShareState(result);
    setTimeout(() => setShareState("idle"), 1600);
  };

  const toggleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const text = `${reflection.title}. ${reflection.message}. Affirmation: ${reflection.affirmation}.`;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    u.pitch = 1;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl bg-card p-6 shadow-[0_10px_40px_-12px_rgb(0_0_0_/_0.10)] ring-1 ring-black/5"
    >
      <div className="flex items-center justify-between">
        <MoodBadge mood={reflection.mood} />
        <span className="text-xs text-muted-foreground">
          {new Date(reflection.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-semibold leading-tight text-foreground">
        {reflection.title}
      </h2>
      <button
        onClick={toggleSpeak}
        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] font-medium text-muted-foreground active:scale-[0.98]"
      >
        {speaking ? <Square className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
        {speaking ? "Stop" : "Read aloud"}
      </button>

      <p className="mt-3 text-[17px] leading-relaxed text-foreground/85">{reflection.message}</p>

      <Section label="Affirmation">
        <p className="italic text-foreground/90">"{reflection.affirmation}"</p>
      </Section>

      <Section label="Today's Action">
        <p className="text-foreground/90">{reflection.action}</p>
      </Section>

      <Section label="Journal Prompt">
        <p className="text-foreground/90">{reflection.journal_prompt}</p>
      </Section>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {onRollAgain ? (
          <button
            onClick={() => {
              haptic(15);
              onRollAgain();
            }}
            className="col-span-3 flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-medium text-primary-foreground transition active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4" /> Roll again
          </button>
        ) : null}
        <button
          onClick={handleShare}
          className="col-span-1 flex items-center justify-center gap-1.5 rounded-2xl bg-secondary py-3 text-sm font-medium text-foreground transition active:scale-[0.98]"
        >
          <Share2 className="h-4 w-4" />
          {shareState === "copied" ? "Copied" : shareState === "shared" ? "Shared" : "Share"}
        </button>
        <button
          onClick={handleSave}
          className={`col-span-2 flex items-center justify-center gap-1.5 rounded-2xl py-3 text-sm font-medium transition active:scale-[0.98] ${
            saved ? "bg-primary/10 text-primary" : "bg-secondary text-foreground"
          }`}
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </motion.article>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 border-t border-border pt-4">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1.5 text-[15px] leading-relaxed">{children}</div>
    </div>
  );
}
