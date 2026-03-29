import Link from "next/link";

import { Container } from "@/components/site/Container";
import { HeroSlider } from "@/components/site/HeroSlider";
import { SectionTabs } from "@/components/site/SectionTabs";
import { StatsStrip } from "@/components/site/StatsStrip";
import { theme } from "@/lib/theme";
import { HeroImageCarousel } from "@/components/site/HeroImageCarousel";
import { ObjectiveSection } from "@/components/site/ObjectiveSection";
import { AwardsBannerCarousel } from "@/components/site/AwardsBannerCarousel";
import { getCarouselItems } from "@/lib/cms-carousels";
import { getLatestUpdates } from "@/lib/cms-latest";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const heroItems = await getCarouselItems("home_hero").catch(() => []);
  const awardsItems = await getCarouselItems("home_awards").catch(() => []);
  const latest = await getLatestUpdates().catch(() => []);

  const latestSlides = latest.length
    ? latest.map((x) => ({ title: x.title, subtitle: x.subtitle }))
    : [
        {
          title: "Strict validation",
          subtitle: "Mobile/DOB formats सही—ID pixel-perfect",
        },
        {
          title: "Verified Member ID",
          subtitle: "Registration के बाद यूनिक सदस्य संख्या",
        },
        {
          title: "Fast verification",
          subtitle: "QR scan से तुरंत member status",
        },
      ];

  const heroImages = heroItems.map((it) => ({
    src: it.imageUrl,
    alt: it.alt,
    headline: it.title,
  }));

  const awardsBanners = awardsItems.length
    ? awardsItems.map((it) => ({
        src: it.imageUrl,
        alt: it.alt,
        title: it.title,
        subtitle: it.subtitle,
      }))
    : [
        {
          src: "/demo/award-1.svg",
          alt: "Awards banner 1",
          title: "Awards & Recognition",
          subtitle: "Certificates • Media • Community impact",
        },
        {
          src: "/demo/award-2.svg",
          alt: "Awards banner 2",
          title: "Impact Highlights",
          subtitle: "Milestones that build trust",
        },
        {
          src: "/demo/award-3.svg",
          alt: "Awards banner 3",
          title: "Recognition Wall",
          subtitle: "Achievements • Partnerships • Progress",
        },
      ];

  return (
    <main className="flex-1">
      <section className="bg-[var(--color-green-deep)] text-white">
        <Container className="py-12 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                शक्ति, सेवा और संकल्प
              </h1>
              <p className="mt-4 max-w-prose text-white/85">
                हमारे साथ जुड़िए—सदस्यता लें, ID कार्ड डाउनलोड करें और त्वरित सत्यापन के साथ भरोसा बढ़ाइए।
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/hi/register"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-saffron)] px-6 text-sm font-semibold text-black"
                >
                  सदस्य बनें
                </Link>
                <Link
                  href="/hi/verify"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Verify Member
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/85">
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/70">
                    सदस्यता के लाभ
                  </div>
                  <ul className="mt-3 space-y-2">
                    <li>• सदस्य बनने पर यूनिक <span className="font-semibold text-white">Member ID</span> प्राप्त करें</li>
                    <li>• अपना <span className="font-semibold text-white">ID Card</span> तुरंत देखें और डाउनलोड करें</li>
                    <li>• <span className="font-semibold text-white">Verify Member</span> से सदस्य की पहचान/स्थिति तुरंत जांचें</li>
                    <li>• फाउंडेशन की गतिविधियों से जुड़ने के लिए आधिकारिक रिकॉर्ड में नाम दर्ज</li>
                  </ul>
                </div>
                <HeroSlider slides={latestSlides} />
              </div>
            </div>

            <div className="grid gap-4">
              <HeroImageCarousel images={heroImages} />

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm font-semibold text-zinc-950">Quick Highlights</div>
                <ul className="mt-4 space-y-3 text-sm text-white/85">
                  <li>• Mobile-first experience</li>
                  <li>• Verification ready for QR scanning</li>
                  <li>• Premium UI</li>
                  <li>• Fast deploy on Vercel</li>
                </ul>
                <div className="mt-6">
                  <Link
                    href="/hi/register"
                    className="inline-flex w-full justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-green-deep)]"
                  >
                    Start Registration
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ObjectiveSection />

      <section className="bg-white">
        <Container className="py-10 md:py-14">
          <div className="mb-6">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-800">
              Awards & Recognition
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950">
              Our Achievements
            </h2>
            <p className="mt-2 max-w-prose text-sm leading-6 text-zinc-700">
              Awards/certificates/media highlights managed from Admin CMS.
            </p>
          </div>

          <AwardsBannerCarousel banners={awardsBanners} showOverlayText={awardsItems.length > 0} />
        </Container>
      </section>

      <section className="bg-[color-mix(in_oklab,var(--color-green)_6%,white)]">
        <Container className="py-10 md:py-14">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-800">
                  About the Foundation
                </div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950">
                  Yuvva Pariwar Foundation — परिचय
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-700">
                  Yuvva Pariwar Foundation एक सेवा-प्रधान सामाजिक फाउंडेशन है, जिसका उद्देश्य समाज के जरूरतमंद
                  वर्ग तक स्वास्थ्य, शिक्षा, कौशल-विकास और जागरूकता जैसी जरूरी सेवाएँ पहुँचाना है। हम “सेवा +
                  अनुशासन” के सिद्धांत पर काम करते हैं—हर सदस्य जिम्मेदारी, पारदर्शिता और सकारात्मक प्रभाव (Impact)
                  के साथ जुड़ता है।
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-4">
                    <div className="text-sm font-semibold text-zinc-950">Compassion</div>
                    <p className="mt-2 text-xs leading-5 text-zinc-700">
                      जरूरतमंद तक समय पर सहायता और सम्मानजनक सपोर्ट.
                    </p>
                  </div>
                  <div className="rounded-xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-4">
                    <div className="text-sm font-semibold text-zinc-950">Discipline</div>
                    <p className="mt-2 text-xs leading-5 text-zinc-700">
                      प्रक्रिया, नियम और जिम्मेदारी के साथ सेवा.
                    </p>
                  </div>
                  <div className="rounded-xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-4">
                    <div className="text-sm font-semibold text-zinc-950">Impact</div>
                    <p className="mt-2 text-xs leading-5 text-zinc-700">
                      काम का measurable परिणाम—समुदाय में वास्तविक बदलाव.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-semibold text-zinc-950">Core Focus (Preview)</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Healthcare", "Women Empowerment", "Skill Training", "Environment", "Community Welfare"].map(
                      (t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800"
                        >
                          {t}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/hi/about"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white"
                  >
                    Read full introduction
                  </Link>
                  <Link
                    href="/hi/contact"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-semibold text-zinc-950"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <SectionTabs
                  tabs={[
                    {
                      key: "about",
                      label: "परिचय",
                      title: "Yuvva Pariwar Foundation का परिचय",
                      body: "हमारा लक्ष्य स्थानीय स्तर पर मजबूत नेटवर्क बनाकर समय पर सहायता, मार्गदर्शन और निरंतर विकास के अवसर उपलब्ध कराना है। सदस्यता के माध्यम से पहचान (ID), सत्यापन (QR Verification) और पारदर्शी प्रक्रिया से फाउंडेशन की विश्वसनीयता और संचालन-मानक (Standard) मजबूत होता है।",
                    },
                  ]}
                />
              </div>
            </div>

            <div className="grid gap-6">
              <StatsStrip />
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="text-sm font-semibold text-zinc-950">Gallery</div>
                <p className="mt-2 text-sm text-zinc-700">
                  Photos and highlights from foundation activities. (Phase B: managed from the Admin CMS)
                </p>
                <Link
                  href="/gallery"
                  className="mt-4 inline-flex text-sm font-semibold text-[var(--color-green)] hover:underline"
                >
                  Open Gallery →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-10 md:py-14">
          <div className="rounded-2xl border border-black/10 bg-white p-8 md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Verify Member</h2>
            <p className="mt-2 max-w-prose text-sm leading-6 text-zinc-700">
              हर ID कार्ड पर QR code होगा। Scan करते ही verification page खुलेगा और status
              दिखेगा।
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/hi/verify"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white"
              >
                Verify Now
              </Link>
              <Link
                href="/hi/register"
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-semibold text-zinc-950"
              >
                Become a member
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
