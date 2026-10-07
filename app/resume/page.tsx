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
              Software engineer with three years of development experience across
              agent infrastructure, developer tooling and Blockchain systems. I
              have designed and shipped the operational layer autonomous agents
              depend on: orchestration harnesses, key custody and transaction
              signing, and the policy controls that require human authorization
              before an agent executes irreversible actions. Five years of
              on-chain experience since 2021 informs the smart-contract and DeFi
              side of that work. Since relocating to San Francisco I have become a
              fixture in the city&rsquo;s crypto and AI ecosystem, at ease in rooms
              with founders, operators and investors, and I represent 1Claw on the
              ground as its San Francisco liaison.
            </p>

            <section>
              <h2>Experience</h2>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Business Development &amp; SF Liaison, Contributor <span className="sub">1Claw</span>
                  </h3>
                  <span className="meta">San Francisco · Since 2026</span>
                </div>
                <p className="note">
                  1Claw builds security and custody infrastructure for AI agents:
                  key custody, an LLM firewall, and cross-chain transaction
                  signing.
                </p>
                <ul>
                  <li>
                    Owned 1Claw's San Francisco presence, sourcing partnerships,
                    design partners, and investor relationships in person across
                    crypto and AI conferences, hackathons, meetups, and founder
                    circles.
                  </li>
                  <li>
                    Produced content and community programming to grow the
                    protocol's awareness and credibility.
                  </li>
                  <li>
                    Lead technical education for 1Claw, building the material
                    that explains key custody, LLM firewall behavior, and
                    cross-chain signing to founders and developers evaluating
                    agent infrastructure.
                  </li>
                </ul>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    SMM / BDR <span className="sub">Multisender.app</span>
                  </h3>
                  <span className="meta">San Francisco · Since 2021</span>
                </div>
                <ul>
                  <li>
                    Built a signal-gated lead generation engine that ranks
                    organizations on likelihood to buy a batch-transfer product,
                    scoring recurring payout mechanisms such as payroll, grants,
                    and points above one-time events, using structural quotas
                    rather than score weights so a single news cycle cannot
                    dominate the pool.
                  </li>
                  <li>
                    Ran daily content production for a verified brand account,
                    meticulously selecting the surface before the topic: a
                    standalone post caps near 850 views, while a well-placed
                    reply under an active thread can exceed the entire follower
                    count.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2>Selected Projects</h2>

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
                  single live view. 80,000 lines of Rust and TypeScript across 220
                  source files.
                </p>
                <p className="stack">Tauri · Rust · React / TS</p>
              </div>

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
                  Local desktop application exposing 52 MCP tools, so an existing
                  AI agent subscription can operate DeFi positions: key custody, a
                  policy engine that simulates and budget-checks every write, and
                  in-app human approval. Chain-abstracted through NEAR Intents
                  across 30+ chains, plus Hyperliquid perpetuals. 50,000 lines of
                  TypeScript and 1,200+ tests, open source and running on mainnet.
                </p>
                <p className="stack">TypeScript · MCP · NEAR Intents · Hyperliquid</p>
              </div>

              <div className="entry">
                <div className="entry-top">
                  <h3>
                    Frontier <span className="sub">self-improving multi-agent pipeline, output as a newspaper</span>
                  </h3>
                  <span className="meta">24 editions, 2026</span>
                </div>
                <p>
                  A newspaper that fixes itself, across 24 editions. Every
                  correction I made became a rule the next run loads, and the rules
                  that kept getting ignored became build gates that fail the run.
                  Five researchers work in parallel, then an editor and a designer.
                </p>
                <p className="stack">Multi-agent orchestration · Node.js · HTML</p>
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
                  Calls, email and text resolve to one contact record, so every
                  channel reads and writes the same history, and a voice agent
                  fields the phone line. Intuit ships no MCP server, so I built
                  one: ten annotated tools over the live books, six read-only and
                  four writes, serving both MCP protocol revisions from a single
                  factory. Approved quotes become QuickBooks invoices through it.
                </p>
                <p className="stack">TypeScript · Node.js · Telnyx · Supabase · MCP · QuickBooks</p>
              </div>
            </section>

            <section>
              <h2>Crypto</h2>
              <ul>
                <li>In crypto since 2021, with deep, hands-on DeFi and Ethereum experience.</li>
                <li>Early to the L2 wave, among early users of Arbitrum, Optimism, and zkSync.</li>
                <li>Merged agent infrastructure with on-chain systems to build agent-driven DeFi harnesses.</li>
              </ul>
            </section>

            <section>
              <h2>Strengths</h2>
              <ul>
                <li>
                  <b>Tooling as leverage.</b>{" "}
                  I build the systems that accelerate my own delivery, then apply
                  them: Warden coordinates several coding agents against a single
                  codebase.
                </li>
                <li>
                  <b>System design.</b> I settle the rule before the code. An
                  autonomous agent must never approve its own actions, so I built
                  the enforcement layer around it: transaction simulation,
                  per-session budgets, destination allowlists, and human approval
                  outside the agent's reach.
                </li>
                <li>
                  <b>Agent-driven development.</b> I build with agents and for
                  them: orchestration harnesses, MCP servers, and the guardrails
                  that make an autonomous system safe to point at production.
                </li>
                <li>
                  <b>Delivery under pressure.</b> I work best shipping against a
                  clock, from hackathon builds to live launch dates, and the work
                  holds up after the deadline passes.
                </li>
              </ul>
            </section>

            <section>
              <h2>Education &amp; Learning</h2>
              <ul>
                <li>
                  Self-directed study in software engineering, smart-contract
                  architecture, and DeFi mechanics.
                </li>
                <li>Acellus Academy, high school.</li>
              </ul>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
