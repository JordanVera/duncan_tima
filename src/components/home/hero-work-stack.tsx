"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type StackItem = { slug: string; name: string; title: string; cover: ImageAsset };

/**
 * Layered arrangement of real project covers. GSAP owns only the
 * `[data-layer]` wrappers (scroll-scrubbed separation); nothing else
 * animates those elements. Disabled for reduced motion and small screens.
 */
export function HeroWorkStack({ items }: { items: [StackItem, StackItem, StackItem] }) {
  const root = useRef<HTMLDivElement>(null);
  const [front, left, right] = items;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom 35%",
            scrub: 0.6,
          },
        });
        tl.fromTo("[data-layer='left']", { xPercent: 14, yPercent: 10, rotate: 2.5 }, { xPercent: 0, yPercent: 0, rotate: -1.5 }, 0)
          .fromTo("[data-layer='right']", { xPercent: -14, yPercent: 12, rotate: -2.5 }, { xPercent: 0, yPercent: 0, rotate: 1.5 }, 0)
          .fromTo("[data-layer='front']", { yPercent: 10, scale: 0.94 }, { yPercent: -2, scale: 1 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      {/* Wide screens: layered composition */}
      <div className="relative hidden aspect-[16/9] overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface-1 md:block">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--border-strong)_1px,transparent_1px)] [background-size:22px_22px] opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        />
        <StackCard item={left} layer="left" className="left-[4%] top-[12%] w-[44%]" sizes="(min-width: 768px) 40vw, 1px" />
        <StackCard item={right} layer="right" className="right-[4%] top-[8%] w-[38%]" sizes="(min-width: 768px) 36vw, 1px" />
        <StackCard
          item={front}
          layer="front"
          className="left-1/2 top-[20%] z-10 w-[48%] -translate-x-1/2"
          sizes="(min-width: 768px) 46vw, 1px"
          preload
        />
      </div>

      {/* Small screens: simple stacked arrangement, no scroll effects */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        <StaticCard item={front} className="col-span-2" sizes="(min-width: 768px) 1px, 100vw" eager />
        <StaticCard item={left} sizes="50vw" />
        <StaticCard item={right} sizes="50vw" />
      </div>
    </div>
  );
}

function StackCard({
  item,
  layer,
  className,
  sizes,
  preload = false,
}: {
  item: StackItem;
  layer: "left" | "right" | "front";
  className?: string;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <div className={cn("absolute", className)}>
      <div data-layer={layer} className="will-change-transform">
        <Link
          href={`/projects/${item.slug}`}
          className="group block overflow-hidden rounded-[var(--radius-lg)] border border-line bg-media shadow-[0_30px_80px_-30px_rgb(0_0_0/0.55)]"
        >
          <span className="relative block" style={{ aspectRatio: `${item.cover.width} / ${item.cover.height}` }}>
            <Image
              src={item.cover.src}
              alt={item.cover.alt}
              fill
              sizes={sizes}
              preload={preload}
              loading="eager"
              quality={85}
              className="object-contain transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
            />
          </span>
          <span className="glass absolute bottom-3 left-3 flex items-center gap-2 rounded-full py-1.5 pl-3 pr-3.5 text-xs">
            <span className="font-medium text-fg">{item.name}</span>
            <span className="text-fg-muted">{item.title}</span>
          </span>
        </Link>
      </div>
    </div>
  );
}

function StaticCard({
  item,
  className,
  sizes,
  eager = false,
}: {
  item: StackItem;
  className?: string;
  sizes: string;
  eager?: boolean;
}) {
  return (
    <Link href={`/projects/${item.slug}`} className={cn("group block", className)}>
      <span
        className="relative block overflow-hidden rounded-[var(--radius-md)] border border-line bg-media"
        style={{ aspectRatio: `${item.cover.width} / ${item.cover.height}` }}
      >
        <Image
          src={item.cover.src}
          alt={item.cover.alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          className="object-contain"
        />
      </span>
      <span className="mt-2 flex flex-wrap items-baseline gap-x-2 text-sm">
        <span className="font-medium text-fg">{item.name}</span>
        <span className="text-fg-muted">{item.title}</span>
      </span>
    </Link>
  );
}
