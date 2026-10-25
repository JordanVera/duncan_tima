import { getProjects } from '@/lib/content';
import { NavBar, type NavProject } from '@/components/navigation/nav-bar';

export async function SiteHeader() {
  const projects = await getProjects();
  const navProjects: NavProject[] = projects.map((p, i) => ({
    slug: p.slug,
    name: p.name,
    title: p.title,
    number: String(i + 1).padStart(2, '0'),
    cover: { src: p.cover.src, width: p.cover.width, height: p.cover.height },
  }));

  return <NavBar projects={navProjects} />;
}
