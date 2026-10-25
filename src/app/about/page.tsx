import type { Metadata } from "next";
import { getAbout } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { ClosingCta } from "@/components/layout/closing-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { MediaFrame } from "@/components/ui/media-frame";
import { AssetPlaceholder } from "@/components/ui/placeholder";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Duncan Tima: a designer who brings a visual design background into product thinking, systems, and usability. Experience at OEC, Signet Jewelers, City Furniture, and Spaces+Co.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const about = await getAbout();
  const [firstSentence, ...rest] = about.intro.split(". ");

  return (
    <>
      <section aria-labelledby="about-title" className="container-site pb-section pt-10 md:pt-16">
        <p className="meta text-fg-subtle">About</p>
        <div className="mt-6 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 id="about-title" className="text-h1 font-medium text-balance">
              {firstSentence}.
            </h1>
            <p className="mt-8 max-w-xl text-lead text-fg-muted">{rest.join(". ")}</p>
            <p className="mt-6 max-w-xl text-fg-muted">{about.positioning}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Start an inquiry</ButtonLink>
              <ButtonLink href={siteConfig.linkedin} variant="secondary" external>
                LinkedIn
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            {about.portrait ? (
              <MediaFrame image={about.portrait} aspect="4 / 5" sizes="(min-width: 1024px) 30vw, 94vw" preload />
            ) : (
              <AssetPlaceholder
                label="Portrait of Duncan"
                file="public/images/about/duncan-tima-portrait.jpg"
                className="aspect-[4/5]"
              />
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="experience-title" className="border-y border-line bg-surface-1">
        <div className="container-site grid gap-10 py-section lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="meta text-fg-subtle">Experience</p>
            <h2 id="experience-title" className="mt-4 text-h2 font-medium">
              From graphic design to product.
            </h2>
          </div>
          <ol className="lg:col-span-8">
            {about.experience.map((e) => (
              <li
                key={`${e.role}-${e.years}`}
                className="grid grid-cols-[6.5rem_1fr] gap-x-6 gap-y-1 border-t border-line py-6 first:border-t-0 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline"
              >
                <span className="meta row-span-2 pt-1 text-fg-subtle sm:row-span-1">{e.years}</span>
                <span className="text-lg font-medium text-fg">{e.role}</span>
                <span className="text-fg-muted sm:text-right">{e.company}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="personal-title" className="container-site py-section">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="meta text-fg-subtle lg:col-span-4">Outside of design</p>
          <div className="lg:col-span-8">
            <h2 id="personal-title" className="sr-only">
              Outside of design
            </h2>
            <p className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-[1.25] tracking-[-0.025em] text-balance">
              {about.personal}
            </p>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
