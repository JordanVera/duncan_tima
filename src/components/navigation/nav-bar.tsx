'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/ui/logo';
import { navLinks, siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/cn';
import { spring } from '@/lib/motion';
import { ThemeToggle } from './theme-toggle';
import { ProjectsDisclosure } from './projects-disclosure';
import { MobileMenu } from './mobile-menu';

export type NavProject = {
  slug: string;
  name: string;
  title: string;
  number: string;
  cover: { src: string; width: number; height: number };
};

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavBar({ projects }: { projects: NavProject[] }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, 'change', (y) => setCompact(y > 40));

  const active = navLinks.find((l) => isActive(pathname, l.href))?.href ?? null;
  const highlight = hovered ?? active;
  const talkActive = isActive(pathname, '/contact');

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="container-site flex items-center justify-between pt-3 sm:pt-4 lg:pt-5">
        <Link
          href="/"
          aria-label={`${siteConfig.fullName}, home`}
          className="pointer-events-auto group relative -ml-2 flex items-center rounded-2xl px-3 py-2"
        >
          <span
            aria-hidden
            className={cn(
              'absolute inset-0 rounded-2xl border border-line bg-surface-1/95 shadow-[var(--shadow-float)] backdrop-blur-md transition-opacity duration-300',
              compact ? 'opacity-100' : 'opacity-0',
            )}
          />
          <Logo
            preload
            sizes="180px"
            className={cn(
              'relative origin-left transition-[width] duration-300 ease-out-expo',
              compact ? 'w-32 sm:w-36' : 'w-36 sm:w-44',
            )}
          />
        </Link>

        <nav
          aria-label="Primary"
          className={cn(
            'glass pointer-events-auto hidden items-center gap-1 rounded-full transition-[padding,background-color] duration-300 ease-out-expo lg:flex',
            compact ? 'glass-strong p-1' : 'p-1.5',
          )}
        >
          <ul
            className="flex items-center"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => {
              const isCurrent = active === link.href;
              const isProjects = link.href === '/projects';
              return (
                <li key={link.href} className="relative flex items-center">
                  <Link
                    href={link.href}
                    aria-current={isCurrent ? 'page' : undefined}
                    onMouseEnter={() => setHovered(link.href)}
                    onFocus={() => setHovered(link.href)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      'relative flex h-10 items-center rounded-full px-4 text-sm transition-colors duration-200',
                      isProjects && 'pr-1.5',
                      isCurrent || highlight === link.href
                        ? 'text-fg'
                        : 'text-fg-muted',
                    )}
                  >
                    {highlight === link.href && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={spring}
                        className={cn(
                          'absolute inset-0 rounded-full bg-surface-3',
                          isProjects && '-right-8',
                        )}
                        aria-hidden
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      {isCurrent && (
                        <span
                          className="size-1.5 rounded-full bg-accent"
                          aria-hidden
                        />
                      )}
                      {link.label}
                    </span>
                  </Link>
                  {isProjects && (
                    <ProjectsDisclosure
                      projects={projects}
                      pathname={pathname}
                      onHover={() => setHovered(link.href)}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <span className="mx-1 h-5 w-px bg-line" aria-hidden />
          <ThemeToggle />
          <Link
            href="/contact"
            aria-current={talkActive ? 'page' : undefined}
            className="group ml-1 inline-flex h-10 items-center gap-1.5 rounded-full border border-[#2e4d3b] bg-[#2e4d3b] pl-4 pr-3.5 text-sm font-medium text-[#f6f3eb] transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-[#385d47] active:translate-y-0 dark:border-white/15"
          >
            Start a project
            <ArrowUpRight
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
              aria-hidden
            />
          </Link>
        </nav>

        <MobileMenu projects={projects} pathname={pathname} compact={compact} />
      </div>
    </header>
  );
}
