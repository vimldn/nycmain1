import React from "react";

type Props = {
  siteUrl?: string;
  name: string;
  url: string;
  description?: string;
  borough?: string;
};

function toAbs(siteUrl: string, url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return siteUrl.replace(/\/+$/, "") + "/" + url.replace(/^\/+/, "");
}

export function LocationJsonLd({
  siteUrl = "https://www.buildinghealthx.com",
  name,
  url,
  description,
  borough,
}: Props) {
  const absUrl = toAbs(siteUrl, url);

  const data: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absUrl,
    name: `${name}${borough ? `, ${borough}` : ""} — Building Violations & Renter Services`,
    url: absUrl,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@type": "Place",
      name: borough ? `${name}, ${borough}, New York City` : `${name}, New York City`,
      address: {
        "@type": "PostalAddress",
        addressLocality: name,
        addressRegion: "NY",
        addressCountry: "US",
      },
    },
    provider: {
      "@id": `${siteUrl}/#organization`,
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
