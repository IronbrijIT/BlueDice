globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/icon-512.png": {
		"type": "image/png",
		"etag": "\"2faa-wcjqIgMZ0Tn3W4HkVxJEFQ1Zt58\"",
		"mtime": "2026-07-03T01:59:38.000Z",
		"size": 12202,
		"path": "../public/icon-512.png"
	},
	"/push-sw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c3-+fn6QV1czzuRXrYaYQPz7VsW0tc\"",
		"mtime": "2026-07-03T01:59:38.000Z",
		"size": 1475,
		"path": "../public/push-sw.js"
	},
	"/manifest.webmanifest": {
		"type": "application/manifest+json",
		"etag": "\"1cc-HJu9lrrBrQO+tj6JsbtrAnjjM8k\"",
		"mtime": "2026-07-03T01:59:38.000Z",
		"size": 460,
		"path": "../public/manifest.webmanifest"
	},
	"/assets/achievements-B74XOg9V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5f-GYRE2QYeH8lVKUvEP3qU5+lZ35c\"",
		"mtime": "2026-07-04T14:41:28.001Z",
		"size": 2655,
		"path": "../public/assets/achievements-B74XOg9V.js"
	},
	"/assets/bell-D1e9aBdB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-+LhHX9DjrwHnfPbFJ1D3WGltOlk\"",
		"mtime": "2026-07-04T14:41:28.001Z",
		"size": 279,
		"path": "../public/assets/bell-D1e9aBdB.js"
	},
	"/assets/chevron-left-DgBnLJ1g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77-HM/9cJxRRT/+KfdwPEuRjPT2gNE\"",
		"mtime": "2026-07-04T14:41:28.002Z",
		"size": 119,
		"path": "../public/assets/chevron-left-DgBnLJ1g.js"
	},
	"/assets/chevron-right-BIv45cQV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"77-0BnR0diEI7xcsDk9tqjaxNRCyV4\"",
		"mtime": "2026-07-04T14:41:28.002Z",
		"size": 119,
		"path": "../public/assets/chevron-right-BIv45cQV.js"
	},
	"/assets/calendar-CWyjP95X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d76-i95z8eVKcRqQNZkujpCtxwqVWv8\"",
		"mtime": "2026-07-04T14:41:28.002Z",
		"size": 3446,
		"path": "../public/assets/calendar-CWyjP95X.js"
	},
	"/assets/copy-Dy930-yg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"128-a0N5A0vTrdA7bVXFmPYKyi1XdGI\"",
		"mtime": "2026-07-04T14:41:28.003Z",
		"size": 296,
		"path": "../public/assets/copy-Dy930-yg.js"
	},
	"/assets/dice-icon-DkgLtvPR.png": {
		"type": "image/png",
		"etag": "\"2faa-wcjqIgMZ0Tn3W4HkVxJEFQ1Zt58\"",
		"mtime": "2026-07-04T14:41:28.014Z",
		"size": 12202,
		"path": "../public/assets/dice-icon-DkgLtvPR.png"
	},
	"/assets/Dice3D-B0tkJKwH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b4c-Z6Jxf1RObHxXO5lUqTiTLM2EikQ\"",
		"mtime": "2026-07-04T14:41:27.999Z",
		"size": 2892,
		"path": "../public/assets/Dice3D-B0tkJKwH.js"
	},
	"/assets/favorites-DH7Iez7Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"640-xg7YI2U282/PVwscRacVprMMPto\"",
		"mtime": "2026-07-04T14:41:28.003Z",
		"size": 1600,
		"path": "../public/assets/favorites-DH7Iez7Z.js"
	},
	"/assets/history-DzG4Zn2A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"666-w5mE5UGG/QQBgpdUDn2FucmutfU\"",
		"mtime": "2026-07-04T14:41:28.003Z",
		"size": 1638,
		"path": "../public/assets/history-DzG4Zn2A.js"
	},
	"/assets/firebase-DlZjnYZi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"153ae-XwYSltyAmfyhfDV7P9qEgr+DeXI\"",
		"mtime": "2026-07-04T14:41:28.003Z",
		"size": 86958,
		"path": "../public/assets/firebase-DlZjnYZi.js"
	},
	"/assets/index-BgQr9E1R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7e510-tH9JMIrM60fHjy1t0r/k3v1R24Y\"",
		"mtime": "2026-07-04T14:41:27.998Z",
		"size": 517392,
		"path": "../public/assets/index-BgQr9E1R.js"
	},
	"/assets/index.esm-C08tuGH8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7359a-yjIT4VK/fpoUPNhYJ5leHO9QcCw\"",
		"mtime": "2026-07-04T14:41:28.005Z",
		"size": 472474,
		"path": "../public/assets/index.esm-C08tuGH8.js"
	},
	"/assets/jsx-runtime-DiK4U9sA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b3-wXxXyswNhndByM42wnD5/FJtWq0\"",
		"mtime": "2026-07-04T14:41:28.005Z",
		"size": 435,
		"path": "../public/assets/jsx-runtime-DiK4U9sA.js"
	},
	"/assets/lock-BaTF9s9O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c3-lh0WsUwp+fSztqYWCoqmgqymb+0\"",
		"mtime": "2026-07-04T14:41:28.006Z",
		"size": 195,
		"path": "../public/assets/lock-BaTF9s9O.js"
	},
	"/assets/login-DjMqDL7c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22ee-eJkFAp6ZIoI50yTR7g381/4NOSA\"",
		"mtime": "2026-07-04T14:41:28.006Z",
		"size": 8942,
		"path": "../public/assets/login-DjMqDL7c.js"
	},
	"/assets/mail-PPky6zlr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13a-Ce7pM3zm5o7by9fYY7P7Ej8mMu0\"",
		"mtime": "2026-07-04T14:41:28.006Z",
		"size": 314,
		"path": "../public/assets/mail-PPky6zlr.js"
	},
	"/assets/n8n-B3P5OPH7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d3f-GEW82JE/nBHNbd3bOak+qV6tC8M\"",
		"mtime": "2026-07-04T14:41:28.007Z",
		"size": 7487,
		"path": "../public/assets/n8n-B3P5OPH7.js"
	},
	"/assets/n8n-notification-C1iRmkBG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3216-XmEdkSq5oW8YhID01G9ibEzm0Us\"",
		"mtime": "2026-07-04T14:41:28.007Z",
		"size": 12822,
		"path": "../public/assets/n8n-notification-C1iRmkBG.js"
	},
	"/assets/onboarding-SulNii7P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123c-PRDE+bhjscf+eYeFH2+J5VRPbAo\"",
		"mtime": "2026-07-04T14:41:28.008Z",
		"size": 4668,
		"path": "../public/assets/onboarding-SulNii7P.js"
	},
	"/assets/PageShell-CikcSW_E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27c-1Wb2ue3GFhsgYMfwspuBl5PSLpM\"",
		"mtime": "2026-07-04T14:41:27.999Z",
		"size": 636,
		"path": "../public/assets/PageShell-CikcSW_E.js"
	},
	"/assets/PressableCard-B2yDMso5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bc-xvLiUtwOMUrdjG+Cge8mvFiw128\"",
		"mtime": "2026-07-04T14:41:28.000Z",
		"size": 444,
		"path": "../public/assets/PressableCard-B2yDMso5.js"
	},
	"/assets/preview._feature-Ciu6ltxy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c0-gO37JykxREYdqFY35eid7hnRMSY\"",
		"mtime": "2026-07-04T14:41:28.008Z",
		"size": 192,
		"path": "../public/assets/preview._feature-Ciu6ltxy.js"
	},
	"/assets/profile-D2NNBhyb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1861-vaN14Ep4+qTL2u63gFEwrcSaZts\"",
		"mtime": "2026-07-04T14:41:28.009Z",
		"size": 6241,
		"path": "../public/assets/profile-D2NNBhyb.js"
	},
	"/assets/react-9ZasmZpi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d6c-TUNbcXoAcWz2cdRXtghoqoMFdow\"",
		"mtime": "2026-07-04T14:41:28.009Z",
		"size": 7532,
		"path": "../public/assets/react-9ZasmZpi.js"
	},
	"/assets/react-dom-CbJ76tum.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dfb-RV1qmvY3C+Ax2oGQbVRNpy9LGqw\"",
		"mtime": "2026-07-04T14:41:28.010Z",
		"size": 3579,
		"path": "../public/assets/react-dom-CbJ76tum.js"
	},
	"/assets/reflection-BtprkddR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1db-+/NTIkhJeI+rJetPiFyKxdsV9XA\"",
		"mtime": "2026-07-04T14:41:28.011Z",
		"size": 61915,
		"path": "../public/assets/reflection-BtprkddR.js"
	},
	"/assets/preview._feature-DRjP0A7N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10f8-7DsqdMnMqj77CWECONRpW+3mtf4\"",
		"mtime": "2026-07-04T14:41:28.009Z",
		"size": 4344,
		"path": "../public/assets/preview._feature-DRjP0A7N.js"
	},
	"/assets/reflection-BVIr4ehc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"785-oUkwEB7Soz/Ta+7P/7Am4ICgff0\"",
		"mtime": "2026-07-04T14:41:28.010Z",
		"size": 1925,
		"path": "../public/assets/reflection-BVIr4ehc.js"
	},
	"/assets/ReflectionCard-BNjx4Kaa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"131a-viF7t9h/zFCL3pCajIn9l/U7n6Q\"",
		"mtime": "2026-07-04T14:41:28.000Z",
		"size": 4890,
		"path": "../public/assets/ReflectionCard-BNjx4Kaa.js"
	},
	"/assets/rolldown-runtime-CNC7AqOf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36f-poL7VEo+W3rlEpE8cNtjWDVI11g\"",
		"mtime": "2026-07-04T14:41:28.012Z",
		"size": 879,
		"path": "../public/assets/rolldown-runtime-CNC7AqOf.js"
	},
	"/assets/reflection.server-D8KqbU9H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ab-lhRAv1t/kvIqhZO4/NE8dm/xdA8\"",
		"mtime": "2026-07-04T14:41:28.011Z",
		"size": 4523,
		"path": "../public/assets/reflection.server-D8KqbU9H.js"
	},
	"/assets/routes-B_JV6052.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd4-67pgoU6GzFT3R8Ec/Ji2bBInMes\"",
		"mtime": "2026-07-04T14:41:28.012Z",
		"size": 4052,
		"path": "../public/assets/routes-B_JV6052.js"
	},
	"/assets/settings.notifications--Edx6oD8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2851-BcKIttygm5jvU/NmZ+Dmk/Usovk\"",
		"mtime": "2026-07-04T14:41:28.013Z",
		"size": 10321,
		"path": "../public/assets/settings.notifications--Edx6oD8.js"
	},
	"/assets/StaggerList-DljrqwJT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20c-+JdkdDI28YJQIu2RDe6/lVfv8nM\"",
		"mtime": "2026-07-04T14:41:28.001Z",
		"size": 524,
		"path": "../public/assets/StaggerList-DljrqwJT.js"
	},
	"/assets/styles-C0HqBR0v.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16707-ejt7Alt2Rt0hLZLaPfn+7foH4fM\"",
		"mtime": "2026-07-04T14:41:28.014Z",
		"size": 91911,
		"path": "../public/assets/styles-C0HqBR0v.css"
	},
	"/assets/trash-2-B3fZ2F1K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13d-RBkQIFZGKIw/XpOnFDdxTooB40s\"",
		"mtime": "2026-07-04T14:41:28.013Z",
		"size": 317,
		"path": "../public/assets/trash-2-B3fZ2F1K.js"
	},
	"/assets/trophy-ClYXDw1m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-bbEtLVvcjNuMtZWLJRq6q+rqn5w\"",
		"mtime": "2026-07-04T14:41:28.013Z",
		"size": 465,
		"path": "../public/assets/trophy-ClYXDw1m.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_b02ADs = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_b02ADs
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
