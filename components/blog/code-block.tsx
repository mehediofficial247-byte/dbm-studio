"use client";

import { useRef } from "react";
import { CopyCodeButton } from "./copy-code-button";

export function CodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const ref = useRef<HTMLPreElement>(null);

  return (
    <div className="group relative">
      <pre
        ref={ref}
        {...props}
        className="overflow-x-auto rounded-xl border border-border bg-[#0d0d0d] p-5 font-mono text-[13px] leading-relaxed"
      >
        {children}
      </pre>
      <CopyCodeButton targetRef={ref} />
    </div>
  );
}
