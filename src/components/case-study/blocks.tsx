import type { CaseStudyBlock } from "@/content/types";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";
import { TeamsRolesRoutingDiagram } from "./diagram";

const prose = "max-w-[42rem]";
const contentSizes = "(min-width: 1280px) 66vw, (min-width: 768px) 90vw, 94vw";

export function BlockRenderer({ blocks }: { blocks: CaseStudyBlock[] }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => (
        <Block key={i} block={block} first={i === 0} />
      ))}
    </div>
  );
}

function Block({ block, first }: { block: CaseStudyBlock; first: boolean }) {
  switch (block.type) {
    case "sectionHeading":
      return (
        <header id={block.id} className={cn("border-t border-line pt-8", first ? "mt-0" : "mt-24 md:mt-32")}>
          <p className="meta text-fg-subtle">{block.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-h2 font-medium text-balance">{block.title}</h2>
        </header>
      );

    case "text":
      return (
        <div className={cn("mt-8", prose)}>
          {block.lead && <p className="mb-5 text-lead text-fg">{block.lead}</p>}
          <div className="prose-case text-[1.0625rem] leading-[1.7] text-fg-muted">
            {block.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {block.callout && (
            <p className="mt-8 border-l border-fg pl-5 text-h3 font-medium text-fg text-balance">{block.callout}</p>
          )}
        </div>
      );

    case "image":
      return (
        <Reveal as="figure" className={cn("mt-12", block.size === "inset" && "max-w-2xl")}>
          <MediaFrame
            image={block.image}
            sizes={block.size === "inset" ? "(min-width: 768px) 672px, 94vw" : contentSizes}
          />
          {block.caption && <figcaption className="mt-3 text-sm text-fg-subtle">{block.caption}</figcaption>}
        </Reveal>
      );

    case "video":
      return (
        <figure className="mt-12">
          <div
            className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-media"
            style={{ aspectRatio: `${block.video.width} / ${block.video.height}` }}
          >
            <video
              className="h-full w-full object-contain"
              controls
              muted
              playsInline
              preload="none"
              poster={block.video.poster.src}
              aria-label={block.video.label}
            >
              <source src={block.video.src} type="video/mp4" />
            </video>
          </div>
          <figcaption className="mt-3 text-sm text-fg-subtle">{block.caption ?? block.video.label}</figcaption>
        </figure>
      );

    case "imagePair":
      return (
        <figure className="mt-12">
          <div className="grid gap-4 md:grid-cols-2">
            {block.images.map((img) => (
              <Reveal key={img.src}>
                <MediaFrame image={img} sizes="(min-width: 768px) 45vw, 94vw" />
              </Reveal>
            ))}
          </div>
          {block.caption && <figcaption className="mt-3 text-sm text-fg-subtle">{block.caption}</figcaption>}
        </figure>
      );

    case "quote":
      return (
        <figure className="mt-14 max-w-3xl border-t border-line pt-8">
          <blockquote className="text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium leading-[1.3] tracking-[-0.02em] text-fg text-balance">
            <p>“{block.quote}”</p>
          </blockquote>
          <figcaption className="meta mt-6 text-fg-subtle">— {block.attribution}</figcaption>
        </figure>
      );

    case "metrics":
      return (
        <section aria-label={block.label} className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-sm font-medium text-fg">{block.label}</p>
            <p className="meta rounded-full border border-line px-3 py-1.5 text-fg-muted">
              {block.tone === "outcome" ? "Outcome" : "Baseline"}
            </p>
          </div>
          <dl className="mt-5 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-3">
            {block.items.map((m) => (
              <div key={m.label} className={cn("flex flex-col gap-3 p-6 md:p-8", block.tone === "outcome" ? "bg-surface-2" : "bg-surface-1")}>
                <dt className="order-2 text-[0.95rem] leading-snug text-fg-muted">{m.label}</dt>
                <dd className="order-1 text-[clamp(2.5rem,5vw,4rem)] font-medium leading-none tracking-[-0.045em] text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>
          {block.note && <p className="mt-3 text-sm text-fg-subtle">{block.note}</p>}
        </section>
      );

    case "features":
      if (block.layout === "grid") {
        return (
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {block.items.map((f, i) => (
              <div key={f.title} className="border-t border-line pt-5">
                <p className="meta text-fg-subtle">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-lg font-medium text-fg">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-fg-muted">{f.body}</p>
              </div>
            ))}
          </div>
        );
      }
      return (
        <div className="mt-12 flex flex-col gap-16 md:gap-24">
          {block.items.map((f, i) => (
            <div key={f.title} className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
              <div className={cn("md:col-span-5", i % 2 === 1 && "md:order-2 md:col-start-8")}>
                <p className="meta text-fg-subtle">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-h3 font-medium text-fg">{f.title}</h3>
                <p className="mt-4 leading-[1.7] text-fg-muted">{f.body}</p>
              </div>
              {f.image && (
                <Reveal className={cn("md:col-span-7", i % 2 === 1 && "md:order-1 md:col-start-1")}>
                  <MediaFrame image={f.image} sizes="(min-width: 1280px) 40vw, (min-width: 768px) 55vw, 94vw" />
                </Reveal>
              )}
            </div>
          ))}
        </div>
      );

    case "diagram":
      return (
        <figure className="mt-10">
          <TeamsRolesRoutingDiagram />
          {block.caption && <figcaption className="mt-3 text-sm text-fg-subtle">{block.caption}</figcaption>}
        </figure>
      );
  }
}
