import { a as __toESM } from "../_runtime.mjs";
import { a as AnimatePresence, r as motion } from "../_libs/framer-motion.mjs";
import { i as getHistory, t as addToHistory } from "./storage-CKAcXOPT.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-8y5G6vOy.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Flame } from "../_libs/lucide-react.mjs";
import { n as useHaptics } from "./useLocalStore-BmW8XRRN.mjs";
import { n as getReflection } from "./reflection-BFo5IkDt.mjs";
import { t as Dice3D } from "./Dice3D-xm4XxxdD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DMuVBHkg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useStreak() {
	const [state, setState] = (0, import_react.useState)(() => compute());
	(0, import_react.useEffect)(() => {
		const r = () => setState(compute());
		window.addEventListener("bluedice:storage", r);
		return () => window.removeEventListener("bluedice:storage", r);
	}, []);
	return state;
}
function compute() {
	const days = new Set(getHistory().map((r) => {
		const d = new Date(r.createdAt);
		d.setHours(0, 0, 0, 0);
		return d.toISOString();
	}));
	let reflectionStreak = 0;
	const now = /* @__PURE__ */ new Date();
	for (let i = 0; i < 365; i++) {
		const d = new Date(now);
		d.setDate(now.getDate() - i);
		d.setHours(0, 0, 0, 0);
		if (days.has(d.toISOString())) reflectionStreak++;
		else break;
	}
	return { reflectionStreak };
}
function Index() {
	const [rolling, setRolling] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const navigate = useNavigate();
	const haptic = useHaptics();
	const streak = useStreak();
	const roll = async () => {
		if (rolling) return;
		setError(null);
		setRolling(true);
		haptic([
			12,
			30,
			12
		]);
		try {
			const minSpin = new Promise((r) => setTimeout(r, 1200));
			const [reflection] = await Promise.all([getReflection(prompt), minSpin]);
			addToHistory(reflection);
			setPrompt("");
			haptic(20);
			navigate({ to: "/reflection" });
		} catch (e) {
			setError(e instanceof Error ? e.message : "Something went wrong.");
		} finally {
			setRolling(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-2 flex items-center justify-center gap-2",
		children: streak.reflectionStreak > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3 w-3" }),
				" ",
				streak.reflectionStreak,
				"-day streak"
			]
		}) : null
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center pt-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: -8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .6 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-[0.24em] text-primary",
						children: "Blue Dice"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 text-[34px] font-semibold leading-tight text-foreground",
						children: [
							"Roll for today's",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"reflection."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-3 max-w-xs text-sm text-muted-foreground",
						children: "Every roll brings a new perspective."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-14 mb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dice3D, {
					rolling,
					onTap: roll
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, { active: rolling })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: "prompt",
					className: "sr-only",
					children: "Tell the dice something"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "prompt",
					value: prompt,
					onChange: (e) => setPrompt(e.target.value),
					disabled: rolling,
					rows: 2,
					placeholder: "Tell the dice what's on your mind… (optional)",
					className: "w-full resize-none rounded-2xl border border-border bg-secondary/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:bg-background disabled:opacity-60"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: rolling ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: {
						opacity: 0,
						y: 6
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -6
					},
					className: "mt-6 text-sm text-muted-foreground",
					children: "Finding today's reflection…"
				}, "loading") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
					initial: {
						opacity: 0,
						y: 6
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: { opacity: 0 },
					onClick: roll,
					className: "mt-6 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition active:scale-[0.97]",
					children: prompt.trim() ? "Roll for an answer" : "Tap the dice to roll"
				}, "cta")
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-destructive",
				children: error
			}) : null
		]
	})] });
}
function Particles({ active }) {
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 flex items-center justify-center",
		children: Array.from({ length: 10 }).map((_, i) => {
			const angle = i / 10 * Math.PI * 2;
			const dx = Math.cos(angle) * 90;
			const dy = Math.sin(angle) * 90;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				initial: {
					opacity: 0,
					x: 0,
					y: 0,
					scale: .5
				},
				animate: {
					opacity: [
						0,
						1,
						0
					],
					x: dx,
					y: dy,
					scale: [
						.5,
						1,
						.5
					]
				},
				transition: {
					duration: 1.4,
					repeat: Infinity,
					delay: i * .08,
					ease: "easeOut"
				},
				className: "absolute h-1.5 w-1.5 rounded-full bg-primary/70"
			}, i);
		})
	});
}
//#endregion
export { Index as component };
