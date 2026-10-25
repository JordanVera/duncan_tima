import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/cn";

/** Both variants render; CSS shows the one matching the active theme, so there is no hydration mismatch. */
export function Logo({ className, preload = false }: { className?: string; preload?: boolean }) {
  const { light, dark } = siteConfig.logo;
  return (
    <span className={cn("relative block aspect-[875/649]", className)}>
      <Image
        src={light.src}
        width={light.width}
        height={light.height}
        alt=""
        preload={preload}
        loading={preload ? "eager" : "lazy"}
        sizes="96px"
        className="logo-light h-full w-full object-contain"
      />
      <Image
        src={dark.src}
        width={dark.width}
        height={dark.height}
        alt=""
        preload={preload}
        loading={preload ? "eager" : "lazy"}
        sizes="96px"
        className="logo-dark h-full w-full object-contain"
      />
    </span>
  );
}
