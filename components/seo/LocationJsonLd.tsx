import React from "react";

type Props = {
  /** Canonical site origin, e.g. https://www.buildinghealthx.com */
  siteUrl?: string;
  /** Location name shown to users */
  name: string;
  /** Relative route, e.g. /locations/chelsea */
  url: string;
  /** Optional description */
  description?: string;
};

function toAbs(siteUrl: string, url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return siteUrl.replace(/\/+$/, "") + "/" + url.replace(/^\/+/, "");
}

export function LocationJsonLd({
  siteUrl = "https://www.buildinghealthx.com",
  name,
  url,
  description
}: Props) {
  // We model neighborhood/borough pages as Place (safe, flexible).
  const data: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Place",
    name,
    url: toAbs(siteUrl, url)
  };

  if (description) data.description = description;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
