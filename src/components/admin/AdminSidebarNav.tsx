"use client";

import Link from "next/link";

import { adminLogoutAction } from "@/app/admin-portal/login/actions";

const nav = [
	{ href: "/admin-portal", label: "Dashboard" },
	{ href: "/admin-portal/carousel-content", label: "Carousel Content" },
	{ href: "/admin-portal/gallery", label: "Gallery" },
	{ href: "/admin-portal/members", label: "Members" },
	{ href: "/admin-portal/inbox", label: "Inbox" },
	{ href: "/admin-portal/leadership", label: "Leadership" },
] as const;

export function AdminSidebarNav() {
	return (
		<aside className="rounded-2xl border border-black/10 bg-white p-5">
			<div className="text-sm font-semibold text-zinc-950">Admin</div>
			<nav className="mt-4 space-y-1">
				{nav.map((n) => (
					<Link
						key={n.href}
						href={n.href}
						className="block rounded-xl px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-[color-mix(in_oklab,var(--color-green)_8%,white)]"
					>
						{n.label}
					</Link>
				))}
			</nav>

			<form action={adminLogoutAction}>
				<button
					type="submit"
					className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-full bg-[var(--color-green)] px-4 text-sm font-semibold text-white"
				>
					Logout
				</button>
			</form>

			<p className="mt-4 text-xs text-zinc-600">
				Tip: Keep your secret code private. Access is protected by middleware +
				httpOnly cookie.
			</p>
		</aside>
	);
}
