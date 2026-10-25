import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects, getServices } from "@/lib/content";
import { ClosingCta } from "@/components/layout/closing-cta";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "UI/UX and product design led by real case studies, alongside graphic, digital, and social media design from Duncan Tima.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const [{ intro, items }, projects] = await Promise.all([getServices(), getProjects()]);

  return (
    <>
      <section aria-labelledby="services-title" className="container-site pb-16 pt-10 md:pt-16">
        <p className="meta text-fg-subtle">Services</p>
        <h1 id="services-title" className="mt-6 max-w-4xl text-h1 font-medium text-balance">
          Product clarity first. Visual craft throughout.
        </h1>
        <p className="mt-6 max-w-2xl text-lead text-fg-muted">{intro}</p>
      </section>

      <section aria-labelledby="focus-title" className="container-site">
        <div className="grid gap-10 rounded-[var(--radius-xl)] border border-line bg-surface-1 p-6 md:p-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="meta text-fg-subtle">Core focus</p>
            <h2 id="focus-title" className="mt-4 text-h2 font-medium">
              UI/UX &amp; product design
            </h2>
            <p className="mt-4 max-w-md text-fg-muted">
              Research, flows, systems, and high-fidelity interfaces for products with real operational complexity. The
              case studies show how that work plays out.
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

      <section aria-labelledby="service-list-title" className="container-site pt-section">
        <h2 id="service-list-title" className="meta text-fg-subtle">
          Also available
        </h2>
        <ol className="mt-6">
          {items.map((s) => (
            <li key={s.number} className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
              <span className="meta text-fg-subtle md:col-span-1 md:pt-3">{s.number}</span>
              <div className="md:col-span-6">
                <h3 className="text-[clamp(2rem,4.4vw,4rem)] font-medium leading-none tracking-[-0.045em]">{s.name}</h3>
                <p className="mt-5 max-w-md text-lead text-fg-muted">{s.description}</p>
              </div>
              {s.example && (
                <Reveal className="md:col-span-4 md:col-start-9">
                  <MediaFrame
                    image={s.example}
                    aspect={s.example.fit === "cover" ? "4 / 5" : undefined}
                    sizes="(min-width: 768px) 30vw, 94vw"
                    className="md:max-w-sm md:ml-auto"
                  />
                </Reveal>
              )}
            </li>
          ))}
        </ol>
      </section>

      <ClosingCta
        eyebrow="Next step"
        title="Not sure which of these fits? Start with the problem."
        body="Describe what you’re working on and I’ll help figure out the right shape for the work."
      />
    </>
  );
}
