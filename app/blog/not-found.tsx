import Link from "next/link";
import Header, { Footer } from "@/components/blog/header";
import { blogHref } from "@/lib/blog";

export default function BlogNotFound() {
  return (
    <div className="bPage">
      <Header />
      <main className="bMain">
        <div className="bPostHead">
          <h1>This post does not exist.</h1>
          <p>
            <Link href={blogHref()} className="bInline">
              See all posts
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
