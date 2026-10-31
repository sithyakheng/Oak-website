export const TELEGRAM = process.env.NEXT_PUBLIC_TELEGRAM || "oakcambodia";
export const money = (n: number) => `$${Number(n).toFixed(2)}`;
