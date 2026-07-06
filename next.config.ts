import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats; AVIF first, WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit quality allowlist; 90 for the crisp portrait.
    qualities: [75, 90],
  },
};

export default nextConfig;
