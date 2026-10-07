"use client";

import { useEffect, useRef, useState } from "react";

export type CardProject = { name: string; line: string; href?: string };
export type CardLink = { label: string; href: string };

const external = { target: "_blank", rel: "noreferrer noopener" } as const;

type Side = "about" | "work";

// Font prototype, shown only with ?fonts in the URL. Keys 1 to 9 and 0 switch it.
const FONTS = [
  "Cormorant",
  "EB Garamond",
  "Cinzel",
  "Marcellus",
  "Geist",
  "Playfair",
  "Spectral",
  "Alegreya",
  "Bodoni",
  "Manrope",
];

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
  const [font, setFont] = useState(1);
  const [proto, setProto] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    if (!q.has("fonts")) return;
    setProto(true);
    setFont(Number(q.get("fonts")) || 1);
    const onKey = (e: KeyboardEvent) => {
      if (!/^[0-9]$/.test(e.key)) return;
      setFont(e.key === "0" ? 10 : Number(e.key));
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);
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

  return (
    <div
      className="desk"
      data-font={font}
      data-half={flipped ? undefined : (half ?? undefined)}
    >
      {proto && (
        <div className="fonts" role="group" aria-label="Font prototype">
          {FONTS.map((name, i) => (
            <button
              key={name}
              type="button"
              aria-pressed={font === i + 1}
              onClick={() => setFont(i + 1)}
            >
              {i + 1} {name}
            </button>
          ))}
        </div>
      )}
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
                    Russia and moved to San Francisco to build my future now, not after university.
                  </p>
                  <p>
                    My first months here went to moving and construction jobs, and I taught
                    myself in whatever time was left. Then I built automations for those same
                    companies, which led me to agent infrastructure for blockchains.
                  </p>
                  <p>
                    Next: hardware and federated learning, so models can learn from private data
                    that never leaves its owner, and helping Ethereum become the cryptographic
                    world computer Vitalik describes.
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
          className="side about"
          hidden={flipped}
          onClick={() => turn("about")}
        >
          About
        </button>
        <button type="button" className="side work" hidden={flipped} onClick={() => turn("work")}>
          Work
        </button>
      </div>

      <div className="turns">
        <button type="button" className="turn" hidden={!flipped} onClick={() => setOpen(null)}>
          Turn back
        </button>
      </div>
    </div>
  );
}
