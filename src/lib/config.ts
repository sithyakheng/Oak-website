export const TELEGRAM = process.env.NEXT_PUBLIC_TELEGRAM || "oakcambodia";
export const PHNOM_PENH = "Phnom Penh";
export const DELIVERY_FEE_PROVINCE = 2;
export const PROVINCES = [
  "Phnom Penh", "Banteay Meanchey", "Battambang", "Kampong Cham", "Kampong Chhnang", "Kampong Speu",
  "Kampong Thom", "Kampot", "Kandal", "Kep", "Koh Kong", "Kratie", "Mondulkiri", "Oddar Meanchey",
  "Pailin", "Preah Sihanouk", "Preah Vihear", "Pursat", "Prey Veng", "Ratanakiri", "Siem Reap",
  "Stung Treng", "Svay Rieng", "Takeo", "Tboung Khmum",
];
export const deliveryFee = (province: string) => (province === PHNOM_PENH ? 0 : DELIVERY_FEE_PROVINCE);
export const money = (n: number) => `$${Number(n).toFixed(2)}`;
