import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/types";
import { MediaFrame } from "@/components/ui/media-frame";

export function NextProject({ project }: { project: Project }) {
  return (
    <section aria-labelledby="next-project" className="container-site pt-section">
      <Link
        href={`/projects/${project.slug}`}
        className="group grid items-center gap-8 rounded-[var(--radius-xl)] border border-line bg-surface-1 p-4 transition-colors hover:bg-surface-2 md:grid-cols-12 md:p-6"
      >
        <div className="md:col-span-5 md:px-4">
          <p className="meta text-fg-subtle">Next project</p>
          <h2 id="next-project" className="mt-4 text-h1 font-medium">
            {project.name}
          </h2>
          <p className="mt-2 text-lead text-fg-muted">{project.title}</p>
          <span className="mt-8 inline-flex items-center gap-2 text-sm text-fg">
            <span className="border-b border-line-strong pb-0.5 group-hover:border-fg">Read case study</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
          </span>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-lg)] md:col-span-7">
          <MediaFrame
            image={{ ...project.cover, alt: "" }}
            sizes="(min-width: 768px) 55vw, 94vw"
            imageClassName="transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
          />
        </div>
      </Link>
    </section>
  );
}
