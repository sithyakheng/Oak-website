import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Delivery & FAQ" };

const faqs = [
  ["How does ordering work?", "Add products to your cart and place your order. We contact you by phone or Telegram to confirm, then ship it."],
  ["How do I pay?", "Cash on delivery. You pay the courier when your order arrives."],
  ["Where do you deliver?", "Anywhere in Cambodia, including all 25 provinces and Phnom Penh."],
  ["How much is delivery?", "Free in Phnom Penh. $2 to the provinces."],
  ["How long does it take?", "Phnom Penh: same or next day. Provinces: usually 1 to 3 days."],
  ["How do I use the clay?", "Warm a small amount between your palms and work it through dry or towel-dried hair. Add more if you need it."],
  ["How do I use the powder?", "Sprinkle a little at the roots, then ruffle and shape. It works alone or under clay."],
  ["Something is wrong with my order.", "Message us on Telegram or use the contact page and we’ll fix it."],
];

export default function Delivery() {
  return (
    <>
      <section className="py-20">
        <div className="wrap max-w-3xl">
          <h1 className="text-5xl font-extrabold">Delivery & FAQ</h1>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-navy-line bg-navy-2 p-6"><h2 className="text-xl font-bold">Phnom Penh</h2><p className="mt-2 text-mute">Free delivery. Same or next day. Pay cash on delivery.</p></div>
            <div className="rounded-xl border border-navy-line bg-navy-2 p-6"><h2 className="text-xl font-bold">Provinces</h2><p className="mt-2 text-mute">$2 delivery. 1 to 3 days by courier. Pay cash on delivery.</p></div>
          </div>
        </div>
      </section>
      <section className="light py-20">
        <div className="wrap max-w-3xl">
          <h2 className="mb-8 text-3xl font-extrabold">Questions</h2>
          <div className="divide-y divide-cream-deep rounded-xl border border-cream-deep bg-white">
            {faqs.map(([q, a]) => (
              <details key={q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">{q}<span className="text-xl transition group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-navy/70">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-navy/70">Still stuck? <Link href="/contact" className="font-semibold underline">Contact us</Link>.</p>
        </div>
      </section>
    </>
  );
}
