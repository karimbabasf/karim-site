// A Gem clip: four straight legs joined by a big, a medium and a small turn.
// Drawn twice, a darker wire under a lighter core, so it reads as round steel.
const WIRE = "M12 14V50A6 6 0 0 1 0 50V6A4 4 0 0 1 8 6V44A2 2 0 0 1 4 44V16";

export function Paperclip({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-2 0 16 58"
      fill="none"
      strokeLinecap="round"
      aria-hidden
      focusable="false"
    >
      <path d={WIRE} stroke="#7d8289" strokeWidth="1.9" />
      <path d={WIRE} stroke="#d6d9dd" strokeWidth="0.9" transform="translate(-0.25 -0.2)" />
    </svg>
  );
}
