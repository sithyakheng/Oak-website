import { NextResponse } from "next/server";
import { serverDb } from "@/lib/supabase";
import { getProducts } from "@/lib/products";
import { PROVINCES, deliveryFee } from "@/lib/config";

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  const db = serverDb();
  if (!db) return NextResponse.json({ error: "Orders are not available yet. Please order on Telegram." }, { status: 503 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const name = clean(body.name, 80), phone = clean(body.phone, 30), address = clean(body.address, 300);
  const province = clean(body.province, 40), note = clean(body.note, 300);
  if (name.length < 2 || phone.replace(/\D/g, "").length < 8 || address.length < 5 || !PROVINCES.includes(province))
    return NextResponse.json({ error: "Please fill in your name, phone, province and address." }, { status: 400 });

  // Prices always come from the server, never from the browser.
  const products = await getProducts();
  const items: { slug: string; name: string; qty: number; price: number }[] = [];
  for (const it of Array.isArray(body.items) ? body.items.slice(0, 10) : []) {
    const p = products.find((x) => x.slug === it?.slug);
    const qty = Math.floor(Number(it?.qty));
    if (p && qty >= 1 && qty <= 20) items.push({ slug: p.slug, name: p.name, qty, price: p.price });
  }
  if (items.length === 0) return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });

  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const fee = deliveryFee(province);
  const total = subtotal + fee;

  const { data, error } = await db.from("orders")
    .insert({ name, phone, province, address, note: note || null, items, subtotal, delivery_fee: fee, total })
    .select("id").single();
  if (error || !data) return NextResponse.json({ error: "Could not save your order. Please try again." }, { status: 500 });

  const token = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  if (token && chat) {
    const text = `New OAK order\n${items.map((i) => `${i.name} x${i.qty}`).join("\n")}\nTotal: $${total.toFixed(2)} (COD)\n${name}, ${phone}\n${address}, ${province}${note ? `\nNote: ${note}` : ""}`;
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: chat, text }),
    }).catch(() => {});
  }
  return NextResponse.json({ id: data.id });
}
