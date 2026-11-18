import { ArrowRight } from "lucide-react";
import { about } from "@/content/about";

/** Four-stage ABCD consultancy process diagram (Assess -> Build -> Create -> Deliver). */
export function AbcdProcessDiagram() {
  return (
    <ol className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch">
      {about.methodology.map((step, i) => (
        <li key={step.letter} className="contents">
          <div className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface-1 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="grid size-8 place-items-center rounded-lg bg-accent/15 font-display text-sm font-semibold text-accent">
                {step.letter}
              </span>
              <span className="meta text-fg-subtle">0{i + 1}</span>
            </div>
            <span className="mt-5 font-display text-h3 font-medium text-fg">{step.word}</span>
            <span className="mt-3 text-sm leading-relaxed text-fg-muted">{step.summary}</span>
          </div>
          {i < about.methodology.length - 1 && (
            <span className="flex items-center justify-center py-1 text-fg-subtle md:px-0.5" aria-hidden>
              <ArrowRight className="size-4 rotate-90 md:rotate-0" strokeWidth={1.5} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
