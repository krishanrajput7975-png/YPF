import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

import { LocalizedGalleryContent } from "@/app/[locale]/gallery/gallery-content";

export default async function LocaleGalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolved = await params;
  const locale: Locale = isLocale(resolved.locale) ? resolved.locale : "hi";

  return <LocalizedGalleryContent locale={locale} />;
}
