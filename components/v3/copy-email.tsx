"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "./icons";

export default function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      className="v3-copy"
      data-done={done}
      aria-label={done ? "Email address copied" : "Copy email address"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setDone(true);
          clearTimeout(timer.current);
          timer.current = setTimeout(() => setDone(false), 1800);
        } catch {}
      }}
    >
      {done ? <Check /> : <Copy />}
      <span aria-hidden>{done ? "Copied" : "Copy"}</span>
    </button>
  );
}
