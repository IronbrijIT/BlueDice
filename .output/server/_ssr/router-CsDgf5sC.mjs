import { a as __toESM } from "../_runtime.mjs";
import { a as AnimatePresence, i as LayoutGroup, r as motion } from "../_libs/framer-motion.mjs";
import { n as require_react, r as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as useReducedMotion$1 } from "./useReducedMotion-Dded5mnp.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Heart, T as House, j as Clock, r as User, t as X } from "../_libs/lucide-react.mjs";
import { n as useHaptics } from "./useLocalStore-BmW8XRRN.mjs";
import { n as useAuth, t as AuthProvider } from "./useAuth-CgN1WbA4.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as getNotifPrefs } from "./webhook-XOvR656d.mjs";
import { n as Route$13 } from "./preview._feature-9kyHKs5W.mjs";
import { i as scheduleReminder, n as initScheduler } from "./scheduler-Cs1sEp_B.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CsDgf5sC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C0HqBR0v.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var TABS = [
	{
		to: "/",
		label: "Home",
		Icon: House
	},
	{
		to: "/history",
		label: "History",
		Icon: Clock
	},
	{
		to: "/favorites",
		label: "Saved",
		Icon: Heart
	},
	{
		to: "/profile",
		label: "Profile",
		Icon: User
	}
];
function TabBar() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const haptic = useHaptics();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 backdrop-blur-xl",
		style: { paddingBottom: "env(safe-area-inset-bottom)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGroup, {
			id: "tabbar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mx-auto flex max-w-xl items-stretch justify-around px-2 py-2",
				children: TABS.map(({ to, label, Icon }) => {
					const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to,
							onClick: () => haptic(6),
							className: `relative flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium outline-none transition-colors ${active ? "text-primary" : "text-muted-foreground"}`,
							children: [
								active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									layoutId: "tab-indicator",
									className: "absolute inset-x-2 inset-y-1 rounded-xl bg-primary/10",
									transition: {
										type: "spring",
										stiffness: 420,
										damping: 34,
										mass: .6
									},
									"aria-hidden": true
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									className: "relative z-10",
									animate: {
										scale: active ? 1.08 : 1,
										y: active ? -1 : 0
									},
									whileTap: { scale: .9 },
									transition: {
										type: "spring",
										stiffness: 500,
										damping: 26
									},
									style: { willChange: "transform" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-5 w-5 ${active ? "" : "opacity-80"}` })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "relative z-10",
									children: label
								})
							]
						})
					}, to);
				})
			})
		})
	});
}
var dice_icon_default = "/assets/dice-icon-DkgLtvPR.png";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
/**
* Wraps route content in an AnimatePresence keyed by pathname so every
* navigation gets a calm fade + 8px upward slide. Uses transform+opacity
* only so it stays on the GPU compositor at 60fps.
*/
function PageTransition({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const reduced = useReducedMotion$1();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
		mode: "wait",
		initial: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: reduced ? false : {
				opacity: 0,
				y: 8
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: reduced ? { opacity: 0 } : {
				opacity: 0,
				y: -6
			},
			transition: {
				duration: reduced ? .12 : .22,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			style: { willChange: "transform, opacity" },
			children
		}, pathname)
	});
}
function dateKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
/** Reconcile today's assistant reminders. Idempotent — safe to call often. */
function reconcileAssistant() {
	if (typeof window === "undefined") return;
	if (!getNotifPrefs().enabled) return;
	const key = dateKey();
	const d = /* @__PURE__ */ new Date();
	d.setHours(20, 0, 0, 0);
	const fireAt = d.getTime();
	if (fireAt > Date.now()) scheduleReminder({
		id: `assistant:reflect:${key}`,
		title: "Time to reflect 🎲",
		body: "Take a moment to roll the dice and capture today's thoughts.",
		category: "reflection",
		fireAt,
		url: `/?src=notif`
	});
}
var heartbeat = null;
/** Mount once from the root component. */
function initAssistant() {
	if (typeof window === "undefined") return;
	reconcileAssistant();
	if (heartbeat != null) clearInterval(heartbeat);
	heartbeat = setInterval(reconcileAssistant, 6e4);
	const onFocus = () => reconcileAssistant();
	const onStorage = (e) => {
		if (e.detail?.key === "bluedice.notifPrefs") reconcileAssistant();
	};
	window.addEventListener("focus", onFocus);
	window.addEventListener("visibilitychange", onFocus);
	window.addEventListener("bluedice:storage", onStorage);
}
/** Listens for local reminder events fired by the notification scheduler. */
function useAssistantEvents() {
	const [reminder, setReminder] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const onReminder = (e) => {
			const r = e.detail;
			if (!r) return;
			if (document.visibilityState === "visible") {
				setReminder(r);
				window.setTimeout(() => setReminder((cur) => cur?.id === r.id ? null : cur), 8e3);
			} else if (!("Notification" in window) || Notification.permission !== "granted") import("../_libs/sonner.mjs").then((n) => n.n).then(({ toast }) => toast(r.title, { description: r.body }));
		};
		window.addEventListener("bluedice:reminder", onReminder);
		return () => window.removeEventListener("bluedice:reminder", onReminder);
	}, []);
	return {
		reminder,
		dismiss: () => setReminder(null)
	};
}
function AssistantBanner({ reminder, onDismiss }) {
	const navigate = useNavigate();
	const cta = reminder?.category === "reflection" ? "Reflect" : reminder?.url?.includes("assistant=start") ? "Start now" : "Open";
	const go = () => {
		if (reminder?.url) {
			const [path, query = ""] = reminder.url.split("?");
			navigate({
				to: path,
				search: Object.fromEntries(new URLSearchParams(query))
			});
		}
		onDismiss();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: reminder ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			y: -80,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		exit: {
			y: -80,
			opacity: 0
		},
		transition: {
			type: "spring",
			stiffness: 320,
			damping: 30
		},
		className: "fixed inset-x-0 top-0 z-50 px-3 pt-[calc(env(safe-area-inset-top)+8px)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-xl items-center gap-3 rounded-2xl bg-foreground/95 p-3 pr-2 text-background shadow-xl backdrop-blur",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-sm font-semibold",
						children: reminder.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-xs opacity-80",
						children: reminder.body
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: go,
					className: "rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground active:scale-95",
					children: cta
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onDismiss,
					"aria-label": "Dismiss",
					className: "rounded-lg p-1.5 opacity-70 hover:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})
			]
		})
	}, reminder.id) : null });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1"
			},
			{ title: "Blue Dice — Roll for today's reflection" },
			{
				name: "description",
				content: "A calm, elegant app for daily reflection. Roll the dice, receive a thoughtful message, affirmation, and journal prompt."
			},
			{
				name: "theme-color",
				content: "#ffffff"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "Blue Dice"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "default"
			},
			{
				property: "og:title",
				content: "Blue Dice — Roll for today's reflection"
			},
			{
				property: "og:description",
				content: "Blue Dice Reflections is a mobile app that provides daily AI-generated reflections and prompts."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:title",
				content: "Blue Dice — Roll for today's reflection"
			},
			{
				name: "description",
				content: "Blue Dice Reflections is a mobile app that provides daily AI-generated reflections and prompts."
			},
			{
				name: "twitter:description",
				content: "Blue Dice Reflections is a mobile app that provides daily AI-generated reflections and prompts."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9705f5e6-9b7b-4f37-b4e4-683abbeb08db/id-preview-a548fa9d--17b75f1b-026b-49a3-a219-38c1c9779bd0.lovable.app-1782872054686.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9705f5e6-9b7b-4f37-b4e4-683abbeb08db/id-preview-a548fa9d--17b75f1b-026b-49a3-a219-38c1c9779bd0.lovable.app-1782872054686.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "icon",
				href: dice_icon_default,
				type: "image/png"
			},
			{
				rel: "apple-touch-icon",
				href: dice_icon_default
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function AuthGuard({ children }) {
	const { user, profile, loading } = useAuth();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		if (loading) return;
		if (!user) {
			if (pathname !== "/login") navigate({ to: "/login" });
		} else if (!profile || !profile.name) {
			if (pathname !== "/onboarding") navigate({ to: "/onboarding" });
		} else if (pathname === "/login" || pathname === "/onboarding") navigate({ to: "/" });
	}, [
		user,
		profile,
		loading,
		pathname,
		navigate
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground uppercase tracking-widest",
				children: "Loading Blue Dice..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [children, !(pathname === "/login" || pathname === "/onboarding") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {})]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	const { reminder, dismiss } = useAssistantEvents();
	(0, import_react.useEffect)(() => {
		initScheduler();
		initAssistant();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthGuard, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantBanner, {
				reminder,
				onDismiss: dismiss
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" })
		] }) })
	});
}
var $$splitComponentImporter$11 = () => import("./reflection-DWTHFNZ8.mjs");
var Route$11 = createFileRoute("/reflection")({
	head: () => ({ meta: [{ title: "Today's Reflection — Blue Dice" }, {
		name: "description",
		content: "Your latest Blue Dice reflection."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./profile-C0yKdXeO.mjs");
var Route$10 = createFileRoute("/profile")({
	head: () => ({ meta: [{ title: "Profile — Blue Dice" }, {
		name: "description",
		content: "Settings and preferences."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./onboarding-yui_k7be.mjs");
var Route$9 = createFileRoute("/onboarding")({
	head: () => ({ meta: [{ title: "Onboarding — Blue Dice" }, {
		name: "description",
		content: "Tell us a bit about yourself."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./n8n-notification-DAcPdqX4.mjs");
var Route$8 = createFileRoute("/n8n-notification")({
	head: () => ({ meta: [{ title: "n8n Specific User Push — Blue Dice" }, {
		name: "description",
		content: "Send push notifications to specific users using n8n and Firestore rules."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./n8n-BRLocEtN.mjs");
var Route$7 = createFileRoute("/n8n")({
	head: () => ({ meta: [{ title: "n8n Setup — Blue Dice" }, {
		name: "description",
		content: "Configure your n8n workflow for custom AI reflections."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./login-D-3cIz37.mjs");
var Route$6 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Login — Blue Dice" }, {
		name: "description",
		content: "Sign in to sync your reflections and stats."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./history-BfgCVEnR.mjs");
var Route$5 = createFileRoute("/history")({
	head: () => ({ meta: [{ title: "History — Blue Dice" }, {
		name: "description",
		content: "Every reflection you've received."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./favorites-CBr42e9M.mjs");
var Route$4 = createFileRoute("/favorites")({
	head: () => ({ meta: [{ title: "Saved — Blue Dice" }, {
		name: "description",
		content: "Reflections you've saved."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./calendar-BpfkZuI7.mjs");
var Route$3 = createFileRoute("/calendar")({
	head: () => ({ meta: [{ title: "Calendar — Blue Dice" }, {
		name: "description",
		content: "Your reflections by day."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./achievements-CKL25jh3.mjs");
var Route$2 = createFileRoute("/achievements")({
	head: () => ({ meta: [{ title: "Achievements — Blue Dice" }, {
		name: "description",
		content: "Milestones for showing up."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./routes-DMuVBHkg.mjs");
var Route$1 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Blue Dice — Roll for today's reflection" },
		{
			name: "description",
			content: "Every roll brings a new perspective. Tap the dice for a calm, thoughtful reflection."
		},
		{
			property: "og:title",
			content: "Blue Dice"
		},
		{
			property: "og:description",
			content: "Roll for today's reflection."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./settings.notifications-BXMX3ZZa.mjs");
var Route = createFileRoute("/settings/notifications")({
	head: () => ({ meta: [{ title: "Notifications — Blue Dice" }, {
		name: "description",
		content: "Control reminders and push notifications."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var ReflectionRoute = Route$11.update({
	id: "/reflection",
	path: "/reflection",
	getParentRoute: () => Route$12
});
var ProfileRoute = Route$10.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$12
});
var OnboardingRoute = Route$9.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$12
});
var N8nNotificationRoute = Route$8.update({
	id: "/n8n-notification",
	path: "/n8n-notification",
	getParentRoute: () => Route$12
});
var N8nRoute = Route$7.update({
	id: "/n8n",
	path: "/n8n",
	getParentRoute: () => Route$12
});
var LoginRoute = Route$6.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$12
});
var HistoryRoute = Route$5.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => Route$12
});
var FavoritesRoute = Route$4.update({
	id: "/favorites",
	path: "/favorites",
	getParentRoute: () => Route$12
});
var CalendarRoute = Route$3.update({
	id: "/calendar",
	path: "/calendar",
	getParentRoute: () => Route$12
});
var AchievementsRoute = Route$2.update({
	id: "/achievements",
	path: "/achievements",
	getParentRoute: () => Route$12
});
var IndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var SettingsNotificationsRoute = Route.update({
	id: "/settings/notifications",
	path: "/settings/notifications",
	getParentRoute: () => Route$12
});
var rootRouteChildren = {
	IndexRoute,
	AchievementsRoute,
	CalendarRoute,
	FavoritesRoute,
	HistoryRoute,
	LoginRoute,
	N8nRoute,
	N8nNotificationRoute,
	OnboardingRoute,
	ProfileRoute,
	ReflectionRoute,
	PreviewFeatureRoute: Route$13.update({
		id: "/preview/$feature",
		path: "/preview/$feature",
		getParentRoute: () => Route$12
	}),
	SettingsNotificationsRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
