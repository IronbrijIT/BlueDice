import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Props = {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  duration?: number;
};

/**
 * Smoothly tweens a numeric display value from its previous render to the
 * next. Uses a MotionValue so React doesn't re-render every frame.
 */
export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  className,
  duration = 0.7,
}: Props) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(value);
  const rounded = useTransform(mv, (v) => `${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (reduced) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [value, duration, reduced, mv]);

  return <motion.span className={className}>{rounded}</motion.span>;
}