"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { videos } from "@/lib/data";
import { PageHero } from "@/components/ui/page-hero";

const categories = ["All", ...Array.from(new Set(videos.map((v) => v.category)))];

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[number] | null>(null);

  const filtered = useMemo(
    () => videos.filter((v) => activeCategory === "All" || v.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <PageHero
        eyebrow="Videos"
        title="Tutorials, talks, and case study walkthroughs"
        description="Screen recordings of how I actually build — no jump cuts hiding the messy parts."
      />

      <section className="py-16">
        <div className="container-content">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter videos by category">
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

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((video, i) => (
              <motion.button
                key={video.id}
                type="button"
                onClick={() => setActiveVideo(video)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group text-left"
                aria-label={`Play video: ${video.title}`}
              >
                <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
                  <Image
                    src={video.thumbnail}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-background">
                      <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 rounded bg-background/80 px-1.5 py-0.5 font-mono text-xs text-text-primary">
                    {video.duration}
                  </span>
                </div>
                <h2 className="mt-3 text-balance text-sm font-medium leading-snug text-text-primary group-hover:text-accent">
                  {video.title}
                </h2>
                <p className="mt-1 text-xs text-text-secondary">
                  {video.category} · {video.views} views
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-6 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
              className="absolute -top-12 right-0 rounded-full border border-border p-2 text-text-primary"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="aspect-video overflow-hidden rounded-xl border border-border">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
