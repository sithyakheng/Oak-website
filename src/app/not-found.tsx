import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap py-28 text-center">
      <h1 className="text-4xl font-serif font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-mute">That page doesn’t exist. Head back to the shop.</p>
      <Link href="/shop" className="btn mt-8">Go to shop</Link>
    </section>
  );
}
