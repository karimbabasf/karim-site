import { ImageResponse } from "next/og";
import { loadFont } from "../lib/og-font";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Generated favicon: an extended "K" engraved in a small aluminium tile, the
// homepage's nameplate at tab size. The dark letter holds on light and dark tab
// bars down to 16px.
export default async function Icon() {
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
          borderRadius: 14,
          backgroundColor: "#dfe1e2",
          backgroundImage: "linear-gradient(150deg, #f7f8f8 0%, #dfe1e2 55%, #c4c8cb 100%)",
          color: "#191b1e",
          fontFamily: font ? "Engraved" : "sans-serif",
          fontSize: 40,
          lineHeight: 1,
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
