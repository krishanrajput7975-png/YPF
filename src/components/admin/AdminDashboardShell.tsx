import Link from "next/link";

import { AdminSidebarNav } from "@/components/admin/AdminSidebarNav";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { getGalleryItems } from "@/lib/cms-gallery";
import { getCarouselItems } from "@/lib/cms-carousels";
import { getAllMembers } from "@/lib/cms-members";
import { env } from "@/lib/env";
import { getSiteLogo } from "@/lib/cms-branding";
import { uploadSiteLogoAction } from "@/app/admin-portal/site-branding/actions";
import { getLatestUpdates } from "@/lib/cms-latest";
import { addLatestUpdateAction, deleteLatestUpdateAction } from "@/app/admin-portal/latest/actions";
import { getLiveProgram } from "@/lib/cms-live-program";
import { updateLiveProgramAction } from "@/app/admin-portal/live-program/actions";

type Metric = {
	label: string;
	value: string;
	hint: string;
	href: string;
};

function SetupPill({ ok, label }: { ok: boolean; label: string }) {
	return (
		<span
			className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
				ok
					? "border-emerald-200 bg-emerald-50 text-emerald-800"
					: "border-amber-200 bg-amber-50 text-amber-900"
			}`}
		>
			{label}: {ok ? "OK" : "Missing"}
		</span>
	);
}

export async function AdminDashboardShell() {
	const supabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey);
	const adminSecretConfigured = Boolean(process.env.ADMIN_PORTAL_SECRET);

	const [hero, awards, initiatives, gallery, members, logo, latest, liveProgram] = await Promise.all([
		getCarouselItems("home_hero").catch(() => []),
		getCarouselItems("home_awards").catch(() => []),
		getCarouselItems("home_initiatives").catch(() => []),
		getGalleryItems().catch(() => []),
		getAllMembers().catch(() => []),
		getSiteLogo().catch(() => null),
		getLatestUpdates().catch(() => []),
		getLiveProgram().catch(() => null),
	]);

	const activeApprovedCount = members.filter((m) => m.status === "approved").length;

	const metrics: Metric[] = [
		{
			label: "Hero banners",
			value: `${hero.length}`,
			hint: "Home page right-side carousel",
			href: "/admin-portal/carousel-content",
		},
		{
			label: "Awards banners",
			value: `${awards.length}`,
			hint: "Home page achievements carousel",
			href: "/admin-portal/carousel-content",
		},
		{
			label: "Gallery images",
			value: `${gallery.length}`,
			hint: "Public /gallery page",
			href: "/admin-portal/gallery",
		},
		{
			label: "Members",
			value: `${members.length}`,
			hint: "Registrations received",
			href: "/admin-portal/members",
		},
	];

	const defaultLiveTitle = liveProgram?.title ?? "";
	const defaultLiveLocation = liveProgram?.location ?? "";
	const defaultLiveActive = Boolean(liveProgram?.isActive);

	return (
		<div className="grid gap-6 lg:grid-cols-[260px_1fr]">
			<div className="hidden lg:block">
				<AdminSidebarNav />
			</div>

			<section className="grid gap-6">
				<header className="rounded-2xl border border-black/10 bg-white p-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
						<div>
							<div className="text-sm font-semibold text-zinc-950">Dashboard</div>
							<p className="mt-2 text-sm text-zinc-700">
								Minimal CMS scope: manage{" "}
								<span className="font-semibold">Carousel Content</span> +{" "}
								<span className="font-semibold">Gallery</span>. Registrations appear in Members.
							</p>
							<div className="mt-4 flex flex-wrap gap-2">
								<SetupPill ok={adminSecretConfigured} label="ADMIN_PORTAL_SECRET" />
								<SetupPill ok={supabaseConfigured} label="Supabase" />
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<div className="flex items-center justify-between gap-3 lg:hidden">
								<AdminMobileNav />
								<Link
									href="/"
									className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-green)] px-5 text-xs font-semibold text-white"
								>
									View Website
								</Link>
							</div>

							<div className="hidden flex-col gap-3 lg:flex">
								<Link
									href="/"
									className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-green)] px-5 text-xs font-semibold text-white"
								>
									View Website
								</Link>
								<Link
									href="/admin-portal/carousel-content"
									className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-xs font-semibold text-zinc-950 hover:bg-zinc-50"
								>
									Update Banners
								</Link>
							</div>
						</div>
					</div>

					{!supabaseConfigured ? (
						<div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
							<div className="font-semibold">Setup required</div>
							<p className="mt-2">
								Supabase env vars are not configured yet. Once you add them, this dashboard and all CMS modules will
								start showing real data.
							</p>
							<ul className="mt-3 space-y-1 text-sm">
								<li>• Set NEXT_PUBLIC_SUPABASE_URL</li>
								<li>• Set NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
								<li>• Create Storage bucket: site-media (public)</li>
							</ul>
						</div>
					) : null}
				</header>

				<div className="grid gap-4">
					<div className="rounded-2xl border border-black/10 bg-white p-6 lg:col-span-2">
						<div className="text-sm font-semibold text-zinc-950">Quick actions</div>
						<p className="mt-2 text-sm text-zinc-700">Common tasks to keep the website updated.</p>

						<div className="mt-5 grid gap-3">
							<QuickAction
								title="Add Hero banner"
								body="Upload a new Home hero image with title/subtitle."
								href="/admin-portal/carousel-content"
							/>
							<QuickAction
								title="Add Awards banner"
								body="Update achievements/recognition banner carousel."
								href="/admin-portal/carousel-content"
							/>
							<QuickAction
								title="Upload Gallery photos"
								body="Add activity images that appear on /gallery."
								href="/admin-portal/gallery"
							/>
							<QuickAction
								title="Check new members"
								body="View the latest registrations submitted from the website."
								href="/admin-portal/members"
							/>
						</div>

						<div className="mt-6 rounded-2xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-5">
							<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
								<div>
									<div className="text-sm font-semibold text-zinc-950">Navbar logo icon</div>
									<p className="mt-2 text-sm text-zinc-700">
										This small icon appears before “Yuvva Pariwar Foundation” in the top navbar.
									</p>
									<p className="mt-2 text-xs text-zinc-600">
										Recommended: square icon (256×256). Allowed: SVG/PNG/JPG/WEBP. Max 2MB.
									</p>
								</div>
								<div className="rounded-2xl border border-black/10 bg-white p-4">
									<div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">Current</div>
									<div className="mt-3 flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[var(--color-green-deep)] text-xs font-bold text-white">
											{logo ? "" : "YP"}
										</div>
										<div className="text-xs text-zinc-700">
											{logo ? "Custom logo set" : "Default placeholder"}
										</div>
									</div>
								</div>
							</div>

							<form action={uploadSiteLogoAction} className="mt-4 grid gap-4 md:grid-cols-2">
								<div>
									<label className="text-sm font-semibold text-zinc-950">Alt text (optional)</label>
									<input
										name="alt"
										className="mt-1 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]"
										placeholder="Yuvva Pariwar Foundation logo"
									/>
								</div>
								<div>
									<label className="text-sm font-semibold text-zinc-950">Logo file</label>
									<input
										name="logo"
										type="file"
										accept="image/svg+xml,image/png,image/jpeg,image/webp"
										required
										className="mt-1 block w-full text-sm text-zinc-800 file:mr-4 file:rounded-full file:border-0 file:bg-[color-mix(in_oklab,var(--color-green)_12%,white)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-zinc-950 hover:file:bg-[color-mix(in_oklab,var(--color-green)_18%,white)]"
									/>
								</div>
								<div className="md:col-span-2">
									<button
										type="submit"
										disabled={!supabaseConfigured}
										className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
									>
										Upload logo icon
									</button>
									{!supabaseConfigured ? (
										<p className="mt-2 text-xs text-amber-900">
											Supabase is not configured yet, so uploads are disabled.
										</p>
									) : null}
								</div>
							</form>
						</div>
					</div>

					<div className="rounded-2xl border border-black/10 bg-white p-6">
						<div className="text-sm font-semibold text-zinc-950">System notes</div>
						<ul className="mt-3 space-y-2 text-sm text-zinc-700">
							<li>• Admin access is secret-code based (single admin).</li>
							<li>• CMS scope is limited intentionally to keep it fast and stable.</li>
							<li>• Most site pages remain static in code (About/Contact/etc.).</li>
							<li>• Banners + Gallery reflect immediately after upload.</li>
						</ul>

						<div className="mt-5 rounded-2xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-4">
							<div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">Hero: Latest updates</div>
							<p className="mt-2 text-sm text-zinc-700">
								These lines appear in the small “Latest” card on the Home hero section.
							</p>

							<form action={addLatestUpdateAction} className="mt-4 grid gap-3">
								<div>
									<label className="text-xs font-semibold text-zinc-700">Title</label>
									<input
										name="title"
										placeholder="(e.g.) Blood donation camp this Sunday"
										className="mt-1 h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]"
										required
									/>
								</div>
								<div>
									<label className="text-xs font-semibold text-zinc-700">Subtitle (optional)</label>
									<input
										name="subtitle"
										placeholder="One short line (location / date / message)"
										className="mt-1 h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]"
									/>
								</div>
								<button
									type="submit"
									disabled={!supabaseConfigured}
									className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-green)] px-5 text-xs font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
								>
									Add update
								</button>
								{!supabaseConfigured ? (
									<p className="text-xs text-amber-900">Supabase is not configured yet, so updates are disabled.</p>
								) : null}
							</form>

							<div className="mt-5 grid gap-2">
								{latest.length === 0 ? (
									<div className="rounded-xl border border-dashed border-black/15 bg-white px-3 py-4 text-xs text-zinc-600">
										No updates yet.
									</div>
								) : (
									latest.slice(0, 3).map((it) => (
										<div key={it.id} className="rounded-xl border border-black/10 bg-white p-3">
											<div className="text-xs font-semibold text-zinc-950">{it.title}</div>
											{it.subtitle ? <div className="mt-1 text-xs text-zinc-700">{it.subtitle}</div> : null}
											<form action={deleteLatestUpdateAction} className="mt-3">
												<input type="hidden" name="id" value={it.id} />
												<button
													type="submit"
													className="inline-flex h-8 items-center justify-center rounded-full border border-red-200 bg-white px-3 text-[11px] font-semibold text-red-700 hover:bg-red-50"
												>
													Delete
												</button>
											</form>
										</div>
									))
								)}
							</div>
						</div>

						<div className="mt-5 rounded-2xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-4">
							<div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">Home initiatives</div>
							<p className="mt-2 text-sm text-zinc-700">
								Items configured: <span className="font-semibold text-zinc-950">{initiatives.length}</span>
							</p>
							<p className="mt-2 text-xs text-zinc-600">
								(Optional) If you later add an initiatives carousel section on home, it will use this list.
							</p>
						</div>
					</div>

					<div className="rounded-2xl border border-black/10 bg-white p-6">
						<div className="text-sm font-semibold text-zinc-950">Live कार्यक्रम (Home)</div>
						<p className="mt-2 text-sm text-zinc-700">
							Home page par “Live कार्यक्रम” box me ongoing activity ka name aur location show hoga.
						</p>

						<form action={updateLiveProgramAction} className="mt-4 grid gap-3">
							<div>
								<label className="text-xs font-semibold text-zinc-700">Program name</label>
								<input
									name="title"
									defaultValue={defaultLiveTitle}
									placeholder="(e.g.) Blood Donation Camp"
									className="mt-1 h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-950 outline-none focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]"
								/>
							</div>
							<div>
								<label className="text-xs font-semibold text-zinc-700">Location</label>
								<input
									name="location"
									defaultValue={defaultLiveLocation}
									placeholder="(e.g.) Hanumangarh, Rajasthan"
									className="mt-1 h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-950 outline-none focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]"
								/>
							</div>

							<label className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-zinc-800">
								<input
									name="isActive"
									type="checkbox"
									defaultChecked={defaultLiveActive}
									className="h-4 w-4 rounded border border-black/20"
								/>
								Show as LIVE
							</label>

							<button
								type="submit"
								disabled={!supabaseConfigured}
								className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-green)] px-5 text-xs font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
							>
								Save live program
							</button>
							{!supabaseConfigured ? (
								<p className="text-xs text-amber-900">Supabase is not configured yet, so saving is disabled.</p>
							) : null}
						</form>

						<div className="mt-4 rounded-2xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-4">
							<div className="text-xs font-semibold uppercase tracking-wide text-zinc-700">Preview</div>
							<div className="mt-2 text-sm font-semibold text-zinc-950">
								{defaultLiveActive ? (defaultLiveTitle || "(no title)") : "OFF"}
							</div>
							<div className="mt-1 text-xs text-zinc-700">
								{defaultLiveActive ? (defaultLiveLocation || "(no location)") : ""}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

function QuickAction({ title, body, href }: { title: string; body: string; href: string }) {
	return (
		<Link
			href={href}
			className="rounded-2xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-4 hover:bg-[color-mix(in_oklab,var(--color-green)_10%,white)]"
		>
			<div className="text-sm font-semibold text-zinc-950">{title}</div>
			<p className="mt-2 text-sm text-zinc-700">{body}</p>
			<div className="mt-3 text-xs font-semibold text-[var(--color-green)]">Open →</div>
		</Link>
	);
}
