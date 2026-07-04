import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

export function PageShell({ title, subtitle, children }: Props) {
  return (
    <main
      className="mx-auto min-h-screen w-full max-w-xl px-5 pt-8"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 92px)" }}
    >
      {title ? (
        <motion.header
          className="mb-6"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[28px] font-semibold text-foreground">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </motion.header>
      ) : null}
      {children}
    </main>
  );
}
