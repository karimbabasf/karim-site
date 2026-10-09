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
                    Phosphor <span className="sub">agent-driven DeFi with a human approval gate</span>
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
                  Local desktop app with 52 MCP tools, so an existing AI agent
                  subscription can run DeFi positions: key custody, a policy engine
                  that simulates and budget-checks every write, and in-app human
                  approval. NEAR Intents across 30+ chains plus Hyperliquid
                  perpetuals, open source and live on mainnet.
                </p>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Warden <span className="sub">multi-agent orchestration for AI coding</span>
                  </h3>
                  <a className="meta" href="https://github.com/karimbabasf" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
                <p>
                  Parallel AI coding agents collide on a shared codebase. Warden
                  gives each one isolation, coordinates their work, and puts
                  sessions, process state, token spend and file activity in a
                  single live view. 80,000 lines of Rust and TypeScript.
                </p>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Switchboard <span className="sub">business automation across phone, email and messaging</span>
                  </h3>
                  <span className="meta">handling real customers since 2026</span>
                </div>
                <p>
                  Operations automation for a supplies business I co-founded.
                  Calls, email and text resolve to one contact record, and a voice
                  agent fields the phone line. Intuit ships no MCP server, so I
                  built one: ten tools over the live books, six read-only and four
                  writes, turning approved quotes into QuickBooks invoices.
                </p>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Blast <span className="sub">the hiring layer for AI agents</span>
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
                  Coding agents hire specialist agents through an MCP server.
                  Candidates audition live on the actual job, cross-lab judges
                  score the work, and Stripe holds the payment and captures it
                  only when the winner passes every check.
                </p>
              </div>
            </section>

            <section>
              <h2>Awards</h2>
              <ul>
                <li>Winner, Stripe track, Supabase Select hackathon, 2026 (Blast).</li>
                <li>Built SolBid, agent-to-agent auctions with on-chain payments, at the Solana Agent Hackathon, 2026.</li>
              </ul>
            </section>

            <section>
              <h2>Experience</h2>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Business Development &amp; SF Liaison, Contributor <span className="sub">1Claw</span>
                  </h3>
                  <span className="meta">San Francisco · Since 2026</span>
                </div>
                <ul>
                  <li>
                    Own 1Claw's San Francisco presence, sourcing partnerships,
                    design partners and investor relationships in person.
                  </li>
                  <li>
                    Lead technical education, explaining key custody, LLM firewall
                    behavior and cross-chain signing to founders and developers.
                  </li>
                </ul>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    SMM / BDR <span className="sub">Multisender.app</span>
                  </h3>
                  <span className="meta">San Francisco · 5 years, since 2021</span>
                </div>
                <ul>
                  <li>
                    Built a signal-gated lead engine that ranks organizations on
                    likelihood to buy a batch-transfer product, weighting recurring
                    payouts such as payroll and grants above one-time events.
                  </li>
                  <li>
                    Ran daily content for a verified brand account. Standalone posts
                    capped near 850 views, so replies under active threads became
                    the main channel.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2>Skills &amp; Education</h2>
              <p>
                TypeScript, Rust, React, Node.js · MCP, multi-agent orchestration ·
                Postgres, Stripe · EVM, NEAR Intents, Solana
              </p>
              <p>Acellus Academy, high school diploma in progress.</p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
