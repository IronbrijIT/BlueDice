import { r as motion } from "../_libs/framer-motion.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PageShell-8y5G6vOy.js
var import_jsx_runtime = require_jsx_runtime();
function PageShell({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-screen w-full max-w-xl px-5 pt-8",
		style: { paddingBottom: "calc(env(safe-area-inset-bottom) + 92px)" },
		children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.header, {
			className: "mb-6",
			initial: {
				opacity: 0,
				y: -6
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .28,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-[28px] font-semibold text-foreground",
				children: title
			}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: subtitle
			}) : null]
		}) : null, children]
	});
}
//#endregion
export { PageShell as t };
