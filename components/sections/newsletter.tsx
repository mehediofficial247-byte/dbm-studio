"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("submitted");
    } catch {
      setError("Network error — check your connection and try again.");
      setStatus("idle");
    }
  }

  return (
    <section className="border-t border-border py-24">
      <div className="container-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card px-8 py-16 text-center"
        >
          <span className="eyebrow">Stay in the loop</span>
          <h2 className="max-w-lg text-balance text-3xl font-semibold text-text-primary md:text-4xl">
            One email a month. Design notes, new templates, no fluff.
          </h2>

          {status === "submitted" ? (
            <p className="flex items-center gap-2 text-accent">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              Subscribed — check your inbox to confirm.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
              noValidate
            >
              <div className="flex-1 text-left">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={!!error}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm text-text-primary placeholder:text-text-secondary/60 focus-visible:border-accent"
                />
                {error && (
                  <p id="newsletter-error" className="mt-2 text-xs text-danger">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Subscribing..." : "Subscribe"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
