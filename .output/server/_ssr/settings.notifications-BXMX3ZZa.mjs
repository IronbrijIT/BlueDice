import { a as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-8y5G6vOy.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as ChevronLeft, a as Trash2, g as Plus } from "../_libs/lucide-react.mjs";
import "../_libs/firebase.mjs";
import { a as deleteDoc, d as doc, l as setDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { n as db, t as auth } from "./firebase-D2wZyzJA.mjs";
import { l as setNotifPrefs, n as getNotifPrefs, r as getQueue, s as postToWebhook } from "./webhook-XOvR656d.mjs";
import { i as scheduleReminder, r as makeId, t as cancelReminder } from "./scheduler-Cs1sEp_B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings.notifications-BXMX3ZZa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useNotifPrefs() {
	const [prefs, setPrefs] = (0, import_react.useState)(() => getNotifPrefs());
	(0, import_react.useEffect)(() => {
		const refresh = () => setPrefs(getNotifPrefs());
		window.addEventListener("bluedice:storage", refresh);
		return () => window.removeEventListener("bluedice:storage", refresh);
	}, []);
	return [prefs, (p) => setPrefs(setNotifPrefs(p))];
}
function useNotifQueue() {
	const [q, setQ] = (0, import_react.useState)(() => getQueue());
	(0, import_react.useEffect)(() => {
		const refresh = () => setQ(getQueue());
		window.addEventListener("bluedice:storage", refresh);
		return () => window.removeEventListener("bluedice:storage", refresh);
	}, []);
	return q;
}
function useNotifPermission() {
	const [p, setP] = (0, import_react.useState)(() => typeof window === "undefined" || !("Notification" in window) ? "unsupported" : Notification.permission);
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => {
			if ("Notification" in window) setP(Notification.permission);
		}, 2e3);
		return () => clearInterval(t);
	}, []);
	return p;
}
function urlBase64ToUint8Array(base64) {
	const b64 = (base64 + "=".repeat((4 - base64.length % 4) % 4)).replace(/-/g, "+").replace(/_/g, "/");
	const raw = atob(b64);
	const arr = new Uint8Array(raw.length);
	for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
	return arr;
}
function pushSupported() {
	return typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
}
async function requestPermission() {
	if (!("Notification" in window)) return "denied";
	if (Notification.permission === "default") return await Notification.requestPermission();
	return Notification.permission;
}
async function registerPushWorker() {
	if (!pushSupported()) return null;
	try {
		return await navigator.serviceWorker.register("/push-sw.js", { scope: "/" });
	} catch (e) {
		console.warn("Push SW registration failed", e);
		return null;
	}
}
async function subscribePush() {
	const reg = await registerPushWorker();
	if (!reg) return null;
	const key = getNotifPrefs().vapidPublicKey.trim();
	if (!key) throw new Error("Paste your VAPID public key in Notification Settings first.");
	const sub = await reg.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(key).buffer
	});
	const subJson = sub.toJSON();
	await postToWebhook({
		type: "push.subscribed",
		subscription: subJson
	});
	if (auth.currentUser) {
		const subId = btoa(sub.endpoint).replace(/[^a-zA-Z0-9]/g, "").slice(-20);
		try {
			await setDoc(doc(db, "users", auth.currentUser.uid, "subscriptions", subId), {
				subscription: subJson,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		} catch (e) {
			console.error("Failed to save push subscription to firestore:", e);
		}
	}
	return sub;
}
async function unsubscribePush() {
	if (!pushSupported()) return;
	const sub = await (await navigator.serviceWorker.getRegistration("/"))?.pushManager.getSubscription();
	if (sub) {
		await postToWebhook({
			type: "push.unsubscribed",
			endpoint: sub.endpoint
		});
		if (auth.currentUser) {
			const subId = btoa(sub.endpoint).replace(/[^a-zA-Z0-9]/g, "").slice(-20);
			try {
				await deleteDoc(doc(db, "users", auth.currentUser.uid, "subscriptions", subId));
			} catch (e) {
				console.error("Failed to remove push subscription from firestore:", e);
			}
		}
		await sub.unsubscribe();
	}
}
function NotificationSettings() {
	const [prefs, setPrefs] = useNotifPrefs();
	const permission = useNotifPermission();
	const queue = useNotifQueue();
	const [status, setStatus] = (0, import_react.useState)(null);
	const enablePush = async () => {
		try {
			if (await requestPermission() !== "granted") {
				setStatus("Permission was not granted.");
				return;
			}
			setPrefs({ enabled: true });
			await subscribePush();
			setStatus("Push notifications enabled.");
		} catch (e) {
			setStatus(e instanceof Error ? e.message : "Failed to enable push.");
		}
		setTimeout(() => setStatus(null), 3e3);
	};
	const disablePush = async () => {
		await unsubscribePush();
		setPrefs({ enabled: false });
		setStatus("Push notifications disabled.");
		setTimeout(() => setStatus(null), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/profile",
			className: "mb-4 inline-flex items-center text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Back"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-[28px] font-semibold text-foreground",
			children: "Notifications"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Local reminders and web push through your n8n webhook."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Permission" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-card p-4 ring-1 ring-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-medium",
					children: "Browser notifications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: ["Status: ", permission === "unsupported" ? "not supported on this device" : permission]
				})] }), prefs.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: disablePush,
					className: "rounded-xl bg-secondary px-3 py-2 text-sm font-medium",
					children: "Disable"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: enablePush,
					className: "rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground",
					children: "Enable"
				})]
			}), status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-primary",
				children: status
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Categories" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
			label: "Motivational reminders",
			value: prefs.motivational,
			onChange: (v) => setPrefs({ motivational: v })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
			label: "Work reminders",
			value: prefs.work,
			onChange: (v) => setPrefs({ work: v })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
			label: "Streak reminders",
			value: prefs.streak,
			onChange: (v) => setPrefs({ streak: v })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
			label: "Reflection reminders",
			value: prefs.reflection,
			onChange: (v) => setPrefs({ reflection: v })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Motivational frequency" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl bg-card p-4 ring-1 ring-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: [
					"daily",
					"twiceDaily",
					"weekly"
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setPrefs({ motivationalFrequency: f }),
					className: `flex-1 rounded-xl py-2 text-xs font-medium ${prefs.motivationalFrequency === f ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`,
					children: f === "twiceDaily" ? "2× daily" : f
				}, f))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Quiet hours" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 rounded-2xl bg-card p-3 ring-1 ring-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: "From"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "time",
					value: prefs.quietHoursStart,
					onChange: (e) => setPrefs({ quietHoursStart: e.target.value }),
					className: "mt-1 w-full bg-transparent text-lg font-semibold outline-none"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 rounded-2xl bg-card p-3 ring-1 ring-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: "To"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "time",
					value: prefs.quietHoursEnd,
					onChange: (e) => setPrefs({ quietHoursEnd: e.target.value }),
					className: "mt-1 w-full bg-transparent text-lg font-semibold outline-none"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Push delivery (n8n)" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-card p-4 ring-1 ring-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs text-muted-foreground",
					children: "VAPID public key"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					placeholder: "BFn8… (from `npx web-push generate-vapid-keys`)",
					value: prefs.vapidPublicKey,
					onChange: (e) => setPrefs({ vapidPublicKey: e.target.value }),
					className: "mt-1 w-full rounded-xl bg-secondary px-3 py-2 text-sm outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-xs text-muted-foreground",
					children: "n8n sync webhook URL"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "url",
					placeholder: "https://your-n8n.example.com/webhook/blue-dice-sync",
					value: prefs.syncWebhookUrl,
					onChange: (e) => setPrefs({ syncWebhookUrl: e.target.value }),
					className: "mt-1 w-full rounded-xl bg-secondary px-3 py-2 text-sm outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: "Push subscriptions and custom reminders are POSTed here. n8n signs and sends web-push using your VAPID private key server-side."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Custom reminders" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomReminderForm, {}),
		queue.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 space-y-2",
			children: queue.slice().sort((a, b) => a.fireAt - b.fireAt).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-2xl bg-card p-3 ring-1 ring-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-sm font-medium",
						children: r.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "truncate text-xs text-muted-foreground",
						children: [
							new Date(r.fireAt).toLocaleString(),
							" · ",
							r.category,
							r.repeatMs ? " · repeating" : ""
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => cancelReminder(r.id),
					className: "rounded-xl bg-secondary p-2 text-muted-foreground",
					"aria-label": "Cancel reminder",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
				})]
			}, r.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-xs text-muted-foreground",
			children: "No reminders scheduled."
		})
	] });
}
function SectionTitle({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mt-6 mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground",
		children
	});
}
function Toggle({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex items-center justify-between rounded-2xl bg-card p-4 ring-1 ring-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm font-medium text-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			role: "switch",
			"aria-checked": value,
			onClick: () => onChange(!value),
			className: `relative h-7 w-12 rounded-full transition ${value ? "bg-primary" : "bg-border"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${value ? "left-[22px]" : "left-0.5"}` })
		})]
	});
}
function CustomReminderForm() {
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	const [when, setWhen] = (0, import_react.useState)("");
	const [repeat, setRepeat] = (0, import_react.useState)("none");
	const submit = () => {
		if (!title || !when) return;
		const fireAt = new Date(when).getTime();
		if (Number.isNaN(fireAt) || fireAt < Date.now()) return;
		scheduleReminder({
			id: makeId(),
			title,
			body,
			category: "custom",
			fireAt,
			repeatMs: repeat === "daily" ? 1440 * 60 * 1e3 : repeat === "weekly" ? 10080 * 60 * 1e3 : void 0
		});
		setTitle("");
		setBody("");
		setWhen("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-card p-4 ring-1 ring-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				placeholder: "Title",
				value: title,
				onChange: (e) => setTitle(e.target.value),
				className: "w-full rounded-xl bg-secondary px-3 py-2 text-sm outline-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				placeholder: "Message (optional)",
				value: body,
				onChange: (e) => setBody(e.target.value),
				className: "mt-2 w-full rounded-xl bg-secondary px-3 py-2 text-sm outline-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "datetime-local",
					value: when,
					onChange: (e) => setWhen(e.target.value),
					className: "flex-1 rounded-xl bg-secondary px-3 py-2 text-sm outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: repeat,
					onChange: (e) => setRepeat(e.target.value),
					className: "rounded-xl bg-secondary px-3 py-2 text-sm outline-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "none",
							children: "Once"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "daily",
							children: "Daily"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "weekly",
							children: "Weekly"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: submit,
				className: "mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Schedule reminder"]
			})
		]
	});
}
//#endregion
export { NotificationSettings as component };
