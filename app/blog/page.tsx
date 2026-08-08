import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import BlogPageClient from "./blog-client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on design, frontend engineering, and freelancing from Mehedi Hasan.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogPageClient posts={posts} />;
}
