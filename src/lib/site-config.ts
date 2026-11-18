const trimSlash = (url: string) => url.replace(/\/+$/, '');

export const siteConfig = {
  name: 'ABCD',
  fullName: 'ABCD — A Better Creative Direction',
  descriptor: 'Independent Creative Consultancy',
  tagline: 'Good design is just the beginning.',
  description:
    'ABCD — A Better Creative Direction is an independent multidisciplinary design consultancy specializing in brand design, digital experiences, and product design.',
  url: trimSlash(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  email: 'mrduncantima@gmail.com',
  phone: {
    display: '954.279.7660',
    href: 'tel:+19542797660',
  },
  linkedin: 'https://linkedin.com/in/duncan-t-328014127',
  /** Optional scheduling link (Cal.com, Calendly, etc.). Falls back to an email request when unset. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || null,
  logo: {
    horizontal: {
      light: {
        src: '/images/logos/trimmed/abcd_logo_hor.png',
        width: 1056,
        height: 308,
      },
      dark: {
        src: '/images/logos/trimmed/abcd_logo_hor_wht.png',
        width: 1056,
        height: 308,
      },
    },
    stacked: {
      light: {
        src: '/images/logos/trimmed/abcd_logo_vert.png',
        width: 758,
        height: 360,
      },
      dark: {
        src: '/images/logos/trimmed/abcd_logo_vert_wht.png',
        width: 758,
        height: 360,
      },
    },
    icon: {
      light: {
        src: '/images/logos/trimmed/abcd_main_icon.png',
        width: 680,
        height: 1058,
      },
      dark: {
        src: '/images/logos/trimmed/abcd_main_icon_wht.png',
        width: 680,
        height: 1058,
      },
    },
    vertical: {
      light: {
        src: '/images/logos/trimmed/abcd_vert2.png',
        width: 704,
        height: 857,
      },
      dark: {
        src: '/images/logos/trimmed/abcd_vert2_wht.png',
        width: 704,
        height: 857,
      },
    },
  },
} as const;

export const navLinks = [
  { href: '/projects', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
] as const;

export function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set('body', body);
  return `mailto:${siteConfig.email}?${params.toString().replace(/\+/g, '%20')}`;
}

export const discoveryCall = siteConfig.bookingUrl
  ? {
      href: siteConfig.bookingUrl,
      label: 'Book a discovery call',
      external: true,
    }
  : {
      href: mailto(
        'Discovery call request — ABCD',
        "Hi ABCD team,\n\nWe'd like to schedule a discovery call.\n\nA few times that work for us:\n\nWhat we're looking to build or solve:\n",
      ),
      label: 'Request a discovery call',
      external: false,
    };
