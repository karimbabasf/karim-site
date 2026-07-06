"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CaretDown, ArrowUpRight } from "@phosphor-icons/react";
import type { Project } from "@/lib/projects";

/**
 * The `ls ~/projects` list. Every project is visible at once as a row; a row
 * expands to reveal its fuller description. One row open at a time keeps the
 * list compact — good on mobile, where most visitors land. The first project
 * opens on load as a starting point, but any row can be collapsed fully, so
 * the list can be closed down to just its headers.
 */
export default function ProjectsAccordion({
  projects,
}: {
  projects: Project[];
}) {
  const reduce = useReducedMotion();
  const firstId = projects[0]?.id ?? null;
  const [openId, setOpenId] = useState<string | null>(firstId);

  return (
    <ul className="mt-8 divide-y divide-hairline overflow-hidden rounded-lg border border-hairline">
      {projects.map((p) => {
        const open = openId === p.id;
        const hasLink = Boolean(p.href) && p.href !== "#";
        return (
          <li key={p.id} className="bg-white/[0.012]">
            <h3 className="m-0">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : p.id)}
                aria-expanded={open}
                aria-controls={`proj-${p.id}`}
                className="group flex w-full items-center gap-4 px-4 py-4 text-left transition-colors duration-200 hover:bg-white/[0.02] sm:px-5"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      className={`text-base tracking-tight transition-colors duration-200 sm:text-lg ${
                        open
                          ? "text-neon"
                          : "text-foreground group-hover:text-neon"
                      }`}
                    >
                      {p.title}
                    </span>
                    <span className="font-mono text-xs text-dim">
                      {p.role} · {p.year}
                    </span>
                  </span>
                  <span className="mt-1 block truncate font-sans text-sm text-dim">
                    {p.blurb}
                  </span>
                </span>
                <motion.span
                  aria-hidden
                  animate={reduce ? undefined : { rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className={`shrink-0 ${open ? "text-neon" : "text-dim"}`}
                >
                  <CaretDown size={18} weight="bold" />
                </motion.span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`proj-${p.id}`}
                  key="content"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-5 pt-1 sm:px-5">
                    <p className="max-w-[65ch] font-sans text-[15px] leading-relaxed text-foreground/85">
                      {p.detail}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-dim">
                        {p.tags.map((t) => (
                          <li
                            key={t}
                            className="before:mr-1 before:text-neon/60 before:content-['#']"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                      {hasLink && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1 font-mono text-xs text-dim transition-colors duration-200 hover:text-neon"
                        >
                          visit <ArrowUpRight size={12} weight="bold" aria-hidden />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
