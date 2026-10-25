const trimSlash = (url: string) => url.replace(/\/+$/, '');

export const siteConfig = {
  name: 'Duncan Tima',
  jobTitle: 'UI/UX and Product Designer',
  description:
    'Duncan Tima is a UI/UX and product designer who brings visual craft and product thinking together to make complex products clear and easy to use.',
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
    light: { src: '/images/logo_main_white.png', width: 875, height: 649 },
    dark: { src: '/images/logo_main_black.png', width: 875, height: 649 },
  },
} as const;

export const navLinks = [
  { href: '/projects', label: 'Projects' },
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
        'Discovery call request',
        "Hi Duncan,\n\nI'd like to schedule a discovery call.\n\nA few times that work for me:\n\nWhat I'd like to discuss:\n",
      ),
      label: 'Request a discovery call by email',
      external: false,
    };
