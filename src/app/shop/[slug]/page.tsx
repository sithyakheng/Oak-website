import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/products";
import { money } from "@/lib/config";
import ProductVisual from "@/components/ProductVisual";
import Meter from "@/components/Meter";
import OrderButton from "@/components/OrderButton";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProduct(params.slug);
  return { title: p?.name ?? "Product", description: p?.short };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const p = await getProduct(params.slug);
  if (!p) notFound();
  const others = (await getProducts()).filter((x) => x.slug !== p.slug);

  return (
    <>
      <section className="py-14">
        <div className="wrap">
          <Link href="/shop" className="text-sm text-mute hover:text-silver">Back to shop</Link>
          <div className="mt-6 grid gap-12 md:grid-cols-2">
            <div className="h-[26rem] overflow-hidden rounded-2xl border border-navy-line"><ProductVisual p={p} size="lg" /></div>
            <div>
              <p className="text-sm text-mute">{p.tag}</p>
              <h1 className="mt-1 text-4xl font-serif font-semibold tracking-tight">{p.name}</h1>
              <p className="mt-4 text-3xl font-bold">
                {money(p.price)}
                {p.compare_at && <s className="ml-3 text-lg font-normal text-mute">{money(p.compare_at)}</s>}
              </p>
              <p className="mt-5 max-w-md text-mute">{p.description}</p>
              <div className="my-7 max-w-sm"><Meter hold={p.hold} shine={p.shine} /></div>
              <div className="flex flex-wrap gap-3">
                <OrderButton product={p} />
              </div>
              <dl className="mt-8 grid max-w-sm grid-cols-2 gap-y-2 border-t border-navy-line pt-5 text-sm">
                <dt className="text-mute">Size</dt><dd>{p.size}</dd>
                <dt className="text-mute">Payment</dt><dd>Cash on delivery</dd>
                <dt className="text-mute">Delivery</dt><dd>Phnom Penh free, provinces $2</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>
      <section className="light py-16">
        <div className="wrap">
          <h2 className="mb-8 text-2xl font-serif font-semibold tracking-tight">More from OAK</h2>
          <div className="grid gap-5 md:grid-cols-2">{others.map((o) => <ProductCard key={o.id} p={o} />)}</div>
        </div>
      </section>
    </>
  );
}
