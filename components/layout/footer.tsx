import Link from "next/link";
import { navLinks, socialLinks } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="container-content grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-heading text-lg font-semibold text-text-primary">
            DBM<span className="text-accent">.</span>Studio
          </Link>
          <p className="max-w-xs text-sm text-text-secondary">
            Design. Develop. Deliver. A studio of one, building premium web
            experiences for founders and teams who care about the details.
          </p>
        </div>

        <nav aria-label="Site" className="flex flex-col gap-3">
          <span className="eyebrow mb-1">Site</span>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Resources" className="flex flex-col gap-3">
          <span className="eyebrow mb-1">Resources</span>
          <Link href="/contact" className="text-sm text-text-secondary hover:text-text-primary">
            Contact
          </Link>
          <Link href="/cv.pdf" className="text-sm text-text-secondary hover:text-text-primary">
            Download CV
          </Link>
          <Link href="/shop" className="text-sm text-text-secondary hover:text-text-primary">
            Templates &amp; source code
          </Link>
        </nav>

        <nav aria-label="Social" className="flex flex-col gap-3">
          <span className="eyebrow mb-1">Elsewhere</span>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="container-content flex flex-col-reverse items-center justify-between gap-4 py-6 text-xs text-text-secondary md:flex-row">
          <p>© {year} DBM Studio. All rights reserved.</p>
          <p className="font-mono">Built with Next.js, Tailwind, and too much coffee.</p>
        </div>
      </div>
    </footer>
  );
}
