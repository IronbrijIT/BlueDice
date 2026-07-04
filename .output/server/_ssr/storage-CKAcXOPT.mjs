//#region node_modules/.nitro/vite/services/ssr/assets/storage-CKAcXOPT.js
var KEYS = {
	history: "bluedice.history",
	favorites: "bluedice.favorites",
	settings: "bluedice.settings",
	last: "bluedice.lastReflection"
};
function read(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = window.localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
}
function write(key, value) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
		window.dispatchEvent(new CustomEvent("bluedice:storage", { detail: { key } }));
	} catch {}
}
function getHistory() {
	return read(KEYS.history, []);
}
function addToHistory(r) {
	const next = [r, ...getHistory()].slice(0, 200);
	write(KEYS.history, next);
	write(KEYS.last, r);
}
function clearHistory() {
	write(KEYS.history, []);
	write(KEYS.last, null);
}
function getFavorites() {
	return read(KEYS.favorites, []);
}
function toggleFavorite(r) {
	const list = getFavorites();
	const exists = list.some((x) => x.id === r.id);
	const next = exists ? list.filter((x) => x.id !== r.id) : [r, ...list];
	write(KEYS.favorites, next);
	return !exists;
}
function isFavorite(id) {
	return getFavorites().some((r) => r.id === id);
}
function getLastReflection() {
	return read(KEYS.last, null);
}
function setLastReflection(r) {
	write(KEYS.last, r);
}
//#endregion
export { getLastReflection as a, toggleFavorite as c, getHistory as i, clearHistory as n, isFavorite as o, getFavorites as r, setLastReflection as s, addToHistory as t };
