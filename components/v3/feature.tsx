"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Feature as F } from "@/lib/content";

const ease = [0.23, 1, 0.32, 1] as const;

export default function Feature({ f, priority }: { f: F; priority?: boolean }) {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "start 0.35"],
  });
  // The frame opens from a narrow window to full width as it scrolls in.
  const inset = useTransform(scrollYProgress, [0, 1], [9, 0]);
  const clip = useTransform(inset, (v) => `inset(${v * 0.6}% ${v}% ${v * 0.6}% ${v}% round 28px)`);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  const shot = f.shots[active];

  return (
    <article className="v3-feature" id={f.id}>
      <div className="v3-feature-head">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <h3 className="v3-feature-name">{f.name}</h3>
          <p className="v3-feature-line">{f.line}</p>
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease, delay: 0.08 }}
        >
          <p className="v3-feature-body">{f.body}</p>
          <dl className="v3-facts">
            {f.facts.map((x) => (
              <div key={x.label}>
                <dt>{x.label}</dt>
                <dd className="mono">{x.value}</dd>
              </div>
            ))}
          </dl>
          <div className="v3-links">
            {f.links.map((l) => (
              <a key={l.href} className="v3-link" href={l.href} target="_blank" rel="noreferrer noopener">
                {l.label}
                <ArrowUpRight weight="bold" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        ref={stageRef}
        className="v3-stage"
        style={reduce ? undefined : { clipPath: clip }}
      >
        <div className="v3-stage-img" style={{ aspectRatio: `${f.shots[0].w} / ${f.shots[0].h}` }}>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={shot.src}
              style={{ position: "absolute", inset: 0, scale: reduce ? 1 : imgScale }}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease }}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                priority={priority && active === 0}
                sizes="(min-width: 1240px) 1192px, 100vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {f.shots.length > 1 && (
        <div className="v3-thumbs" role="group" aria-label={`${f.name} screenshots`}>
          {f.shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              className="v3-thumb"
              aria-pressed={i === active}
              aria-label={s.alt}
              onClick={() => setActive(i)}
            >
              <Image src={s.src} alt="" fill sizes="104px" />
            </button>
          ))}
        </div>
      )}
    </article>
  );
}
