import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { loadFont } from "../lib/og-font";
import { intro } from "../lib/content";

// Route segment config: rendered once at build, served as a static PNG.
export const alt = "Karim Baba, software engineer in San Francisco building agent infrastructure for blockchains.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The homepage's instrument face: bead-blasted aluminium, the name engraved in
// extended caps, the photo behind smoked glass.
const AL_0 = "#f7f8f8";
const AL_2 = "#dfe1e2";
const AL_3 = "#d0d3d5";
const AL_6 = "#565b62";
const AL_8 = "#191b1e";
const GLASS = "#0b0e11";
const INK = "#dae5ef";

export default async function OpengraphImage() {
  const name = intro.name.toUpperCase();
  const domain = "karimbabasf.com";
  const [engraved, text, code, portrait] = await Promise.all([
    loadFont("Google Sans Flex", 600, name, 150),
    loadFont("Google Sans Flex", 480, intro.lede),
    loadFont("Google Sans Code", 500, `San Francisco${domain}`),
    readFile(join(process.cwd(), "public/work/portrait-tall.jpg")),
  ]);

  const fonts = [
    engraved && { name: "Engraved", data: engraved, weight: 600 as const, style: "normal" as const },
    text && { name: "Sans", data: text, weight: 500 as const, style: "normal" as const },
    code && { name: "Code", data: code, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 500 | 600; style: "normal" }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 72px 64px",
          backgroundColor: AL_2,
          backgroundImage: `radial-gradient(circle at 10% -10%, ${AL_0} 0%, ${AL_2} 55%, ${AL_3} 100%)`,
          color: AL_8,
          fontFamily: "Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div
            style={{
              display: "flex",
              width: 156,
              height: 195,
              padding: 6,
              borderRadius: 24,
              backgroundColor: GLASS,
              boxShadow: "0 2px 0 rgba(255,255,255,0.8)",
            }}
          >
            <img
              src={`data:image/jpeg;base64,${portrait.toString("base64")}`}
              width={144}
              height={183}
              alt=""
              style={{ borderRadius: 18, objectFit: "cover", objectPosition: "50% 30%" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 40 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Engraved",
                fontSize: 82,
                lineHeight: 0.86,
                color: AL_8,
                textShadow: "1px 1.5px 0 rgba(255,255,255,0.75)",
              }}
            >
              {name}
            </div>
            <div style={{ display: "flex", marginTop: 22, fontFamily: "Code", fontSize: 24, color: AL_6 }}>
              San Francisco
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 64,
            maxWidth: 940,
            fontSize: 44,
            lineHeight: 1.2,
            letterSpacing: -0.5,
          }}
        >
          {intro.lede}
        </div>
        <div style={{ display: "flex", flex: 1 }} />
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 56,
              padding: "0 22px",
              borderRadius: 14,
              backgroundColor: GLASS,
              color: INK,
              fontFamily: "Code",
              fontSize: 24,
              boxShadow: "0 2px 0 rgba(255,255,255,0.8)",
            }}
          >
            {domain}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
