"use client";

import { motion } from "framer-motion";
import { skills, techStack } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

export function Skills() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="container-content grid gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading
            eyebrow="Capabilities"
            title="Where I spend most of my time"
          />
          <div className="mt-10 flex flex-col gap-6">
            {skills.map((skill, i) => (
              <div key={skill.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-text-primary">{skill.name}</span>
                  <span className="font-mono text-xs text-text-secondary">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }}
                    className="h-full rounded-full bg-accent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10">
          <SectionHeading eyebrow="Toolbox" title="The stack behind every build" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {techStack.map((tool, i) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex items-center justify-center rounded-xl border border-border bg-card px-4 py-5 text-center text-sm text-text-secondary transition-colors hover:border-accent/50 hover:text-text-primary"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
