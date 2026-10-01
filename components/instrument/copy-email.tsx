"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "./icons";

// The address on a strip of glass with a key beside it. Copy works where the
// clipboard does; where a webview blocks it, the address stays selectable.
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div className="strip">
      <span className="strip-glass">
        <span className="strip-text" aria-live="polite">
          <span key={copied ? "c" : "a"} className="strip-swap">
            {copied ? "Copied to the clipboard" : email}
          </span>
        </span>
      </span>
      <button
        type="button"
        className="key key--sm raised"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), 1800);
          } catch {
            setCopied(false);
          }
        }}
      >
        {copied ? <Check className="key-icon" /> : <Copy className="key-icon" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
