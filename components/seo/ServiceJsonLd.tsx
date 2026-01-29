import React from "react";

type AreaServed = {
  name: string;
  /** Relative route, e.g. /locations/chelsea */
  url: string;
  /** Optional description */
  description?: string;
};

type Props = {
  /** Canonical site origin, e.g. https://www.buildinghealthx.com */
  siteUrl?: string;
  /** Organization name (provider) */
  orgName?: string;
  /** Service name shown to users */
  serviceName: string;
  /** Relative route, e.g. /services/plumbers or /services/plumbers/chelsea */
  url: string;
  /** Optional service description */
  description?: string;
  /** Optional location (for /services/[service]/[location]) */
  areaServed?: AreaServed;
};

function toAbs(siteUrl: string, url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return siteUrl.replace(/\/+$/, "") + "/" + url.replace(/^\/+/, "");
}

export function ServiceJsonLd({
  siteUrl = "https://www.buildinghealthx.com",
  orgName = "Building Health X",
  serviceName,
  url,
  description,
  areaServed
}: Props) {
  const data: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    url: toAbs(siteUrl, url),
    provider: {
      "@type": "Organization",
      name: orgName,
      url: siteUrl
    }
  };

  if (description) data.description = description;

  if (areaServed) {
    data.areaServed = {
      "@type": "Place",
      name: areaServed.name,
      url: toAbs(siteUrl, areaServed.url),
      ...(areaServed.description ? { description: areaServed.description } : {})
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
