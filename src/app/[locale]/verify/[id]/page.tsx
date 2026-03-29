import VerifyIdPage from "@/app/verify/[id]/page";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedVerifyIdPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const resolved = await params;
  const locale: Locale = isLocale(resolved.locale) ? resolved.locale : "hi";
  return <VerifyIdPage params={Promise.resolve({ id: resolved.id, locale })} />;
}
