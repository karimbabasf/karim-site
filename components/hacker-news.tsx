"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { hnStory, hnComments, type HNComment } from "@/lib/hackernews";
import "./hacker-news.css";

/**
 * A straight-faced "Show HN: Warden" thread in the site's own dark theme. The
 * recognition of Karim is implicit; it comes from the reactions, never from him.
 *
 * The thread is read-only, like Warden: the dead links go nowhere and the one
 * control that truly works is upvoting the post. Comments collapse for real.
 *
 * Easter egg: every clickable label decodes on click. A click bursts the word
 * into green katakana (the "encoded" beat), then resolves left-to-right back
 * into the word (the "decode"), a Matrix run-through nodding to KARIM_OS. See
 * useScramble below; it runs entirely on the click and never blocks the real
 * action underneath (collapse and upvote still fire).
 */

/** Top-nav words and footer words, as data so each becomes a scrambling link. */
const NAV = ["new", "past", "comments", "ask", "show", "jobs", "submit"];
const FOOTER = [
  "Guidelines",
  "FAQ",
  "Lists",
  "API",
  "Security",
  "Legal",
  "Apply to YC",
  "Contact",
];

/* ── Matrix decode easter egg ───────────────────────────────────────────────
   Same half-width katakana + symbol set as the KARIM_OS boot rain, so the two
   easter eggs share an alphabet. */
const GLYPHS = Array.from(
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑ0123456789+*=<>:¦╌",
);
const randGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

type Cell = { ch: string; on: boolean };

/**
 * Drives one label's decode animation. Returns the node to render (plain text
 * when idle, per-character spans mid-run) plus fire(), which kicks off a run.
 *
 * The run is trigger-driven through an effect rather than started inline, so a
 * control whose label changes on click (the [-]/[+] toggle) scrambles toward
 * its *new* text: fire() and the real state change land in the same commit, and
 * the effect reads the fresh `text` after render. Mid-run the node keeps the real
 * word in flow but invisible and paints the glyphs in an absolute overlay, so the
 * animation never reflows the row or nudges the baseline.
 */
function useScramble(text: string) {
  const [trigger, setTrigger] = useState(0);
  const [cells, setCells] = useState<Cell[] | null>(null);
  const rafId = useRef<number | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    // Skip the mount pass; only real clicks (trigger > 0) should animate.
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (prefersReducedMotion()) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);

    const chars = Array.from(text);
    // Reveal frame per char: a short all-scrambled beat up front, then a
    // left-to-right resolve. Spaces are never scrambled.
    const reveal = chars.map((ch, i) =>
      ch === " " ? 0 : Math.round(i * 4.5) + 16 + Math.floor(Math.random() * 12),
    );
    const lastFrame = reveal.reduce((m, v) => Math.max(m, v), 0) + 10;
    const glyphs = chars.map(() => randGlyph());

    let frame = 0;
    const tick = () => {
      setCells(
        chars.map((ch, i) => {
          if (ch === " " || frame >= reveal[i]) return { ch, on: false };
          if (frame % 2 === 0) glyphs[i] = randGlyph(); // flicker every other frame
          return { ch: glyphs[i], on: true };
        }),
      );
      if (frame++ >= lastFrame) {
        setCells(null);
        rafId.current = null;
        return;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
    // Intentionally keyed on `trigger` only: each fire() reads the latest text.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const node = cells ? (
    <span className="hn-scramble is-active">
      {/* Real word stays in flow but invisible, holding its exact box + baseline
          so nothing around it shifts; the glyph layer paints on top, out of flow. */}
      <span className="hn-scramble-base">{text}</span>
      <span className="hn-scramble-fx" aria-hidden>
        {cells.map((c, i) => (
          <span key={i} className={c.on ? "hn-scr" : undefined}>
            {c.ch}
          </span>
        ))}
      </span>
    </span>
  ) : (
    <span className="hn-scramble">{text}</span>
  );

  const fire = useCallback(() => setTrigger((t) => t + 1), []);
  return { node, fire };
}

/** A dead control: it goes nowhere, it just decodes. Renders an <a> so it
 * inherits HN's link styling and hover underline. */
function ScrambleLink({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const { node, fire } = useScramble(text);
  return (
    <a
      href="#hn"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        fire();
      }}
    >
      {node}
    </a>
  );
}

function countDescendants(c: HNComment): number {
  if (!c.children?.length) return 0;
  return c.children.reduce((n, k) => n + 1 + countDescendants(k), 0);
}

/**
 * A working upvote triangle. Each click floats a neon "+1" off the top and
 * fades it; spam it all you like. The story arrow also bumps the point count.
 */
function VoteArrow({ onVote }: { onVote?: () => void }) {
  const [bursts, setBursts] = useState<number[]>([]);
  const nextId = useRef(0);

  return (
    <button
      type="button"
      className="hn-vote"
      aria-label="upvote"
      onClick={() => {
        const id = nextId.current++;
        setBursts((b) => [...b, id]);
        onVote?.();
      }}
    >
      <span className="hn-arrow" aria-hidden />
      {bursts.map((id) => (
        <span
          key={id}
          className="hn-plus"
          aria-hidden
          onAnimationEnd={() => setBursts((b) => b.filter((x) => x !== id))}
        >
          +1
        </span>
      ))}
    </button>
  );
}

function Comment({
  comment,
  collapsed,
  toggle,
}: {
  comment: HNComment;
  collapsed: Set<string>;
  toggle: (id: string) => void;
}) {
  const isCollapsed = collapsed.has(comment.id);
  const hidden = isCollapsed ? countDescendants(comment) : 0;
  const toggleText = `[${isCollapsed ? "+" : "-"}]${
    isCollapsed && hidden > 0 ? ` (${hidden} more)` : ""
  }`;
  const { node: toggleNode, fire: fireToggle } = useScramble(toggleText);

  return (
    <div className={`hn-comment${isCollapsed ? " hn-collapsed" : ""}`}>
      <div className="hn-comhead">
        <VoteArrow />
        <ScrambleLink text={comment.user} className="hn-user" />
        <span>{comment.age}</span>
        <button
          type="button"
          className="hn-toggle"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? "expand comment" : "collapse comment"}
          onClick={() => {
            fireToggle();
            toggle(comment.id);
          }}
        >
          {toggleNode}
        </button>
      </div>

      <div className="hn-comment-text">
        {comment.text.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="hn-reply">
        <ScrambleLink text="reply" />
      </div>

      {comment.children?.length ? (
        <div className="hn-kids">
          {comment.children.map((k) => (
            <Comment
              key={k.id}
              comment={k}
              collapsed={collapsed}
              toggle={toggle}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function HackerNews() {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [points, setPoints] = useState<number>(hnStory.points);

  const toggle = (id: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-hairline bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      {/* Hacker News document */}
      <div className="hn">
        <div className="hn-top">
          <span className="hn-logo" aria-hidden>
            Y
          </span>
          <span className="hn-top-title">Hacker News</span>
          <span className="hn-top-nav">
            {NAV.map((w, i) => (
              <Fragment key={w}>
                {i > 0 ? (
                  <>
                    {" "}
                    <span className="sep">|</span>{" "}
                  </>
                ) : null}
                <ScrambleLink text={w} />
              </Fragment>
            ))}
          </span>
          <ScrambleLink text="login" className="hn-top-login" />
        </div>

        <div className="hn-body">
          <div className="hn-story">
            <span className="hn-rank">{hnStory.rank}.</span>
            <VoteArrow onVote={() => setPoints((p) => p + 1)} />
            <a
              className="hn-title"
              href={hnStory.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {hnStory.title}
            </a>
            <span className="hn-domain">({hnStory.domain})</span>
          </div>
          <div className="hn-subtext">
            {points} points by <ScrambleLink text={hnStory.user} />{" "}
            {hnStory.age} <span aria-hidden>|</span>{" "}
            <ScrambleLink text="hide" /> <span aria-hidden>|</span>{" "}
            <ScrambleLink text={`${hnStory.comments} comments`} />
          </div>

          <div className="hn-comments">
            {hnComments.map((c) => (
              <Comment
                key={c.id}
                comment={c}
                collapsed={collapsed}
                toggle={toggle}
              />
            ))}
          </div>

          <div className="hn-foot">
            <div className="hn-foot-links">
              {FOOTER.map((w, i) => (
                <Fragment key={w}>
                  {i > 0 ? " | " : null}
                  <ScrambleLink text={w} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
