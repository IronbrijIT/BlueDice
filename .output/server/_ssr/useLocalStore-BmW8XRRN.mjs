import { a as __toESM } from "../_runtime.mjs";
import { a as getLastReflection, i as getHistory, r as getFavorites } from "./storage-CKAcXOPT.mjs";
import { n as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useLocalStore-BmW8XRRN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useLocalValue(read) {
	const [value, setValue] = (0, import_react.useState)(read);
	(0, import_react.useEffect)(() => {
		const refresh = () => setValue(read());
		refresh();
		window.addEventListener("bluedice:storage", refresh);
		window.addEventListener("storage", refresh);
		return () => {
			window.removeEventListener("bluedice:storage", refresh);
			window.removeEventListener("storage", refresh);
		};
	}, []);
	return value;
}
function useHistory() {
	return useLocalValue(getHistory);
}
function useFavorites() {
	return useLocalValue(getFavorites);
}
function useLastReflection() {
	return useLocalValue(getLastReflection);
}
function useHaptics() {
	return (pattern = 12) => {
		if (typeof navigator !== "undefined" && "vibrate" in navigator) try {
			navigator.vibrate(pattern);
		} catch {}
	};
}
//#endregion
export { useLastReflection as i, useHaptics as n, useHistory as r, useFavorites as t };
