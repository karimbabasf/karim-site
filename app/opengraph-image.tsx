import { ImageResponse } from "next/og";
import { loadFont } from "../lib/og-font";

// Route segment config — rendered once at build, served as a static PNG.
export const alt = "Karim Baba — AI-native builder, BD @ 1Claw. San Francisco.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#ededed";
const DIM = "#6b6b6b";
const NEON = "#a3f04b";
const HAIRLINE = "rgba(255,255,255,0.10)";

export default async function OpengraphImage() {
  const text =
    "Karim Baba AI-native builder · BD @ 1Claw Nobody told me to. I just did it. San Francisco > agentic development";
  const [regular, semibold] = await Promise.all([
    loadFont("Geist Mono", 400, text),
    loadFont("Geist Mono", 600, text),
  ]);

  const fonts = [
    regular && { name: "Geist Mono", data: regular, weight: 400 as const, style: "normal" as const },
    semibold && { name: "Geist Mono", data: semibold, weight: 600 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#000000",
          color: INK,
          padding: 72,
          border: `1px solid ${HAIRLINE}`,
          fontFamily: fonts.length ? "Geist Mono" : "monospace",
        }}
      >
        {/* Top meta — macOS terminal lights (the site's signature) + location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 20, height: 20, borderRadius: 20, background: "#ff5f57" }} />
            <div style={{ width: 20, height: 20, borderRadius: 20, background: "#febc2e" }} />
            <div style={{ width: 20, height: 20, borderRadius: 20, background: "#28c840" }} />
          </div>
          <div style={{ display: "flex", fontSize: 26, color: DIM }}>San Francisco</div>
        </div>

        {/* Spacer — anchors the name block to the lower-left */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* Name */}
        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 600,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          Karim Baba
        </div>

        {/* Title + org */}
        <div style={{ display: "flex", alignItems: "baseline", marginTop: 24, fontSize: 38 }}>
          <span style={{ color: INK }}>AI-native builder</span>
          <span style={{ color: DIM, marginLeft: 16 }}>· BD @ 1Claw</span>
        </div>

        {/* Tagline — dim setup, neon punch */}
        <div style={{ display: "flex", alignItems: "baseline", marginTop: 22, fontSize: 32 }}>
          <span style={{ color: DIM }}>Nobody told me to.&nbsp;</span>
          <span style={{ color: NEON, fontWeight: 600 }}>I just did it.</span>
        </div>

        {/* Bottom terminal line */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 56, fontSize: 26, color: DIM }}>
          <span style={{ color: NEON, marginRight: 14 }}>&gt;</span>
          <span>agentic development</span>
          <div style={{ width: 14, height: 26, background: NEON, marginLeft: 14 }} />
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
