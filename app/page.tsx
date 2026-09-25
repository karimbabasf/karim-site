import localFont from "next/font/local";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Nav from "@/components/v3/nav";
import Hero from "@/components/v3/hero";
import Feature from "@/components/v3/feature";
import WorkIndex from "@/components/v3/work-index";
import GlobeLazy from "@/components/v3/globe-lazy";
import CopyEmail from "@/components/v3/copy-email";
import { about, contact, experience, features } from "@/lib/content";
import "./home.css";

const manrope = localFont({
  src: "./fonts-v3/Manrope-Variable.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts-v3/GeistMono-Variable.woff2",
  variable: "--font-geist-mono-v3",
  weight: "100 900",
  display: "swap",
});

export default function Home() {
  return (
    <div className={`v3 ${manrope.variable} ${geistMono.variable}`}>
      <Nav />
      <main>
        <Hero />

        <section id="work" className="v3-section" style={{ scrollMarginTop: 40 }}>
          <div className="v3-wrap">
            <h2 className="v3-h2">
              Selected work. <span>Built alone, end to end, and in use.</span>
            </h2>
            {features.map((f, i) => (
              <Feature key={f.id} f={f} priority={i === 0} />
            ))}
          </div>
        </section>

        <section className="v3-section">
          <div className="v3-wrap">
            <h2 className="v3-h2">
              More projects. <span>Tools, experiments and open source.</span>
            </h2>
            <WorkIndex />
          </div>
        </section>

        <section id="experience" className="v3-section" style={{ scrollMarginTop: 40 }}>
          <div className="v3-wrap">
            <h2 className="v3-h2">Experience</h2>
            <div className="v3-exp">
              {experience.map((e) => (
                <div key={e.org} className="v3-exp-item">
                  <div className="v3-exp-org">
                    {e.href ? (
                      <a href={e.href} target="_blank" rel="noreferrer noopener" className="v3-link">
                        {e.org}
                        <ArrowUpRight weight="bold" />
                      </a>
                    ) : (
                      e.org
                    )}
                  </div>
                  <div>
                    <p className="v3-exp-role">{e.role}</p>
                    <p className="v3-exp-body">{e.body}</p>
                  </div>
                  <div className="v3-exp-when mono">{e.when}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="v3-section" style={{ scrollMarginTop: 40 }}>
          <div className="v3-wrap">
            <h2 className="v3-h2">About</h2>
            <div className="v3-about">
              <p className="v3-about-lead">
                Five years on-chain, one year of agent-driven engineering.{" "}
                <span>The two meet wherever software is trusted to act on its own.</span>
              </p>
              <div className="v3-about-body">
                {about.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <a className="v3-link" href="/resume">
                  Read the résumé
                  <ArrowUpRight weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="v3-contact">
          <div className="v3-wrap">
            <div className="v3-contact-grid">
              <div>
                <h2 className="v3-h2">
                  Based in San Francisco. <span>Open to engineering work on agent infrastructure.</span>
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <a className="v3-email" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                  <CopyEmail email={contact.email} />
                </div>
                <div className="v3-socials">
                  {contact.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
              <GlobeLazy />
            </div>
            <footer className="v3-foot">
              <span>© 2026 Karim Baba</span>
              <span className="mono">37.77° N, 122.42° W</span>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
