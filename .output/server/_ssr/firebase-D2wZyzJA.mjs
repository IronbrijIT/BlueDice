import { r as __exportAll$1 } from "../_runtime.mjs";
import { o as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { r as getAuth, t as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { f as getFirestore } from "../_libs/@firebase/firestore+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firebase-D2wZyzJA.js
var firebase_D2wZyzJA_exports = /* @__PURE__ */ __exportAll$1({
	i: () => googleProvider,
	n: () => db,
	r: () => firebase_exports,
	t: () => auth
});
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var firebase_exports = /* @__PURE__ */ __exportAll({
	auth: () => auth,
	db: () => db,
	default: () => app,
	googleProvider: () => googleProvider
});
var app = initializeApp({
	apiKey: "AIzaSyDwVlnoCITjOe1y1rkh9dSRQOdGoAedEYM",
	authDomain: "diceblue-20f13.firebaseapp.com",
	projectId: "diceblue-20f13",
	storageBucket: "diceblue-20f13.firebasestorage.app",
	messagingSenderId: "589557189696",
	appId: "1:589557189696:web:a259aaac1f87c0a83ea3a5",
	measurementId: "G-Q3RX78431X"
});
var auth = getAuth(app);
var db = getFirestore(app);
var googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");
//#endregion
export { googleProvider as i, db as n, firebase_D2wZyzJA_exports as r, auth as t };
