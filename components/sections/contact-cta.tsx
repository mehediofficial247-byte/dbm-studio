"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ContactCta() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 text-center"
        >
          <span className="eyebrow">Availability: taking new projects for Q4</span>
          <h2 className="max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight text-text-primary md:text-6xl">
            Have a project in mind?
          </h2>
          <p className="max-w-md text-balance text-text-secondary">
            Tell me what you&apos;re building. I reply to every inquiry within
            one business day.
          </p>
          <Button href="/contact" showArrow className="px-8 py-4 text-base">
            Get in touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
