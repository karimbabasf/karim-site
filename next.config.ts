import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats; AVIF first, WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit quality allowlist; 90 for the crisp portrait.
    qualities: [75, 90],
  },
  // The homepage is a hand-built static page (public/home.html: WebGL light, no framework JS).
  // beforeFiles runs ahead of app/page.tsx, so "/" is served straight from the CDN.
  async rewrites() {
    return { beforeFiles: [{ source: "/", destination: "/home.html" }], afterFiles: [], fallback: [] };
  },
  async headers() {
    return [
      {
        source: "/fonts/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Translations change with the copy; a day of cache, then a quiet revalidate.
        source: "/i18n.json",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
      {
        // The résumé button used to rely only on the anchor's `download`
        // attribute. iOS Safari ignores it and in-app webviews (Instagram,
        // LinkedIn, X, Telegram) cancel the navigation outright, so a tap on a
        // phone did nothing at all. The server has to be the one asking for the
        // save, so send Content-Disposition instead of trusting the client.
        source: "/Karim-Baba-Resume.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Karim-Baba-Resume.pdf"',
          },
          {
            key: "Content-Type",
            value: "application/pdf",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
