"use client";

import { MobiusDotShader } from "@/components/r3f-craft/mobius-dot-shader";

/**
 * Backward-compatible entry for the legacy `/mobius` route.
 * The live implementation now lives under `components/r3f-craft` so the same
 * shader can power the hero, the fullscreen `/r3f-craft` preview, and older links.
 */
export default function MobiusDots({ className = "absolute inset-0" }: { className?: string }) {
  return <MobiusDotShader variant="fullscreen" className={className} />;
}
