import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { loadFont } from "../lib/og-font";
import { intro } from "../lib/content";

// Route segment config: rendered once at build, served as a static PNG.
export const alt = "Karim Baba, software engineer in San Francisco building agent infrastructure for blockchains.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The homepage's palette: warm paper, ink type.
const PAPER = "#f3f1ec";
const INK = "#16150f";
const INK_3 = "#6f6b62";
const LINE = "#dcd8ce";

export default async function OpengraphImage() {
  const domain = "karimbabasf.com";
  const [semibold, medium, portrait] = await Promise.all([
    loadFont("Inter Tight", 600, intro.name),
    loadFont("Inter Tight", 500, intro.lede + domain),
    readFile(join(process.cwd(), "public/work/portrait-tall.jpg")),
  ]);

  const fonts = [
    semibold && { name: "Inter Tight", data: semibold, weight: 600 as const, style: "normal" as const },
    medium && { name: "Inter Tight", data: medium, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 500 | 600; style: "normal" }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PAPER,
          color: INK,
          padding: 64,
          fontFamily: fonts.length ? "Inter Tight" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 56 }}>
          <div
            style={{
              display: "flex",
              fontSize: 118,
              fontWeight: 600,
              letterSpacing: -4.7,
              lineHeight: 0.9,
              marginLeft: -6,
              marginTop: 6,
            }}
          >
            {intro.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 44,
              fontSize: 34,
              fontWeight: 500,
              lineHeight: 1.28,
              letterSpacing: -0.5,
            }}
          >
            {intro.lede}
          </div>
          <div style={{ display: "flex", flex: 1 }} />
          <div
            style={{
              display: "flex",
              paddingTop: 20,
              borderTop: `1px solid ${INK}`,
              fontSize: 24,
              fontWeight: 500,
              color: INK_3,
            }}
          >
            {domain}
          </div>
        </div>
        <img
          src={`data:image/jpeg;base64,${portrait.toString("base64")}`}
          width={402}
          height={502}
          alt=""
          style={{ borderRadius: 6, objectFit: "cover", border: `1px solid ${LINE}` }}
        />
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
