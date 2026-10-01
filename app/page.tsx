import type { Viewport } from "next";
import Image from "next/image";
import { code, sans } from "./fonts";
import { about, contact, intro, projects } from "@/lib/content";
import { Clock } from "@/components/instrument/clock";
import { CopyEmail } from "@/components/instrument/copy-email";
import { ArrowUpRight, Sheet } from "@/components/instrument/icons";
import { Light } from "@/components/instrument/light";
import { Rack } from "@/components/instrument/rack";
import "./instrument.css";

export const viewport: Viewport = {
  themeColor: "#dfe1e2",
  colorScheme: "light",
};

const socials = contact.links.filter((l) => ["X", "LinkedIn", "GitHub"].includes(l.label));

// One instrument, read top to bottom: his photo behind glass and his name
// engraved beside it, what he builds, the four project modules, and the panel
// with the ways to reach him.
export default function Home() {
  return (
    <div className={`face ${sans.variable} ${code.variable}`}>
      <Light />
      <main className="unit">
        <header className="ident">
          <figure className="window">
            <Image
              src="/work/portrait-tall.jpg"
              alt="Portrait of Karim Baba"
              width={600}
              height={750}
              sizes="(min-width: 40rem) 104px, 76px"
              loading="eager"
              fetchPriority="high"
              quality={90}
            />
          </figure>
          <h1 className="nameplate">
            {intro.name.split(" ").map((word, i) => (
              <span key={word}>
                {i ? " " : null}
                {word}
              </span>
            ))}
          </h1>
          <p className="ident-meta">
            <span>San Francisco</span>
            <Clock />
          </p>
        </header>

        <section className="about" aria-label="About">
          <p className="lede">{intro.lede}</p>
          <p className="statement">
            {about.statement} {about.statementMore}
          </p>
        </section>

        <section className="work" aria-labelledby="work">
          <h2 id="work" className="vh">
            Projects
          </h2>
          <div className="pocket">
            <Rack projects={projects} />
          </div>
        </section>

        <section className="io pocket" aria-labelledby="contact">
          <h2 id="contact" className="io-head">
            Contact
          </h2>
          <div className="io-row">
            <a className="key raised" href="/resume">
              <Sheet className="key-icon" />
              Resume
            </a>
            <a className="key raised key--lamp" href={`mailto:${contact.email}`}>
              <i className="lamp" aria-hidden />
              Email
            </a>
            <CopyEmail email={contact.email} />
          </div>
          <ul className="io-row io-socials">
            {socials.map((l) => (
              <li key={l.href}>
                <a className="key raised" href={l.href} target="_blank" rel="noreferrer noopener">
                  {l.label}
                  <ArrowUpRight className="key-icon" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
