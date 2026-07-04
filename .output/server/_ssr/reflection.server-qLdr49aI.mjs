import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DzFqBwFP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reflection.server-qLdr49aI.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Server-side proxy for the reflection webhook.
* Runs on the server (Nitro/Cloudflare Worker) so there are no CORS issues.
*/
var fetchReflectionFromWebhook = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("c5a47e7c605d4dacfb3073361f303ec3e661f548100a450ace2ea917df8be251"));
//#endregion
export { fetchReflectionFromWebhook };
