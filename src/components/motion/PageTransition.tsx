import { AnimatePresence, motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Props = { children: ReactNode };

/**
 * Wraps route content in an AnimatePresence keyed by pathname so every
 * navigation gets a calm fade + 8px upward slide. Uses transform+opacity
 * only so it stays on the GPU compositor at 60fps.
 */
export function PageTransition({ children }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
        transition={{ duration: reduced ? 0.12 : 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}