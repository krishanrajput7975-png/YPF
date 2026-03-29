import Image from "next/image";
import Link from "next/link";

import { LanguageToggle } from "@/components/site/LanguageToggle";
import { MobileMenu } from "@/components/site/MobileMenu";
import { SiteNavLinks } from "@/components/site/SiteNavLinks";
import { getSiteLogo } from "@/lib/cms-branding";
import { getDictionary, type Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/locale-path";

export async function SiteHeader({ locale }: { locale: Locale }) {
	const logo = await getSiteLogo().catch(() => null);
	const dict = getDictionary(locale);

	const nav = [
		{ href: "/", label: dict.nav.home },
		{ href: "/about", label: dict.nav.about },
		{ href: "/gallery", label: dict.nav.gallery },
		{ href: "/register", label: dict.nav.register },
		{ href: "/verify", label: dict.nav.verify },
		{ href: "/contact", label: dict.nav.contact },
	] as const;

	const navLocalized = nav.map((n) => ({ ...n, href: withLocale(locale, n.href) }));

	return (
		<header className="sticky top-0 z-50 border-b border-black/10 bg-[var(--color-green-deep)] text-white">
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
				<Link
					href={withLocale(locale, "/")}
					className="flex min-w-0 items-center gap-2 font-semibold tracking-tight text-white"
				>
					<span className="relative inline-flex h-7 w-7 shrink-0 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/20">
						{logo ? (
							<Image
								src={logo.imageUrl}
								alt={logo.alt}
								fill
								className="object-contain p-1.5"
							/>
						) : (
							<span className="flex h-full w-full items-center justify-center text-xs font-bold text-white/90">
								YP
							</span>
						)}
					</span>
					<span className="truncate">Yuvva Pariwar Foundation</span>
				</Link>

				<SiteNavLinks locale={locale} items={nav} />

				<div className="flex items-center gap-2">
					<MobileMenu items={navLocalized} />
					<LanguageToggle locale={locale} />
				</div>
			</div>
		</header>
	);
}
