import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  Calendar,
  ChevronRight,
  Crown,
  Info,
  LayoutGrid,
  Mic,
  Palette,
  ShieldCheck,
  Trash2,
  Trophy,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { PageShell } from "../components/PageShell";
import { clearHistory } from "../services/storage";

import { useAuth } from "../hooks/useAuth";


export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Blue Dice" },
      { name: "description", content: "Settings and preferences." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, logout } = useAuth();
  const [about, setAbout] = useState<"about" | "privacy" | null>(null);


  return (
    <PageShell title="Profile" subtitle="Preferences and app settings.">
      {/* Profile Header */}
      {profile && (
        <div className="mb-6 flex items-center justify-between rounded-3xl bg-card p-5 ring-1 ring-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary text-xl font-bold uppercase">
              {profile.name ? profile.name[0] : "?"}
            </div>
            <div>
              <div className="font-semibold text-foreground text-base leading-none">{profile.name}</div>
              <div className="text-xs text-muted-foreground mt-1.5">{profile.email}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 rounded-xl bg-secondary hover:bg-destructive/10 hover:text-destructive px-3 py-2.5 text-xs font-semibold text-foreground transition active:scale-95 cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" /> Log Out
          </button>
        </div>
      )}



      <section className="space-y-3">
        <SectionTitle>Features</SectionTitle>

        <NavRow Icon={Bell} label="Notifications" to="/settings/notifications" />
        <NavRow Icon={Calendar} label="Calendar" to="/calendar" />
        <NavRow Icon={Trophy} label="Achievements" to="/achievements" />

      </section>



      <section className="mt-6 space-y-3">
        <SectionTitle>Data</SectionTitle>
        <button
          onClick={() => {
            if (confirm("Clear all reflection history? This cannot be undone.")) {
              clearHistory();
            }
          }}
          className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left ring-1 ring-border active:scale-[0.99]"
        >
          <div className="rounded-xl bg-destructive/10 p-2 text-destructive">
            <Trash2 className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground">Clear history</div>
            <div className="text-xs text-muted-foreground">
              Remove every past reflection from this device.
            </div>
          </div>
        </button>
      </section>

      <section className="mt-6 space-y-3">
        <SectionTitle>About</SectionTitle>
        <InfoRow Icon={Info} label="About Blue Dice" onClick={() => setAbout("about")} />
        <InfoRow Icon={ShieldCheck} label="Privacy policy" onClick={() => setAbout("privacy")} />
        {about === "about" ? (
          <p className="rounded-2xl bg-secondary/60 p-4 text-xs leading-relaxed text-muted-foreground">
            Blue Dice is a calm, minimal reflection app. Every reflection is offered as thoughtful
            inspiration — not prediction. Use it to pause, journal, and return to yourself.
          </p>
        ) : null}
        {about === "privacy" ? (
          <p className="rounded-2xl bg-secondary/60 p-4 text-xs leading-relaxed text-muted-foreground">
            Your history, favorites, and webhook URL are stored only on this device (localStorage).
            When a webhook is configured, reflection requests are sent to your chosen endpoint.
          </p>
        ) : null}
      </section>

      <section className="mt-8 space-y-3">
        <SectionTitle>Previews</SectionTitle>
        <PreviewNav Icon={Crown} label="Premium" feature="premium" />
        <PreviewNav Icon={LayoutGrid} label="Widgets" feature="widgets" />
        <PreviewNav Icon={Palette} label="Themes" feature="themes" />
        <PreviewNav Icon={Mic} label="Voice reading" feature="voice-reading" />
      </section>

      <p className="mt-8 text-center text-[11px] text-muted-foreground">Blue Dice · v0.1</p>
    </PageShell>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </h2>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-primary/5 p-3 text-center ring-1 ring-primary/10">
      <div className="text-lg font-semibold text-foreground">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function NavRow({ Icon, label, to }: { Icon: typeof Bell; label: string; to: string }) {
  return (
    <Link
      to={to}
      className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 ring-1 ring-border active:scale-[0.99]"
    >
      <div className="rounded-xl bg-primary/10 p-2 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 text-sm font-medium text-foreground">{label}</div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}

function PreviewNav({
  Icon,
  label,
  feature,
}: {
  Icon: typeof Bell;
  label: string;
  feature: string;
}) {
  return (
    <Link
      to="/preview/$feature"
      params={{ feature }}
      className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 ring-1 ring-border active:scale-[0.99]"
    >
      <div className="rounded-xl bg-secondary p-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">Preview & vote</div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}

function InfoRow({
  Icon,
  label,
  onClick,
}: {
  Icon: typeof Info;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left ring-1 ring-border active:scale-[0.99]"
    >
      <div className="rounded-xl bg-secondary p-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 text-sm font-medium text-foreground">{label}</div>
      <span className="text-muted-foreground">›</span>
    </button>
  );
}
