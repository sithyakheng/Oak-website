import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return NextResponse.json({ supabase: false, products: 0 });

  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { count, error } = await supabase
      .from("products")
      .select("id", { count: "exact", head: true });

    return NextResponse.json({
      supabase: !error,
      products: error ? 0 : count ?? 0,
    });
  } catch {
    return NextResponse.json({ supabase: false, products: 0 });
  }
}
