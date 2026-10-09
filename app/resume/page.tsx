import type { Metadata, Viewport } from "next";
import ResumeToolbar from "@/components/resume-toolbar";
import "./resume.css";

// One family throughout: Geist, from the root layout.

export const metadata: Metadata = {
  title: "Karim Baba, Résumé",
  description: "Preview and download Karim Baba's résumé.",
};

export const viewport: Viewport = {
  themeColor: "#1b1a18",
  colorScheme: "dark",
};

// Each contact carries a short label for the screen and the bare URL for paper.
const LINKS = [
  { label: "founder@karimbabasf.com", url: "founder@karimbabasf.com", href: "mailto:founder@karimbabasf.com" },
  { label: "LinkedIn", url: "linkedin.com/in/karim-baba-130547289", href: "https://www.linkedin.com/in/karim-baba-130547289/" },
  { label: "X / @karimbabasf", url: "x.com/karimbabasf", href: "https://x.com/karimbabasf" },
  { label: "GitHub", url: "github.com/karimbabasf", href: "https://github.com/karimbabasf" },
  { label: "Telegram", url: "t.me/karimbabasf", href: "https://t.me/karimbabasf" },
];

export default function ResumePage() {
  return (
    <div className="resumePage">
      <ResumeToolbar />

      <div className="resumeDesk">
        <div className="resumeDoc">
          <article className="sheet">
            <header>
              <h1 className="name">Karim Baba</h1>
              <p className="tagline">
                Software Engineer<span className="dot" />Agent Infrastructure<span className="dot" />Crypto
              </p>
              <p className="contact">
                <span className="item">San Francisco, CA</span>{" "}
                {LINKS.map((l) => (
                  <span className="item" key={l.href}>
                    <a
                      href={l.href}
                      {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span className="btn-label">{l.label}</span>
                      <span className="btn-url">{l.url}</span>
                    </a>
                  </span>
                )).flatMap((el, i) => (i ? [" ", el] : [el]))}
              </p>
            </header>

            <p className="summary">
              Software engineer with three years of experience across agent
              infrastructure, developer tooling and blockchain systems. I build
              orchestration harnesses, key custody and transaction signing, and
              the policy controls that require human approval before an agent
              executes an irreversible action. On-chain since 2021.
            </p>

            <section>
              <h2>Selected Projects</h2>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Phosphor <span className="sub">swap, trade and manage crypto with an AI agent</span>
                  </h3>
                  <a
                    className="meta"
                    href="https://github.com/karimbabasf/phosphor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
                <p>
                  Mac app where an AI agent can swaps, trades and manages my crypto through 52 tools: swaps across 30+ chains, Hyperliquid perpetuals, and every balance and position in one place. Every move waits for my approval inside limits I set, with keys in a Touch ID vault. Open source, live on mainnet.
                </p>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Warden <span className="sub">every AI coding session on one screen</span>
                  </h3>
                  <a className="meta" href="https://github.com/karimbabasf/WARDEN" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
                <p>
                  Mac app that keeps multi-agent workflows organized: every running
                  Claude Code and Codex session on one screen, showing what each agent
                  is doing and in which project, read from local transcripts.
                </p>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Switchboard <span className="sub">AI phone line for my moving-supply company</span>
                  </h3>
                  <span className="meta">live on real calls since Jul 2026</span>
                </div>
                <p>
                  Phone, email, and messaging automation for businesses. The agent answers from the product catalogue, routes callers to a quote, a text or a person, and records, transcribes and summarizes every call into one thread per customer.
                </p>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Blast <span className="sub">the hiring layer for AI agents, won the Stripe track at the Supabase Select hackathon</span>
                  </h3>
                  <a
                    className="meta"
                    href="https://github.com/karimbabasf/Blast"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
                <p>
                  Marketplace where coding agents hire specialist agents through an
                  MCP server. Candidates audition live on the actual job, judges from
                  different AI labs score the work, and Stripe holds the payment and
                  captures it only when the winner passes every check.
                </p>
              </div>
            </section>


            <section>
              <h2>Experience</h2>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    AI Forward Engineer <span className="sub">GenPulse</span>
                  </h3>
                  <span className="meta">San Francisco · 2026</span>
                </div>
                <ul>
                  <li>
                    Lead AI integration, application development and frontend design
                    across the company's products.
                  </li>
                  <li>
                    Took each project end to end, from finding where AI saves time or wins sales to shipping it to production.
                  </li>
                </ul>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Business Development &amp; SF Liaison, Contributor <span className="sub"><a href="https://1claw.xyz" target="_blank" rel="noopener noreferrer">1Claw</a></span>
                  </h3>
                  <span className="meta">San Francisco · 2026</span>
                </div>
                <ul>
                  <li>
                    Represented 1Claw's San Francisco presence, sourcing partnerships, design partners and investor relationships in person.
                  </li>
                  <li>
                    Lead technical education on key custody, LLM firewalls and
                    cross-chain signing for founders and developers.
                  </li>
                </ul>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    SMM / BDR <span className="sub"><a href="https://multisender.app" target="_blank" rel="noopener noreferrer">Multisender.app</a></span>
                  </h3>
                  <span className="meta">San Francisco · 2026</span>
                </div>
                <ul>
                  <li>
                    Built a lead engine that ranks organizations on how likely they
                    are to buy a batch-transfer product.
                  </li>
                  <li>
                    Ran daily content for a verified brand account, built around
                    replies once standalone posts capped near 850 views.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2>Education</h2>
              <div className="entry">
                <div className="entry-top">
                  <h3>
                    High school diploma <span className="sub"><a href="https://www.acellusacademy.com" target="_blank" rel="noopener noreferrer">Acellus Academy</a></span>
                  </h3>
                  <span className="meta">Graduating 2027</span>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
