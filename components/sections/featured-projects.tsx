"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function FeaturedProjects() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-content">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects I'm proud to put my name on"
            description="A handful of recent builds spanning SaaS dashboards, e-commerce, and agency sites."
          />
          <Button href="/projects" variant="secondary" showArrow className="shrink-0">
            View all work
          </Button>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-text-secondary"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Cover image for ${project.title}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <p className="eyebrow mb-2">
                      {project.category} · {project.year}
                    </p>
                    <h3 className="text-xl font-semibold text-text-primary">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-text-secondary">
                      {project.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 shrink-0 text-text-secondary transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
