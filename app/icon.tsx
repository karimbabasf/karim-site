import { ImageResponse } from "next/og";
import { loadFont } from "../lib/og-font";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Generated favicon: the site's lime "K" mark on black. Reads cleanly down to the
// 16px tab favicon while staying on-brand with the OG card.
export default async function Icon() {
  const geist = await loadFont("Geist Mono", 700, "K");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: 14,
          color: "#a3f04b",
          fontFamily: geist ? "Geist Mono" : "monospace",
          fontSize: 46,
          fontWeight: 700,
        }}
      >
        K
      </div>
    ),
    {
      ...size,
      fonts: geist
        ? [{ name: "Geist Mono", data: geist, weight: 700, style: "normal" }]
        : undefined,
    },
  );
}
