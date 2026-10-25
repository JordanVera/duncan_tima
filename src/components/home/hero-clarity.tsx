'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/cn';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Opening scene: scattered interface fragments resolve into a product UI
 * while the headline arrives. The copy is passed in as children so it stays
 * server-rendered.
 *
 * Initial hidden states live in globals.css (`[data-hero-clarity]`) so nothing
 * flashes before hydration. Each element is owned by one animation:
 * `[data-frag]`/`[data-noise]`/`[data-guide]`/`[data-glow]` by the intro,
 * their inner details (bars, rings, lines, counters) by the intro then ambient
 * loops, and `[data-layer]` wrappers by scroll and pointer.
 */
export function HeroClarity({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from(
          q(
            '[data-hero-item], [data-hero-line], [data-frag], [data-guide], [data-glow]',
          ),
          { opacity: 0, duration: 0.6, ease: 'power1.out' },
        );
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const frags = q('[data-frag]');
        const noise = q('[data-noise]');
        const cursor = q('[data-cursor]');
        const bars = q('[data-bar]');
        const spread = window.matchMedia('(min-width: 1024px)').matches
          ? 1
          : 0.5;
        const chaos = (el: HTMLElement, axis: number) =>
          Number(el.dataset.chaos?.split(',')[axis] ?? 0) *
          (axis < 2 ? spread : 1);

        gsap.set(frags, {
          x: (_: number, el: HTMLElement) => chaos(el, 0),
          y: (_: number, el: HTMLElement) => chaos(el, 1),
          rotation: (_: number, el: HTMLElement) => chaos(el, 2),
        });

        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        // Chaos: everything lands at once, slightly wrong.
        tl.fromTo(
          frags,
          { opacity: 0, scale: 0.86 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            stagger: { each: 0.035, from: 'random' },
          },
          0,
        )
          .fromTo(
            noise,
            { opacity: 0, scale: 0.7 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              ease: 'back.out(2.4)',
              stagger: { each: 0.045, from: 'random' },
            },
            0.05,
          )
          .fromTo(cursor, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.25)
          .to(
            frags,
            {
              x: '+=random(-16, 16)',
              y: '+=random(-12, 12)',
              rotation: '+=random(-3, 3)',
              duration: 0.55,
              ease: 'sine.inOut',
            },
            0.4,
          )
          .to(
            cursor,
            {
              scale: 0.82,
              duration: 0.12,
              ease: 'power2.out',
              yoyo: true,
              repeat: 1,
            },
            0.82,
          )

          // Resolve: noise clears out, structure snaps into place, data arrives.
          .to(
            noise,
            {
              opacity: 0,
              scale: 0.94,
              y: 14,
              filter: 'blur(6px)',
              duration: 0.45,
              ease: 'power2.in',
              stagger: { each: 0.03, from: 'random' },
            },
            0.95,
          )
          .to(
            frags,
            {
              x: 0,
              y: 0,
              rotation: 0,
              duration: 1.05,
              ease: 'expo.inOut',
              stagger: 0.03,
            },
            1.0,
          )
          .fromTo(
            q('[data-guide]'),
            { opacity: 1, scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.4,
              ease: 'expo.inOut',
              stagger: { each: 0.035, from: 'center' },
            },
            0.7,
          )
          .fromTo(
            q('[data-glow]'),
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' },
            1.2,
          )
          .fromTo(
            bars,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.9,
              stagger: 0.04,
              transformOrigin: 'bottom',
            },
            1.5,
          )
          .fromTo(
            q('[data-ring]'),
            { strokeDasharray: '0 100' },
            {
              strokeDasharray: (_: number, el: SVGElement) =>
                `${el.dataset.len} 100`,
              duration: 1.1,
              ease: 'power3.inOut',
              stagger: 0.18,
            },
            1.6,
          )
          .fromTo(
            q('[data-spark]'),
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' },
            1.55,
          )
          .fromTo(
            q('[data-area]'),
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power1.out' },
            1.9,
          )
          .fromTo(
            q('[data-selection]'),
            { opacity: 0, scale: 1.06 },
            { opacity: 1, scale: 1, duration: 0.6 },
            1.95,
          )
          .fromTo(
            q('[data-pop]'),
            { opacity: 0, scale: 0.9, y: 6 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: 'back.out(2)',
              stagger: 0.15,
            },
            2.2,
          )
          .to(cursor, { opacity: 0, duration: 0.35, ease: 'power1.out' }, 2.15)

          // Copy: complexity is stated first, clarity comes into focus as the grid settles.
          .fromTo(
            q("[data-hero-item='meta']"),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.15,
          )
          .fromTo(
            q("[data-hero-line='complex']"),
            { opacity: 1, yPercent: 110 },
            { yPercent: 0, duration: 1.1 },
            0.3,
          )
          .fromTo(
            q("[data-hero-line='clear']"),
            { opacity: 0, yPercent: 16, scale: 1.03, filter: 'blur(18px)' },
            {
              opacity: 1,
              yPercent: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.25,
              ease: 'power3.out',
              transformOrigin: 'left center',
              clearProps: 'filter',
            },
            1.35,
          )
          .fromTo(
            q("[data-hero-item='lead'], [data-hero-item='actions']"),
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
            1.7,
          );

        q('[data-count]').forEach((el) => {
          const to = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals ?? 0);
          const suffix = el.dataset.suffix ?? '';
          const value = { v: 0 };
          tl.to(
            value,
            {
              v: to,
              duration: 1.5,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent =
                  value.v.toLocaleString('en-US', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                  }) + suffix;
              },
            },
            1.3,
          );
        });

        // Ambient: once settled, the interface keeps quietly working.
        bars.forEach((bar, i) => {
          gsap.to(bar, {
            scaleY: 'random(0.45, 1)',
            duration: gsap.utils.random(1.2, 2),
            ease: 'sine.inOut',
            repeat: -1,
            repeatRefresh: true,
            delay: 2.6 + i * 0.12,
          });
        });
        gsap.to(q('[data-caret]'), {
          opacity: 0,
          duration: 0.55,
          ease: 'steps(1)',
          repeat: -1,
          yoyo: true,
          delay: 2,
        });

        // Scroll: the interface lifts away and the grid stretches toward the work below.
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root.current,
              start: 0,
              end: 'bottom top',
              scrub: 0.6,
            },
          })
          .to(q("[data-layer='structure']"), { yPercent: -14, opacity: 0 }, 0)
          .to(q("[data-layer='guides']"), { scaleY: 1.35, opacity: 0.35 }, 0)
          .to(q("[data-layer='copy']"), { y: -56 }, 0);
      });

      mm.add(
        '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const el = root.current;
          const target = q("[data-layer='pointer']")[0];
          const tilt = q("[data-layer='tilt']")[0];
          if (!el || !target || !tilt) return;

          gsap.set(tilt, {
            transformPerspective: 2200,
            transformOrigin: '50% 100%',
            rotationX: 4,
          });
          const xTo = gsap.quickTo(target, 'x', {
            duration: 1.2,
            ease: 'power3',
          });
          const yTo = gsap.quickTo(target, 'y', {
            duration: 1.2,
            ease: 'power3',
          });
          const ryTo = gsap.quickTo(tilt, 'rotationY', {
            duration: 1.4,
            ease: 'power3',
          });
          const rxTo = gsap.quickTo(tilt, 'rotationX', {
            duration: 1.4,
            ease: 'power3',
          });

          const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            xTo(nx * -20);
            yTo(ny * -12);
            ryTo(nx * 4);
            rxTo(4 - ny * 3);
          };
          el.addEventListener('pointermove', onMove);
          return () => el.removeEventListener('pointermove', onMove);
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-hero-clarity
      className="relative isolate flex flex-col overflow-x-clip lg:min-h-[calc(100svh-var(--nav-offset))]"
    >
      <Guides />

      <div
        aria-hidden
        data-layer="structure"
        className="pointer-events-none relative h-[25rem] select-none sm:h-[28rem] lg:h-auto lg:min-h-[26rem] lg:flex-1"
      >
        <Glow />
        <div data-layer="pointer" className="absolute inset-0">
          <MobileStructure />
          <Dashboard />
          <Noise />
        </div>
      </div>

      <div data-layer="copy" className={cn('relative', className)}>
        {children}
      </div>
    </div>
  );
}

function Guides() {
  return (
    <div
      aria-hidden
      data-layer="guides"
      className="pointer-events-none absolute inset-0 -z-10 origin-top [mask-image:linear-gradient(to_bottom,black_25%,transparent_95%)]"
    >
      <div className="container-site h-full">
        <div className="grid h-full grid-cols-4 gap-5 lg:grid-cols-12 lg:gap-10">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              data-guide
              className={cn(
                'block h-full origin-top border-x border-line bg-fg/[0.018]',
                i >= 4 && 'hidden lg:block',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Glow() {
  return (
    <div data-glow className="absolute inset-0 -z-10">
      <span className="absolute right-[2%] top-[4%] size-[18rem] rounded-full bg-accent/20 blur-[80px] lg:right-[6%] lg:size-[34rem] lg:blur-[120px]" />
      <span className="absolute left-[6%] top-[38%] size-[14rem] rounded-full bg-accent-2/15 blur-[80px] lg:left-[14%] lg:top-[30%] lg:size-[28rem] lg:blur-[120px]" />
    </div>
  );
}

function Frag({
  chaos,
  className,
  children,
}: {
  chaos: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-frag
      data-chaos={chaos}
      className={cn('will-change-transform', className)}
    >
      {children}
    </div>
  );
}

const wire =
  'rounded-[var(--radius-sm)] border border-line-strong bg-surface-1/80';
const panel =
  'rounded-[var(--radius-md)] border border-line bg-bg/60 shadow-[0_1px_0_rgb(255_255_255/0.03)_inset]';
const bar = 'rounded-full bg-fg/[0.1]';

const tones = {
  accent: 'bg-accent/15 text-accent',
  violet: 'bg-accent-2/15 text-accent-2',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-danger/15 text-danger',
} as const;

type Tone = keyof typeof tones;

/** Smooth path through 0–100 values, scaled to a w×h box (y grows downward). */
function smoothPath(values: number[], w: number, h: number) {
  const pts = values.map(
    (v, i) => [(i / (values.length - 1)) * w, h - (v / 100) * h] as const,
  );
  return pts.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x} ${y}`;
    const [px, py] = pts[i - 1];
    const mx = (px + x) / 2;
    return `${d} C${mx} ${py} ${mx} ${y} ${x} ${y}`;
  }, '');
}

function Selection({ label }: { label?: string }) {
  return (
    <span
      data-selection
      className="absolute -inset-1.5 rounded-[calc(var(--radius-md)+4px)] border border-accent"
    >
      {[
        '-left-1 -top-1',
        '-right-1 -top-1',
        '-bottom-1 -left-1',
        '-bottom-1 -right-1',
      ].map((pos) => (
        <span
          key={pos}
          className={cn(
            'absolute size-2 rounded-[2px] border border-accent bg-bg',
            pos,
          )}
        />
      ))}
      {label && (
        <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-accent px-1.5 py-0.5 font-mono text-[10px] leading-none text-white">
          {label}
        </span>
      )}
    </span>
  );
}

function Cursor({ className }: { className?: string }) {
  return (
    <span
      data-cursor
      className={cn('absolute z-10 flex items-start gap-1', className)}
    >
      <svg
        width="16"
        height="18"
        viewBox="0 0 18 20"
        fill="none"
        className="text-accent-2"
      >
        <path
          d="M1 1l15 7.5-6.6 1.9L6.4 18 1 1z"
          fill="currentColor"
          stroke="var(--bg)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="mt-3 rounded-full bg-accent-2 px-2 py-0.5 text-[10px] font-medium leading-tight text-white">
        Duncan
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------
   Desktop: a full operations dashboard inside an app window.
------------------------------------------------------------------------- */

const KPIS: {
  label: string;
  count: number;
  decimals?: number;
  suffix?: string;
  delta: string;
  tone: Tone;
  chaos: string;
  trend: number[];
}[] = [
  {
    label: 'Open tasks',
    count: 1284,
    delta: '+12.4%',
    tone: 'success',
    chaos: '-220,250,-10',
    trend: [30, 42, 38, 55, 50, 68, 74],
  },
  {
    label: 'Avg. resolution',
    count: 3.2,
    decimals: 1,
    suffix: 'h',
    delta: '−18%',
    tone: 'success',
    chaos: '140,280,12',
    trend: [80, 72, 76, 60, 58, 44, 40],
  },
  {
    label: 'SLA breaches',
    count: 7,
    delta: '+2',
    tone: 'danger',
    chaos: '380,-150,-8',
    trend: [20, 26, 18, 30, 24, 40, 36],
  },
];

const SERIES = [38, 46, 42, 56, 51, 63, 58, 70, 66, 82, 74, 86];
const PREVIOUS = [30, 33, 38, 35, 42, 40, 47, 45, 52, 50, 56, 55];
const PEAK = 9;

const ROWS: {
  task: string;
  who: string;
  status: string;
  tone: Tone;
  sla: number;
  due: string;
}[] = [
  {
    task: 'Serve · Acme Law',
    who: 'bg-accent',
    status: 'In progress',
    tone: 'accent',
    sla: 72,
    due: '2h',
  },
  {
    task: 'Affidavit · Pearson',
    who: 'bg-warning',
    status: 'Completed',
    tone: 'success',
    sla: 100,
    due: 'Done',
  },
  {
    task: 'Re-attempt · Kline',
    who: 'bg-accent-2',
    status: 'Blocked',
    tone: 'warning',
    sla: 34,
    due: '30m',
  },
  {
    task: 'Skip trace · Ortiz',
    who: 'bg-success',
    status: 'Review',
    tone: 'violet',
    sla: 58,
    due: '4h',
  },
];

function Dashboard() {
  return (
    <div className="container-site hidden h-full pb-4 pt-8 lg:block">
      <div data-layer="tilt" className="h-full">
        <Frag chaos="0,70,-3" className="relative h-full">
          <div className="flex h-full flex-col rounded-[var(--radius-lg)] border border-line-strong bg-surface-1/70 shadow-[0_50px_120px_-50px_rgb(0_0_0/0.7)] backdrop-blur-md">
            <WindowChrome />
            <div className="flex min-h-0 flex-1">
              <Frag
                chaos="-420,120,-12"
                className="w-44 shrink-0 border-r border-line xl:w-52"
              >
                <Sidebar />
              </Frag>
              <div className="flex min-w-0 flex-1 flex-col gap-3 p-3.5 xl:gap-4 xl:p-4">
                <Frag chaos="260,-100,5">
                  <DashHeader />
                </Frag>
                <div className="grid grid-cols-4 gap-3 xl:gap-4">
                  {KPIS.map((kpi, i) => (
                    <Frag
                      key={kpi.label}
                      chaos={kpi.chaos}
                      className="relative"
                    >
                      <KpiCard {...kpi} />
                      {i === 0 && (
                        <>
                          <Selection label="KPI card · Hug × 76" />
                          <Cursor className="-bottom-4 right-6" />
                        </>
                      )}
                    </Frag>
                  ))}
                  <Frag chaos="-320,-110,14">
                    <StatusCard />
                  </Frag>
                </div>
                <div className="grid min-h-0 flex-1 grid-cols-[1.7fr_1fr] gap-3 xl:gap-4">
                  <Frag chaos="-260,200,8" className="relative min-h-0">
                    <ChartPanel />
                  </Frag>
                  <Frag chaos="360,220,12" className="min-h-0">
                    <TablePanel />
                  </Frag>
                </div>
              </div>
            </div>
          </div>
        </Frag>
      </div>
    </div>
  );
}

function WindowChrome() {
  return (
    <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-line px-3.5">
      <span className="size-2.5 rounded-full bg-fg/15" />
      <span className="size-2.5 rounded-full bg-fg/15" />
      <span className="size-2.5 rounded-full bg-fg/15" />
      <span className="mx-auto flex h-5 w-72 items-center justify-center gap-1.5 rounded-md bg-fg/[0.05] font-mono text-[10px] text-fg-subtle">
        <svg width="8" height="9" viewBox="0 0 8 9" fill="none">
          <rect
            x="0.5"
            y="4"
            width="7"
            height="4.5"
            rx="1"
            fill="currentColor"
          />
          <path d="M2 4V2.8a2 2 0 014 0V4" stroke="currentColor" />
        </svg>
        app.proofops.io/overview
      </span>
      <span className="w-12" />
    </div>
  );
}

function Sidebar() {
  const nav = [
    { label: 'Overview', active: true },
    { label: 'Tasks', badge: '12' },
    { label: 'Servers' },
    { label: 'Reports' },
    { label: 'Inbox' },
  ];
  const teams = [
    { label: 'Northeast', dot: 'bg-success' },
    { label: 'Midwest', dot: 'bg-warning' },
    { label: 'West Coast', dot: 'bg-accent-2' },
  ];
  return (
    <div className="flex h-full flex-col gap-0.5 overflow-hidden p-3">
      <span className="mb-3 flex items-center gap-2 px-1.5">
        <span className="size-5 rounded-[6px] bg-linear-to-br from-accent to-accent-2" />
        <span className="text-xs font-medium text-fg">ProofOps</span>
      </span>
      <span className="meta mb-1 px-2 text-[10px] text-fg-subtle">Main</span>
      {nav.map((item) => (
        <span
          key={item.label}
          className={cn(
            'flex items-center gap-2 rounded-md px-2 py-1 text-xs',
            item.active
              ? 'bg-accent/15 text-fg shadow-[inset_2px_0_0_var(--accent)]'
              : 'text-fg-muted',
          )}
        >
          <span
            className={cn(
              'size-3 rounded-[4px] border',
              item.active ? 'border-accent bg-accent/40' : 'border-line-strong',
            )}
          />
          {item.label}
          {item.badge && (
            <span className="ml-auto rounded-full bg-accent px-1.5 text-[10px] leading-4 text-white">
              {item.badge}
            </span>
          )}
        </span>
      ))}
      <span className="meta mb-1 mt-4 px-2 text-[10px] text-fg-subtle">
        Teams
      </span>
      {teams.map((t) => (
        <span
          key={t.label}
          className="flex items-center gap-2 px-2 py-1 text-xs text-fg-muted"
        >
          <span className={cn('size-2 rounded-full', t.dot)} />
          {t.label}
        </span>
      ))}
      <span className="mt-auto flex items-center gap-2 rounded-md border border-line px-2 py-2">
        <span className="size-6 shrink-0 rounded-full bg-linear-to-br from-accent-2 to-accent" />
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[11px] font-medium text-fg">
            Duncan T.
          </span>
          <span className="truncate text-[10px] text-fg-subtle">Ops lead</span>
        </span>
      </span>
    </div>
  );
}

function DashHeader() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex flex-col">
        <span className="text-[10px] text-fg-subtle">
          Workspace / Operations
        </span>
        <span className="text-sm font-medium text-fg">Operations overview</span>
      </span>
      <span className="ml-auto flex h-7 w-44 items-center gap-2 rounded-md border border-accent/60 bg-bg/60 px-2.5 ring-4 ring-accent/10 xl:w-56">
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          className="shrink-0 text-fg-subtle"
        >
          <circle
            cx="5"
            cy="5"
            r="3.75"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M8 8l2.5 2.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[11px] text-fg-muted">Find a task</span>
        <span data-caret className="-ml-1.5 h-3 w-px bg-accent" />
      </span>
      <span className="flex h-7 items-center gap-1.5 rounded-md border border-line px-2.5 text-[11px] text-fg-muted">
        Last 30 days
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path
            d="M1.5 3l2.5 2.5L6.5 3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex items-center">
        {['bg-accent-2', 'bg-warning', 'bg-success'].map((c) => (
          <span
            key={c}
            className={cn(
              '-ml-1.5 size-6 rounded-full ring-2 ring-surface-1 first:ml-0',
              c,
            )}
          />
        ))}
      </span>
      <span className="flex h-7 items-center rounded-md bg-accent px-3 text-[11px] font-medium text-white shadow-[0_6px_20px_-6px_var(--accent)]">
        Export
      </span>
    </div>
  );
}

function KpiCard({
  label,
  count,
  decimals = 0,
  suffix = '',
  delta,
  tone,
  trend,
}: (typeof KPIS)[number]) {
  return (
    <div className={cn(panel, 'flex flex-col gap-2 p-3')}>
      <span className="flex items-center justify-between gap-2">
        <span className="truncate text-[11px] text-fg-subtle">{label}</span>
        <span
          className={cn(
            'rounded-full px-1.5 py-px text-[10px] font-medium',
            tones[tone],
          )}
        >
          {delta}
        </span>
      </span>
      <span className="flex items-end justify-between gap-3">
        <span
          data-count={count}
          data-decimals={decimals}
          data-suffix={suffix}
          className="text-xl font-medium tabular-nums tracking-tight text-fg xl:text-2xl"
        >
          {count.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}
          {suffix}
        </span>
        <svg
          viewBox="0 0 64 24"
          className="h-6 w-16 overflow-visible"
          fill="none"
        >
          <path
            data-spark
            d={smoothPath(trend, 64, 24)}
            pathLength={1}
            strokeDasharray="1"
            strokeWidth="1.5"
            strokeLinecap="round"
            className={tone === 'danger' ? 'stroke-danger' : 'stroke-success'}
          />
        </svg>
      </span>
    </div>
  );
}

function ChartPanel() {
  const x = (PEAK / (SERIES.length - 1)) * 100;
  const y = 100 - SERIES[PEAK];
  const line = smoothPath(SERIES, 600, 200);
  return (
    <div className={cn(panel, 'flex h-full flex-col gap-3 p-3.5')}>
      <span className="flex items-center gap-4">
        <span className="flex flex-col">
          <span className="text-xs font-medium text-fg">Tasks completed</span>
          <span className="text-[10px] text-fg-subtle">Daily, all regions</span>
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-fg-muted">
          <span className="h-0.5 w-3 rounded-full bg-accent" /> This period
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-fg-muted">
          <span className="h-0 w-3 border-t border-dashed border-accent-2" />{' '}
          Previous
        </span>
        <span className="ml-auto flex rounded-md border border-line p-0.5 text-[10px]">
          {['D', 'W', 'M'].map((p) => (
            <span
              key={p}
              className={cn(
                'rounded px-2 py-0.5',
                p === 'W' ? 'bg-fg/10 text-fg' : 'text-fg-subtle',
              )}
            >
              {p}
            </span>
          ))}
        </span>
      </span>

      <div className="flex min-h-0 flex-1 gap-2">
        <span className="flex flex-col justify-between pb-4 text-right font-mono text-[9px] leading-none text-fg-subtle">
          {['2k', '1.5k', '1k', '500', '0'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="relative min-h-0 flex-1">
            {[0, 25, 50, 75, 100].map((p) => (
              <span
                key={p}
                className="absolute inset-x-0 border-t border-dashed border-line"
                style={{ top: `${p}%` }}
              />
            ))}
            <svg
              viewBox="0 0 600 200"
              preserveAspectRatio="none"
              className="absolute inset-0 size-full overflow-visible"
              fill="none"
            >
              <defs>
                <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0"
                    style={{ stopColor: 'var(--accent)', stopOpacity: 0.35 }}
                  />
                  <stop
                    offset="1"
                    style={{ stopColor: 'var(--accent)', stopOpacity: 0 }}
                  />
                </linearGradient>
              </defs>
              <path
                data-area
                d={`${line} L600 200 L0 200 Z`}
                fill="url(#hero-area)"
              />
              <path
                d={smoothPath(PREVIOUS, 600, 200)}
                strokeWidth="1.25"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
                className="stroke-accent-2/70"
              />
              <path
                data-spark
                d={line}
                pathLength={1}
                strokeDasharray="1"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="stroke-accent"
              />
            </svg>

            <span
              data-pop
              className="absolute inset-y-0 w-px bg-linear-to-b from-accent/0 via-accent/60 to-accent/0"
              style={{ left: `${x}%` }}
            />
            <span
              data-pop
              className="absolute size-0"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="absolute -left-[5px] -top-[5px] size-2.5 rounded-full border-2 border-bg bg-accent shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_25%,transparent)]" />
              <span className="glass absolute -top-3 right-4 flex w-36 flex-col gap-1 rounded-[var(--radius-sm)] px-2.5 py-2">
                <span className="text-[10px] text-fg-subtle">Thu, Oct 22</span>
                <span className="flex items-baseline justify-between">
                  <span className="text-sm font-medium tabular-nums text-fg">
                    1,642
                  </span>
                  <span className="text-[10px] font-medium text-success">
                    +12.4%
                  </span>
                </span>
              </span>
            </span>

            <span
              data-pop
              className="absolute left-[3%] top-[4%] flex items-center gap-1.5"
            >
              <span className="grid size-5 place-items-center rounded-full rounded-bl-none bg-accent-2 text-[9px] font-medium text-white">
                D
              </span>
              <span className="glass rounded-full px-2 py-0.5 text-[10px] text-fg-muted">
                Trend reads at a glance now ✓
              </span>
            </span>
          </div>
          <span className="flex justify-between font-mono text-[9px] leading-none text-fg-subtle">
            {['Oct 1', 'Oct 6', 'Oct 11', 'Oct 16', 'Oct 21', 'Oct 26'].map(
              (t) => (
                <span key={t}>{t}</span>
              ),
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

function StatusCard() {
  const segments = [
    {
      label: 'Completed',
      len: 52,
      offset: 0,
      stroke: 'stroke-accent',
      dot: 'bg-accent',
      value: '54%',
    },
    {
      label: 'In progress',
      len: 24,
      offset: -55,
      stroke: 'stroke-accent-2',
      dot: 'bg-accent-2',
      value: '26%',
    },
    {
      label: 'Blocked',
      len: 12,
      offset: -82,
      stroke: 'stroke-warning',
      dot: 'bg-warning',
      value: '14%',
    },
  ];
  return (
    <div className={cn(panel, 'flex h-full items-center gap-3 p-3')}>
      <span className="relative size-12 shrink-0 xl:size-14">
        <svg viewBox="0 0 36 36" className="size-full -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            strokeWidth="4"
            className="stroke-fg/10"
          />
          {segments.map((s) => (
            <circle
              key={s.label}
              data-ring
              data-len={s.len}
              cx="18"
              cy="18"
              r="15"
              fill="none"
              strokeWidth="4"
              pathLength={100}
              strokeDasharray={`${s.len} 100`}
              strokeDashoffset={s.offset}
              strokeLinecap="round"
              className={s.stroke}
            />
          ))}
        </svg>
        <span className="absolute inset-0 grid place-items-center text-[10px] font-medium tabular-nums text-fg xl:text-[11px]">
          84%
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        {segments.map((s) => (
          <span
            key={s.label}
            className="flex items-center gap-1.5 text-[10px] text-fg-muted"
          >
            <span className={cn('size-2 shrink-0 rounded-full', s.dot)} />
            <span className="truncate">{s.label}</span>
            <span className="ml-auto tabular-nums text-fg">{s.value}</span>
          </span>
        ))}
      </span>
    </div>
  );
}

function TablePanel() {
  return (
    <div className={cn(panel, 'flex h-full flex-col overflow-hidden p-3.5')}>
      <span className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-fg">Recent tasks</span>
        <span className="text-[10px] text-accent">View all</span>
      </span>
      <span className="grid grid-cols-[1.5fr_1fr_0.9fr_0.5fr] gap-2 border-b border-line pb-1.5 font-mono text-[9px] uppercase tracking-wider text-fg-subtle">
        <span>Task</span>
        <span>Status</span>
        <span>SLA</span>
        <span className="text-right">Due</span>
      </span>
      {ROWS.map((r) => (
        <span
          key={r.task}
          className="grid grid-cols-[1.5fr_1fr_0.9fr_0.5fr] items-center gap-2 border-b border-line py-[7px] text-[11px] last:border-b-0"
        >
          <span className="flex min-w-0 items-center gap-1.5 text-fg">
            <span className={cn('size-3.5 shrink-0 rounded-full', r.who)} />
            <span className="truncate">{r.task}</span>
          </span>
          <span>
            <span
              className={cn(
                'whitespace-nowrap rounded-full px-1.5 py-px text-[10px] font-medium',
                tones[r.tone],
              )}
            >
              {r.status}
            </span>
          </span>
          <span className="h-1 overflow-hidden rounded-full bg-fg/10">
            <span
              className={cn(
                'block h-full rounded-full',
                r.sla === 100
                  ? 'bg-success'
                  : r.sla < 40
                    ? 'bg-warning'
                    : 'bg-accent',
              )}
              style={{ width: `${r.sla}%` }}
            />
          </span>
          <span className="text-right tabular-nums text-fg-subtle">
            {r.due}
          </span>
        </span>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------
   Mobile: a compact 4×7 arrangement on the 4-column grid.
------------------------------------------------------------------------- */

function MobileStructure() {
  return (
    <div className="container-site h-full lg:hidden">
      <div className="grid h-full grid-cols-4 grid-rows-7 gap-x-5 gap-y-3 pb-2 pt-6">
        <Frag
          chaos="-340,180,-12"
          className="col-span-4 row-start-1 self-center"
        >
          <div className={cn(wire, 'flex h-10 items-center gap-3 px-3.5')}>
            <span className="size-2.5 rounded-full bg-accent" />
            <span className={cn(bar, 'h-1.5 w-12')} />
            <span className={cn(bar, 'h-1.5 w-9')} />
            <span className={cn(bar, 'hidden h-1.5 w-12 sm:block')} />
            <span className="ml-auto h-5 w-14 rounded-full border border-accent/50 bg-accent/10" />
          </div>
        </Frag>

        <Frag
          chaos="-120,260,10"
          className="col-span-3 col-start-1 row-start-2 self-center"
        >
          <div className="flex h-9 items-center gap-2.5 rounded-[var(--radius-sm)] border border-accent/60 bg-surface-1/80 px-3 ring-4 ring-accent/10">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="shrink-0 text-fg-subtle"
            >
              <circle
                cx="5"
                cy="5"
                r="3.75"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M8 8l2.5 2.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-xs text-fg-muted">Find a task</span>
            <span data-caret className="-ml-1.5 h-3.5 w-px bg-accent" />
          </div>
        </Frag>

        <Frag
          chaos="180,-60,-28"
          className="col-start-4 row-start-2 self-center justify-self-end"
        >
          <div className="flex h-6 w-11 items-center rounded-full border border-success/60 bg-success/70 p-0.5">
            <span className="ml-auto size-4.5 rounded-full bg-white shadow-sm" />
          </div>
        </Frag>

        <Frag
          chaos="260,150,14"
          className="relative col-span-2 col-start-1 row-span-3 row-start-3"
        >
          <div className={cn(wire, 'flex h-full flex-col gap-2.5 p-2.5')}>
            <span className="relative flex-1 overflow-hidden rounded-[calc(var(--radius-sm)-4px)] bg-linear-to-br from-accent/35 via-accent-2/20 to-transparent">
              <svg
                className="absolute inset-0 size-full text-fg/10"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M0 0L100 100M100 0L0 100"
                  stroke="currentColor"
                  strokeWidth="0.6"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
            <span className={cn(bar, 'h-1.5 w-3/4')} />
            <span className={cn(bar, 'h-1.5 w-1/2')} />
          </div>
          <Selection />
          <Cursor className="-bottom-4 right-4" />
        </Frag>

        <Frag
          chaos="-420,40,-18"
          className="col-span-2 col-start-3 row-span-2 row-start-3"
        >
          <div className={cn(wire, 'flex h-full items-end gap-1.5 p-2.5')}>
            {[38, 62, 48, 84, 56, 72].map((h, i) => (
              <span key={i} className="flex h-full flex-1 items-end">
                <span
                  data-bar
                  className={cn(
                    'block w-full rounded-t-[3px]',
                    i === 3
                      ? 'bg-accent'
                      : 'bg-linear-to-t from-accent-2/25 to-accent/45',
                  )}
                  style={{ height: `${h}%` }}
                />
              </span>
            ))}
          </div>
        </Frag>

        <Frag
          chaos="-160,240,9"
          className="col-span-2 col-start-3 row-span-3 row-start-5"
        >
          <div
            className={cn(
              wire,
              'flex h-full flex-col justify-center gap-3 p-3',
            )}
          >
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="flex items-center gap-2">
                <span
                  className={cn(
                    'grid size-3 shrink-0 place-items-center rounded-[3px] border',
                    i < 2 ? 'border-success bg-success' : 'border-line-strong',
                  )}
                >
                  {i < 2 && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4.2l1.6 1.6L6.5 2.4"
                        stroke="var(--bg)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span
                  className={cn(
                    'h-1.5 rounded-full',
                    i < 2 ? 'bg-fg/[0.06]' : 'bg-fg/[0.12]',
                    i % 2 ? 'w-2/3' : 'w-full',
                  )}
                />
              </span>
            ))}
          </div>
        </Frag>

        <Frag
          chaos="300,-120,-10"
          className="col-span-2 col-start-1 row-span-2 row-start-6"
        >
          <div className={cn(wire, 'flex h-full items-center gap-3 p-3')}>
            <span className="relative size-14 shrink-0">
              <svg viewBox="0 0 36 36" className="size-full -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  strokeWidth="4"
                  className="stroke-fg/10"
                />
                <circle
                  data-ring
                  data-len={62}
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  strokeWidth="4"
                  pathLength={100}
                  strokeDasharray="62 100"
                  strokeLinecap="round"
                  className="stroke-accent"
                />
                <circle
                  data-ring
                  data-len={22}
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  strokeWidth="4"
                  pathLength={100}
                  strokeDasharray="22 100"
                  strokeDashoffset={-66}
                  strokeLinecap="round"
                  className="stroke-accent-2"
                />
              </svg>
              <span className="absolute inset-0 grid place-items-center font-mono text-[10px] text-fg">
                84%
              </span>
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-2.5">
              <span className="flex items-center gap-2">
                <span className="size-2 shrink-0 rounded-full bg-accent" />
                <span className={cn(bar, 'h-1.5 w-full')} />
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2 shrink-0 rounded-full bg-accent-2" />
                <span className={cn(bar, 'h-1.5 w-2/3')} />
              </span>
            </span>
          </div>
        </Frag>
      </div>
    </div>
  );
}

function Scrap({
  className,
  rotate,
  children,
}: {
  className?: string;
  rotate: number;
  children: React.ReactNode;
}) {
  return (
    <div
      data-noise
      className={cn('absolute', className)}
      style={{ rotate: `${rotate}deg` }}
    >
      {children}
    </div>
  );
}

/** Chaos-only clutter. Never visible once the intro finishes. */
function Noise() {
  return (
    <div className="container-site absolute inset-0">
      <div className="relative h-full">
        <Scrap
          className="left-[2%] top-[22%] lg:left-[3%] lg:top-[14%]"
          rotate={-7}
        >
          <span className="block rounded-[var(--radius-sm)] border border-warning/40 bg-warning/15 px-3 py-2.5 text-xs text-warning shadow-[var(--shadow-float)]">
            v3_final_FINAL(2).fig
          </span>
        </Scrap>
        <Scrap className="left-[48%] top-[6%] lg:left-[33%]" rotate={4}>
          <span className="meta flex items-center gap-1.5 rounded-full border border-danger/50 bg-bg/60 px-2.5 py-1 text-danger">
            <span className="size-1.5 rounded-full bg-danger" /> 12 issues
          </span>
        </Scrap>
        <Scrap
          className="left-[30%] top-[58%] lg:left-[20%] lg:top-[36%]"
          rotate={-3}
        >
          <span className="glass block rounded-[var(--radius-sm)] px-3 py-2 text-xs text-fg-muted">
            where does this go?
          </span>
        </Scrap>
        <Scrap
          className="hidden sm:left-[45%] sm:top-[28%] sm:block"
          rotate={6}
        >
          <span className="flex items-center gap-1.5">
            <span className="size-6 rounded-md border border-line bg-surface-2" />
            <span className="size-6 rounded-md border border-line bg-surface-3" />
            <span className="meta text-fg-subtle">same?</span>
          </span>
        </Scrap>
        <Scrap
          className="left-[40%] top-[30%] lg:left-[50%] lg:top-[14%]"
          rotate={8}
        >
          <span className="block h-20 w-36 rounded-[var(--radius-md)] border border-dashed border-danger/60 lg:h-28 lg:w-56" />
        </Scrap>
        <Scrap
          className="left-[56%] top-[88%] lg:left-[58%] lg:top-[3%]"
          rotate={-2}
        >
          <span className="meta text-warning">TODO: fix spacing</span>
        </Scrap>
        <Scrap
          className="hidden lg:left-[68%] lg:top-[50%] lg:block"
          rotate={-5}
        >
          <span className="block max-w-40 text-sm leading-snug text-fg-subtle">
            Lorem ipsum dolor sit amet, consectetur
          </span>
        </Scrap>
        <Scrap
          className="left-[62%] top-[44%] lg:left-[84%] lg:top-[42%]"
          rotate={10}
        >
          <span className="meta rounded border border-line-strong bg-bg/60 px-1.5 py-0.5 text-fg-muted">
            z-index: 9999
          </span>
        </Scrap>
        <Scrap
          className="left-[4%] top-[80%] lg:left-[10%] lg:top-[48%]"
          rotate={-4}
        >
          <span className="meta flex items-center gap-2 text-danger">
            <span className="h-px w-10 bg-danger" /> 13px ≠ 16px
          </span>
        </Scrap>
        <Scrap
          className="left-[10%] top-[36%] lg:left-[26%] lg:top-[18%]"
          rotate={0}
        >
          <svg
            viewBox="0 0 340 120"
            fill="none"
            className="h-auto w-[60vw] max-w-[340px] text-danger/70"
          >
            <path
              d="M4 96C60 20 110 118 170 58S280 6 336 40"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="5 6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="336" cy="40" r="3.5" fill="currentColor" />
          </svg>
        </Scrap>
      </div>
    </div>
  );
}
