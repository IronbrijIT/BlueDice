import { r as motion } from "../_libs/framer-motion.mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as useReducedMotion$1 } from "./useReducedMotion-Dded5mnp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StaggerList-BU7bUisM.js
var import_jsx_runtime = require_jsx_runtime();
var containerVariants = {
	hidden: {},
	show: { transition: {
		staggerChildren: .04,
		delayChildren: .04
	} }
};
var itemVariants = {
	hidden: {
		opacity: 0,
		y: 8
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .32,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
};
function StaggerList({ children, ...rest }) {
	const reduced = useReducedMotion$1();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: "hidden",
		animate: "show",
		variants: reduced ? void 0 : containerVariants,
		...rest,
		children
	});
}
function StaggerItem({ children, ...rest }) {
	const reduced = useReducedMotion$1();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		variants: reduced ? void 0 : itemVariants,
		...rest,
		children
	});
}
//#endregion
export { StaggerList as n, StaggerItem as t };
