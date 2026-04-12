"use client";

/* eslint-disable react-hooks/static-components */

import type { MDXComponents } from "mdx/types";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { Children, isValidElement } from "react";
import { Callout } from "./Callout";

function extractText(children: React.ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }

      if (isValidElement(child)) {
        const element = child as React.ReactElement<{
          children?: React.ReactNode;
        }>;
        return extractText(element.props.children);
      }

      return "";
    })
    .join(" ");
}

function slugifyHeading(children: React.ReactNode) {
  return extractText(children)
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

const baseComponents: MDXComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-semibold mt-8 mb-4 scroll-mt-20"
      id={props.id ?? slugifyHeading(props.children)}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-semibold mt-6 mb-3 scroll-mt-20"
      id={props.id ?? slugifyHeading(props.children)}
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-lg font-medium mt-4 mb-2 scroll-mt-20"
      id={props.id ?? slugifyHeading(props.children)}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 leading-7" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 ml-6 list-disc space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 ml-6 list-decimal space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="my-6 p-4 bg-muted/50 rounded-lg overflow-x-auto" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary hover:underline" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-border px-4 py-2 text-left font-semibold bg-muted/50" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-4 py-2" {...props} />
  ),
  hr: () => <hr className="my-8 border-border" />,
  Callout,
} as const;

interface MdxProps {
  code: string;
  components?: MDXComponents;
}

export function Mdx({ code, components }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx prose max-w-none prose-headings:text-foreground prose-p:text-foreground/95 prose-strong:text-foreground prose-li:text-foreground/95 prose-code:text-foreground prose-pre:border prose-pre:border-border/60 prose-blockquote:border-primary prose-a:text-primary">
      <Component components={{ ...baseComponents, ...components }} />
    </div>
  );
}
