import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  getAbout,
  getProjects,
  getServices,
  getTestimonials,
} from '@/lib/content';
import { HeroClarity } from '@/components/home/hero-clarity';
import { Testimonials } from '@/components/home/testimonials';
import { ProjectCard } from '@/components/projects/project-card';
import { ClosingCta } from '@/components/layout/closing-cta';
import { ButtonLink } from '@/components/ui/button-link';
import { Eyebrow } from '@/components/ui/eyebrow';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const [projects, services, about, testimonials] = await Promise.all([
    getProjects(),
    getServices(),
    getAbout(),
    getTestimonials(),
  ]);
  const [opusOrtho, amplify, aioko] = projects;

  return (
    <>
      {/* Opening */}
      <section aria-labelledby="hero-title" className="relative">
        <HeroClarity className="container-site pb-10 pt-6 md:pb-14 lg:pt-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p
                data-hero-item="meta"
                className="meta flex items-center gap-3 text-fg-muted"
              >
                <span className="size-2 rounded-full bg-accent" aria-hidden />
                {siteConfig.name} — {siteConfig.descriptor}
              </p>
              <h1 id="hero-title" className="mt-8 text-display font-medium">
                <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                  <span
                    data-hero-line="complex"
                    className="block text-fg-muted"
                  >
                    Good design is
                  </span>
                </span>
                <span data-hero-line="clear" className="block">
                  just the beginning.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <p
                data-hero-item="lead"
                className="max-w-md text-lead text-fg-muted"
              >
                We help ambitious businesses move forward through thoughtful
                brands, better digital experiences, and purposeful products.
              </p>
              <div
                data-hero-item="actions"
                className="mt-8 flex flex-wrap gap-3"
              >
                <ButtonLink href="/projects">Explore our work</ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Start an inquiry
                </ButtonLink>
              </div>
            </div>
          </div>
        </HeroClarity>
      </section>

      {/* Selected work */}
      <section
        aria-labelledby="work-title"
        className="container-site py-section"
      >
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow number="01">Selected work</Eyebrow>
            <h2
              id="work-title"
              className="mt-6 max-w-2xl text-h2 font-medium text-balance"
            >
              Creative by nature. Strategic by design.
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 self-start text-sm text-fg-muted transition-colors hover:text-fg md:self-auto"
          >
            All case studies
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              strokeWidth={1.75}
              aria-hidden
            />
          </Link>
        </div>

        <ProjectCard
          project={opusOrtho}
          index={0}
          feature
          sizes="(min-width: 1024px) 62vw, 94vw"
        />

        <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-12 md:gap-8">
          <ProjectCard
            project={amplify}
            index={1}
            className="md:col-span-7"
            sizes="(min-width: 768px) 56vw, 94vw"
          />
          <ProjectCard
            project={aioko}
            index={2}
            className="md:col-span-5 md:mt-40"
            sizes="(min-width: 768px) 40vw, 94vw"
          />
        </div>
      </section>

      {/* Capabilities & ABCD Method */}
      <section
        aria-labelledby="services-title"
        className="border-y border-line bg-surface-1"
      >
        <div className="container-site grid gap-12 py-section lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow number="02">Capabilities</Eyebrow>
            <h2
              id="services-title"
              className="mt-6 text-h2 font-medium text-balance"
            >
              Brand, digital, and product design working as one system.
            </h2>
            <p className="mt-6 max-w-md text-fg-muted">{services.intro}</p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {about.methodology.map((step) => (
                <div
                  key={step.letter}
                  className="rounded-[var(--radius-md)] border border-line bg-bg/60 px-3.5 py-3"
                >
                  <span className="meta text-accent">{step.letter}</span>
                  <p className="mt-1 text-sm font-medium text-fg">
                    {step.word}
                  </p>
                </div>
              ))}
            </div>

            <ButtonLink href="/services" variant="secondary" className="mt-10">
              Explore services &amp; method
            </ButtonLink>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {services.items.map((s) => (
              <li
                key={s.number}
                className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-7 first:border-t-0 lg:first:border-t"
              >
                <span className="meta pt-2 text-accent">{s.number}</span>
                <div>
                  <h3 className="text-h3 font-medium">{s.name}</h3>
                  <p className="mt-2 max-w-md text-fg-muted">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Consultancy intro */}
      <section
        aria-labelledby="about-title"
        className="container-site py-section"
      >
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow number="03">The Consultancy</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <h2 id="about-title" className="text-h2 font-medium text-balance">
              {about.centralIdea.split('. ').slice(0, 2).join('. ')}.
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <p className="text-fg-muted">{about.positioning}</p>
              <p className="text-fg-muted">{about.purpose}</p>
            </div>
            <div className="mt-12 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-fg-muted">
                Four pillars:{' '}
                <span className="text-fg">
                  Intention · Connected Thinking · Partnership · Outcomes
                </span>
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm text-fg"
              >
                <span className="border-b border-line-strong pb-0.5 group-hover:border-fg">
                  Strategy &amp; approach
                </span>
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} />

      <ClosingCta />
    </>
  );
}
