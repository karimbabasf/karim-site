import type { Viewport } from "next";
import { Cormorant_Garamond, Cormorant_SC } from "next/font/google";
import BusinessCard, { type CardLink, type CardProject } from "@/components/business-card";
import "./plain.css";

// The Bateman card: engraved small caps on bone paper.
const caps = Cormorant_SC({ subsets: ["latin"], weight: ["600"], variable: "--font-caps" });
const text = Cormorant_Garamond({ subsets: ["latin"], weight: ["500"], variable: "--font-text" });

export const viewport: Viewport = {
  themeColor: "#1b1a18",
  colorScheme: "dark",
};

const projects: CardProject[] = [
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
    line: "Agents hire agents, paid only on proof. Won the Stripe track at Supabase Select.",
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

const links: CardLink[] = [
  { label: "X", href: "https://x.com/karimbabasf" },
  { label: "GitHub", href: "https://github.com/karimbabasf" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/karim-baba-130547289/" },
  { label: "Telegram", href: "https://t.me/karimbabasf" },
  { label: "Resume", href: "/resume" },
];

export default function Home() {
  return (
    <main className={`plain ${caps.variable} ${text.variable}`}>
      <BusinessCard projects={projects} links={links} email="founder@karimbabasf.com" />
    </main>
  );
}
