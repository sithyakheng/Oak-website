export const TELEGRAM_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM || "";

export function telegramLink(message?: string) {
  const url = `https://t.me/${TELEGRAM_USERNAME}`;
  return message !== undefined ? `${url}?text=${encodeURIComponent(message)}` : url;
}

export const money = (n: number) => `$${Number(n).toFixed(2)}`;
