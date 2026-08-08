import type { Metadata } from "next";
import AboutPageClient from "./about-client";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Mehedi Hasan, the web designer and frontend developer behind DBM Studio — background, experience, and how projects run.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
