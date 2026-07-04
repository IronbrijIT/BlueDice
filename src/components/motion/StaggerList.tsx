import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
};

type ListProps = HTMLMotionProps<"div"> & { children: ReactNode };

export function StaggerList({ children, ...rest }: ListProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={reduced ? undefined : containerVariants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type ItemProps = HTMLMotionProps<"div"> & { children: ReactNode };

export function StaggerItem({ children, ...rest }: ItemProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div variants={reduced ? undefined : itemVariants} {...rest}>
      {children}
    </motion.div>
  );
}