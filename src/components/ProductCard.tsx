import Link from "next/link";
import { Product } from "@/lib/products";
import { money } from "@/lib/config";
import ProductVisual from "./ProductVisual";
import AddToCart from "./AddToCart";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-xl border bg-white text-navy ${p.badge ? "border-2 border-navy" : "border-cream-deep"}`}>
      <Link href={`/shop/${p.slug}`} className="relative block h-56">
        <ProductVisual p={p} />
        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-navy">{p.tag}</span>
        {p.badge && <span className="absolute right-3 top-3 rounded-full bg-navy px-3 py-1 text-[11px] font-semibold text-silver">{p.badge}</span>}
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <Link href={`/shop/${p.slug}`} className="font-bold hover:underline">{p.name}</Link>
        <p className="text-sm text-navy/65">{p.short}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold">
            {money(p.price)}
            {p.compare_at && <s className="ml-2 text-xs font-normal text-navy/45">{money(p.compare_at)}</s>}
          </span>
          <AddToCart slug={p.slug} className="btn-dark" />
        </div>
      </div>
    </div>
  );
}
