import type { Metadata } from "next";
import { TELEGRAM } from "@/lib/config";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <section className="wrap flex justify-center py-20 text-center">
      <div className="max-w-lg">
        <h1 className="text-5xl font-serif font-semibold tracking-tight">Contact us</h1>
        <p className="mx-auto mt-4 max-w-sm text-mute">Questions about an order, a product, or delivery? The fastest way is Telegram.</p>
        <a href={`https://t.me/${TELEGRAM}`} target="_blank" rel="noreferrer" className="btn mt-8">Telegram @{TELEGRAM}</a>
      </div>
    </section>
  );
}
