import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-inverse text-on-inverse hover:-translate-y-px",
  secondary: "border border-line-strong text-fg hover:bg-surface-2",
  ghost: "text-fg-muted hover:text-fg px-0!",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  icon = external ? "external" : "arrow",
  className,
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  icon?: "arrow" | "external" | "none";
  className?: string;
  size?: "md" | "lg";
}) {
  const Icon = icon === "external" ? ArrowUpRight : ArrowRight;
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,background-color,color] duration-200 ease-out-expo",
    size === "lg" ? "h-14 px-7 text-base" : "h-12 px-6 text-[0.95rem]",
    variants[variant],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {icon !== "none" && (
        <Icon
          className={cn(
            "size-4 transition-transform duration-300 ease-out-expo",
            icon === "external" ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : "group-hover:translate-x-1",
          )}
          strokeWidth={1.75}
          aria-hidden
        />
      )}
    </>
  );

  const isNative = external || href.startsWith("mailto:") || href.startsWith("tel:");
  if (isNative) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
