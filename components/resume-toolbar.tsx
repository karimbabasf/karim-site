"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, DownloadSimple } from "@phosphor-icons/react";

/**
 * Sticky viewer chrome for /resume — stays in the site's dark/neon/mono world
 * while the light résumé sheet scrolls beneath it. The Download button is the
 * one primary CTA and is always visible up top, per the brief.
 */
export default function ResumeToolbar() {
  const reduce = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-md print:hidden">
      <div className="mx-auto flex w-full max-w-[900px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          aria-label="Back to home"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-2 font-mono text-xs uppercase tracking-wider text-dim transition-colors hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden />
          Back
        </Link>

        <span className="pointer-events-none hidden select-none font-mono text-[11px] uppercase tracking-[0.22em] text-dim sm:block">
          Résumé
        </span>

        <motion.a
          href="/Karim-Baba-Resume.pdf"
          download="Karim-Baba-Resume.pdf"
          aria-label="Download résumé as PDF"
          whileHover={reduce ? undefined : { y: -2 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          className="inline-flex items-center gap-2 rounded-md bg-neon px-4 py-2.5 font-mono text-sm font-semibold text-background shadow-[0_0_22px_color-mix(in_srgb,var(--neon)_35%,transparent)] transition-[filter] duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <DownloadSimple size={18} weight="bold" aria-hidden />
          <span>Download PDF</span>
        </motion.a>
      </div>
    </header>
  );
}
