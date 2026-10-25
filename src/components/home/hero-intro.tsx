"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

/** Staged entrance for hero copy. Each child is wrapped and revealed in sequence (~600ms total). */
export function HeroStage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }}
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      data-hero-item
      className={className}
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
      }}
    >
      {children}
    </motion.div>
  );
}
