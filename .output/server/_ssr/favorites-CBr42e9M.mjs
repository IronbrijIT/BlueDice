import { a as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-8y5G6vOy.mjs";
import { n as StaggerList, t as StaggerItem } from "./StaggerList-BU7bUisM.mjs";
import { t as useFavorites } from "./useLocalStore-BmW8XRRN.mjs";
import { n as ReflectionCard, r as formatDate, t as MoodBadge } from "./ReflectionCard-sHtYDPFi.mjs";
import { t as PressableCard } from "./PressableCard-Bxo_eeMs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-CBr42e9M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FavoritesPage() {
	const favorites = useFavorites();
	const [open, setOpen] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		title: "Saved",
		subtitle: "Reflections you've kept close.",
		children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setOpen(null),
			className: "mb-4 text-sm font-medium text-muted-foreground active:text-foreground",
			children: "← Back"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReflectionCard, { reflection: open })] }) : favorites.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-3xl bg-secondary/60 p-6 text-center text-sm text-muted-foreground",
			children: "Tap the heart on any reflection to save it here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerList, {
			className: "space-y-2",
			children: favorites.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PressableCard, {
				onClick: () => setOpen(r),
				className: "flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left ring-1 ring-black/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
							children: formatDate(r.createdAt)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoodBadge, { mood: r.mood })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-[15px] font-medium text-foreground",
						children: r.title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: "›"
				})]
			}) }, r.id))
		})
	});
}
//#endregion
export { FavoritesPage as component };
