import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";

const baseUrl = "https://dbmstudio.dev";

export interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${baseUrl}${item.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-text-secondary">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="text-text-primary">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-text-primary">
                    {item.label}
                  </Link>
                )}
                {!isLast && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
