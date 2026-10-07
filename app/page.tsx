import type { Viewport } from "next";
import {
  Alegreya,
  Alegreya_SC,
  Bodoni_Moda,
  Cinzel,
  Cormorant_Garamond,
  Cormorant_SC,
  EB_Garamond,
  Manrope,
  Marcellus_SC,
  Playfair_Display_SC,
  Spectral,
  Spectral_SC,
} from "next/font/google";
import BusinessCard, { type CardLink, type CardProject } from "@/components/business-card";
import "./plain.css";

// The Bateman card: engraved small caps on bone paper.
const caps = Cormorant_SC({ subsets: ["latin"], weight: ["600"], variable: "--font-caps" });
const text = Cormorant_Garamond({ subsets: ["latin"], weight: ["500"], variable: "--font-text" });
// Font prototype (?fonts): the alternates load only when that switcher picks them.
const ebg = EB_Garamond({ subsets: ["latin"], weight: ["500", "600"], variable: "--f-ebg", preload: false });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["600"], variable: "--f-cinzel", preload: false });
const marcellus = Marcellus_SC({ subsets: ["latin"], weight: "400", variable: "--f-marcellus", preload: false });
const playfair = Playfair_Display_SC({ subsets: ["latin"], weight: "400", variable: "--f-playfair", preload: false });
const spectralSc = Spectral_SC({ subsets: ["latin"], weight: "500", variable: "--f-spectral-sc", preload: false });
const spectral = Spectral({ subsets: ["latin"], weight: "400", variable: "--f-spectral", preload: false });
const alegreyaSc = Alegreya_SC({ subsets: ["latin"], weight: "500", variable: "--f-alegreya-sc", preload: false });
const alegreya = Alegreya({ subsets: ["latin"], weight: "400", variable: "--f-alegreya", preload: false });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-bodoni", preload: false });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600"], variable: "--f-manrope", preload: false });
const protoFonts = [ebg, cinzel, marcellus, playfair, spectralSc, spectral, alegreyaSc, alegreya, bodoni, manrope]
  .map((f) => f.variable)
  .join(" ");

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
    <main className={`plain ${caps.variable} ${text.variable} ${protoFonts}`}>
      <BusinessCard projects={projects} links={links} email="founder@karimbabasf.com" />
    </main>
  );
}
