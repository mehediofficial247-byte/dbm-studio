import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import { Share2 } from "lucide-react";
import { getAllPosts, getPostSlugs, getPostSource, extractHeadings } from "@/lib/mdx";
import { mdxComponents } from "@/components/blog/mdx-components";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  try {
    const { frontmatter } = getPostSource(params.slug);
    return { title: frontmatter.title, description: frontmatter.excerpt };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  let source;
  try {
    source = getPostSource(params.slug);
  } catch {
    notFound();
  }
  const { frontmatter, content, readingTime } = source!;
  const headings = extractHeadings(content);

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrism, { ignoreMissing: true }]],
      },
    },
  });

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== params.slug).slice(0, 2);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    image: frontmatter.image,
    datePublished: frontmatter.date,
    author: { "@type": "Person", name: frontmatter.author },
    publisher: { "@type": "Organization", name: "DBM Studio" },
    keywords: frontmatter.tags.join(", "),
  };

  return (
    <>
      <JsonLd data={schema} />
      <article className="pb-20 pt-40 md:pt-48">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_220px]">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: frontmatter.title, href: `/blog/${params.slug}` },
              ]}
            />
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
            >
              ← All posts
            </Link>

            <span className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-text-secondary">
              {frontmatter.category}
            </span>

            <h1 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-text-primary md:text-5xl">
              {frontmatter.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-border pb-6 text-sm text-text-secondary">
              <span>{frontmatter.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden="true">·</span>
              <span>{readingTime}</span>
              <button
                type="button"
                className="ml-auto flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:border-text-secondary"
              >
                <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                Share
              </button>
            </div>

            <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-border">
              <Image
                src={frontmatter.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 760px, 100vw"
                priority
                className="object-cover"
              />
            </div>

            <div className="mt-10 flex flex-col gap-6">{mdxContent}</div>

            <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-card px-3 py-1 text-xs text-text-secondary"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </article>

      <section className="border-t border-border py-20">
        <div className="container-content max-w-3xl">
          <h2 className="text-xl font-semibold text-text-primary">Related posts</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="eyebrow mb-1">{p.category}</p>
                  <h3 className="text-sm font-medium text-text-primary">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
