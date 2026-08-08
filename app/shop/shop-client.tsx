"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { products } from "@/lib/data";
import { PageHero } from "@/components/ui/page-hero";

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
type SortOption = "popular" | "price-asc" | "price-desc";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("popular");

  const items = useMemo(() => {
    const filtered = products.filter(
      (p) => activeCategory === "All" || p.category === activeCategory
    );
    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.reviewCount - a.reviewCount;
    });
  }, [activeCategory, sort]);

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Templates & source code"
        description="Production-ready templates, admin panels, and UI kits — the same code I use for client work, priced to buy once and ship."
      />

      <section className="py-16">
        <div className="container-content">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter products by category">
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

            <div>
              <label htmlFor="sort" className="sr-only">
                Sort products
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-full border border-border bg-card px-4 py-2.5 text-sm text-text-primary focus-visible:border-accent"
              >
                <option value="popular">Most popular</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((product, i) => (
              <motion.div
                key={product.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/shop/${product.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-text-secondary"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="eyebrow mb-1">{product.category}</p>
                    <h2 className="font-medium text-text-primary">{product.name}</h2>
                    <div className="mt-2 flex items-center gap-1 text-xs text-text-secondary">
                      <Star className="h-3.5 w-3.5 fill-warning text-warning" aria-hidden="true" />
                      {product.rating} ({product.reviewCount})
                    </div>
                    <p className="mt-3 font-mono text-lg text-text-primary">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
