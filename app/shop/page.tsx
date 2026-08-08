import type { Metadata } from "next";
import ShopPageClient from "./shop-client";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Premium website templates, admin panels, and UI kits — production-ready code, priced to buy once and ship.",
};

export default function ShopPage() {
  return <ShopPageClient />;
}
