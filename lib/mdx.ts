import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  image: string;
  author: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

export interface PostSource {
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostSource(slug: string): PostSource {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  const stats = readingTime(content);
  return {
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: stats.text,
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const { frontmatter, readingTime: rt } = getPostSource(slug);
      return { slug, ...frontmatter, readingTime: rt };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export interface Heading {
  depth: number;
  text: string;
  slug: string;
}

/** Deterministic slug generator shared between heading extraction and rendering. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Pulls ## and ### headings out of raw MDX for a table of contents. */
export function extractHeadings(content: string): Heading[] {
  const lines = content.split("\n");
  const headings: Heading[] = [];
  const seen = new Map<string, number>();

  for (const line of lines) {
    const match = /^(##|###)\s+(.*)$/.exec(line.trim());
    if (!match) continue;
    const depth = match[1].length;
    const text = match[2].replace(/[`*_]/g, "").trim();
    let slug = slugify(text);
    const count = seen.get(slug) ?? 0;
    seen.set(slug, count + 1);
    if (count > 0) slug = `${slug}-${count}`;
    headings.push({ depth, text, slug });
  }

  return headings;
}
