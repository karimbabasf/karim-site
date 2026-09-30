import type { Viewport } from "next";
import Image from "next/image";
import { display, text } from "./fonts";
import { about, contact, intro, projects } from "@/lib/content";
import "./paper.css";

export const viewport: Viewport = {
  themeColor: "#fbfbf9",
  colorScheme: "light",
};

const socials = contact.links.filter((l) =>
  ["X", "LinkedIn", "GitHub"].includes(l.label),
);

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden
      focusable="false"
    >
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}

// A spec sheet read top to bottom: picture, name, about, projects, links.
// The margin rail on the left holds the portrait and each project's facts, so
// the main column stays one straight line for the eye.
export default function Home() {
  return (
    <div className={`k ${text.variable} ${display.variable}`}>
      <main className="k-sheet">
        <header className="k-head">
          <div className="k-rail">
            <Image
              className="k-face"
              src="/karim-head.jpg"
              alt="Karim Baba"
              width={400}
              height={500}
              loading="eager"
              quality={90}
              sizes="(min-width: 48rem) 104px, 76px"
            />
          </div>
          <div className="k-main">
            <h1 className="k-name">{intro.name}</h1>
            <p className="k-about">
              <span className="k-lede">{intro.lede}</span> {about.statement}{" "}
              {about.statementMore}
            </p>
          </div>
        </header>

        <section className="k-work" aria-labelledby="work">
          <h2 id="work" className="k-hidden">
            Projects
          </h2>
          <ol className="k-list">
            {projects.map((p, i) => (
              <li
                key={p.name}
                className="k-item"
                style={{ "--i": i } as React.CSSProperties}
              >
                <a
                  className="k-row"
                  href={p.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="k-meta">
                    {p.meta.map((m, j) =>
                      j === 1 && p.date ? (
                        <time key={m} dateTime={p.date}>
                          {m}
                        </time>
                      ) : (
                        <span key={m}>{m}</span>
                      ),
                    )}
                  </span>
                  <span className="k-main k-body">
                    <span className="k-pname">
                      {p.name}
                      <Arrow className="k-arrow" />
                    </span>
                    <span className="k-line">{p.line}</span>
                    <span className="k-detail">{p.detail}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <footer className="k-foot">
          <div className="k-main">
            <div className="k-buttons">
              <a className="k-btn k-btn-ink" href="/resume">
                Resume
              </a>
              <a className="k-btn" href={`mailto:${contact.email}`}>
                Email
              </a>
            </div>
            <nav className="k-links" aria-label="Elsewhere">
              {socials.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </footer>
      </main>
    </div>
  );
}
