"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { SectionLink } from "@/lib/content";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

export function SectionIndex({ sections, label }: { sections: SectionLink[]; label: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label={label} className="sticky top-[calc(var(--nav-offset)+1rem)]">
      <p className="meta mb-4 text-fg-subtle">On this page</p>
      <ol className="flex flex-col border-l border-line">
        {sections.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="section-index-marker"
                  transition={spring}
                  className="absolute -left-px top-0 h-full w-px bg-fg"
                  aria-hidden
                />
              )}
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "flex gap-3 py-2 pl-4 text-sm transition-colors duration-200",
                  isActive ? "text-fg" : "text-fg-subtle hover:text-fg-muted",
                )}
              >
                <span className="meta pt-px">{String(i + 1).padStart(2, "0")}</span>
                <span>{s.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
