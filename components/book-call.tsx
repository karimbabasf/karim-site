"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDots, ArrowUpRight } from "@phosphor-icons/react";
import { bookCall } from "@/lib/site";

/**
 * The primary action. Sits in the hero, above the contact icons.
 * It is the only element that is neon-bordered and glowing *at rest* (the
 * socials only light up on hover), so it reads as the one thing to click
 * without resorting to a solid block that would break the terminal restraint.
 * Hover fills it solid.
 */
export default function BookCall({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      <motion.a
        href={bookCall.href}
        target="_blank"
        rel="noreferrer noopener"
        whileHover={reduce ? undefined : { y: -2 }}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        className="group flex h-12 items-center gap-2.5 rounded-md border border-neon bg-neon/15 px-5 font-mono text-sm text-neon shadow-[0_0_22px_color-mix(in_srgb,var(--neon)_22%,transparent)] transition-[color,background-color,box-shadow] duration-200 hover:bg-neon hover:text-black hover:shadow-[0_0_34px_color-mix(in_srgb,var(--neon)_45%,transparent)] sm:h-14 sm:px-6 sm:text-base"
      >
        <CalendarDots size={22} weight="fill" aria-hidden />
        {bookCall.label}
        <ArrowUpRight
          size={16}
          weight="bold"
          aria-hidden
          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </motion.a>
      <p className="font-mono text-xs text-dim">{bookCall.meta}</p>
    </div>
  );
}
