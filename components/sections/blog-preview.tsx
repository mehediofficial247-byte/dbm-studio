"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PostMeta } from "@/lib/mdx";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function BlogPreview({ posts }: { posts: PostMeta[] }) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-content">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="From the blog"
            title="Notes on design, code, and the business of freelancing"
          />
          <Button href="/blog" variant="secondary" showArrow className="shrink-0">
            Read the blog
          </Button>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
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
                <h3 className="mt-3 text-balance text-lg font-semibold leading-snug text-text-primary transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{post.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
