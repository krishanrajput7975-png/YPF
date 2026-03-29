import Link from "next/link";

import { Container } from "@/components/site/Container";
import { HeroSlider } from "@/components/site/HeroSlider";
import { SectionTabs } from "@/components/site/SectionTabs";
import { StatsStrip } from "@/components/site/StatsStrip";
import { HeroImageCarousel } from "@/components/site/HeroImageCarousel";
import { ObjectiveSection } from "@/components/site/ObjectiveSection";
import { AwardsBannerCarousel } from "@/components/site/AwardsBannerCarousel";
import { getCarouselItems } from "@/lib/cms-carousels";
import { getLatestUpdates } from "@/lib/cms-latest";
import { getDictionary, type Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/locale-path";

export default async function LocalizedHome({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const heroItems = await getCarouselItems("home_hero").catch(() => []);
  const awardsItems = await getCarouselItems("home_awards").catch(() => []);
  const latest = await getLatestUpdates().catch(() => []);

  const latestSlides = latest.length
    ? latest.map((x) => ({ title: x.title, subtitle: x.subtitle }))
    : locale === "en"
      ? [
          { title: "Latest updates", subtitle: "News, camps and ongoing work" },
          { title: "Member ID", subtitle: "Unique member number after registration" },
          { title: "Quick verification", subtitle: "Check member status on the Verify page" },
        ]
      : [
          { title: "Strict validation", subtitle: "Mobile/DOB formats सही—ID pixel-perfect" },
          { title: "Verified Member ID", subtitle: "Registration के बाद यूनिक सदस्य संख्या" },
          { title: "Fast verification", subtitle: "QR scan से तुरंत member status" },
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
          title: locale === "en" ? "Awards & Recognition" : "Awards & Recognition",
          subtitle: locale === "en" ? "Certificates • Media • Community impact" : "Certificates • Media • Community impact",
        },
        {
          src: "/demo/award-2.svg",
          alt: "Awards banner 2",
          title: locale === "en" ? "Impact Highlights" : "Impact Highlights",
          subtitle: locale === "en" ? "Milestones that build trust" : "Milestones that build trust",
        },
        {
          src: "/demo/award-3.svg",
          alt: "Awards banner 3",
          title: locale === "en" ? "Recognition Wall" : "Recognition Wall",
          subtitle: locale === "en" ? "Achievements • Partnerships • Progress" : "Achievements • Partnerships • Progress",
        },
      ];

  const heroTitle = locale === "en" ? "Strength, Service & Commitment" : "शक्ति, सेवा और संकल्प";
  const heroTagline =
    locale === "en"
      ? "Join with us—get your Member ID, download your ID card, and verify members with confidence."
      : "हमारे साथ जुड़िए—सदस्यता लें, ID कार्ड डाउनलोड करें और त्वरित सत्यापन के साथ भरोसा बढ़ाइए।";

  const primaryCta = locale === "en" ? "Join / Register" : "सदस्य बनें";
  const verifyCta = locale === "en" ? "Verify Member" : "Verify Member";

  return (
    <main className="flex-1">
      <section className="bg-[var(--color-green-deep)] text-white">
        <Container className="py-12 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">{heroTitle}</h1>
              <p className="mt-4 max-w-prose text-white/85">{heroTagline}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={withLocale(locale, "/register")}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-saffron)] px-6 text-sm font-semibold text-black"
                >
                  {primaryCta}
                </Link>
                <Link
                  href={withLocale(locale, "/verify")}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-semibold text-white hover:bg-white/10"
                >
                  {verifyCta}
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/85">
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/70">
                    {locale === "en" ? "Our Commitment" : "हमारा संकल्प"}
                  </div>
                  {locale === "en" ? (
                    <ul className="mt-3 space-y-2">
                      <li>• Commitment to nation-building</li>
                      <li>• Inspired by Shaheed Bhagat Singh’s ideology</li>
                      <li>• A bridge of healthcare and service</li>
                      <li>• Youth empowerment</li>
                      <li>• Nature & animal welfare</li>
                    </ul>
                  ) : (
                    <ul className="mt-3 space-y-2">
                      <li>• राष्ट्र-निर्माण का संकल्प</li>
                      <li>• शहीद भगत सिंह की विचारधारा</li>
                      <li>• स्वास्थ्य और सेवा का सेतु</li>
                      <li>• युवा सशक्तिकरण</li>
                      <li>• प्रकृति और जीव कल्याण</li>
                    </ul>
                  )}
                </div>
                <HeroSlider slides={latestSlides} />
              </div>
            </div>

            <div className="grid gap-4">
              <HeroImageCarousel images={heroImages} />

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-white/70">
                      {locale === "en" ? "Quick Highlights" : "मुख्य बातें"}
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">
                      {locale === "en" ? "Membership in minutes" : "कुछ मिनटों में सदस्यता"}
                    </div>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90">
                    {locale === "en" ? "Fast" : "तेज़"}
                  </div>
                </div>

                <ul className="mt-5 space-y-3 text-sm text-white/85">
                  {locale === "en" ? (
                    <>
                      <li className="flex gap-2">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--color-saffron)]" />
                        <span>Mobile-friendly registration</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--color-saffron)]" />
                        <span>Unique Member ID and ID card download after registration</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--color-saffron)]" />
                        <span>Instant verification using your Member ID</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex gap-2">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--color-saffron)]" />
                        <span>मोबाइल पर आसान रजिस्ट्रेशन</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--color-saffron)]" />
                        <span>रजिस्ट्रेशन के बाद यूनिक सदस्य संख्या और पहचान पत्र डाउनलोड</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--color-saffron)]" />
                        <span>सदस्य संख्या से तुरंत सत्यापन</span>
                      </li>
                    </>
                  )}
                </ul>

                <div className="mt-6 grid gap-3">
                  <Link
                    href={withLocale(locale, "/register")}
                    className="inline-flex w-full justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-green-deep)]"
                  >
                    {locale === "en" ? "Start registration" : "सदस्यता शुरू करें"}
                  </Link>
                </div>

                <p className="mt-4 text-xs text-white/65">
                  {locale === "en"
                    ? "Tip: Save your Member ID safely. You can verify your status anytime."
                    : "टिप: अपनी Member ID सुरक्षित रखें—कभी भी Verify पेज पर स्थिति देख सकते हैं।"}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ObjectiveSection locale={locale} />

      <section className="bg-white">
        <Container className="py-10 md:py-14">
          <div className="grid gap-6 md:grid-cols-12 md:items-stretch">
            <div className="md:col-span-3">
              <div className="rounded-2xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-6 md:h-full">
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-800">
                  {locale === "en" ? "Awards & Recognition" : "Awards & Recognition"}
                </div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950">
                  {locale === "en" ? "Our Achievements" : "Our Achievements"}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-700">
                  {locale === "en" ? (
                    <>
                      <span className="block">
                        <span className="font-semibold text-zinc-950">Government Accreditations:</span> Official recognition and certificates from the Government of India and state authorities.
                      </span>
                      <span className="mt-2 block">
                        <span className="font-semibold text-zinc-950">Media Mentions:</span> Coverage of foundation activities in leading newspapers and media platforms.
                      </span>
                      <span className="mt-2 block">
                        <span className="font-semibold text-zinc-950">Impact Highlights:</span> Honors for outstanding work in social service, health camps, and youth empowerment.
                      </span>
                      <span className="mt-2 block">
                        <span className="font-semibold text-zinc-950">Official Recognition:</span> Verified service record via NITI Aayog (Darpan) and other reputed institutions.
                      </span>
                      <span className="mt-2 block">
                        <span className="font-semibold text-zinc-950">Awards & Honors:</span> Recognition received for excellence in community service and social initiatives.
                      </span>
                      <span className="mt-2 block">
                        <span className="font-semibold text-zinc-950">Partnerships & Support:</span> Collaboration with institutions and supporters to scale impact responsibly.
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block">
                        <span className="font-semibold text-zinc-950">सरकारी मान्यता:</span> भारत सरकार एवं राज्य सरकार द्वारा प्राप्त आधिकारिक मान्यता और प्रमाण पत्र।
                      </span>
                      <span className="mt-2 block">
                        <span className="font-semibold text-zinc-950">मीडिया उल्लेख:</span> प्रमुख समाचार पत्रों और मीडिया संस्थानों में फाउंडेशन की गतिविधियों की गूँज।
                      </span>
                      <span className="mt-2 block">
                        <span className="font-semibold text-zinc-950">प्रभाव की झलक:</span> समाज सेवा, स्वास्थ्य शिविर और युवा सशक्तिकरण के क्षेत्र में उत्कृष्ट कार्यों के लिए मिले सम्मान।
                      </span>
                      <span className="mt-2 block">
                        <span className="font-semibold text-zinc-950">आधिकारिक पहचान:</span> नीति आयोग (Darpan) एवं अन्य प्रतिष्ठित संस्थाओं द्वारा प्रमाणित सेवा रिकॉर्ड।
                      </span>
                      <span className="mt-2 block">
                        <span className="font-semibold text-zinc-950">सम्मान एवं उपलब्धियाँ:</span> जनसेवा और सामाजिक पहलों में उत्कृष्ट योगदान के लिए प्राप्त सम्मान।
                      </span>
                      <span className="mt-2 block">
                        <span className="font-semibold text-zinc-950">सहयोग एवं भागीदारी:</span> प्रभाव को जिम्मेदारी के साथ बढ़ाने हेतु संस्थानों और समर्थकों के साथ सहयोग।
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="md:col-span-9">
              <AwardsBannerCarousel banners={awardsBanners} showOverlayText={awardsItems.length > 0} />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[color-mix(in_oklab,var(--color-green)_6%,white)]">
        <Container className="py-10 md:py-14">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-800">
                  {locale === "en" ? "About the Foundation" : "About the Foundation"}
                </div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950">
                  {locale === "en" ? "Yuvva Pariwar Foundation — Introduction" : "Yuvva Pariwar Foundation — परिचय"}
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-700">
                  {locale === "en"
                    ? "Yuvva Pariwar Foundation is a service-driven social foundation focused on delivering essential support across healthcare, skill development, awareness, and community welfare. We work with discipline, transparency, and measurable impact."
                    : "Yuvva Pariwar Foundation एक सेवा-प्रधान सामाजिक फाउंडेशन है, जिसका उद्देश्य समाज के जरूरतमंद\n                  वर्ग तक स्वास्थ्य, शिक्षा, कौशल-विकास और जागरूकता जैसी जरूरी सेवाएँ पहुँचाना है। हम “सेवा +\n                  अनुशासन” के सिद्धांत पर काम करते हैं—हर सदस्य जिम्मेदारी, पारदर्शिता और सकारात्मक प्रभाव (Impact)\n                  के साथ जुड़ता है।"}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-4">
                    <div className="text-sm font-semibold text-zinc-950">{locale === "en" ? "Compassion" : "Compassion"}</div>
                    <p className="mt-2 text-xs leading-5 text-zinc-700">
                      {locale === "en" ? "Timely support with dignity for people in need." : "जरूरतमंद तक समय पर सहायता और सम्मानजनक सपोर्ट."}
                    </p>
                  </div>
                  <div className="rounded-xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-4">
                    <div className="text-sm font-semibold text-zinc-950">{locale === "en" ? "Discipline" : "Discipline"}</div>
                    <p className="mt-2 text-xs leading-5 text-zinc-700">
                      {locale === "en" ? "Structured processes, responsibility, and consistency." : "प्रक्रिया, नियम और जिम्मेदारी के साथ सेवा."}
                    </p>
                  </div>
                  <div className="rounded-xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-4">
                    <div className="text-sm font-semibold text-zinc-950">{locale === "en" ? "Impact" : "Impact"}</div>
                    <p className="mt-2 text-xs leading-5 text-zinc-700">
                      {locale === "en" ? "Real, measurable change in communities." : "काम का measurable परिणाम—समुदाय में वास्तविक बदलाव."}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={withLocale(locale, "/about")}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white"
                  >
                    {locale === "en" ? "Read full introduction" : "Read full introduction"}
                  </Link>
                  <Link
                    href={withLocale(locale, "/contact")}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-semibold text-zinc-950"
                  >
                    {locale === "en" ? "Contact" : "Contact"}
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <StatsStrip locale={locale} />
              <div className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="text-sm font-semibold text-zinc-950">Gallery</div>
                <p className="mt-2 text-sm text-zinc-700">
                  {locale === "en"
                    ? "Photos and highlights from foundation activities."
                    : "Photos and highlights from foundation activities."}
                </p>
                <Link
                  href={withLocale(locale, "/gallery")}
                  className="mt-4 inline-flex text-sm font-semibold text-[var(--color-green)] hover:underline"
                >
                  {locale === "en" ? "Open Gallery →" : "Open Gallery →"}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-10 md:py-14">
          <div className="rounded-2xl border border-black/10 bg-white p-8 md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950">{t.nav.verify}</h2>
            <p className="mt-2 max-w-prose text-sm leading-6 text-zinc-700">
              {locale === "en"
                ? "Use your unique Member ID to open verification and check the latest membership status."
                : "अपनी यूनिक सदस्य संख्या (Member ID) डालकर सत्यापन पेज पर सदस्य की स्थिति तुरंत जांचें।"}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={withLocale(locale, "/verify")}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white"
              >
                {locale === "en" ? "Verify Now" : "सत्यापन करें"}
              </Link>
              <Link
                href={withLocale(locale, "/register")}
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-semibold text-zinc-950"
              >
                {locale === "en" ? "Become a member" : "सदस्य बनें"}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

