"use client";

/*
 * "YOU FOUND IT" — the reward that plays when someone discovers the traffic-light
 * easter egg. A Matrix homage: green digital rain, the "wake up…" intro, a glitch
 * reveal, an achievement badge with a laugh line, and a finale that flips Karim's
 * own tagline onto the visitor. Played inside the site via <Player> (boot-overlay).
 *
 * Every value is a pure function of the current frame (Remotion renders frames out
 * of order / in parallel — NO timers, Date.now, or unseeded Math.random). The rain
 * is deterministic via a seeded hash. The neon accent is a prop so it follows the
 * site's green / blue theme.
 */

import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

const MONO = 'var(--font-geist-mono, ui-monospace, "SF Mono", Menlo, monospace)';
const FG = "#e9ffe6";
const DIM = "#6f7d70";
const SCREEN = "#050806";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Deterministic 0..1 hash — the only source of "randomness" (seeded, frame-safe).
const hash = (a: number, b: number, c: number) => {
  const v = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453;
  return v - Math.floor(v);
};

// Code-point-safe typewriter (so the 🐇 surrogate pair never gets sliced in half).
const typed = (text: string, local: number, cps: number) => {
  const arr = Array.from(text);
  const n = Math.max(0, Math.floor(local * cps));
  return { shown: arr.slice(0, n).join(""), done: n >= arr.length };
};

// ── Matrix rain (deterministic) ─────────────────────────────────────────────
const GLYPHS = Array.from(
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑ0123456789+*=<>:¦╌.\"",
);
const COL_W = 34;
const ROW_H = 28;
const TRAIL = 10;
const COMP_W = 1280;
const COMP_H = 800;
const N_COLS = Math.floor(COMP_W / COL_W);
const N_ROWS = Math.ceil(COMP_H / ROW_H) + 2;
const COLS = Array.from({ length: N_COLS }, (_, i) => ({
  x: i * COL_W,
  speed: 0.3 + hash(i, 7, 1) * 0.75,
  offset: hash(i, 3, 2) * 60,
  seed: i * 17 + 3,
}));

function RainColumn({ col, frame, accent }: { col: (typeof COLS)[number]; frame: number; accent: string }) {
  const head = (frame * col.speed + col.offset) % (N_ROWS + TRAIL);
  const cells = [];
  for (let t = 0; t < TRAIL; t++) {
    const row = Math.floor(head) - t;
    if (row < 0 || row >= N_ROWS) continue;
    const isHead = t === 0;
    const glyph = GLYPHS[Math.floor(hash(col.seed, row, Math.floor(frame / 5)) * GLYPHS.length)];
    cells.push(
      <span
        key={t}
        style={{
          position: "absolute",
          top: row * ROW_H,
          left: 0,
          width: COL_W,
          textAlign: "center",
          fontFamily: MONO,
          fontSize: 16,
          lineHeight: `${ROW_H}px`,
          color: isHead ? "#eafff0" : accent,
          opacity: isHead ? 0.95 : Math.max(0, 1 - t / TRAIL) * 0.8,
          textShadow: isHead ? `0 0 7px ${accent}` : "none",
        }}
      >
        {glyph}
      </span>,
    );
  }
  return <div style={{ position: "absolute", left: col.x, top: 0, width: COL_W, height: COMP_H }}>{cells}</div>;
}

// ── Text beats ──────────────────────────────────────────────────────────────
function TermLine({
  start,
  text,
  color,
  size,
  y,
  cps = 1.1,
  caret = false,
  accent,
}: {
  start: number;
  text: string;
  color: string;
  size: number;
  y: number;
  cps?: number;
  caret?: boolean;
  accent: string;
}) {
  const frame = useCurrentFrame();
  const local = frame - start;
  if (local < 0) return null;
  const { shown, done } = typed(text, local, cps);
  const enter = interpolate(local, [0, 5], [0, 1], clamp);
  const blink = Math.floor(frame / 15) % 2 === 0;
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        top: y,
        fontFamily: MONO,
        fontSize: size,
        letterSpacing: "0.01em",
        color,
        opacity: enter,
      }}
    >
      {shown}
      {(caret || !done) && <span style={{ color: accent, opacity: blink ? 1 : 0, marginLeft: 2 }}>▋</span>}
    </div>
  );
}

function Glitch({ start, text, accent }: { start: number; text: string; accent: string }) {
  const frame = useCurrentFrame();
  const local = frame - start;
  if (local < 0) return null;
  const enter = interpolate(local, [0, 5], [0, 1], clamp);
  // chromatic split jitters hard, then settles to 0 over ~18 frames
  const decay = Math.max(0, 1 - local / 18);
  const gx = (hash(local, 5, 1) - 0.5) * 12 * decay;
  const gy = (hash(local, 9, 2) - 0.5) * 5 * decay;
  const base = {
    position: "absolute" as const,
    left: 120,
    fontFamily: MONO,
    fontWeight: 800,
    fontSize: 82,
    letterSpacing: "0.03em",
    whiteSpace: "nowrap" as const,
  };
  return (
    <div style={{ position: "absolute", left: 0, top: 300, opacity: enter }}>
      <span style={{ ...base, color: "#37d6ff", transform: `translate(${gx}px,${gy}px)`, opacity: 0.55, mixBlendMode: "screen" }}>{text}</span>
      <span style={{ ...base, color: accent, transform: `translate(${-gx}px,${-gy}px)`, opacity: 0.55, mixBlendMode: "screen" }}>{text}</span>
      <span style={{ ...base, color: "#eafff0", textShadow: `0 0 22px ${accent}` }}>{text}</span>
    </div>
  );
}

export const KarimBoot = ({ accent = "#a3f04b" }: { accent?: string }) => {
  const frame = useCurrentFrame();

  const rainOpacity = interpolate(frame, [0, 30], [0, 0.6], clamp);
  // satisfying "unlock" flash on the reveal
  const flash = interpolate(frame, [150, 155, 164], [0, 0.42, 0], { ...clamp, easing: Easing.out(Easing.quad) });
  const badgeIn = interpolate(frame, [180, 192], [0, 1], clamp);
  const badgePop = interpolate(frame, [180, 192], [0.92, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) });

  return (
    <AbsoluteFill style={{ background: SCREEN, fontFamily: MONO }}>
      {/* Matrix rain */}
      <AbsoluteFill style={{ opacity: rainOpacity }}>
        {COLS.map((c, i) => (
          <RainColumn key={i} col={c} frame={frame} accent={accent} />
        ))}
      </AbsoluteFill>

      {/* darken behind the text so it stays readable over the rain */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 42% 50%, rgba(5,8,6,0.9) 0%, rgba(5,8,6,0.62) 45%, rgba(5,8,6,0) 78%)",
        }}
      />

      {/* ── Beats ── */}
      {/* Matrix homage */}
      <TermLine start={24} text="wake up, visitor…" color={accent} size={26} y={150} cps={1} accent={accent} />
      <TermLine start={66} text="the site has you." color={accent} size={26} y={192} cps={1} accent={accent} />
      <TermLine start={104} text="follow the green rabbit  🐇" color={accent} size={26} y={234} cps={1} accent={accent} />

      {/* Glitch reveal */}
      <Glitch start={150} text="YOU FOUND IT" accent={accent} />

      {/* Achievement badge */}
      <div style={{ position: "absolute", left: 120, top: 424, opacity: badgeIn, transform: `scale(${badgePop})`, transformOrigin: "left center" }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#050806",
            background: accent,
            padding: "5px 12px",
            boxShadow: `0 0 24px ${accent}88`,
          }}
        >
          ▓ achievement unlocked ▓
        </span>
      </div>
      <TermLine
        start={196}
        text={'"professional snoop" — impeccable taste, questionable free time'}
        color={DIM}
        size={16}
        y={472}
        cps={2.4}
        accent={accent}
      />

      {/* Finale — his tagline, flipped onto the visitor */}
      <TermLine start={218} text="> nobody told you to. you just did it." color={FG} size={27} y={556} cps={1.5} caret accent={accent} />
      <TermLine start={256} text="— karim" color={DIM} size={16} y={604} cps={2} accent={accent} />

      {/* unlock flash */}
      <AbsoluteFill style={{ background: accent, opacity: flash, mixBlendMode: "screen", pointerEvents: "none" }} />

      {/* scanlines + vignette */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.3) 3px)",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background: "radial-gradient(125% 125% at 50% 45%, transparent 55%, rgba(0,0,0,0.62) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
