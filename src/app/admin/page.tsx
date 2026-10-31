import type { Metadata } from "next";
import { isAdmin } from "@/lib/admin";
import { serverDb } from "@/lib/supabase";
import AdminLogin from "./AdminLogin";
import { LogoutButton } from "./AdminControls";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

type Message = { id: string; name: string; contact: string; message: string; created_at: string };

export default async function Admin() {
  if (!isAdmin()) return <AdminLogin />;
  const db = serverDb();
  if (!db) return <section className="wrap py-20">Supabase is not connected. Add your keys to the environment variables.</section>;

  const { data: messages, error } = await db.from("messages").select("*").order("created_at", { ascending: false }).limit(200);
  if (error) return <section className="wrap py-20">Could not load messages. Please try again later.</section>;
  const list = (messages ?? []) as Message[];

  return (
    <section className="wrap py-14">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-semibold tracking-tight">Messages</h1>
        <LogoutButton />
      </div>
      <div className="mt-8 space-y-4">
        {list.length === 0 && <p className="text-mute">No messages yet.</p>}
        {list.map((message) => (
          <article key={message.id} className="rounded-xl border border-navy-line bg-navy-2 p-5 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-semibold">{message.name} · {message.contact}</p>
              <p className="text-xs text-mute">{new Date(message.created_at).toLocaleString("en-GB", { timeZone: "Asia/Phnom_Penh" })}</p>
            </div>
            <p className="mt-3 whitespace-pre-wrap">{message.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
