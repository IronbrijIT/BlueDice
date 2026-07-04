import { a as __toESM } from "../_runtime.mjs";
import { r as motion } from "../_libs/framer-motion.mjs";
import { c as toggleFavorite, o as isFavorite } from "./storage-CKAcXOPT.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { E as Heart, c as Square, f as Share2, h as RotateCcw, n as Volume2 } from "../_libs/lucide-react.mjs";
import { n as useHaptics } from "./useLocalStore-BmW8XRRN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ReflectionCard-sHtYDPFi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MoodBadge({ mood }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }), mood]
	});
}
async function shareReflection(r) {
	const text = `${r.title}\n\n${r.message}\n\n— Blue Dice`;
	if (typeof navigator !== "undefined" && "share" in navigator) try {
		await navigator.share({
			title: r.title,
			text
		});
		return "shared";
	} catch {}
	if (typeof navigator !== "undefined" && navigator.clipboard) await navigator.clipboard.writeText(text);
	return "copied";
}
function formatDate(iso) {
	return new Date(iso).toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function ReflectionCard({ reflection, onRollAgain }) {
	const [saved, setSaved] = (0, import_react.useState)(() => isFavorite(reflection.id));
	const [shareState, setShareState] = (0, import_react.useState)("idle");
	const [speaking, setSpeaking] = (0, import_react.useState)(false);
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
		u.rate = .95;
		u.pitch = 1;
		u.onend = () => setSpeaking(false);
		u.onerror = () => setSpeaking(false);
		window.speechSynthesis.speak(u);
		setSpeaking(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
		initial: {
			opacity: 0,
			y: 24
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .55,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "rounded-3xl bg-card p-6 shadow-[0_10px_40px_-12px_rgb(0_0_0_/_0.10)] ring-1 ring-black/5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoodBadge, { mood: reflection.mood }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: new Date(reflection.createdAt).toLocaleDateString(void 0, {
						month: "short",
						day: "numeric"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 text-2xl font-semibold leading-tight text-foreground",
				children: reflection.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: toggleSpeak,
				className: "mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] font-medium text-muted-foreground active:scale-[0.98]",
				children: [speaking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-3 w-3" }), speaking ? "Stop" : "Read aloud"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-[17px] leading-relaxed text-foreground/85",
				children: reflection.message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				label: "Affirmation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "italic text-foreground/90",
					children: [
						"\"",
						reflection.affirmation,
						"\""
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				label: "Today's Action",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-foreground/90",
					children: reflection.action
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				label: "Journal Prompt",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-foreground/90",
					children: reflection.journal_prompt
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-3 gap-2",
				children: [
					onRollAgain ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							haptic(15);
							onRollAgain();
						},
						className: "col-span-3 flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-medium text-primary-foreground transition active:scale-[0.98]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), " Roll again"]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleShare,
						className: "col-span-1 flex items-center justify-center gap-1.5 rounded-2xl bg-secondary py-3 text-sm font-medium text-foreground transition active:scale-[0.98]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" }), shareState === "copied" ? "Copied" : shareState === "shared" ? "Shared" : "Share"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSave,
						className: `col-span-2 flex items-center justify-center gap-1.5 rounded-2xl py-3 text-sm font-medium transition active:scale-[0.98] ${saved ? "bg-primary/10 text-primary" : "bg-secondary text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 ${saved ? "fill-current" : ""}` }), saved ? "Saved" : "Save"]
					})
				]
			})
		]
	});
}
function Section({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 border-t border-border pt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1.5 text-[15px] leading-relaxed",
			children
		})]
	});
}
//#endregion
export { ReflectionCard as n, formatDate as r, MoodBadge as t };
