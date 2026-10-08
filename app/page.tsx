import type { Viewport } from "next";
import { Cormorant_Garamond, Cormorant_SC } from "next/font/google";
import BusinessCard, { type CardLink, type CardProject } from "@/components/business-card";
import { preload } from "react-dom";
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
    line: "A local Mac application that allows you to swap, trade, and manage your crypto through agents you already pay for.",
    href: "https://phosphor.money",
  },
  {
    name: "Warden",
    line: "Every local agent instance on one screen.",
    href: "https://github.com/karimbabasf/WARDEN",
  },
  {
    name: "Blast",
    line: "The layer that allows for general agents to hire specialist agents others have built.",
    href: "https://blast-one-rho.vercel.app",
  },
  {
    name: "SolBid",
    line: "Agentic auction house built on blockchain payment rails.",
    href: "https://github.com/karimbabasf/solbid",
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
  // The card stock is the largest paint, and CSS alone finds it late.
  preload("/paper.webp", { as: "image", fetchPriority: "high" });
  return (
    <main className={`plain ${caps.variable} ${text.variable}`}>
      <BusinessCard projects={projects} links={links} email="founder@karimbabasf.com" />
    </main>
  );
}
