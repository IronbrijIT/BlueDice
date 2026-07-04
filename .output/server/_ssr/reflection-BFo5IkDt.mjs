import { n as string, t as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reflection-BFo5IkDt.js
var ReflectionSchema = object({
	title: string(),
	message: string(),
	affirmation: string(),
	journal_prompt: string(),
	action: string(),
	mood: string()
});
var DEFAULT_WEBHOOK_URL = "https://vmi3182726.contaboserver.net/webhook/blue-dice-reflection";
function resolveWebhookUrl() {
	return DEFAULT_WEBHOOK_URL;
}
var MOCK_POOL = [
	{
		title: "Begin Where You Are",
		message: "You don't need the perfect moment to begin. The path unfolds beneath the first honest step you take today.",
		affirmation: "I trust the pace of my own becoming.",
		journal_prompt: "What small step have I been postponing, and why?",
		action: "Spend five uninterrupted minutes on the thing you keep avoiding.",
		mood: "Grounded"
	},
	{
		title: "The Quiet Between",
		message: "Notice the pause between thoughts. That silence is not empty — it is where clarity lives.",
		affirmation: "Stillness is a place I can return to.",
		journal_prompt: "When did I last feel truly quiet? What made it possible?",
		action: "Sit for three minutes today without reaching for your phone.",
		mood: "Peaceful"
	},
	{
		title: "Small Weather",
		message: "Feelings pass like weather across an open sky. You are the sky, not the storm moving through it.",
		affirmation: "I am larger than what I feel today.",
		journal_prompt: "What emotion am I giving too much authority?",
		action: "Name one feeling out loud, then let it move on.",
		mood: "Hopeful"
	},
	{
		title: "A Kinder Angle",
		message: "The story you tell yourself about today is a choice. Choose the version that lets you keep going.",
		affirmation: "I speak to myself the way I'd speak to a friend.",
		journal_prompt: "What is one thought I could reframe more generously?",
		action: "Write down one thing you appreciate about yourself.",
		mood: "Warm"
	},
	{
		title: "Return to the Body",
		message: "The mind wanders far. The body always waits patiently in the present, ready to bring you home.",
		affirmation: "I am here, in this breath, in this moment.",
		journal_prompt: "Where in my body am I holding tension I haven't noticed?",
		action: "Take three slow breaths and unclench your jaw and shoulders.",
		mood: "Calm"
	}
];
function pickMock() {
	return MOCK_POOL[Math.floor(Math.random() * MOCK_POOL.length)];
}
function makeId() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
var SYSTEM_PROMPT = `Act as Blue Dice AI. Return ONLY valid JSON:
{
  "title": "3-4 word title",
  "message": "2 sentence calming reflection addressing user's context.",
  "affirmation": "First-person present affirmation",
  "journal_prompt": "deep question",
  "action": "2-min physical task",
  "mood": "Grounded/Peaceful/Hopeful/Warm/Calm"
}`;
/**
* Fetch a reflection from your configured webhook.
* Uses a server-side proxy (TanStack server function) to avoid CORS issues.
* Falls back to a local mock pool when no URL is set — so the UI is always
* demoable.
*/
async function getReflection(prompt) {
	const url = resolveWebhookUrl();
	let payload;
	if (!url) {
		await new Promise((r) => setTimeout(r, 1800));
		payload = pickMock();
	} else {
		const { fetchReflectionFromWebhook } = await import("./reflection.server-qLdr49aI.mjs");
		const result = await fetchReflectionFromWebhook({ data: { prompt: prompt?.trim() } });
		payload = ReflectionSchema.parse(result);
	}
	return {
		...payload,
		id: makeId(),
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
//#endregion
export { getReflection as n, SYSTEM_PROMPT as t };
