import Image from "next/image";
import SiteShell from "@/components/site-shell";
import { Prompt } from "@/components/terminal";
import { MobiusViewport, MobiusManualMobile } from "@/components/mobius";
import ProjectsAccordion from "@/components/projects-accordion";
import HackerNews from "@/components/hacker-news";
import Socials from "@/components/socials";
import { profile } from "@/lib/site";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <SiteShell>
      {/* ── Hero ─────────────────────────────────────────────
          Desktop: intro on the left, Möbius viewport to the side (right column).
          Mobile: a compact Möbius (true 3:4 shape) + manual sits right under
          the contact buttons. */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-6 pt-28 sm:pb-24 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:pt-36">
        <div>
          <Prompt command="whoami" />
          <h1 className="mt-6 text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
            {profile.name}
            <span className="caret ml-1" aria-hidden />
          </h1>
          <p className="mt-3 font-mono text-lg sm:text-xl">
            <span className="text-foreground">{profile.title}</span>
            <span className="text-dim">
              {" · "}
              {profile.titleTag.split(profile.titleTagOrg)[0]}
              <a
                href={profile.titleTagHref}
                target="_blank"
                rel="noreferrer noopener"
                className="text-dim no-underline transition-colors duration-200 hover:text-foreground/70"
              >
                {profile.titleTagOrg}
              </a>
            </span>
          </p>
          <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-dim">
            {profile.tagline}{" "}
            <span className="font-medium text-neon">{profile.taglineAccent}</span>
          </p>

          <Socials className="mt-8" />

          {/* Mobile: the Möbius in its true shape + the manual, right under the contacts */}
          <MobiusManualMobile className="mt-12 mx-auto w-full max-w-sm lg:hidden" />
        </div>

        {/* Desktop: the Möbius viewport sits to the side (right column) */}
        <MobiusViewport className="hidden w-full lg:block" />
      </section>

      {/* ── About ───────────────────────────────────────────── */}
      <section id="summary" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-16 pt-6 sm:pt-16">
        <Prompt command="cat about.md" />
        <div className="mt-8 grid gap-14 md:grid-cols-[1fr_15rem] md:gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="flex max-w-[60ch] flex-col gap-5">
            {profile.summary.map((para, i) => (
              <p
                key={i}
                className="font-sans text-base leading-relaxed text-foreground/90 text-pretty sm:text-lg"
              >
                {para}
              </p>
            ))}
          </div>
          <div className="flex w-full flex-col gap-6 sm:max-w-[20rem] md:max-w-[15rem] lg:mx-auto lg:max-w-[17rem]">
            {/* framed portrait: padded neon trace, soft rounded corners */}
            <div className="rounded-2xl border border-neon/45 bg-white/[0.02] p-2 shadow-[0_0_35px_color-mix(in_srgb,var(--neon)_13%,transparent)]">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <Image
                  src="/karim.jpg"
                  alt="Karim Baba"
                  fill
                  priority
                  sizes="(min-width: 768px) 240px, (min-width: 640px) 320px, 92vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 font-mono text-sm md:grid-cols-1">
              {profile.facts.map((f) => (
                <div key={f.key} className="flex flex-col gap-1">
                  <dt className="text-dim">{f.key}</dt>
                  <dd className="text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Projects ────────────────────────────────────────── */}
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16">
        <Prompt command="ls ~/projects" comment={`${projects.length} entries`} />
        <ProjectsAccordion projects={projects} />
      </section>

      {/* ── Hacker News ─────────────────────────────────────── */}
      <section id="hn" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16">
        <Prompt command="open news.ycombinator.com/front" comment="front page today" />
        <div className="mt-8">
          <HackerNews />
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="mx-auto max-w-6xl px-6 pb-12 pt-8">
        <div className="flex items-center justify-between border-t border-hairline pt-6 font-mono text-xs text-dim">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="flex items-center gap-2">
            built in the terminal
            <span className="caret" aria-hidden style={{ height: "0.9em" }} />
          </span>
        </div>
      </footer>
    </SiteShell>
  );
}
