/**
 * Site content — edit this file to change what the page says.
 * Everything here is plain data; the components just render it.
 */

export const profile = {
  name: "Karim Baba",
  /** Rendered under the name, kept bright. */
  title: "AI-native builder",
  /** The dimmed second clause after the title. */
  titleTag: "BD @ 1Claw",
  /** The org inside titleTag links here — split so only the name is the link. */
  titleTagOrg: "1Claw",
  titleTagHref: "https://1claw.xyz",
  /** One line under the title. The human note. Keep it short. */
  tagline: "Nobody told me to.",
  /** The punch that closes the tagline — rendered bright/neon after it. */
  taglineAccent: "I just did it.",
  /** The about paragraphs. Each entry renders as its own paragraph. Write it like you'd say it out loud. */
  summary: [
    "I am a self-taught builder who works at the edge of agentic infrastructure and DeFi. My journey began in 2021, when I began experimenting with DeFi protocols and hunting airdrops, gaining a deep understanding of the underlying technology. In mid-2025, I decided to take a step back from Web3 and make my entry into Web2 for the first time. I began experimenting with agentic development, and what began as pure interest and fun, later turned into a routine, a workflow, a state of mind.",
    "I currently build full-stack products solo, everything from Rust and Tauri desktop tools to on-chain trading systems, and I also handle business development in person across the San Francisco tech scene.",
    "Everything I've worked on has been something I started and drove myself. I'm ambitious and I move on my own initiative. Even when I'm walking into something I don't fully understand yet, I figure it out and come back with results that hold up. That's how I believe true success is achieved - through consistent and efficient iteration.",
  ],
  /** Short key/value facts shown next to the summary. */
  facts: [
    { key: "based", value: "San Francisco" },
    { key: "focus", value: "Agentic infrastructure / Business development" },
  ],
} as const;

export type Social = {
  /** Which icon to render. `resume` is an internal page; the rest are brand marks. */
  id: "resume" | "x" | "linkedin" | "github" | "email";
  /** Accessible label. */
  label: string;
  href: string;
};

/** Shown as icon buttons in the hero. Resume sits last, after the contacts. */
export const socials: Social[] = [
  { id: "x", label: "X", href: "https://x.com/karimbabasf" },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/karim-baba-130547289/",
  },
  { id: "github", label: "GitHub", href: "https://github.com/karimbabasf" },
  { id: "email", label: "Email", href: "mailto:karim.sf09@gmail.com" },
  { id: "resume", label: "Resume", href: "/resume" },
];
