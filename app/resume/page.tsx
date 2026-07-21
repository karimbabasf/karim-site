import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import ResumeToolbar from "@/components/resume-toolbar";
import "./resume.css";

// The résumé document has its own type system (IBM Plex + Space Grotesk),
// self-hosted via next/font so there's no layout shift and no external request.
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Résumé — Karim Baba",
  description: "Preview and download Karim Baba's résumé.",
};

export default function ResumePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background print:bg-white">
      <ResumeToolbar />

      <div className="flex-1 px-4 py-8 sm:px-6 sm:py-12 print:p-0">
        <div
          className={`resumeDoc ${display.variable} ${plexSans.variable} ${plexMono.variable}`}
        >
          <article className="sheet">
            <header>
              <p className="eyebrow">
                Applied AI<span className="dot" />Crypto<span className="dot" />
                Business Dev
              </p>
              <h1 className="wordmark">
                Karim Baba<span className="period">.</span>
              </h1>

              <div className="contact">
                <span className="loc">San Francisco, CA</span>

                <a className="btn" href="mailto:karim.sf09@gmail.com">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  Email
                </a>
                <a
                  className="btn"
                  href="https://www.linkedin.com/in/karim-baba-130547289/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C21.4 8.65 22 11 22 14.1V21h-4v-6c0-1.43-.03-3.27-2-3.27-2 0-2.3 1.56-2.3 3.17V21h-4z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  className="btn"
                  href="https://x.com/karimbabasf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X / @karimbabasf
                </a>
                <a
                  className="btn"
                  href="https://github.com/karimbabasf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1.7a10.3 10.3 0 0 0-3.26 20.07c.52.1.7-.22.7-.5v-1.75c-2.86.62-3.47-1.38-3.47-1.38-.47-1.19-1.15-1.5-1.15-1.5-.94-.64.07-.63.07-.63 1.04.07 1.58 1.07 1.58 1.07.92 1.58 2.42 1.12 3.01.86.1-.67.36-1.12.65-1.38-2.28-.26-4.68-1.14-4.68-5.07 0-1.12.4-2.03 1.06-2.75-.1-.26-.46-1.3.1-2.71 0 0 .87-.28 2.85 1.05a9.9 9.9 0 0 1 5.19 0c1.98-1.33 2.85-1.05 2.85-1.05.56 1.41.2 2.45.1 2.71.66.72 1.06 1.63 1.06 2.75 0 3.94-2.4 4.8-4.69 5.06.37.32.7.94.7 1.9v2.82c0 .28.19.6.71.5A10.3 10.3 0 0 0 12 1.7z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </header>

            <hr className="rule" />

            <p className="summary">
              Self-taught, crypto-native builder now focused on building
              infrastructure for agents. I ship full-stack products end to end,
              from Rust and Tauri desktop tools to on-chain trading systems, and
              run boots-on-the-ground business development across the San
              Francisco startup scene. In the Ethereum ecosystem since 2021, I
              began in DeFi and have since pivoted into agentic development. I've
              reached the point where I can take almost any recurring problem or
              inefficiency and build the automation that eliminates it.
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
                    Run boots-on-the-ground BD, education, and advocacy for 1Claw
                    across the SF crypto and AI ecosystem, sourcing partnerships
                    and relationships at conferences, meetups, and within founder
                    and investor circles.
                  </li>
                  <li>
                    Produce content and community programming to grow the
                    protocol's awareness and credibility.
                  </li>
                  <li>
                    Contribute to the product codebase, bridging BD insight with
                    hands-on engineering.
                  </li>
                </ul>
              </div>

              <div className="role">
                <div className="role-top">
                  <p className="role-title">
                    Founder / Developer{" "}
                    <span className="org">· Independent Builder</span>
                  </p>
                  <span className="role-meta">San Francisco · Since 2025</span>
                </div>
                <ul className="bullets">
                  <li>
                    Built and shipped a portfolio of working products from zero
                    across AI infrastructure, crypto tooling, and creator tools,
                    with a strong grasp of system architecture and protocol
                    design.
                  </li>
                  <li>
                    Currently building Warden, an orchestration and
                    simplification layer that brings multiple AI coding agents
                    into one coordinated workspace.
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
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1.7a10.3 10.3 0 0 0-3.26 20.07c.52.1.7-.22.7-.5v-1.75c-2.86.62-3.47-1.38-3.47-1.38-.47-1.19-1.15-1.5-1.15-1.5-.94-.64.07-.63.07-.63 1.04.07 1.58 1.07 1.58 1.07.92 1.58 2.42 1.12 3.01.86.1-.67.36-1.12.65-1.38-2.28-.26-4.68-1.14-4.68-5.07 0-1.12.4-2.03 1.06-2.75-.1-.26-.46-1.3.1-2.71 0 0 .87-.28 2.85 1.05a9.9 9.9 0 0 1 5.19 0c1.98-1.33 2.85-1.05 2.85-1.05.56 1.41.2 2.45.1 2.71.66.72 1.06 1.63 1.06 2.75 0 3.94-2.4 4.8-4.69 5.06.37.32.7.94.7 1.9v2.82c0 .28.19.6.71.5A10.3 10.3 0 0 0 12 1.7z" />
                    </svg>
                    GitHub
                  </a>
                </div>
                <p className="proj-desc">
                  macOS desktop app that brings your local AI coding agents into
                  one live view: active sessions, process state, token spend,
                  context window usage, and file activity.
                </p>
                <p className="stack">Tauri · Rust · React / TS</p>
              </div>

              <div className="proj">
                <div className="proj-top">
                  <p className="proj-name">
                    Direct Terminal{" "}
                    <span className="desc">
                      · crypto trading terminal and on-chain execution
                    </span>
                  </p>
                </div>
                <p className="proj-desc">
                  Multi-exchange desktop terminal streaming live market data
                  (Binance, Coinbase, Kraken) with a Rust trading-agent backend
                  for Hyperliquid perpetuals: key custody, session management,
                  and risk guardrails.
                </p>
                <p className="stack">Tauri · Rust · React · Hyperliquid</p>
              </div>

              <div className="proj">
                <div className="proj-top">
                  <p className="proj-name">
                    DevSignal{" "}
                    <span className="desc">
                      · autonomous developer-news publisher
                    </span>
                  </p>
                  <span className="proj-tag">first shipped product, 2026</span>
                </div>
                <p className="proj-desc">
                  Personalized developer-news scraper that turns a feed into an
                  autonomous AI publisher. Built end to end at an AWS hackathon.
                </p>
                <p className="stack">Next.js · Supabase</p>
              </div>

              <div className="proj">
                <div className="proj-top">
                  <p className="proj-name">
                    Cliptic &amp; Teleprompt{" "}
                    <span className="desc">· creator tooling</span>
                  </p>
                </div>
                <p className="proj-desc">
                  On-device vertical-video caption editor with a deterministic
                  caption engine, plus a shipped iPhone teleprompter-recorder.
                </p>
                <p className="stack">TypeScript · React · Vercel</p>
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
                  familiarity.
                </li>
                <li>
                  Early to the L2 wave, among early users of Arbitrum, Optimism,
                  and zkSync.
                </li>
                <li>
                  Active trader since 2021, with significant personal volume
                  across cycles.
                </li>
                <li>
                  Regular at SF events: Solana Summer Series, Cursor Compile,
                  Founders Inc, and more.
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
                  <span className="lead">Sourcing and network.</span> At ease in
                  rooms with founders and high-status operators.
                </li>
                <li>
                  <span className="lead">Fast conceptual learner.</span> New tech
                  and architectures quickly, with strong pattern recognition.
                </li>
                <li>
                  <span className="lead">Builder's eye for diligence.</span> I
                  read a protocol's architecture and on-chain activity, not just
                  its deck.
                </li>
                <li>
                  <span className="lead">Self-accountable.</span> Every project
                  above was self-initiated and self-driven.
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
                <li>Acellus Academy, high school (Grade 10).</li>
              </ul>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
