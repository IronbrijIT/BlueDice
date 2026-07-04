import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

type Props = HTMLMotionProps<"button"> & { children: ReactNode };

/**
 * Button-shaped tappable surface with subtle lift-on-hover and
 * press-scale feedback. Transform-only so it stays on the compositor.
 */
export const PressableCard = forwardRef<HTMLButtonElement, Props>(function PressableCard(
  { children, style, ...rest },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{ willChange: "transform", ...style }}
      {...rest}
    >
      {children}
    </motion.button>
  );
});