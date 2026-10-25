/**
 * Content access layer. Pages and components only call these functions,
 * so swapping local data for a CMS (e.g. Sanity GROQ queries) only changes
 * the bodies below, not the page components.
 */
import { about } from '@/content/about';
import { projects } from '@/content/projects';
import { services, servicesIntro } from '@/content/services';
import { testimonials } from '@/content/testimonials';
import type { CaseStudyBlock, Project } from '@/content/types';

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProjectSlugs(): Promise<string[]> {
  return projects.map((p) => p.slug);
}

export async function getProject(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getNextProject(slug: string): Promise<Project> {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}

export async function getServices() {
  return { intro: servicesIntro, items: services };
}

export async function getAbout() {
  return about;
}

export async function getTestimonials() {
  return testimonials;
}

export type SectionLink = { id: string; label: string };

export function getSectionIndex(blocks: CaseStudyBlock[]): SectionLink[] {
  return blocks.flatMap((b) =>
    b.type === 'sectionHeading' ? [{ id: b.id, label: b.eyebrow }] : [],
  );
}

export function formatDate(iso: string, style: 'long' | 'year' = 'long') {
  const date = new Date(`${iso}T12:00:00Z`);
  if (style === 'year') return String(date.getUTCFullYear());
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
