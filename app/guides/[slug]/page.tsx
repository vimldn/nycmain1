import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContextualLeadBait from '@/components/ContextualLeadBait'
import { getGuideBySlug, getAllGuides, getCategoryBySlug, getRelatedGuides } from '@/lib/guides-data'
import type { GuideSection } from '@/lib/guides-data'
import { BreadcrumbJsonLd } from '@/components/seo'
import StickyAddressBar from '@/components/StickyAddressBar'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return getAllGuides().map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug)
  if (!guide) return {}
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
  }
}

// ── Schema helpers ────────────────────────────────────────────────────────────

function ArticleJsonLd({ guide, url }: { guide: ReturnType<typeof getGuideBySlug> & object; url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.headline,
    description: guide.metaDescription,
    url,
    datePublished: guide.datePublished ?? '2024-09-01',
    dateModified: guide.dateModified ?? guide.datePublished ?? '2024-09-01',
    author: {
      '@type': 'Organization',
      name: 'Building Health X Editorial Team',
      url: 'https://www.buildinghealthx.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Building Health X',
      url: 'https://www.buildinghealthx.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.buildinghealthx.com/logo.png',
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function FAQPageJsonLd({ guide }: { guide: ReturnType<typeof getGuideBySlug> & object }) {
  const faqSections = guide.content.filter((s: GuideSection) => s.type === 'faq') as Array<{
    type: 'faq'; items: { q: string; a: string }[]
  }>
  if (!faqSections.length) return null
  const allItems = faqSections.flatMap(s => s.items)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function HowToJsonLd({ guide, url }: { guide: ReturnType<typeof getGuideBySlug> & object; url: string }) {
  const stepSections = guide.content.filter((s: GuideSection) => s.type === 'step') as Array<{
    type: 'step'; stepNumber?: number; heading?: string; body?: string
  }>
  if (stepSections.length < 2) return null
  if (!guide.headline.toLowerCase().startsWith('how')) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.headline,
    description: guide.metaDescription,
    url,
    step: stepSections.map(s => ({
      '@type': 'HowToStep',
      name: s.heading,
      text: s.body ?? s.heading,
      position: s.stepNumber ?? 1,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── Section renderer ──────────────────────────────────────────────────────────

let leadBaitRendered = false

function renderSection(
  section: GuideSection,
  guide: { serviceSlug: string; serviceName: string; leadBaitCta: string },
  index: number
) {
  switch (section.type) {
    case 'intro':
      return (
        <p key={index} className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
          {section.body}
        </p>
      )

    case 'h2':
      return (
        <h2 key={index} className="text-xl font-black mt-10 mb-4 text-[#e2e8f0]">
          {section.heading}
        </h2>
      )

    case 'body':
      return (
        <p key={index} className="text-base text-[var(--text-secondary)] leading-relaxed mb-5">
          {section.body}
        </p>
      )

    case 'table':
      if (!section.rows || section.rows.length < 2) return null
      return (
        <div key={index} className="my-6 overflow-x-auto rounded-xl border border-[var(--border-primary)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111827]">
                {section.rows[0].map((cell, ci) => (
                  <th key={ci} className="px-4 py-3 text-left text-xs font-semibold text-[#94a3b8] uppercase tracking-wide border-b border-[#1e293b]">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.slice(1).map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-[#0d1321]' : 'bg-[#111827]/50'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-base text-[var(--text-secondary)] border-b border-[#1e293b]/50 last:border-b-0">
                      {ci === 0 ? <span className="font-medium text-[#e2e8f0]">{cell}</span> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'step':
      return (
        <div key={index} className="mb-8">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-xs font-black text-blue-400">
              {section.stepNumber}
            </span>
            <h2 className="text-xl font-black">{section.heading}</h2>
          </div>
          {section.body && (
            <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-4 pl-10">
              {section.body}
            </p>
          )}
          {section.items && (
            <ul className="space-y-3 pl-10">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-[var(--text-secondary)]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500/50 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )

    case 'warning':
      return (
        <div key={index} className="my-6 flex items-start gap-3 p-4 rounded-xl bg-yellow-500/8 border border-yellow-500/25">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 flex-shrink-0 mt-1">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <p className="text-base text-yellow-300/90 leading-relaxed">{section.body}</p>
        </div>
      )

    case 'tip':
      return (
        <div key={index} className="my-6 flex items-start gap-3 p-4 rounded-xl bg-blue-500/8 border border-blue-500/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 flex-shrink-0 mt-1">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-base text-blue-300/90 leading-relaxed">{section.body}</p>
        </div>
      )

    case 'list':
      return (
        <ul key={index} className="my-6 space-y-3">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base text-[var(--text-secondary)]">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#334155] flex-shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'leadbait':
      if (leadBaitRendered) return null
      leadBaitRendered = true
      return (
        <ContextualLeadBait
          key={index}
          serviceSlug={guide.serviceSlug}
          serviceName={guide.serviceName}
          cta={guide.leadBaitCta}
        />
      )

    case 'stat': {
      const colorMap: Record<string, { bg: string; border: string; val: string; src: string }> = {
        blue:   { bg: 'bg-blue-500/8',   border: 'border-blue-500/20',   val: 'text-blue-300',   src: 'text-blue-400/60'   },
        yellow: { bg: 'bg-yellow-500/8', border: 'border-yellow-500/20', val: 'text-yellow-300', src: 'text-yellow-400/60' },
        green:  { bg: 'bg-green-500/8',  border: 'border-green-500/20',  val: 'text-green-300',  src: 'text-green-400/60'  },
        red:    { bg: 'bg-red-500/8',    border: 'border-red-500/20',    val: 'text-red-300',    src: 'text-red-400/60'    },
      }
      const c = colorMap[section.color ?? 'blue']
      return (
        <div key={index} className={`my-8 flex flex-col items-center text-center p-7 rounded-xl ${c.bg} border ${c.border}`}>
          <span className={`text-4xl font-black mb-2 tabular-nums ${c.val}`}>{section.value}</span>
          <span className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">{section.label}</span>
          {section.source && (
            <span className={`text-xs mt-2 ${c.src}`}>Source: {section.source}</span>
          )}
        </div>
      )
    }

    case 'statrow':
      return (
        <div
          key={index}
          className={`my-8 grid gap-4 ${
            section.stats?.length === 2 ? 'grid-cols-2' :
            section.stats?.length === 3 ? 'sm:grid-cols-3' :
            'sm:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {section.stats?.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
              <span className="text-3xl font-black text-blue-300 mb-1 tabular-nums">{s.value}</span>
              <span className="text-xs text-[var(--text-secondary)] leading-relaxed">{s.label}</span>
              {s.source && <span className="text-[10px] text-[#334155] mt-1">{s.source}</span>}
            </div>
          ))}
        </div>
      )

    case 'faq':
      return (
        <div key={index} className="my-10">
          <h2 className="text-xl font-black mb-5 text-[#e2e8f0]">
            {section.heading ?? 'Frequently asked questions'}
          </h2>
          <div className="space-y-2">
            {section.items?.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none">
                  <span className="text-sm font-semibold text-[#e2e8f0] leading-snug">{item.q}</span>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="text-[#475569] flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-2 border-t border-[var(--border-primary)]">
                  <p className="text-base text-[var(--text-secondary)] leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug)
  if (!guide) notFound()

  const category = getCategoryBySlug(guide.category)
  const related = getRelatedGuides(guide.relatedSlugs)
  leadBaitRendered = false

  const url = `https://www.buildinghealthx.com/guides/${guide.slug}`

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.buildinghealthx.com' },
          { name: 'Guides', url: 'https://www.buildinghealthx.com/guides' },
          { name: guide.title, url },
        ]}
      />
      <ArticleJsonLd guide={guide} url={url} />
      <FAQPageJsonLd guide={guide} />
      <HowToJsonLd guide={guide} url={url} />

      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12">

          {/* ── Main content ── */}
          <article className="min-w-0">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-[#475569] mb-8">
              <Link href="/" className="hover:text-[#94a3b8] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-[#94a3b8] transition-colors">Guides</Link>
              <span>/</span>
              {category && (
                <>
                  <span className="text-[#64748b]">{category.title}</span>
                  <span>/</span>
                </>
              )}
              <span className="text-[var(--text-secondary)] truncate">{guide.title}</span>
            </nav>

            {/* Category pill */}
            {category && (
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 bg-${category.color}-500/10 text-${category.color}-300 border border-${category.color}-500/20`}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={category.icon} />
                </svg>
                {category.title}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black mb-3 leading-tight">{guide.headline}</h1>
            <p className="text-[var(--text-secondary)] text-base mb-10 leading-relaxed">{guide.subheadline}</p>

            {/* Content sections */}
            <div>
              {guide.content.map((section, i) => renderSection(section, guide, i))}
            </div>

            {/* Related guides */}
            {related.length > 0 && (
              <div className="mt-14 pt-8 border-t border-[var(--border-primary)]">
                <h3 className="text-base font-black mb-5">Related guides</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {related.map(r => (
                    <Link
                      key={r.slug}
                      href={`/guides/${r.slug}`}
                      className="group p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-blue-500/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold leading-snug group-hover:text-blue-300 transition-colors">{r.title}</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#334155] group-hover:text-blue-400 flex-shrink-0 mt-0.5 transition-colors">
                          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related service pages */}
            {guide.relatedServicePages.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-[#64748b] mb-3">Find a {guide.serviceName.toLowerCase()} near you</h3>
                <div className="flex flex-wrap gap-2">
                  {guide.relatedServicePages.map(sp => (
                    <Link
                      key={sp.href}
                      href={sp.href}
                      className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-primary)] text-xs text-[#64748b] hover:text-[#94a3b8] hover:border-[#334155] transition-colors"
                    >
                      {sp.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Further Reading */}
            {guide.furtherReading?.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[var(--border-primary)]">
                <h3 className="text-base font-black mb-5">Further reading</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {guide.furtherReading.map(post => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-blue-500/30 transition-colors"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-md bg-[#1e293b] flex items-center justify-center mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#64748b]">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                      </div>
                      <span className="text-sm text-[var(--text-secondary)] leading-snug group-hover:text-blue-300 transition-colors">
                        {post.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Official Government Links */}
            {guide.govLinks?.length > 0 && (
              <div className="mt-10">
                <h3 className="text-base font-black mb-5">Official resources</h3>
                <div className="space-y-3">
                  {guide.govLinks.map(link => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[#334155] transition-colors"
                    >
                      <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#1e293b] flex items-center justify-center mt-0.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#64748b]">
                          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-[#e2e8f0] group-hover:text-blue-300 transition-colors">{link.label}</span>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#334155] flex-shrink-0">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </div>
                        <p className="text-xs text-[#64748b] leading-relaxed">{link.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-5">

              <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400" />
                <div className="p-5">
                  <p className="text-sm font-semibold text-[#e2e8f0] leading-snug mb-1">
                    Get free quotes from NYC-certified {guide.serviceName.toLowerCase()} today
                  </p>
                  <p className="text-xs text-[#64748b] mb-4">Free · No obligation · Response within 24 hours</p>
                  <Link
                    href={`/services/${guide.serviceSlug}`}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-semibold text-white w-full"
                  >
                    Find {guide.serviceName} in NYC
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-blue-500/8 border border-blue-500/20">
                <div className="text-sm font-semibold mb-2">Check your building's BHX Score</div>
                <p className="text-xs text-[#64748b] mb-4 leading-relaxed">
                  Search any NYC address to see its full violation history, complaint trends, and 0–100 health score before you sign or buy.
                </p>
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-semibold text-white"
                >
                  Search a building
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </Link>
              </div>

              <Link
                href="/guides"
                className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[#334155] transition-colors group"
              >
                <span className="text-sm font-semibold group-hover:text-blue-300 transition-colors">Browse all guides</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#334155] group-hover:text-blue-400 transition-colors">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <StickyAddressBar />
      <Footer />
    </div>
  )
}
