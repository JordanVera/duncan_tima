"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

const subscribe = () => () => {};

export function ThemeToggle({ className, withLabel = false }: { className?: string; withLabel?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known on the client; render a neutral, stable shell until hydrated.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = mounted ? resolvedTheme !== "light" : true;
  const next = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={mounted ? `Switch to ${next} theme` : "Toggle theme"}
      title={mounted ? `Switch to ${next} theme` : undefined}
      className={cn(
        "relative inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-full px-2.5 text-fg-muted transition-colors duration-200 hover:bg-surface-2 hover:text-fg",
        className,
      )}
    >
      <span className="relative block size-4" aria-hidden>
        <Sun
          className="absolute inset-0 size-4 scale-100 rotate-0 opacity-100 transition-[opacity,transform] duration-300 ease-out-expo dark:scale-50 dark:rotate-90 dark:opacity-0"
          strokeWidth={1.75}
        />
        <Moon
          className="absolute inset-0 size-4 scale-50 -rotate-90 opacity-0 transition-[opacity,transform] duration-300 ease-out-expo dark:scale-100 dark:rotate-0 dark:opacity-100"
          strokeWidth={1.75}
        />
      </span>
      {withLabel && (
        <span className="text-sm text-fg" aria-hidden>
          {mounted ? (isDark ? "Dark" : "Light") : "Theme"}
        </span>
      )}
    </button>
  );
}
