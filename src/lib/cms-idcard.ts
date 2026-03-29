import { getSiteLogo } from "@/lib/cms-branding";

export type IdCardBranding = {
  logoUrl?: string;
  logoAlt?: string;
};

/**
 * Branding for cards. Uses the same CMS logo used in the site header.
 */
export async function getIdCardBranding(): Promise<IdCardBranding> {
  const logo = await getSiteLogo().catch(() => null);
  if (!logo) return {};
  return {
    logoUrl: logo.imageUrl,
    logoAlt: logo.alt,
  };
}

