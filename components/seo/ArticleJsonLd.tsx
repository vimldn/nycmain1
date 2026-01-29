import React from "react";

type Props = {
  /** Canonical site origin, e.g. https://www.buildinghealthx.com */
  siteUrl?: string;
  /** Organization / publisher name */
  orgName?: string;
  /** Article headline */
  headline: string;
  /** Relative route, e.g. /news or /blog/some-post */
  url: string;
  /** Optional description / excerpt */
  description?: string;
  /** ISO date string, e.g. 2026-01-30 */
  datePublished?: string;
  /** ISO date string */
  dateModified?: string;
  /** Optional absolute image URL */
  imageUrl?: string;
};

function toAbs(siteUrl: string, url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return siteUrl.replace(/\/+$/, "") + "/" + url.replace(/^\/+/, "");
}

export function ArticleJsonLd({
  siteUrl = "https://www.buildinghealthx.com",
  orgName = "Building Health X",
  headline,
  url,
  description,
  datePublished,
  dateModified,
  imageUrl
}: Props) {
  const data: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    mainEntityOfPage: toAbs(siteUrl, url),
    publisher: {
      "@type": "Organization",
      name: orgName,
      url: siteUrl
    }
  };

  if (description) data.description = description;
  if (datePublished) data.datePublished = datePublished;
  if (dateModified) data.dateModified = dateModified;
  if (imageUrl) data.image = [imageUrl];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
