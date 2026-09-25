"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "@phosphor-icons/react/dist/ssr";
import { features } from "@/lib/content";

const ease = [0.23, 1, 0.32, 1] as const;

export default function FeatureList() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="feats">
      {features.map((f) => {
        const isOpen = open === f.id;
        return (
          <div key={f.id} className="feat" data-open={isOpen} id={f.id}>
            <button
              type="button"
              className="feat-btn"
              aria-expanded={isOpen}
              aria-controls={`feat-${f.id}`}
              onClick={() => setOpen(isOpen ? null : f.id)}
            >
              <span className={`feat-name face-${f.id}`}>{f.name}</span>
              <span className="feat-line">{f.line}</span>
              <span className="feat-icon" aria-hidden>
                <Plus weight="light" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`feat-${f.id}`}
                  className="feat-detail"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <div className="feat-detail-inner">
                    <p className="feat-body">{f.body}</p>
                    <div>
                      <dl className="facts">
                        {f.facts.map((x) => (
                          <div key={x.label}>
                            <dt>{x.label}</dt>
                            <dd className="num">{x.value}</dd>
                          </div>
                        ))}
                      </dl>
                      {f.links.length > 0 && (
                      <div className="project-links">
                        {f.links.map((l) => (
                          <a key={l.href} className="pill" href={l.href} target="_blank" rel="noreferrer noopener">
                            {l.label}
                            <ArrowUpRight weight="bold" />
                          </a>
                        ))}
                      </div>
                      )}
                    </div>
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
