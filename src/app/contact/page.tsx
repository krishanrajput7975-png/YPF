import Link from "next/link";

import { ContactForm } from "@/components/contact/ContactForm";
import { PageShell } from "@/components/site/PageShell";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/locale-path";

const OFFICE_ADDRESS_LINES = [
  "Sagriya Road, Near Karni Petrol Pump,",
  "Hanumangarh, Rajasthan - 335513",
] as const;

const MAPS_QUERY =
  "Sagriya Road, Near Karni Petrol Pump, Hanumangarh, Rajasthan 335513";

export default async function ContactPage({ params }: { params?: Promise<{ locale?: string }> | { locale?: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const locale = (resolvedParams?.locale as Locale) ?? "hi";

  return (
    <PageShell
      title={locale === "en" ? "Contact" : "संपर्क"}
      description={
        locale === "en"
          ? "We’d love to hear from you. Use the form or contact us directly."
          : "हमसे संपर्क करें—फॉर्म भरें या दिए गए नंबर/ईमेल पर सीधे संपर्क करें।"
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="text-sm font-semibold text-zinc-950">
              {locale === "en" ? "Send a message" : "संदेश भेजें"}
            </div>
            <p className="mt-2 text-sm text-zinc-700">
              {locale === "en"
                ? "Share your query or feedback. Our team will get back to you."
                : "अपना प्रश्न/फीडबैक लिखें—हमारी टीम आपसे जल्द संपर्क करेगी।"}
            </p>
            <div className="mt-6">
              <ContactForm locale={locale} />
            </div>
          </div>
        </div>

        <aside className="grid gap-6">
          <div className="rounded-2xl border border-black/10 bg-white p-6">
            <div className="text-sm font-semibold text-zinc-950">
              {locale === "en" ? "Office & Contact" : "कार्यालय व संपर्क"}
            </div>

            <div className="mt-4 grid gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">
                  {locale === "en" ? "Organization" : "संस्था"}
                </div>
                <div className="mt-1 text-sm font-semibold text-zinc-950">
                  Yuvva Pariwar Welfare Foundation
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">
                  {locale === "en" ? "Registered Office" : "पंजीकृत कार्यालय"}
                </div>
                <p className="mt-1 text-sm leading-6 text-zinc-700">
                  {OFFICE_ADDRESS_LINES.map((l) => (
                    <span key={l}>
                      {l}
                      <br />
                    </span>
                  ))}
                </p>
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm font-semibold text-[var(--color-green)] hover:underline"
                >
                  {locale === "en" ? "Open in Google Maps →" : "Google Maps खोलें →"}
                </Link>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">
                  {locale === "en" ? "Phone" : "फोन"}
                </div>
                <div className="mt-1 text-sm text-zinc-950">
                  <a className="font-semibold hover:underline" href="tel:+918005523773">
                    +91 80055-23773
                  </a>
                  <span className="text-zinc-700">{" / "}</span>
                  <a className="font-semibold hover:underline" href="tel:+919929319003">
                    +91 99293-19003
                  </a>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">
                  {locale === "en" ? "Email" : "ईमेल"}
                </div>
                <div className="mt-1 text-sm text-zinc-950">
                  <a className="font-semibold hover:underline" href="mailto:vs891348@gmail.com">
                    vs891348@gmail.com
                  </a>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">
                  {locale === "en" ? "Website" : "वेबसाइट"}
                </div>
                <div className="mt-1 text-sm text-zinc-950">
                  <a
                    className="font-semibold hover:underline"
                    href="https://www.yuvvapariwarwelfarefoundation.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.yuvvapariwarwelfarefoundation.com
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={withLocale(locale, "/register")}
                  className="text-sm font-semibold text-[var(--color-green)] hover:underline"
                >
                  {locale === "en" ? "Become a member →" : "सदस्य बनें →"}
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
