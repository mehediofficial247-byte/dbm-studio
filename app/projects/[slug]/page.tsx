import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = featuredProjects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = featuredProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = featuredProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: {
      "@type": "Person",
      name: "Mehedi Hasan",
    },
    dateCreated: project.year,
    keywords: project.tech.join(", "),
    image: project.gallery[0],
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="border-b border-border pb-16 pt-40 md:pt-48">
        <div className="container-content">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.title, href: `/projects/${project.slug}` },
            ]}
          />
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
          >
            ← All projects
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <span className="eyebrow">
                {project.category} · {project.year}
              </span>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-xl text-balance text-lg text-text-secondary">
                {project.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={project.liveUrl} showArrow>
                  Visit live site
                </Button>
                <Button href={project.githubUrl} variant="secondary">
                  View code
                </Button>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-6 border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
              <div>
                <dt className="eyebrow mb-1">Client</dt>
                <dd className="text-sm text-text-primary">{project.client}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Role</dt>
                <dd className="text-sm text-text-primary">{project.role}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Duration</dt>
                <dd className="text-sm text-text-primary">{project.duration}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Stack</dt>
                <dd className="text-sm text-text-primary">{project.tech.join(", ")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-4">
        <div className="container-content">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border">
            <Image
              src={project.gallery[0]}
              alt={`Hero screenshot of ${project.title}`}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container-content grid gap-16 md:grid-cols-2">
          <div>
            <span className="eyebrow">The problem</span>
            <p className="mt-4 text-balance text-lg leading-relaxed text-text-primary">
              {project.problem}
            </p>
          </div>
          <div>
            <span className="eyebrow">The solution</span>
            <p className="mt-4 text-balance text-lg leading-relaxed text-text-primary">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container-content grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="eyebrow">Process</span>
            <ol className="mt-6 flex flex-col gap-6">
              {project.process.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-text-secondary">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <span className="eyebrow">Key features</span>
            <ul className="mt-6 flex flex-col gap-4">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container-content">
          <span className="eyebrow">Performance</span>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {project.performance.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="text-2xl font-semibold text-text-primary">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm text-text-secondary">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container-content grid gap-4 sm:grid-cols-2">
          {project.gallery.slice(1).map((img, i) => (
            <div
              key={img}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border"
            >
              <Image
                src={img}
                alt={`${project.title} screenshot ${i + 2}`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-content">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-text-primary">
              Related projects
            </h2>
            <Link
              href="/projects"
              className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary"
            >
              View all <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group block overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`Cover image for ${p.title}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="eyebrow mb-1">{p.category}</p>
                  <h3 className="font-medium text-text-primary">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
