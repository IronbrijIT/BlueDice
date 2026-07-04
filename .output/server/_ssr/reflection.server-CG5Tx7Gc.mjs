import { t as SYSTEM_PROMPT } from "./reflection-BFo5IkDt.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/reflection.server-CG5Tx7Gc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Server-side proxy for the reflection webhook.
* Runs on the server (Nitro/Cloudflare Worker) so there are no CORS issues.
*/
var fetchReflectionFromWebhook_createServerFn_handler = createServerRpc({
	id: "c5a47e7c605d4dacfb3073361f303ec3e661f548100a450ace2ea917df8be251",
	name: "fetchReflectionFromWebhook",
	filename: "src/services/reflection.server.ts"
}, (opts) => fetchReflectionFromWebhook.__executeServer(opts));
var fetchReflectionFromWebhook = createServerFn({ method: "POST" }).validator((data) => data).handler(fetchReflectionFromWebhook_createServerFn_handler, async ({ data }) => {
	const WEBHOOK_URL = processModule.env.VITE_REFLECTION_WEBHOOK_URL ?? "https://vmi3182726.contaboserver.net/webhook/blue-dice-reflection";
	const userPrompt = data.prompt?.trim();
	const finalSystemPrompt = userPrompt ? `${SYSTEM_PROMPT}\n\nThe user says: "${userPrompt}"` : SYSTEM_PROMPT;
	const res = await fetch(WEBHOOK_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			source: "blue-dice",
			at: (/* @__PURE__ */ new Date()).toISOString(),
			prompt: userPrompt || void 0,
			systemPrompt: finalSystemPrompt,
			system_prompt: finalSystemPrompt
		})
	});
	if (!res.ok) throw new Error(`Reflection webhook failed (${res.status})`);
	return extractReflection(await res.json());
});
function extractReflection(raw) {
	let data = Array.isArray(raw) ? raw[0] : raw;
	if (typeof data !== "object" || data === null) {
		if (typeof data === "string") return parseJsonString(data);
		throw new Error("Webhook returned unexpected data type");
	}
	const obj = data;
	if ("title" in obj && "message" in obj) return obj;
	for (const key of [
		"output",
		"text",
		"response",
		"message",
		"content",
		"data",
		"result"
	]) {
		const value = obj[key];
		if (value == null) continue;
		if (typeof value === "object" && !Array.isArray(value) && "title" in value) return value;
		if (typeof value === "string") try {
			return parseJsonString(value);
		} catch {
			continue;
		}
	}
	return obj;
}
function parseJsonString(str) {
	let cleaned = str.trim();
	cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
	cleaned = cleaned.trim();
	const parsed = JSON.parse(cleaned);
	if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) return parsed;
	throw new Error("Parsed value is not an object");
}
//#endregion
export { fetchReflectionFromWebhook_createServerFn_handler };
