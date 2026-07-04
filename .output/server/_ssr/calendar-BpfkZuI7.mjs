import { a as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-8y5G6vOy.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as ChevronRight, P as ChevronLeft } from "../_libs/lucide-react.mjs";
import { r as useHistory } from "./useLocalStore-BmW8XRRN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-BpfkZuI7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CalendarPage() {
	const history = useHistory();
	const [cursor, setCursor] = (0, import_react.useState)(() => {
		const d = /* @__PURE__ */ new Date();
		d.setDate(1);
		d.setHours(0, 0, 0, 0);
		return d;
	});
	const [selected, setSelected] = (0, import_react.useState)(null);
	const days = (0, import_react.useMemo)(() => {
		const first = new Date(cursor);
		const last = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
		const leading = (first.getDay() + 6) % 7;
		const cells = [];
		for (let i = 0; i < leading; i++) cells.push(null);
		for (let d = 1; d <= last.getDate(); d++) cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
		while (cells.length % 7 !== 0) cells.push(null);
		return cells;
	}, [cursor]);
	const reflectionDays = (0, import_react.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		for (const r of history) {
			const d = new Date(r.createdAt);
			d.setHours(0, 0, 0, 0);
			s.add(d.toDateString());
		}
		return s;
	}, [history]);
	const selectedReflections = selected ? history.filter((r) => {
		return new Date(r.createdAt).toDateString() === selected.toDateString();
	}) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/profile",
			className: "mb-4 inline-flex items-center text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Back"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-[28px] font-semibold text-foreground",
			children: "Calendar"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-3xl bg-card p-4 ring-1 ring-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)),
							className: "rounded-xl bg-secondary p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold text-foreground",
							children: cursor.toLocaleDateString(void 0, {
								month: "long",
								year: "numeric"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)),
							className: "rounded-xl bg-secondary p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground",
					children: [
						"M",
						"T",
						"W",
						"T",
						"F",
						"S",
						"S"
					].map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: d }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 grid grid-cols-7 gap-1",
					children: days.map((d, i) => {
						if (!d) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square" }, i);
						const hasReflection = reflectionDays.has(d.toDateString());
						const isToday = d.toDateString() === (/* @__PURE__ */ new Date()).toDateString();
						const isSelected = selected?.toDateString() === d.toDateString();
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelected(d),
							className: `relative flex aspect-square flex-col items-center justify-center rounded-lg text-xs transition ${isSelected ? "bg-primary text-primary-foreground" : isToday ? "bg-secondary font-semibold text-foreground" : "text-foreground hover:bg-secondary"}`,
							children: [d.getDate(), hasReflection ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute bottom-1 h-1 w-1 rounded-full ${isSelected ? "bg-white" : "bg-primary"}` }) : null]
						}, i);
					})
				})
			]
		}),
		selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 rounded-2xl bg-card p-4 ring-1 ring-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold text-foreground",
					children: selected.toLocaleDateString(void 0, {
						weekday: "long",
						month: "long",
						day: "numeric"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						selectedReflections.length,
						" reflection",
						selectedReflections.length === 1 ? "" : "s"
					]
				}),
				selectedReflections.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: selectedReflections.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-secondary/60 p-3 text-sm text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium",
							children: r.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: r.mood
						})]
					}, r.id))
				}) : null
			]
		}) : null
	] });
}
//#endregion
export { CalendarPage as component };
