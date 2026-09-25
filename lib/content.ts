/**
 * Homepage content. Edit this file to change what the page says;
 * the components in components/v3 only render it.
 */

export const intro = {
  name: "Karim Baba",
  headline: ["Agent systems that move money,", "and wait for a person to approve."],
  lede:
    "Software engineer and business developer in San Francisco. I design and ship AI agent infrastructure end to end, and I represent 1Claw in the city as its San Francisco liaison.",
  location: "San Francisco",
};

export type Feature = {
  id: string;
  name: string;
  line: string;
  body: string;
  facts: { label: string; value: string }[];
  links: { label: string; href: string }[];
};

export const features: Feature[] = [
  {
    id: "phosphor",
    name: "Phosphor",
    line: "A crypto wallet your AI agent can operate, but never approve.",
    body:
      "A local macOS application that holds keys in the Secure Enclave and exposes its full toolset over MCP, so an agent the user already runs, such as Claude Code or Codex, can research markets, quote swaps and propose trades. Every proposal passes a policy engine that simulates and budget-checks it. Anything above the user's limit waits for a click in a window the agent cannot reach. One balance across 35 networks through NEAR Intents, with perpetual futures on Hyperliquid.",
    facts: [
      { label: "Release", value: "v0.10.0" },
      { label: "Tests", value: "3,575" },
      { label: "Networks", value: "35" },
      { label: "Status", value: "Live on mainnet" },
    ],
    links: [
      { label: "phosphor.money", href: "https://phosphor.money" },
      { label: "Source", href: "https://github.com/karimbabasf/phosphor" },
    ],
  },
  {
    id: "warden",
    name: "Warden",
    line: "Every coding agent on one screen.",
    body:
      "A desktop application for running AI coding agents in parallel. Warden gives each agent an isolated workspace, coordinates their work, and renders every session as a live object on a 3D radar. Each object brightens as its context window fills, and subagents orbit the session that started them. Session state, token spend and file activity sit in a single view.",
    facts: [
      { label: "Stack", value: "Rust, TypeScript, Tauri 2" },
      { label: "Scale", value: "80,000 lines" },
      { label: "Scene", value: "React Three Fiber" },
    ],
    links: [{ label: "Source", href: "https://github.com/karimbabasf/WARDEN" }],
  },
  {
    id: "frontier",
    name: "Frontier",
    line: "A daily paper written by five research agents, an editor and a designer.",
    body:
      "A self-correcting publication pipeline. Five research agents work in parallel, then an editor and a designer assemble the edition. Every correction made to an edition becomes a rule the next run loads, and rules that keep being ignored become build gates that fail the run.",
    facts: [
      { label: "Editions", value: "24" },
      { label: "Agents", value: "7 per edition" },
      { label: "Status", value: "Pre-launch" },
    ],
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
    kind: "Operations",
    stack: "Voice, MCP, QuickBooks",
    line: "Phone, email and text for a supplies business, resolved to one record.",
    detail:
      "Built for Pakkr, a supplies business I co-founded. A voice agent answers the phone line, and every channel reads and writes the same contact history. Intuit ships no MCP server, so I wrote one: ten annotated tools over the live books, which turn approved quotes into invoices.",
  },
  {
    id: "glide",
    name: "Glide",
    kind: "Web app",
    stack: "Next.js, WebRTC, Swift",
    line: "A phone becomes a precision trackpad and keyboard for a Mac.",
    detail:
      "Input travels over a direct WebRTC data channel to a small local agent, so gestures and keystrokes land with near-wired latency and never pass through a server.",
    href: "https://github.com/karimbabasf/glide",
  },
  {
    id: "direct-terminal",
    name: "Direct Terminal",
    kind: "Desktop app",
    stack: "Tauri, Rust, React",
    line: "A crypto trading terminal wired straight to the exchanges.",
    detail:
      "Streams candles, trades and order books from Hyperliquid, Binance.US, Coinbase and Kraken with no backend. Hyperliquid orders are signed locally in the Rust core, with the key held in the system keychain.",
    href: "https://github.com/karimbabasf/direct-terminal",
  },
  {
    id: "cliptic",
    name: "Cliptic",
    kind: "Desktop app",
    stack: "Tauri, Rust, Whisper",
    line: "A caption-first vertical video editor that runs on the device.",
    detail:
      "Transcribes on the device, pins each word to the audio with millisecond timing, and exports a ProRes master and a ready-to-post MP4 from the same render code as the preview.",
    href: "https://github.com/karimbabasf/cliptic",
  },
  {
    id: "karim-skills",
    name: "Karim Skills",
    kind: "Open source",
    stack: "Claude Code",
    line: "Six Claude Code skills from daily use, packaged for anyone to install.",
    detail:
      "A morning brief, a focus timer, a calendar secretary, a note system, a Notion architect and an end-of-day review. No dependencies, no account, no API key. MIT licensed.",
    href: "https://github.com/karimbabasf/karim-skills",
  },
  {
    id: "dev-signal",
    name: "Dev Signal",
    kind: "Web app",
    stack: "Next.js, Supabase",
    line: "A self-hosted news feed ranked against the reader's own profile.",
    detail:
      "Collects more than twenty sources daily, scores each story with a small model, and sends a push alert when a high-scoring story arrives. Runs for a few dollars a month.",
    href: "https://github.com/karimbabasf/dev_signal",
  },
  {
    id: "lensprompt",
    name: "Lensprompt",
    kind: "Web app",
    stack: "React, Vite",
    line: "A camera teleprompter that keeps pace with the speaker's voice.",
    detail:
      "Follows speech word by word with fuzzy matching, keeps the prompt out of the recording, and never sends video, audio or transcript off the device.",
    href: "https://github.com/karimbabasf/lensprompt-recorder",
  },
];

export const experience = [
  {
    org: "1Claw",
    role: "Business Development, San Francisco Liaison",
    when: "2026",
    body:
      "Security and custody infrastructure for AI agents. I represent the company in person across San Francisco with founders, design partners and investors, and lead technical education on key custody, LLM firewall behavior and cross-chain signing.",
    href: "https://1claw.xyz",
  },
  {
    org: "Pakkr",
    role: "Co-founder",
    when: "2026",
    body:
      "A supplies business. I built its operations layer: a single contact record across phone, email and text, a voice agent on the phone line, and an MCP server over the live accounting books.",
  },
  {
    org: "Multisender.app",
    role: "Social and Business Development",
    when: "2025",
    body:
      "Built a lead engine that ranks organizations by recurring payout needs such as payroll and grants, and ran daily content for the verified brand account.",
  },
  {
    org: "On-chain",
    role: "Independent",
    when: "Since 2021",
    body:
      "Five years working directly with DeFi protocols, which now informs the custody, signing and policy design in my agent work.",
  },
];

export const about = {
  lead: "I came to software through crypto, and to agents through software.",
  body: [
    "From 2021 I worked directly with DeFi protocols. That shaped how I think about keys, signing and irreversible actions, and it is why my agent work always keeps a person at the final step.",
    "In 2025 I moved into agent-driven development and built my practice around it. I design and ship complete products alone, and I run AI agents as an engineering team with isolation, review and clear limits. Business development keeps me close to the people who adopt the work.",
  ],
  facts: [
    { label: "Based", value: "San Francisco" },
    { label: "Focus", value: "Agent infrastructure" },
    { label: "On-chain", value: "Since 2021" },
    { label: "Stack", value: "Rust, TypeScript" },
  ],
};

export const contact = {
  email: "founder@karimbabasf.com",
  links: [
    { label: "X", href: "https://x.com/karimbabasf" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/karim-baba-130547289/" },
    { label: "GitHub", href: "https://github.com/karimbabasf" },
    { label: "Telegram", href: "https://t.me/karimbabasf" },
    { label: "Instagram", href: "https://www.instagram.com/karimbabasf" },
  ],
};
