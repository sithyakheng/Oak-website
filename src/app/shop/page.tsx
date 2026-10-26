import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = { title: "Shop" };
export const revalidate = 60;

export default async function Shop() {
  const products = await getProducts();
  return (
    <section className="light min-h-[70vh] py-16">
      <div className="wrap">
        <h1 className="text-4xl font-extrabold">Shop</h1>
        <p className="mt-2 mb-10 text-navy/65">Two essentials, or both together for less.</p>
        <div className="grid gap-5 md:grid-cols-3">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </div>
    </section>
  );
}
