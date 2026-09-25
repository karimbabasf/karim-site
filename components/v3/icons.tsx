// Phosphor icon paths (MIT), inlined so the homepage ships no icon library.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ d, ...props }: IconProps & { d: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d={d} />
    </svg>
  );
}

export const Plus = (p: IconProps) => (
  <Icon
    {...p}
    d="M222,128a6,6,0,0,1-6,6H134v82a6,6,0,0,1-12,0V134H40a6,6,0,0,1,0-12h82V40a6,6,0,0,1,12,0v82h82A6,6,0,0,1,222,128Z"
  />
);

export const ArrowUpRight = (p: IconProps) => (
  <Icon
    {...p}
    d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"
  />
);

export const ArrowDown = (p: IconProps) => (
  <Icon
    {...p}
    d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"
  />
);

export const Copy = (p: IconProps) => (
  <Icon
    {...p}
    d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"
  />
);

export const Check = (p: IconProps) => (
  <Icon
    {...p}
    d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
  />
);
