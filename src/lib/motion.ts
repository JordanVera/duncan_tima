import type { Transition, Variants } from "framer-motion";

/** Mirrors the CSS motion tokens in globals.css. */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const duration = {
  fast: 0.16,
  base: 0.28,
  slow: 0.56,
};

export const spring: Transition = { type: "spring", stiffness: 420, damping: 38, mass: 0.8 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
};

export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: step, delayChildren: delay } },
});
