import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "../components/PageShell";
import { ChevronLeft, Copy, Check, Shield, Bell, Send, Play, Cpu, Server } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/n8n-notification")({
  head: () => ({
    meta: [
      { title: "n8n Specific User Push — Blue Dice" },
      { name: "description", content: "Send push notifications to specific users using n8n and Firestore rules." },
    ],
  }),
  component: N8nNotificationPage,
});

function N8nNotificationPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  
  // Simulator State
  const [simTitle, setSimTitle] = useState("Daily Reflection Ready 🎲");
  const [simBody, setSimBody] = useState("Your reflection today is waiting. Tap to see where the dice leads.");
  const [simActiveStep, setSimActiveStep] = useState<number | null>(null);
  const [showVirtualPush, setShowVirtualPush] = useState(false);

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Play a beautiful synthesized bell sound using Web Audio API
  const playSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      // High-pitched chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.8);
    } catch (e) {
      console.warn("AudioContext block:", e);
    }
  };

  const runSimulation = () => {
    if (simActiveStep !== null) return;
    setShowVirtualPush(false);
    
    // Step 0: Trigger Simulator
    setSimActiveStep(0);
    
    // Step 1: Firestore reads/writes
    setTimeout(() => {
      setSimActiveStep(1);
    }, 1000);

    // Step 2: n8n node matching
    setTimeout(() => {
      setSimActiveStep(2);
    }, 2200);

    // Step 3: Web Push node
    setTimeout(() => {
      setSimActiveStep(3);
    }, 3400);

    // Step 4: Device gets push
    setTimeout(() => {
      setSimActiveStep(4);
      setShowVirtualPush(true);
      playSound();
      if ("vibrate" in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
    }, 4500);

    // Clear simulation
    setTimeout(() => {
      setSimActiveStep(null);
    }, 8000);
  };

  const firestoreRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Lock down user collections so only the owner can read/write
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // Rules specifically securing the subscriptions subcollection
      match /subscriptions/{subscriptionId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}`;

  const n8nWorkflowJson = `{
  "meta": {
    "instanceId": "bluedice-specific-instance"
  },
  "nodes": [
    {
      "parameters": {
        "operation": "get",
        "collection": "=users/{{ $json.userId }}/subscriptions"
      },
      "id": "fetch-firestore-sub",
      "name": "Get User Subscriptions",
      "type": "n8n-nodes-base.googleFirestore",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "options": {
          "title": "={{ $json.title || 'Blue Dice' }}",
          "body": "={{ $json.body }}",
          "icon": "/icon-192.png",
          "badge": "/icon-192.png"
        }
      },
      "id": "web-push-node",
      "name": "Send Web Push",
      "type": "n8n-nodes-base.webPush",
      "typeVersion": 1,
      "position": [650, 300],
      "credentials": {
        "webPushApi": {
          "id": "vapid-credentials-id"
        }
      }
    }
  ]
}`;

  return (
    <PageShell>
      <Link to="/profile" className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition">
        <ChevronLeft className="h-4 w-4" /> Back to Profile
      </Link>

      <h1 className="text-[30px] font-bold text-foreground tracking-tight flex items-center gap-2">
        <Bell className="h-7 w-7 text-primary" /> Target User Push Workflow
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Secure device notification tokens with Firestore Rules, and configure n8n to target a specific user.
      </p>

      {/* Simulator Section (SOMETHING CRAZY!) */}
      <h2 className="mt-8 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Interactive Push Simulator
      </h2>
      <div className="rounded-3xl bg-card border border-border p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary animate-pulse">
            Live Test
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Notification Title
              </label>
              <input
                type="text"
                value={simTitle}
                onChange={(e) => setSimTitle(e.target.value)}
                className="mt-1 w-full rounded-xl bg-secondary px-3 py-2 text-sm text-foreground outline-none border border-transparent focus:border-primary focus:bg-background transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Notification Body
              </label>
              <textarea
                value={simBody}
                rows={2}
                onChange={(e) => setSimBody(e.target.value)}
                className="mt-1 w-full rounded-xl bg-secondary px-3 py-2 text-sm text-foreground outline-none border border-transparent focus:border-primary focus:bg-background transition resize-none"
              />
            </div>
            <button
              onClick={runSimulation}
              disabled={simActiveStep !== null}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 active:scale-95 transition disabled:opacity-40"
            >
              <Play className="h-4 w-4" /> Trigger Pipeline Simulation
            </button>
          </div>

          {/* Virtual Phone Mockup */}
          <div className="flex flex-col items-center">
            <div className="relative w-[210px] h-[400px] rounded-[36px] bg-zinc-950 border-4 border-zinc-800 p-2 shadow-2xl overflow-hidden flex flex-col items-center">
              {/* Camera Notch */}
              <div className="w-16 h-4 bg-zinc-800 rounded-b-xl mb-4" />
              
              {/* Visual Flow diagram inside phone */}
              <div className="w-full flex-1 flex flex-col items-center justify-start pt-6 space-y-4 px-2 relative">
                <AnimatePresence>
                  {showVirtualPush && (
                    <motion.div
                      initial={{ y: -60, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -60, opacity: 0 }}
                      className="absolute top-2 left-2 right-2 bg-zinc-900/90 border border-border/40 p-3 rounded-2xl shadow-xl z-20 backdrop-blur-md"
                    >
                      <div className="flex items-start gap-2">
                        <div className="h-7 w-7 rounded-lg bg-primary/20 flex items-center justify-center text-xs">
                          🎲
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-bold text-white truncate">{simTitle}</div>
                          <div className="text-[9px] text-zinc-300 leading-normal line-clamp-2 mt-0.5">{simBody}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Steps Visualizer */}
                <div className="w-full space-y-3.5 text-[9px] font-medium">
                  <div className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${simActiveStep === 1 ? "bg-primary/20 border-primary text-white scale-105" : "bg-zinc-900/40 border-zinc-900 text-zinc-500"}`}>
                    <Shield className="h-3.5 w-3.5" />
                    <span>Firestore Fetch Token</span>
                  </div>
                  <div className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${simActiveStep === 2 ? "bg-primary/20 border-primary text-white scale-105" : "bg-zinc-900/40 border-zinc-900 text-zinc-500"}`}>
                    <Server className="h-3.5 w-3.5" />
                    <span>n8n Routing Process</span>
                  </div>
                  <div className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${simActiveStep === 3 ? "bg-primary/20 border-primary text-white scale-105" : "bg-zinc-900/40 border-zinc-900 text-zinc-500"}`}>
                    <Cpu className="h-3.5 w-3.5" />
                    <span>Web Push Node Outbound</span>
                  </div>
                  <div className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${simActiveStep === 4 ? "bg-primary/20 border-primary text-white scale-105" : "bg-zinc-900/40 border-zinc-900 text-zinc-500"}`}>
                    <Bell className="h-3.5 w-3.5" />
                    <span>Device Delivery Successful</span>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="w-20 h-1 bg-zinc-800 rounded-full mb-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Security Rules */}
      <h2 className="mt-8 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        1. Cloud Firestore Rules
      </h2>
      <div className="rounded-2xl bg-card border border-border p-4 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
          <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-primary" /> firebase.rules
          </span>
          <button
            onClick={() => copyToClipboard(firestoreRules, "rules")}
            className="rounded-lg bg-secondary p-1.5 text-muted-foreground hover:text-foreground transition"
          >
            {copiedSection === "rules" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Configure these security rules in your Firebase Console to lock down push notification subscription tokens. Only the owner can read/write their tokens.
        </p>
        <pre className="text-[10px] leading-relaxed font-mono bg-secondary/50 p-3 rounded-xl overflow-x-auto text-foreground whitespace-pre">
          {firestoreRules}
        </pre>
      </div>

      {/* Section 2: n8n workflow for user specific push */}
      <h2 className="mt-6 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        2. Specific User Push Node (JSON)
      </h2>
      <div className="rounded-2xl bg-card border border-border p-4 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
          <span className="text-xs font-semibold text-foreground">Paste into n8n workspace</span>
          <button
            onClick={() => copyToClipboard(n8nWorkflowJson, "wjson")}
            className="rounded-lg bg-secondary p-1.5 text-muted-foreground hover:text-foreground transition"
          >
            {copiedSection === "wjson" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          This n8n template reads the active device subscription from the target user's Firestore path (`users/{userId}/subscriptions`), then pushes the payload to Web Push Node:
        </p>
        <pre className="text-[10px] leading-relaxed font-mono bg-secondary/50 p-3 rounded-xl overflow-x-auto text-foreground whitespace-pre max-h-56">
          {n8nWorkflowJson}
        </pre>
      </div>

      {/* Description on how it works */}
      <h2 className="mt-6 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        3. Implementation Step-by-Step
      </h2>
      <div className="rounded-2xl bg-card border border-border p-5 space-y-4 text-xs text-muted-foreground leading-relaxed">
        <div>
          <h3 className="font-semibold text-foreground text-sm">Step 1: Write Subscription Token to Firestore</h3>
          <p className="mt-1">
            When users authorize push notifications, the app records their subscription details under the authenticated path `users/{userId}/subscriptions/{subscriptionId}`.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm">Step 2: Trigger the n8n webhook</h3>
          <p className="mt-1">
            Call your n8n webhook with the target `userId`, `title`, and `body` payload:
          </p>
          <div className="mt-2 bg-secondary p-2 rounded-xl font-mono text-[10px]">
            {"{ \"userId\": \"ABC-123\", \"title\": \"Alert\", \"body\": \"New reflection!\" }"}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm">Step 3: n8n fetches Subscription & Sends Web Push</h3>
          <p className="mt-1">
            n8n fetches the subscription node from Firestore, injects it into the Web Push node, and uses your VAPID keys to send the notification to the user's browser/app device client.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
