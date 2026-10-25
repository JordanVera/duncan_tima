"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Opening scene: scattered interface fragments resolve onto the layout grid
 * while the headline arrives. The copy is passed in as children so it stays
 * server-rendered.
 *
 * Initial hidden states live in globals.css (`[data-hero-clarity]`) so nothing
 * flashes before hydration. Each layer is owned by exactly one animation:
 * `[data-frag]`/`[data-noise]`/`[data-guide]` by the intro, `[data-layer]`
 * wrappers by scroll and pointer.
 */
export function HeroClarity({ children, className }: { children: React.ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from(q("[data-hero-item], [data-hero-line], [data-frag], [data-guide]"), {
          opacity: 0,
          duration: 0.6,
          ease: "power1.out",
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const frags = q("[data-frag]");
        const noise = q("[data-noise]");
        const cursor = q("[data-cursor]");
        const chaos = (el: HTMLElement, axis: number) => Number(el.dataset.chaos?.split(",")[axis] ?? 0);

        gsap.set(frags, {
          x: (_: number, el: HTMLElement) => chaos(el, 0),
          y: (_: number, el: HTMLElement) => chaos(el, 1),
          rotation: (_: number, el: HTMLElement) => chaos(el, 2),
        });

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        // Chaos: everything lands at once, slightly wrong.
        tl.fromTo(
          frags,
          { opacity: 0, scale: 0.86 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", stagger: { each: 0.05, from: "random" } },
          0,
        )
          .fromTo(
            noise,
            { opacity: 0, scale: 0.7 },
            { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2.4)", stagger: { each: 0.045, from: "random" } },
            0.05,
          )
          .fromTo(cursor, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.25)
          .to(
            frags,
            {
              x: "+=random(-16, 16)",
              y: "+=random(-12, 12)",
              rotation: "+=random(-3, 3)",
              duration: 0.55,
              ease: "sine.inOut",
            },
            0.4,
          )
          .to(cursor, { scale: 0.82, duration: 0.12, ease: "power2.out", yoyo: true, repeat: 1 }, 0.82)

          // Resolve: noise clears out, structure snaps onto the grid.
          .to(
            noise,
            {
              opacity: 0,
              scale: 0.94,
              y: 14,
              filter: "blur(6px)",
              duration: 0.45,
              ease: "power2.in",
              stagger: { each: 0.03, from: "random" },
            },
            0.95,
          )
          .to(frags, { x: 0, y: 0, rotation: 0, duration: 1.05, ease: "expo.inOut", stagger: 0.045 }, 1.0)
          .fromTo(
            q("[data-guide]"),
            { opacity: 1, scaleY: 0 },
            { scaleY: 1, duration: 1.4, ease: "expo.inOut", stagger: { each: 0.035, from: "center" } },
            0.7,
          )
          .to(cursor, { opacity: 0, duration: 0.35, ease: "power1.out" }, 2.05)

          // Copy: complexity is stated first, clarity comes into focus as the grid settles.
          .fromTo(q("[data-hero-item='meta']"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8 }, 0.15)
          .fromTo(q("[data-hero-line='complex']"), { opacity: 1, yPercent: 110 }, { yPercent: 0, duration: 1.1 }, 0.3)
          .fromTo(
            q("[data-hero-line='clear']"),
            { opacity: 0, yPercent: 16, scale: 1.03, filter: "blur(18px)" },
            {
              opacity: 1,
              yPercent: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.25,
              ease: "power3.out",
              transformOrigin: "left center",
              clearProps: "filter",
            },
            1.35,
          )
          .fromTo(
            q("[data-hero-item='lead'], [data-hero-item='actions']"),
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
            1.7,
          );

        // Scroll: the blueprint lifts away and the grid stretches toward the work below.
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: root.current, start: 0, end: "bottom top", scrub: 0.6 },
          })
          .to(q("[data-layer='structure']"), { yPercent: -18, opacity: 0 }, 0)
          .to(q("[data-layer='guides']"), { scaleY: 1.35, opacity: 0.35 }, 0)
          .to(q("[data-layer='copy']"), { y: -56 }, 0);
      });

      mm.add(
        "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = root.current;
          const target = q("[data-layer='pointer']")[0];
          if (!el || !target) return;
          const xTo = gsap.quickTo(target, "x", { duration: 1.2, ease: "power3" });
          const yTo = gsap.quickTo(target, "y", { duration: 1.2, ease: "power3" });

          const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo(((e.clientX - r.left) / r.width - 0.5) * -28);
            yTo(((e.clientY - r.top) / r.height - 0.5) * -18);
          };
          el.addEventListener("pointermove", onMove);
          return () => el.removeEventListener("pointermove", onMove);
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} data-hero-clarity className="relative isolate">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 select-none">
        <Guides />
        <div data-layer="structure" className="absolute inset-0 hidden lg:block">
          <div data-layer="pointer" className="absolute inset-0">
            <Structure />
            <Noise />
          </div>
        </div>
      </div>

      <div data-layer="copy" className={className}>
        {children}
      </div>
    </div>
  );
}

function Guides() {
  return (
    <div
      data-layer="guides"
      className="absolute inset-0 origin-top [mask-image:linear-gradient(to_bottom,black_20%,transparent_95%)]"
    >
      <div className="container-site h-full">
        <div className="grid h-full grid-cols-4 gap-5 lg:grid-cols-12 lg:gap-10">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              data-guide
              className={cn("block h-full origin-top border-x border-line bg-fg/[0.018]", i >= 4 && "hidden lg:block")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Frag({ chaos, className, children }: { chaos: string; className?: string; children: React.ReactNode }) {
  return (
    <div data-frag data-chaos={chaos} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

const wire = "rounded-[var(--radius-sm)] border border-line-strong bg-surface-1/70";
const bar = "rounded-full bg-fg/[0.09]";

/** The resolved state: a calm wireframe sitting on the same 12-column grid as the copy. */
function Structure() {
  return (
    <div className="container-site h-full pb-20 pt-8">
      <div className="grid h-full grid-cols-12 grid-rows-12 gap-x-10 gap-y-4">
        <Frag chaos="380,220,16" className="col-span-3 col-start-1 row-start-1 self-center">
          <span className="meta text-fg-subtle">01 — Structure</span>
        </Frag>

        <Frag chaos="-340,180,-12" className="col-span-7 col-start-6 row-start-1 self-center">
          <div className={cn(wire, "flex h-11 items-center gap-4 px-4")}>
            <span className="size-2.5 rounded-full bg-fg/25" />
            <span className={cn(bar, "h-1.5 w-14")} />
            <span className={cn(bar, "h-1.5 w-10")} />
            <span className={cn(bar, "h-1.5 w-12")} />
            <span className="ml-auto h-5 w-16 rounded-full border border-line-strong" />
          </div>
        </Frag>

        <Frag chaos="260,150,14" className="relative col-span-3 col-start-6 row-span-3 row-start-2">
          <div className={cn(wire, "flex h-full flex-col gap-3 p-3")}>
            <span className="relative flex-1 overflow-hidden rounded-[calc(var(--radius-sm)-4px)] bg-fg/[0.05]">
              <svg className="absolute inset-0 size-full text-line-strong" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0 0L100 100M100 0L0 100" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>
            <span className={cn(bar, "h-1.5 w-3/4")} />
            <span className={cn(bar, "h-1.5 w-1/2")} />
          </div>
          <span data-cursor className="absolute -bottom-3 right-6 text-fg">
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path d="M1 1l15 7.5-6.6 1.9L6.4 18 1 1z" fill="currentColor" stroke="var(--bg)" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </span>
        </Frag>

        <Frag chaos="-420,40,-18" className="col-span-2 col-start-9 row-span-3 row-start-2">
          <div className={cn(wire, "flex h-full items-end gap-1.5 p-3")}>
            {[38, 62, 48, 84, 56, 72].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-[3px] bg-fg/[0.1]" style={{ height: `${h}%` }} />
            ))}
          </div>
        </Frag>

        <Frag chaos="-160,240,9" className="col-span-2 col-start-11 row-span-3 row-start-2">
          <div className={cn(wire, "flex h-full flex-col justify-center gap-3 p-3")}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="size-3 shrink-0 rounded-[3px] border border-line-strong" />
                <span className={cn(bar, "h-1.5", i % 2 ? "w-2/3" : "w-full")} />
              </span>
            ))}
          </div>
        </Frag>

        <Frag chaos="-520,-20,22" className="col-span-2 col-start-6 row-start-5 self-center">
          <div className="flex h-9 items-center justify-center rounded-full bg-fg/[0.12]">
            <span className="h-1.5 w-12 rounded-full bg-fg/30" />
          </div>
        </Frag>

        <Frag chaos="180,-60,-28" className="col-span-1 col-start-8 row-start-5 self-center">
          <div className="flex h-6 w-11 items-center rounded-full border border-line-strong p-0.5">
            <span className="ml-auto size-4.5 rounded-full bg-fg/30" />
          </div>
        </Frag>

        <Frag chaos="120,170,-8" className="col-span-2 col-start-9 row-start-5 self-center">
          <span className="meta text-fg-subtle">8pt · 12 col</span>
        </Frag>

        <Frag chaos="-300,120,11" className="col-span-2 col-start-11 row-start-5 self-center justify-self-end">
          <span className="meta text-fg-subtle">Aa 96 / −4.5%</span>
        </Frag>
      </div>
    </div>
  );
}

function Scrap({ className, rotate, children }: { className?: string; rotate: number; children: React.ReactNode }) {
  return (
    <div data-noise className={cn("absolute", className)} style={{ rotate: `${rotate}deg` }}>
      {children}
    </div>
  );
}

/** Chaos-only clutter. Never visible once the intro finishes. */
function Noise() {
  return (
    <div className="container-site absolute inset-0">
      <div className="relative h-full">
        <Scrap className="left-[3%] top-[14%]" rotate={-7}>
          <span className="block rounded-[var(--radius-sm)] bg-surface-3 px-3 py-2.5 text-xs text-fg shadow-[var(--shadow-float)]">
            v3_final_FINAL(2).fig
          </span>
        </Scrap>
        <Scrap className="left-[33%] top-[6%]" rotate={4}>
          <span className="meta flex items-center gap-1.5 rounded-full border border-danger/50 px-2.5 py-1 text-danger">
            <span className="size-1.5 rounded-full bg-danger" /> 12 issues
          </span>
        </Scrap>
        <Scrap className="left-[20%] top-[36%]" rotate={-3}>
          <span className="glass block rounded-[var(--radius-sm)] px-3 py-2 text-xs text-fg-muted">
            where does this go?
          </span>
        </Scrap>
        <Scrap className="left-[45%] top-[28%]" rotate={6}>
          <span className="flex items-center gap-1.5">
            <span className="size-6 rounded-md border border-line bg-surface-2" />
            <span className="size-6 rounded-md border border-line bg-surface-3" />
            <span className="meta text-fg-subtle">same?</span>
          </span>
        </Scrap>
        <Scrap className="left-[50%] top-[14%]" rotate={8}>
          <span className="block h-28 w-56 rounded-[var(--radius-md)] border border-dashed border-danger/60" />
        </Scrap>
        <Scrap className="left-[58%] top-[3%]" rotate={-2}>
          <span className="meta text-fg-muted">TODO: fix spacing</span>
        </Scrap>
        <Scrap className="left-[68%] top-[50%]" rotate={-5}>
          <span className="block max-w-40 text-sm leading-snug text-fg-subtle">Lorem ipsum dolor sit amet, consectetur</span>
        </Scrap>
        <Scrap className="left-[84%] top-[42%]" rotate={10}>
          <span className="meta rounded border border-line-strong px-1.5 py-0.5 text-fg-muted">z-index: 9999</span>
        </Scrap>
        <Scrap className="left-[10%] top-[48%]" rotate={-4}>
          <span className="meta flex items-center gap-2 text-danger">
            <span className="h-px w-10 bg-danger" /> 13px ≠ 16px
          </span>
        </Scrap>
        <Scrap className="left-[26%] top-[18%]" rotate={0}>
          <svg width="340" height="120" viewBox="0 0 340 120" fill="none" className="text-danger/70">
            <path
              d="M4 96C60 20 110 118 170 58S280 6 336 40"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="5 6"
              strokeLinecap="round"
            />
            <circle cx="336" cy="40" r="3.5" fill="currentColor" />
          </svg>
        </Scrap>
      </div>
    </div>
  );
}
