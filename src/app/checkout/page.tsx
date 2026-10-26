import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import CheckoutForm from "./CheckoutForm";

export const metadata: Metadata = { title: "Checkout" };
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  return <CheckoutForm products={await getProducts()} />;
}
