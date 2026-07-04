import { a as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-8y5G6vOy.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Copy, F as Check, M as CircleQuestionMark, P as ChevronLeft, s as Terminal } from "../_libs/lucide-react.mjs";
import { r as toast } from "../_libs/sonner.mjs";
import { t as SYSTEM_PROMPT } from "./reflection-BFo5IkDt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/n8n-BRLocEtN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function N8nSetupPage() {
	const [copiedSection, setCopiedSection] = (0, import_react.useState)(null);
	const copyToClipboard = (text, sectionId) => {
		navigator.clipboard.writeText(text);
		setCopiedSection(sectionId);
		toast.success("Copied to clipboard!");
		setTimeout(() => setCopiedSection(null), 2e3);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/profile",
			className: "mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Back to Profile"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-[30px] font-bold text-foreground tracking-tight",
			children: "n8n Integrations"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Connect Blue Dice to your self-hosted or cloud n8n workflows for custom AI actions, quotes, and notifications."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-2xl bg-card border border-border p-5 shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-base font-semibold text-foreground flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-4 w-4 text-primary" }), " Workflow Overview"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs leading-relaxed text-muted-foreground",
				children: "By wiring up n8n webhooks, you can replace the app's default offline/mock reflections with real-time AI generation. When you roll the dice, Blue Dice sends a request to your webhook. n8n invokes an AI node, saves history, and returns the reflection directly to your web app or mobile companion."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground",
			children: "1. AI System Prompt"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-card border border-border p-4 relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-3 border-b border-border pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold text-foreground",
					children: "LangChain/LLM Node System Message"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => copyToClipboard(systemPrompt, "prompt"),
					className: "rounded-lg bg-secondary p-1.5 text-muted-foreground hover:text-foreground transition",
					"aria-label": "Copy prompt",
					children: copiedSection === "prompt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "text-[10px] leading-relaxed font-mono bg-secondary/50 p-3 rounded-xl overflow-x-auto text-foreground whitespace-pre-wrap max-h-60",
				children: systemPrompt
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-6 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground",
			children: "2. Workflow Template (JSON)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-card border border-border p-4 relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-3 border-b border-border pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-foreground",
						children: "Import into n8n canvas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => copyToClipboard(jsonWorkflow, "workflow"),
						className: "rounded-lg bg-secondary p-1.5 text-muted-foreground hover:text-foreground transition",
						"aria-label": "Copy workflow",
						children: copiedSection === "workflow" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mb-3",
					children: "Copy this JSON code and paste it directly into your n8n workspace to instantiate a starter reflection flow."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "text-[10px] leading-relaxed font-mono bg-secondary/50 p-3 rounded-xl overflow-x-auto text-foreground whitespace-pre max-h-48",
					children: jsonWorkflow
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-6 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground",
			children: "3. Web & App Push Notifications"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-card border border-border p-4 space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-semibold text-foreground",
					children: "Web Push (VAPID Keys)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "To configure push reminders when the tab is closed, run the following terminal command to get VAPID keys:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 bg-secondary p-2 rounded-xl text-[11px] font-mono flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: "npx web-push generate-vapid-keys"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => copyToClipboard("npx web-push generate-vapid-keys", "cmd"),
						className: "text-muted-foreground hover:text-foreground p-1",
						children: copiedSection === "cmd" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 text-green-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[11px] text-muted-foreground",
					children: "Put the public key in your app profile notifications settings, and use the private key inside your n8n Web Push Node to deliver browser and app native notifications!"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-xs font-semibold text-foreground flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-3 w-3 text-primary" }), " Multiplatform Support"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "The webhook payload includes the user's `deviceId` and authenticated `userId`. In n8n, you can route the output to a **Discord/Telegram webhook**, or to a **Firebase Cloud Messaging (FCM)** node to push notifications to Android/iOS companion apps."
				})]
			})]
		})
	] });
}
//#endregion
export { N8nSetupPage as component };
