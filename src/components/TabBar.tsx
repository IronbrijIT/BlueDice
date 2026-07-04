import { Link, useRouterState } from "@tanstack/react-router";
import { motion, LayoutGroup } from "framer-motion";
import { Home, Clock, Heart, User } from "lucide-react";
import { useHaptics } from "../hooks/useLocalStore";

const TABS = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/history", label: "History", Icon: Clock },
  { to: "/favorites", label: "Saved", Icon: Heart },
  { to: "/profile", label: "Profile", Icon: User },
] as const;

export function TabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const haptic = useHaptics();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <LayoutGroup id="tabbar">
        <ul className="mx-auto flex max-w-xl items-stretch justify-around px-2 py-2">
          {TABS.map(({ to, label, Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <li key={to} className="flex-1">
                <Link
                  to={to}
                  onClick={() => haptic(6)}
                  className={`relative flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium outline-none transition-colors ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="tab-indicator"
                      className="absolute inset-x-2 inset-y-1 rounded-xl bg-primary/10"
                      transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.6 }}
                      aria-hidden
                    />
                  ) : null}
                  <motion.span
                    className="relative z-10"
                    animate={{ scale: active ? 1.08 : 1, y: active ? -1 : 0 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 500, damping: 26 }}
                    style={{ willChange: "transform" }}
                  >
                    <Icon className={`h-5 w-5 ${active ? "" : "opacity-80"}`} />
                  </motion.span>
                  <span className="relative z-10">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </LayoutGroup>
    </nav>
  );
}
