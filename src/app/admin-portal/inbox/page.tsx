import Link from "next/link";

import { AdminModuleShell } from "@/components/admin/AdminModuleShell";
import { getContactMessages } from "@/lib/cms-contact-messages";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminInboxPage() {
	let messages: Awaited<ReturnType<typeof getContactMessages>> = [];
	let loadError: string | null = null;

	try {
		messages = await getContactMessages();
	} catch (e) {
		loadError = e instanceof Error ? e.message : "Failed to load messages.";
	}

	return (
		<AdminModuleShell
			title="Inbox"
			description="Messages submitted from the Contact page."
		>
			<div className="flex items-center justify-between gap-3">
				<Link
					href="/admin-portal"
					className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-xs font-semibold text-zinc-950 hover:bg-zinc-50"
				>
					← Back
				</Link>
			</div>

			{loadError ? (
				<div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
					<div className="font-semibold">Inbox error</div>
					<div className="mt-2 break-words">{loadError}</div>
				</div>
			) : null}

			<div className="mt-5 rounded-2xl border border-black/10 bg-white">
				{messages.length === 0 ? (
					<div className="p-6 text-sm text-zinc-700">No messages yet.</div>
				) : (
					<ul className="divide-y divide-black/5">
						{messages.map((m) => (
							<li key={m.id} className="p-5">
								<div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
									<div className="min-w-0">
										<div className="text-sm font-semibold text-zinc-950">{m.name}</div>
										<div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-700">
											{m.phone ? <span>📞 {m.phone}</span> : null}
											{m.email ? <span>✉️ {m.email}</span> : null}
										</div>
										<p className="mt-3 whitespace-pre-wrap break-words overflow-hidden text-sm leading-6 text-zinc-800">
											{m.message}
										</p>
									</div>

									<div className="shrink-0 text-xs text-zinc-500">
										{new Date(m.createdAt).toLocaleString("en-IN")}
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>

			<div className="mt-3 text-xs text-zinc-500">
				Total:{" "}
				<span className="font-semibold text-zinc-700">{messages.length}</span>
				<span className="mx-2">•</span>
				Tip: Hard refresh if you just submitted a message.
			</div>
		</AdminModuleShell>
	);
}
