"use client";

import { useMemo, useState, useEffect } from "react";

import { approveMemberAction } from "@/app/admin-portal/members/approve/actions";
import type { MemberRow } from "@/lib/cms-members";

function CopyIdButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(id);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      }}
      className="ml-2 inline-flex h-7 items-center justify-center rounded-full border border-black/10 bg-white px-3 text-[11px] font-semibold text-zinc-900 hover:bg-zinc-50"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function AdminMembersTable({ members }: { members: MemberRow[] }) {
  const [q, setQ] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    const x = q.trim().toLowerCase();
    if (!x) return members;

    return members.filter((m) => {
      const hay = [
        m.full_name,
        m.father_name ?? "",
        m.mobile,
        m.designation ?? "",
        m.area ?? "",
        m.district ?? "",
        m.state ?? "",
        m.id,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(x);
    });
  }, [members, q]);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 overflow-hidden max-w-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold text-zinc-950">Members</div>
          <p className="mt-2 text-sm text-zinc-700">Total: {members.length}</p>
        </div>

        <div className="w-full md:max-w-sm">
          <label className="text-sm font-semibold text-zinc-950">Search</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name / Mobile / Area / ID"
            className="mt-1 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]"
          />
        </div>
      </div>

      <div className="mt-5 w-full overflow-hidden rounded-2xl border border-black/10">
        <div className="w-full overflow-x-auto">
          <table className="min-w-[1050px] w-full text-left text-sm">
            <thead className="bg-[color-mix(in_oklab,var(--color-green)_8%,white)]">
              <tr>
                <th className="px-4 py-3 font-semibold text-zinc-950">Name</th>
                <th className="px-4 py-3 font-semibold text-zinc-950">Mobile</th>
                <th className="px-4 py-3 font-semibold text-zinc-950">Father</th>
                <th className="px-4 py-3 font-semibold text-zinc-950">DOB</th>
                <th className="px-4 py-3 font-semibold text-zinc-950">Designation</th>
                <th className="px-4 py-3 font-semibold text-zinc-950">Area</th>
                <th className="px-4 py-3 font-semibold text-zinc-950">District</th>
                <th className="px-4 py-3 font-semibold text-zinc-950">State</th>
                <th className="px-4 py-3 font-semibold text-zinc-950">Blood</th>
                <th className="px-4 py-3 font-semibold text-zinc-950">Status</th>
                <th className="px-4 py-3 font-semibold text-zinc-950">Created</th>
                <th className="px-4 py-3 font-semibold text-zinc-950">Member ID</th>
                <th className="px-4 py-3 font-semibold text-zinc-950">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={13} className="px-4 py-10 text-center text-sm text-zinc-700">
                    No members found.
                  </td>
                </tr>
              ) : (
                filtered.map((m) => (
                  <tr key={m.id} className="border-t border-black/10">
                    <td className="px-4 py-3 font-semibold text-zinc-950">{m.full_name}</td>
                    <td className="px-4 py-3 text-zinc-800">{m.mobile}</td>
                    <td className="px-4 py-3 text-zinc-800">{m.father_name ?? "—"}</td>
                    <td className="px-4 py-3 text-zinc-800">{m.dob ?? "—"}</td>
                    <td className="px-4 py-3 text-zinc-800">{m.designation ?? "—"}</td>
                    <td className="px-4 py-3 text-zinc-800">{m.area ?? "—"}</td>
                    <td className="px-4 py-3 text-zinc-800">{m.district ?? "—"}</td>
                    <td className="px-4 py-3 text-zinc-800">{m.state ?? "—"}</td>
                    <td className="px-4 py-3 text-zinc-800">{m.blood_group ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                          m.status === "approved"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                            : "border-amber-200 bg-amber-50 text-amber-900"
                        }`}
                      >
                        {m.status === "approved" ? "active" : "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-700">
                      {mounted ? new Date(m.created_at).toLocaleString() : ""}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-zinc-800">{m.id}</span>
                      <CopyIdButton id={m.id} />
                    </td>
                    <td className="px-4 py-3">
                      {m.status === "pending" ? (
                        <form action={approveMemberAction}>
                          <input type="hidden" name="id" value={m.id} />
                          <button
                            type="submit"
                            className="inline-flex h-9 items-center justify-center rounded-full bg-[var(--color-green)] px-4 text-xs font-semibold text-white"
                          >
                            Approve
                          </button>
                        </form>
                      ) : (
                        <span className="text-xs text-zinc-600">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-zinc-600">
        Tip: Copy the Member ID to share it with the member for verification.
      </p>
    </div>
  );
}
