"use client";

import { toggleTheme, useTheme } from "@/lib/theme";

/**
 * Terminal-style accent switch in the nav: a filled swatch (rendered in the
 * live accent via `bg-neon`, so it recolors itself) plus the current mode name.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const next = theme === "blue" ? "green" : "blue";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch accent to ${next}`}
      title={`Switch accent to ${next}`}
      className={`flex items-center gap-1.5 rounded-md border border-hairline px-2 py-1 font-mono text-[11px] leading-none text-dim transition-colors duration-200 hover:border-neon/40 hover:text-neon focus-visible:outline-none ${className}`}
    >
      <span
        aria-hidden
        className="h-2.5 w-2.5 rounded-full bg-neon shadow-[0_0_8px_var(--neon-soft)] transition-colors duration-200"
      />
      <span>{theme === "blue" ? "blue" : "green"}</span>
    </button>
  );
}
