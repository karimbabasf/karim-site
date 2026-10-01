"use client";

import { useEffect, useRef } from "react";

// The one light over the instrument. With a mouse it follows the pointer: x
// swings its azimuth, y lowers or raises it, and a soft specular spot rides
// under the cursor. On touch it travels with the scroll instead. It writes
// --ax/--ay (toward the light), --sx/--sy (the way shade falls) and --la (a
// gradient angle pointing away from it) onto the face; CSS does the rest.
// Reduced motion leaves the light where the stylesheet put it, top left.
export function Light() {
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spot.current;
    const face = el?.parentElement?.parentElement;
    if (!el || !face) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const target = { az: -28, el: 0.3, x: window.innerWidth * 0.2, y: window.innerHeight * 0.1 };
    const cur = { ...target };
    let raf = 0;
    let last = 0;

    const write = () => {
      const rad = (cur.az * Math.PI) / 180;
      const ax = Math.sin(rad);
      const ay = -Math.cos(rad);
      const len = 0.75 + cur.el * 0.6;
      const s = face.style;
      s.setProperty("--ax", ax.toFixed(3));
      s.setProperty("--ay", ay.toFixed(3));
      s.setProperty("--sx", (-ax * len).toFixed(3));
      s.setProperty("--sy", (-ay * len).toFixed(3));
      s.setProperty("--la", (cur.az + 180).toFixed(1));
      s.setProperty("--px", `${cur.x.toFixed(1)}px`);
      s.setProperty("--py", `${cur.y.toFixed(1)}px`);
      el.style.transform = `translate3d(${cur.x.toFixed(1)}px, ${cur.y.toFixed(1)}px, 0)`;
    };

    const step = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      const k = 1 - Math.exp(-dt / 140);
      let moving = false;
      for (const key of ["az", "el", "x", "y"] as const) {
        const d = target[key] - cur[key];
        cur[key] += d * k;
        if (Math.abs(d) > (key === "x" || key === "y" ? 0.5 : 0.02)) moving = true;
      }
      write();
      raf = moving ? requestAnimationFrame(step) : 0;
      if (!moving) last = 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };

    const onPointer = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      target.az = -62 + (e.clientX / w) * 124;
      target.el = Math.min(1, Math.max(0, e.clientY / h));
      target.x = e.clientX;
      target.y = e.clientY;
      kick();
    };

    // When the pointer leaves the window the light settles back where it rests.
    const rest = { ...target };
    const onLeave = () => {
      Object.assign(target, rest);
      kick();
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      target.az = -40 + p * 80;
      target.el = 0.25 + p * 0.5;
      kick();
    };

    if (mouse) {
      face.dataset.light = "pointer";
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
    write();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      delete face.dataset.light;
    };
  }, []);

  return (
    <div className="sheen" aria-hidden>
      <div className="sheen-spot" ref={spot} />
    </div>
  );
}
