import Link from "next/link";
import Header, { Footer, X_URL } from "@/components/blog/header";
import { blogHref, getPosts, shortDate } from "@/lib/blog";

// Age at build time. Every post ships with a deploy, so the number stays true.
function age() {
  const now = new Date();
  const years = now.getUTCFullYear() - 2009;
  const hadBirthday = now.getUTCMonth() > 0 || (now.getUTCMonth() === 0 && now.getUTCDate() >= 30);
  return hadBirthday ? years : years - 1;
}

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <div className="bPage">
      <Header />
      <main className="bMain">
        <header className="bIntro">
          <h1>Blog</h1>
          <p>Tech, startups and life, by a {age()} y/o</p>
        </header>

        {posts.length === 0 ? (
          <section className="bEmpty" aria-label="Posts">
            <p>
              No posts yet.{" "}
              <a href={X_URL} target="_blank" rel="noopener">
                Follow on X
              </a>{" "}
              for the first one.
            </p>
          </section>
        ) : (
          <ol className="bList" aria-label="Posts" reversed>
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={blogHref(p.slug)} className="bRow">
                  <h2>{p.title}</h2>
                  <time dateTime={p.date}>{shortDate(p.date)}</time>
                  {p.summary ? <p>{p.summary}</p> : null}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </main>
      <Footer />
    </div>
  );
}
