"use client";

import {
  PenTool,
  Code2,
  Rocket,
  Image as ImageIcon,
  Building2,
  LayoutDashboard,
  Gauge,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, LucideIcon> = {
  PenTool,
  Code2,
  Rocket,
  Image: ImageIcon,
  Building2,
  LayoutDashboard,
  Gauge,
  Repeat,
};

const processSteps = [
  { title: "Discovery call", description: "A 30-minute call to understand your goals, timeline, and budget." },
  { title: "Proposal & scope", description: "A fixed-price proposal with a clear scope and delivery date." },
  { title: "Design", description: "Figma files you review and approve before a line of code is written." },
  { title: "Build", description: "Weekly check-ins as the site comes together in a staging environment." },
  { title: "Launch", description: "Deployment, DNS, and a 2-week window of post-launch support." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="How I can help"
        description="Fixed-price engagements, no surprise hours. Pick what you need, or ask for a custom scope."
      />

      <section className="py-16">
        <div className="container-content grid gap-6 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Code2;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm text-text-secondary">
                    {service.description}
                  </p>
                </div>
                <ul className="flex flex-col gap-2 border-t border-border pt-4">
                  {service.deliverables.map((d) => (
                    <li key={d} className="text-xs text-text-secondary">
                      · {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-2 font-mono text-sm text-text-primary">
                  From {service.startingPrice}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border py-24">
        <div className="container-content">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            How a project runs, start to finish
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-5">
            {processSteps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-3">
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-medium text-text-primary">{step.title}</h3>
                <p className="text-sm text-text-secondary">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border py-24">
        <div className="container-content flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-lg text-balance text-3xl font-semibold text-text-primary md:text-4xl">
            Not sure which service fits?
          </h2>
          <p className="max-w-md text-text-secondary">
            Tell me what you're building on a quick call and I'll recommend a scope.
          </p>
          <Button href="/contact" showArrow>
            Book a discovery call
          </Button>
        </div>
      </section>
    </>
  );
}
