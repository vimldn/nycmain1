import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Press Coverage | Building Health X — As Seen on 500+ News Outlets',
  description: 'Building Health X has been featured across 500+ news outlets including Boston Herald, Star Tribune, IBTimes, and major broadcast networks. See our full press coverage.',
  alternates: { canonical: 'https://www.buildinghealthx.com/press/' },
}

interface PressItem {
  name: string
  url: string
  date: string
  headline: string
  excerpt: string
  category: 'major' | 'regional' | 'finance' | 'lifestyle'
}

const trustBannerOutlets = [
  'Boston Herald',
  'Star Tribune',
  'IBTimes',
  'Post-Gazette',
  'Buffalo News',
  'WRAL',
  'KUTV',
  'OpenPR',
  'San Diego Union-Tribune',
  'Concord Monitor',
]

const pressItems: PressItem[] = [
  {
    name: 'Boston Herald',
    url: 'http://markets.financialcontent.com/bostonherald/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'A new platform aggregates 55+ official NYC data sources to give renters instant access to building violations, pest history, and safety records before signing a lease.',
    category: 'major',
  },
  {
    name: 'Star Tribune',
    url: 'http://markets.financialcontent.com/startribune/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'Building Health X launches as a free tool helping New York City renters research DOB violations, HPD complaints, pest inspections, and 311 records for any address.',
    category: 'major',
  },
  {
    name: 'International Business Times',
    url: 'http://markets.financialcontent.com/ibtimes/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'NYC renters can now check building safety records from 55+ government databases in seconds, covering violations, heating complaints, and fire safety compliance.',
    category: 'major',
  },
  {
    name: 'Pittsburgh Post-Gazette',
    url: 'https://markets.financialcontent.com/postgazette/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'The platform provides transparency into NYC building conditions, pulling live data on DOB and HPD violations, rodent inspections, and tenant complaint histories.',
    category: 'major',
  },
  {
    name: 'Buffalo News',
    url: 'https://markets.financialcontent.com/buffnews/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'A free building lookup tool launches for New York City, offering renters and buyers detailed safety and violation data across all five boroughs.',
    category: 'major',
  },
  {
    name: 'WRAL',
    url: 'http://markets.financialcontent.com/wral/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'Building Health X connects renters with official city inspection data, helping them avoid problem buildings before committing to a lease.',
    category: 'major',
  },
  {
    name: 'KUTV',
    url: 'http://markets.financialcontent.com/fourptsmedia.kutv/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'The tool consolidates scattered NYC housing data into one searchable platform covering violations, pest reports, and building safety compliance.',
    category: 'major',
  },
  {
    name: 'San Diego Union-Tribune',
    url: 'https://markets.financialcontent.com/sandiego/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'New York City renters gain a powerful new resource for checking building health scores, violation histories, and tenant complaint patterns.',
    category: 'major',
  },
  {
    name: 'Concord Monitor',
    url: 'http://markets.financialcontent.com/concordmonitor/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'Building Health X offers instant building reports pulling from DOB, HPD, FDNY, and Department of Health databases for every NYC address.',
    category: 'major',
  },
  {
    name: 'OpenPR',
    url: 'https://www.openpr.com/news/4410289',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'Official press release announcing the launch of Building Health X as the most comprehensive free building research platform for New York City.',
    category: 'major',
  },
  {
    name: 'Wedbush Securities',
    url: 'http://investor.wedbush.com/wedbush/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'Investment and real estate professionals gain access to a new data platform covering NYC building inspection records, violation trends, and safety compliance.',
    category: 'finance',
  },
  {
    name: 'Business Insurance',
    url: 'http://index.businessinsurance.com/businessinsurance/article/getnews-2026-3-2-introducing-building-health-x-the-comprehensive-nyc-building-research-tool',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'The platform helps insurance and property professionals assess building risk profiles using official violation and complaint data from NYC agencies.',
    category: 'finance',
  },
  {
    name: 'Los Angeles News Network',
    url: 'https://losangeles.newsnetmedia.com/story/95985/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'A new building transparency tool launches in New York City, providing free access to violation records, pest history, and heating complaint data.',
    category: 'regional',
  },
  {
    name: 'Atlanta News Network',
    url: 'https://atlanta.newsnetmedia.com/story/105540/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'NYC renters now have a one-stop resource for checking building health before signing a lease, covering 55+ official government data sources.',
    category: 'regional',
  },
  {
    name: 'Miami News Network',
    url: 'https://miami.newsnetmedia.com/story/112832/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'Building Health X provides instant reports on any NYC building, pulling data from DOB, HPD, FDNY, and the Department of Health databases.',
    category: 'regional',
  },
  {
    name: 'Nashville News Network',
    url: 'https://nashville.newsnetmedia.com/story/95644/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'The free platform helps NYC apartment hunters research building violations, safety records, and tenant complaint patterns before committing.',
    category: 'regional',
  },
  {
    name: 'Detroit News Network',
    url: 'https://detroit.newsnetmedia.com/story/103310/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'A comprehensive building research tool launches for New York City, consolidating publicly available inspection and violation data into a single platform.',
    category: 'regional',
  },
  {
    name: 'NYC Times',
    url: 'https://lifestyle.thenyctimes.com/story/519899/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'Building Health X launches as a go-to resource for NYC renters wanting to research building safety, violations, and maintenance patterns before signing.',
    category: 'lifestyle',
  },
  {
    name: 'Washington Guardian',
    url: 'https://lifestyle.washingtonguardian.com/story/527925/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'A free building lookup tool provides NYC renters with instant access to 55+ government datasets covering building health and safety records.',
    category: 'lifestyle',
  },
  {
    name: 'Houston News Today',
    url: 'https://lifestyle.houstonnewstoday.com/story/525647/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'The platform delivers building violation reports, pest inspection results, and complaint histories for every New York City address.',
    category: 'lifestyle',
  },
  {
    name: 'Long Island Report',
    url: 'https://lifestyle.longislandreport.org/story/533768/introducing-building-health-x-the-comprehensive-nyc-building-research-tool/',
    date: 'March 2, 2026',
    headline: 'Introducing Building Health X — The Comprehensive NYC Building Research Tool',
    excerpt: 'Building Health X gives New Yorkers a data-driven way to evaluate buildings across all five boroughs before making rental or purchase decisions.',
    category: 'lifestyle',
  },
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

      <main className="pt-28 pb-16 px-4 max-w-5xl mx-auto">

        {/* ── H1 + Keyword-rich intro with internal links ── */}
        <header className="mb-10">
          <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-sm font-semibold rounded-full mb-4 uppercase tracking-wider">
            Press
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">Building Health X in the News</h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            Since launching as the most comprehensive
            NYC building violations lookup tool, Building Health X has been featured across{' '}
            <strong className="text-[var(--text-primary)]">500+ news outlets</strong>{' '}
            nationwide. Our platform helps renters research
            renter safety reports, NYC building inspection data, and complaint histories across all five boroughs — pulling from
            55+ official government data sources.
          </p>
        </header>

        {/* ── "As Seen On" Greyscale Trust Banner ── */}
        <div className="mb-14 py-8 px-6 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)]/50">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6">
            As Seen On
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
            {trustBannerOutlets.map((name) => (
              <span
                key={name}
                className="text-base sm:text-lg md:text-xl font-extrabold select-none"
                style={{ opacity: 0.35, filter: 'grayscale(100%)' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* ── Media Cards by Category ── */}
        {(['major', 'finance', 'regional', 'lifestyle'] as const).map((cat) => (
          grouped[cat] && (
            <section key={cat} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                {categoryLabels[cat]}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {grouped[cat].map((item) => (
                  <article
                    key={item.url}
                    className="rounded-xl border border-[var(--border-primary)] hover:border-blue-500/40 bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)] transition-all group overflow-hidden"
                  >
                    <div className="p-5">
                      {/* Publication name + Date */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-blue-400">
                          Published on {item.name}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] whitespace-nowrap ml-3">{item.date}</span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-base font-semibold mb-2 leading-snug group-hover:text-blue-400 transition line-clamp-2">
                        {item.headline}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>

                      {/* CTA Button */}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition"
                      >
                        Read Full Article
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )
        ))}

        {/* ── Bottom CTA + Internal Link Bridge ── */}
        <div className="mt-14 pt-10 border-t border-[var(--border-primary)]">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold mb-3">About This Coverage</h2>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
              This page shows a curated selection of our press coverage. The full distribution
              reached over 500 outlets across news, lifestyle, financial, and regional media
              networks across the United States. Building Health X is the only
              free NYC building research tool that aggregates data from 55+ official sources into a single searchable report
              for every address in all five boroughs.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition"
            >
              Try Building Health X
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-primary)] hover:border-[var(--border-secondary)] text-sm font-semibold rounded-xl transition"
            >
              Read Our Blog
            </Link>
            <Link
              href="/blog/building-health-x-launches-nyc-building-research-tool"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-primary)] hover:border-[var(--border-secondary)] text-sm font-semibold rounded-xl transition"
            >
              Read the Launch Post
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
