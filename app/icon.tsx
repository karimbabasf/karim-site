import { ImageResponse } from "next/og";
import { loadFont } from "../lib/og-font";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Generated favicon: a paper "K" on an ink tile, the homepage's two colors.
// Ink reads on both light and dark tab bars, down to 16px.
export default async function Icon() {
  const font = await loadFont("Inter Tight", 600, "K");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16150f",
          borderRadius: 14,
          color: "#f3f1ec",
          fontFamily: font ? "Inter Tight" : "sans-serif",
          fontSize: 44,
          fontWeight: 600,
          lineHeight: 1,
          letterSpacing: -1,
        }}
      >
        K
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Inter Tight", data: font, weight: 600, style: "normal" }] : undefined,
    },
  );
}
