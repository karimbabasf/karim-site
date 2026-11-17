import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// The blog answers on blog.karimbabasf.com once BLOG_ON_SUBDOMAIN=1 is set in
// Vercel and the subdomain is added to this project. Until then it lives at /blog.
const BLOG_HOST = "blog.karimbabasf.com";
const onBlogHost = [{ type: "host" as const, value: BLOG_HOST }];
const blogOnSubdomain = process.env.BLOG_ON_SUBDOMAIN === "1";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    // Serve modern formats; AVIF first, WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit quality allowlist; 90 for the crisp portrait.
    qualities: [75, 90],
  },
  // The homepage is a hand-built static page (public/home.html: WebGL light, no framework JS).
  // beforeFiles runs ahead of app/page.tsx, so "/" is served straight from the CDN.
  async rewrites() {
    return {
      beforeFiles: [
        // On the blog host, "/" and "/<slug>" serve the /blog routes. Slugs carry no dot,
        // so assets (/og.jpg, /_next/...) pass through untouched. Rewrites chain, so the
        // slug rule skips "blog" or "/" would land on /blog/blog.
        { source: "/", has: onBlogHost, destination: "/blog" },
        { source: "/feed.xml", has: onBlogHost, destination: "/blog/feed.xml" },
        { source: "/:slug((?!blog$)[a-z0-9-]+)", has: onBlogHost, destination: "/blog/:slug" },
        { source: "/", missing: onBlogHost, destination: "/home.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    if (!blogOnSubdomain) return [];
    return [
      { source: "/blog", missing: onBlogHost, destination: `https://${BLOG_HOST}`, permanent: false },
      { source: "/blog/:path*", missing: onBlogHost, destination: `https://${BLOG_HOST}/:path*`, permanent: false },
    ];
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

export default createMDX({ extension: /\.mdx?$/ })(nextConfig);
