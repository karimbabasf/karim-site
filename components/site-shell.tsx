"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import WindowDots from "@/components/karim-os/window-dots";

// The Remotion boot sequence loads only after the easter egg is first opened.
const BootOverlay = dynamic(() => import("@/components/karim-os/boot-overlay"), {
  ssr: false,
});

const INTRO_KEY = "karim-intro-seen";

/* Write-out video */
const VIDEO_RATE = 1.4; // >1 = quicker writing
const DOCK_AT = 0.9; // begin docking at this fraction — the last strokes finish mid-flight

/* Zoom-out (the dock). A refined ease-in-out: quick to leave, soft to land. */
const ZOOM_DURATION = 1.3;
const ZOOM_EASE = [0.7, 0, 0.2, 1] as const;

/* Reveal — the rest of the site fades in *across the whole zoom* so it reads as
   one continuous motion (not a pop). Even, gentle curve; near-zero delay. */
const REVEAL_EASE = [0.4, 0, 0.2, 1] as const;
const REVEAL_DURATION = 1.15;

/* Geometry */
const ASPECT = 360 / 920; // the cropped mark's height / width
const HERO_VW = 0.7;
const HERO_MAX = 560;
const NAV_LOGO_W = 104;

const LINKS = [
  { label: "summary", href: "#summary" },
  { label: "projects", href: "#projects" },
];

type Mode = "loading" | "cinematic" | "static";
type Box = { left: number; top: number; w: number };

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  // Deterministic first render: the server can't read sessionStorage, so both
  // server and first client paint start in "loading" — identical trees, no
  // hydration mismatch and no flash of the fully-painted page. The real mode is
  // resolved just below, after mount. The pre-paint <html data-intro> script in
  // app/layout.tsx drives the black cover via CSS so a first-time visitor stays
  // covered and a return visitor is revealed instantly, both before any paint.
  const [mode, setMode] = useState<Mode>("loading");
  const [runId] = useState(0);
  const [docked, setDocked] = useState(false);
  const [dock, setDock] = useState({ x: 0, y: 0, scale: 1 });
  const [hero, setHero] = useState<Box | null>(null);

  const slotRef = useRef<HTMLImageElement>(null);
  const startedDock = useRef(false);
  const effectiveMode: Mode = reduce ? "static" : mode;

  // Resolve the intro after mount, where sessionStorage + reduced-motion are
  // readable. First full-motion load this session gets the cinematic; a return
  // visit (or reduced motion) skips straight to the docked, static site.
  useEffect(() => {
    if (mode !== "loading") return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {}
    if (seen || reduce) {
      setMode("static");
      setDocked(true);
      return;
    }
    setMode("cinematic");
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
  }, [mode, reduce]);

  // The floating mark's centered "hero" box — and, once docked, keep its dock
  // target aligned to the nav slot through resizes.
  useEffect(() => {
    if (effectiveMode !== "cinematic") return;
    const compute = () => {
      const w = Math.min(window.innerWidth * HERO_VW, HERO_MAX);
      const left = Math.round((window.innerWidth - w) / 2);
      const top = Math.round((window.innerHeight - w * ASPECT) / 2);
      setHero({ left, top, w });
      if (startedDock.current) {
        const to = slotRef.current?.getBoundingClientRect();
        if (to) {
          setDock({ x: to.left - left, y: to.top - top, scale: to.width / w });
        }
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [effectiveMode, runId]);

  // Fly the mark from its centered box into the measured nav slot.
  const startDock = useCallback(() => {
    if (startedDock.current || !hero) return;
    const to = slotRef.current?.getBoundingClientRect();
    if (!to || to.width === 0) return; // slot not laid out yet — retry on next tick
    startedDock.current = true;
    setDock({
      x: to.left - hero.left,
      y: to.top - hero.top,
      scale: to.width / hero.w,
    });
    setDocked(true);
  }, [hero]);

  // Safety net if `onEnded`/`onTimeUpdate` never land.
  useEffect(() => {
    if (effectiveMode !== "cinematic") return;
    const t = window.setTimeout(startDock, 5000);
    return () => window.clearTimeout(t);
  }, [effectiveMode, startDock, runId]);

  // Tap / click (or any key) anywhere during the intro skips it: the animation is
  // cut immediately and the home screen is revealed — not fast-forwarded. Doesn't
  // depend on `hero`/slot geometry, so even a tap on the very first frame works.
  const skipIntro = useCallback(() => {
    if (startedDock.current) return;
    startedDock.current = true; // stop the safety timeout / onEnded from re-firing
    setMode("static"); // unmount the video + black cover at once
    setDocked(true); // fade the chrome + content in
  }, []);

  useEffect(() => {
    if (effectiveMode !== "cinematic") return;
    const onKey = () => skipIntro();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [effectiveMode, skipIntro]);

  const revealed = docked || effectiveMode === "static"; // chrome + content fade in as the name flies home

  // Easter egg: the green traffic-light dot boots KARIM_OS (a Remotion overlay).
  const [bootOpen, setBootOpen] = useState(false);
  const [bootMounted, setBootMounted] = useState(false);
  const openBoot = useCallback(() => {
    setBootMounted(true);
    setBootOpen(true);
  }, []);

  return (
    <div className="relative min-h-svh">
      {/* ── Nav ─────────────────────────────────────────────── */}
      <header
        className="sticky inset-x-0 top-0 z-40 transform-gpu bg-black [backface-visibility:hidden]"
        style={{
          // Hard-lock the nav to pure #000: an inline style overrides the
          // themeable `--background` var and any browser default, so the bar —
          // and the safe-area/notch strip it fills — is pitch black in EVERY
          // browser, decoupled from the theme on purpose.
          backgroundColor: "#000",
          // Safe-area aware — this is what kills the "clear top" in Telegram / iOS
          // in-app browsers. They overlay a translucent toolbar that the page
          // scrolls under; `viewport-fit=cover` (app/layout.tsx) lets this solid
          // black bar fill the notch/toolbar strip so page content no longer
          // bleeds through it. `padding-top` drops the logo + links below the
          // inset; the negative margin cancels the whole bar height (bar + inset)
          // so content still starts at the very top under the bar. On desktop the
          // inset resolves to 0px, so the layout is unchanged.
          paddingTop: "env(safe-area-inset-top, 0px)",
          marginBottom: "calc(-4rem - env(safe-area-inset-top, 0px))",
        }}
      >
        {/* `sticky` (not `fixed`): in-app browsers repaint `position: fixed` layers
            out of sync with momentum scroll, so a fixed bar (and its logo) jitter
            and a gap opens above them. A sticky bar rides the scroll layer and
            stays welded to the top. */}
        {/* The visible 64px bar, sitting below the safe-area inset. */}
        <div className="relative h-16">
          <div className="mx-auto flex h-full max-w-6xl items-center px-6">
          {/* macOS terminal traffic lights */}
          <motion.div
            initial={false}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ duration: 1.0, ease: REVEAL_EASE, delay: reduce ? 0 : 0.15 }}
            className="hidden sm:block"
          >
            <WindowDots onBoot={openBoot} />
          </motion.div>

          {/* Terminal-style links */}
          <motion.nav
            initial={false}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : -4 }}
            transition={{ duration: 1.0, ease: REVEAL_EASE, delay: reduce ? 0 : 0.2 }}
            className="ml-auto flex items-center gap-4 text-sm text-dim sm:gap-6"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors duration-200 hover:text-neon"
              >
                {l.label}
              </a>
            ))}
            {/* Résumé CTA — a bordered pill so it reads as the one action in the
                bar, not another terminal link. Neon-on-hover, hairline at rest. */}
            <a
              href="/resume"
              className="rounded-md border border-white/10 px-2.5 py-1 leading-none transition-colors duration-200 hover:border-neon hover:text-neon"
            >
              CV
            </a>
          </motion.nav>
        </div>

        {/* Dock target — centered on desktop, left on mobile (centering there would
            collide with the links). Absolute so it never shifts dots/links. */}
        <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center sm:left-0 sm:right-0 sm:justify-center">
          {/* The resting mark is mounted the whole time — so it's fetched and
              decoded long before it's needed — and doubles as the fly-in's measured
              landing slot. It stays invisible until the flying <video> lands, at
              which point the hand-off is a single-frame opacity flip onto an
              identical, already-painted image: no remount, no decode, no flicker. */}
          <a
            href="#top"
            aria-label="Karim — home"
            className="flex items-center"
            style={{
              opacity: effectiveMode === "static" ? 1 : 0,
              pointerEvents: effectiveMode === "static" ? "auto" : "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={slotRef}
              src="/karim-logo.png"
              alt="Karim"
              width={920}
              height={360}
              draggable={false}
              // No mix-blend-screen here: the resting mark sits on the pure-black
              // nav, where the blend is a visual no-op — but a composited bar +
              // mix-blend-mode triggers an iOS/WebKit compositing bug that makes
              // the logo jitter during momentum scroll. Dropping it pins it still.
              className="neon-media block h-auto"
              style={{ width: NAV_LOGO_W }}
            />
          </a>
        </div>

        {/* Hairline under the bar */}
        <motion.div
          initial={false}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 1.0, ease: REVEAL_EASE, delay: reduce ? 0 : 0.15 }}
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: "var(--hairline)" }}
        />
        </div>
      </header>

      {/* ── Black screen: the intro writes out on solid black, then the screen
             lifts as the mark flies home. On replay it snaps in instantly so the
             current page is hidden at once — no ghosting of the old content. ── */}
      {mode !== "static" && (
        <motion.div
          aria-hidden
          className="intro-cover pointer-events-none fixed inset-0 z-[45] bg-black"
          initial={false}
          animate={{ opacity: revealed ? 0 : 1 }}
          transition={{ duration: revealed ? REVEAL_DURATION : 0.2, ease: REVEAL_EASE }}
        />
      )}

      {/* ── Skip layer: a tap / click anywhere over the intro cuts straight to the
             home screen. Above the mark (z-50) and cover (z-45) so it catches the
             whole viewport; `!revealed` unmounts it the instant the intro ends —
             whether skipped or played through — so it never blocks the live page. ── */}
      {effectiveMode === "cinematic" && !revealed && (
        <button
          type="button"
          aria-label="Skip intro"
          onPointerDown={skipIntro}
          className="fixed inset-0 z-[60] cursor-pointer bg-transparent"
        />
      )}

      {/* ── The one, persistent mark: writes out centered, then flies into the nav.
             No swap, no remount → no flicker. ─────────────────── */}
      {effectiveMode === "cinematic" && hero && (
        <motion.a
          key={runId}
          href="#top"
          aria-label="Karim — home"
          // mix-blend-screen: the mark's black background drops to transparent so
          // it never covers the page content behind it during the zoom.
          className="fixed z-50 block mix-blend-screen"
          style={{
            left: hero.left,
            top: hero.top,
            width: hero.w,
            transformOrigin: "top left",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
          initial={{ x: 0, y: 0, scale: 1 }}
          animate={{ x: dock.x, y: dock.y, scale: dock.scale }}
          transition={{ duration: ZOOM_DURATION, ease: ZOOM_EASE }}
          onAnimationComplete={() => {
            // Dock landed: hand off from this flying <video> to the resting
            // static <img> in the bar — the exact end state that skipping the
            // intro produces. Left mounted, the video is a `position: fixed` +
            // `mix-blend-screen` layer parked in the nav, and that combo jitters
            // the logo during momentum scroll on iOS / Telegram. Retiring it to
            // the static mark pins it still and makes both intro paths identical.
            if (startedDock.current) setMode("static");
          }}
        >
          <video
            src="/karim-intro.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              v.currentTime = 0;
              v.playbackRate = VIDEO_RATE;
              // Remounts don't reliably re-trigger `autoPlay`; kick it off explicitly.
              void v.play().catch(() => {});
            }}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration && v.currentTime / v.duration >= DOCK_AT) startDock();
            }}
            onEnded={startDock}
            onError={startDock}
            className="neon-media block h-auto w-full"
          />
        </motion.a>
      )}

      {/* ── Page content ────────────────────────────────────── */}
      <motion.main
        id="top"
        initial={false}
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
        transition={{ duration: REVEAL_DURATION, ease: REVEAL_EASE, delay: reduce ? 0 : 0.1 }}
      >
        {children}
      </motion.main>

      {/* Easter egg overlay — mounts (and pulls the Remotion bundle) only once opened. */}
      {bootMounted && <BootOverlay open={bootOpen} onClose={() => setBootOpen(false)} />}
    </div>
  );
}
