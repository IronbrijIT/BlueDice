import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as LayoutGrid, O as Crown, v as Palette, y as Mic } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/preview._feature-9kyHKs5W.js
var FEATURES = {
	premium: {
		title: "Blue Dice Premium",
		tagline: "Deeper reflections, unlimited history, and more.",
		status: "Concept",
		description: "Unlock extended reflection lengths, personalized prompt libraries, unlimited history, custom themes, and priority access to new features. One low monthly price supports the app.",
		Icon: Crown
	},
	widgets: {
		title: "Home-screen widgets",
		tagline: "Today's reflection, right on your home screen.",
		status: "Designing",
		description: "Small and medium widgets showing your daily reflection, current streak, and work-hours progress ring. Tap-through opens the relevant screen.",
		Icon: LayoutGrid
	},
	themes: {
		title: "Themes",
		tagline: "Reflection tones that match your mood.",
		status: "In development",
		description: "Choose from calm palettes (Slate, Sage, Rose, Ocean) and pair them with different reflection tones — gentle, direct, poetic. Includes a true dark mode.",
		Icon: Palette
	},
	"voice-reading": {
		title: "Voice reading",
		tagline: "Hear your reflection out loud.",
		status: "Beta soon",
		description: "A soft-spoken narrator reads your reflection so you can close your eyes and just listen. Preview this today with the Play button on the Reflection screen.",
		Icon: Mic
	}
};
var $$splitComponentImporter = () => import("./preview._feature-YsF0pdnz.mjs");
var $$splitNotFoundComponentImporter = () => import("./preview._feature-CkXVZqoN.mjs");
var Route = createFileRoute("/preview/$feature")({
	head: ({ params }) => {
		const f = FEATURES[params.feature];
		return { meta: [{ title: `${f?.title ?? "Preview"} — Blue Dice` }, {
			name: "description",
			content: f?.tagline ?? "Feature preview."
		}] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	loader: ({ params }) => {
		if (!(params.feature in FEATURES)) throw notFound();
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as n, FEATURES as t };
