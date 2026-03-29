import { getDictionary } from "@/lib/i18n";
import { RegisterForm } from "@/components/register/RegisterForm";
import { PageShell } from "@/components/site/PageShell";
import { getIdCardBranding } from "@/lib/cms-idcard";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

export default async function RegisterPage({ params }: { params?: Promise<{ locale?: string }> | { locale?: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const locale = (resolvedParams?.locale as Locale) ?? "hi";
  const t = getDictionary(locale);
  const branding = await getIdCardBranding().catch(() => ({}));

  return (
    <PageShell
      title={locale === "en" ? "Become a member" : "सदस्य बनें"}
      description={
        locale === "en"
          ? "Fill in your details to generate your Member ID and ID card preview."
          : "अपनी जानकारी भरें ताकि आपकी सदस्य संख्या बने और ID कार्ड का प्रीव्यू/डाउनलोड मिल सके।"
      }
    >
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-white p-6 lg:col-span-2">
          <div className="text-sm font-semibold text-zinc-950">Member Registration</div>
          <p className="mt-2 text-sm text-zinc-700">Fields marked * are required.</p>

          <div className="mt-6">
            <RegisterForm branding={branding} locale={locale} />
          </div>
        </div>

        <aside className="grid gap-6">
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="text-sm font-semibold text-zinc-950">{locale === "en" ? "Before you submit" : "सबमिट करने से पहले"}</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              {locale === "en" ? (
                <>
                  <li>• Enter a valid 10-digit mobile number</li>
                  <li>• Make sure DOB is correct</li>
                  <li>• District and State help us maintain accurate records</li>
                  <li>• After submit, you’ll get a Member ID and ID card preview</li>
                </>
              ) : (
                <>
                  <li>• 10-अंकों का सही मोबाइल नंबर भरें</li>
                  <li>• जन्म-तिथि (DOB) सही भरें</li>
                  <li>• जिला और राज्य से रिकॉर्ड सही रखने में मदद मिलती है</li>
                  <li>• सबमिट के बाद आपको सदस्य संख्या (Member ID) और ID कार्ड का प्रीव्यू मिलेगा</li>
                </>
              )}
            </ul>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="text-sm font-semibold text-zinc-950">{locale === "en" ? "Need help?" : "मदद चाहिए?"}</div>
            <p className="mt-2 text-sm text-zinc-700">
              {locale === "en"
                ? "If you have any issues with registration, please contact the foundation office."
                : "रजिस्ट्रेशन में कोई समस्या हो तो कृपया फाउंडेशन कार्यालय से संपर्क करें।"}
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex text-sm font-semibold text-[var(--color-green)] hover:underline"
            >
              {locale === "en" ? "Contact →" : "संपर्क करें →"}
            </Link>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
