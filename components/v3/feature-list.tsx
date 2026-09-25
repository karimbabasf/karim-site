"use client";

import { useState } from "react";
import { features } from "@/lib/content";
import { ArrowUpRight, Plus } from "./icons";

// Open and close run on CSS grid-row transitions (see .feat-* in home.css),
// so this component ships no animation library.
export default function FeatureList() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="feats">
      {features.map((f) => {
        const isOpen = open === f.id;
        return (
          <article key={f.id} className="feat" data-open={isOpen} id={f.id}>
            <button
              type="button"
              className="feat-btn"
              aria-expanded={isOpen}
              aria-controls={`feat-${f.id}`}
              onClick={() => setOpen(isOpen ? null : f.id)}
            >
              <span className={`feat-name face-${f.id}`}>{f.name}</span>
              <span className="feat-icon" aria-hidden>
                <Plus />
              </span>
              <span className="feat-line">
                <span>
                  <span>{f.line}</span>
                </span>
              </span>
            </button>
            <div className="feat-detail" id={`feat-${f.id}`} inert={!isOpen}>
              <div className="feat-clip">
                <div className="feat-detail-inner">
                  <p className="feat-body">{f.body}</p>
                  {f.links.length > 0 && (
                    <div className="project-links">
                      {f.links.map((l) => (
                        <a key={l.href} className="pill" href={l.href} target="_blank" rel="noreferrer noopener">
                          {l.label}
                          <ArrowUpRight />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
