export const TELEGRAM_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM || "simplefin07";

export const SOCIALS = [
  { name: "Facebook", url: process.env.NEXT_PUBLIC_FACEBOOK || "" },
  { name: "TikTok", url: process.env.NEXT_PUBLIC_TIKTOK || "" },
  { name: "Instagram", url: process.env.NEXT_PUBLIC_INSTAGRAM || "" },
].filter((s) => s.url);

export function telegramLink(message?: string) {
  const url = `https://t.me/${TELEGRAM_USERNAME}`;
  return message !== undefined ? `${url}?text=${encodeURIComponent(message)}` : url;
}

export const money = (n: number) => `$${Number(n).toFixed(2)}`;
