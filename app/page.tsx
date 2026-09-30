import type { Viewport } from "next";
import Image from "next/image";
import { display, sans } from "./fonts";
import { ArrowUpRight } from "@/components/v3/icons";
import { about, contact, intro, projects } from "@/lib/content";
import "./simple.css";

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const socials = contact.links.filter((l) =>
  ["X", "GitHub", "LinkedIn"].includes(l.label),
);

// One column, read top to bottom: picture, name, about, projects, buttons.
// Each block rises in on that same order (the --i index sets its delay).
// On desktop the picture takes the left half and the rest stacks on the right,
// sized to the viewport so the whole page fits one screen.
export default function Home() {
  return (
    <div className={`s ${sans.variable} ${display.variable}`}>
      <main className="s-col">
        <div className="s-portrait" style={{ "--i": 0 } as React.CSSProperties}>
          <Image
            src="/karim.jpg"
            alt="Karim Baba"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 960px) 45vw, 160px"
          />
        </div>

        <div className="s-info">
          <h1 className="s-name" style={{ "--i": 1 } as React.CSSProperties}>
            {intro.name}
          </h1>

          <p className="s-about" style={{ "--i": 2 } as React.CSSProperties}>
            {intro.lede} {about.statement} {about.statementMore}
          </p>

          <section
            className="s-projects"
            aria-labelledby="projects"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <h2 id="projects" className="s-label">
              Projects
            </h2>
            <ul>
              {projects.map((p) => {
                const body = (
                  <>
                    <span className="s-pname">
                      {p.name}
                      {p.note && <span className="s-note">{p.note}</span>}
                    </span>
                    <span className="s-pline">{p.line}</span>
                    {p.href && <ArrowUpRight className="s-arrow" />}
                  </>
                );
                return (
                  <li key={p.name}>
                    {p.href ? (
                      <a
                        className="s-row"
                        href={p.href}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="s-row">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <div
            className="s-actions"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <div className="s-buttons">
              <a className="s-btn s-btn-fill" href="/resume">
                Resume
              </a>
              <a className="s-btn" href={`mailto:${contact.email}`}>
                Email me
              </a>
            </div>
            <nav className="s-socials" aria-label="Elsewhere">
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
        </div>
      </main>
    </div>
  );
}
