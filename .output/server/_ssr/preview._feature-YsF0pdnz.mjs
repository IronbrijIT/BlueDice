import { a as __toESM } from "../_runtime.mjs";
import { r as motion } from "../_libs/framer-motion.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as PageShell } from "./PageShell-8y5G6vOy.mjs";
import { L as Bell, m as Send, o as ThumbsUp } from "../_libs/lucide-react.mjs";
import { a as hasVoted, c as saveFeedback, d as toggleVote, i as getVotes, o as joinWaitlist, s as postToWebhook } from "./webhook-XOvR656d.mjs";
import { n as Route, t as FEATURES } from "./preview._feature-9kyHKs5W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/preview._feature-YsF0pdnz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PreviewPage({ featureId, title, tagline, description, status, Icon }) {
	const [voteCount, setVoteCount] = (0, import_react.useState)(() => getVotes()[featureId] ?? 0);
	const [voted, setVoted] = (0, import_react.useState)(() => hasVoted(featureId));
	const [email, setEmail] = (0, import_react.useState)("");
	const [joined, setJoined] = (0, import_react.useState)(false);
	const [feedback, setFeedback] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 12
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .4 },
		className: "flex flex-col items-center text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-[0_20px_50px_-24px_rgb(37_99_235_/_0.45)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "h-11 w-11",
					strokeWidth: 1.5
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-4 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary",
				children: status
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-[28px] font-semibold text-foreground",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xs text-sm text-muted-foreground",
				children: tagline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 max-w-md rounded-2xl bg-secondary/60 p-4 text-left text-sm leading-relaxed text-foreground/85",
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 w-full max-w-md space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-card p-4 text-left ring-1 ring-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium text-foreground",
								children: "Notify me when available"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: "We'll send a single email — no spam."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									inputMode: "email",
									placeholder: "you@example.com",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "flex-1 rounded-xl bg-secondary px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: !email.includes("@") || joined,
									onClick: () => {
										joinWaitlist(featureId, email);
										postToWebhook({
											type: "waitlist.joined",
											feature: featureId,
											email
										});
										setJoined(true);
									},
									className: "rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" })
								})]
							}),
							joined ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-primary",
								children: "You're on the list."
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							const n = toggleVote(featureId);
							setVoteCount(n);
							setVoted(!voted);
							postToWebhook({
								type: "feature.voted",
								feature: featureId,
								delta: voted ? -1 : 1
							});
						},
						className: `flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-medium transition active:scale-[0.98] ${voted ? "bg-primary/10 text-primary" : "bg-secondary text-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: `h-4 w-4 ${voted ? "fill-current" : ""}` }),
							voted ? "Voted" : "Vote for this feature",
							" · ",
							voteCount
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-card p-4 text-left ring-1 ring-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium text-foreground",
								children: "Ideas or feedback"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: feedback,
								onChange: (e) => setFeedback(e.target.value),
								placeholder: "What would make this perfect for you?",
								className: "mt-2 w-full resize-none rounded-xl bg-secondary px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								disabled: feedback.trim().length < 3 || sent,
								onClick: () => {
									saveFeedback(featureId, feedback.trim());
									postToWebhook({
										type: "feature.feedback",
										feature: featureId,
										text: feedback.trim()
									});
									setSent(true);
									setFeedback("");
								},
								className: "mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-2.5 text-sm font-medium text-background disabled:opacity-50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }),
									" ",
									sent ? "Thanks!" : "Send feedback"
								]
							})
						]
					})
				]
			})
		]
	}) });
}
function FeaturePreview() {
	const { feature } = Route.useParams();
	const f = FEATURES[feature];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewPage, {
		featureId: feature,
		title: f.title,
		tagline: f.tagline,
		description: f.description,
		status: f.status,
		Icon: f.Icon
	});
}
//#endregion
export { FeaturePreview as component };
