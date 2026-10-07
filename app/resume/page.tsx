import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Cormorant_SC } from "next/font/google";
import ResumeToolbar from "@/components/resume-toolbar";
import "./resume.css";

// Set like the homepage card: engraved small caps on bone stock.
const caps = Cormorant_SC({ subsets: ["latin"], weight: ["600"], variable: "--font-caps" });
const text = Cormorant_Garamond({ subsets: ["latin"], weight: ["500"], variable: "--font-text" });

export const metadata: Metadata = {
  title: "Karim Baba, Résumé",
  description: "Preview and download Karim Baba's résumé.",
};

export const viewport: Viewport = {
  themeColor: "#1b1a18",
  colorScheme: "dark",
};

export default function ResumePage() {
  return (
    <div className={`resumePage ${caps.variable} ${text.variable}`}>
      <ResumeToolbar />

      <div className="resumeDesk">
        <div className="resumeDoc">
          <article className="sheet">
            <header>
              <h1 className="wordmark">
                Karim <span className="surname">Baba</span>
              </h1>
              <p className="eyebrow">
                Software Engineer<span className="dot" />Agent Infrastructure
                <span className="dot" />
                Crypto
              </p>

              <div className="contact">
                <span className="loc">San Francisco, CA</span>{" "}
                <a className="btn" href="mailto:founder@karimbabasf.com">
                  <span className="btn-label">founder@karimbabasf.com</span>
                  <span className="btn-url">founder@karimbabasf.com</span>
                </a>{" "}
                <a
                  className="btn"
                  href="https://www.linkedin.com/in/karim-baba-130547289/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="btn-label">LinkedIn</span>
                  <span className="btn-url">linkedin.com/in/karim-baba-130547289</span>
                </a>{" "}
                <a
                  className="btn"
                  href="https://x.com/karimbabasf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="btn-label">X / @karimbabasf</span>
                  <span className="btn-url">x.com/karimbabasf</span>
                </a>{" "}
                <a
                  className="btn"
                  href="https://github.com/karimbabasf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="btn-label">GitHub</span>
                  <span className="btn-url">github.com/karimbabasf</span>
                </a>{" "}
                <a
                  className="btn"
                  href="https://t.me/karimbabasf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="btn-label">Telegram</span>
                  <span className="btn-url">t.me/karimbabasf</span>
                </a>
              </div>
            </header>

            <hr className="rule" />

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
              <div className="sec-head">
                <span className="sq" />
                <h2>Experience</h2>
                <span className="line" />
              </div>

              <div className="role">
                <div className="role-top">
                  <p className="role-title">
                    Business Development &amp; SF Liaison, Contributor{" "}
                    <span className="org">· 1Claw</span>
                  </p>
                  <span className="role-meta">San Francisco · Since 2026</span>
                </div>
                <p className="role-note">
                  1Claw builds security and custody infrastructure for AI agents:
                  key custody, an LLM firewall, and cross-chain transaction
                  signing.
                </p>
                <ul className="bullets">
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

              <div className="role">
                <div className="role-top">
                  <p className="role-title">
                    SMM / BDR <span className="org">· Multisender.app</span>
                  </p>
                  <span className="role-meta">San Francisco · Since 2021</span>
                </div>
                <ul className="bullets">
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
              <div className="sec-head">
                <span className="sq" />
                <h2>Selected Projects</h2>
                <span className="line" />
              </div>

              <div className="proj">
                <div className="proj-top">
                  <p className="proj-name">
                    Warden{" "}
                    <span className="desc">
                      · multi-agent orchestration for AI coding
                    </span>
                  </p>
                  <a
                    className="repo"
                    href="https://github.com/karimbabasf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
                <p className="proj-desc">
                  Parallel AI coding agents collide on a shared codebase. Warden
                  gives each one isolation, coordinates their work, and puts
                  sessions, process state, token spend and file activity in a
                  single live view. 80,000 lines of Rust and TypeScript across 220
                  source files.
                </p>
                <p className="stack">Tauri · Rust · React / TS</p>
              </div>

              <div className="proj">
                <div className="proj-top">
                  <p className="proj-name">
                    Phosphor{" "}
                    <span className="desc">
                      · agent-driven DeFi with a human approval gate
                    </span>
                  </p>
                  <a
                    className="repo"
                    href="https://github.com/karimbabasf/phosphor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
                <p className="proj-desc">
                  Local desktop application exposing 52 MCP tools, so an existing
                  AI agent subscription can operate DeFi positions: key custody, a
                  policy engine that simulates and budget-checks every write, and
                  in-app human approval. Chain-abstracted through NEAR Intents
                  across 30+ chains, plus Hyperliquid perpetuals. 50,000 lines of TypeScript and
                  1,200+ tests, open source and running on mainnet.
                </p>
                <p className="stack">
                  TypeScript · MCP · NEAR Intents · Hyperliquid
                </p>
              </div>

              <div className="proj">
                <div className="proj-top">
                  <p className="proj-name">
                    Frontier{" "}
                    <span className="desc">
                      · self-improving multi-agent pipeline, output as a
                      newspaper
                    </span>
                  </p>
                  <span className="proj-tag">24 editions, 2026</span>
                </div>
                <p className="proj-desc">
                  A newspaper that fixes itself, across 24 editions. Every
                  correction I made became a
                  rule the next run loads, and the rules that kept getting ignored
                  became build gates that fail the run. Five researchers work in
                  parallel, then an editor and a designer.
                </p>
                <p className="stack">
                  Multi-agent orchestration · Node.js · HTML
                </p>
              </div>

              <div className="proj">
                <div className="proj-top">
                  <p className="proj-name">
                    Switchboard{" "}
                    <span className="desc">
                      · business automation across phone, email and messaging
                    </span>
                  </p>
                  <span className="proj-tag">
                    handling real customers since 2026
                  </span>
                </div>
                <p className="proj-desc">
                  Operations automation for a supplies business I co-founded.
                  Calls, email and text resolve to one contact record, so every
                  channel reads and writes the same history, and a voice agent
                  fields the phone line. Intuit ships no MCP server, so I built
                  one: ten annotated tools over the live books, six read-only and
                  four writes, serving both MCP protocol revisions from a single
                  factory. Approved quotes become
                  QuickBooks invoices through it.
                </p>
                <p className="stack">
                  TypeScript · Node.js · Telnyx · Supabase · MCP · QuickBooks
                </p>
              </div>
            </section>

            <section>
              <div className="sec-head">
                <span className="sq" />
                <h2>Crypto</h2>
                <span className="line" />
              </div>
              <ul className="bullets cols">
                <li>
                  In crypto since 2021, with deep, hands-on DeFi and Ethereum
                  experience.
                </li>
                <li>
                  Early to the L2 wave, among early users of Arbitrum, Optimism,
                  and zkSync.
                </li>
                <li>
                  Merged agent infrastructure with on-chain systems to build
                  agent-driven DeFi harnesses.
                </li>
              </ul>
            </section>

            <section>
              <div className="sec-head">
                <span className="sq" />
                <h2>Strengths</h2>
                <span className="line" />
              </div>
              <ul className="bullets cols">
                <li>
                  <span className="lead">Tooling as leverage.</span> I build the
                  systems that accelerate my own delivery, then apply them:
                  Warden coordinates several coding agents against a single
                  codebase, which produced 50,000 lines of Phosphor and a mainnet
                  deployment within three days.
                </li>
                <li>
                  <span className="lead">System design.</span> I settle the rule
                  before the code. An autonomous agent must never approve its own
                  actions, so I built the enforcement layer around it: transaction
                  simulation, per-session budgets, destination allowlists, and
                  human approval outside the agent's reach.
                </li>
                <li>
                  <span className="lead">Agent-driven development.</span> I build
                  with agents and for them: orchestration harnesses, MCP servers,
                  and the guardrails that make an autonomous system safe to point
                  at production.
                </li>
                <li>
                  <span className="lead">Delivery under pressure.</span> I work best
                  shipping against a clock, from hackathon builds to live launch
                  dates, and the work holds up after the deadline passes.
                </li>
              </ul>
            </section>

            <section>
              <div className="sec-head">
                <span className="sq" />
                <h2>Education &amp; Learning</h2>
                <span className="line" />
              </div>
              <ul className="bullets">
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
