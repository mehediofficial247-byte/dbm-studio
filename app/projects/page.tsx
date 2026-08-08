import type { Metadata } from "next";
import ProjectsPageClient from "./projects-client";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies from six years of building for founders, agencies, and product teams — SaaS dashboards, e-commerce, and marketing sites.",
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
