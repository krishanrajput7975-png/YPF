import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "yvp_admin";
const LOCALE_COOKIE = "yvp_locale";
const LOCALES = ["hi", "en"] as const;

function isLocale(x: string | undefined) {
  return x === "hi" || x === "en";
}

function extractCookieParts(raw: string | undefined) {
  if (!raw) return null;
  const [value, signature] = raw.split(".");
  if (!value || !signature) return null;
  return { value, signature };
}

function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error("Invalid hex");
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

function timingSafeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  const bytes = new Uint8Array(sig);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function isAdminCookieValid(req: NextRequest): Promise<boolean> {
  const parts = extractCookieParts(req.cookies.get(COOKIE_NAME)?.value);
  if (!parts) return false;

  const secret = process.env.ADMIN_PORTAL_SECRET ?? "";
  if (!secret) return false;

  const expectedHex = await hmacSha256Hex(secret, parts.value);

  try {
    const a = hexToBytes(parts.signature);
    const b = hexToBytes(expectedHex);
    return timingSafeEqualBytes(a, b);
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 0) Redirect common typo: /gallary -> /gallery (also for /hi/gallary, /en/gallary)
  if (pathname === "/gallary" || pathname === "/hi/gallary" || pathname === "/en/gallary") {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace("gallary", "gallery");
    return NextResponse.redirect(url);
  }

  // 1) Protect all admin routes except login.
  if (pathname.startsWith("/admin-portal") && !pathname.startsWith("/admin-portal/login")) {
    const ok = await isAdminCookieValid(req);
    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin-portal/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  // 2) Locale routing: redirect / -> /{locale}
  // Don't touch API routes, Next internals, static assets, or admin routes.
  if (
    pathname === "/" ||
    (!pathname.startsWith("/admin-portal") &&
      !pathname.startsWith("/_next") &&
      !pathname.startsWith("/api") &&
      !pathname.includes(".") &&
      !isLocale(pathname.split("/").filter(Boolean)[0]))
  ) {
    const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
    const preferred = isLocale(cookieLocale) ? cookieLocale : "hi";

    const url = req.nextUrl.clone();

    if (pathname === "/") {
      url.pathname = `/${preferred}`;
      return NextResponse.redirect(url);
    }

    // For non-localized paths like /about, force /hi/about as default.
    url.pathname = `/${preferred}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-portal/:path*", "/((?!_next|api|.*\\..*).*)"],
};
