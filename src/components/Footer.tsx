import Link from "next/link";
import { TELEGRAM } from "@/lib/config";
import { Leaf, Wordmark } from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-navy-line py-14 text-sm text-mute">
      <div className="wrap grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 text-silver"><Leaf className="text-oak" /><Wordmark className="text-lg" /></div>
          <p className="mt-4 max-w-xs">Hair clay and texture powder, made for Cambodia. We handle with care.</p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/shop" className="hover:text-silver">Shop</Link>
          <Link href="/story" className="hover:text-silver">Our story</Link>
          <Link href="/delivery" className="hover:text-silver">Delivery & FAQ</Link>
          <Link href="/contact" className="hover:text-silver">Contact</Link>
        </div>
        <div className="flex flex-col gap-2">
          <a href={`https://t.me/${TELEGRAM}`} target="_blank" rel="noreferrer" className="hover:text-silver">Telegram: @{TELEGRAM}</a>
          <span>@We Handle With Care</span>
          <span>We deliver across Cambodia.</span>
        </div>
      </div>
      <div className="wrap mt-10 text-xs">© {new Date().getFullYear()} OAK. Cambodia.</div>
    </footer>
  );
}
