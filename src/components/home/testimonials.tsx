import Image from "next/image";
import type { Testimonial } from "@/content/types";
import { Eyebrow } from "@/components/ui/eyebrow";

function Person({ t }: { t: Testimonial }) {
  return (
    <figcaption className="flex items-center gap-3">
      {t.avatar ? (
        <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-line bg-surface-2">
          <Image src={t.avatar.src} alt="" fill sizes="40px" className="object-cover object-[50%_30%]" />
        </span>
      ) : null}
      <span className="flex flex-col">
        <span className="text-sm font-medium text-fg">{t.name}</span>
        <span className="text-sm text-fg-muted">{t.title}</span>
      </span>
    </figcaption>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [featured, ...rest] = items;
  return (
    <section aria-labelledby="testimonials-title" className="container-site py-section">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow number="04">Kind words</Eyebrow>
          <h2 id="testimonials-title" className="mt-6 text-h2 font-medium">
            What people say
          </h2>
        </div>

        <div className="lg:col-span-8">
          <figure className="border-t border-line-strong pt-8">
            <blockquote className="text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.03em] text-balance">
              <p>“{featured.quote}”</p>
            </blockquote>
            <div className="mt-8">
              <Person t={featured} />
            </div>
          </figure>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {rest.map((t) => (
              <figure key={t.name} className="flex flex-col justify-between gap-8 border-t border-line pt-6">
                <blockquote className="text-lead text-fg">
                  <p>“{t.quote}”</p>
                </blockquote>
                <Person t={t} />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
