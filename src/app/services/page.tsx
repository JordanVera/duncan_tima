import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects, getServices } from "@/lib/content";
import { AbcdProcessDiagram } from "@/components/case-study/diagram";
import { ClosingCta } from "@/components/layout/closing-cta";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand design, digital experiences, and product design from ABCD — A Better Creative Direction.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const [{ intro, items, toolkit }, projects] = await Promise.all([getServices(), getProjects()]);

  return (
    <>
      <section aria-labelledby="services-title" className="container-site pb-16 pt-10 md:pt-16">
        <p className="meta text-accent">Capabilities</p>
        <h1 id="services-title" className="mt-6 max-w-4xl text-h1 font-medium text-balance">
          Strategic thinking meets visual craft.
        </h1>
        <p className="mt-6 max-w-2xl text-lead text-fg-muted">{intro}</p>
      </section>

      <section aria-labelledby="method-title" className="container-site">
        <div className="rounded-[var(--radius-xl)] border border-line bg-surface-1 p-6 md:p-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="meta text-accent">The ABCD Method</p>
              <h2 id="method-title" className="mt-3 text-h2 font-medium">
                Assess. Build. Create. Deliver.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-fg-muted">
              A focused, expert-led process that turns ambiguity into clear, shippable creative direction.
            </p>
          </div>
          <AbcdProcessDiagram />
        </div>
      </section>

      <section aria-labelledby="service-list-title" className="container-site pt-section">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="service-list-title" className="meta text-fg-subtle">
            Core Disciplines
          </h2>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            See recent case studies
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
          </Link>
        </div>

        <ol className="mt-6">
          {items.map((s) => (
            <li key={s.number} className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
              <span className="meta text-accent md:col-span-1 md:pt-3">{s.number}</span>
              <div className="md:col-span-6">
                <h3 className="text-[clamp(2rem,4.4vw,3.75rem)] font-medium leading-none tracking-[-0.045em]">{s.name}</h3>
                <p className="mt-5 max-w-md text-lead text-fg-muted">{s.description}</p>
                <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-fg-muted">
                      <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              {s.example && (
                <Reveal className="md:col-span-5 md:col-start-8">
                  <MediaFrame
                    image={s.example}
                    sizes="(min-width: 768px) 38vw, 94vw"
                    className="md:ml-auto"
                  />
                </Reveal>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="toolkit-title" className="border-y border-line bg-surface-1">
        <div className="container-site py-section">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="meta text-accent">Studio Stack</p>
              <h2 id="toolkit-title" className="mt-4 text-h2 font-medium">
                Tools built for speed and systems thinking.
              </h2>
            </div>
            <p className="text-fg-muted lg:col-span-6 lg:col-start-7">
              From collaborative discovery workshops to interactive prototypes and living documentation, our toolkit keeps stakeholders aligned at every stage.
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {toolkit.map((tool) => (
              <li
                key={tool.name}
                className="flex flex-col justify-between gap-6 rounded-[var(--radius-lg)] border border-line bg-bg/70 p-6"
              >
                <div className="flex h-10 items-center">
                  {tool.lightSrc === tool.darkSrc ? (
                    <Image
                      src={tool.lightSrc}
                      alt={tool.name}
                      width={tool.width}
                      height={tool.height}
                      loading="eager"
                      unoptimized
                      className="h-8 w-auto object-contain object-left"
                    />
                  ) : (
                    <>
                      <Image
                        src={tool.lightSrc}
                        alt={tool.name}
                        width={tool.width}
                        height={tool.height}
                        loading="eager"
                        unoptimized
                        className="theme-light-only h-7 w-auto object-contain object-left"
                      />
                      <Image
                        src={tool.darkSrc}
                        alt={tool.name}
                        width={tool.width}
                        height={tool.height}
                        loading="eager"
                        unoptimized
                        className="theme-dark-only h-7 w-auto object-contain object-left"
                      />
                    </>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-fg">{tool.name}</p>
                  <p className="mt-1 text-xs text-fg-muted">{tool.category}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="work-index-title" className="container-site pt-section">
        <div className="grid gap-10 rounded-[var(--radius-xl)] border border-line bg-surface-1 p-6 md:p-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="meta text-accent">Proof in practice</p>
            <h2 id="work-index-title" className="mt-4 text-h2 font-medium">
              Explore recent engagements
            </h2>
            <p className="mt-4 max-w-md text-fg-muted">
              See how brand systems, spatial direction, and digital experiences come together across real client engagements.
            </p>
          </div>
          <ul className="flex flex-col lg:col-span-6 lg:col-start-7">
            {projects.map((p) => (
              <li key={p.slug} className="border-t border-line first:border-t-0">
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex min-h-16 items-center justify-between gap-4 py-4"
                >
                  <span>
                    <span className="block text-lg font-medium text-fg">{p.name}</span>
                    <span className="block text-sm text-fg-muted">{p.title}</span>
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-fg-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-fg"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta
        eyebrow="Next step"
        title="Not sure which discipline fits? Start with the challenge."
        body="Tell us what you’re building or where alignment is breaking down, and we’ll recommend a focused path forward."
      />
    </>
  );
}
