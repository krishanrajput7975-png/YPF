import { redirect } from "next/navigation";

export default async function LocaleGallaryRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/gallery`);
}

