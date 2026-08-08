"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, Clock, MapPin } from "lucide-react";
import { contactFaqs, socialLinks } from "@/lib/data";
import { PageHero } from "@/components/ui/page-hero";
import { FaqAccordion } from "@/components/ui/faq-accordion";

interface FormState {
  name: string;
  email: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const initialState: FormState = { name: "", email: "", budget: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate(values: FormState): FormErrors {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (values.message.trim().length < 10)
      next.message = "Tell me a bit more — at least 10 characters.";
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setServerError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Network error — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project"
        description="Fill out the form or reach out directly — I reply within one business day."
      />

      <section className="border-b border-border py-16">
        <div className="container-content grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border bg-card p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-16 text-center">
                <CheckCircle2 className="h-10 w-10 text-accent" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-text-primary">
                  Message sent
                </h2>
                <p className="max-w-sm text-sm text-text-secondary">
                  Thanks, {form.name.split(" ")[0]}. I'll get back to you within
                  one business day at {form.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm text-text-primary">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-text-primary focus-visible:border-accent"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 text-xs text-danger">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm text-text-primary">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-text-primary focus-visible:border-accent"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-danger">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="mb-2 block text-sm text-text-primary">
                    Estimated budget
                  </label>
                  <select
                    id="budget"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-text-primary focus-visible:border-accent"
                  >
                    <option value="">Select a range</option>
                    <option value="under-2k">Under $2,000</option>
                    <option value="2k-5k">$2,000 – $5,000</option>
                    <option value="5k-10k">$5,000 – $10,000</option>
                    <option value="10k-plus">$10,000+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm text-text-primary">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-text-primary focus-visible:border-accent"
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1.5 text-xs text-danger">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-fit rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-background transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send message"}
                </button>
                {serverError && (
                  <p role="alert" className="text-sm text-danger">
                    {serverError}
                  </p>
                )}
              </form>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Email</p>
                  <a href="mailto:hello@dbmstudio.dev" className="text-sm text-text-secondary hover:text-text-primary">
                    hello@dbmstudio.dev
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Business hours</p>
                  <p className="text-sm text-text-secondary">Sun–Thu, 10:00–18:00 (GMT+6)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Based in</p>
                  <p className="text-sm text-text-secondary">Dhaka, Bangladesh — working worldwide</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 border-t border-border pt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-text-secondary hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Map showing Dhaka, Bangladesh"
                src="https://www.openstreetmap.org/export/embed.html?bbox=90.30%2C23.68%2C90.50%2C23.88&layer=mapnik"
                className="h-56 w-full grayscale"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-content max-w-2xl">
          <h2 className="text-2xl font-semibold text-text-primary">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <FaqAccordion items={contactFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
