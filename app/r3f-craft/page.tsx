import Link from "next/link";
import { MobiusDotShader } from "@/components/r3f-craft/mobius-dot-shader";

export default function R3fCraftPage() {
  return (
    <main className="relative isolate flex min-h-svh overflow-hidden bg-black text-foreground">
      <MobiusDotShader variant="fullscreen" className="absolute inset-0" label />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,transparent_0,transparent_34%,rgba(0,0,0,0.38)_66%,rgba(0,0,0,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/72 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/78 to-transparent" />

      <section className="relative z-10 flex min-h-svh w-full flex-col justify-between px-5 py-5 sm:px-8 sm:py-7">
        <header className="flex items-center justify-between gap-4 font-mono text-xs text-neon/60">
          <Link
            href="/"
            className="pointer-events-auto rounded-sm text-dim transition-colors duration-200 hover:text-neon focus-visible:text-neon"
          >
            ← home
          </Link>
          <p className="hidden text-right sm:block">/r3f-craft · live shader component</p>
        </header>

        <div className="max-w-[24rem] pb-8 font-mono sm:pb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-neon/45">mobius_dot_field</p>
          <h1 className="mt-3 text-2xl leading-tight tracking-[-0.025em] text-foreground sm:text-4xl">
            Three-edge Möbius in terminal-green dust.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-dim">
            10,800 live shader points, dulled into black with three brighter rails and a slow vertical rotation.
          </p>
        </div>
      </section>
    </main>
  );
}
