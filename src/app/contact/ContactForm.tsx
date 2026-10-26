"use client";
import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "busy" | "sent" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("busy");
    const f = new FormData(form);
    const res = await fetch("/api/contact", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: f.get("name"), contact: f.get("contact"), message: f.get("message") }),
    });
    if (res.ok) { form.reset(); setState("sent"); } else setState("error");
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <input name="name" className="field" placeholder="Your name" required />
      <input name="contact" className="field" placeholder="Phone or Telegram" required />
      <textarea name="message" className="field" rows={5} placeholder="How can we help?" required />
      <button className="btn w-full" disabled={state === "busy"}>{state === "busy" ? "Sending…" : "Send message"}</button>
      {state === "sent" && <p role="status" className="text-sm text-silver">Message sent. We’ll reply soon.</p>}
      {state === "error" && <p role="alert" className="text-sm text-red-300">Couldn’t send. Please try Telegram instead.</p>}
    </form>
  );
}
