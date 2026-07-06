"use client";

import dynamic from "next/dynamic";

const MobiusDots = dynamic(() => import("@/components/mobius-dots"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

export default function MobiusPage() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <MobiusDots className="absolute inset-0" />

      {/* vignette — pulls the eye to the band, sinks the corners */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 52% at 50% 47%, transparent 52%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.35em] text-[#345c3a]/70">
        mobius://triform&nbsp;&nbsp;·&nbsp;&nbsp;live
      </p>
    </main>
  );
}
