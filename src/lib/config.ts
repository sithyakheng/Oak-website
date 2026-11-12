export const PHONE_DISPLAY = "097 756 4956";
export const PHONE_INTL = "855977564956";
export const TELEGRAM_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM || "";

export function telegramLink(message?: string) {
  if (TELEGRAM_USERNAME) {
    const url = `https://t.me/${TELEGRAM_USERNAME}`;
    return message !== undefined ? `${url}?text=${encodeURIComponent(message)}` : url;
  }

  return `https://t.me/+${PHONE_INTL}`;
}

export const telLink = `tel:+${PHONE_INTL}`;
export const money = (n: number) => `$${Number(n).toFixed(2)}`;
