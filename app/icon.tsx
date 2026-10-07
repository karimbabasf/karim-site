import { ImageResponse } from "next/og";
import { loadFont } from "../lib/og-font";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Generated favicon: a corner of the business card. Bone stock, a charcoal
// "K" in the card's Cormorant SC, so the tab matches the page.
export default async function Icon() {
  const caps = await loadFont("Cormorant SC", 600, "K");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ecebe6",
          borderRadius: 12,
          color: "#262523",
          fontFamily: caps ? "Cormorant SC" : "serif",
          fontSize: 54,
          fontWeight: 600,
          lineHeight: 1,
          paddingBottom: 4,
        }}
      >
        K
      </div>
    ),
    {
      ...size,
      fonts: caps
        ? [{ name: "Cormorant SC", data: caps, weight: 600, style: "normal" }]
        : undefined,
    },
  );
}
