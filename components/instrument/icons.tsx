// One drawn icon family for the instrument: 16px grid, 1.5px stroke, square
// caps, so every glyph reads as engraved by the same tool.
type Props = { className?: string };

function Glyph({ className, d }: Props & { d: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}

export const ArrowUpRight = (p: Props) => <Glyph {...p} d="M5.5 10.5 10.5 5.5M6 5.25h4.75V10" />;
export const ArrowLeft = (p: Props) => <Glyph {...p} d="M13 8H3.5M7.5 4 3.5 8l4 4" />;
export const Chevron = (p: Props) => <Glyph {...p} d="M4.5 6.5 8 10l3.5-3.5" />;
export const Copy = (p: Props) => <Glyph {...p} d="M5.75 5.75h7v7h-7zM3.25 10.25v-7h7" />;
export const Check = (p: Props) => <Glyph {...p} d="M3.5 8.5 6.5 11.5l6-7" />;
export const Sheet = (p: Props) => <Glyph {...p} d="M4 2.75h5.5L12.25 5.5v7.75H4zM6.5 8h3.5M6.5 10.75h3.5" />;
export const Download = (p: Props) => <Glyph {...p} d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />;
