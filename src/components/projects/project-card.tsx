import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/types";
import { formatDate } from "@/lib/content";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/** A whole-card link with media, metadata, and summary always visible (no hover-only content). */
export function ProjectCard({
  project,
  index,
  sizes,
  headingLevel = "h3",
  showSummary = true,
  feature = false,
  className,
}: {
  project: Project;
  index: number;
  sizes: string;
  headingLevel?: "h2" | "h3";
  showSummary?: boolean;
  /** Wide split layout: large media beside its details. */
  feature?: boolean;
  className?: string;
}) {
  const Heading = headingLevel;
  if (feature) {
    return (
      <Reveal className={className}>
        <Link href={`/projects/${project.slug}`} className="group grid gap-8 rounded-[var(--radius-lg)] lg:grid-cols-12 lg:gap-10">
          <div className="overflow-hidden rounded-[var(--radius-xl)] lg:col-span-8">
            <MediaFrame
              image={project.cover}
              sizes={sizes}
              rounded="rounded-[var(--radius-xl)]"
              imageClassName="transition-transform duration-700 ease-out-expo group-hover:scale-[1.025]"
            />
          </div>
          <div className="flex flex-col lg:col-span-4 lg:pb-2">
            <span className="meta text-fg-subtle">{String(index + 1).padStart(2, "0")} · Featured</span>
            <Heading className="mt-5 text-h2 font-medium">
              {project.name}
              <span className="block text-fg-muted">{project.title}</span>
            </Heading>
            <p className="mt-5 leading-relaxed text-fg-muted">{project.summary}</p>
            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm lg:mt-auto">
              <div>
                <dt className="meta text-fg-subtle">Role</dt>
                <dd className="mt-1.5 text-fg">{project.role}</dd>
              </div>
              <div>
                <dt className="meta text-fg-subtle">Year</dt>
                <dd className="mt-1.5 text-fg">{formatDate(project.date, "year")}</dd>
              </div>
            </dl>
            <span className="mt-6 inline-flex items-center gap-2 text-sm text-fg">
              <span className="border-b border-line-strong pb-0.5 transition-colors group-hover:border-fg">Read case study</span>
              <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
            </span>
          </div>
        </Link>
      </Reveal>
    );
  }
  return (
    <Reveal className={className}>
      <Link href={`/projects/${project.slug}`} className="group block rounded-[var(--radius-lg)]">
        <div className="overflow-hidden rounded-[var(--radius-lg)]">
          <MediaFrame
            image={project.cover}
            sizes={sizes}
            imageClassName="transition-transform duration-700 ease-out-expo group-hover:scale-[1.025]"
          />
        </div>
        <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-[auto_1fr_auto] sm:items-baseline">
          <span className="meta text-fg-subtle">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <Heading className="text-h3 font-medium">
              {project.name}
              <span className="text-fg-muted"> — {project.title}</span>
            </Heading>
            {showSummary && <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-fg-muted">{project.summary}</p>}
          </div>
          <span className="meta flex items-center gap-2 text-fg-subtle sm:justify-end">
            <span>{project.role}</span>
            <span aria-hidden>·</span>
            <span>{formatDate(project.date, "year")}</span>
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-2 text-sm text-fg sm:ml-[calc(2ch+1.5rem)]">
          <span className="border-b border-line-strong pb-0.5 transition-colors group-hover:border-fg">Read case study</span>
          <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
        </span>
      </Link>
    </Reveal>
  );
}

export function ProjectMeta({ project, className }: { project: Project; className?: string }) {
  const rows = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Service", value: project.service },
    { label: "Date", value: formatDate(project.date) },
  ];
  return (
    <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 md:grid-cols-4", className)}>
      {rows.map((r) => (
        <div key={r.label}>
          <dt className="meta text-fg-subtle">{r.label}</dt>
          <dd className="mt-2 text-[0.95rem] text-fg">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
