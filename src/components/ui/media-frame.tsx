import Image from "next/image";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Frames project imagery at its native aspect ratio so screenshots are never
 * cropped. `fit: "cover"` is only honored when an explicit `aspect` is passed.
 */
export function MediaFrame({
  image,
  sizes,
  aspect,
  preload = false,
  className,
  imageClassName,
  rounded = "rounded-[var(--radius-lg)]",
}: {
  image: ImageAsset;
  sizes: string;
  aspect?: string;
  preload?: boolean;
  className?: string;
  imageClassName?: string;
  rounded?: string;
}) {
  const ratio = aspect ?? `${image.width} / ${image.height}`;
  const fit = aspect && image.fit === "cover" ? "object-cover" : "object-contain";
  return (
    <div
      className={cn("relative w-full overflow-hidden border border-line bg-media", rounded, className)}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={preload}
        quality={85}
        className={cn(fit, imageClassName)}
      />
    </div>
  );
}
