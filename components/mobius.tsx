"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";

/** Snappy exit curve from the design system (--ease-out in globals.css). */
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** A blinking neon terminal caret, reused in the decode titles. */
function BlinkCaret({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      initial={false}
      className={`inline-block h-[0.95em] w-[0.5ch] translate-y-[0.1em] bg-neon ${className}`}
      animate={reduce ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
      transition={
        reduce ? undefined : { duration: 1.05, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }
      }
    />
  );
}

/**
 * The `man mobius` page. Each block is a real property of the strip or the
 * prose that ties it to how Karim works — kept as blocks so they can stream
 * in like terminal output, one after another.
 */
type ManualBlock = {
  kind: "head" | "body";
  text: string;
  bright?: boolean;
  caret?: boolean;
  /** Rendered in neon right after `text`. */
  emphasis?: string;
  /** Normal-weight text that trails the neon `emphasis` (kept un-highlighted). */
  after?: string;
};

const MANUAL: ManualBlock[] = [
  { kind: "head", text: "NAME" },
  { kind: "body", text: "Möbius", bright: true },
  { kind: "head", text: "DESCRIPTION" },
  {
    kind: "body",
    text:
      "A Möbius strip has one surface where you'd be sure there were two. But follow it and you never hit an edge, never reach a stopping point. The path just carries you around, through the twist, and onward, always more ahead of you than you expected. You can't quite catch where it begins. It shouldn't hold together, but it does, and that's exactly what makes it hard to look away from.",
  },
  { kind: "body", text: "This represents my work, and what kind of a person I am." },
  {
    kind: "body",
    text:
      'I taught myself everything that I know. I picked something, built it, broke it, fixed it, and kept iterating until the goal was achieved. I\'m 17, and I\'m not waiting until I\'m "ready."',
    emphasis: "I just do it.",
    after: " Frictionless, like a Möbius.",
    caret: true,
  },
];

/**
 * Scales its content down (never up) so a fixed block of text always fits its
 * pane without scrolling. On a tall viewport the scale stays 1 (full size); on
 * a shorter one it shrinks type just enough to fit — so the manual is always a
 * single, whole "page", never clipped and never scrollable. Measured before
 * paint (layout effect) so there's no flash of oversized text, and kept in sync
 * with a ResizeObserver on both the pane and the content (viewport, font load).
 */
function FitToBox({ children }: { children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const fit = () => {
      // offsetHeight/Width are the *layout* size — a CSS transform doesn't
      // change them, so we can read the natural size while a scale is applied.
      const ch = i.offsetHeight;
      const cw = i.offsetWidth;
      if (!ch || !cw) return;
      const next = Math.min(1, o.clientHeight / ch, o.clientWidth / cw);
      // Snap to 1 when it's within a hair, and ignore sub-pixel churn so the
      // ResizeObserver can't feed back into itself.
      setScale((prev) => (Math.abs(prev - next) < 0.004 ? prev : next > 0.995 ? 1 : next));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outer} className="flex h-full w-full items-center justify-center overflow-hidden">
      <div ref={inner} style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
        {children}
      </div>
    </div>
  );
}

/**
 * The man-page body. Each line self-animates with an index-based delay so it
 * streams in like terminal output — no dependency on parent orchestration
 * propagating through the layout wrappers.
 */
function ManualLines({ closeHint, compact = false }: { closeHint?: string; compact?: boolean }) {
  const reduce = useReducedMotion();
  const line = (i: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 6 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0.18 : 0.34,
      ease: EASE_OUT,
      delay: reduce ? 0 : 0.1 + i * 0.055,
    },
  });
  // Compact tightens type + rhythm for the phone board. FitToBox scales the
  // whole block to fit its pane, so this rhythm just sets the base look — the
  // tighter it is, the higher the fit scale (i.e. the larger the type) stays.
  const headCls = compact
    ? "mt-3.5 text-[10.5px] uppercase tracking-[0.2em] text-neon/90 first:mt-0"
    : "mt-6 text-[12px] uppercase tracking-[0.22em] text-neon/90 first:mt-0";
  const bodyCls = compact
    ? "mt-2 pl-3.5 text-[12.5px] leading-[1.5]"
    : "mt-3 pl-5 text-[15px] leading-[1.62]";
  const hintCls = compact
    ? "mt-3.5 pl-3.5 text-[10.5px] text-dim/60"
    : "mt-6 pl-5 text-[11px] text-dim/60";
  return (
    <div className="font-mono">
      {MANUAL.map((b, i) =>
        b.kind === "head" ? (
          <motion.p key={i} {...line(i)} className={`${headCls}`}>
            {b.text}
          </motion.p>
        ) : (
          <motion.p
            key={i}
            {...line(i)}
            className={`${bodyCls} ${b.bright ? "text-foreground" : "text-foreground/75"}`}
          >
            {b.text}
            {b.emphasis && (
              <span className="font-semibold text-neon">{" "}{b.emphasis}</span>
            )}
            {b.after}
            {b.caret && <BlinkCaret className="ml-1 !h-[1.05em] w-[0.55ch] !translate-y-[0.16em]" />}
          </motion.p>
        )
      )}
      {closeHint && (
        <motion.p {...line(MANUAL.length)} className={hintCls}>
          {closeHint}
        </motion.p>
      )}
    </div>
  );
}

/** Framed hero pane — the Möbius clip that opens `man mobius`. */
export function MobiusViewport({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Esc closes; focus moves into the panel while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Return focus to the trigger when the panel closes.
  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  const panelVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.16 : 0.42, ease: EASE_OUT },
    },
    exit: { opacity: 0, y: reduce ? 0 : 8, transition: { duration: 0.22, ease: EASE_OUT } },
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-hairline bg-black shadow-[0_0_50px_color-mix(in_srgb,var(--neon)_5.5%,transparent)] ${className}`}
    >
      {/* title bar — terminal style, no window chrome; the decode cue lives here, centered */}
      <div className="relative z-30 flex h-9 items-center justify-center border-b border-hairline bg-white/[0.02] px-4">
        {open ? (
          <>
            <span className="font-mono text-xs text-dim">man mobius</span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close the manual"
              className="absolute right-2.5 rounded-sm border border-hairline px-1.5 py-0.5 font-mono text-[10px] text-dim transition-colors duration-200 hover:border-neon/40 hover:text-neon focus-visible:border-neon/50 focus-visible:text-neon focus-visible:outline-none"
            >
              esc
            </button>
          </>
        ) : (
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex items-center font-mono text-xs tracking-[0.15em] text-neon/75 transition-colors duration-200 hover:text-neon group-hover:text-neon focus-visible:text-neon focus-visible:outline-none"
          >
            click to decode
            <BlinkCaret className="ml-2" />
          </button>
        )}
      </div>

      {/* stage */}
      <div className="relative h-[min(68vh,43rem)] min-h-[31rem]">
        <video
          src="/mobius.mp4"
          poster="/mobius-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          className="neon-media h-full w-full object-cover"
        />

        {/* mouse click target over the stage (keyboard handled by the title button) */}
        {!open && (
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={() => setOpen(true)}
            className="absolute inset-0 z-10 cursor-pointer focus:outline-none"
          >
            <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-neon/0 transition-all duration-300 group-hover:ring-neon/10" />
          </button>
        )}

        {/* the manual */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="manual"
              id={panelId}
              role="region"
              aria-label="mobius manual"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={() => setOpen(false)}
              className="absolute inset-0 z-20 flex flex-col bg-black/90"
            >
              {/* faint neon floor so the clip still breathes underneath */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--neon-soft)] to-transparent opacity-40" />
              {/* auto-fit: the manual scales to sit whole in the box — never
                  scrolls, never clips, and stays full-size on tall screens */}
              <div className="relative flex-1 overflow-hidden px-6 py-6 sm:px-8">
                <FitToBox>
                  <div className="mx-auto w-full max-w-[62ch]">
                    <ManualLines closeHint="press esc, or click anywhere, to close" />
                  </div>
                </FitToBox>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Mobile section — the desktop viewport is hidden on phones, so this compact
 * terminal box sits right under the contacts: the Möbius clip in its true 3:4
 * shape (the clip is 1080×1440, so the frame fills edge to edge — no crop, no
 * letterboxing), with a "click to decode" title that expands the manual in
 * place. Height animates to `auto`, so all the info fits and nothing scrolls.
 */
export function MobiusManualMobile({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  // Same overlay motion as the desktop viewport: the manual fades up over the
  // clip instead of pushing the page down.
  const panelVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.16 : 0.4, ease: EASE_OUT } },
    exit: { opacity: 0, y: reduce ? 0 : 6, transition: { duration: 0.2, ease: EASE_OUT } },
  };

  return (
    <div className={className}>
      <div className="group relative overflow-hidden rounded-xl border border-hairline bg-black shadow-[0_0_40px_color-mix(in_srgb,var(--neon)_4%,transparent)]">
        {/* title bar — same decode cue as desktop, terminal style */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="relative z-30 flex h-11 w-full items-center justify-center border-b border-hairline bg-white/[0.02] font-mono text-xs tracking-[0.15em] text-neon/80 transition-colors duration-200 hover:text-neon focus-visible:outline-none"
        >
          {open ? (
            <>
              <span className="text-dim">man mobius</span>
              <span aria-hidden className="absolute right-4 text-[10px] tracking-normal text-dim">
                ✕ close
              </span>
            </>
          ) : (
            <>
              click to decode
              <BlinkCaret className="ml-2" />
            </>
          )}
        </button>

        {/* stage — the clip fills the frame; the manual overlays on top of it
            (matching desktop) rather than expanding the page underneath */}
        <div className="relative h-[min(62vh,32rem)] min-h-[29rem]">
          <video
            src="/mobius.mp4"
            poster="/mobius-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="h-full w-full object-cover"
          />

          {/* tap the clip to reveal the manual */}
          {!open && (
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={() => setOpen(true)}
              className="absolute inset-0 z-10 focus:outline-none"
            >
              <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-neon/0 transition-all duration-300 group-active:ring-neon/15" />
            </button>
          )}

          {/* the manual — absolute overlay, centered, scrolls internally only if
              it can't fit; tap anywhere to close */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="manual"
                id={panelId}
                role="region"
                aria-label="mobius manual"
                variants={panelVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                onClick={() => setOpen(false)}
                className="absolute inset-0 z-20 flex flex-col bg-black/90"
              >
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--neon-soft)] to-transparent opacity-40" />
                <div className="relative flex-1 overflow-hidden px-4 py-4">
                  <FitToBox>
                    <div className="mx-auto w-full max-w-[42ch]">
                      <ManualLines compact closeHint="tap anywhere to close" />
                    </div>
                  </FitToBox>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/** Dulled full-bleed version to sit behind the hero on small screens. */
export function MobiusBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.34] ${className}`}
      aria-hidden
    >
      <video
        src="/mobius.mp4"
        poster="/mobius-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="neon-media absolute inset-x-[-18%] top-12 h-[78vh] object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
