"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/mdx";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.slug ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <p className="eyebrow mb-4">On this page</p>
      <ul className="flex flex-col gap-2 border-l border-border">
        {headings.map((h) => (
          <li key={h.slug} style={{ paddingLeft: h.depth === 3 ? "1.5rem" : "1rem" }}>
            <a
              href={`#${h.slug}`}
              className={`block border-l -ml-px py-1 pl-3 text-sm transition-colors ${
                activeId === h.slug
                  ? "border-accent text-accent"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
