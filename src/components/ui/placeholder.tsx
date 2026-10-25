import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/** Neutral stand-in for an asset that has not been supplied yet. Never presented as real work. */
export function AssetPlaceholder({ label, file, className }: { label: string; file: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} (image pending)`}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-line-strong bg-surface-1 p-6 text-center",
        className,
      )}
    >
      <ImageIcon className="size-5 text-fg-subtle" strokeWidth={1.5} aria-hidden />
      <p className="text-sm text-fg-muted">Image pending: {label}</p>
      {process.env.NODE_ENV === "development" && <p className="meta text-fg-subtle normal-case">{file}</p>}
    </div>
  );
}
