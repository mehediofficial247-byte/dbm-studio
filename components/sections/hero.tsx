"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const commandLine = "mehedi@dbm ~ » build --for=you";
const responseLines = [
  "> resolving intent...",
  "> stack: next.js, typescript, tailwind",
  "> status: ready to ship",
];

function TerminalPanel() {
  const [typed, setTyped] = useState("");
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (typed.length < commandLine.length) {
      const t = setTimeout(
        () => setTyped(commandLine.slice(0, typed.length + 1)),
        35
      );
      return () => clearTimeout(t);
    }
    if (lineIndex < responseLines.length) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 400);
      return () => clearTimeout(t);
    }
  }, [typed, lineIndex]);

  return (
    <div
      className="w-full rounded-2xl border border-border bg-card/80 p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur"
      role="img"
      aria-label="Terminal showing a build command running successfully"
    >
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
      </div>
      <p className="font-mono text-sm text-text-primary">
        {typed}
        {typed.length < commandLine.length && (
          <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-accent align-middle" />
        )}
      </p>
      <div className="mt-2 flex flex-col gap-1">
        {responseLines.slice(0, lineIndex).map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`font-mono text-sm ${
              i === responseLines.length - 1 ? "text-accent" : "text-text-secondary"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-40 md:pt-48">
      {/* ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
      />

      <div className="container-content relative grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            DBM Studio — Design. Develop. Deliver.
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-text-primary md:text-6xl lg:text-7xl"
          >
            Interfaces that feel
            <br />
            <span className="text-text-secondary">as good as they look.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-balance text-lg text-text-secondary"
          >
            I&apos;m Mehedi Hasan, a web designer and frontend developer. I
            design and build premium websites, products, and design systems
            for founders who refuse to ship something average.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/projects" showArrow>
              View my work
            </Button>
            <Button href="/contact" variant="secondary">
              Start a project
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14"
          >
            <p className="eyebrow mb-4">Trusted by teams at</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-text-secondary/70">
              {["Northwind", "Arclight", "Loop", "Pathfinder", "Vantage"].map(
                (name) => (
                  <span key={name} className="font-heading text-sm tracking-wide">
                    {name}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative"
        >
          <TerminalPanel />
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -bottom-8 -left-8 hidden w-48 rounded-xl border border-border bg-card/90 p-3 shadow-xl backdrop-blur sm:block"
          >
            <p className="font-mono text-[11px] leading-relaxed text-text-secondary">
              <span className="text-accent">const</span> ship = () =&gt;{"\n"}
              &nbsp;&nbsp;launch(<span className="text-warning">&quot;today&quot;</span>);
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
