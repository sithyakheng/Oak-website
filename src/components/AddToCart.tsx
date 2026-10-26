"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export default function AddToCart({ slug, className = "btn", label = "Add to cart" }: { slug: string; className?: string; label?: string }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  return (
    <button
      className={className}
      onClick={() => { add(slug); setDone(true); setTimeout(() => setDone(false), 1400); }}
    >
      {done ? "Added" : label}
    </button>
  );
}
