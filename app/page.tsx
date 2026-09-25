import Image from "next/image";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import Nav from "@/components/v3/nav";
import Reveal from "@/components/v3/reveal";
import WorkIndex from "@/components/v3/work-index";
import FeatureList from "@/components/v3/feature-list";
import CopyEmail from "@/components/v3/copy-email";
import { about, contact, experience } from "@/lib/content";
import "./home.css";

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Each featured title is set in its own product's wordmark face.
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
});

export default function Home() {
  return (
    <div className={`v3 ${sans.variable} ${phosphorFace.variable} ${wardenFace.variable} ${frontierFace.variable}`}>
      <div className="backdrop" aria-hidden />
      <Nav />
      <main>
        <section className="wrap hero" id="top">
          <div className="hero-grid">
            <div className="hero-text">
              <h1>Karim Baba</h1>
              <p className="hero-lede">
                Software engineer in San Francisco, building infrastructure for AI agents.{" "}
                <span>
                  Systems that act on their own and stop for a person before anything irreversible.
                </span>
              </p>
              <div className="hero-meta">
                <span>
                  Business development at{" "}
                  <a className="ul" href="https://1claw.xyz" target="_blank" rel="noreferrer noopener">
                    1Claw
                  </a>
                </span>
                <span>On-chain since 2021</span>
                <a className="ul" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </div>
            </div>
            <div className="portrait">
              <Image
                src="/work/portrait-tall.jpg"
                alt="Karim Baba"
                fill
                priority
                sizes="(min-width: 960px) 320px, 60vw"
              />
            </div>
          </div>
        </section>

        <section id="work" className="wrap section">
          <div className="section-head">
            <h2>Selected work</h2>
            <span>Select a project for details</span>
          </div>
          <FeatureList />
        </section>

        <section className="wrap section">
          <div className="section-head">
            <h2>More projects</h2>
            <span>{"Tools, experiments and open source"}</span>
          </div>
          <WorkIndex />
        </section>

        <section id="experience" className="wrap section">
          <div className="section-head">
            <h2>Experience</h2>
          </div>
          {experience.map((e) => (
            <div key={e.org} className="exp-item">
              <div className="exp-org">
                {e.href ? (
                  <a className="ul" href={e.href} target="_blank" rel="noreferrer noopener">
                    {e.org}
                  </a>
                ) : (
                  e.org
                )}
              </div>
              <div>
                <p className="exp-role">{e.role}</p>
                <p className="exp-body">{e.body}</p>
              </div>
              <div className="exp-when num">{e.when}</div>
            </div>
          ))}
        </section>

        <section id="about" className="wrap section">
          <div className="section-head">
            <h2>About</h2>
          </div>
          <div className="about">
            <div className="about-side">
              <dl className="about-facts">
                {about.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="project-links">
                <a className="pill" href="/resume">
                  Read the résumé
                </a>
                <a className="pill" href="/Karim-Baba-Resume.pdf">
                  Download PDF
                </a>
              </div>
            </div>
            <Reveal>
              <p className="about-lead">{about.lead}</p>
              <div className="about-cols">
                {about.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="wrap section">
          <div className="section-head">
            <h2>Contact</h2>
            <span>Open to engineering work on agent infrastructure</span>
          </div>
          <div className="contact">
            <a className="contact-mail" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <div className="contact-row">
              <CopyEmail email={contact.email} />
              {contact.links.map((l) => (
                <a key={l.href} className="ul" href={l.href} target="_blank" rel="noreferrer noopener">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <footer className="foot">
            <span>© 2026 Karim Baba</span>
            <span className="num">San Francisco</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
