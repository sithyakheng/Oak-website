"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  return <button className="btn-ghost !py-2 text-xs" onClick={async () => { await fetch("/api/admin/login", { method: "DELETE" }); router.refresh(); }}>Sign out</button>;
}

export function StatusSelect({ id, status }: { id: string; status: string }) {
  const [value, setValue] = useState(status);
  const [busy, setBusy] = useState(false);
  async function change(next: string) {
    setBusy(true);
    const res = await fetch("/api/admin/orders", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: next }) });
    if (res.ok) setValue(next);
    setBusy(false);
  }
  return (
    <select value={value} disabled={busy} onChange={(e) => change(e.target.value)} className="field !w-auto !py-2 text-sm" aria-label="Order status">
      {["new", "confirmed", "shipped", "delivered", "cancelled"].map((s) => <option key={s}>{s}</option>)}
    </select>
  );
}
