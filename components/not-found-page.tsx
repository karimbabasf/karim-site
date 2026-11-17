import Header, { Footer } from "@/components/blog/header";
import { blogLink, homeHref } from "@/lib/blog";
import "@/app/blog/blog.css";

/** The one 404 for the whole site: the blog's room, the message centred, two ways out. */
export default function NotFoundPage() {
  return (
    <div className="blog">
      <div className="bPage">
        <Header />
        <main className="bMain bLost">
          <h1>Page not found</h1>
          <p>The link is broken, or the page has moved.</p>
          <div className="bActions">
            <a href={homeHref} className="bBtn bBtnMain">
              Go home
            </a>
            <a href={blogLink()} className="bBtn">
              Read the blog
            </a>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
