import { VerifySearchForm } from "@/components/verify/VerifySearchForm";
import { PageShell } from "@/components/site/PageShell";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function VerifyIndexPage({ params }: { params?: Promise<{ locale?: string }> | { locale?: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const locale = (resolvedParams?.locale as Locale) ?? "hi";

  return (
    <PageShell
      title={locale === "en" ? "Verify Member" : "सत्यापन"}
      description={
        locale === "en"
          ? "Enter your Member ID to verify membership status."
          : "अपनी सदस्य संख्या भरकर सदस्य की स्थिति (Status) सत्यापित करें।"
      }
    >
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
          <div className="text-center">
            <div className="text-sm font-semibold text-zinc-950">
              {locale === "en" ? "Member Verification" : "सदस्य सत्यापन"
            }
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-700">
              {locale === "en" ? (
                <>Paste the Member ID (UUID). After verification, the member’s ID card and status will appear below.</>
              ) : (
                <>Member ID (UUID) पेस्ट करें। सत्यापन के बाद सदस्य का ID कार्ड और स्थिति नीचे दिखाई जाएगी।</>
              )}
            </p>
          </div>

          <div className="mt-6">
            <VerifySearchForm locale={locale} />
          </div>

          <div className="mt-5 rounded-xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-4 text-sm text-zinc-800">
            {locale === "en" ? (
              <>
                Tip: You can copy/paste the full Member ID. Example format:{" "}
                <span className="font-mono">xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</span>
              </>
            ) : (
              <>
                टिप: आप पूरी सदस्य संख्या (Member ID) copy/paste कर सकते हैं। उदाहरण:{" "}
                <span className="font-mono">xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</span>
              </>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
