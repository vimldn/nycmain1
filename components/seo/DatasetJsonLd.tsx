import React from "react";

type Props = {
  siteUrl?: string;
};

export function DatasetJsonLd({
  siteUrl = "https://www.buildinghealthx.com",
}: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "NYC Building Violations & Complaints Database",
    description:
      "Aggregated dataset of NYC building violations, HPD complaints, DOB records, 311 service requests, pest inspections, and ownership data for 1M+ properties across all 5 boroughs. Updated daily from NYC Open Data.",
    url: siteUrl,
    creator: {
      "@id": `${siteUrl}/#organization`,
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    keywords: [
      "NYC building violations",
      "HPD violations",
      "DOB complaints",
      "NYC 311 data",
      "building inspection records",
      "NYC housing data",
      "pest inspection NYC",
      "rent stabilization",
      "ACRIS property records",
      "NYC open data",
    ],
    spatialCoverage: {
      "@type": "Place",
      name: "New York City, NY",
    },
    temporalCoverage: "2010/..",
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "text/html",
        contentUrl: siteUrl,
      },
    ],
    includedInDataCatalog: {
      "@type": "DataCatalog",
      name: "NYC Open Data",
      url: "https://opendata.cityofnewyork.us/",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
