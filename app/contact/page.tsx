import type { Metadata } from "next";
import ContactPageClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about your next project — DBM Studio replies within one business day.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
