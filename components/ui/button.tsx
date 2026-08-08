import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent/90 shadow-[0_0_0_1px_rgba(0,229,168,0.4)]",
  secondary:
    "bg-card text-text-primary border border-border hover:border-text-secondary",
  ghost: "text-text-primary hover:text-accent",
};

const base =
  "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent";

export function Button({
  variant = "primary",
  showArrow = false,
  className,
  children,
  href,
  ...props
}: ButtonBaseProps & ComponentPropsWithoutRef<"a"> & { href: string }) {
  return (
    <Link href={href} className={cn(base, variantStyles[variant], className)} {...props}>
      {children}
      {showArrow && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
