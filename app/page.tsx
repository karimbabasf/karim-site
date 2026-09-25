import Image from "next/image";
import { Inter_Tight } from "next/font/google";
import Nav from "@/components/v3/nav";
import Reveal from "@/components/v3/reveal";
import WorkIndex from "@/components/v3/work-index";
import CopyEmail from "@/components/v3/copy-email";
import { about, contact, experience, features } from "@/lib/content";
import "./home.css";

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function Home() {
  return (
    <div className={`v3 ${sans.variable}`}>
      <Nav />
      <main>
        <section className="wrap hero" id="top">
          <h1>Karim Baba</h1>
          <div className="hero-row">
            <div>
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
            <figure className="portrait">
              <div className="portrait-img">
                <Image src="/work/portrait.jpg" alt="Karim Baba" fill priority sizes="240px" />
              </div>
              <figcaption>
                <span>Karim Baba</span>
                <span>San Francisco</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="work" className="wrap section">
          <div className="section-head">
            <h2>Selected work</h2>
            <span className="num">2025 to 2026</span>
          </div>
          {features.map((f, i) => {
            const s = f.shots[0];
            return (
              <article key={f.id} className="project" id={f.id}>
                <Reveal>
                  <div className="shot">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={s.w}
                      height={s.h}
                      priority={i === 0}
                      sizes="(min-width: 1280px) 1168px, 100vw"
                    />
                  </div>
                  <div className="project-text">
                    <div>
                      <h3 className="project-name">{f.name}</h3>
                      <p className="project-line">{f.line}</p>
                    </div>
                    <p className="project-body">{f.body}</p>
                    <div>
                      <dl className="facts">
                        {f.facts.map((x) => (
                          <div key={x.label}>
                            <dt>{x.label}</dt>
                            <dd className="num">{x.value}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="project-links">
                        {f.links.map((l) => (
                          <a key={l.href} className="ul" href={l.href} target="_blank" rel="noreferrer noopener">
                            {l.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </article>
            );
          })}
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
            <div />
            <Reveal className="about-body">
              {about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <a className="ul" href="/resume" style={{ fontSize: 16, fontWeight: 500 }}>
                Read the résumé
              </a>
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
