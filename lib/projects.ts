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
      "A macOS desktop app that tails the transcripts your local coding agents already write (Claude Code, Codex) and renders every session as a live agent on a 3D radar, so your whole fleet is on one screen. Each globe heats from a dim ember to white-hot as its context window fills, subagents orbit their parent, and color marks the harness. Read-only and fully local: it never writes to your projects, makes no network calls, and needs no API keys. Tauri v2 with a Rust core and a React Three Fiber scene.",
    tags: ["rust", "tauri", "react-three-fiber"],
    href: "https://github.com/karimbabasf/WARDEN",
  },
  {
    id: "dev-signal",
    title: "dev signal",
    role: "Web app",
    year: "2026",
    blurb: "A self-hosted AI filter for the news that's actually worth your time.",
    detail:
      "Scrapes 20+ RSS feeds, Reddit and Hacker News daily, then scores every story with Claude Haiku against your own profile and surfaces a ranked feed by category, with Web Push alerts when a high-score story drops. Self-hosted and bring-your-own-key, so it runs for a couple of dollars a month. Next.js 16 and Supabase, deployed on Vercel.",
    tags: ["next.js", "claude", "supabase"],
    href: "https://github.com/karimbabasf/dev_signal",
  },
  {
    id: "lensprompt-recorder",
    title: "lensprompt recorder",
    role: "Web app",
    year: "2026",
    blurb: "A camera teleprompter that follows your voice.",
    detail:
      "Paste a script, hit record, and read cues that keep pace with what you actually say. It listens through the browser's speech API and advances word by word, brightening the word you need next, with fuzzy matching so a short ad lib doesn't break the flow. The prompt lives only in the preview, never burned into the recording, and video, audio, and transcript never leave the device. Installable as a mobile-first PWA. React and Vite.",
    tags: ["react", "vite", "teleprompter"],
    href: "https://github.com/karimbabasf/lensprompt-recorder",
  },
  {
    id: "direct-terminal",
    title: "direct terminal",
    role: "Desktop app",
    year: "2026",
    blurb: "A desktop crypto terminal that talks straight to the exchanges.",
    detail:
      "A native desktop terminal for watching and trading crypto, wired straight to public exchange APIs (Hyperliquid, Binance.US, Coinbase, Kraken) with no backend of its own. Candles, trades, and order books stream over WebSocket and backfill from REST history, so a market opens to a full chart with TradingView-style scroll-back. One click opens or closes Hyperliquid perpetual positions, with every order signed locally in the Rust core and the agent key kept in your OS keychain. Tauri 2 with a React front end.",
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
      "A macOS desktop app that watches local AI coding agents in one live view: active sessions, process state, token usage, current work, and recent file activity, so you can see what each agent is doing without jumping between terminals. Observes Claude Code, Codex, and Hermes sessions. Built on Tauri with a Rust collector.",
    tags: ["rust", "macos", "agents"],
    href: "https://github.com/karimbabasf/mobi-board",
  },
  {
    id: "camera-tools",
    title: "camera tools",
    role: "Web experiments",
    year: "2026",
    blurb: "Two browser tools that turn a webcam into a gesture controller.",
    detail:
      "Two small browser tools that turn a webcam into a gesture controller with on-device MediaPipe hand tracking: Signal Lens (two-hand pinch to zoom) and Orbit Snap (snap and drag to orbit a 3D scene). No video is uploaded and nothing is stored. React and Vite.",
    tags: ["react", "mediapipe", "camera"],
    href: "https://github.com/karimbabasf/camera-tools",
  },
  {
    id: "cliptic",
    title: "cliptic",
    role: "Desktop app",
    year: "2026",
    blurb: "A caption-first vertical video editor that runs entirely on-device.",
    detail:
      "A caption-first vertical video editor for Reels, TikTok, and Shorts: deterministic, local, and free. It auto-transcribes talking-head clips on-device with Whisper, pins every word to the audio with millisecond timing, and renders animated caption presets that land on the beat, plus punch-in zooms and sticky-note pop-ups. The live preview and the export run the same render code, then it writes a ProRes master and a ready-to-post MP4. Built on Tauri with a Rust core.",
    tags: ["tauri", "whisper", "video"],
    href: "https://github.com/karimbabasf/cliptic",
  },
];
