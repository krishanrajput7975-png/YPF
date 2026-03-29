import type { Metadata } from "next";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { isLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Yuvva Pariwar Foundation",
  description: "Yuvva Pariwar Foundation website",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolved = await params;
  const locale: Locale = isLocale(resolved.locale) ? resolved.locale : "hi";

  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} />
    </div>
  );
}
