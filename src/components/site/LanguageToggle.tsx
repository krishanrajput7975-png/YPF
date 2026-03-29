"use client";

import { usePathname, useRouter } from "next/navigation";

import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

const COOKIE_NAME = "yvp_locale";

function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0];
  return isLocale(seg) ? seg : "hi";
}

function switchPathLocale(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && isLocale(parts[0])) {
    parts[0] = nextLocale;
  } else {
    parts.unshift(nextLocale);
  }
  return "/" + parts.join("/");
}

export function LanguageToggle({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname() || "/";

  const current = locale || getLocaleFromPath(pathname);

  function setLocale(next: Locale) {
    document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.push(switchPathLocale(pathname, next));
    router.refresh();
  }

  return (
    <div className="inline-flex items-center rounded-full border border-white/25 bg-white/5 p-1 text-xs">
      <button
        type="button"
        onClick={() => setLocale("hi")}
        className={`rounded-full px-3 py-1 font-semibold transition-colors ${
          current === "hi" ? "bg-[var(--color-saffron)] text-black" : "text-white/85 hover:text-white"
        }`}
        aria-label="Switch language to Hindi"
      >
        HI
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`rounded-full px-3 py-1 font-semibold transition-colors ${
          current === "en" ? "bg-[var(--color-saffron)] text-black" : "text-white/85 hover:text-white"
        }`}
        aria-label="Switch language to English"
      >
        EN
      </button>
    </div>
  );
}

