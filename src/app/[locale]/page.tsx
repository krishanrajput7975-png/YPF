import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

import LocalizedHome from "@/app/[locale]/home-page";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolved = await params;
  const locale: Locale = isLocale(resolved.locale) ? resolved.locale : "hi";

  return <LocalizedHome locale={locale} />;
}
