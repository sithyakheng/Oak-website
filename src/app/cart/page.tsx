import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import CartView from "./CartView";

export const metadata: Metadata = { title: "Cart" };
export const dynamic = "force-dynamic";

export default async function CartPage() {
  return <CartView products={await getProducts()} />;
}
