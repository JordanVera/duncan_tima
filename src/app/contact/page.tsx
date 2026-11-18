import type { Metadata } from "next";
import { ArrowUpRight, CalendarDays, Mail, Phone, Building2 } from "lucide-react";
import { discoveryCall, siteConfig } from "@/lib/site-config";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project inquiry with ABCD — A Better Creative Direction. Tell us what you’re building or request a discovery call.",
  alternates: { canonical: "/contact" },
};

const direct = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.phone.display, href: siteConfig.phone.href },
  { icon: Building2, label: "LinkedIn", value: "ABCD Consultancy", href: siteConfig.linkedin, external: true },
];

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-title" className="container-site pb-section pt-10 md:pt-16">
      <p className="meta text-accent">Contact</p>
      <div className="mt-6 grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h1 id="contact-title" className="text-h1 font-medium text-balance">
            Let’s set a better creative direction.
          </h1>
          <p className="mt-8 max-w-md text-lead text-fg-muted">
            Tell us about your business, your product, and where clarity is missing. The more context you share, the more focused our first conversation will be.
          </p>

          <div className="mt-12 rounded-[var(--radius-lg)] border border-line bg-surface-1 p-6 sm:p-7">
            <CalendarDays className="size-5 text-accent" strokeWidth={1.5} aria-hidden />
            <h2 className="mt-5 text-lg font-medium">Prefer to talk it through first?</h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              {siteConfig.bookingUrl
                ? "Pick a time that works for your team for an introductory discovery call."
                : "Send a quick note with a few times that work for your team, and we’ll confirm a discovery call."}
            </p>
            <ButtonLink href={discoveryCall.href} external={discoveryCall.external} variant="secondary" className="mt-6">
              {discoveryCall.label}
            </ButtonLink>
          </div>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {direct.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 py-4"
                >
                  <Icon className="size-4 text-fg-subtle" strokeWidth={1.75} aria-hidden />
                  <span className="meta w-20 text-fg-subtle">{label}</span>
                  <span className="text-fg transition-colors group-hover:text-fg-muted">{value}</span>
                  {external && (
                    <>
                      <ArrowUpRight className="ml-auto size-4 text-fg-subtle" strokeWidth={1.75} aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-[var(--radius-xl)] border border-line bg-surface-1/60 p-6 sm:p-10">
            <h2 className="text-h3 font-medium">Project inquiry</h2>
            <div className="mt-6">
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
