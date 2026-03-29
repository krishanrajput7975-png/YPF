// Temporary manual test helper (not imported anywhere)
// You can delete this file later.

import { updateGalleryItem } from "@/lib/cms-gallery";

export async function __testUpdateGalleryItem(id: string) {
  return updateGalleryItem(id, { title: "", caption: "" });
}
