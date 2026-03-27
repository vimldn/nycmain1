import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GUIDE_CATEGORIES, GUIDES, getGuidesByCategory } from '@/lib/guides-data'
import { BreadcrumbJsonLd } from '@/components/seo'

export const metadata: Metadata = {
  title: 'NYC Tenant & Landlord Guides: Fix Violations, Pests & Building Issues | Building Health X',
  description:
    'Expert guides on clearing NYC HPD/DOB violations, handling pest infestations, and hiring certified local contractors. Step-by-step answers for tenants and landlords.',
}

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.buildinghealthx.com' },
          { name: 'Guides', url: 'https://www.buildinghealthx.com/guides' },
        ]}
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-28 pb-20">

        {/* Hero */}
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
              Knowledge Hub
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#1e293b] text-[#94a3b8]">
              {GUIDES.length} guides
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Navigate NYC Real Estate Like a Pro.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            From clearing stubborn HPD violations to finding emergency contractors — step-by-step guides and instant connections to verified NYC professionals.
          </p>
        </div>

        {/* Category sections */}
        <div className="space-y-14">
          {GUIDE_CATEGORIES.map(cat => {
            const guides = getGuidesByCategory(cat.slug)
            if (!guides.length) return null
            return (
              <section key={cat.slug}>
                {/* Category header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-${cat.color}-500/10 border border-${cat.color}-500/20 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={`text-${cat.color}-400`}>
                      <path d={cat.icon} />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-black mb-1">{cat.title}</h2>
                    <p className="text-sm text-[var(--text-secondary)]">{cat.description}</p>
                  </div>
                </div>

                {/* Guide cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                  {guides.map(guide => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="group p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-blue-500/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-sm font-semibold leading-snug group-hover:text-blue-300 transition-colors">
                          {guide.title}
                        </h3>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#334155] group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5">
                          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-hover)] text-[10px] font-semibold text-[#64748b] uppercase tracking-wide">
                        {guide.serviceName}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* CTA row for this category */}
                <div className="flex items-center gap-3 pl-14">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 flex-shrink-0">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                  <span className="text-sm text-[#64748b]">Need it fixed now?</span>
                  <Link
                    href={`/services/${guides[0].serviceSlug}`}
                    className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Find a certified NYC {guides[0].serviceName.toLowerCase()} →
                  </Link>
                </div>
              </section>
            )
          })}
        </div>

        {/* Bottom conversion section */}
        <div className="mt-20 p-8 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] text-center">
          <h2 className="text-2xl font-black mb-3">Stop researching. Start resolving.</h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-xl mx-auto">
            Have an active violation or an urgent repair? Enter your building address and we'll connect you with vetted NYC professionals who can fix it today.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors font-semibold text-sm text-white"
          >
            Search your building
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
