"use client";

import { useState } from "react";

import type { CarouselItem, CarouselKey } from "@/lib/cms-carousels";
import { editCarouselItemAction } from "@/app/admin-portal/carousel-content/actions";

export function EditCarouselItemForm({
  carouselKey,
  item,
}: {
  carouselKey: CarouselKey;
  item: CarouselItem;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 bg-white px-4 text-xs font-semibold text-zinc-950 hover:bg-zinc-50"
      >
        {open ? "Close" : "Edit"}
      </button>

      {open ? (
        <form action={editCarouselItemAction} className="mt-3 grid gap-3">
          <input type="hidden" name="carouselKey" value={carouselKey} />
          <input type="hidden" name="id" value={item.id} />

          <div>
            <label className="text-xs font-semibold text-zinc-950">Heading</label>
            <input
              name="title"
              required
              defaultValue={item.title ?? ""}
              className="mt-1 h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]"
              placeholder="Example: Skill Training"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-950">Description</label>
            <textarea
              name="subtitle"
              rows={4}
              defaultValue={item.subtitle ?? ""}
              className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-[var(--color-green)] focus:ring-4 focus:ring-[color-mix(in_oklab,var(--color-green)_18%,transparent)]"
              placeholder="Write paragraph or bullets (multiple lines supported)."
            />
            <p className="mt-1 text-[11px] text-zinc-600">Tip: use new lines and start a line with • for bullets.</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-950">Replace image (optional)</label>
            <input
              name="image"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="mt-1 block w-full text-xs text-zinc-800 file:mr-4 file:rounded-full file:border-0 file:bg-[color-mix(in_oklab,var(--color-green)_12%,white)] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-zinc-950 hover:file:bg-[color-mix(in_oklab,var(--color-green)_18%,white)]"
            />
            <p className="mt-1 text-[11px] text-zinc-600">Max 5MB.</p>
          </div>

          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-green)] px-5 text-xs font-semibold text-white"
          >
            Save changes
          </button>
        </form>
      ) : null}
    </div>
  );
}
