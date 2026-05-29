"use client";

import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// AnimatePresence requires a client component to read the pathname and key
// the motion.div. mode="wait" ensures the exit completes before the entrance
// starts, preventing two pages from being visible simultaneously.
// Per ADR-004: ≤100 ms per phase so total transition is imperceptible.

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <>{children}</>;
  }

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.08 } }}
          exit={{ opacity: 0, transition: { duration: 0.05 } }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
