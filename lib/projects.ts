/**
 * Projects: the source for the `ls ~/projects` list.
 * Each row shows a title + one-line blurb; expanding it reveals `detail`.
 * Add, remove, or reorder freely.
 */

export type Project = {
  /** Stable id (used as React key). */
  id: string;
  title: string;
  /** Your part in it, e.g. "Design + build". */
  role: string;
  year: string;
  /** One line shown while collapsed. */
  blurb: string;
  /** The fuller description revealed on expand. */
  detail: string;
  /** A few short tags. */
  tags: string[];
  /** Where the "visit" link points. Use "#" if there's nothing to link yet. */
  href: string;
};

export const projects: Project[] = [
  {
    id: "warden",
    title: "Warden",
    role: "Desktop app",
    year: "2026",
    blurb: "The agent that watches your agents.",
    detail:
      "A macOS daemon that tails the transcripts your AI coding agents already write (Claude Code, Codex) and diagnoses where your workflow leaks: token loops, blind edits, quiet stalls. A global hotkey summons a cinematic war-room overlay with a ranked, evidence-cited diagnosis. It only ever reads; it never writes to your projects. Tauri v2 with a Rust core.",
    tags: ["rust", "tauri", "observability"],
    href: "https://github.com/karimbabasf/WARDEN",
  },
  {
    id: "dev-signal",
    title: "dev signal",
    role: "Web app",
    year: "2026",
    blurb: "A self-hosted AI filter for the news that's actually worth your time.",
    detail:
      "Scrapes RSS, Reddit and Hacker News, scores everything with Claude Haiku against your own profile, and surfaces only what's worth acting on. Self-hosted and bring-your-own-key. Next.js and Supabase, deployed on Vercel.",
    tags: ["next.js", "claude", "supabase"],
    href: "https://github.com/karimbabasf/dev_signal",
  },
  {
    id: "lensprompt-recorder",
    title: "lensprompt recorder",
    role: "Web app",
    year: "2026",
    blurb: "A mobile HD video recorder with a speech-following teleprompter.",
    detail:
      "A mobile-first HD video recorder with a teleprompter overlay that follows your voice as you speak, built for iPhone. Uses the browser's MediaRecorder and speech recognition. React and Vite.",
    tags: ["react", "vite", "teleprompter"],
    href: "https://github.com/karimbabasf/lensprompt-recorder",
  },
  {
    id: "direct-terminal",
    title: "direct terminal",
    role: "Desktop app",
    year: "2026",
    blurb: "A liquid-glass desktop crypto terminal.",
    detail:
      "A native desktop crypto terminal with a liquid-glass interface: deep multi-exchange candle history, infinite scroll-back, and a live order book. Built on Tauri with a React front end.",
    tags: ["tauri", "react", "crypto"],
    href: "https://github.com/karimbabasf/direct-terminal",
  },
  {
    id: "mobi-board",
    title: "MOBI board",
    role: "Desktop app",
    year: "2026",
    blurb: "A macOS dashboard for watching local AI coding agents.",
    detail:
      "A macOS dashboard that monitors local AI coding agents in real time, giving you a single view of what they're doing. Built in Rust.",
    tags: ["rust", "macos", "agents"],
    href: "https://github.com/karimbabasf/mobi-board",
  },
  {
    id: "camera-tools",
    title: "camera tools",
    role: "Web experiments",
    year: "2026",
    blurb: "Browser-based camera tools and experiments.",
    detail:
      "A grab-bag of browser-based camera tools and experiments, poking at what the web platform can do with a live video feed.",
    tags: ["javascript", "camera", "web"],
    href: "https://github.com/karimbabasf/camera-tools",
  },
  {
    id: "cliptic",
    title: "cliptic",
    role: "Desktop app",
    year: "2026",
    blurb: "A caption-first vertical video editor that runs entirely on-device.",
    detail:
      "A caption-first vertical video editor that's deterministic, local and free. Transcription runs on-device with Whisper, so nothing leaves your machine. Built on Tauri.",
    tags: ["tauri", "whisper", "video"],
    href: "https://github.com/karimbabasf/cliptic",
  },
];
