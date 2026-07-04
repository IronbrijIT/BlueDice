import { a as __toESM } from "../_runtime.mjs";
import { n as clearHistory } from "./storage-CKAcXOPT.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-8y5G6vOy.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as LayoutGrid, I as Calendar, L as Bell, N as ChevronRight, O as Crown, a as Trash2, d as ShieldCheck, i as Trophy, v as Palette, w as Info, x as LogOut, y as Mic } from "../_libs/lucide-react.mjs";
import { n as useAuth } from "./useAuth-CgN1WbA4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-C0yKdXeO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { profile, logout } = useAuth();
	const [about, setAbout] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, {
		title: "Profile",
		subtitle: "Preferences and app settings.",
		children: [
			profile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center justify-between rounded-3xl bg-card p-5 ring-1 ring-border shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary text-xl font-bold uppercase",
						children: profile.name ? profile.name[0] : "?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold text-foreground text-base leading-none",
						children: profile.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground mt-1.5",
						children: profile.email
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: logout,
					className: "flex items-center gap-1.5 rounded-xl bg-secondary hover:bg-destructive/10 hover:text-destructive px-3 py-2.5 text-xs font-semibold text-foreground transition active:scale-95 cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), " Log Out"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Features" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
						Icon: Bell,
						label: "Notifications",
						to: "/settings/notifications"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
						Icon: Calendar,
						label: "Calendar",
						to: "/calendar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
						Icon: Trophy,
						label: "Achievements",
						to: "/achievements"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Data" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						if (confirm("Clear all reflection history? This cannot be undone.")) clearHistory();
					},
					className: "flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left ring-1 ring-border active:scale-[0.99]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl bg-destructive/10 p-2 text-destructive",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium text-foreground",
							children: "Clear history"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "Remove every past reflection from this device."
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "About" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
						Icon: Info,
						label: "About Blue Dice",
						onClick: () => setAbout("about")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
						Icon: ShieldCheck,
						label: "Privacy policy",
						onClick: () => setAbout("privacy")
					}),
					about === "about" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl bg-secondary/60 p-4 text-xs leading-relaxed text-muted-foreground",
						children: "Blue Dice is a calm, minimal reflection app. Every reflection is offered as thoughtful inspiration — not prediction. Use it to pause, journal, and return to yourself."
					}) : null,
					about === "privacy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl bg-secondary/60 p-4 text-xs leading-relaxed text-muted-foreground",
						children: "Your history, favorites, and webhook URL are stored only on this device (localStorage). When a webhook is configured, reflection requests are sent to your chosen endpoint."
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Previews" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewNav, {
						Icon: Crown,
						label: "Premium",
						feature: "premium"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewNav, {
						Icon: LayoutGrid,
						label: "Widgets",
						feature: "widgets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewNav, {
						Icon: Palette,
						label: "Themes",
						feature: "themes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewNav, {
						Icon: Mic,
						label: "Voice reading",
						feature: "voice-reading"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-center text-[11px] text-muted-foreground",
				children: "Blue Dice · v0.1"
			})
		]
	});
}
function SectionTitle({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "px-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground",
		children
	});
}
function NavRow({ Icon, label, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "flex w-full items-center gap-3 rounded-2xl bg-card p-4 ring-1 ring-border active:scale-[0.99]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl bg-primary/10 p-2 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 text-sm font-medium text-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
		]
	});
}
function PreviewNav({ Icon, label, feature }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/preview/$feature",
		params: { feature },
		className: "flex w-full items-center gap-3 rounded-2xl bg-card p-4 ring-1 ring-border active:scale-[0.99]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl bg-secondary p-2 text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-medium text-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: "Preview & vote"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
		]
	});
}
function InfoRow({ Icon, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: "flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left ring-1 ring-border active:scale-[0.99]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl bg-secondary p-2 text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 text-sm font-medium text-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: "›"
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
