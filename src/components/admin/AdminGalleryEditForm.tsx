"use client";

import { useState } from "react";

import type { GalleryItem } from "@/lib/cms-gallery";
import { editGalleryItemAction } from "@/app/admin-portal/gallery/actions";

export function AdminGalleryEditForm({ item }: { item: GalleryItem }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function onSubmit(formData: FormData) {
    setSubmitting(true);
    setError(null);
    setSaved(false);

    try {
      await editGalleryItemAction(formData);
      setSaved(true);
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setError(null);
          setSaved(false);
        }}
        className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-xs font-semibold text-zinc-950 hover:bg-zinc-50"
      >
        {open ? "Close" : "Edit"}
      </button>

      {saved ? (
        <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
          Saved.
        </div>
      ) : null}
      {error ? (
        <div className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
          {error}
        </div>
      ) : null}

      {open ? (
        <form action={onSubmit} className="mt-3 grid gap-3">
          <input type="hidden" name="id" value={item.id} />

          <div>
            <label className="text-xs font-semibold text-zinc-950">Title (optional)</label>
            <input
              name="title"
              defaultValue={item.title ?? ""}
              className="mt-1 h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]"
              placeholder="Leave blank to show only the image"
            />
            <p className="mt-1 text-[11px] text-zinc-600">
              Blank रखने पर website पर सिर्फ image दिखेगी.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-green)] px-5 text-xs font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Saving…" : "Save"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
