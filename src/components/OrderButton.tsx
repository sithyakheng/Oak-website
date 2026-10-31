import { TELEGRAM, money } from "@/lib/config";
import { Product } from "@/lib/products";

export default function OrderButton({ product, className = "btn", label = "Order on Telegram" }: { product: Product; className?: string; label?: string }) {
  const message = `Hi OAK, I want to order: ${product.name} (${money(product.price)}). My name: , phone: , province: , address: \nDelivery location: `;

  return (
    <a
      href={`https://t.me/${TELEGRAM}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {label}
    </a>
  );
}
