import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Press Coverage | Building Health X',
  description: 'Building Health X has been featured across 500+ news outlets including the Boston Herald, Star Tribune, IBTimes, and more. See our press coverage.',
}

interface PressItem {
  name: string
  url: string
  category: 'major' | 'regional' | 'finance' | 'lifestyle'
}

const pressItems: PressItem[] = [
  // Major / Finance
  { name: 'Boston Herald', url: 'http://markets.financialcontent.com/bostonherald/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'major' },
  { name: 'Star Tribune', url: 'http://markets.financialcontent.com/startribune/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'major' },
  { name: 'International Business Times', url: 'http://markets.financialcontent.com/ibtimes/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'major' },
  { name: 'Buffalo News', url: 'https://markets.financialcontent.com/buffnews/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'major' },
  { name: 'Pittsburgh Post-Gazette', url: 'https://markets.financialcontent.com/postgazette/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'major' },
  { name: 'WRAL', url: 'http://markets.financialcontent.com/wral/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'major' },
  { name: 'KUTV', url: 'http://markets.financialcontent.com/fourptsmedia.kutv/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'major' },
  { name: 'OpenPR', url: 'https://www.openpr.com/news/4410289', category: 'major' },
  { name: 'Wedbush Securities', url: 'http://investor.wedbush.com/wedbush/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'finance' },
  { name: 'San Diego Union-Tribune', url: 'https://markets.financialcontent.com/sandiego/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'major' },
  { name: 'Concord Monitor', url: 'http://markets.financialcontent.com/concordmonitor/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'major' },
  { name: 'Business Insurance', url: 'http://index.businessinsurance.com/businessinsurance/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool', category: 'finance' },
  // Regional
  { name: 'Nashville News', url: 'https://nashville.newsnetmedia.com/story/95644/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'regional' },
  { name: 'Los Angeles News', url: 'https://losangeles.newsnetmedia.com/story/95985/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'regional' },
  { name: 'Atlanta News', url: 'https://atlanta.newsnetmedia.com/story/105540/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'regional' },
  { name: 'Miami News', url: 'https://miami.newsnetmedia.com/story/112832/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'regional' },
  { name: 'Las Vegas News', url: 'https://lasvegas.newsnetmedia.com/story/96123/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'regional' },
  { name: 'Detroit News', url: 'https://detroit.newsnetmedia.com/story/103310/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'regional' },
  { name: 'Orlando News', url: 'https://orlando.newsnetmedia.com/story/95846/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'regional' },
  { name: 'Columbus News', url: 'https://columbus.newsnetmedia.com/story/103095/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'regional' },
  // Lifestyle
  { name: 'The Real Deal (Lifestyle)', url: 'https://lifestyle.timesla.com/story/559384/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'lifestyle' },
  { name: 'NYC Times', url: 'https://lifestyle.thenyctimes.com/story/519899/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'lifestyle' },
  { name: 'Houston News Today', url: 'https://lifestyle.houstonnewstoday.com/story/525647/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'lifestyle' },
  { name: 'Washington Guardian', url: 'https://lifestyle.washingtonguardian.com/story/527925/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'lifestyle' },
  { name: 'LA Tabloid', url: 'https://lifestyle.latabloid.com/story/531301/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'lifestyle' },
  { name: 'Long Island Report', url: 'https://lifestyle.longislandreport.org/story/533768/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'lifestyle' },
  { name: 'Mass News', url: 'https://lifestyle.massnews.com/story/524475/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'lifestyle' },
  { name: 'XPR Media', url: 'https://xpr.media/story/657874/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/', category: 'lifestyle' },
]

const categoryLabels: Record<string, string> = {
  major: 'Major News & Broadcast',
  finance: 'Financial & Business',
  regional: 'Regional News Networks',
  lifestyle: 'Lifestyle & Digital Media',
}

export default function PressPage() {
  const grouped = pressItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, PressItem[]>)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />

      <main className="pt-28 pb-16 px-4 max-w-4xl mx-auto">
        <header className="mb-12">
          <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-sm font-semibold rounded-full mb-4 uppercase tracking-wider">
            Press
          </span>
          <h1 className="text-4xl font-bold mb-4">Press Coverage</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl">
            Building Health X has been featured across{' '}
            <strong className="text-[var(--text-primary)]">500+ news outlets</strong>{' '}
            nationwide, from major metropolitan newspapers to regional broadcast networks
            and financial media. Below is a curated selection.
          </p>
        </header>

        {(['major', 'finance', 'regional', 'lifestyle'] as const).map((cat) => (
          grouped[cat] && (
            <section key={cat} className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">
                {categoryLabels[cat]}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {grouped[cat].map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-[var(--border-primary)] hover:border-blue-500/40 hover:bg-[var(--bg-secondary)] transition group"
                  >
                    <span className="font-medium group-hover:text-blue-400 transition">{item.name}</span>
                    <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-blue-400 transition flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </section>
          )
        ))}

        <div className="mt-12 pt-8 border-t border-[var(--border-primary)]">
          <p className="text-sm text-[var(--text-muted)]">
            This is a curated selection of our press coverage. The full distribution reached 500+
            outlets across news, lifestyle, financial, and regional media networks in the United States.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
            >
              Try Building Health X
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border-primary)] hover:border-[var(--border-secondary)] text-sm font-medium rounded-lg transition"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
