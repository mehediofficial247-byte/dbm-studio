"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function ServicesPreview() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="container-content">
        <SectionHeading
          eyebrow="Services"
          title="How I can help"
          description="From a single landing page to a full product rebuild."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col gap-3 bg-background p-8 transition-colors duration-300 hover:bg-card"
            >
              <span className="font-mono text-xs text-text-secondary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold text-text-primary">
                {service.title}
              </h3>
              <p className="text-sm text-text-secondary">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/services" variant="secondary" showArrow>
            Explore all services
          </Button>
        </div>
      </div>
    </section>
  );
}
