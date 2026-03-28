import React from "react";

type AreaServed = {
  name: string;
  url: string;
  description?: string;
};

type Props = {
  siteUrl?: string;
  orgName?: string;
  serviceName: string;
  url: string;
  description?: string;
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
  areaServed,
}: Props) {
  const absUrl = toAbs(siteUrl, url);

  const data: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absUrl}#service`,
    name: serviceName,
    url: absUrl,
    provider: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: orgName,
      url: siteUrl,
    },
  };

  if (description) data.description = description;

  if (areaServed) {
    data.areaServed = {
      "@type": "Place",
      name: areaServed.name,
      url: toAbs(siteUrl, areaServed.url),
      ...(areaServed.description ? { description: areaServed.description } : {}),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
