import type { Locale } from "@/lib/i18n";

export function withLocale(locale: Locale, href: string) {
  if (!href.startsWith("/")) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

