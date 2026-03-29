import { env } from "@/lib/env";

// Admin email allowlist is no longer used. Admin access is secret-code based.
// This helper remains to avoid breaking older imports.
export function isAllowedAdminEmail(_email: string | null | undefined) {
  return true;
}
