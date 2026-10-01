"use client";

import { useRef, useState, type CSSProperties } from "react";
import type { Project } from "@/lib/content";
import { Display } from "./displays";
import { ArrowUpRight, Chevron } from "./icons";

// The project modules, set into one milled pocket. The whole plate is the
// button: pressing it sinks the plate a pixel and opens its drawer on a spring.
// Each module opens on its own, so nothing above the one you pressed moves.
export function Rack({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set());
  const keys = useRef(new Map<string, HTMLButtonElement>());

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <ol className="rack">
      {projects.map((p, i) => {
        const isOpen = open.has(p.id);
        const [kind, when] = p.meta;
        return (
          <li
            key={p.id}
            className="module raised"
            data-open={isOpen ? "" : undefined}
            style={{ "--i": i + 1 } as CSSProperties}
            onKeyDown={(e) => {
              if (e.key !== "Escape" || !isOpen) return;
              toggle(p.id);
              keys.current.get(p.id)?.focus();
            }}
          >
            <div className="mod-text">
              <h3 className="mod-head">
                <button
                  ref={(el) => {
                    if (el) keys.current.set(p.id, el);
                  }}
                  type="button"
                  className="mod-key"
                  aria-expanded={isOpen}
                  aria-controls={`${p.id}-more`}
                  onClick={() => toggle(p.id)}
                >
                  {p.name}
                </button>
              </h3>
              <p className="mod-meta">
                {kind}
                {when ? (
                  <>
                    <span aria-hidden> · </span>
                    <time dateTime={p.date}>{when}</time>
                  </>
                ) : null}
              </p>
              <p className="mod-line">{p.line}</p>
              <div className="mod-drawer" id={`${p.id}-more`} inert={!isOpen}>
                <div className="mod-drawer-clip">
                  <div className="mod-drawer-in">
                    <p className="mod-detail">{p.detail}</p>
                    <ul className="mod-links">
                      {p.links.map((l) => (
                        <li key={l.href}>
                          <a className="key key--sm raised" href={l.href} target="_blank" rel="noreferrer noopener">
                            {l.label}
                            <ArrowUpRight className="key-icon" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Display id={p.id} order={i + 1} />
            <span className="mod-toggle" aria-hidden>
              <span className="mod-toggle-cap">
                <Chevron />
              </span>
              {isOpen ? "Close" : "How it works"}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
