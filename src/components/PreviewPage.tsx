import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ThumbsUp, Bell, Send } from "lucide-react";
import { PageShell } from "./PageShell";
import {
  getVotes,
  hasVoted,
  joinWaitlist,
  saveFeedback,
  toggleVote,
} from "../services/notifications/prefs";
import { postToWebhook } from "../services/notifications/webhook";

type Props = {
  featureId: string;
  title: string;
  tagline: string;
  description: string;
  status: "Concept" | "Designing" | "In development" | "Beta soon";
  Icon: LucideIcon;
};

export function PreviewPage({ featureId, title, tagline, description, status, Icon }: Props) {
  const [voteCount, setVoteCount] = useState(() => getVotes()[featureId] ?? 0);
  const [voted, setVoted] = useState(() => hasVoted(featureId));
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center"
      >
        <div className="mt-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-[0_20px_50px_-24px_rgb(37_99_235_/_0.45)]">
          <Icon className="h-11 w-11" strokeWidth={1.5} />
        </div>
        <span className="mt-4 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
          {status}
        </span>
        <h1 className="mt-4 text-[28px] font-semibold text-foreground">{title}</h1>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">{tagline}</p>

        <p className="mt-8 max-w-md rounded-2xl bg-secondary/60 p-4 text-left text-sm leading-relaxed text-foreground/85">
          {description}
        </p>

        <div className="mt-6 w-full max-w-md space-y-3">
          <div className="rounded-2xl bg-card p-4 text-left ring-1 ring-border">
            <div className="text-sm font-medium text-foreground">Notify me when available</div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              We'll send a single email — no spam.
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl bg-secondary px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                disabled={!email.includes("@") || joined}
                onClick={() => {
                  joinWaitlist(featureId, email);
                  void postToWebhook({ type: "waitlist.joined", feature: featureId, email });
                  setJoined(true);
                }}
                className="rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
              >
                <Bell className="h-4 w-4" />
              </button>
            </div>
            {joined ? <p className="mt-2 text-xs text-primary">You're on the list.</p> : null}
          </div>

          <button
            onClick={() => {
              const n = toggleVote(featureId);
              setVoteCount(n);
              setVoted(!voted);
              void postToWebhook({
                type: "feature.voted",
                feature: featureId,
                delta: voted ? -1 : 1,
              });
            }}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-medium transition active:scale-[0.98] ${
              voted ? "bg-primary/10 text-primary" : "bg-secondary text-foreground"
            }`}
          >
            <ThumbsUp className={`h-4 w-4 ${voted ? "fill-current" : ""}`} />
            {voted ? "Voted" : "Vote for this feature"} · {voteCount}
          </button>

          <div className="rounded-2xl bg-card p-4 text-left ring-1 ring-border">
            <div className="text-sm font-medium text-foreground">Ideas or feedback</div>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What would make this perfect for you?"
              className="mt-2 w-full resize-none rounded-xl bg-secondary px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              disabled={feedback.trim().length < 3 || sent}
              onClick={() => {
                saveFeedback(featureId, feedback.trim());
                void postToWebhook({
                  type: "feature.feedback",
                  feature: featureId,
                  text: feedback.trim(),
                });
                setSent(true);
                setFeedback("");
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-2.5 text-sm font-medium text-background disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> {sent ? "Thanks!" : "Send feedback"}
            </button>
          </div>
        </div>
      </motion.div>
    </PageShell>
  );
}
