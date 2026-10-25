"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Logo } from "@/components/ui/logo";
import { navLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import { ThemeToggle } from "./theme-toggle";
import { projectStatus } from "./projects-disclosure";
import type { NavProject } from "./nav-bar";

const noopSubscribe = () => () => {};
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({
  projects,
  pathname,
  compact,
}: {
  projects: NavProject[];
  pathname: string;
  compact: boolean;
}) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const items = [...navLinks, { href: "/contact", label: "Contact" } as const];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className={cn(
          "glass pointer-events-auto inline-flex h-11 items-center gap-2.5 rounded-full pl-4 pr-3 text-sm font-medium text-fg lg:hidden",
          compact && "glass-strong",
        )}
      >
        Menu
        <span className="flex w-4 flex-col gap-[5px]" aria-hidden>
          <span className="h-px w-full bg-fg" />
          <span className="h-px w-2/3 self-end bg-fg" />
        </span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="mobile-menu"
                className="fixed inset-0 z-[60] lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: duration.fast } }}
                transition={{ duration: duration.base, ease: ease.out }}
              >
                <div className="absolute inset-0 bg-bg/40" aria-hidden onClick={close} />
                <motion.div
                  ref={dialogRef}
                  id="mobile-menu"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site menu"
                  initial={{ y: -16, opacity: 0.6 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: duration.base, ease: ease.out }}
                  className="glass glass-strong absolute inset-2 flex flex-col overflow-y-auto rounded-[1.75rem] sm:inset-3"
                >
                  <div className="flex items-center justify-between px-4 pt-3 sm:px-5">
                    <Link href="/" onClick={close} aria-label="Duncan Tima, home" className="-ml-1 rounded-xl p-1">
                      <Logo className="w-11" />
                    </Link>
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={close}
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-fg"
                    >
                      Close
                      <X className="size-4" strokeWidth={1.75} aria-hidden />
                    </button>
                  </div>

                  <nav aria-label="Mobile" className="px-4 pt-10 sm:px-5">
                    <ul className="flex flex-col">
                      {items.map((link, i) => {
                        const current = pathname === link.href || pathname.startsWith(`${link.href}/`);
                        return (
                          <motion.li
                            key={link.href}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: duration.slow, ease: ease.out, delay: 0.04 + i * 0.05 }}
                            className="border-b border-line"
                          >
                            <Link
                              href={link.href}
                              onClick={() => setOpen(false)}
                              aria-current={current ? "page" : undefined}
                              className="flex min-h-16 items-baseline gap-4 py-3"
                            >
                              <span className="meta w-6 text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                              <span
                                className={cn(
                                  "text-[2.25rem] font-medium leading-none tracking-[-0.04em]",
                                  current ? "text-fg" : "text-fg-muted",
                                )}
                              >
                                {link.label}
                              </span>
                              {current && <span className="ml-auto size-1.5 self-center rounded-full bg-fg" aria-hidden />}
                            </Link>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </nav>

                  <div className="px-4 pt-8 sm:px-5">
                    <p className="meta mb-3 text-fg-subtle">Selected projects</p>
                    <ul className="grid grid-cols-3 gap-2">
                      {projects.map((p) => {
                        const status = projectStatus(projects, pathname, p.slug);
                        return (
                          <li key={p.slug}>
                            <Link
                              href={`/projects/${p.slug}`}
                              onClick={() => setOpen(false)}
                              aria-current={status === "Viewing" ? "page" : undefined}
                              className="block rounded-2xl p-1 transition-colors hover:bg-surface-2"
                            >
                              <span className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-media">
                                <Image src={p.cover.src} alt="" fill sizes="33vw" className="object-cover object-left-top" />
                              </span>
                              <span className="mt-2 block px-1 text-sm font-medium text-fg">{p.name}</span>
                              <span className="block px-1 pb-1 text-xs text-fg-muted">{status ?? p.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="mt-auto flex flex-col gap-4 px-4 pb-5 pt-10 sm:px-5">
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="inline-flex h-14 items-center justify-between rounded-full bg-inverse px-6 text-base font-medium text-on-inverse"
                    >
                      Let’s talk
                      <ArrowUpRight className="size-5" strokeWidth={1.75} aria-hidden />
                    </Link>
                    <div className="flex items-center justify-between gap-4 text-sm text-fg-muted">
                      <div className="flex flex-col gap-1">
                        <a href={`mailto:${siteConfig.email}`} className="py-1 hover:text-fg">
                          {siteConfig.email}
                        </a>
                        <a href={siteConfig.phone.href} className="py-1 hover:text-fg">
                          {siteConfig.phone.display}
                        </a>
                      </div>
                      <ThemeToggle withLabel className="h-11 border border-line px-4" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
