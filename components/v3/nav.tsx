"use client";

import { useEffect, useState } from "react";

function useSfTime() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "numeric",
      minute: "2-digit",
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const time = useSfTime();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="v3-nav" data-scrolled={scrolled}>
      <div className="v3-wrap v3-nav-row">
        <a href="#top" className="v3-mark">
          Karim Baba
        </a>
        <nav className="v3-nav-links" aria-label="Sections">
          <span className="v3-clock mono" aria-label="Local time in San Francisco">
            <i aria-hidden />
            SF {time ?? "--:--"}
          </span>
          <a href="#work">Work</a>
          <a href="#experience" className="hide-sm">
            Experience
          </a>
          <a href="#about" className="hide-sm">
            About
          </a>
          <a href="/resume">Résumé</a>
        </nav>
      </div>
    </header>
  );
}
