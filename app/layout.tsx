import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-space-mono',
})

export const metadata: Metadata = {

  applicationName: 'Building Health X',
  title: 'Building Health X | NYC Building Violations Lookup',
  description:
    'Research any NYC building before signing your lease. Check HPD violations, DOB complaints, pest history, heat issues, and tenant reviews. Free building lookup for all 5 boroughs.',
  keywords: [
    'NYC building check',
    'apartment violations NYC',
    'HPD violations lookup',
    'NYC landlord research',
    'building complaints NYC',
    'NYC apartment search',
    'tenant reviews NYC',
    'DOB violations',
    '311 complaints NYC',
    'bed bugs NYC',
    'heat complaints NYC',
    'rent stabilized apartments',
  ],
  icons: {
    icon: '/favicon-32.png',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },

  openGraph: {
    type: 'website',
    url: 'https://www.buildinghealthx.com',
    siteName: 'Building Health X',
    title: 'Building Health X | NYC Building Violations Lookup',
    description:
      'Research any NYC building before signing your lease. Check HPD violations, DOB complaints, pest history, heat issues, and tenant reviews. Free building lookup for all 5 boroughs.',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Building Health X | NYC Building Violations Lookup',
    description:
      'Research any NYC building before signing your lease. Check HPD violations, DOB complaints, pest history, heat issues, and tenant reviews. Free building lookup for all 5 boroughs.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Building Health X',
              url: 'https://www.buildinghealthx.com',
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Dataset',
              name: 'NYC Building Violations & Complaints Database',
              description:
                'Aggregated dataset of NYC building violations, HPD complaints, DOB records, 311 service requests, pest inspections, and ownership data for 1M+ properties across all 5 boroughs. Updated daily from NYC Open Data.',
              url: 'https://www.buildinghealthx.com',
              creator: {
                '@type': 'Organization',
                name: 'Building Health X',
                url: 'https://www.buildinghealthx.com',
              },
              license: 'https://creativecommons.org/licenses/by/4.0/',
              isAccessibleForFree: true,
              keywords: [
                'NYC building violations',
                'HPD violations',
                'DOB complaints',
                'NYC 311 data',
                'building inspection records',
                'NYC housing data',
                'pest inspection NYC',
                'rent stabilization',
                'ACRIS property records',
                'NYC open data',
              ],
              spatialCoverage: {
                '@type': 'Place',
                name: 'New York City, NY',
              },
              temporalCoverage: '2010/..',
              distribution: [
                {
                  '@type': 'DataDownload',
                  encodingFormat: 'text/html',
                  contentUrl: 'https://www.buildinghealthx.com',
                },
              ],
              includedInDataCatalog: {
                '@type': 'DataCatalog',
                name: 'NYC Open Data',
                url: 'https://opendata.cityofnewyork.us/',
              },
            }),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-88LHQSVE0N"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-88LHQSVE0N');
          `}
        </Script>

        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.setAttribute('data-theme', 'light');
                } else {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            })();
          `}
        </Script>
      </head>

      <body className={`${inter.variable} ${spaceMono.variable} font-sans min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  )
}
