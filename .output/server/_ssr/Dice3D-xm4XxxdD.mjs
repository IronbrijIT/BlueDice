import { a as __toESM } from "../_runtime.mjs";
import { r as motion, t as useAnimationControls } from "../_libs/framer-motion.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Dice3D-xm4XxxdD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FACE_PIPS = [
	[5],
	[1, 9],
	[
		1,
		5,
		9
	],
	[
		1,
		3,
		7,
		9
	],
	[
		1,
		3,
		5,
		7,
		9
	],
	[
		1,
		3,
		7,
		9,
		2,
		8
	]
];
function Face({ pips, transform }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dice-face",
		style: {
			transform,
			gridTemplateColumns: "repeat(3, 1fr)",
			gridTemplateRows: "repeat(3, 1fr)"
		},
		children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { gridArea: `${Math.floor(i / 3) + 1} / ${i % 3 + 1}` },
			children: pips.includes(i + 1) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dice-pip" }) : null
		}, i))
	});
}
function Dice3D({ rolling, onTap, disabled }) {
	const controls = useAnimationControls();
	const restRef = (0, import_react.useRef)({
		x: -20,
		y: 25
	});
	(0, import_react.useEffect)(() => {
		if (rolling) controls.start({
			rotateX: [restRef.current.x, restRef.current.x + 720],
			rotateY: [restRef.current.y, restRef.current.y + 900],
			transition: {
				duration: 1.2,
				ease: "linear",
				repeat: Infinity
			}
		});
		else controls.start({
			rotateX: [restRef.current.x, restRef.current.x + 360],
			rotateY: [restRef.current.y, restRef.current.y + 360],
			transition: {
				duration: 22,
				ease: "linear",
				repeat: Infinity
			}
		});
	}, [rolling, controls]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dice-scene flex items-center justify-center",
		style: { height: 240 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
			type: "button",
			onClick: disabled ? void 0 : onTap,
			disabled,
			"aria-label": disabled ? "Rolling dice" : "Roll the dice",
			className: `relative outline-none ${disabled ? "cursor-default" : "cursor-pointer"}`,
			style: {
				background: "transparent",
				border: "none",
				padding: 0
			},
			whileTap: { scale: .94 },
			animate: { y: [
				0,
				-6,
				0
			] },
			transition: { y: {
				duration: 4,
				repeat: Infinity,
				ease: "easeInOut"
			} },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "dice-cube",
				animate: controls,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
						pips: FACE_PIPS[0],
						transform: "translateZ(80px)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
						pips: FACE_PIPS[5],
						transform: "rotateY(180deg) translateZ(80px)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
						pips: FACE_PIPS[1],
						transform: "rotateY(90deg) translateZ(80px)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
						pips: FACE_PIPS[4],
						transform: "rotateY(-90deg) translateZ(80px)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
						pips: FACE_PIPS[2],
						transform: "rotateX(90deg) translateZ(80px)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, {
						pips: FACE_PIPS[3],
						transform: "rotateX(-90deg) translateZ(80px)"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dice-shadow",
				"aria-hidden": true
			})]
		})
	});
}
//#endregion
export { Dice3D as t };
