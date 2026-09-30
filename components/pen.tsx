import type { CSSProperties } from "react";
import type { Ink } from "@/lib/handwriting";

// Draws handwriting from lib/handwriting.ts. Each stroke is its own path so
// CSS can write them in order: pathLength=1 lets one dash cover any stroke,
// and --d / --t carry that stroke's start and length of time from the data.
export function Pen({
  ink,
  className,
  delay = 0,
}: {
  ink: Ink;
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      className={className}
      viewBox={ink.viewBox}
      style={
        {
          "--ink-w": ink.width,
          "--ink-h": ink.height,
          "--ink-base": ink.baseline,
        } as CSSProperties
      }
      aria-hidden
      focusable="false"
    >
      {ink.strokes.map((s, i) => (
        <path
          key={i}
          d={s.d}
          pathLength={1}
          style={{ "--d": `${s.delay + delay}ms`, "--t": `${s.dur}ms` } as CSSProperties}
        />
      ))}
    </svg>
  );
}
