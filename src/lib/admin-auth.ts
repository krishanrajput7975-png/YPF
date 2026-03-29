import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "yvp_admin";

function requireAdminSecret() {
  const secret = process.env.ADMIN_PORTAL_SECRET ?? "";
  if (!secret) {
    throw new Error(
      "Missing ADMIN_PORTAL_SECRET. Add it to .env.local to enable /admin-portal secret-code access."
    );
  }
  return secret;
}

export function createAdminCookieValue(): string {
  // Random session token (no user identity; single admin).
  return crypto.randomBytes(32).toString("hex");
}

export async function setAdminSessionCookie(value: string) {
  const secret = requireAdminSecret();
  const signature = crypto
    .createHmac("sha256", secret)
    .update(value)
    .digest("hex");

  const jar = await cookies();
  jar.set({
    name: COOKIE_NAME,
    value: `${value}.${signature}`,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSessionCookie() {
  const jar = await cookies();
  jar.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function isAdminAuthenticatedFromCookies(): Promise<boolean> {
  const jar = await cookies();
  const raw = jar.get(COOKIE_NAME)?.value;
  if (!raw) return false;

  const [value, signature] = raw.split(".");
  if (!value || !signature) return false;

  const secret = process.env.ADMIN_PORTAL_SECRET ?? "";
  if (!secret) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(value)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function verifyAdminSecretCode(code: string): boolean {
  const secret = process.env.ADMIN_PORTAL_SECRET ?? "";
  if (!secret) return false;
  if (!code) return false;

  // Constant-time compare.
  try {
    return crypto.timingSafeEqual(Buffer.from(code), Buffer.from(secret));
  } catch {
    // If lengths differ, timingSafeEqual throws.
    return false;
  }
}
