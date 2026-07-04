import { n as getNotifPrefs, r as getQueue, t as forwardReminder, u as setQueue } from "./webhook-XOvR656d.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scheduler-Cs1sEp_B.js
var timers = /* @__PURE__ */ new Map();
var SHORT_WINDOW_MS = 360 * 60 * 1e3;
function inQuietHours(now) {
	const p = getNotifPrefs();
	if (!p.quietHoursStart || !p.quietHoursEnd) return false;
	const [sh, sm] = p.quietHoursStart.split(":").map(Number);
	const [eh, em] = p.quietHoursEnd.split(":").map(Number);
	const mins = now.getHours() * 60 + now.getMinutes();
	const start = sh * 60 + sm;
	const end = eh * 60 + em;
	return start <= end ? mins >= start && mins < end : mins >= start || mins < end;
}
function categoryAllowed(cat) {
	const p = getNotifPrefs();
	if (!p.enabled) return false;
	if (cat === "motivational") return p.motivational;
	if (cat === "work") return p.work;
	if (cat === "streak") return p.streak;
	if (cat === "reflection") return p.reflection;
	return true;
}
function fire(reminder) {
	if (typeof window === "undefined") return;
	if (!categoryAllowed(reminder.category)) return;
	if (inQuietHours(/* @__PURE__ */ new Date())) return;
	try {
		if ("Notification" in window && Notification.permission === "granted") {
			const n = new Notification(reminder.title, {
				body: reminder.body,
				icon: "/icon-192.png",
				tag: reminder.id,
				data: { url: reminder.url ?? "/" }
			});
			n.onclick = () => {
				window.focus();
				if (reminder.url) window.location.assign(reminder.url);
				n.close();
			};
		}
	} catch {}
	window.dispatchEvent(new CustomEvent("bluedice:reminder", { detail: reminder }));
}
function armTimer(r) {
	const delay = Math.max(0, r.fireAt - Date.now());
	if (delay > SHORT_WINDOW_MS) return;
	if (timers.has(r.id)) clearTimeout(timers.get(r.id));
	timers.set(r.id, setTimeout(() => {
		fire(r);
		timers.delete(r.id);
		const q = getQueue();
		if (r.repeatMs) {
			const next = {
				...r,
				fireAt: r.fireAt + r.repeatMs
			};
			setQueue([...q.filter((x) => x.id !== r.id), next]);
			armTimer(next);
		} else setQueue(q.filter((x) => x.id !== r.id));
	}, delay));
}
function scheduleReminder(r) {
	setQueue([...getQueue().filter((x) => x.id !== r.id), r]);
	armTimer(r);
	forwardReminder(r);
}
function cancelReminder(id) {
	clearTimeout(timers.get(id));
	timers.delete(id);
	setQueue(getQueue().filter((r) => r.id !== id));
}
function initScheduler() {
	if (typeof window === "undefined") return;
	const rearm = () => {
		const now = Date.now();
		const q = getQueue();
		const kept = [];
		for (const r of q) if (r.fireAt <= now) {
			if (r.repeatMs) {
				const missed = Math.ceil((now - r.fireAt) / r.repeatMs);
				const next = {
					...r,
					fireAt: r.fireAt + missed * r.repeatMs
				};
				kept.push(next);
				armTimer(next);
			}
		} else {
			kept.push(r);
			armTimer(r);
		}
		setQueue(kept);
	};
	rearm();
	window.addEventListener("visibilitychange", rearm);
	window.addEventListener("focus", rearm);
}
function makeId() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
//#endregion
export { scheduleReminder as i, initScheduler as n, makeId as r, cancelReminder as t };
