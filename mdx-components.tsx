import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Children, isValidElement } from "react";

// Plain text of a heading, for its anchor id.
function text(node: ReactNode): string {
  return Children.toArray(node)
    .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : isValidElement<{ children?: ReactNode }>(c) ? text(c.props.children) : ""))
    .join("");
}

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

function heading(Tag: "h2" | "h3") {
  return function Heading({ children, ...rest }: ComponentPropsWithoutRef<"h2">) {
    const id = slugify(text(children));
    return (
      <Tag id={id} {...rest}>
        {children}
      </Tag>
    );
  };
}

function A({ href = "", ...rest }: ComponentPropsWithoutRef<"a">) {
  const external = /^https?:\/\//.test(href);
  return <a href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})} {...rest} />;
}

/** An image with an optional caption. Wide figures run past the text column on desktop. */
export function Figure({ src, alt, caption, wide }: { src: string; alt: string; caption?: string; wide?: boolean }) {
  return (
    <figure className={wide ? "wide" : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/** A side note, set off from the text on its own surface. */
export function Note({ children }: { children: ReactNode }) {
  return <aside className="note">{children}</aside>;
}

const components: MDXComponents = { h2: heading("h2"), h3: heading("h3"), a: A, Figure, Note };

export function useMDXComponents(): MDXComponents {
  return components;
}
