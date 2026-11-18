import type { Metadata } from "next";
import { getAbout } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { AbcdProcessDiagram } from "@/components/case-study/diagram";
import { ClosingCta } from "@/components/layout/closing-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/ui/logo";

export const metadata: Metadata = {
  title: "About",
  description:
    "About ABCD — A Better Creative Direction: an independent multidisciplinary creative consultancy uniting brand design, digital experiences, and product design.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <>
      <section aria-labelledby="about-title" className="container-site pb-section pt-10 md:pt-16">
        <p className="meta text-accent">About ABCD</p>
        <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h1 id="about-title" className="text-h1 font-medium text-balance">
              Creative by nature. Strategic by design.
            </h1>
            <p className="mt-8 max-w-xl text-lead text-fg-muted">{about.intro}</p>
            <p className="mt-6 max-w-xl text-fg-muted">{about.positioning}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Start a project</ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                Explore our work
              </ButtonLink>
              <ButtonLink href={siteConfig.linkedin} variant="ghost" external>
                LinkedIn
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-[var(--radius-xl)] border border-line bg-surface-1 p-10">
              <Logo variant="vertical" className="w-48 sm:w-56" sizes="240px" preload />
              <p className="meta mt-8 text-center text-fg-subtle">{siteConfig.descriptor}</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="foundation-title" className="border-y border-line bg-surface-1">
        <div className="container-site py-section">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="meta text-accent">Strategic Foundation</p>
              <h2 id="foundation-title" className="mt-4 text-h2 font-medium">
                Design that strengthens value, not only appearance.
              </h2>
            </div>
            <dl className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
              {[
                { label: "Purpose", value: about.purpose },
                { label: "Mission", value: about.mission },
                { label: "Vision", value: about.vision },
                { label: "Brand Promise", value: about.promise },
              ].map((item) => (
                <div key={item.label} className="border-t border-line pt-5">
                  <dt className="meta text-accent">{item.label}</dt>
                  <dd className="mt-3 leading-relaxed text-fg-muted">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="pillars-title" className="container-site py-section">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="meta text-accent">Four Pillars</p>
            <h2 id="pillars-title" className="mt-4 text-h2 font-medium">
              How we work and how we judge the work.
            </h2>
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            {about.pillars.map((pillar) => (
              <li key={pillar.number} className="rounded-[var(--radius-lg)] border border-line bg-surface-1/60 p-6">
                <span className="meta text-accent">{pillar.number}</span>
                <h3 className="mt-4 text-h3 font-medium text-fg">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{pillar.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="clients-title" className="border-y border-line bg-surface-1">
        <div className="container-site py-section">
          <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="meta text-accent">Who We Partner With</p>
              <h2 id="clients-title" className="mt-4 text-h2 font-medium">
                Built for teams buying clarity and momentum.
              </h2>
            </div>
            <p className="text-fg-muted lg:col-span-5 lg:col-start-8">
              Focused, senior-led engagement — not an all-services agency or a one-specialty vendor.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {about.idealClients.map((client) => (
              <div key={client.label} className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-bg/70 p-6">
                <span className="meta text-accent">{client.tier}</span>
                <h3 className="mt-4 text-h3 font-medium text-fg">{client.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{client.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <p className="meta mb-6 text-fg-subtle">Our Delivery Framework</p>
            <AbcdProcessDiagram />
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
