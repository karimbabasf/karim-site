"use client";

import { useState } from "react";
import { index } from "@/lib/content";
import { ArrowUpRight, Plus } from "./icons";

export default function WorkIndex() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="v3-index">
      {index.map((p) => {
        const isOpen = open === p.id;
        return (
          <div key={p.id} className="v3-row" data-open={isOpen}>
            <button
              type="button"
              className="v3-row-btn"
              aria-expanded={isOpen}
              aria-controls={`row-${p.id}`}
              onClick={() => setOpen(isOpen ? null : p.id)}
            >
              <span className="v3-row-name">{p.name}</span>
              <span className="v3-row-line">{p.line}</span>
              <span className="v3-row-kind">{p.kind}</span>
              <Plus className="v3-plus" />
            </button>
            <div className="v3-row-detail" id={`row-${p.id}`} inert={!isOpen}>
              <div className="feat-clip">
                <div className="v3-row-detail-inner">
                  <p>{p.detail}</p>
                  <div className="v3-row-aside">
                    <span className="v3-row-stack">{p.stack}</span>
                    {p.href && (
                      <a className="v3-source" href={p.href} target="_blank" rel="noreferrer noopener">
                        Source
                        <ArrowUpRight />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
