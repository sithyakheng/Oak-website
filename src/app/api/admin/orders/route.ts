import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { serverDb } from "@/lib/supabase";

const STATUSES = ["new", "confirmed", "shipped", "delivered", "cancelled"];

export async function PATCH(req: Request) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = serverDb();
  const b = await req.json().catch(() => null);
  if (!db || !b?.id || !STATUSES.includes(b.status)) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  const { error } = await db.from("orders").update({ status: b.status }).eq("id", b.id);
  return error ? NextResponse.json({ error: "Failed" }, { status: 500 }) : NextResponse.json({ ok: true });
}
