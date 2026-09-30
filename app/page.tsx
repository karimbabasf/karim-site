import type { Viewport } from "next";
import Image from "next/image";
import { typed } from "./fonts";
import { about, contact, intro, projects } from "@/lib/content";
import { inkName, inkSignature } from "@/lib/handwriting";
import { CardFile } from "@/components/card-file";
import { Paperclip } from "@/components/paperclip";
import { Pen } from "@/components/pen";
import { SignOff } from "@/components/sign-off";
import "./cards.css";

export const viewport: Viewport = {
  themeColor: "#e9e8e4",
  colorScheme: "light",
};

const socials = contact.links.filter((l) => ["X", "LinkedIn", "GitHub"].includes(l.label));

// Index cards on a desk, read top to bottom: the card with his name and photo,
// the file of project cards, and the front card with the ways to reach him.
export default function Home() {
  return (
    <div className={`desk ${typed.variable}`}>
      <main className="stack">
        <article className="card card--me">
          <header className="card-head">
            <h1 className="me-name">
              <span className="sr-only">{intro.name}</span>
              <Pen ink={inkName} className="ink ink--write" delay={200} />
            </h1>
            <figure className="print">
              <Image
                src="/karim-instax.jpg"
                alt="Portrait of Karim Baba"
                width={480}
                height={647}
                sizes="(min-width: 35rem) 88px, 64px"
                loading="eager"
                fetchPriority="high"
                quality={90}
              />
            </figure>
            <Paperclip className="clip" />
          </header>
          <div className="card-body">
            <p>{intro.lede}</p>
            <p>
              {about.statement} {about.statementMore}
            </p>
          </div>
        </article>

        <CardFile
          projects={projects}
          front={
            <article className="card card--front" aria-labelledby="contact">
              <h2 className="card-head" id="contact">
                Contact
              </h2>
              <div className="card-body">
                <p>
                  Read my <a href="/resume">resume</a>, or email{" "}
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                </p>
                <p>
                  Find me on{" "}
                  {socials.map((l, i) => (
                    <span key={l.href}>
                      <a href={l.href} target="_blank" rel="noreferrer noopener">
                        {l.label}
                      </a>
                      {i < socials.length - 2 ? ", " : i === socials.length - 2 ? " and " : "."}
                    </span>
                  ))}
                </p>
              </div>
              <SignOff>
                <Pen ink={inkSignature} className="ink ink--sign" delay={350} />
              </SignOff>
            </article>
          }
        />
      </main>
    </div>
  );
}
