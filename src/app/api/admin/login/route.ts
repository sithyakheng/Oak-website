import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken } from "@/lib/admin";

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!process.env.ADMIN_PASSWORD || b?.password !== process.env.ADMIN_PASSWORD)
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, adminToken(), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 14 });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
