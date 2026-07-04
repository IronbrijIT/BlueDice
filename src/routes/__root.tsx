import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { AuthProvider, useAuth } from "../hooks/useAuth";


import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { TabBar } from "../components/TabBar";
import diceIconUrl from "../assets/dice-icon.png";
import { initScheduler } from "../services/notifications/scheduler";
import { Toaster } from "../components/ui/sonner";
import { PageTransition } from "../components/motion/PageTransition";
import { initAssistant } from "../services/assistant/scheduler";
import { useAssistantEvents } from "../hooks/useAssistantEvents";
import { AssistantBanner } from "../components/AssistantBanner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1",
      },
      { title: "Blue Dice — Roll for today's reflection" },
      {
        name: "description",
        content:
          "A calm, elegant app for daily reflection. Roll the dice, receive a thoughtful message, affirmation, and journal prompt.",
      },
      { name: "theme-color", content: "#ffffff" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Blue Dice" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { property: "og:title", content: "Blue Dice — Roll for today's reflection" },
      {
        property: "og:description",
        content:
          "Blue Dice Reflections is a mobile app that provides daily AI-generated reflections and prompts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Blue Dice — Roll for today's reflection" },
      {
        name: "description",
        content:
          "Blue Dice Reflections is a mobile app that provides daily AI-generated reflections and prompts.",
      },
      {
        name: "twitter:description",
        content:
          "Blue Dice Reflections is a mobile app that provides daily AI-generated reflections and prompts.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9705f5e6-9b7b-4f37-b4e4-683abbeb08db/id-preview-a548fa9d--17b75f1b-026b-49a3-a219-38c1c9779bd0.lovable.app-1782872054686.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9705f5e6-9b7b-4f37-b4e4-683abbeb08db/id-preview-a548fa9d--17b75f1b-026b-49a3-a219-38c1c9779bd0.lovable.app-1782872054686.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: diceIconUrl, type: "image/png" },
      { rel: "apple-touch-icon", href: diceIconUrl },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AuthGuard({ children }: { children: ReactNode }) {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (loading) return;

    if (!user) {
      if (pathname !== "/login") {
        navigate({ to: "/login" });
      }
    } else {
      if (!profile || !profile.name) {
        if (pathname !== "/onboarding") {
          navigate({ to: "/onboarding" });
        }
      } else {
        if (pathname === "/login" || pathname === "/onboarding") {
          navigate({ to: "/" });
        }
      }
    }
  }, [user, profile, loading, pathname, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Loading Blue Dice...</p>
        </div>
      </div>
    );
  }

  const hideTabBar = pathname === "/login" || pathname === "/onboarding";

  return (
    <div className="min-h-screen bg-background">
      {children}
      {!hideTabBar && <TabBar />}
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { reminder, dismiss } = useAssistantEvents();
  useEffect(() => {
    initScheduler();
    initAssistant();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthGuard>
          <AssistantBanner reminder={reminder} onDismiss={dismiss} />
          <PageTransition>
            <Outlet />
          </PageTransition>
          <Toaster position="top-center" />
        </AuthGuard>
      </AuthProvider>
    </QueryClientProvider>
  );
}
