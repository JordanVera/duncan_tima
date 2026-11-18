import type { Project } from '@/content/types';
import { siteConfig } from './site-config';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    telephone: '+1-954-279-7660',
    sameAs: [siteConfig.linkedin],
  };
}

export function caseStudyJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${project.name} — ${project.title}`,
    description: project.summary,
    dateCreated: project.date,
    url: `${siteConfig.url}/projects/${project.slug}`,
    image: `${siteConfig.url}${project.cover.src}`,
    author: {
      '@type': 'Organization',
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
