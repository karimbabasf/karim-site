import { ImageResponse } from "next/og";
import { loadFont } from "../lib/og-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home screen icon. iOS rounds the corners itself, so the tile is square.
export default async function AppleIcon() {
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
          color: "#f3f1ec",
          fontFamily: font ? "Inter Tight" : "sans-serif",
          fontSize: 116,
          fontWeight: 600,
          lineHeight: 1,
          letterSpacing: -3,
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
