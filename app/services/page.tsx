import type { Metadata } from "next";
import ServicesPageClient from "./services-client";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Fixed-price web design and frontend development services — landing pages, business sites, dashboards, and performance optimization.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
