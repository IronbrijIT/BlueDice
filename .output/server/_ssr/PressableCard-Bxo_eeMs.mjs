import { a as __toESM } from "../_runtime.mjs";
import { r as motion } from "../_libs/framer-motion.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PressableCard-Bxo_eeMs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Button-shaped tappable surface with subtle lift-on-hover and
* press-scale feedback. Transform-only so it stays on the compositor.
*/
var PressableCard = (0, import_react.forwardRef)(function PressableCard({ children, style, ...rest }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		ref,
		whileHover: { y: -2 },
		whileTap: { scale: .98 },
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 30
		},
		style: {
			willChange: "transform",
			...style
		},
		...rest,
		children
	});
});
//#endregion
export { PressableCard as t };
