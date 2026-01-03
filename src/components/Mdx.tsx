"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

// Callout 组件 - 用于显示提示框
interface CalloutProps {
  type?: "info" | "warning" | "error" | "success";
  title?: string;
  body?: React.ReactNode;
  children?: React.ReactNode;
}

export function Callout({ type = "info", title, body, children }: CalloutProps) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500 text-blue-200",
    warning: "bg-yellow-500/10 border-yellow-500 text-yellow-200",
    error: "bg-red-500/10 border-red-500 text-red-200",
    success: "bg-green-500/10 border-green-500 text-green-200",
  };

  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    error: "❌",
    success: "✅",
  };

  return (
    <div className={`my-6 p-4 border-l-4 rounded-r-lg ${styles[type]}`}>
      {title && (
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span>{icons[type]}</span>
          {title}
        </div>
      )}
      <div className="text-sm">{body || children}</div>
    </div>
  );
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold mt-8 mb-4 scroll-mt-20" id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold mt-6 mb-3 scroll-mt-20" id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-lg font-medium mt-4 mb-2 scroll-mt-20" id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />
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
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return (
    <div className="mdx prose prose-invert max-w-none">
      <Component components={components as any} />
    </div>
  );
}
