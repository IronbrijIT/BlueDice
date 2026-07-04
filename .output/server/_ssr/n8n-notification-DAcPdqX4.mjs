import { a as __toESM } from "../_runtime.mjs";
import { a as AnimatePresence, r as motion } from "../_libs/framer-motion.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-8y5G6vOy.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Copy, F as Check, L as Bell, P as ChevronLeft, _ as Play, k as Cpu, p as Server, u as Shield } from "../_libs/lucide-react.mjs";
import { r as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/n8n-notification-DAcPdqX4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function N8nNotificationPage() {
	const [copiedSection, setCopiedSection] = (0, import_react.useState)(null);
	const [simTitle, setSimTitle] = (0, import_react.useState)("Daily Reflection Ready 🎲");
	const [simBody, setSimBody] = (0, import_react.useState)("Your reflection today is waiting. Tap to see where the dice leads.");
	const [simActiveStep, setSimActiveStep] = (0, import_react.useState)(null);
	const [showVirtualPush, setShowVirtualPush] = (0, import_react.useState)(false);
	const copyToClipboard = (text, sectionId) => {
		navigator.clipboard.writeText(text);
		setCopiedSection(sectionId);
		toast.success("Copied to clipboard!");
		setTimeout(() => setCopiedSection(null), 2e3);
	};
	const playSound = () => {
		try {
			const AudioCtx = window.AudioContext || window.webkitAudioContext;
			if (!AudioCtx) return;
			const ctx = new AudioCtx();
			const now = ctx.currentTime;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(880, now);
			osc.frequency.exponentialRampToValueAtTime(1200, now + .1);
			osc.frequency.exponentialRampToValueAtTime(880, now + .25);
			gain.gain.setValueAtTime(.2, now);
			gain.gain.exponentialRampToValueAtTime(.001, now + .8);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start(now);
			osc.stop(now + .8);
		} catch (e) {
			console.warn("AudioContext block:", e);
		}
	};
	const runSimulation = () => {
		if (simActiveStep !== null) return;
		setShowVirtualPush(false);
		setSimActiveStep(0);
		setTimeout(() => {
			setSimActiveStep(1);
		}, 1e3);
		setTimeout(() => {
			setSimActiveStep(2);
		}, 2200);
		setTimeout(() => {
			setSimActiveStep(3);
		}, 3400);
		setTimeout(() => {
			setSimActiveStep(4);
			setShowVirtualPush(true);
			playSound();
			if ("vibrate" in navigator) navigator.vibrate([
				100,
				50,
				100
			]);
		}, 4500);
		setTimeout(() => {
			setSimActiveStep(null);
		}, 8e3);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/profile",
			className: "mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Back to Profile"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "text-[30px] font-bold text-foreground tracking-tight flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-7 w-7 text-primary" }), " Target User Push Workflow"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Secure device notification tokens with Firestore Rules, and configure n8n to target a specific user."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground",
			children: "Interactive Push Simulator"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl bg-card border border-border p-6 shadow-xl relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-0 right-0 p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary animate-pulse",
					children: "Live Test"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
							children: "Notification Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: simTitle,
							onChange: (e) => setSimTitle(e.target.value),
							className: "mt-1 w-full rounded-xl bg-secondary px-3 py-2 text-sm text-foreground outline-none border border-transparent focus:border-primary focus:bg-background transition"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
							children: "Notification Body"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: simBody,
							rows: 2,
							onChange: (e) => setSimBody(e.target.value),
							className: "mt-1 w-full rounded-xl bg-secondary px-3 py-2 text-sm text-foreground outline-none border border-transparent focus:border-primary focus:bg-background transition resize-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: runSimulation,
							disabled: simActiveStep !== null,
							className: "w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 active:scale-95 transition disabled:opacity-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" }), " Trigger Pipeline Simulation"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-[210px] h-[400px] rounded-[36px] bg-zinc-950 border-4 border-zinc-800 p-2 shadow-2xl overflow-hidden flex flex-col items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-16 h-4 bg-zinc-800 rounded-b-xl mb-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full flex-1 flex flex-col items-center justify-start pt-6 space-y-4 px-2 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showVirtualPush && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										y: -60,
										opacity: 0,
										scale: .9
									},
									animate: {
										y: 0,
										opacity: 1,
										scale: 1
									},
									exit: {
										y: -60,
										opacity: 0
									},
									className: "absolute top-2 left-2 right-2 bg-zinc-900/90 border border-border/40 p-3 rounded-2xl shadow-xl z-20 backdrop-blur-md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-7 w-7 rounded-lg bg-primary/20 flex items-center justify-center text-xs",
											children: "🎲"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] font-bold text-white truncate",
												children: simTitle
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[9px] text-zinc-300 leading-normal line-clamp-2 mt-0.5",
												children: simBody
											})]
										})]
									})
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full space-y-3.5 text-[9px] font-medium",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `flex items-center gap-2 p-2 rounded-xl border transition-all ${simActiveStep === 1 ? "bg-primary/20 border-primary text-white scale-105" : "bg-zinc-900/40 border-zinc-900 text-zinc-500"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Firestore Fetch Token" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `flex items-center gap-2 p-2 rounded-xl border transition-all ${simActiveStep === 2 ? "bg-primary/20 border-primary text-white scale-105" : "bg-zinc-900/40 border-zinc-900 text-zinc-500"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "n8n Routing Process" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `flex items-center gap-2 p-2 rounded-xl border transition-all ${simActiveStep === 3 ? "bg-primary/20 border-primary text-white scale-105" : "bg-zinc-900/40 border-zinc-900 text-zinc-500"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Web Push Node Outbound" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `flex items-center gap-2 p-2 rounded-xl border transition-all ${simActiveStep === 4 ? "bg-primary/20 border-primary text-white scale-105" : "bg-zinc-900/40 border-zinc-900 text-zinc-500"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Device Delivery Successful" })]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-20 h-1 bg-zinc-800 rounded-full mb-1" })
						]
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground",
			children: "1. Cloud Firestore Rules"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-card border border-border p-4 relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-3 border-b border-border pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-semibold text-foreground flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 text-primary" }), " firebase.rules"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => copyToClipboard(firestoreRules, "rules"),
						className: "rounded-lg bg-secondary p-1.5 text-muted-foreground hover:text-foreground transition",
						children: copiedSection === "rules" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mb-3",
					children: "Configure these security rules in your Firebase Console to lock down push notification subscription tokens. Only the owner can read/write their tokens."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "text-[10px] leading-relaxed font-mono bg-secondary/50 p-3 rounded-xl overflow-x-auto text-foreground whitespace-pre",
					children: firestoreRules
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-6 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground",
			children: "2. Specific User Push Node (JSON)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-card border border-border p-4 relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-3 border-b border-border pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-foreground",
						children: "Paste into n8n workspace"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => copyToClipboard(n8nWorkflowJson, "wjson"),
						className: "rounded-lg bg-secondary p-1.5 text-muted-foreground hover:text-foreground transition",
						children: copiedSection === "wjson" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground mb-3",
					children: [
						"This n8n template reads the active device subscription from the target user's Firestore path (`users/",
						userId,
						"/subscriptions`), then pushes the payload to Web Push Node:"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "text-[10px] leading-relaxed font-mono bg-secondary/50 p-3 rounded-xl overflow-x-auto text-foreground whitespace-pre max-h-56",
					children: n8nWorkflowJson
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-6 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground",
			children: "3. Implementation Step-by-Step"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-card border border-border p-5 space-y-4 text-xs text-muted-foreground leading-relaxed",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-foreground text-sm",
					children: "Step 1: Write Subscription Token to Firestore"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1",
					children: [
						"When users authorize push notifications, the app records their subscription details under the authenticated path `users/",
						userId,
						"/subscriptions/",
						subscriptionId,
						"`."
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-foreground text-sm",
						children: "Step 2: Trigger the n8n webhook"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "Call your n8n webhook with the target `userId`, `title`, and `body` payload:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 bg-secondary p-2 rounded-xl font-mono text-[10px]",
						children: "{ \"userId\": \"ABC-123\", \"title\": \"Alert\", \"body\": \"New reflection!\" }"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-foreground text-sm",
					children: "Step 3: n8n fetches Subscription & Sends Web Push"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1",
					children: "n8n fetches the subscription node from Firestore, injects it into the Web Push node, and uses your VAPID keys to send the notification to the user's browser/app device client."
				})] })
			]
		})
	] });
}
//#endregion
export { N8nNotificationPage as component };
