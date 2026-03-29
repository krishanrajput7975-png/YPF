export function generateDemoMemberId() {
  // Phase A: client-side demo ID for preview.
  // Format: YP-YYYY-XXXXXX
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `YP-${year}-${rand}`;
}

