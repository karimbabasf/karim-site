"use client";

import { useEffect, useRef, useState } from "react";

export type CardProject = { name: string; line: string; href?: string };
export type CardLink = { label: string; href: string };

const external = { target: "_blank", rel: "noreferrer noopener" } as const;

type Side = "about" | "work";


// The left half of the card opens the about side, the right half the work.
// The card turns toward the side you pressed, like flipping it by that edge.
export default function BusinessCard({
  projects,
  links,
  email,
}: {
  projects: CardProject[];
  links: CardLink[];
  email: string;
}) {
  const [open, setOpen] = useState<Side | null>(null);
  // What the back shows. It keeps the last side while the card turns home,
  // so the text never swaps mid-turn.
  const [shown, setShown] = useState<Side>("work");
  const [half, setHalf] = useState<Side | null>(null);
  const flipped = open !== null;
  const turn = (side: Side) => {
    setShown(side);
    setOpen(side);
  };
  const tilt = useRef<HTMLDivElement>(null);

  // The card leans toward the pointer. Only transforms change per frame, so
  // the browser moves layers it already painted and never repaints the paper.
  useEffect(() => {
    const el = tilt.current;
    if (!el) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const step = () => {
      x += (tx - x) * 0.1;
      y += (ty - y) * 0.1;
      el.style.setProperty("--rx", `${(-y * 7).toFixed(3)}deg`);
      el.style.setProperty("--ry", `${(x * 9).toFixed(3)}deg`);
      el.style.setProperty("--sx", `${(x * 30).toFixed(2)}%`);
      el.style.setProperty("--sy", `${(y * 30).toFixed(2)}%`);
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.0005 ? requestAnimationFrame(step) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // The hairlines either side of a label close over it like doors. Each line
  // has to travel to the label's centre, which depends on the word's length,
  // so measure it once the fonts are in and again on resize.
  useEffect(() => {
    const measure = () => {
      document.querySelectorAll<HTMLElement>(".mark").forEach((m) => {
        const text = m.querySelector<HTMLElement>(".mark-text");
        if (!text) return;
        const cs = getComputedStyle(m);
        const vertical = cs.writingMode.startsWith("vertical");
        const len = vertical ? text.offsetHeight : text.offsetWidth;
        const line = getComputedStyle(m, "::before");
        const lineLen = parseFloat(vertical ? line.height : line.width) || 0;
        const gap = parseFloat(cs.columnGap) || parseFloat(cs.rowGap) || 0;
        m.style.setProperty("--reach", `${(len / 2 + gap + lineLen / 2).toFixed(1)}px`);
      });
    };
    measure();
    document.fonts?.ready.then(measure);
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, []);

  return (
    <div className="desk" data-half={flipped ? undefined : (half ?? undefined)}>
      <div className="table">
      <div className="stage">
        <div className="tilt" ref={tilt}>
          <div
            className={`card${open ? ` is-${open}` : ""}`}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) return;
              if (flipped) return setOpen(null);
              const r = e.currentTarget.getBoundingClientRect();
              turn(e.clientX < r.left + r.width / 2 ? "about" : "work");
            }}
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setHalf(e.clientX < r.left + r.width / 2 ? "about" : "work");
            }}
            onPointerLeave={() => setHalf(null)}
          >
            <section className="face front" inert={flipped} aria-label="Front of card">
              <span className="sheen" aria-hidden />
              <div className="corners">
                <a href={`mailto:${email}`}>{email}</a>
                <a href="https://x.com/karimbabasf" {...external}>
                  @karimbabasf
                </a>
              </div>
              <div className="title">
                <h1>Karim BABA</h1>
                <p>Founder</p>
              </div>
              <div className="firm">
                <a href="https://phosphor.money" {...external}>
                  Phosphor
                </a>
                <p>Agent Infrastructure</p>
                <p className="address">San Francisco, California</p>
              </div>
            </section>

            <section className="face back" inert={!flipped} aria-label="Back of card">
              <span className="sheen" aria-hidden />
              {shown === "about" ? (
                <div className="about">
                  <h2>About</h2>
                  <p>
                    I got into tech at 13, selling my drawings as NFTs, then reading whitepapers
                    and writing my own smart contracts. At 16 I left a serious swimming career in
                    Russia and moved to San Francisco after realizing that the time to build my
                    future was NOW.
                  </p>
                  <p>
                    Since moving, I have built automation for traditional service companies,
                    infrastructure for agent adoption, and am now focused on federated learning,
                    hardware, and helping blockchains evolve.
                  </p>
                </div>
              ) : (
                <>
              <h2>Work</h2>
              <ul>
                {projects.map((p) => (
                  <li key={p.name}>
                    {p.href ? (
                      <a href={p.href} {...external}>
                        {p.name}
                      </a>
                    ) : (
                      <span>{p.name}</span>
                    )}
                    <p>{p.line}</p>
                  </li>
                ))}
              </ul>
                </>
              )}
              <nav>
                {links.map((l) => (
                  <a key={l.label} href={l.href} {...(l.href.startsWith("http") ? external : {})}>
                    {l.label}
                  </a>
                ))}
              </nav>
            </section>
          </div>
        </div>
      </div>
        {/* Set along the card's edges like book spines: each label sits on the
            edge the card turns by. */}
        <button
          type="button"
          className="side mark about"
          data-off={flipped || undefined}
          tabIndex={flipped ? -1 : undefined}
          aria-hidden={flipped || undefined}
          onClick={() => turn("about")}
        >
          <span className="mark-text">About</span>
        </button>
        <button type="button" className="side mark work" data-off={flipped || undefined}
          tabIndex={flipped ? -1 : undefined}
          aria-hidden={flipped || undefined} onClick={() => turn("work")}>
          <span className="mark-text">Work</span>
        </button>
        {/* Absolutely placed, so showing it never moves the card. */}
        <div className="turns">
          <button type="button" className="turn mark" data-off={!flipped || undefined}
            tabIndex={flipped ? undefined : -1}
            aria-hidden={!flipped || undefined} onClick={() => setOpen(null)}>
            <span className="mark-text">Turn back</span>
          </button>
        </div>
      </div>

    </div>
  );
}
