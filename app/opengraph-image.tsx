import { ImageResponse } from "next/og";
import { loadFont } from "../lib/og-font";

// Route segment config: rendered once at build, served as a static PNG.
export const alt = "Karim Baba, founder building agent infrastructure in San Francisco.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The homepage's desk and card: warm charcoal, bone type.
const DESK = "#1b1a18";
const DESK_LIGHT = "#2e2c28";
const BONE = "#ecebe6";
const BONE_DIM = "rgba(236, 235, 230, 0.56)";
const RULE = "rgba(236, 235, 230, 0.22)";

export default async function OpengraphImage() {
  const name = "Karim Baba";
  const role = "Founder, Agent Infrastructure";
  const place = "San Francisco, California";
  const domain = "karimbabasf.com";
  const [caps, text] = await Promise.all([
    loadFont("Cormorant SC", 600, name + role + place),
    loadFont("Cormorant Garamond", 500, domain),
  ]);

  const fonts = [
    caps && { name: "Cormorant SC", data: caps, weight: 600 as const, style: "normal" as const },
    text && { name: "Cormorant Garamond", data: text, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 500 | 600; style: "normal" }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `radial-gradient(ellipse 90% 75% at 50% 45%, ${DESK_LIGHT}, ${DESK} 72%)`,
          color: BONE,
          fontFamily: caps ? "Cormorant SC" : "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 132, fontWeight: 600, letterSpacing: 6, lineHeight: 1 }}>
          {name}
        </div>
        <div style={{ display: "flex", width: 120, height: 1, background: RULE, marginTop: 44, marginBottom: 40 }} />
        <div style={{ display: "flex", fontSize: 40, fontWeight: 600, letterSpacing: 4 }}>{role}</div>
        <div style={{ display: "flex", fontSize: 32, fontWeight: 600, letterSpacing: 3, marginTop: 14, color: BONE_DIM }}>
          {place}
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 52,
            fontSize: 30,
            fontWeight: 500,
            color: BONE_DIM,
            fontFamily: text ? "Cormorant Garamond" : "serif",
          }}
        >
          {domain}
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
