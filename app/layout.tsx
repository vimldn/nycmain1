import type { Metadata } from 'next'
import { Inter, Space_Mono, Bebas_Neue } from 'next/font/google'
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

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-bebas',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.buildinghealthx.com'),
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

        {/* Organization schema — @id anchor lets other pages reference this entity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://www.buildinghealthx.com/#organization',
              name: 'Building Health X',
              url: 'https://www.buildinghealthx.com',
              logo: 'https://www.buildinghealthx.com/icon.png',
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://www.buildinghealthx.com/#website',
              name: 'Building Health X',
              alternateName: 'BuildingHealthX',
              url: 'https://www.buildinghealthx.com',
              publisher: { '@id': 'https://www.buildinghealthx.com/#organization' },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.buildinghealthx.com/api/lookup?address={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
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

      <body className={`${inter.variable} ${spaceMono.variable} ${bebasNeue.variable} font-sans min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  )
}
