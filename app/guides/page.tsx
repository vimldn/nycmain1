import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GuidesEmailCapture from '@/components/GuidesEmailCapture'
import { GUIDES } from '@/lib/guides-data'
import { BreadcrumbJsonLd } from '@/components/seo'

export const metadata: Metadata = {
  title: 'NYC Renter & Landlord Guides: Violations, Rights & Repairs | Building Health X',
  description:
    'Step-by-step guides for NYC tenants and landlords — clearing HPD violations, fighting back when your landlord ignores repairs, and getting out clean. Know your rights before you sign.',
}

// ── Intent buckets ────────────────────────────────────────────────────────────
// Hardcoded slug → bucket mapping. Add new guide slugs here as you build them.

const BUCKETS = [
  {
    id: 'researching',
    emoji: '🔍',
    label: 'Researching',
    headline: 'Before You Sign',
    description: 'Do your homework before handing over a deposit. These guides help you spot a bad building — and a worse landlord — before you\'re locked in.',
    cta: { label: 'Check any building free', href: '/' },
    ctaNote: 'Our building search tool shows HPD violations, pest history, and landlord court records instantly.',
    slugs: [
      'what-to-check-before-signing-nyc-lease',
      'is-my-nyc-apartment-secretly-rent-stabilised',
    ],
    accentColor: 'blue',
  },
  {
    id: 'fighting',
    emoji: '🚨',
    label: 'Fighting',
    headline: 'Your Landlord Isn\'t Fixing It',
    description: 'Mold, no heat, roaches, water damage — your landlord has a legal deadline and daily fines if they miss it. Here\'s how to force their hand.',
    cta: { label: 'Find a certified NYC contractor', href: '/services' },
    ctaNote: 'Get free quotes from licensed NYC professionals who specialise in emergency repairs.',
    slugs: [
      'landlord-wont-fix-roaches-bedbugs',
      'eviction-notice-nyc-rights-next-steps',
    ],
    accentColor: 'red',
  },
  {
    id: 'disasters',
    emoji: '💧',
    label: 'Disasters',
    headline: 'When Something Goes Wrong',
    description: 'Burst pipes, a neighbour\'s flood, smoke damage from the unit above. These guides explain who is legally responsible and how to protect yourself financially.',
    cta: { label: 'Get renters insurance quotes', href: '/services/renters-insurance' },
    ctaNote: 'NYC renters insurance starts at under $15/month. Get 3 instant quotes before the next disaster.',
    slugs: [
      'who-pays-pipe-burst-nyc-apartment',
    ],
    accentColor: 'yellow',
  },
  {
    id: 'escaping',
    emoji: '📦',
    label: 'Escaping',
    headline: 'Getting Out Clean',
    description: 'Ready to leave — whether over violations, a noisy neighbour, or just a bad situation? These guides walk you through every step so you leave without liability.',
    cta: { label: 'Find NYC movers & cleaners', href: '/services' },
    ctaNote: 'Get free quotes from vetted NYC movers and move-out cleaning companies.',
    slugs: [
      'how-to-break-lease-nyc-violations',
      'break-lease-noisy-neighbor-nyc',
      'get-security-deposit-back-nyc',
    ],
    accentColor: 'emerald',
  },
] as const

type AccentColor = 'blue' | 'red' | 'yellow' | 'emerald'

const ACCENT: Record<AccentColor, { pill: string; icon: string; border: string; label: string }> = {
  blue:    { pill: 'bg-blue-500/10 text-blue-300 border-blue-500/20',       icon: 'text-blue-400',    border: 'border-blue-500/20',    label: 'text-blue-400'    },
  red:     { pill: 'bg-red-500/10 text-red-300 border-red-500/20',          icon: 'text-red-400',     border: 'border-red-500/25',     label: 'text-red-400'     },
  yellow:  { pill: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20', icon: 'text-yellow-400',  border: 'border-yellow-500/20',  label: 'text-yellow-400'  },
  emerald: { pill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20', icon: 'text-emerald-400', border: 'border-emerald-500/20', label: 'text-emerald-400' },
}

// ItemList schema for the whole guides hub
function ItemListJsonLd({ guides }: { guides: typeof GUIDES }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NYC Renter & Landlord Guides',
    description: 'Step-by-step guides for NYC tenants and landlords on violations, rights, and repairs.',
    url: 'https://www.buildinghealthx.com/guides',
    numberOfItems: guides.length,
    itemListElement: guides.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.title,
      url: `https://www.buildinghealthx.com/guides/${g.slug}`,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function GuidesPage() {
  const guidesBySlug = Object.fromEntries(GUIDES.map(g => [g.slug, g]))

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.buildinghealthx.com' },
          { name: 'Guides', url: 'https://www.buildinghealthx.com/guides' },
        ]}
      />
      <ItemListJsonLd guides={GUIDES} />
      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-28 pb-24">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
              NYC Tenant Rights Hub
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Your landlord knows the rules.<br className="hidden sm:block" />
            <span className="text-blue-400">Now you do too.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Step-by-step guides for NYC renters and landlords — from checking a building before you sign,
            to forcing repairs, to getting your deposit back when you leave.
          </p>
        </div>

        {/* ── Intent navigation pills ───────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mb-14">
          {BUCKETS.map(bucket => (
            <a
              key={bucket.id}
              href={`#${bucket.id}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${ACCENT[bucket.accentColor].pill} hover:opacity-80`}
            >
              <span>{bucket.emoji}</span>
              {bucket.label}
            </a>
          ))}
        </div>

        {/* ── Intent buckets ────────────────────────────────────────────────── */}
        <div className="space-y-20">
          {BUCKETS.map(bucket => {
            const guides = bucket.slugs
              .map(slug => guidesBySlug[slug])
              .filter(Boolean)

            const a = ACCENT[bucket.accentColor]

            return (
              <section key={bucket.id} id={bucket.id}>

                {/* Section header */}
                <div className="mb-7">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{bucket.emoji}</span>
                    <span className={`text-xs font-bold uppercase tracking-widest ${a.label}`}>
                      {bucket.label}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black mb-2 text-[#e2e8f0]">
                    {bucket.headline}
                  </h2>
                  <p className="text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                    {bucket.description}
                  </p>
                </div>

                {/* Guide cards */}
                {guides.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {guides.map(guide => (
                      <Link
                        key={guide.slug}
                        href={`/guides/${guide.slug}`}
                        className={`group flex flex-col justify-between p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:${a.border} transition-colors`}
                      >
                        <div>
                          <h3 className="text-sm font-semibold leading-snug text-[#e2e8f0] group-hover:text-blue-300 transition-colors mb-3">
                            {guide.title}
                          </h3>
                          <p className="text-xs text-[#64748b] leading-relaxed line-clamp-2">
                            {guide.subheadline}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[var(--bg-hover)] text-[10px] font-semibold text-[#64748b] uppercase tracking-wide">
                            {guide.serviceName}
                          </span>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#334155] group-hover:text-blue-400 transition-colors">
                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 rounded-xl border border-dashed border-[#1e293b] text-sm text-[#475569] mb-6">
                    More guides coming soon in this category.
                  </div>
                )}

                {/* Bucket CTA row */}
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${a.border} bg-[var(--bg-card)]`}>
                  <p className="text-xs text-[#64748b] flex-1">{bucket.ctaNote}</p>
                  <Link
                    href={bucket.cta.href}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-xs font-semibold text-white whitespace-nowrap"
                  >
                    {bucket.cta.label}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </section>
            )
          })}
        </div>

        {/* ── Email capture lead magnet ──────────────────────────────────────── */}
        <div className="mt-20">
          <GuidesEmailCapture />
        </div>

        {/* ── Bottom address search CTA ─────────────────────────────────────── */}
        <div className="mt-12 p-8 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-black mb-1 text-[#e2e8f0]">Is your building hiding something?</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Search any NYC address to see its full violation history, complaint trends, and 0–100 BHX health score — free, in seconds.
              </p>
            </div>
            <Link
              href="/"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors font-semibold text-sm text-white"
            >
              Search your building
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
