import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "../components/PageShell";
import { ChevronLeft, Copy, Check, Terminal, ExternalLink, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { SYSTEM_PROMPT } from "../services/reflection";

export const Route = createFileRoute("/n8n")({
  head: () => ({
    meta: [
      { title: "n8n Setup — Blue Dice" },
      { name: "description", content: "Configure your n8n workflow for custom AI reflections." },
    ],
  }),
  component: N8nSetupPage,
});

function N8nSetupPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const systemPrompt = SYSTEM_PROMPT;

  const jsonWorkflow = `{
  "meta": {
    "instanceId": "bluedice-instance"
  },
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "blue-dice-sync",
        "responseMode": "onReceived",
        "options": {}
      },
      "id": "trigger-webhook",
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "model": "gpt-4o-mini",
        "options": {
          "temperature": 0.7
        }
      },
      "id": "openai-llm",
      "name": "OpenAI Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1,
      "position": [450, 450]
    },
    {
      "parameters": {
        "promptType": "custom",
        "systemMessage": "=${systemPrompt}",
        "userMessage": "=User Prompt: {{ $json.body.prompt || 'None' }}\\nTimestamp: {{ $json.body.at }}"
      },
      "id": "llm-node",
      "name": "AI Reflection Generator",
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1.4,
      "position": [450, 300]
    }
  ],
  "connections": {
    "Webhook Trigger": {
      "main": [
        [
          {
            "node": "AI Reflection Generator",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Reflection Generator",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    }
  }
}`;

  return (
    <PageShell>
      <Link to="/profile" className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition">
        <ChevronLeft className="h-4 w-4" /> Back to Profile
      </Link>
      
      <h1 className="text-[30px] font-bold text-foreground tracking-tight">n8n Integrations</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Connect Blue Dice to your self-hosted or cloud n8n workflows for custom AI actions, quotes, and notifications.
      </p>

      {/* Guide Card */}
      <div className="mt-6 rounded-2xl bg-card border border-border p-5 shadow-sm">
        <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" /> Workflow Overview
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          By wiring up n8n webhooks, you can replace the app's default offline/mock reflections with real-time AI generation. 
          When you roll the dice, Blue Dice sends a request to your webhook. n8n invokes an AI node, saves history, and returns the reflection directly to your web app or mobile companion.
        </p>
      </div>

      {/* Section 1: AI Prompt */}
      <h2 className="mt-8 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        1. AI System Prompt
      </h2>
      <div className="rounded-2xl bg-card border border-border p-4 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
          <span className="text-xs font-semibold text-foreground">LangChain/LLM Node System Message</span>
          <button
            onClick={() => copyToClipboard(systemPrompt, "prompt")}
            className="rounded-lg bg-secondary p-1.5 text-muted-foreground hover:text-foreground transition"
            aria-label="Copy prompt"
          >
            {copiedSection === "prompt" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <pre className="text-[10px] leading-relaxed font-mono bg-secondary/50 p-3 rounded-xl overflow-x-auto text-foreground whitespace-pre-wrap max-h-60">
          {systemPrompt}
        </pre>
      </div>

      {/* Section 2: n8n Workflow JSON */}
      <h2 className="mt-6 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        2. Workflow Template (JSON)
      </h2>
      <div className="rounded-2xl bg-card border border-border p-4 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
          <span className="text-xs font-semibold text-foreground">Import into n8n canvas</span>
          <button
            onClick={() => copyToClipboard(jsonWorkflow, "workflow")}
            className="rounded-lg bg-secondary p-1.5 text-muted-foreground hover:text-foreground transition"
            aria-label="Copy workflow"
          >
            {copiedSection === "workflow" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Copy this JSON code and paste it directly into your n8n workspace to instantiate a starter reflection flow.
        </p>
        <pre className="text-[10px] leading-relaxed font-mono bg-secondary/50 p-3 rounded-xl overflow-x-auto text-foreground whitespace-pre max-h-48">
          {jsonWorkflow}
        </pre>
      </div>

      {/* Section 3: Notification Setup */}
      <h2 className="mt-6 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        3. Web & App Push Notifications
      </h2>
      <div className="rounded-2xl bg-card border border-border p-4 space-y-4">
        <div>
          <h3 className="text-xs font-semibold text-foreground">Web Push (VAPID Keys)</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            To configure push reminders when the tab is closed, run the following terminal command to get VAPID keys:
          </p>
          <div className="mt-2 bg-secondary p-2 rounded-xl text-[11px] font-mono flex items-center justify-between">
            <span className="text-foreground">npx web-push generate-vapid-keys</span>
            <button
              onClick={() => copyToClipboard("npx web-push generate-vapid-keys", "cmd")}
              className="text-muted-foreground hover:text-foreground p-1"
            >
              {copiedSection === "cmd" ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Put the public key in your app profile notifications settings, and use the private key inside your n8n Web Push Node to deliver browser and app native notifications!
          </p>
        </div>

        <div className="border-t border-border pt-3">
          <h3 className="text-xs font-semibold text-foreground flex items-center gap-1">
            <HelpCircle className="h-3 w-3 text-primary" /> Multiplatform Support
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            The webhook payload includes the user's `deviceId` and authenticated `userId`. 
            In n8n, you can route the output to a **Discord/Telegram webhook**, or to a **Firebase Cloud Messaging (FCM)** node to push notifications to Android/iOS companion apps.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
