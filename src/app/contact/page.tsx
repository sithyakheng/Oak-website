import type { Metadata } from "next";
import { TELEGRAM } from "@/lib/config";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <section className="wrap grid gap-12 py-20 md:grid-cols-2">
      <div>
        <h1 className="text-5xl font-extrabold">Contact us</h1>
        <p className="mt-4 max-w-sm text-mute">Questions about an order, a product, or delivery? The fastest way is Telegram. You can also send a message here.</p>
        <a href={`https://t.me/${TELEGRAM}`} target="_blank" rel="noreferrer" className="btn mt-8">Telegram @{TELEGRAM}</a>
      </div>
      <ContactForm />
    </section>
  );
}
