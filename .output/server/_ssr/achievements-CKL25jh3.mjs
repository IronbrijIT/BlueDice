import { a as __toESM } from "../_runtime.mjs";
import { i as getHistory } from "./storage-CKAcXOPT.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-8y5G6vOy.mjs";
import { n as StaggerList, t as StaggerItem } from "./StaggerList-BU7bUisM.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as ChevronLeft, S as Lock, i as Trophy } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/achievements-CKL25jh3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function computeAchievements() {
	const reflections = getHistory();
	return [
		{
			id: "first_roll",
			title: "First Roll",
			description: "Rolled the dice for the first time.",
			earned: reflections.length >= 1
		},
		{
			id: "ten_reflections",
			title: "Ten Reflections",
			description: "Collected 10 reflections.",
			earned: reflections.length >= 10,
			progress: {
				value: Math.min(reflections.length, 10),
				goal: 10
			}
		},
		{
			id: "hundred_reflections",
			title: "Hundred Reflections",
			description: "Collected 100 reflections.",
			earned: reflections.length >= 100,
			progress: {
				value: Math.min(reflections.length, 100),
				goal: 100
			}
		}
	];
}
function useAchievements() {
	const [list, setList] = (0, import_react.useState)(() => computeAchievements());
	(0, import_react.useEffect)(() => {
		const r = () => setList(computeAchievements());
		window.addEventListener("bluedice:storage", r);
		return () => window.removeEventListener("bluedice:storage", r);
	}, []);
	return list;
}
function AchievementsPage() {
	const list = useAchievements();
	const earned = list.filter((a) => a.earned).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/profile",
			className: "mb-4 inline-flex items-center text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Back"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-[28px] font-semibold text-foreground",
			children: "Achievements"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: [
				earned,
				" of ",
				list.length,
				" earned."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerList, {
			className: "mt-6 grid grid-cols-2 gap-3",
			children: list.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StaggerItem, {
				className: `flex flex-col items-start rounded-2xl p-4 ring-1 transition ${a.earned ? "bg-primary/5 ring-primary/20" : "bg-card ring-border opacity-70"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex h-10 w-10 items-center justify-center rounded-xl ${a.earned ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"}`,
						children: a.earned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 text-sm font-semibold text-foreground",
						children: a.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: a.description
					}),
					a.progress && !a.earned ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1 rounded-full bg-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1 rounded-full bg-primary transition-all",
								style: { width: `${Math.round(a.progress.value / a.progress.goal * 100)}%` }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-[10px] text-muted-foreground",
							children: [
								a.progress.value,
								" / ",
								a.progress.goal
							]
						})]
					}) : null
				]
			}, a.id))
		})
	] });
}
//#endregion
export { AchievementsPage as component };
