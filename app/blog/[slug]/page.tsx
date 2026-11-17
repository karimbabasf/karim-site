import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header, { EMAIL, Footer, X_URL, icons } from "@/components/blog/header";
import { blogHref, blogUrl, getPosts, longDate } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

// Unknown slugs reach the page and call notFound(), so they get the blog's own 404 (app/blog/not-found.tsx).
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPosts()).find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `${blogUrl}/${slug}` },
    openGraph: { type: "article", title: post.title, description: post.summary, publishedTime: post.date },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary, creator: "@karimbabasf" },
  };
}

const Arrow = ({ back }: { back?: boolean }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className="bArrow">
    <path
      d={back ? "M10 3.5 5.5 8l4.5 4.5" : "M6 3.5 10.5 8 6 12.5"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const posts = await getPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const post = posts[i];
  const newer = posts[i - 1];
  const older = posts[i + 1];
  const { default: Body } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <div className="bPage">
      <Header />
      <main className="bMain">
        <article>
          <header className="bPostHead">
            <h1>{post.title}</h1>
            <p>
              <time dateTime={post.date}>{longDate(post.date)}</time>
              <span aria-hidden="true">&middot;</span>
              {post.minutes} min read
            </p>
          </header>
          <div className="prose">
            <Body />
          </div>
        </article>

        <aside className="bAuthor" aria-label="About the author">
          <p>
            <strong>Karim Baba</strong> is an engineer and founder in San Francisco. New posts go out on X first.
          </p>
          <div className="bActions">
            <a href={X_URL} target="_blank" rel="noopener" className="bBtn bBtnMain">
              <svg viewBox="0 0 24 24" aria-hidden="true">{icons.x}</svg>
              Follow on X
            </a>
            <a href={`mailto:${EMAIL}`} className="bBtn">
              Email me
            </a>
          </div>
        </aside>

        {older || newer ? (
          <nav className="bPager" aria-label="More posts">
            {older ? (
              <Link href={blogHref(older.slug)} className="bPrev" rel="prev">
                <Arrow back />
                <span>{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link href={blogHref(newer.slug)} className="bNext" rel="next">
                <span>{newer.title}</span>
                <Arrow />
              </Link>
            ) : null}
          </nav>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
