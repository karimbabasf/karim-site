"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "numeric",
      minute: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="wrap bar">
      <span>
        <b>Karim Baba</b>
        <span className="hide-sm num"> &nbsp;San Francisco, {time ?? "--:--"}</span>
      </span>
      <nav aria-label="Sections">
        <a href="#work">Work</a>
        <a href="#about" className="hide-sm">
          About
        </a>
        <a href="#contact">Contact</a>
        <a href="/resume">Résumé</a>
      </nav>
    </header>
  );
}
