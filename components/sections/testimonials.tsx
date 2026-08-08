"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  return (
    <section className="border-t border-border bg-bg-secondary py-24 md:py-32">
      <div className="container-content">
        <SectionHeading
          align="center"
          eyebrow="Client feedback"
          title="What people say after we ship"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-7"
            >
              <blockquote className="text-balance text-[15px] leading-relaxed text-text-primary">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <Image
                  src={t.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-secondary">
                    {t.role}, {t.company}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
