import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { slugify } from "@/lib/mdx";
import { CodeBlock } from "@/components/blog/code-block";

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (
    node &&
    typeof node === "object" &&
    "props" in node &&
    (node as { props?: { children?: React.ReactNode } }).props?.children
  ) {
    return getTextContent((node as { props: { children: React.ReactNode } }).props.children);
  }
  return "";
}

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => {
    const text = getTextContent(children);
    const id = slugify(text);
    return (
      <h2
        id={id}
        className="mt-12 scroll-mt-28 text-2xl font-semibold tracking-tight text-text-primary"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const text = getTextContent(children);
    const id = slugify(text);
    return (
      <h3 id={id} className="mt-8 scroll-mt-28 text-xl font-semibold text-text-primary">
        {children}
      </h3>
    );
  },
  p: ({ children }) => (
    <p className="text-balance text-[17px] leading-relaxed text-text-secondary">
      {children}
    </p>
  ),
  a: ({ href, children }) => (
    <Link
      href={href ?? "#"}
      className="text-accent underline underline-offset-4 hover:text-accent/80"
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <ul className="flex flex-col gap-2 pl-5 text-[17px] text-text-secondary marker:text-accent">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="flex flex-col gap-2 pl-5 text-[17px] text-text-secondary marker:text-accent marker:font-mono marker:text-sm">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="list-outside leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent bg-card px-6 py-4 text-text-primary">
      {children}
    </blockquote>
  ),
  pre: (props) => <CodeBlock {...props} />,
  code: ({ children, className }) => {
    // Inline code (no language className) vs. fenced code passed through from <pre><code>
    const isInline = !className;
    if (isInline) {
      return (
        <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.85em] text-accent">
          {children}
        </code>
      );
    }
    return <code className={className}>{children}</code>;
  },
  table: ({ children }) => (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-card">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-border px-4 py-3 text-left font-medium text-text-primary">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border px-4 py-3 text-text-secondary">{children}</td>
  ),
  strong: ({ children }) => <strong className="font-semibold text-text-primary">{children}</strong>,
  hr: () => <hr className="border-border" />,
};
