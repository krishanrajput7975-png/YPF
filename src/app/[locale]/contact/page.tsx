import ContactPage from "@/app/contact/page";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolved = await params;
  const locale: Locale = isLocale(resolved.locale) ? resolved.locale : "hi";
  return <ContactPage params={{ locale }} />;
}
