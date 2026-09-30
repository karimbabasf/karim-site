import type { Viewport } from "next";
import Image from "next/image";
import localFont from "next/font/local";
import { ArrowUpRight } from "@/components/v3/icons";
import { about, contact, intro, projects } from "@/lib/content";
import "./simple.css";

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const sans = localFont({
  src: [
    { path: "../public/fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const socials = contact.links.filter((l) => ["X", "GitHub", "LinkedIn"].includes(l.label));

// One column, read top to bottom: picture, name, about, projects, buttons.
// Each block rises in on that same order (the --i index sets its delay).
export default function Home() {
  return (
    <div className={`s ${sans.variable}`}>
      <main className="s-col">
        <div className="s-portrait" style={{ "--i": 0 } as React.CSSProperties}>
          <Image
            src="/work/portrait-tall.jpg"
            alt="Karim Baba"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="160px"
          />
        </div>

        <h1 className="s-name" style={{ "--i": 1 } as React.CSSProperties}>
          {intro.name}
        </h1>

        <p className="s-about" style={{ "--i": 2 } as React.CSSProperties}>
          {intro.lede} {about.statement} {about.statementMore}
        </p>

        <section className="s-projects" aria-labelledby="projects" style={{ "--i": 3 } as React.CSSProperties}>
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
                    <a className="s-row" href={p.href} target="_blank" rel="noreferrer noopener">
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

        <div className="s-actions" style={{ "--i": 4 } as React.CSSProperties}>
          <div className="s-buttons">
            <a className="s-btn s-btn-fill" href="/Karim-Baba-Resume.pdf">
              Download CV
            </a>
            <a className="s-btn" href={`mailto:${contact.email}`}>
              Email me
            </a>
          </div>
          <nav className="s-socials" aria-label="Elsewhere">
            {socials.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </main>
    </div>
  );
}
