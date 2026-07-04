import { a as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as onAuthStateChanged, s as signOut } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { c as onSnapshot, d as doc, l as setDoc, s as getDoc, u as updateDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { n as db, t as auth } from "./firebase-D2wZyzJA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAuth-CgN1WbA4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE_KEYS = {
	history: "bluedice.history",
	favorites: "bluedice.favorites",
	notifPrefs: "bluedice.notifPrefs",
	settings: "bluedice.settings"
};
var isSyncingFromServer = false;
function writeLocal(key, value) {
	try {
		window.localStorage.setItem(key, JSON.stringify(value));
		window.dispatchEvent(new CustomEvent("bluedice:storage", { detail: { key } }));
	} catch (e) {
		console.error("Local storage write error:", e);
	}
}
function readLocal(key, fallback) {
	try {
		const raw = window.localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
}
async function syncUserData(uid) {
	if (isSyncingFromServer) return;
	isSyncingFromServer = true;
	try {
		console.log("Syncing user data from Firestore for UID:", uid);
		const historyDocRef = doc(db, "users", uid, "data", "history");
		const historySnap = await getDoc(historyDocRef);
		const localHistory = readLocal(STORAGE_KEYS.history, []);
		if (historySnap.exists()) {
			const merged = mergeById(localHistory, historySnap.data().items || []);
			writeLocal(STORAGE_KEYS.history, merged);
			await setDoc(historyDocRef, { items: merged });
		} else if (localHistory.length > 0) await setDoc(historyDocRef, { items: localHistory });
		const favoritesDocRef = doc(db, "users", uid, "data", "favorites");
		const favoritesSnap = await getDoc(favoritesDocRef);
		const localFavorites = readLocal(STORAGE_KEYS.favorites, []);
		if (favoritesSnap.exists()) {
			const merged = mergeById(localFavorites, favoritesSnap.data().items || []);
			writeLocal(STORAGE_KEYS.favorites, merged);
			await setDoc(favoritesDocRef, { items: merged });
		} else if (localFavorites.length > 0) await setDoc(favoritesDocRef, { items: localFavorites });
		const notifPrefsDocRef = doc(db, "users", uid, "data", "notifPrefs");
		const notifPrefsSnap = await getDoc(notifPrefsDocRef);
		const localNotifPrefs = readLocal(STORAGE_KEYS.notifPrefs, null);
		if (notifPrefsSnap.exists()) {
			const serverNotifPrefs = notifPrefsSnap.data().prefs || {};
			const merged = {
				...localNotifPrefs,
				...serverNotifPrefs
			};
			writeLocal(STORAGE_KEYS.notifPrefs, merged);
			await setDoc(notifPrefsDocRef, { prefs: merged });
		} else if (localNotifPrefs) await setDoc(notifPrefsDocRef, { prefs: localNotifPrefs });
		const settingsDocRef = doc(db, "users", uid, "data", "settings");
		const settingsSnap = await getDoc(settingsDocRef);
		const localSettings = readLocal(STORAGE_KEYS.settings, null);
		if (settingsSnap.exists()) {
			const serverSettings = settingsSnap.data().settings || {};
			const merged = {
				...localSettings,
				...serverSettings
			};
			writeLocal(STORAGE_KEYS.settings, merged);
			await setDoc(settingsDocRef, { settings: merged });
		} else if (localSettings) await setDoc(settingsDocRef, { settings: localSettings });
		console.log("Data sync complete.");
	} catch (error) {
		console.error("Error syncing user data:", error);
	} finally {
		isSyncingFromServer = false;
	}
}
function mergeById(local, server) {
	const map = /* @__PURE__ */ new Map();
	local.forEach((item) => {
		if (item && item.id) map.set(item.id, item);
	});
	server.forEach((item) => {
		if (item && item.id) map.set(item.id, item);
	});
	const list = Array.from(map.values());
	list.sort((a, b) => {
		const timeA = a.createdAt ? new Date(a.createdAt).getTime() : a.startedAt || 0;
		return (b.createdAt ? new Date(b.createdAt).getTime() : b.startedAt || 0) - timeA;
	});
	return list;
}
function setupSyncListener(uid) {
	const handleStorageChange = async (event) => {
		if (isSyncingFromServer) return;
		const key = event.detail?.key;
		if (!key) return;
		try {
			if (key === STORAGE_KEYS.history) {
				const val = readLocal(key, []);
				await setDoc(doc(db, "users", uid, "data", "history"), { items: val });
			} else if (key === STORAGE_KEYS.favorites) {
				const val = readLocal(key, []);
				await setDoc(doc(db, "users", uid, "data", "favorites"), { items: val });
			} else if (key === STORAGE_KEYS.notifPrefs) {
				const val = readLocal(key, {});
				await setDoc(doc(db, "users", uid, "data", "notifPrefs"), { prefs: val });
			} else if (key === STORAGE_KEYS.settings) {
				const val = readLocal(key, {});
				await setDoc(doc(db, "users", uid, "data", "settings"), { settings: val });
			}
		} catch (e) {
			console.error("Error writing storage change to firestore:", e);
		}
	};
	window.addEventListener("bluedice:storage", handleStorageChange);
	return () => {
		window.removeEventListener("bluedice:storage", handleStorageChange);
	};
}
function clearLocalStorage() {
	Object.values(STORAGE_KEYS).forEach((key) => {
		window.localStorage.removeItem(key);
		window.dispatchEvent(new CustomEvent("bluedice:storage", { detail: { key } }));
	});
	window.localStorage.removeItem("bluedice.lastReflection");
	window.dispatchEvent(new CustomEvent("bluedice:storage", { detail: { key: "bluedice.lastReflection" } }));
}
var AuthContext = (0, import_react.createContext)({
	user: null,
	profile: null,
	loading: true,
	logout: async () => {},
	saveProfile: async () => {}
});
function useAuth() {
	return (0, import_react.useContext)(AuthContext);
}
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let unsubscribeProfile = null;
		let cleanupSync = null;
		const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
			setUser(currentUser);
			if (unsubscribeProfile) {
				unsubscribeProfile();
				unsubscribeProfile = null;
			}
			if (cleanupSync) {
				cleanupSync();
				cleanupSync = null;
			}
			if (currentUser) {
				setLoading(true);
				await syncUserData(currentUser.uid);
				cleanupSync = setupSyncListener(currentUser.uid);
				unsubscribeProfile = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
					if (docSnap.exists()) setProfile(docSnap.data());
					else setProfile(null);
					setLoading(false);
				}, (error) => {
					console.error("Error fetching user profile snapshot:", error);
					setLoading(false);
				});
			} else {
				setProfile(null);
				setLoading(false);
			}
		});
		return () => {
			unsubscribeAuth();
			if (unsubscribeProfile) unsubscribeProfile();
			if (cleanupSync) cleanupSync();
		};
	}, []);
	const logout = async () => {
		setLoading(true);
		await signOut(auth);
		clearLocalStorage();
	};
	const saveProfile = async (name, email) => {
		if (!user) throw new Error("No authenticated user");
		const userDocRef = doc(db, "users", user.uid);
		const existingSnap = await getDoc(userDocRef);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const profileData = {
			uid: user.uid,
			name,
			email,
			updatedAt: now
		};
		if (existingSnap.exists()) await updateDoc(userDocRef, profileData);
		else await setDoc(userDocRef, {
			...profileData,
			createdAt: now
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			profile,
			loading,
			logout,
			saveProfile
		},
		children
	});
}
//#endregion
export { useAuth as n, AuthProvider as t };
