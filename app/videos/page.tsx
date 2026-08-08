import type { Metadata } from "next";
import VideosPageClient from "./videos-client";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Tutorials, talks, and case study walkthroughs on frontend development and design.",
};

export default function VideosPage() {
  return <VideosPageClient />;
}
