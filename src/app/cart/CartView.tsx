"use client";
import Link from "next/link";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/config";
import ProductVisual from "@/components/ProductVisual";

export default function CartView({ products }: { products: Product[] }) {
  const { lines, setQty, remove, ready } = useCart();
  const rows = lines.map((l) => ({ ...l, p: products.find((p) => p.slug === l.slug) })).filter((r) => r.p) as { slug: string; qty: number; p: Product }[];
  const subtotal = rows.reduce((n, r) => n + r.p.price * r.qty, 0);

  if (!ready) return <section className="wrap min-h-[60vh] py-16" />;
  if (rows.length === 0)
    return (
      <section className="wrap min-h-[60vh] py-24 text-center">
        <h1 className="text-4xl font-serif font-semibold tracking-tight">Your cart is empty</h1>
        <p className="mt-3 text-mute">Add the clay or the powder to get started.</p>
        <Link href="/shop" className="btn mt-8">Go to shop</Link>
      </section>
    );

  return (
    <section className="wrap min-h-[60vh] py-16">
      <h1 className="text-4xl font-serif font-semibold tracking-tight">Your cart</h1>
      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_340px]">
        <ul className="space-y-4">
          {rows.map(({ p, qty }) => (
            <li key={p.slug} className="flex gap-4 rounded-xl border border-navy-line bg-navy-2 p-4">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg"><ProductVisual p={p} /></div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-3">
                  <Link href={`/shop/${p.slug}`} className="font-semibold hover:underline">{p.name}</Link>
                  <span className="font-semibold">{money(p.price * qty)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-navy-line">
                    <button className="px-4 py-1.5" aria-label="Less" onClick={() => setQty(p.slug, qty - 1)}>−</button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button className="px-4 py-1.5" aria-label="More" onClick={() => setQty(p.slug, qty + 1)}>+</button>
                  </div>
                  <button className="text-xs text-mute underline hover:text-silver" onClick={() => remove(p.slug)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="h-fit rounded-xl border border-navy-line bg-navy-2 p-6">
          <div className="flex justify-between"><span className="text-mute">Subtotal</span><strong>{money(subtotal)}</strong></div>
          <p className="mt-2 text-xs text-mute">Delivery is calculated at checkout. Phnom Penh is free.</p>
          <Link href="/checkout" className="btn mt-6 w-full">Checkout</Link>
        </aside>
      </div>
    </section>
  );
}
