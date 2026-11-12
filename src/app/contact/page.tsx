import type { Metadata } from "next";
import { SOCIALS, TELEGRAM_USERNAME, telegramLink } from "@/lib/config";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <section className="wrap flex justify-center py-20 text-center md:py-28">
      <div className="max-w-lg">
        <h1 className="text-5xl font-serif font-semibold tracking-tight">Contact us</h1>
        <p className="mx-auto mt-4 max-w-md text-mute">Message us on Telegram. We reply fast and confirm your order and delivery fee.</p>
        <a href={telegramLink()} target="_blank" rel="noreferrer" className="btn mt-8 inline-block">Message @{TELEGRAM_USERNAME} on Telegram</a>
        <p className="mt-5 text-sm text-mute">Order hours: every day</p>
        <p className="mt-1 text-sm text-mute">We deliver across Cambodia. Pay cash on delivery.</p>
        {SOCIALS.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {SOCIALS.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="btn-ghost">
                {social.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
