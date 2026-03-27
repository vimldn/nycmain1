import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContextualLeadBait from '@/components/ContextualLeadBait'
import { getGuideBySlug, getAllGuides, getCategoryBySlug, getRelatedGuides } from '@/lib/guides-data'
import type { GuideSection } from '@/lib/guides-data'
import { BreadcrumbJsonLd } from '@/components/seo'

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

function renderSection(section: GuideSection, guide: { serviceSlug: string; serviceName: string; leadBaitCta: string }, index: number) {
  switch (section.type) {
    case 'intro':
      return (
        <p key={index} className="text-base text-[var(--text-secondary)] leading-relaxed mb-8">
          {section.body}
        </p>
      )

    case 'heading':
      return (
        <h2 key={index} className="text-xl font-black mt-10 mb-4">
          {section.heading}
        </h2>
      )

    case 'step':
      return (
        <div key={index} className="mb-8">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-xs font-black text-blue-400">
              {section.stepNumber}
            </span>
            <h2 className="text-lg font-black">{section.heading}</h2>
          </div>
          {section.body && (
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4 pl-10">
              {section.body}
            </p>
          )}
          {section.items && (
            <ul className="space-y-2 pl-10">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )

    case 'warning':
      return (
        <div key={index} className="my-6 flex items-start gap-3 p-4 rounded-xl bg-yellow-500/8 border border-yellow-500/25">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 flex-shrink-0 mt-0.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <p className="text-sm text-yellow-300/90 leading-relaxed">{section.body}</p>
        </div>
      )

    case 'tip':
      return (
        <div key={index} className="my-6 flex items-start gap-3 p-4 rounded-xl bg-blue-500/8 border border-blue-500/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p className="text-sm text-blue-300/90 leading-relaxed">{section.body}</p>
        </div>
      )

    case 'list':
      return (
        <ul key={index} className="my-6 space-y-2">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#334155] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'leadbait':
      return (
        <ContextualLeadBait
          key={index}
          serviceSlug={guide.serviceSlug}
          serviceName={guide.serviceName}
          cta={guide.leadBaitCta}
        />
      )

    default:
      return null
  }
}

export default function GuidePage({ params }: Props) {
  const guide = getGuideBySlug(params.slug)
  if (!guide) notFound()

  const category = getCategoryBySlug(guide.category)
  const related = getRelatedGuides(guide.relatedSlugs)

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.buildinghealthx.com' },
          { name: 'Guides', url: 'https://www.buildinghealthx.com/guides' },
          { name: guide.title, url: `https://www.buildinghealthx.com/guides/${guide.slug}` },
        ]}
      />
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
          </article>

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-5">

              {/* Lead form */}
              <div className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
                <div className="text-sm font-semibold mb-1">{guide.leadBaitCta}</div>
                <div className="text-xs text-[#64748b] mb-4">Free quotes · NYC-certified only · No obligation</div>
                <ContextualLeadBait
                  serviceSlug={guide.serviceSlug}
                  serviceName={guide.serviceName}
                  cta={guide.leadBaitCta}
                />
              </div>

              {/* BHX tool CTA */}
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

              {/* All guides link */}
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

      <Footer />
    </div>
  )
}
