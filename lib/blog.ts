import fs from "node:fs";
import path from "node:path";

export type PostMeta = {
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** One line for the index and the link preview. */
  summary: string;
  /** Layout samples: shown in dev (or with BLOG_SAMPLES=1), never in a production build. */
  sample?: boolean;
};

export type Post = PostMeta & { slug: string; minutes: number };

// Files starting with "_" (the template) are never posts. One must stay so the dynamic import resolves.
const DIR = path.join(process.cwd(), "content/blog");
const showSamples = process.env.NODE_ENV !== "production" || process.env.BLOG_SAMPLES === "1";

/** On blog.karimbabasf.com the routes sit at the root; everywhere else (dev, previews) under /blog. */
const onSubdomain = process.env.BLOG_ON_SUBDOMAIN === "1";
export const blogHref = (slug?: string) => (onSubdomain ? `/${slug ?? ""}` : slug ? `/blog/${slug}` : "/blog");
export const homeHref = onSubdomain ? "https://karimbabasf.com" : "/";
export const blogUrl = onSubdomain ? "https://blog.karimbabasf.com" : "https://karimbabasf.com/blog";

function minutes(source: string) {
  const body = source.replace(/export const meta[\s\S]*?\n};?\n/, "").replace(/<[^>]+>/g, " ");
  return Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 230));
}

export async function getPosts(): Promise<Post[]> {
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx") && !f.startsWith("_")) : [];
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { meta } = (await import(`@/content/blog/${slug}.mdx`)) as { meta: PostMeta };
      return { ...meta, slug, minutes: minutes(fs.readFileSync(path.join(DIR, file), "utf8")) };
    }),
  );
  return posts.filter((p) => showSamples || !p.sample).sort((a, b) => b.date.localeCompare(a.date));
}

const at = (iso: string) => new Date(`${iso}T12:00:00Z`);
export const longDate = (iso: string) =>
  at(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
export const shortDate = (iso: string) =>
  at(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
