# Product

<!-- impeccable:product-schema 1 -->

Written 2026-09-30 from the repository, the project's vault note and Karim's direct asks that day. No interview round ran: Karim's standing rule is no questions back at him. Facts marked (inferred) come from evidence, not from his words.

## Platform

web

## Users

- People deciding whether to work with Karim or back him: founders and hiring teams at agent and crypto infrastructure companies, fellowship and funding reviewers, and builders who meet him at hackathons. (inferred)
- They arrive from a link (X bio, LinkedIn, a resume, an intro email), often inside an in-app browser on a phone, and give the page well under a minute. (inferred)

## Product Purpose

Karim Baba's personal site at karimbabasf.com: who he is, what he has shipped, and how to reach him. Success is a visitor opening a project, reading the resume, or emailing him.

## Positioning

A software engineer in San Francisco who builds agent systems that touch money and stop for a person before anything irreversible. He designs and ships every product himself, end to end, so the site's own craft is part of the proof. Not positioned as a general fullstack developer.

## Operating Context

- Links are opened from X, LinkedIn, Telegram and Instagram webviews as often as from desktop browsers. (inferred)
- The resume must open or download on iOS and inside webviews; `next.config.ts` sends `Content-Disposition` for the PDF for that reason.
- A push to `main` deploys production on Vercel.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, TypeScript. Homepage copy lives in `lib/content.ts`; components only render it.
- `/resume` shows `public/resume.webp` rendered from the PDF by `scripts/render-resume.sh`.
- Security headers in `next.config.ts` stay on every route.
- The homepage keeps framer-motion and icon libraries off its bundle. The largest text element must be visible at first paint (never animate it in from opacity 0).

## Brand Commitments

- Name: Karim Baba. Email: founder@karimbabasf.com. Handles: @karimbabasf on X, GitHub and Telegram.
- Homepage reading order, set by Karim on 2026-09-30: picture, name, about, projects, then resume and email, then X, LinkedIn and GitHub.
- Projects on the homepage are exactly Phosphor, Warden, SolBid and Vesper Wallet, in that order.
- The portrait appears in colour and small. A large face was rejected on 2026-09-30.
- Rejected before, do not bring back: a green accent, the Phosphor app's look, Manrope with Geist Mono, General Sans with Kanit, display serifs.
- Voice: plain, short sentences, no marketing words, no em or en dashes.

## Evidence on Hand

- `public/karim.jpg`: colour photo, 1000x999, half-body in a sandstone archway in warm sun, white tee printed `return *this`. The head sits in the middle third, high in the frame.
- `public/Karim-Baba-Resume.pdf` and `public/resume.webp`.
- Project links and one-line descriptions in `lib/content.ts`.
- No analytics, visitor counts, testimonials or client logos exist. Never invent them.

## Product Principles

1. Shipped things are the proof. Name what each project does, never how impressive it is.
2. One reading path from top to bottom, no competing focal points.
3. Fast on a phone in an in-app browser, not only on a desktop.
4. The page is built the way he builds products: every detail made on purpose.
