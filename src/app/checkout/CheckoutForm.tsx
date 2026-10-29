"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { PROVINCES, PHNOM_PENH, deliveryFee, money } from "@/lib/config";

export default function CheckoutForm({ products }: { products: Product[] }) {
  const { lines, clear, ready } = useCart();
  const router = useRouter();
  const [province, setProvince] = useState(PHNOM_PENH);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const rows = lines.map((l) => ({ ...l, p: products.find((p) => p.slug === l.slug) })).filter((r) => r.p) as { slug: string; qty: number; p: Product }[];
  const subtotal = rows.reduce((n, r) => n + r.p.price * r.qty, 0);
  const fee = deliveryFee(province);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setError("");
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: rows.map((r) => ({ slug: r.slug, qty: r.qty })),
        name: f.get("name"), phone: f.get("phone"), province, address: f.get("address"), note: f.get("note"),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { setError(data.error || "Something went wrong. Please try again."); setBusy(false); return; }
    clear();
    router.push(`/order/${data.id}`);
  }

  if (!ready) return <section className="wrap min-h-[60vh] py-16" />;
  if (rows.length === 0)
    return (
      <section className="wrap min-h-[60vh] py-24 text-center">
        <h1 className="text-4xl font-serif font-semibold tracking-tight">Nothing to check out</h1>
        <Link href="/shop" className="btn mt-8">Go to shop</Link>
      </section>
    );

  return (
    <section className="wrap py-16">
      <h1 className="text-4xl font-serif font-semibold tracking-tight">Checkout</h1>
      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="space-y-4">
          <input name="name" className="field" placeholder="Full name" required minLength={2} autoComplete="name" />
          <input name="phone" className="field" placeholder="Phone number (for delivery)" required inputMode="tel" autoComplete="tel" />
          <select value={province} onChange={(e) => setProvince(e.target.value)} className="field" aria-label="Province">
            {PROVINCES.map((p) => <option key={p}>{p}</option>)}
          </select>
          <textarea name="address" className="field" rows={3} placeholder="Address, street, village or landmark" required />
          <textarea name="note" className="field" rows={2} placeholder="Note for delivery (optional)" />
          <p className="rounded-lg border border-navy-line p-4 text-sm text-mute">Payment is cash on delivery. We’ll confirm your order by phone or Telegram before it ships.</p>
          {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
          <button className="btn w-full" disabled={busy}>{busy ? "Placing order…" : "Place order"}</button>
        </form>
        <aside className="h-fit rounded-xl border border-navy-line bg-navy-2 p-6 text-sm">
          <ul className="space-y-2">
            {rows.map((r) => <li key={r.slug} className="flex justify-between"><span>{r.p.name} × {r.qty}</span><span>{money(r.p.price * r.qty)}</span></li>)}
          </ul>
          <div className="mt-4 space-y-2 border-t border-navy-line pt-4">
            <div className="flex justify-between"><span className="text-mute">Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-mute">Delivery</span><span>{fee === 0 ? "Free" : money(fee)}</span></div>
            <div className="flex justify-between text-base font-bold"><span>Total</span><span>{money(subtotal + fee)}</span></div>
          </div>
        </aside>
      </div>
    </section>
  );
}
