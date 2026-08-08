"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";

export function Stats() {
  return (
    <section className="border-y border-border bg-bg-secondary py-16">
      <div className="container-content grid grid-cols-2 gap-10 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col gap-1"
          >
            <span className="font-heading text-4xl font-semibold text-text-primary md:text-5xl">
              {stat.value}
            </span>
            <span className="text-sm text-text-secondary">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
