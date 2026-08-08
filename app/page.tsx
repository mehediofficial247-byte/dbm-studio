import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Skills } from "@/components/sections/skills";
import { ServicesPreview } from "@/components/sections/services-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Newsletter } from "@/components/sections/newsletter";
import { ContactCta } from "@/components/sections/contact-cta";
import { getAllPosts } from "@/lib/mdx";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProjects />
      <Skills />
      <ServicesPreview />
      <Testimonials />
      <BlogPreview posts={latestPosts} />
      <Newsletter />
      <ContactCta />
    </>
  );
}
