"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/locale-path";

type NavItem = { href: string; label: string };

function normalize(pathname: string) {
  // Remove trailing slash except root
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function isActivePath(pathname: string, targetHref: string) {
  const p = normalize(pathname);
  const t = normalize(targetHref);

  // Special-case locale home routes like /hi and /en: only exact match.
  if (t === "/" || t === "/hi" || t === "/en") return p === t;

  return p === t || p.startsWith(t + "/");
}

export function SiteNavLinks({ locale, items }: { locale: Locale; items: readonly NavItem[] }) {
  const pathname = usePathname() || "/";

  const localized = items.map((n) => ({ ...n, href: withLocale(locale, n.href) }));

  return (
    <nav className="hidden items-center gap-5 text-sm md:flex">
      {localized.map((n) => {
        const active = isActivePath(pathname, n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "rounded-full bg-white/10 px-3 py-1.5 font-semibold text-white ring-1 ring-white/30"
                : "px-1 text-white/85 transition-colors hover:text-white hover:underline"
            }
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
