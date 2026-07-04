//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DzFqBwFP.js
var manifest = { "c5a47e7c605d4dacfb3073361f303ec3e661f548100a450ace2ea917df8be251": {
	functionName: "fetchReflectionFromWebhook_createServerFn_handler",
	importer: () => import("./_ssr/reflection.server-CG5Tx7Gc.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
