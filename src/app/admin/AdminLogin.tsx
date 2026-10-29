"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (res.ok) router.refresh(); else setError("Wrong password.");
  }
  return (
    <section className="wrap max-w-sm py-28">
      <h1 className="text-3xl font-serif font-semibold tracking-tight">Admin</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input name="password" type="password" className="field" placeholder="Password" required autoComplete="current-password" />
        {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
        <button className="btn w-full">Sign in</button>
      </form>
    </section>
  );
}
