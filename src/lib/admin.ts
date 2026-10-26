import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "oak_admin";
export const adminToken = () =>
  createHash("sha256").update(`${process.env.ADMIN_PASSWORD || ""}::oak`).digest("hex");

export function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false;
  return cookies().get(ADMIN_COOKIE)?.value === adminToken();
}
