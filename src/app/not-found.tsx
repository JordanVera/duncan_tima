import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjects } from '@/lib/content';
import { ButtonLink } from '@/components/ui/button-link';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default async function NotFound() {
  const projects = await getProjects();
  return (
    <section
      aria-labelledby="nf-title"
      className="container-site pb-section pt-10 md:pt-20"
    >
      <p className="meta text-fg-subtle">404 · Page not found</p>
      <h1
        id="nf-title"
        className="mt-6 max-w-3xl text-h1 font-medium text-balance"
      >
        This page doesn’t exist, but the work does.
      </h1>
      <p className="mt-6 max-w-xl text-lead text-fg-muted">
        The link may be out of date. Older project links now live under
        Projects.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/projects">View projects</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Back to home
        </ButtonLink>
      </div>
      <ul className="mt-16 max-w-2xl border-t border-line">
        {projects.map((p) => (
          <li key={p.slug} className="border-b border-line">
            <Link
              href={`/projects/${p.slug}`}
              className="flex min-h-14 items-center justify-between gap-4 py-3 hover:text-fg"
            >
              <span className="font-medium text-fg">{p.name}</span>
              <span className="text-sm text-fg-muted">{p.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
