"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Signs the front card when it comes into view, once. Without JavaScript the
// signature is simply there: the strokes only hide after this has mounted.
export function SignOff({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.pen = "ready";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.pen = "write";
        io.disconnect();
      },
      { rootMargin: "0px 0px -18% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="sign-off">
      {children}
    </div>
  );
}
