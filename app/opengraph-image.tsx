import { ImageResponse } from "next/og";
import { loadFont } from "../lib/og-font";

// Route segment config: rendered once at build, served as a static PNG.
export const alt = "Karim Baba, founder building agent infrastructure in San Francisco.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// White field, dark ink, the site's Geist.
const PAPER = "#ffffff";
const INK = "#161616";
const INK_DIM = "#6b6b6b";
const RULE = "#e4e4e4";

export default async function OpengraphImage() {
  const name = "Karim Baba";
  const role = "Founder, Agent Infrastructure";
  const place = "San Francisco, California";
  const domain = "karimbabasf.com";
  const [semibold, medium] = await Promise.all([
    loadFont("Geist", 600, name),
    loadFont("Geist", 500, role + place + domain),
  ]);

  const fonts = [
    semibold && { name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const },
    medium && { name: "Geist", data: medium, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 500 | 600; style: "normal" }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
          padding: "72px 80px",
          fontFamily: fonts.length ? "Geist" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", flex: 1 }} />
        <div style={{ display: "flex", fontSize: 128, fontWeight: 600, letterSpacing: -5, lineHeight: 1, marginLeft: -4 }}>
          {name}
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 40, fontWeight: 500, letterSpacing: -0.8 }}>{role}</div>
        <div style={{ display: "flex", marginTop: 10, fontSize: 40, fontWeight: 500, letterSpacing: -0.8, color: INK_DIM }}>
          {place}
        </div>
        <div style={{ display: "flex", flex: 1 }} />
        <div
          style={{
            display: "flex",
            paddingTop: 24,
            borderTop: `1px solid ${RULE}`,
            fontSize: 28,
            fontWeight: 500,
            color: INK_DIM,
          }}
        >
          {domain}
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
