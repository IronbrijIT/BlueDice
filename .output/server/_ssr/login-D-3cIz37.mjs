import { a as __toESM } from "../_runtime.mjs";
import { a as AnimatePresence, r as motion } from "../_libs/framer-motion.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-8y5G6vOy.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { R as ArrowRight, S as Lock, b as Mail, r as User } from "../_libs/lucide-react.mjs";
import { a as signInWithEmailAndPassword, n as createUserWithEmailAndPassword, o as signInWithPopup } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { i as googleProvider, t as auth } from "./firebase-D2wZyzJA.mjs";
import { n as useAuth } from "./useAuth-CgN1WbA4.mjs";
import { r as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-D-3cIz37.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { user, profile, loading } = useAuth();
	const navigate = useNavigate();
	const [isSignUp, setIsSignUp] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [authLoading, setAuthLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && user) if (profile && profile.name) navigate({ to: "/" });
		else navigate({ to: "/onboarding" });
	}, [
		user,
		profile,
		loading,
		navigate
	]);
	const handleEmailAuth = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error("Please fill in all fields");
			return;
		}
		if (isSignUp && !name) {
			toast.error("Please tell us your name");
			return;
		}
		setAuthLoading(true);
		try {
			if (isSignUp) {
				const credential = await createUserWithEmailAndPassword(auth, email, password);
				const { doc, setDoc } = await import("../_libs/firebase.mjs").then((n) => n.t);
				const { db } = await import("./firebase-D2wZyzJA.mjs").then((n) => n.r).then((n) => n.r);
				await setDoc(doc(db, "users", credential.user.uid), {
					uid: credential.user.uid,
					name,
					email,
					createdAt: (/* @__PURE__ */ new Date()).toISOString(),
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				});
				toast.success(`Welcome, ${name}!`);
			} else {
				await signInWithEmailAndPassword(auth, email, password);
				toast.success("Welcome back!");
			}
		} catch (err) {
			console.error(err);
			let msg = "Authentication failed.";
			if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") msg = "Invalid email or password.";
			else if (err.code === "auth/email-already-in-use") msg = "This email is already registered.";
			else if (err.code === "auth/weak-password") msg = "Password should be at least 6 characters.";
			else if (err.message) msg = err.message;
			toast.error(msg);
		} finally {
			setAuthLoading(false);
		}
	};
	const handleGoogleAuth = async () => {
		setAuthLoading(true);
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const { doc, getDoc, setDoc } = await import("../_libs/firebase.mjs").then((n) => n.t);
			const { db } = await import("./firebase-D2wZyzJA.mjs").then((n) => n.r).then((n) => n.r);
			const docRef = doc(db, "users", result.user.uid);
			if (!(await getDoc(docRef)).exists()) await setDoc(docRef, {
				uid: result.user.uid,
				name: result.user.displayName || "",
				email: result.user.email || "",
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
			toast.success("Signed in with Google!");
		} catch (err) {
			console.error(err);
			toast.error("Google sign-in failed.");
		} finally {
			setAuthLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col items-center justify-center min-h-[80vh] px-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							scale: .8,
							opacity: 0
						},
						animate: {
							scale: 1,
							opacity: 1
						},
						transition: { duration: .5 },
						className: "inline-block relative mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-primary/25 rounded-full blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative bg-card border border-border p-5 rounded-[2rem] shadow-xl flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								className: "h-14 w-14 text-primary filter drop-shadow-[0_0_12px_rgba(59,130,246,0.35)]",
								viewBox: "0 0 100 100",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M50 15L85 32.5L50 50L15 32.5L50 15Z",
										fill: "currentColor",
										fillOpacity: "0.15",
										stroke: "currentColor",
										strokeWidth: "2",
										strokeLinejoin: "round"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M15 32.5L50 50V85L15 67.5V32.5Z",
										fill: "currentColor",
										fillOpacity: "0.1",
										stroke: "currentColor",
										strokeWidth: "2",
										strokeLinejoin: "round"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M50 50L85 32.5V67.5L50 85V50Z",
										fill: "currentColor",
										fillOpacity: "0.05",
										stroke: "currentColor",
										strokeWidth: "2",
										strokeLinejoin: "round"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "50",
										cy: "32.5",
										r: "3.5",
										fill: "currentColor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "32.5",
										cy: "50",
										r: "3.2",
										fill: "currentColor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "32.5",
										cy: "67.5",
										r: "3.2",
										fill: "currentColor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "67.5",
										cy: "50",
										r: "3.2",
										fill: "currentColor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "67.5",
										cy: "67.5",
										r: "3.2",
										fill: "currentColor"
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold tracking-tight text-foreground",
						children: isSignUp ? "Create an account" : "Welcome back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: isSignUp ? "Start syncing your dice rolls and daily history." : "Sign in to access your reflections, stats, and settings."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				layout: true,
				className: "rounded-3xl border border-border bg-card p-6 shadow-xl backdrop-blur-md relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleEmailAuth,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "popLayout",
								children: isSignUp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: -10
									},
									animate: {
										opacity: 1,
										y: 0
									},
									exit: {
										opacity: 0,
										y: -10
									},
									transition: { duration: .2 },
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
										children: "Your Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "John Doe",
											value: name,
											onChange: (e) => setName(e.target.value),
											className: "w-full rounded-xl bg-secondary px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-transparent focus:ring-primary focus:bg-background transition"
										})]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
									children: "Email Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										placeholder: "name@example.com",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										className: "w-full rounded-xl bg-secondary px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-transparent focus:ring-primary focus:bg-background transition"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										placeholder: "••••••••",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										className: "w-full rounded-xl bg-secondary px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-transparent focus:ring-primary focus:bg-background transition"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: authLoading,
								className: "mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 active:scale-[0.98] transition disabled:opacity-50 cursor-pointer",
								children: authLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isSignUp ? "Sign Up" : "Sign In", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative my-6 flex items-center justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 h-px bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative bg-card px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
							children: "Or continue with"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleGoogleAuth,
						disabled: authLoading,
						className: "flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background py-3 text-sm font-semibold text-foreground hover:bg-secondary active:scale-[0.98] transition disabled:opacity-50 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							className: "h-5 w-5",
							viewBox: "0 0 24 24",
							fill: "none",
							xmlns: "http://www.w3.org/2000/svg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
									fill: "#4285F4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
									fill: "#34A853"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z",
									fill: "#FBBC05"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
									fill: "#EA4335"
								})
							]
						}), "Google Account"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 text-center text-xs text-muted-foreground",
						children: [isSignUp ? "Already have an account? " : "New to Blue Dice? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsSignUp(!isSignUp),
							className: "font-semibold text-primary hover:underline outline-none",
							children: isSignUp ? "Sign In" : "Create one now"
						})]
					})
				]
			})]
		})
	}) });
}
//#endregion
export { LoginPage as component };
