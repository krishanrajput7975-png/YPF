import Link from "next/link";

import { Container } from "@/components/site/Container";
import { InitiativesCarousel } from "@/components/site/InitiativesCarousel";
import { getCarouselItems } from "@/lib/cms-carousels";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/locale-path";

const focusAreasEn = [
	{
		title: "Comprehensive Healthcare",
		body: "Providing life-saving medical aid in remote villages and specialized health programs for women and children.",
	},
	{
		title: "Social Empowerment",
		body: "Uplifting underprivileged groups and driving women’s empowerment through sustainable activities.",
	},
	{
		title: "Specialized Care",
		body: "Dedicated support systems for disability care and malnutrition relief.",
	},
	{
		title: "Skill Development",
		body: "Offering vocational training in nursing and paramedical services to create a self-reliant workforce.",
	},
	{
		title: "Environmental Stewardship",
		body: "Leading conservation efforts through massive plantation drives and solar energy initiatives.",
	},
	{
		title: "Community & Animal Welfare",
		body: "Fostering community development and ensuring holistic care for livestock and animals.",
	},
] as const;

const focusAreasHi = [
	{
		title: "समग्र स्वास्थ्य सेवा",
		body: "दूर-दराज़ गांवों में जीवनरक्षक चिकित्सा सहायता, तथा महिलाओं और बच्चों के लिए विशेष स्वास्थ्य कार्यक्रम।",
	},
	{
		title: "सामाजिक सशक्तिकरण",
		body: "वंचित वर्गों को आगे बढ़ाना और टिकाऊ गतिविधियों के माध्यम से महिला सशक्तिकरण को मजबूत करना।",
	},
	{
		title: "विशेष देखभाल",
		body: "दिव्यांग सहायता और कुपोषण राहत के लिए समर्पित समर्थन तंत्र।",
	},
	{
		title: "कौशल विकास",
		body: "नर्सिंग व पैरामेडिकल सेवाओं में व्यावसायिक प्रशिक्षण देकर आत्मनिर्भर कार्यबल तैयार करना।",
	},
	{
		title: "पर्यावरण संरक्षण",
		body: "वृहद वृक्षारोपण, संरक्षण अभियान और सौर ऊर्जा जैसी पहल के माध्यम से पर्यावरण की रक्षा।",
	},
	{
		title: "समुदाय एवं पशु कल्याण",
		body: "समुदाय विकास और पशुधन/पशुओं के लिए समग्र देखभाल को प्रोत्साहित करना।",
	},
] as const;

type Props = {
	locale?: Locale;
};

export async function ObjectiveSection({ locale = "hi" as Locale }: Props) {
	const cmsInitiatives = await getCarouselItems("home_initiatives").catch(() => []);

	const slides = cmsInitiatives.map((it) => ({
		key: it.id,
		title: it.title ?? "",
		subtitle: "",
		imageSrc: it.imageUrl,
		imageAlt: it.alt,
		description: it.subtitle ?? "",
		bullets: undefined,
	}));

	const hasInitiatives = slides.length > 0;
	const isEn = locale === "en";
	const focusAreas = isEn ? focusAreasEn : focusAreasHi;

	return (
		<section className="bg-white">
			<Container className="py-10 md:py-14">
				<div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
					<div className="rounded-2xl border border-black/10 bg-white p-6 lg:col-span-5">
						<div className="text-xs font-semibold uppercase tracking-wide text-zinc-800">
							{isEn ? "OUR OBJECTIVES & MISSION" : "हमारे उद्देश्य एवं मिशन"}
						</div>
						<h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950">
							{isEn ? "Strength • Service • Commitment" : "शक्ति • सेवा • संकल्प"}
						</h2>
						<p className="mt-3 text-sm leading-6 text-zinc-700">
							{isEn
								? "At the heart of our foundation lies a profound commitment to compassion, service, and national progress. Our mission is to bridge the gap in essential services and empower every citizen through targeted social initiatives."
								: "हमारे फाउंडेशन का केंद्रबिंदु करुणा, सेवा और राष्ट्र-निर्माण के प्रति गहरी प्रतिबद्धता है। हमारा मिशन आवश्यक सेवाओं की कमी को दूर करना और लक्षित सामाजिक पहलों के माध्यम से प्रत्येक नागरिक को सशक्त बनाना है।"}
						</p>

						<div className="mt-6">
							<div className="text-sm font-semibold text-zinc-950">
								{isEn ? "Core Focus Areas" : "मुख्य कार्य-क्षेत्र"}
							</div>
							<div className="mt-3 space-y-3">
								{focusAreas.map((a) => (
									<div key={a.title} className="rounded-xl border border-black/10 bg-white p-4">
										<div className="text-sm font-semibold text-zinc-950">{a.title}</div>
										<div className="mt-1 text-xs leading-5 text-zinc-700">{a.body}</div>
									</div>
								))}
							</div>
						</div>

						<div className="mt-6 flex flex-col gap-3 sm:flex-row">
							<Link
								href={withLocale(locale, "/register")}
								className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-saffron)] px-6 text-sm font-semibold text-black"
							>
								{isEn ? "Join / Register" : "सदस्य बनें"}
							</Link>
							<Link
								href={withLocale(locale, "/contact")}
								className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-6 text-sm font-semibold text-zinc-950 hover:bg-zinc-50"
							>
								{isEn ? "Contact" : "संपर्क करें"}
							</Link>
						</div>
					</div>

					{hasInitiatives ? (
						<div className="lg:col-span-7">
							<InitiativesCarousel slides={slides} />
						</div>
					) : null}
				</div>
			</Container>
		</section>
	);
}
