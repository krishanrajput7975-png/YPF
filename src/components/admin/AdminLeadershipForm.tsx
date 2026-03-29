"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { LeadershipMember } from "@/lib/cms-leadership";

export function AdminLeadershipForm({
  member,
  updateAction,
}: {
  member: LeadershipMember;
  updateAction: (formData: FormData) => Promise<void>;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fileRef.current?.files?.[0]) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const fd = new FormData();
    fd.append("id", member.id);
    fd.append("image", fileRef.current.files[0]);

    try {
      await updateAction(fd);
      setSuccess("Updated successfully!");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update image");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-sm font-semibold text-zinc-950">{member.name}</div>
          <p className="text-sm text-zinc-600">{member.role}</p>

          <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="block w-full text-sm text-zinc-800 file:mr-4 file:rounded-full file:border-0 file:bg-[color-mix(in_oklab,var(--color-green)_12%,white)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-zinc-950 hover:file:bg-[color-mix(in_oklab,var(--color-green)_18%,white)]"
            />
            {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
            {success && <p className="text-xs font-semibold text-emerald-600">{success}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-9 w-fit items-center justify-center rounded-full bg-[var(--color-green)] px-5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {submitting ? "Uploading..." : "Upload Image"}
            </button>
          </form>
        </div>

        {member.imageUrl ? (
          <div className="relative h-24 w-24 overflow-hidden rounded-full border border-black/10">
            <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
          </div>
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-black/10 bg-zinc-50 text-xs text-zinc-400">
            No Image
          </div>
        )}
      </div>
    </div>
  );
}

