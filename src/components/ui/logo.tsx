import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/cn';

type LogoVariant = keyof typeof siteConfig.logo;

/** Both variants render; CSS shows the one matching the active theme, so there is no hydration mismatch. */
export function Logo({
  variant = 'horizontal',
  className,
  preload = false,
  sizes = '200px',
}: {
  variant?: LogoVariant;
  className?: string;
  preload?: boolean;
  sizes?: string;
}) {
  const { light, dark } = siteConfig.logo[variant];
  return (
    <span
      className={cn('relative block', className)}
      style={{ aspectRatio: `${light.width} / ${light.height}` }}
    >
      <Image
        src={light.src}
        width={light.width}
        height={light.height}
        alt=""
        preload={preload}
        loading={preload ? 'eager' : 'lazy'}
        sizes={sizes}
        className="logo-light h-full w-full object-contain"
      />
      <Image
        src={dark.src}
        width={dark.width}
        height={dark.height}
        alt=""
        preload={preload}
        loading={preload ? 'eager' : 'lazy'}
        sizes={sizes}
        className="logo-dark h-full w-full object-contain"
      />
    </span>
  );
}
