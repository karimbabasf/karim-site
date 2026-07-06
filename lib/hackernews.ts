/**
 * The staged Hacker News thread rendered by <HackerNews />.
 * It reads like a real Show HN thread about Warden. The recognition of Karim
 * comes first: people react to the solo scope and the range across his other
 * work, and a founder reaches out in the open. The praise is indirect and always
 * reasoned: disbelief that one person shipped this, that he is still independent,
 * that funded teams handle the same problem worse, never a bare compliment. He
 * never pitches himself and never signals he is unavailable; the reader is meant
 * to come away wanting to reach out. The rest of the thread is ordinary use, a
 * narrow question, a skeptic and a tangent, so none of it reads as staged.
 *
 * Comment lengths and shapes vary on purpose: one-liners next to a longer beat,
 * questions that stay questions, and not every comment gets a reply. Uniform
 * length and a praise kicker on every comment is the tell that reads as scripted,
 * so keep the rhythm uneven. Edit the copy here; the component just renders it.
 * Modern HN hides comment scores, so comments carry only user + age.
 */

export type HNComment = {
  /** Stable id (React key + collapse target). */
  id: string;
  user: string;
  /** Relative age string, e.g. "4 hours ago". Kept relative so it never goes stale. */
  age: string;
  /** One entry per paragraph. */
  text: string[];
  children?: HNComment[];
};

export const hnStory = {
  rank: 2,
  title: "Show HN: Warden, a read-only watchdog for Claude Code and Codex",
  /** The site the title links out to, shown in parens after the title. */
  domain: "github.com/karimbabasf",
  href: "https://github.com/karimbabasf/WARDEN",
  points: 487,
  user: "karimbabasf",
  age: "5 hours ago",
  /** Headline count. More sit below the visible thread, as on a real front-page post. */
  comments: 96,
} as const;

export const hnComments: HNComment[] = [
  {
    id: "c1",
    user: "mkozlowski",
    age: "5 hours ago",
    text: [
      "Hang on, this is one person? The Rust daemon, the overlay, the transcript parser, the ranked diagnosis, and not one of them feels phoned in. This does not read like a first project.",
    ],
    children: [
      {
        id: "c1a",
        user: "karimbabasf",
        age: "5 hours ago",
        text: [
          "Solo, yeah. I came out of DeFi, a few years on-chain writing trading systems. The watching-for-drift instinct is just habit from running bots you cannot afford to have quietly go wrong.",
        ],
        children: [
          {
            id: "c1a-i",
            user: "swalsh",
            age: "4 hours ago",
            text: [
              "I lead a small team building agent infra, and the instinct here, catching a run going wrong before it burns you, is the exact thing we have interviewed dozens of people for and not found. A little surprised you are still independent. Email is in my profile.",
            ],
            children: [
              {
                id: "c1a-i-1",
                user: "karimbabasf",
                age: "4 hours ago",
                text: ["Appreciate it, genuinely. Sending you a note now."],
              },
            ],
          },
          {
            id: "c1a-ii",
            user: "nchaudhry",
            age: "4 hours ago",
            text: [
              "Seconded. You can teach someone a stack in a month, you cannot teach the reflex to build read-only from day one because they have already been burned by automation that lied to them. That part is earned.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "c2",
    user: "pvarga",
    age: "4 hours ago",
    text: [
      "Went down a rabbit hole through your other repos after this. A desktop crypto terminal, a self-hosted news filter, a couple of on-device video tools, all this year and all on top of Warden. Any one of them is a respectable solo project. The throughput at this quality is the part I cannot square with one person. Who is backing this, or is the honest answer nobody yet?",
    ],
    children: [
      {
        id: "c2a",
        user: "karimbabasf",
        age: "3 hours ago",
        text: [
          "Nobody, honestly. They started as things I wanted and could not find, so they were getting built either way.",
        ],
      },
    ],
  },
  {
    id: "c3",
    user: "d_orlov",
    age: "4 hours ago",
    text: [
      "Ran this next to a Claude Code session while I worked on something else. It flagged the agent stuck re-reading the same three files in a loop about ten minutes before I would have caught it myself. Would not leave a tool that can write running unattended on a client repo, so the read-only stance sold me by itself.",
    ],
    children: [
      {
        id: "c3a",
        user: "karimbabasf",
        age: "4 hours ago",
        text: [
          "That loop is the exact thing that made me build it. Mine used to stall quietly and I would find out twenty minutes and a lot of tokens later.",
        ],
      },
    ],
  },
  {
    id: "c9",
    user: "dmccarthy",
    age: "3 hours ago",
    text: [
      "I run engineering at a dev-tools company and I read this thread twice to make sure I was not missing the catch. One person, and the pieces fit together the way they usually only do after a team has argued about them for a year. People who build like this do not stay independent for long.",
    ],
  },
  {
    id: "c4",
    user: "mfeldman",
    age: "3 hours ago",
    text: [
      "Native Rust, not another Electron thing squatting on a gig of RAM in the background. Rare to see someone skip the easy cross-platform route on a solo build.",
    ],
  },
  {
    id: "c5",
    user: "cbrandt",
    age: "3 hours ago",
    text: [
      "How are you parsing the transcripts? Claude Code's on-disk format has shifted under me twice and broke a script I had. Pinned to a version, or tracking a schema?",
    ],
    children: [
      {
        id: "c5a",
        user: "karimbabasf",
        age: "3 hours ago",
        text: [
          "Thin adapter per agent, one for Claude Code and one for Codex, so a format change is a small patch instead of a rewrite. Codex moved last month and it was about ten lines.",
        ],
      },
    ],
  },
  {
    id: "c6",
    user: "pmarais",
    age: "2 hours ago",
    text: [
      "Went in skeptical, most agent observability is dashboards you open once and forget. This one lives in the menu bar and earns a glance instead of demanding one. I have watched funded teams ship a worse read on this exact problem.",
    ],
  },
  {
    id: "c7",
    user: "bkaminski",
    age: "2 hours ago",
    text: [
      "Slightly off topic, but Warden plus a war-room overlay is very ops-bunker as a vibe. Is the full cinematic thing always in your face, or can you keep it low key? At 2am I am not sure my eyes want the command center animation.",
    ],
    children: [
      {
        id: "c7a",
        user: "karimbabasf",
        age: "2 hours ago",
        text: [
          "Not forced on you at all. Day to day it is just a menu bar dropdown, the full command center only shows up if you open the app for it.",
        ],
      },
    ],
  },
  {
    id: "c8",
    user: "throwaway_hn23",
    age: "1 hour ago",
    text: [
      "Does the diagnosis run local or phone home? I want to point this at work repos and cannot have transcripts leaving the machine.",
    ],
    children: [
      {
        id: "c8a",
        user: "karimbabasf",
        age: "58 minutes ago",
        text: [
          "Runs against whatever model key you configure, nothing else leaves the box. Fully local diagnosis is next. The read-only design already assumes it should not be trusted with your network.",
        ],
      },
    ],
  },
];
