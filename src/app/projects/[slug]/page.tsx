import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, getNextProject, getProject, getProjectSlugs, getSectionIndex } from "@/lib/content";
import { caseStudyJsonLd, JsonLd } from "@/lib/seo";
import { BlockRenderer } from "@/components/case-study/blocks";
import { NextProject } from "@/components/case-study/next-project";
import { SectionIndex } from "@/components/case-study/section-index";
import { ClosingCta } from "@/components/layout/closing-cta";
import { ProjectMeta } from "@/components/projects/project-card";
import { MediaFrame } from "@/components/ui/media-frame";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProject(slug);
  if (!project) return {};
  const title = `${project.name} — ${project.title}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: [{ url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.cover.alt }],
    },
    twitter: { card: "summary_large_image", title, description: project.summary, images: [project.cover.src] },
  };
}

export default async function CaseStudyPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = await getProject(slug);
  if (!project) notFound();
  const next = await getNextProject(slug);
  const sections = getSectionIndex(project.blocks);

  return (
    <article>
      <header className="container-site pt-8 md:pt-14">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.75} aria-hidden />
          All projects
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="meta text-fg-subtle">
              {project.category} · {formatDate(project.date, "year")}
            </p>
            <h1 className="mt-5 text-h1 font-medium">
              {project.name}
              <span className="block text-fg-muted">{project.title}</span>
            </h1>
          </div>
          <p className="text-lead text-fg-muted lg:col-span-5">{project.summary}</p>
        </div>

        <ProjectMeta project={project} className="mt-12" />

        <div className="mt-10">
          <MediaFrame image={project.cover} sizes="(min-width: 1408px) 1344px, 94vw" preload rounded="rounded-[var(--radius-xl)]" />
        </div>
      </header>

      <div className="container-site mt-section grid gap-12 xl:grid-cols-12">
        <aside className="hidden xl:col-span-3 xl:block">
          <SectionIndex sections={sections} label={`${project.name} sections`} />
        </aside>
        <div className="min-w-0 xl:col-span-9">
          <BlockRenderer blocks={project.blocks} />
        </div>
      </div>

      <NextProject project={next} />
      <ClosingCta
        eyebrow="Work together"
        title="Working on something with this kind of complexity?"
      />
      <JsonLd data={caseStudyJsonLd(project)} />
    </article>
  );
}
