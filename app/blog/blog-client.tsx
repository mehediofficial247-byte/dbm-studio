"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import type { PostMeta } from "@/lib/mdx";
import { PageHero } from "@/components/ui/page-hero";

export default function BlogPage({ posts }: { posts: PostMeta[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, posts]);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes on design, code, and freelancing"
        description="Writing on the decisions behind the work — what I'd tell a friend starting where I did."
      />

      <section className="py-16">
        <div className="container-content">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter posts by category">
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
              <label htmlFor="blog-search" className="sr-only">
                Search posts
              </label>
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full rounded-full border border-border bg-card py-2.5 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-secondary/60 focus-visible:border-accent"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-text-secondary">
              No posts match your search.
            </p>
          ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 flex items-center gap-3 text-xs text-text-secondary">
                      <span className="rounded-full border border-border px-2.5 py-1">
                        {post.category}
                      </span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h2 className="mt-3 text-balance text-lg font-semibold leading-snug text-text-primary transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-text-secondary">{post.excerpt}</p>
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
