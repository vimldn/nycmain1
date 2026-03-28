import React from "react";

type Props = {
  siteUrl?: string;
  orgName?: string;
  headline: string;
  url: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
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
  imageUrl,
}: Props) {
  const absUrl = toAbs(siteUrl, url);

  const data: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absUrl}#article`,
    headline,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absUrl,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    author: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: orgName,
      url: siteUrl,
    },
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
