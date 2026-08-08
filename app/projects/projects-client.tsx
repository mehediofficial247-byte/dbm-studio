"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { featuredProjects } from "@/lib/data";
import { PageHero } from "@/components/ui/page-hero";

const categories = ["All", ...Array.from(new Set(featuredProjects.map((p) => p.category)))];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return featuredProjects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const matchesQuery = project.title
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Projects"
        description="Case studies from six years of building for founders, agencies, and product teams."
      />

      <section className="py-16">
        <div className="container-content">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                    activeCategory === category
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full max-w-xs">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
                aria-hidden="true"
              />
              <label htmlFor="project-search" className="sr-only">
                Search projects
              </label>
              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-full border border-border bg-card py-2.5 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-secondary/60 focus-visible:border-accent"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-text-secondary">
              No projects match &ldquo;{query}&rdquo; in {activeCategory}. Try a
              different search or category.
            </p>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
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
                    </div>
                    <div className="flex items-start justify-between gap-4 p-6">
                      <div>
                        <p className="eyebrow mb-2">
                          {project.category} · {project.year}
                        </p>
                        <h2 className="text-xl font-semibold text-text-primary">
                          {project.title}
                        </h2>
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
          )}
        </div>
      </section>
    </>
  );
}
