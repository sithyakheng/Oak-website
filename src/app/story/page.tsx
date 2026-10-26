import type { Metadata } from "next";
import Link from "next/link";
import { Leaf } from "@/components/Logo";

export const metadata: Metadata = { title: "Our story" };

export default function Story() {
  return (
    <>
      <section className="relative overflow-hidden py-24">
        <Leaf className="pointer-events-none absolute -right-20 -top-16 h-[30rem] w-[30rem] opacity-[0.06]" stroke={1} />
        <div className="wrap max-w-3xl">
          <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">Strong like an oak. Handled with care.</h1>
          <p className="mt-6 text-lg text-mute">OAK is a Cambodian hair brand. We make a clay and a texture powder for people who want their hair to stay where they put it, all day, without looking like they tried too hard.</p>
        </div>
      </section>
      <section className="light py-20">
        <div className="wrap grid max-w-4xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold">Why we started</h2>
            <p className="mt-3 text-navy/70">Good styling products were hard to find at a fair price here. We wanted something that holds in Cambodian heat and humidity, looks natural, and arrives at your door.</p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">What we make</h2>
            <p className="mt-3 text-navy/70">A hair clay with firm hold and a matte finish, and a 25g texture powder for instant volume. Two products, done well.</p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">Why the oak</h2>
            <p className="mt-3 text-navy/70">An oak stands through every season. That’s the hold we’re after. The leaf on every jar is our reminder of it.</p>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">We handle with care</h2>
            <p className="mt-3 text-navy/70">From the way we pack your order to the way we answer your messages, we treat every customer like it matters.</p>
          </div>
        </div>
      </section>
      <section className="py-20 text-center">
        <div className="wrap">
          <Link href="/shop" className="btn">Shop OAK</Link>
        </div>
      </section>
    </>
  );
}
