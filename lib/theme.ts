"use client";

import { useSyncExternalStore } from "react";

/**
 * Accent theme. The site ships lime-neon ("default"); "blue" swaps the single
 * `--neon` variable (everything else — soft glow, focus ring, caret, and the
 * hue-rotate on the Möbius clips — derives from it).
 */
export type Theme = "default" | "blue";

const KEY = "karim-theme";
const EVENT = "karim-themechange";

/** Read the accent currently applied to <html> (set pre-paint in layout.tsx). */
export function getTheme(): Theme {
  if (typeof document === "undefined") return "default";
  return document.documentElement.dataset.theme === "blue" ? "blue" : "default";
}

/** Apply an accent: flips the <html> data-attribute, persists it, and notifies. */
export function setTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  if (theme === "blue") document.documentElement.dataset.theme = "blue";
  else delete document.documentElement.dataset.theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* private mode / storage disabled — the in-memory attribute still works */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function toggleTheme() {
  setTheme(getTheme() === "blue" ? "default" : "blue");
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb); // keep other tabs in sync
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/**
 * Live accent for components that can't lean on CSS alone (the R3F shader).
 * Server + first client paint report "default" so hydration matches the SSR
 * markup; the store then re-syncs to the real value the pre-paint script set.
 */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, () => "default");
}
