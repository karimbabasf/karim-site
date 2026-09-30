"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Project } from "@/lib/content";

// The project cards, filed one behind the other so only each card's head and
// first line show. Pulling a card parts the file there: the cards in front of
// it slide down (a grid row going from 0fr to 1fr) and its back half shows.
// The front card is always fully visible.
export function CardFile({
  projects,
  front,
}: {
  projects: Project[];
  front: ReactNode;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());

  return (
    <ol
      className="file"
      onKeyDown={(e) => {
        if (e.key !== "Escape" || !open) return;
        buttons.current.get(open)?.focus();
        setOpen(null);
      }}
    >
      {projects.map((p, i) => {
        const isOpen = open === p.id;
        const [kind, when] = p.meta;
        return (
          <li
            key={p.id}
            className="slot"
            data-open={isOpen ? "" : undefined}
            style={{ "--z": i + 1 } as CSSProperties}
          >
            <article className="card card--project">
              <h2 className="card-head">
                <button
                  ref={(el) => {
                    if (el) buttons.current.set(p.id, el);
                  }}
                  type="button"
                  className="pull"
                  aria-expanded={isOpen}
                  aria-controls={`${p.id}-more`}
                  onClick={() => setOpen(isOpen ? null : p.id)}
                >
                  <span className="pull-name">{p.name}</span>
                  <span className="pull-kind">{kind}</span>
                  <svg className="pull-mark" viewBox="0 0 12 12" aria-hidden focusable="false">
                    <path d="M3 4.5 6 7.5l3-3" />
                  </svg>
                </button>
              </h2>
              <p className="card-line">{p.line}</p>
              <div className="card-more" id={`${p.id}-more`} inert={!isOpen}>
                <p>{p.detail}</p>
                <p className="card-links">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
                      {l.label}
                    </a>
                  ))}
                  {when ? <time dateTime={p.date}>{when}</time> : null}
                </p>
              </div>
            </article>
          </li>
        );
      })}
      <li className="slot slot--front" style={{ "--z": projects.length + 1 } as CSSProperties}>
        {front}
      </li>
    </ol>
  );
}
