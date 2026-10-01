import { ImageResponse } from "next/og";
import { loadFont } from "../lib/og-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home screen icon. iOS rounds the corners itself, so the tile is square.
export default async function AppleIcon() {
  const font = await loadFont("Google Sans Flex", 600, "K", 150);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#dfe1e2",
          backgroundImage: "linear-gradient(150deg, #f7f8f8 0%, #dfe1e2 55%, #c4c8cb 100%)",
          color: "#191b1e",
          fontFamily: font ? "Engraved" : "sans-serif",
          fontSize: 104,
          lineHeight: 1,
          textShadow: "1px 2px 0 rgba(255,255,255,0.7)",
        }}
      >
        K
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Engraved", data: font, weight: 600, style: "normal" }] : undefined,
    },
  );
}
