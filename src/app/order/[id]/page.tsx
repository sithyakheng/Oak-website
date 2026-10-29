import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serverDb } from "@/lib/supabase";
import { TELEGRAM, money } from "@/lib/config";

export const metadata: Metadata = { title: "Order placed", robots: { index: false } };
export const dynamic = "force-dynamic";

const uuid = /^[0-9a-f-]{36}$/i;

export default async function OrderPage({ params }: { params: { id: string } }) {
  const db = serverDb();
  if (!db || !uuid.test(params.id)) notFound();
  const { data: o } = await db.from("orders").select("*").eq("id", params.id).single();
  if (!o) notFound();

  return (
    <section className="wrap max-w-2xl py-20">
      <h1 className="text-4xl font-serif font-semibold tracking-tight">Thank you, {o.name}.</h1>
      <p className="mt-3 text-mute">Your order is in. We’ll contact you on {o.phone} to confirm it before it ships. Pay cash when it arrives.</p>
      <div className="mt-10 rounded-xl border border-navy-line bg-navy-2 p-6 text-sm">
        <p className="mb-4 text-xs text-mute">Order {o.id.slice(0, 8)} · Status: {o.status}</p>
        <ul className="space-y-2">
          {(o.items as { name: string; qty: number; price: number }[]).map((i) => (
            <li key={i.name} className="flex justify-between"><span>{i.name} × {i.qty}</span><span>{money(i.price * i.qty)}</span></li>
          ))}
        </ul>
        <div className="mt-4 space-y-2 border-t border-navy-line pt-4">
          <div className="flex justify-between"><span className="text-mute">Delivery</span><span>{Number(o.delivery_fee) === 0 ? "Free" : money(o.delivery_fee)}</span></div>
          <div className="flex justify-between text-base font-bold"><span>Total</span><span>{money(o.total)}</span></div>
        </div>
        <p className="mt-5 text-mute">Deliver to: {o.address}, {o.province}</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a className="btn" href={`https://t.me/${TELEGRAM}`} target="_blank" rel="noreferrer">Message us on Telegram</a>
        <Link href="/shop" className="btn-ghost">Keep shopping</Link>
      </div>
    </section>
  );
}
