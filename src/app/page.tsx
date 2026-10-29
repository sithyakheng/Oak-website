import Link from "next/link";
import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductVisual from "@/components/ProductVisual";
import Meter from "@/components/Meter";
import AddToCart from "@/components/AddToCart";
import { Leaf } from "@/components/Logo";

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();
  const clay = products.find((p) => p.kind === "clay") ?? products[0];
  const duo = products.find((p) => p.kind === "duo") ?? products[0];

  return (
    <>
      <section className="home-hero relative overflow-hidden">
        <Leaf className="pointer-events-none absolute -right-24 -top-10 h-[34rem] w-[34rem] text-oak opacity-[0.06]" stroke={1} />
        <div className="wrap grid items-center gap-8 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-5 inline-block rounded-full border border-navy-line px-4 py-1.5 text-xs">Made for Cambodia</p>
            <h1 className="text-6xl font-serif font-semibold leading-[0.92] tracking-tight md:text-8xl">Hold it<br />down.</h1>
            <p className="mt-6 max-w-sm text-mute">Strong hold and a matte finish. Hair clay and texture powder built to last the whole day.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn">Shop now</Link>
              <Link href="/story" className="btn-ghost">Our story</Link>
            </div>
            <p className="mt-6 text-xs text-mute">Cash on delivery. We deliver across Cambodia.</p>
          </div>
          <div className="relative h-80 md:h-[26rem]">
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-navy-line"><ProductVisual p={duo} size="lg" /></div>
          </div>
        </div>
      </section>

      <section className="light py-20">
        <div className="wrap">
          <h2 className="mb-10 text-center text-3xl font-serif font-semibold tracking-tight md:text-4xl">The lineup</h2>
          <div className="grid gap-5 md:grid-cols-3">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        </div>
      </section>

      <div className="border-y border-navy-line bg-navy-2">
        <div className="wrap flex flex-wrap justify-between gap-4 py-5 text-sm font-semibold text-silver">
          <span>Strong hold</span><span>Matte finish</span><span>Rework it all day</span><span>Made for Cambodia</span>
        </div>
      </div>

      <section className="py-24">
        <div className="wrap grid items-center gap-12 md:grid-cols-2">
          <div className="h-96 overflow-hidden rounded-2xl border border-navy-line"><ProductVisual p={clay} size="lg" /></div>
          <div>
            <h2 className="text-4xl font-serif font-semibold leading-tight tracking-tight md:text-5xl">The clay that holds.</h2>
            <p className="mt-4 max-w-md text-mute">No crunch, no stiffness. A firm, natural look you can rework any time of day.</p>
            <div className="my-6 max-w-sm"><Meter hold={clay.hold} shine={clay.shine} /></div>
            <div className="flex gap-3">
              <AddToCart slug={clay.slug} label="Add the clay" />
              <Link href={`/shop/${clay.slug}`} className="btn-ghost">Details</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-navy-line py-5">
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-wm text-lg text-mute">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">We handle with care<Leaf className="h-5 w-5 text-oak" stroke={4} /></span>
          ))}
        </div>
      </div>

      <section className="light py-20">
        <div className="wrap">
          <h2 className="mb-10 text-center text-3xl font-serif font-semibold tracking-tight md:text-4xl">How to use it</h2>
          <ol className="grid gap-5 md:grid-cols-3">
            {[
              ["Start dry", "Use on dry or towel-dried hair."],
              ["Take a little", "Warm it between your palms. Sprinkle the powder at the roots."],
              ["Style", "Work it through and shape. Add more if you need it."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-xl border border-cream-deep bg-white p-6">
                <span className="font-wm text-sm text-navy/50">{i + 1}</span>
                <h3 className="mt-2 text-lg font-serif font-semibold tracking-tight">{t}</h3>
                <p className="mt-1 text-sm text-navy/65">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="wrap">
          <h2 className="text-4xl font-serif font-semibold tracking-tight md:text-5xl">Ready to try OAK?</h2>
          <p className="mx-auto mt-4 max-w-md text-mute">Your hair, held down. Order today.</p>
          <Link href="/shop" className="btn mt-8">Shop now</Link>
        </div>
      </section>
    </>
  );
}
