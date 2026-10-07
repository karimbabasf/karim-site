"use client";

import { useEffect, useRef, useState } from "react";

export type CardProject = { name: string; line: string; href?: string };
export type CardLink = { label: string; href: string };

const external = { target: "_blank", rel: "noreferrer noopener" } as const;


export default function BusinessCard({
  projects,
  links,
  email,
}: {
  projects: CardProject[];
  links: CardLink[];
  email: string;
}) {
  const [flipped, setFlipped] = useState(false);
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
    <div className="desk">
      <div className="stage">
        <div className="tilt" ref={tilt}>
          <div
            className={`card${flipped ? " is-flipped" : ""}`}
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest("a")) setFlipped((f) => !f);
            }}
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

      <button type="button" className="turn" aria-pressed={flipped} onClick={() => setFlipped((f) => !f)}>
        {flipped ? "Turn back" : "Turn over"}
      </button>
    </div>
  );
}
