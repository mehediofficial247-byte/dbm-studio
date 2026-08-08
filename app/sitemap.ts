import type { MetadataRoute } from "next";
import { featuredProjects, products } from "@/lib/data";
import { getAllPosts } from "@/lib/mdx";

const baseUrl = "https://dbmstudio.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/videos`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = featuredProjects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/shop/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...productRoutes, ...blogRoutes];
}
