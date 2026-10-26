import { createClient } from "@supabase/supabase-js";

export type Product = {
  id: string; slug: string; name: string; kind: "clay" | "powder" | "duo"; tag: string;
  short: string; description: string; price: number; compare_at: number | null;
  hold: number; shine: number; size: string; badge: string | null; image_url: string | null; sort?: number;
};

// Used when Supabase is not connected yet, and as a safety net.
export const FALLBACK: Product[] = [
  { id: "1", slug: "oak-clay", name: "OAK Hair Clay", kind: "clay", tag: "Clay", short: "Firm hold, matte finish.",
    description: "A firm, flexible clay with a natural matte finish. No crunch and no stiffness, and you can rework it any time of day.",
    price: 8, compare_at: null, hold: 80, shine: 15, size: "7 x 7 x 3.5 cm jar", badge: null, image_url: null },
  { id: "2", slug: "oak-duo", name: "The OAK Duo", kind: "duo", tag: "Clay + powder", short: "The full routine.",
    description: "Clay for hold, powder for lift. Everything you need for a full day of style at a better price.",
    price: 12, compare_at: 14, hold: 80, shine: 10, size: "Clay jar + 25g powder", badge: "Best value", image_url: null },
  { id: "3", slug: "oak-texture-powder", name: "OAK Texture Powder", kind: "powder", tag: "Powder", short: "Instant volume, 25g.",
    description: "Lightweight powder that adds grip and volume at the roots. No residue, and it works on its own or under clay.",
    price: 6, compare_at: null, hold: 45, shine: 5, size: "25g, 4.6 x 4.6 x 12.5 cm", badge: null, image_url: null },
];

export async function getProducts(): Promise<Product[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return FALLBACK;
  try {
    const sb = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await sb.from("products").select("*").eq("active", true).order("sort");
    if (error || !data || data.length === 0) return FALLBACK;
    return data.map((p: any) => ({ ...p, price: Number(p.price), compare_at: p.compare_at == null ? null : Number(p.compare_at) }));
  } catch {
    return FALLBACK;
  }
}

export async function getProduct(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug) ?? null;
}
