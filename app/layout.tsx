import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dbmstudio.dev"),
  title: {
    default: "DBM Studio — Design. Develop. Deliver.",
    template: "%s | DBM Studio",
  },
  description:
    "DBM Studio is the personal brand of Mehedi Hasan, a web designer and frontend developer building premium websites, templates, and source code for founders and teams.",
  openGraph: {
    title: "DBM Studio — Design. Develop. Deliver.",
    description:
      "Premium web design and frontend development studio run by Mehedi Hasan.",
    url: "https://dbmstudio.dev",
    siteName: "DBM Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DBM Studio — Design. Develop. Deliver.",
    description:
      "Premium web design and frontend development studio run by Mehedi Hasan.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mehedi Hasan",
    jobTitle: "Web Designer & Frontend Developer",
    url: "https://dbmstudio.dev",
    worksFor: {
      "@type": "Organization",
      name: "DBM Studio",
    },
    sameAs: [
      "https://github.com",
      "https://linkedin.com",
      "https://x.com",
      "https://dribbble.com",
    ],
  };

  return (
    <html lang="en" className="dark">
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} font-body`}
      >
        <JsonLd data={personSchema} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
