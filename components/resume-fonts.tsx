"use client";

import { useEffect, useState } from "react";

// Font prototype for the résumé body, shown only with ?fonts in the URL.
// The name stays in Cormorant; everything else switches. Keys 1 to 5 switch it.
const FONTS = ["Geist", "Manrope", "Inter", "DM Sans", "Plus Jakarta Sans"];

export default function ResumeFonts() {
  const [font, setFont] = useState(0);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    if (!q.has("fonts")) return;
    setFont(Number(q.get("fonts")) || 1);
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= FONTS.length) setFont(n);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".resumePage");
    if (!page) return;
    if (font) page.dataset.font = String(font);
    else delete page.dataset.font;
  }, [font]);

  if (!font) return null;
  return (
    <div className="resumeFonts" role="group" aria-label="Font prototype">
      {FONTS.map((name, i) => (
        <button key={name} type="button" aria-pressed={font === i + 1} onClick={() => setFont(i + 1)}>
          {i + 1} {name}
        </button>
      ))}
    </div>
  );
}
