"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { uploadGalleryBatchAction } from "@/app/admin-portal/gallery/actions";

type Draft = {
  id: string;
  file: File;
  title: string;
  caption: string;
};

const MAX_FILES = 10;

export function AdminGalleryMultiUploadForm() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const totalSizeMb = useMemo(() => {
    const bytes = drafts.reduce((acc, d) => acc + d.file.size, 0);
    return bytes / (1024 * 1024);
  }, [drafts]);

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(null), 3500);
    return () => clearTimeout(t);
  }, [success]);

  function onPickFiles(files: FileList | null) {
    if (!files) return;

    setError(null);
    setSuccess(null);

    const picked = Array.from(files);
    const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);

    const sanitized = picked.filter((f) => allowed.has(f.type));
    if (sanitized.length !== picked.length) {
      setError("Some files were skipped because only JPG/PNG/WEBP are allowed.");
    }

    setDrafts((prev) => {
      const remaining = MAX_FILES - prev.length;
      const toAdd = sanitized.slice(0, remaining).map((file) => ({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        file,
        title: "",
        caption: "",
      }));

      if (sanitized.length > remaining) {
        setError(`Max ${MAX_FILES} images at a time. Extra files were skipped.`);
      }

      return [...prev, ...toAdd];
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function updateDraft(id: string, patch: Partial<Pick<Draft, "title" | "caption">>) {
    setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  }

  function removeDraft(id: string) {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  }

  async function onSubmit() {
    setError(null);
    setSuccess(null);

    if (drafts.length === 0) {
      setError("Please select at least 1 image.");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      drafts.forEach((d) => {
        fd.append("images", d.file);
        fd.append(`title:${d.file.name}`, d.title);
        fd.append(`caption:${d.file.name}`, d.caption);
      });

      await uploadGalleryBatchAction(fd);

      setDrafts([]);
      setSuccess("Uploaded successfully. Gallery updated.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-4">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
          {success}
        </div>
      ) : null}

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-zinc-950">Select images (max {MAX_FILES})</label>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => onPickFiles(e.target.files)}
          className="block w-full text-sm text-zinc-800 file:mr-4 file:rounded-full file:border-0 file:bg-[color-mix(in_oklab,var(--color-green)_12%,white)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-zinc-950 hover:file:bg-[color-mix(in_oklab,var(--color-green)_18%,white)]"
        />
        <p className="text-xs text-zinc-600">Allowed: JPG/PNG/WEBP. Max 5MB per image. Batch limit: 10 images.</p>
        <p className="text-xs text-zinc-600">Selected: {drafts.length} • Total size: {totalSizeMb.toFixed(2)} MB</p>
      </div>

      {drafts.length ? (
        <div className="grid gap-3">
          {drafts.map((d, idx) => (
            <div key={d.id} className="rounded-2xl border border-black/10 bg-[color-mix(in_oklab,var(--color-green)_6%,white)] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-zinc-950">
                    Image {idx + 1}
                  </div>
                  <div className="mt-1 text-xs text-zinc-700">{(d.file.size / (1024 * 1024)).toFixed(2)} MB</div>
                </div>
                <button
                  type="button"
                  onClick={() => removeDraft(d.id)}
                  className="inline-flex h-9 items-center justify-center rounded-full border border-red-200 bg-white px-4 text-xs font-semibold text-red-700 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-zinc-950">Title</label>
                  <input
                    value={d.title}
                    onChange={(e) => updateDraft(d.id, { title: e.target.value })}
                    className="mt-1 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]"
                    placeholder="e.g. Foundation activity"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-zinc-950">Caption (optional)</label>
                  <input
                    value={d.caption}
                    onChange={(e) => updateDraft(d.id, { caption: e.target.value })}
                    className="mt-1 h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]"
                    placeholder="Short description"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting || drafts.length === 0}
        className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-green)] px-6 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Uploading…" : `Upload ${drafts.length || ""} image${drafts.length === 1 ? "" : "s"}`}
      </button>
    </div>
  );
}
