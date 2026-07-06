"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  XLogo,
  LinkedinLogo,
  GithubLogo,
  EnvelopeSimple,
  type Icon,
} from "@phosphor-icons/react";
import { socials, type Social } from "@/lib/site";

/** Icons, one family (Phosphor), matched to the mono/neon vibe. */
const ICONS = {
  resume: FileText,
  x: XLogo,
  linkedin: LinkedinLogo,
  github: GithubLogo,
  email: EnvelopeSimple,
} satisfies Record<Social["id"], Icon>;

export default function Socials({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`flex flex-wrap items-center gap-2.5 sm:gap-3 ${className}`}>
      {socials.map((s) => {
        const Glyph = ICONS[s.id];
        const external = s.href.startsWith("http");
        return (
          <motion.a
            key={s.id}
            href={s.href}
            aria-label={s.label}
            title={s.label}
            {...(external
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={reduce ? undefined : { scale: 0.92 }}
            className="flex h-12 w-12 items-center justify-center rounded-md border border-neon/25 bg-white/[0.04] text-foreground/75 transition-[color,background-color,border-color,box-shadow] duration-200 hover:border-neon hover:bg-neon/15 hover:text-neon hover:shadow-[0_0_22px_color-mix(in_srgb,var(--neon)_30%,transparent)] sm:h-14 sm:w-14"
          >
            <Glyph size={26} weight="fill" aria-hidden />
          </motion.a>
        );
      })}
    </div>
  );
}
