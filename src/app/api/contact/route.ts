import { NextResponse } from "next/server";
import { serverDb } from "@/lib/supabase";

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  const db = serverDb();
  if (!db) return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  const b = await req.json().catch(() => null);
  const name = clean(b?.name, 80), contact = clean(b?.contact, 80), message = clean(b?.message, 1500);
  if (!name || !contact || !message) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const { error } = await db.from("messages").insert({ name, contact, message });
  if (error) return NextResponse.json({ error: "Failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
