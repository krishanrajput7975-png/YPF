import RegisterPage from "@/app/register/page";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedRegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolved = await params;
  const locale: Locale = isLocale(resolved.locale) ? resolved.locale : "hi";
  return <RegisterPage params={{ locale }} />;
}
