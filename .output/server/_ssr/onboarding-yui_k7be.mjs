import { a as __toESM } from "../_runtime.mjs";
import { r as motion } from "../_libs/framer-motion.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-8y5G6vOy.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { R as ArrowRight, b as Mail, l as Sparkles, r as User } from "../_libs/lucide-react.mjs";
import { n as useAuth } from "./useAuth-CgN1WbA4.mjs";
import { r as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-yui_k7be.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OnboardingPage() {
	const { user, profile, saveProfile, loading } = useAuth();
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && !user) {
			navigate({ to: "/login" });
			return;
		}
		if (user) {
			setEmail(user.email || "");
			if (profile?.name) setName(profile.name);
		}
	}, [
		user,
		profile,
		loading,
		navigate
	]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name.trim()) {
			toast.error("Please enter your name");
			return;
		}
		if (!email.trim()) {
			toast.error("Please enter your email");
			return;
		}
		setSaving(true);
		try {
			await saveProfile(name.trim(), email.trim());
			toast.success("Profile saved!");
			navigate({ to: "/" });
		} catch (err) {
			console.error(err);
			toast.error(err.message || "Failed to save profile");
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col items-center justify-center min-h-[75vh] px-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							scale: .9,
							opacity: 0
						},
						animate: {
							scale: 1,
							opacity: 1
						},
						transition: { duration: .6 },
						className: "inline-block relative mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-primary/25 rounded-full blur-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative bg-card border border-border p-4 rounded-3xl shadow-xl flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-primary animate-pulse" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold tracking-tight text-foreground",
						children: "Let's get acquainted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Please customize your profile so we can personalize your daily experience."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					y: 15,
					opacity: 0
				},
				animate: {
					y: 0,
					opacity: 1
				},
				transition: { duration: .4 },
				className: "rounded-3xl border border-border bg-card p-6 shadow-xl backdrop-blur-md relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "What is your name?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									placeholder: "Enter your name",
									value: name,
									onChange: (e) => setName(e.target.value),
									className: "w-full rounded-xl bg-secondary px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-transparent focus:ring-primary focus:bg-background transition"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "What is your email address?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									required: true,
									placeholder: "Enter your email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "w-full rounded-xl bg-secondary px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-1 ring-transparent focus:ring-primary focus:bg-background transition"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: saving,
							className: "mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 active:scale-[0.98] transition disabled:opacity-50",
							children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Confirm and continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
						})
					]
				})]
			})]
		})
	}) });
}
//#endregion
export { OnboardingPage as component };
