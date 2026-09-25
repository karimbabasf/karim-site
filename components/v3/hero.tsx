"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { intro, contact } from "@/lib/content";

const ease = [0.23, 1, 0.32, 1] as const;

function Words({ text, delay, className }: { text: string; delay: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          className="w"
          initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease, delay: delay + i * 0.045 }}
        >
          {w}
          {" "}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 900], [0, 140]);
  const bgO = useTransform(scrollY, [0, 700], [1, 0.2]);
  const fade = (d: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease, delay: d },
        };

  return (
    <section className="v3-hero" id="top">
      <motion.div className="v3-hero-bg" style={reduce ? undefined : { y: bgY, opacity: bgO }} aria-hidden>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero/swell-poster.jpg"
        >
          <source src="/hero/swell.webm" type="video/webm" />
          <source src="/hero/swell.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="v3-wrap" style={{ width: "100%" }}>
        <div className="v3-hero-grid">
          <div>
            <h1 className="v3-h1">
              <Words text={intro.headline[0]} delay={0.1} />
              <br />
              <Words text={intro.headline[1]} delay={0.45} className="l2" />
            </h1>
            <motion.p className="v3-lede" {...fade(0.9)}>
              {intro.lede}
            </motion.p>
            <motion.div className="v3-cta" {...fade(1.05)}>
              <a className="btn btn-primary" href="#work">
                See the work
                <ArrowDownRight weight="bold" />
              </a>
              <a className="btn btn-ghost" href={`mailto:${contact.email}`}>
                <EnvelopeSimple weight="regular" />
                Get in touch
              </a>
            </motion.div>
          </div>

          <motion.figure
            className="v3-portrait"
            style={{ margin: 0 }}
            initial={reduce ? false : { opacity: 0, clipPath: "inset(18% 12% 18% 12% round 28px)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 28px)" }}
            transition={{ duration: 1.3, ease, delay: 0.3 }}
          >
            <Image
              src="/work/portrait.jpg"
              alt="Karim Baba"
              fill
              priority
              sizes="(min-width: 960px) 340px, 280px"
            />
            <figcaption>
              <b>Karim Baba</b>
              <span className="mono">{intro.location}</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
