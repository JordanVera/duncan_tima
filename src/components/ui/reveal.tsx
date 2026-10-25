"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

/**
 * Subtle in-view reveal for media. Content is visible without JavaScript
 * (see the noscript rule in the root layout) and under reduced motion
 * only the opacity changes.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "figure";
}) {
  const Component = motion[as];
  return (
    <Component
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: ease.out, delay }}
    >
      {children}
    </Component>
  );
}
