import React from "react";

type Crumb = {
  name: string;
  /** Absolute or relative URL */
  url: string;
};

type Props = {
  /** Canonical site origin, e.g. https://www.buildinghealthx.com */
  siteUrl?: string;
  items: Crumb[];
};

function toAbs(siteUrl: string, url: string) {
  if (!url) return siteUrl;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return siteUrl.replace(/\/+$/, "") + "/" + url.replace(/^\/+/, "");
}

export function BreadcrumbJsonLd({
  siteUrl = "https://www.buildinghealthx.com",
  items
}: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: toAbs(siteUrl, item.url)
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
