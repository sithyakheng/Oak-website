import type { Metadata } from "next";
import { PHONE_DISPLAY, TELEGRAM_USERNAME, telLink, telegramLink } from "@/lib/config";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <section className="wrap flex justify-center py-20 text-center">
      <div className="max-w-lg">
        <h1 className="text-5xl font-serif font-semibold tracking-tight">Contact us</h1>
        <p className="mx-auto mt-4 max-w-sm text-mute">Questions about an order, a product, or delivery? The fastest way is Telegram.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={telegramLink()} target="_blank" rel="noreferrer" className="btn">
            {TELEGRAM_USERNAME ? `Telegram @${TELEGRAM_USERNAME}` : `Telegram: ${PHONE_DISPLAY}`}
          </a>
          <a href={telLink} className="btn">Call {PHONE_DISPLAY}</a>
        </div>
      </div>
    </section>
  );
}
