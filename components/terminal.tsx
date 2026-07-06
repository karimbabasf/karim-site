/**
 * Shared terminal-session primitives.
 * `Prompt` renders a command line that introduces each section, so the whole
 * page reads as one continuous shell session rather than a stack of blocks.
 */

export function Prompt({
  command,
  comment,
  className = "",
}: {
  command: string;
  /** Optional trailing "# note" in dim, like a real shell comment. */
  comment?: string;
  className?: string;
}) {
  return (
    <p className={`font-mono text-sm leading-relaxed ${className}`}>
      <span className="text-neon">karim@portfolio</span>
      <span className="text-dim"> ~ %</span>{" "}
      <span className="text-foreground">{command}</span>
      {comment ? <span className="text-dim">{"  "}# {comment}</span> : null}
    </p>
  );
}

/** The macOS traffic-light dots, reused wherever a "window" is implied.
 * Pass `onGreen` to make the green (maximize) dot a real button, with the
 * classic on-hover "+" glyph. Left decorative otherwise. */
export function TrafficLights({
  className = "",
  onGreen,
}: {
  className?: string;
  onGreen?: () => void;
}) {
  if (onGreen) {
    return (
      <div className={`group flex items-center gap-2 ${className}`}>
        <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
        <button
          type="button"
          onClick={onGreen}
          aria-label="Maximize"
          className="relative grid h-[11px] w-[11px] place-items-center rounded-full border-0 bg-[#28c840] p-0 text-[7px] font-bold leading-none text-black/70"
        >
          <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            +
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`} aria-hidden>
      <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
      <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
      <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
    </div>
  );
}
