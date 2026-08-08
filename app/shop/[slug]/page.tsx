import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Star, Check } from "lucide-react";
import { products } from "@/lib/data";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.gallery,
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="border-b border-border pt-40 pb-20 md:pt-48">
        <div className="container-content">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: product.name, href: `/shop/${product.slug}` },
            ]}
          />
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
          >
            ← All products
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                <Image
                  src={product.gallery[0]}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {product.gallery.slice(1).map((img, i) => (
                  <div
                    key={img}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} screenshot ${i + 2}`}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow">{product.category}</span>
              <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
                {product.name}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm text-text-secondary">
                <div className="flex items-center gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(product.rating)
                          ? "fill-warning text-warning"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span>
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <p className="mt-6 text-balance text-text-secondary">
                {product.description}
              </p>

              <p className="mt-6 font-mono text-4xl text-text-primary">
                ${product.price}
                <span className="ml-2 text-sm font-sans text-text-secondary">
                  one-time
                </span>
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-background transition-colors hover:bg-accent/90"
                >
                  Buy now
                </button>
                <button
                  type="button"
                  className="rounded-full border border-border px-6 py-3.5 text-sm font-medium text-text-primary transition-colors hover:border-text-secondary"
                >
                  Add to wishlist
                </button>
              </div>

              <div className="mt-10 border-t border-border pt-8">
                <p className="eyebrow mb-4">What's included</p>
                <ul className="flex flex-col gap-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {product.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs text-text-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container-content max-w-2xl">
          <h2 className="text-2xl font-semibold text-text-primary">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <FaqAccordion items={product.faqs} />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-content">
          <h2 className="text-2xl font-semibold text-text-primary">
            You might also like
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/shop/${p.slug}`}
                className="group block overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="eyebrow mb-1">{p.category}</p>
                  <h3 className="font-medium text-text-primary">{p.name}</h3>
                  <p className="mt-1 font-mono text-sm text-text-secondary">
                    ${p.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
