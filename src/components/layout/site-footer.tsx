import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { navLinks, siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-site grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="flex flex-col gap-5 md:col-span-5">
          <Link
            href="/"
            aria-label={`${siteConfig.fullName}, home`}
            className="w-fit rounded-xl"
          >
            <Logo className="w-48" sizes="200px" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-fg-muted">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="meta mb-4 text-fg-subtle">Consultancy</p>
          <ul className="flex flex-col gap-1 text-sm">
            {[...navLinks, { href: '/contact', label: 'Contact' }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-block py-1.5 text-fg-muted transition-colors hover:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="meta mb-4 text-fg-subtle">Inquiries</p>
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-block py-1.5 text-fg-muted hover:text-fg"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.phone.href}
                className="inline-block py-1.5 text-fg-muted hover:text-fg"
              >
                {siteConfig.phone.display}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1.5 text-fg-muted hover:text-fg"
              >
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-site flex flex-col gap-2 border-t border-line py-6 text-xs text-fg-subtle sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {siteConfig.fullName}</p>
        <p>{siteConfig.descriptor}</p>
      </div>
    </footer>
  );
}
