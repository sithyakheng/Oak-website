import type { Metadata } from "next";
import { isAdmin } from "@/lib/admin";
import { serverDb } from "@/lib/supabase";
import { money } from "@/lib/config";
import AdminLogin from "./AdminLogin";
import { LogoutButton, StatusSelect } from "./AdminControls";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

type Order = { id: string; name: string; phone: string; province: string; address: string; note: string | null; items: { name: string; qty: number }[]; total: number; status: string; created_at: string };

export default async function Admin() {
  if (!isAdmin()) return <AdminLogin />;
  const db = serverDb();
  if (!db) return <section className="wrap py-20">Supabase is not connected. Add your keys to the environment variables.</section>;

  const [{ data: orders }, { data: messages }] = await Promise.all([
    db.from("orders").select("*").order("created_at", { ascending: false }).limit(200),
    db.from("messages").select("*").order("created_at", { ascending: false }).limit(50),
  ]);
  const list = (orders ?? []) as Order[];
  const revenue = list.filter((o) => o.status !== "cancelled").reduce((n, o) => n + Number(o.total), 0);

  return (
    <section className="wrap py-14">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Orders</h1>
        <LogoutButton />
      </div>
      <p className="mt-2 text-sm text-mute">{list.length} orders · {money(revenue)} total (not cancelled)</p>

      <div className="mt-8 space-y-4">
        {list.length === 0 && <p className="text-mute">No orders yet.</p>}
        {list.map((o) => (
          <article key={o.id} className="rounded-xl border border-navy-line bg-navy-2 p-5 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{o.name} · <a className="underline" href={`tel:${o.phone}`}>{o.phone}</a></p>
                <p className="text-xs text-mute">{new Date(o.created_at).toLocaleString("en-GB", { timeZone: "Asia/Phnom_Penh" })} · {o.id.slice(0, 8)}</p>
              </div>
              <StatusSelect id={o.id} status={o.status} />
            </div>
            <p className="mt-3">{o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</p>
            <p className="mt-1 text-mute">{o.address}, {o.province}{o.note ? ` · Note: ${o.note}` : ""}</p>
            <p className="mt-2 font-bold">{money(o.total)} · cash on delivery</p>
          </article>
        ))}
      </div>

      <h2 className="mb-4 mt-14 text-2xl font-extrabold">Messages</h2>
      <div className="space-y-3">
        {(messages ?? []).length === 0 && <p className="text-mute">No messages yet.</p>}
        {(messages ?? []).map((m: any) => (
          <article key={m.id} className="rounded-xl border border-navy-line p-4 text-sm">
            <p className="font-semibold">{m.name} · {m.contact}</p>
            <p className="mt-1 text-mute">{m.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
