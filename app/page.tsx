import type { Viewport } from "next";
import { Cormorant_Garamond, Cormorant_SC } from "next/font/google";
import "./plain.css";

// The Bateman card: engraved small caps on bone paper.
const caps = Cormorant_SC({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-caps" });
const text = Cormorant_Garamond({ subsets: ["latin"], weight: ["500"], variable: "--font-text" });

export const viewport: Viewport = {
  themeColor: "#e9e7e1",
  colorScheme: "light",
};

const projects = [
  {
    name: "Phosphor",
    line: "A crypto wallet your AI agent can operate, but never approve.",
    href: "https://phosphor.money",
  },
  {
    name: "Warden",
    line: "Every coding agent on one screen.",
    href: "https://github.com/karimbabasf/WARDEN",
  },
  {
    name: "Blast",
    line: "Agents hire agents and Stripe charges only on proof. Won the Stripe track at Supabase Select.",
    href: "https://blast-one-rho.vercel.app",
  },
  {
    name: "SolBid",
    line: "AI agents bid for you in a live auction and pay each other on Solana.",
    href: "https://github.com/karimbabasf/solbid",
  },
  {
    name: "Vesper Wallet",
    line: "A chat wallet that no message can talk into moving money.",
    href: "https://github.com/karimbabasf/vesper-wallet",
  },
];

const links = [
  { label: "Email", href: "mailto:founder@karimbabasf.com" },
  { label: "X", href: "https://x.com/karimbabasf" },
  { label: "GitHub", href: "https://github.com/karimbabasf" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/karim-baba-130547289/" },
  { label: "Resume", href: "/resume" },
];

export default function Home() {
  return (
    <main className={`plain ${caps.variable} ${text.variable}`}>
      {/* Roughens the type edges a hair, like ink squeezed into paper fibre. */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <filter id="ink">
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="1.1" />
        </filter>
      </svg>
      <header className="card">
        <h1>Karim BABA</h1>
        <p>Builder</p>
      </header>
      <p>
        Based in San Francisco. I make agent systems that touch money and stop
        for a person before anything irreversible.
      </p>
      <p>On-chain since 2021, building agents since 2025. I design and ship every product myself.</p>

      <h2>Work</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.name}>
            {p.href ? (
              <a href={p.href} target="_blank" rel="noreferrer noopener">
                {p.name}
              </a>
            ) : (
              <span>{p.name}</span>
            )}
            <p>{p.line}</p>
          </li>
        ))}
      </ul>

      <h2>Contact</h2>
      <nav>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </main>
  );
}
