import { a as __toESM } from "../_runtime.mjs";
import { a as AnimatePresence, r as motion } from "../_libs/framer-motion.mjs";
import { t as addToHistory } from "./storage-CKAcXOPT.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-8y5G6vOy.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLastReflection, n as useHaptics } from "./useLocalStore-BmW8XRRN.mjs";
import { n as ReflectionCard } from "./ReflectionCard-sHtYDPFi.mjs";
import { n as getReflection } from "./reflection-BFo5IkDt.mjs";
import { t as Dice3D } from "./Dice3D-xm4XxxdD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reflection-DWTHFNZ8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReflectionPage() {
	const last = useLastReflection();
	const navigate = useNavigate();
	const haptic = useHaptics();
	const [rolling, setRolling] = (0, import_react.useState)(false);
	const rollAgain = async () => {
		setRolling(true);
		haptic([
			12,
			30,
			12
		]);
		try {
			addToHistory(await getReflection());
			haptic(20);
		} finally {
			setRolling(false);
		}
	};
	if (!last) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		title: "Reflection",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 8
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "rounded-3xl bg-secondary/60 p-6 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No reflection yet. Roll the dice to receive today's."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-4 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground",
				children: "Roll the dice"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => navigate({ to: "/" }),
			className: "text-sm font-medium text-muted-foreground active:text-foreground",
			children: "← Home"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
		mode: "wait",
		children: rolling ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "flex flex-col items-center justify-center py-10",
			initial: {
				opacity: 0,
				y: 16
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: -12
			},
			transition: {
				duration: .35,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dice3D, {
				rolling: true,
				onTap: () => {},
				disabled: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				initial: {
					opacity: 0,
					y: 6
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: .2 },
				className: "mt-4 text-sm text-muted-foreground",
				children: "Finding today's reflection…"
			})]
		}, "rolling") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 16
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: -12
			},
			transition: {
				duration: .35,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReflectionCard, {
				reflection: last,
				onRollAgain: rollAgain
			}, last.id)
		}, "card")
	})] });
}
//#endregion
export { ReflectionPage as component };
