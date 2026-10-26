"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type CartLine = { slug: string; qty: number };
type Ctx = {
  lines: CartLine[]; count: number; ready: boolean;
  add: (slug: string, qty?: number) => void; setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void; clear: () => void;
};
const CartCtx = createContext<Ctx | null>(null);
const KEY = "oak-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setLines(JSON.parse(raw)); } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines, ready]);

  const add = (slug: string, qty = 1) =>
    setLines((l) => l.some((x) => x.slug === slug)
      ? l.map((x) => (x.slug === slug ? { ...x, qty: Math.min(20, x.qty + qty) } : x))
      : [...l, { slug, qty }]);
  const setQty = (slug: string, qty: number) =>
    setLines((l) => (qty <= 0 ? l.filter((x) => x.slug !== slug) : l.map((x) => (x.slug === slug ? { ...x, qty: Math.min(20, qty) } : x))));
  const remove = (slug: string) => setLines((l) => l.filter((x) => x.slug !== slug));
  const clear = () => setLines([]);
  const count = lines.reduce((n, x) => n + x.qty, 0);

  return <CartCtx.Provider value={{ lines, count, ready, add, setQty, remove, clear }}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
