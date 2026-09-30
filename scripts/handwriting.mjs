// Turns words into single-stroke pen paths for the homepage, so the page can
// write them one stroke at a time instead of setting them in a script font.
//
// Source: EMS Neato, a single-line plotter font by Sheldon B. Michaels after
// Bad Script by Roman Shchyukin (SIL OFL, see fonts/OFL-EMS.txt). Its glyphs
// are polylines; each stroke is smoothed into cubic curves here, with sharp
// turns kept sharp so cusps like the foot of an "r" do not balloon.
//
// Run: node scripts/handwriting.mjs   (writes lib/handwriting.ts)

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const font = readFileSync(join(here, "fonts/EMSNeato.svg"), "utf8");

// Words the page writes, keyed by export name.
const WORDS = {
  inkName: "Karim Baba",
  inkSignature: "Karim",
};

// Pen speed while drawing, in output units per second (units are 1/10 of the
// font's em, so a capital is about 96 units tall), and the pause for a lift.
const SPEED = 3400;
const LIFT_MS = 60;
const GLYPH_MS = 40;

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));

const defaultAdvance = +font.match(/<font[^>]*horiz-adv-x="([\d.]+)"/)[1];
const glyphs = new Map();
for (const [, attrs] of font.matchAll(/<glyph([^>]*)\/>/g)) {
  const u = attrs.match(/unicode="([^"]*)"/);
  if (!u) continue;
  const advance = +(attrs.match(/horiz-adv-x="([\d.-]+)"/)?.[1] ?? defaultAdvance);
  const d = attrs.match(/ d="([^"]*)"/)?.[1] ?? "";
  glyphs.set(decode(u[1]), { advance, d });
}

// Split a glyph's path into strokes (one per pen-down), each a list of points.
// The font only uses absolute M, L and C; a C contributes its end point plus
// its control points so the stroke keeps the curve's shape when smoothed.
function strokesOf(d) {
  const tokens = d.match(/[MLC]|-?[\d.]+(?:e-?\d+)?/g) ?? [];
  const strokes = [];
  let cur = null;
  let cmd = null;
  for (let i = 0; i < tokens.length; ) {
    if (/[MLC]/.test(tokens[i])) cmd = tokens[i++];
    if (cmd === "M") {
      cur = [[+tokens[i], +tokens[i + 1]]];
      strokes.push(cur);
      i += 2;
      cmd = "L";
    } else if (cmd === "L") {
      cur.push([+tokens[i], +tokens[i + 1]]);
      i += 2;
    } else if (cmd === "C") {
      cur.push([+tokens[i + 4], +tokens[i + 5]]);
      i += 6;
    } else {
      throw new Error(`unexpected token ${tokens[i]}`);
    }
  }
  return strokes.filter((s) => s.length > 1);
}

const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const len = (v) => Math.hypot(v[0], v[1]);

// Break a polyline at sharp turns so each run is smoothed on its own.
function runs(points) {
  const out = [[points[0]]];
  for (let i = 1; i < points.length; i++) {
    const run = out[out.length - 1];
    run.push(points[i]);
    if (i < points.length - 1) {
      const a = sub(points[i], points[i - 1]);
      const b = sub(points[i + 1], points[i]);
      const cos = (a[0] * b[0] + a[1] * b[1]) / (len(a) * len(b) || 1);
      if (cos < -0.2) out.push([points[i]]);
    }
  }
  return out;
}

// Centripetal Catmull-Rom through the points, written as cubic Beziers.
function smooth(points) {
  const p = [points[0], ...points, points[points.length - 1]];
  const seg = [];
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    const d1 = Math.max(Math.sqrt(len(sub(p1, p0))), 1e-3);
    const d2 = Math.max(Math.sqrt(len(sub(p2, p1))), 1e-3);
    const d3 = Math.max(Math.sqrt(len(sub(p3, p2))), 1e-3);
    const c1 = [
      p1[0] + ((p2[0] - p0[0]) / (d1 + d2)) * (d2 / 3),
      p1[1] + ((p2[1] - p0[1]) / (d1 + d2)) * (d2 / 3),
    ];
    const c2 = [
      p2[0] - ((p3[0] - p1[0]) / (d2 + d3)) * (d2 / 3),
      p2[1] - ((p3[1] - p1[1]) / (d2 + d3)) * (d2 / 3),
    ];
    seg.push([c1, c2, p2]);
  }
  return seg;
}

const f = (n) => (Math.round(n * 10) / 10).toString();

function write(word) {
  const SCALE = 0.1;
  let penX = 0;
  const strokes = [];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  let t = 0;
  for (const ch of word) {
    const g = glyphs.get(ch) ?? glyphs.get(" ");
    for (const raw of strokesOf(g.d)) {
      // Font units are y-up; flip to screen space with the baseline at y=0.
      const pts = raw.map(([x, y]) => [(x + penX) * SCALE, -y * SCALE]);
      for (const [x, y] of pts) {
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      }
      let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
      for (const run of runs(pts)) {
        if (run.length === 2) d += `L${f(run[1][0])} ${f(run[1][1])}`;
        else for (const [c1, c2, e] of smooth(run)) d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(e[0])} ${f(e[1])}`;
      }
      let l = 0;
      for (let i = 1; i < pts.length; i++) l += len(sub(pts[i], pts[i - 1]));
      const dur = Math.max(60, Math.round((l / SPEED) * 1000));
      strokes.push({ d, delay: t, dur });
      t += dur + LIFT_MS;
    }
    t += GLYPH_MS;
    penX += g.advance;
  }
  const pad = 4;
  const x = Math.floor(minX - pad), y = Math.floor(minY - pad);
  const w = Math.ceil(maxX + pad) - x, h = Math.ceil(maxY + pad) - y;
  return { viewBox: `${x} ${y} ${w} ${h}`, width: w, height: h, baseline: -y, total: t - GLYPH_MS - LIFT_MS, strokes };
}

let out = `// Generated by scripts/handwriting.mjs from EMS Neato (SIL OFL). Do not edit.
// Units are a tenth of the font's em; y=0 is the baseline, so \`baseline\` is
// where the writing line sits inside the viewBox. Delays and durations are ms.

export type Stroke = { d: string; delay: number; dur: number };
export type Ink = {
  viewBox: string;
  width: number;
  height: number;
  baseline: number;
  total: number;
  strokes: Stroke[];
};
`;
for (const [name, word] of Object.entries(WORDS)) {
  out += `\n// ${JSON.stringify(word)}\nexport const ${name}: Ink = ${JSON.stringify(write(word))};\n`;
}
writeFileSync(join(here, "../lib/handwriting.ts"), out);
console.log("wrote lib/handwriting.ts", Object.keys(WORDS).join(", "));
