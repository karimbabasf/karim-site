import type { Viewport } from "next";
import Image from "next/image";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import Nav from "@/components/v3/nav";
import WorkIndex from "@/components/v3/work-index";
import FeatureList from "@/components/v3/feature-list";
import CopyEmail from "@/components/v3/copy-email";
import { ArrowDown, ArrowUpRight } from "@/components/v3/icons";
import { about, contact, experience, intro } from "@/lib/content";
import "./home.css";

// The root layout is dark for the older pages; this one is paper.
export const viewport: Viewport = {
  themeColor: "#f3f1ec",
  colorScheme: "light",
};

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Each featured title is set in its own product's wordmark face. Sora and Commit Mono
// are subset to the letters of their one word (about 1 KB each). New Title is kept whole,
// since its license does not clearly allow editing the file, so it skips the preload
// and loads after first paint: it only draws a title below the fold.
const phosphorFace = localFont({
  src: "./fonts-brand/Sora-SemiBold.woff2",
  weight: "600",
  variable: "--face-phosphor",
  display: "swap",
});
const wardenFace = localFont({
  src: "./fonts-brand/commit-mono-700.woff2",
  weight: "700",
  variable: "--face-warden",
  display: "swap",
});
const frontierFace = localFont({
  src: "./fonts-brand/new-title-variable.woff2",
  weight: "200 700",
  variable: "--face-frontier",
  display: "swap",
  preload: false,
});

export default function Home() {
  return (
    <div className={`v3 ${sans.variable} ${phosphorFace.variable} ${wardenFace.variable} ${frontierFace.variable}`}>
      <div className="backdrop" aria-hidden />
      <div className="glow" aria-hidden />
      <Nav />
      <main>
        <section className="wrap hero" id="top">
          <div className="hero-grid">
            <h1 className="hero-name">
              <span className="word">
                <span>Karim</span>
              </span>{" "}
              <span className="word">
                <span>Baba</span>
              </span>
            </h1>
            <p className="hero-lede">
              {intro.lede} <span>{intro.ledeMore}</span>
            </p>
            <div className="portrait">
              <Image
                src="/work/portrait-tall.jpg"
                alt="Portrait of Karim Baba"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 960px) 300px, (min-width: 650px) 260px, 40vw"
              />
            </div>
          </div>
          <div className="hero-bar">
            <span>
              Business development at{" "}
              <a className="ul" href="https://1claw.xyz" target="_blank" rel="noreferrer noopener">
                1Claw
              </a>
            </span>
            <a className="ul" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <a className="hero-next" href="#work">
              Selected work
              <ArrowDown />
            </a>
          </div>
        </section>

        <section id="work" className="wrap screen">
          <div className="section-head">
            <h2>Selected work</h2>
            <span>Select a project for details</span>
          </div>
          <FeatureList />
        </section>

        <section id="projects" className="wrap screen">
          <div className="section-head">
            <h2>More projects</h2>
            <span>Tools and experiments</span>
          </div>
          <WorkIndex />
        </section>

        <section id="about" className="wrap screen">
          <div className="section-head">
            <h2>About</h2>
          </div>
          <div className="about">
            <p className="about-statement">
              {about.statement} <span>{about.statementMore}</span>
            </p>
            <ul className="exp">
              {experience.map((e) => (
                <li key={e.org} className="exp-item">
                  <span className="exp-org">
                    {e.href ? (
                      <a className="ul" href={e.href} target="_blank" rel="noreferrer noopener">
                        {e.org}
                      </a>
                    ) : (
                      e.org
                    )}
                  </span>
                  <span className="exp-role">{e.role}</span>
                  <span className="exp-when num">{e.when}</span>
                  <span className="exp-line">{e.line}</span>
                </li>
              ))}
            </ul>
            <div className="about-actions">
              <a className="pill" href="/resume">
                Read the résumé
              </a>
              <a className="pill" href="/Karim-Baba-Resume.pdf">
                Download PDF
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="wrap screen contact">
          <div className="contact-body">
            <div className="section-head">
              <h2>Contact</h2>
            </div>
            <div className="contact-grid">
              <div>
                <div className="contact-mail-row">
                  <a className="contact-mail" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                  <CopyEmail email={contact.email} />
                </div>
              </div>
              <ul className="socials">
                {contact.links.map((l) => (
                  <li key={l.href}>
                    <a className="social" href={l.href} target="_blank" rel="noreferrer noopener">
                      <span className="social-name">{l.label}</span>
                      <span className="social-handle">{l.handle}</span>
                      <ArrowUpRight className="social-arrow" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <footer className="foot">
            <span>© 2026 Karim Baba</span>
            <a className="ul" href="#top">
              Back to top
            </a>
          </footer>
        </section>
      </main>
    </div>
  );
}
