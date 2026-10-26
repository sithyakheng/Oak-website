import { Product } from "@/lib/products";
import { Wordmark } from "./Logo";

export default function ProductVisual({ p, size = "md" }: { p: Pick<Product, "kind" | "name" | "image_url">; size?: "md" | "lg" }) {
  const scale = size === "lg" ? "scale-[1.5]" : "";
  if (p.image_url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />;
  }
  return (
    <div className={`flex h-full w-full items-center justify-center gap-6 bg-[radial-gradient(circle_at_50%_55%,#243a5c,#0d1b2e)] ${scale}`} role="img" aria-label={p.name}>
      {(p.kind === "clay" || p.kind === "duo") && (
        <div className="shape-jar"><Wordmark className="text-[11px] text-silver" /></div>
      )}
      {(p.kind === "powder" || p.kind === "duo") && (
        <div className="shape-cyl"><Wordmark className="text-[9px] text-silver [writing-mode:vertical-rl]" /></div>
      )}
    </div>
  );
}
