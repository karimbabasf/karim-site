/**
 * Homepage content. Edit this file to change what the page says;
 * app/page.tsx and components/card-file.tsx only render it.
 */

export const intro = {
  name: "Karim Baba",
  lede: "Software engineer in San Francisco, building agent infrastructure for blockchains.",
  ledeMore: "Systems that act on their own and stop for a person before anything irreversible.",
};

export type Feature = {
  id: string;
  name: string;
  /** Shown under the title while closed; the body replaces it when open. */
  line: string;
  body: string;
  links: { label: string; href: string }[];
};

export const features: Feature[] = [
  {
    id: "phosphor",
    name: "Phosphor",
    line: "A crypto wallet your AI agent can operate, but never approve.",
    body:
      "A macOS wallet that AI agents operate over MCP. They research, quote and propose trades across 35 networks, while the keys stay in the Secure Enclave and anything above the owner's limit waits for a click.",
    links: [
      { label: "phosphor.money", href: "https://phosphor.money" },
      { label: "@usephosphor", href: "https://x.com/usephosphor" },
      { label: "Source", href: "https://github.com/karimbabasf/phosphor" },
    ],
  },
  {
    id: "warden",
    name: "Warden",
    line: "Every coding agent on one screen.",
    body:
      "A macOS app that follows every Claude Code and Codex session on the machine and draws each one on a live 3D radar. Sessions brighten as their context fills, and subagents orbit the session that started them.",
    links: [{ label: "Source", href: "https://github.com/karimbabasf/WARDEN" }],
  },
  {
    id: "frontier",
    name: "Frontier",
    line: "A daily paper researched, written and designed by AI agents.",
    body:
      "A daily paper made by seven agents. Five research their beats in parallel, then an editor and a designer assemble the edition. Every correction becomes a rule the next run follows.",
    links: [],
  },
];

export type IndexItem = {
  id: string;
  name: string;
  kind: string;
  stack: string;
  line: string;
  detail: string;
  href?: string;
};

export const index: IndexItem[] = [
  {
    id: "switchboard",
    name: "Switchboard",
    kind: "Voice agent",
    stack: "Telnyx, MCP, QuickBooks",
    line: "An AI phone line for a supplies business.",
    detail:
      "An agent answers Pakkr's calls, quotes from the catalogue and hands off to a person. A QuickBooks MCP server I wrote turns approved quotes into invoices.",
  },
  {
    id: "glide",
    name: "Glide",
    kind: "Web app",
    stack: "Next.js, WebRTC, Swift",
    line: "A phone becomes a Mac trackpad and keyboard.",
    detail:
      "Input travels over a direct WebRTC channel to a small agent on the Mac, so it feels wired and never touches a server.",
    href: "https://github.com/karimbabasf/glide",
  },
  {
    id: "direct-terminal",
    name: "Direct Terminal",
    kind: "Desktop app",
    stack: "Tauri, Rust, React",
    line: "A crypto trading terminal with no backend.",
    detail:
      "Streams markets from Hyperliquid, Binance.US, Coinbase and Kraken. Orders are signed locally in Rust, with the key in the system keychain.",
    href: "https://github.com/karimbabasf/direct-terminal",
  },
  {
    id: "cliptic",
    name: "Cliptic",
    kind: "Desktop app",
    stack: "Tauri, Rust, Whisper",
    line: "An on-device editor for captioned video.",
    detail:
      "Transcribes on the device, times every word to the audio, and exports from the same renderer as the preview.",
    href: "https://github.com/karimbabasf/cliptic",
  },
  {
    id: "karim-skills",
    name: "Karim Skills",
    kind: "Claude Code",
    stack: "Claude Code skills",
    line: "Six Claude Code skills from daily use.",
    detail:
      "A morning brief, a focus timer, a calendar secretary, a note system, a Notion architect and an end-of-day review. No dependencies and no API keys.",
    href: "https://github.com/karimbabasf/karim-skills",
  },
  {
    id: "dev-signal",
    name: "Dev Signal",
    kind: "Web app",
    stack: "Next.js, Supabase",
    line: "A self-hosted feed ranked for one reader.",
    detail:
      "Pulls more than twenty sources a day, scores each story with a small model and sends an alert for the best ones. Runs for a few dollars a month.",
    href: "https://github.com/karimbabasf/dev_signal",
  },
  {
    id: "lensprompt",
    name: "Lensprompt",
    kind: "Web app",
    stack: "React, Vite",
    line: "A teleprompter that follows your voice.",
    detail:
      "Tracks speech word by word, keeps the script out of the recording, and never sends audio or video off the device.",
    href: "https://github.com/karimbabasf/lensprompt-recorder",
  },
];

export const experience = [
  {
    org: "1Claw",
    role: "Business Development",
    when: "2026",
    line: "San Francisco liaison for an AI agent security platform.",
    href: "https://1claw.xyz",
  },
  {
    org: "Pakkr",
    role: "Technical Co-founder",
    when: "2026",
    line: "Building an automated backend for a packing supplies company.",
  },
  {
    org: "Multisender.app",
    role: "Social and Business Development",
    when: "2025",
    line: "Built a lead engine and ran daily content for a token payout tool.",
  },
  {
    org: "On-chain",
    role: "Independent",
    when: "Since 2021",
    line: "Working directly with DeFi protocols.",
  },
];

export const about = {
  statement: "On-chain since 2021, building agents since 2025.",
  statementMore: "I design and ship every product myself, end to end.",
};

export const contact = {
  email: "founder@karimbabasf.com",
  links: [
    { label: "X", handle: "@karimbabasf", href: "https://x.com/karimbabasf" },
    { label: "LinkedIn", handle: "Karim Baba", href: "https://www.linkedin.com/in/karim-baba-130547289/" },
    { label: "GitHub", handle: "karimbabasf", href: "https://github.com/karimbabasf" },
    { label: "Telegram", handle: "@karimbabasf", href: "https://t.me/karimbabasf" },
    { label: "Instagram", handle: "@karimbabasf", href: "https://www.instagram.com/karimbabasf" },
  ],
};

export type Project = {
  id: string;
  name: string;
  /** What it is, in one plain sentence. */
  line: string;
  /** How it works: the technical sentence under the line. */
  detail: string;
  /** Short facts for the margin: the kind of project, then a date if it has one. */
  meta: string[];
  /** Machine-readable date for hackathon builds. */
  date?: string;
  href: string;
  /** Typed on the card when it is pulled open. */
  links: { label: string; href: string }[];
};

/** The homepage list, in reading order. */
export const projects: Project[] = [
  {
    id: "phosphor",
    name: "Phosphor",
    line: features[0].line,
    detail:
      "A macOS wallet that agents operate over MCP. They research, quote and propose trades across 35 networks. The keys stay in the Secure Enclave, and anything above the owner's limit waits for a click.",
    meta: ["macOS app"],
    href: "https://phosphor.money",
    links: features[0].links,
  },
  {
    id: "warden",
    name: "Warden",
    line: features[1].line,
    detail:
      "A macOS app that follows every Claude Code and Codex session on the machine and draws each one on a live 3D radar. Sessions brighten as their context fills, and subagents orbit the session that started them.",
    meta: ["macOS app"],
    href: "https://github.com/karimbabasf/WARDEN",
    links: features[1].links,
  },
  {
    id: "solbid",
    name: "SolBid",
    line: "AI agents bid for you in a live auction.",
    detail:
      "The agents pay each other on Solana with x402. Built at the Solana Agent Hackathon.",
    meta: ["Hackathon", "Sep 30, 2026"],
    date: "2026-09-30",
    href: "https://github.com/karimbabasf/solbid",
    links: [{ label: "Source", href: "https://github.com/karimbabasf/solbid" }],
  },
  {
    id: "vesper",
    name: "Vesper Wallet",
    line: "A chat wallet no message can talk into moving money.",
    detail:
      "Two models from different labs read each request blind, policy rules in code decide what is allowed, and a person approves. Receipts are signed with EIP-712 and anchored on-chain. Built at the Stanford collaborative agent hackathon with Flower and Nebius.",
    meta: ["Hackathon", "Sep 29, 2026"],
    date: "2026-09-29",
    href: "https://github.com/karimbabasf/vesper-wallet",
    links: [{ label: "Source", href: "https://github.com/karimbabasf/vesper-wallet" }],
  },
];
