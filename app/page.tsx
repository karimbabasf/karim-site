import type { Viewport } from "next";
import { Manrope } from "next/font/google";
import BusinessCard, { type CardLink, type CardProject } from "@/components/business-card";
import { preload } from "react-dom";
import "./plain.css";

const card = Manrope({ subsets: ["latin"], variable: "--font-card" });

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
    name: "Lushair",
    line: "Scalp scanners and AI hair analysis for business: the salon platform, white-label devices and the analysis API.",
    href: "https://business.lushair.ai/saas",
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
    <main className={`plain ${card.variable}`}>
      <BusinessCard projects={projects} links={links} email="founder@karimbabasf.com" />
    </main>
  );
}
