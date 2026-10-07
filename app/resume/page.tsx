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
  { label: "GitHub", url: "github.com/karimbabasf", href: "https://github.com/karimbabasf" },
  { label: "X", url: "x.com/karimbabasf", href: "https://x.com/karimbabasf" },
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
                Software Engineer, Agent Infrastructure and Crypto <span className="loc">San Francisco, CA</span>
              </p>
              <p className="contact">
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
              Software engineer building the operational layer autonomous agents
              depend on: orchestration harnesses, key custody and transaction
              signing, and policy controls that require human approval before an
              agent takes an irreversible action. Three years of development, on
              chain since 2021, and based in San Francisco, where I represent
              1Claw as its liaison to the city&rsquo;s crypto and AI founders,
              operators and investors.
            </p>

            <section>
              <h2>Experience</h2>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    1Claw <span className="sub">Business Development &amp; SF Liaison, Contributor</span>
                  </h3>
                  <span className="meta">2026 to now</span>
                </div>
                <p className="note">
                  Security and custody infrastructure for AI agents: key custody,
                  an LLM firewall and cross-chain transaction signing.
                </p>
                <ul>
                  <li>
                    Own 1Claw&rsquo;s San Francisco presence, sourcing partnerships,
                    design partners and investor relationships in person at
                    conferences, hackathons, meetups and founder circles.
                  </li>
                  <li>
                    Lead technical education: the material that explains key
                    custody, LLM firewall behavior and cross-chain signing to
                    founders and developers evaluating agent infrastructure.
                  </li>
                  <li>Produce content and community programming that grows the protocol&rsquo;s reach and credibility.</li>
                </ul>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Multisender.app <span className="sub">SMM / BDR</span>
                  </h3>
                  <span className="meta">2021 to now</span>
                </div>
                <ul>
                  <li>
                    Built a signal-gated lead engine that ranks organizations by
                    likelihood to buy batch transfers, weighting recurring payouts
                    (payroll, grants, points) over one-time events, with structural
                    quotas so one news cycle cannot dominate the pool.
                  </li>
                  <li>
                    Ran daily content for a verified brand account, choosing the
                    surface before the topic: a standalone post caps near 850 views,
                    while a well-placed reply in an active thread can beat the
                    whole follower count.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2>Projects</h2>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Warden <span className="sub">Multi-agent orchestration for AI coding</span>
                  </h3>
                  <a className="meta" href="https://github.com/karimbabasf" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
                <p>
                  Parallel coding agents collide on a shared codebase. Warden
                  isolates each one, coordinates their work, and shows sessions,
                  process state, token spend and file activity in one live view.
                  80,000 lines of Rust and TypeScript across 220 files.
                </p>
                <p className="stack">Tauri, Rust, React, TypeScript</p>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Phosphor <span className="sub">Agent-driven DeFi with a human approval gate</span>
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
                  Desktop app exposing 52 MCP tools so an existing AI agent
                  subscription can run DeFi positions, with key custody, a policy
                  engine that simulates and budget-checks every write, and in-app
                  human approval. NEAR Intents across 30+ chains plus Hyperliquid
                  perpetuals. 50,000 lines of TypeScript, 1,200+ tests, open source
                  and live on mainnet.
                </p>
                <p className="stack">TypeScript, MCP, NEAR Intents, Hyperliquid</p>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Frontier <span className="sub">Self-improving multi-agent newspaper</span>
                  </h3>
                  <span className="meta">24 editions, 2026</span>
                </div>
                <p>
                  Every correction I made became a rule the next run loads, and
                  rules that kept getting ignored became build gates that fail the
                  run. Five researchers work in parallel, then an editor and a
                  designer.
                </p>
                <p className="stack">Multi-agent orchestration, Node.js, HTML</p>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Switchboard <span className="sub">Business automation across phone, email and text</span>
                  </h3>
                  <span className="meta">Live since 2026</span>
                </div>
                <p>
                  Operations automation for a supplies business I co-founded.
                  Calls, email and text resolve to one contact record, and a voice
                  agent answers the phone line. Intuit ships no MCP server, so I
                  built one: ten tools over the live books (six read, four write),
                  serving both MCP protocol revisions, that turn approved quotes
                  into QuickBooks invoices.
                </p>
                <p className="stack">TypeScript, Node.js, Telnyx, Supabase, MCP, QuickBooks</p>
              </div>
            </section>

            <section>
              <h2>Strengths</h2>
              <ul>
                <li>
                  <b>Tools that multiply output.</b>{" "}
                  Warden coordinates several coding agents on one codebase; it produced Phosphor&rsquo;s 50,000
                  lines and a mainnet deployment in three days.
                </li>
                <li>
                  <b>System design.</b> An agent must never approve its own
                  actions, so I build the enforcement around it: simulation,
                  per-session budgets, destination allowlists and human approval
                  outside its reach.
                </li>
                <li>
                  <b>Agent-driven development.</b> Orchestration harnesses, MCP
                  servers and the guardrails that make autonomy safe in production.
                </li>
                <li>
                  <b>Delivery under pressure.</b> From hackathon builds to live
                  launch dates, and the work holds up after the deadline.
                </li>
              </ul>
            </section>

            <div className="pair">
            <section>
              <h2>Crypto</h2>
              <ul>
                <li>On chain since 2021, with hands-on DeFi and Ethereum experience.</li>
                <li>Early user of the L2 wave: Arbitrum, Optimism and zkSync.</li>
                <li>Merged agent infrastructure with on-chain systems to build agent-driven DeFi harnesses.</li>
              </ul>
            </section>

            <section>
              <h2>Education</h2>
              <ul>
                <li>Acellus Academy, high school.</li>
                <li>Self-directed study in software engineering, smart-contract architecture and DeFi mechanics.</li>
              </ul>
            </section>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
