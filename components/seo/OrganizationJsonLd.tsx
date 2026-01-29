import React from "react";

type Props = {
  /** Canonical site origin, e.g. https://www.buildinghealthx.com */
  siteUrl?: string;
  /** Brand / organization name */
  name?: string;
  /** Optional absolute logo URL */
  logoUrl?: string;
  /** Optional sameAs profile URLs (socials, Crunchbase, etc.) */
  sameAs?: string[];
};

export function OrganizationJsonLd({
  siteUrl = "https://www.buildinghealthx.com",
  name = "Building Health X",
  logoUrl,
  sameAs
}: Props) {
  const data: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: siteUrl
  };

  if (logoUrl) data.logo = logoUrl;
  if (sameAs?.length) data.sameAs = sameAs;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
