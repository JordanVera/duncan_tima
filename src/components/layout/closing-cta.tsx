import { ButtonLink } from "@/components/ui/button-link";
import { discoveryCall } from "@/lib/site-config";

export function ClosingCta({
  eyebrow = "Start a project",
  title = "Have a complex product that needs to feel simple?",
  body = "Tell me what you’re building and where people get stuck. Prefer to talk it through first? Request a discovery call.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="closing-cta" className="container-site py-section">
      <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-surface-1 px-6 py-16 sm:px-12 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]"
        />
        <div className="relative max-w-3xl">
          <p className="meta mb-6 text-fg-subtle">{eyebrow}</p>
          <h2 id="closing-cta" className="text-h1 font-medium text-balance">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lead text-fg-muted">{body}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact" size="lg">
              Start an inquiry
            </ButtonLink>
            <ButtonLink href={discoveryCall.href} variant="secondary" size="lg" external={discoveryCall.external} icon={discoveryCall.external ? "external" : "arrow"}>
              {discoveryCall.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
