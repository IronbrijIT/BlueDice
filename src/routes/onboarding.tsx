import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { PageShell } from "../components/PageShell";
import { User, Mail, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding — Blue Dice" },
      { name: "description", content: "Tell us a bit about yourself." },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const { user, profile, saveProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!loading && !user) {
      navigate({ to: "/login" });
      return;
    }

    // Prefill from user/profile if available
    if (user) {
      setEmail(user.email || "");
      if (profile?.name) {
        setName(profile.name);
      }
    }
  }, [user, profile, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setSaving(true);
    try {
      await saveProfile(name.trim(), email.trim());
      toast.success("Profile saved!");
      navigate({ to: "/" });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <PageShell>
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-2">
        <div className="w-full max-w-md">
          {/* Sparkly Top */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block relative mb-4"
            >
              <div className="absolute inset-0 bg-primary/25 rounded-full blur-xl" />
              <div className="relative bg-card border border-border p-4 rounded-3xl shadow-xl flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              </div>
            </motion.div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Let's get acquainted
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Please customize your profile so we can personalize your daily experience.
            </p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-xl backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  What is your name?
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl bg-secondary px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-transparent focus:ring-primary focus:bg-background transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  What is your email address?
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-secondary px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-transparent focus:ring-primary focus:bg-background transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 active:scale-[0.98] transition disabled:opacity-50"
              >
                {saving ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <>
                    Confirm and continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
