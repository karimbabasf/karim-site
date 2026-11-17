import { blogUrl, getPosts } from "@/lib/blog";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const posts = await getPosts();
  const items = posts
    .map(
      (p) => `<item><title>${esc(p.title)}</title><link>${blogUrl}/${p.slug}</link><guid>${blogUrl}/${p.slug}</guid><pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate><description>${esc(p.summary)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Karim Baba, Blog</title><link>${blogUrl}</link><description>Posts by Karim Baba, engineer and founder in San Francisco.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
