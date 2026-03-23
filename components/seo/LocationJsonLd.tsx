import React from "react";

type Props = {
  /** Canonical site origin, e.g. https://www.buildinghealthx.com */
  siteUrl?: string;
  /** Organization name */
  orgName?: string;
  /** Location / neighborhood name shown to users */
  name: string;
  /** Relative route, e.g. /locations/chelsea */
  url: string;
  /** Optional description */
  description?: string;
  /** NYC borough name, e.g. Manhattan */
  borough?: string;
};

function toAbs(siteUrl: string, url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return siteUrl.replace(/\/+$/, "") + "/" + url.replace(/^\/+/, "");
}

export function LocationJsonLd({
  siteUrl = "https://www.buildinghealthx.com",
  orgName = "Building Health X",
  name,
  url,
  description,
  borough,
}: Props) {
  // ProfessionalService is more accurate than LocalBusiness for a lead-gen
  // directory without a physical storefront in each neighborhood.
  const data: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${orgName} — ${name}`,
    url: toAbs(siteUrl, url),
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    areaServed: {
      "@type": "Place",
      name: borough ? `${name}, ${borough}, New York City` : name,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: name,
      addressRegion: "NY",
      addressCountry: "US",
    },
  };

  if (description) data.description = description;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
