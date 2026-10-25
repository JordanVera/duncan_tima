import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, getProjects } from "@/lib/content";
import { ClosingCta } from "@/components/layout/closing-cta";
import { MediaFrame } from "@/components/ui/media-frame";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies from Duncan Tima: Proof client experience redesign, ProofOPS operations task management, and the Userwise LiveOps platform.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <section aria-labelledby="projects-title" className="container-site pb-16 pt-10 md:pb-24 md:pt-16">
        <p className="meta text-fg-subtle">Projects · {projects.length} case studies</p>
        <h1 id="projects-title" className="mt-6 max-w-4xl text-h1 font-medium text-balance">
          Complex systems, designed to be understood.
        </h1>
        <p className="mt-6 max-w-2xl text-lead text-fg-muted">
          Each case study follows the problem from research to shipped decisions, with the screens that came out of it.
        </p>
      </section>

      <ol className="container-site flex flex-col gap-24 md:gap-36">
        {projects.map((project, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group grid gap-8 border-t border-line pt-6 md:grid-cols-12 md:gap-10"
              >
                <div className={cn("flex flex-col md:col-span-4", flip && "md:order-2 md:col-start-9")}>
                  <span className="meta text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-6 text-h2 font-medium">{project.name}</h2>
                  <p className="mt-1 text-lead text-fg-muted">{project.title}</p>
                  <p className="mt-6 leading-relaxed text-fg-muted">{project.summary}</p>
                  <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
                    <div>
                      <dt className="meta text-fg-subtle">Role</dt>
                      <dd className="mt-1.5 text-fg">{project.role}</dd>
                    </div>
                    <div>
                      <dt className="meta text-fg-subtle">Category</dt>
                      <dd className="mt-1.5 text-fg">{project.category}</dd>
                    </div>
                    <div>
                      <dt className="meta text-fg-subtle">Client</dt>
                      <dd className="mt-1.5 text-fg">{project.client}</dd>
                    </div>
                    <div>
                      <dt className="meta text-fg-subtle">Year</dt>
                      <dd className="mt-1.5 text-fg">{formatDate(project.date, "year")}</dd>
                    </div>
                  </dl>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm text-fg md:mt-auto md:pt-8">
                    <span className="border-b border-line-strong pb-0.5 group-hover:border-fg">Read case study</span>
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
                  </span>
                </div>
                <Reveal className={cn("md:col-span-8", flip && "md:order-1 md:col-start-1")}>
                  <div className="overflow-hidden rounded-[var(--radius-xl)]">
                    <MediaFrame
                      image={project.cover}
                      sizes="(min-width: 768px) 62vw, 94vw"
                      preload={i === 0}
                      rounded="rounded-[var(--radius-xl)]"
                      imageClassName="transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
                    />
                  </div>
                </Reveal>
              </Link>
            </li>
          );
        })}
      </ol>

      <ClosingCta />
    </>
  );
}
