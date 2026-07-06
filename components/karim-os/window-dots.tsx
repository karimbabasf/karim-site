"use client";

/*
 * The corner macOS traffic-lights, turned into a hidden easter egg. Hovering
 * reveals the window glyphs (× – +); the green "maximize" dot opens Tetris,
 * while red / yellow give a playful nudge. Matches house style (framer-motion,
 * custom ease, reduced-motion aware). Interactive elements get the site's neon
 * hand cursor automatically via globals.css.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1] as const;

type DotKey = "red" | "yellow" | "green";
const DOTS: { key: DotKey; color: string; glyph: string; label: string }[] = [
  { key: "red", color: "#ff5f57", glyph: "×", label: "Close" },
  { key: "yellow", color: "#febc2e", glyph: "–", label: "Minimize" },
  { key: "green", color: "#28c840", glyph: "+", label: "Play Tetris (easter egg)" },
];

export default function WindowDots({ onGreen }: { onGreen: () => void }) {
  const reduce = useReducedMotion();
  const [gag, setGag] = useState<{ id: number; text: string; shake: DotKey } | null>(null);
  const idRef = useRef(0);
  const timer = useRef<number | null>(null);

  const flash = (text: string, shake: DotKey) => {
    idRef.current += 1;
    setGag({ id: idRef.current, text, shake });
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setGag(null), 1600);
  };
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const handle = (key: DotKey) => {
    if (key === "green") onGreen();
    else if (key === "red") flash("can't close the grind", "red");
    else flash("not today ↓", "yellow");
  };

  return (
    <div className="group relative flex items-center gap-2">
      {DOTS.map((d) => (
        <motion.button
          key={d.key}
          type="button"
          aria-label={d.label}
          onClick={() => handle(d.key)}
          className="relative grid h-[11px] w-[11px] place-items-center rounded-full"
          style={{ background: d.color }}
          whileHover={reduce ? undefined : { scale: 1.2 }}
          whileTap={reduce ? undefined : { scale: 0.88 }}
          animate={gag?.shake === d.key && !reduce ? { x: [0, -2.5, 2.5, -2, 2, 0] } : { x: 0 }}
          transition={{ duration: 0.34, ease: EASE }}
        >
          <span
            aria-hidden
            className="pointer-events-none font-bold leading-none text-black/65 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            style={{ fontSize: 8 }}
          >
            {d.glyph}
          </span>
        </motion.button>
      ))}

      <AnimatePresence>
        {gag && (
          <motion.span
            key={gag.id}
            initial={{ opacity: 0, y: reduce ? 0 : -5, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : -4 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="pointer-events-none absolute left-0 top-[calc(100%+9px)] z-50 whitespace-nowrap rounded-md border border-white/10 bg-black px-2 py-1 font-mono text-[10px] text-white/70 shadow-lg"
          >
            {gag.text}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
