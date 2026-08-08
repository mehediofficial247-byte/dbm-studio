"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCodeButton({ targetRef }: { targetRef: React.RefObject<HTMLPreElement> }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  async function handleCopy() {
    const text = targetRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable — fail silently
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Code copied" : "Copy code"}
      className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md border border-border bg-background/80 px-2.5 py-1.5 text-xs text-text-secondary backdrop-blur transition-colors hover:text-text-primary"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
          Copy
        </>
      )}
    </button>
  );
}
