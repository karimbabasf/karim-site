"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "@phosphor-icons/react/dist/ssr";
import { index } from "@/lib/content";

const ease = [0.23, 1, 0.32, 1] as const;

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
              <span className="v3-row-mobile">
                <span className="v3-row-name">{p.name}</span>
                <span className="v3-row-line">{p.line}</span>
                <span className="v3-row-kind mono">{p.kind}</span>
              </span>
              <span className="v3-row-meta">
                <span className="v3-row-kind mono">{p.kind}</span>
              </span>
              <Plus className="v3-plus" weight="light" aria-hidden />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`row-${p.id}`}
                  className="v3-row-detail"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <div className="v3-row-detail-inner">
                    <span className="v3-row-kind mono">{p.stack}</span>
                    <p>{p.detail}</p>
                    <span className="v3-link-cell">
                      {p.href && (
                        <a className="v3-link" href={p.href} target="_blank" rel="noreferrer noopener">
                          Source
                          <ArrowUpRight weight="bold" />
                        </a>
                      )}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
