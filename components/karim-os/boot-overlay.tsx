"use client";

/*
 * Full-screen "terminal window" that plays the KARIM_OS boot sequence via a
 * Remotion <Player>. It is dynamically imported by site-shell.tsx (ssr:false)
 * only after the easter egg is first opened, so the Remotion bundle never
 * touches the initial page load. Mirrors the app's overlay conventions:
 * AnimatePresence, custom ease, Escape-to-close, reduced-motion aware.
 */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { PlayerRef } from "@remotion/player";
import { KarimBoot } from "./karim-boot";

const Player = dynamic(() => import("@remotion/player").then((m) => m.Player), {
  ssr: false,
});

const EASE = [0.23, 1, 0.32, 1] as const;
const FPS = 30;
const DURATION = 270;
const W = 1280;
const H = 800;

export default function BootOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const [accent, setAccent] = useState("#a3f04b");
  const ref = useRef<PlayerRef>(null);

  useEffect(() => {
    if (!open) return;
    // Follow the live theme (green / blue) so the boot matches the site.
    const neon = getComputedStyle(document.documentElement).getPropertyValue("--neon").trim();
    if (neon) setAccent(neon);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const replay = () => {
    ref.current?.seekTo(0);
    ref.current?.play();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="KARIM_OS boot sequence"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.12 : 0.26, ease: EASE }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-[880px] overflow-hidden rounded-xl border border-white/10"
            style={{
              boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 40px 120px -30px rgba(0,0,0,0.9), 0 0 90px -34px ${accent}`,
            }}
            initial={{ opacity: 0, y: reduce ? 0 : 18, scale: reduce ? 1 : 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.99 }}
            transition={{ duration: reduce ? 0.14 : 0.36, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* title bar — the red dot actually closes here (the meta joke) */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-black px-3.5 py-2.5">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="group grid h-3 w-3 place-items-center rounded-full bg-[#ff5f57]"
              >
                <span className="text-[7px] font-bold leading-none text-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  ×
                </span>
              </button>
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
              <span className="ml-2 font-mono text-[11px] text-white/45">karim@portfolio — ~/boot</span>
            </div>

            {/* the composition */}
            <div className="bg-[#060708]" style={{ aspectRatio: `${W} / ${H}` }}>
              <Player
                ref={ref}
                component={KarimBoot}
                inputProps={{ accent }}
                durationInFrames={DURATION}
                fps={FPS}
                compositionWidth={W}
                compositionHeight={H}
                style={{ width: "100%", height: "100%" }}
                autoPlay={!reduce}
                initialFrame={reduce ? DURATION - 1 : 0}
                clickToPlay={false}
                doubleClickToFullscreen={false}
                spaceKeyToPlayOrPause={false}
              />
            </div>

            {/* footer */}
            <div className="flex items-center justify-between border-t border-white/10 bg-black px-3.5 py-2 font-mono text-[10.5px] text-white/40">
              <span>
                press <kbd className="rounded bg-white/10 px-1 text-white/70">esc</kbd> to exit
              </span>
              <button
                type="button"
                onClick={replay}
                className="cursor-pointer text-white/55 transition-colors hover:text-white"
              >
                ↻ replay
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
