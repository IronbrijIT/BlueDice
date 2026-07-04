//#region node_modules/.nitro/vite/services/ssr/assets/webhook-XOvR656d.js
var KEYS = {
	prefs: "bluedice.notifPrefs",
	queue: "bluedice.notifQueue",
	waitlist: "bluedice.waitlist",
	votes: "bluedice.votes",
	feedback: "bluedice.feedback"
};
var DEFAULT_NOTIF_PREFS = {
	enabled: false,
	motivational: true,
	work: true,
	streak: true,
	reflection: true,
	motivationalFrequency: "daily",
	quietHoursStart: "22:00",
	quietHoursEnd: "07:30",
	vapidPublicKey: "",
	syncWebhookUrl: ""
};
function read(key, fb) {
	if (typeof window === "undefined") return fb;
	try {
		const raw = window.localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fb;
	} catch {
		return fb;
	}
}
function write(key, value) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(key, JSON.stringify(value));
	window.dispatchEvent(new CustomEvent("bluedice:storage", { detail: { key } }));
}
function getNotifPrefs() {
	return {
		...DEFAULT_NOTIF_PREFS,
		...read(KEYS.prefs, {})
	};
}
function setNotifPrefs(patch) {
	const next = {
		...getNotifPrefs(),
		...patch
	};
	write(KEYS.prefs, next);
	return next;
}
function getQueue() {
	return read(KEYS.queue, []);
}
function setQueue(q) {
	write(KEYS.queue, q);
}
function getWaitlist() {
	return read(KEYS.waitlist, {});
}
function joinWaitlist(feature, email) {
	const w = getWaitlist();
	w[feature] = Array.from(/* @__PURE__ */ new Set([...w[feature] ?? [], email]));
	write(KEYS.waitlist, w);
}
function getVotes() {
	return read(KEYS.votes, {});
}
function toggleVote(feature) {
	const v = getVotes();
	const voted = read("bluedice.myVotes", {});
	if (voted[feature]) {
		v[feature] = Math.max(0, (v[feature] ?? 1) - 1);
		delete voted[feature];
	} else {
		v[feature] = (v[feature] ?? 0) + 1;
		voted[feature] = true;
	}
	write(KEYS.votes, v);
	write("bluedice.myVotes", voted);
	return v[feature];
}
function hasVoted(feature) {
	return !!read("bluedice.myVotes", {})[feature];
}
function saveFeedback(feature, text) {
	const f = read(KEYS.feedback, {});
	f[feature] = [...f[feature] ?? [], text];
	write(KEYS.feedback, f);
}
var KEY = "bluedice.deviceId";
function getDeviceId() {
	if (typeof window === "undefined") return "ssr";
	let id = window.localStorage.getItem(KEY);
	if (!id) {
		id = crypto.randomUUID?.() ?? `dev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
		window.localStorage.setItem(KEY, id);
	}
	return id;
}
async function postToWebhook(event) {
	const url = getNotifPrefs().syncWebhookUrl?.trim();
	if (!url) return;
	try {
		await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				source: "blue-dice",
				deviceId: getDeviceId(),
				at: (/* @__PURE__ */ new Date()).toISOString(),
				...event
			}),
			keepalive: true
		});
	} catch {}
}
var forwardReminder = (r) => postToWebhook({
	type: "reminder.scheduled",
	reminder: r
});
//#endregion
export { hasVoted as a, saveFeedback as c, toggleVote as d, getVotes as i, setNotifPrefs as l, getNotifPrefs as n, joinWaitlist as o, getQueue as r, postToWebhook as s, forwardReminder as t, setQueue as u };
