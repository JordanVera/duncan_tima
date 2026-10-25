import { cn } from "@/lib/cn";

export function Eyebrow({ children, number, className }: { children: React.ReactNode; number?: string; className?: string }) {
  return (
    <p className={cn("meta flex items-center gap-3 text-fg-subtle", className)}>
      {number && <span className="text-fg">{number}</span>}
      {number && <span className="h-px w-6 bg-line-strong" aria-hidden />}
      <span>{children}</span>
    </p>
  );
}
