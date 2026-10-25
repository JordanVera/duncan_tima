"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import type { NavProject } from "./nav-bar";

export function projectStatus(projects: NavProject[], pathname: string, slug: string) {
  const index = projects.findIndex((p) => pathname === `/projects/${p.slug}`);
  if (index === -1) return null;
  if (projects[index].slug === slug) return "Viewing";
  if (projects[(index + 1) % projects.length].slug === slug) return "Next";
  return null;
}

export function ProjectsDisclosure({
  projects,
  pathname,
  onHover,
}: {
  projects: NavProject[];
  pathname: string;
  onHover: () => void;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Hide project previews" : "Show project previews"}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={onHover}
        onFocus={onHover}
        className="relative mr-1 flex size-8 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-fg"
      >
        <ChevronDown
          className={cn("size-4 transition-transform duration-300 ease-out-expo", open && "rotate-180")}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: duration.fast } }}
            transition={{ duration: duration.base, ease: ease.out }}
            style={{ transformOrigin: "top center" }}
            className="glass glass-strong absolute left-1/2 top-[calc(100%+0.9rem)] w-[26rem] -translate-x-1/2 rounded-3xl p-2"
          >
            <p className="meta px-3 pb-2 pt-2 text-fg-subtle">Selected projects</p>
            <ul className="flex flex-col gap-1">
              {projects.map((p) => {
                const status = projectStatus(projects, pathname, p.slug);
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      onClick={() => setOpen(false)}
                      aria-label={`${p.name}, ${p.title}${status === "Next" ? " (next project)" : ""}`}
                      aria-current={status === "Viewing" ? "page" : undefined}
                      className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-surface-2 focus-visible:bg-surface-2"
                    >
                      <span className="relative block aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl bg-media">
                        <Image
                          src={p.cover.src}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover object-left-top transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]"
                        />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="meta text-fg-subtle">{p.number}</span>
                        <span className="text-[0.95rem] font-medium text-fg">{p.name}</span>
                        <span className="truncate text-sm text-fg-muted">{p.title}</span>
                      </span>
                      {status && (
                        <span className="meta mr-2 rounded-full border border-line px-2 py-1 text-fg-muted">{status}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/projects"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-between rounded-2xl px-3 py-3 text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              View the project index
              <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
