import { createFileRoute, notFound } from "@tanstack/react-router";
import { Crown, LayoutGrid, Palette, Mic } from "lucide-react";
import { PreviewPage } from "../components/PreviewPage";

const FEATURES = {
  premium: {
    title: "Blue Dice Premium",
    tagline: "Deeper reflections, unlimited history, and more.",
    status: "Concept" as const,
    description:
      "Unlock extended reflection lengths, personalized prompt libraries, unlimited history, custom themes, and priority access to new features. One low monthly price supports the app.",
    Icon: Crown,
  },
  widgets: {
    title: "Home-screen widgets",
    tagline: "Today's reflection, right on your home screen.",
    status: "Designing" as const,
    description:
      "Small and medium widgets showing your daily reflection, current streak, and work-hours progress ring. Tap-through opens the relevant screen.",
    Icon: LayoutGrid,
  },
  themes: {
    title: "Themes",
    tagline: "Reflection tones that match your mood.",
    status: "In development" as const,
    description:
      "Choose from calm palettes (Slate, Sage, Rose, Ocean) and pair them with different reflection tones — gentle, direct, poetic. Includes a true dark mode.",
    Icon: Palette,
  },
  "voice-reading": {
    title: "Voice reading",
    tagline: "Hear your reflection out loud.",
    status: "Beta soon" as const,
    description:
      "A soft-spoken narrator reads your reflection so you can close your eyes and just listen. Preview this today with the Play button on the Reflection screen.",
    Icon: Mic,
  },
} as const;

export const Route = createFileRoute("/preview/$feature")({
  head: ({ params }) => {
    const f = FEATURES[params.feature as keyof typeof FEATURES];
    return {
      meta: [
        { title: `${f?.title ?? "Preview"} — Blue Dice` },
        { name: "description", content: f?.tagline ?? "Feature preview." },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="p-8 text-center text-muted-foreground">Feature not found.</div>
  ),
  loader: ({ params }) => {
    if (!(params.feature in FEATURES)) throw notFound();
  },
  component: FeaturePreview,
});

function FeaturePreview() {
  const { feature } = Route.useParams();
  const f = FEATURES[feature as keyof typeof FEATURES];
  return (
    <PreviewPage
      featureId={feature}
      title={f.title}
      tagline={f.tagline}
      description={f.description}
      status={f.status}
      Icon={f.Icon}
    />
  );
}
