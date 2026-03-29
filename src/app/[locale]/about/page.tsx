import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

import { LocalizedAboutContent } from "@/app/[locale]/about/about-content";

export default async function LocaleAboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolved = await params;
  const locale: Locale = isLocale(resolved.locale) ? resolved.locale : "hi";

  return <LocalizedAboutContent locale={locale} />;
}
