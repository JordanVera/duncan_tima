import { ArrowRight } from "lucide-react";

const layers = [
  { step: "Teams", outcome: "Client ownership", detail: "Every client maps to a team: dedicated for enterprise, regional for platform, Dispatch for exceptions." },
  { step: "Roles", outcome: "Specialization", detail: "10 distinct roles mapped from the lifecycle work, each with clear responsibilities." },
  { step: "Routing logic", outcome: "Predictability", detail: "Rules send tasks to the right person, prioritizing continuity while ensuring coverage." },
];

/** Typographic diagram of the ProofOPS three-layer model. Content is summarized from the case study only. */
export function TeamsRolesRoutingDiagram() {
  return (
    <ol className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
      {layers.map((l, i) => (
        <li key={l.step} className="contents">
          <div className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface-1 p-6">
            <span className="meta text-fg-subtle">Layer {i + 1}</span>
            <span className="mt-6 text-h3 font-medium text-fg">{l.step}</span>
            <span className="mt-1 text-sm text-fg">creates {l.outcome.toLowerCase()}</span>
            <span className="mt-4 text-sm leading-relaxed text-fg-muted">{l.detail}</span>
          </div>
          {i < layers.length - 1 && (
            <span className="flex items-center justify-center py-1 text-fg-subtle md:px-1" aria-hidden>
              <ArrowRight className="size-4 rotate-90 md:rotate-0" strokeWidth={1.5} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
