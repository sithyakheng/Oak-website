"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Leaf, Wordmark } from "./Logo";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "Our story" },
  { href: "/delivery", label: "Delivery & FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-navy-line bg-navy/90 backdrop-blur">
      <div className="bg-silver py-1.5 text-center text-xs font-semibold text-navy">Made for Cambodia. Free delivery in Phnom Penh.</div>
      <div className="wrap flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Leaf className="h-6 w-6" /><Wordmark className="text-base" />
        </Link>
        <nav className="hidden gap-7 text-sm font-medium md:flex">
          {links.map((l) => <Link key={l.href} href={l.href} className="text-silver/80 hover:text-white">{l.label}</Link>)}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/cart" className="btn-ghost !px-5 !py-2 text-xs">Cart ({count})</Link>
          <button className="md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <svg width="26" height="26" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"><path d={open ? "M5 5l14 14M19 5L5 19" : "M4 7h16M4 12h16M4 17h16"} /></svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="wrap flex flex-col gap-4 pb-5 text-sm font-medium md:hidden">
          {links.map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>)}
        </nav>
      )}
    </header>
  );
}
