"use client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return <button className="btn-ghost !py-2 text-xs" onClick={async () => { await fetch("/api/admin/login", { method: "DELETE" }); router.refresh(); }}>Sign out</button>;
}
