import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  ChevronRight,
  MapPin,
  CheckCircle2,
  Clock,
  DollarSign,
  HelpCircle,
  ClipboardCheck,
  Search,
  AlertTriangle,
} from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeadModal from '@/components/LeadModal'
import OpenModalButton from '@/components/OpenModalButton'
import { services } from '@/lib/services-data'
import { locations } from '@/lib/locations-data'

type Props = {
  params: { service: string }
}

const stripServicesSuffix = (name: string) => name.replace(/\s+Services$/i, '').trim()

const needs24x7 = (serviceSlug: string) => {
  const set = new Set(['locksmith', 'plumbers', 'electricians', 'hvac-repair', 'pest-control', 'mold-remediation'])
  return set.has(serviceSlug)
}

const providerNounFor = (serviceSlug: string, serviceDisplayName: string) => {
  const map: Record<string, string> = {
    'moving-companies': 'moving pros',
    'packing-services': 'packing pros',
    'storage-facilities': 'storage options',
    'junk-removal': 'junk removal pros',
    'cleaning-services': 'cleaning pros',
    locksmith: 'locksmiths',
    plumbers: 'plumbers',
    electricians: 'electricians',
    'hvac-repair': 'HVAC pros',
    'pest-control': 'pest control pros',
    'mold-remediation': 'remediation pros',
    'furniture-assembly': 'assembly pros',
    painters: 'painters',
    'real-estate-agents': 'agents',
    'building-inspectors': 'inspectors',
    'renters-insurance': 'insurance options',
    'internet-providers': 'internet options',
  }

  if (map[serviceSlug]) return map[serviceSlug]

  const noun = stripServicesSuffix(serviceDisplayName).toLowerCase()
  return `${noun} pros`
}

/** Map the borough display label to the value stored in locations-data */
const BOROUGH_DISPLAY: { label: string; dataValue: string }[] = [
  { label: 'Manhattan', dataValue: 'Manhattan' },
  { label: 'Brooklyn', dataValue: 'Brooklyn' },
  { label: 'Queens', dataValue: 'Queens' },
  { label: 'The Bronx', dataValue: 'Bronx' },
  { label: 'Staten Island', dataValue: 'Staten Island' },
]

export async function generateStaticParams() {
  return Object.keys(services).map((service) => ({ service }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services[params.service]
  if (!service) return {}

  const noun = stripServicesSuffix(service.name)

  return {
    title: service.h1Override
      ? `${service.h1Override} | Building Health X`
      : `${service.name} in NYC | Find Local Help Across All 5 Boroughs`,
    description: service.intro.length > 155 ? service.intro.slice(0, 152) + '...' : service.intro,
  }
}

export default function ServicePage({ params }: Props) {
  const service = services[params.service]
  if (!service) return notFound()

  const noun = stripServicesSuffix(service.name)
  const providerNoun = providerNounFor(params.service, service.name)

  const pitch = service.intro

  const allLocations = Object.entries(locations)

  // Sidebar quick-jump list
  const sidebarLocations = allLocations.slice(0, 5)

  const getStartedHref =
    allLocations[0]?.[0]
      ? `/services/${params.service}/${allLocations[0][0]}`
      : `/services/${params.service}/${Object.keys(locations)[0]}`

  // Group locations by borough — use BOROUGH_DISPLAY to fix Bronx matching
  const locationsByBorough = BOROUGH_DISPLAY.map(({ label, dataValue }) => ({
    borough: label,
    locations: allLocations.filter(([_, loc]) => loc.borough === dataValue)
  })).filter(group => group.locations.length > 0)

  // Headline — use h1Override if present, otherwise default
  const headline = service.h1Override || `${service.name} in NYC`

  // FAQ Schema markup for SEO — opt-in per service
  const faqSchema = service.faqSchema && service.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  } : null

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <Header />

      {/* FAQ Schema.org structured data */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white transition">
              Services
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{service.name}</span>
          </nav>

          {/* HERO — B layout: two-column, image as faint left-column bg texture */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/5">

              {/* LEFT — headline, pitch, trust bullets, nav */}
              <div className="relative px-8 py-10 lg:py-12">
                {/* Faint image texture behind left column */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={`/services/${params.service}.png`}
                    alt=""
                    fill
                    className="object-cover opacity-[0.06] scale-105"
                    priority
                    sizes="50vw"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17]/90 via-[#0a0e17]/80 to-[#0a0e17]/95" />
                </div>

                <div className="relative z-10">
                  {/* Category chip */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {service.category}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      All 5 boroughs
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                    {headline}
                  </h1>

                  <p className="text-lg text-slate-300 leading-relaxed mb-6">
                    {service.subHeadline || pitch}
                  </p>

                  {/* Trust bullets */}
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center gap-3 text-sm text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      Local providers matched to your neighbourhood
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {service.timeline} · {service.costRange}
                    </li>
                    {service.extraQuickFact && (
                      <li className="flex items-center gap-3 text-sm text-slate-400">
                        <ClipboardCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        {service.extraQuickFact.label}: {service.extraQuickFact.detail}
                      </li>
                    )}
                    <li className="flex items-center gap-3 text-sm text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      Free · No commitment · Fast response
                    </li>
                  </ul>

                  {/* Primary CTA */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <OpenModalButton variant="primary" className="w-full sm:w-auto">
                      Get {noun} quotes
                    </OpenModalButton>
                    <a href="#neighborhoods" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold text-sm transition">
                      Browse neighbourhoods
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Secondary nav */}
                  <div className="flex flex-wrap gap-2">
                    <a href="#requests" className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 bg-white/5 rounded-lg transition">Common requests</a>
                    <a href="#faqs" className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 bg-white/5 rounded-lg transition">FAQs</a>
                    <a href="#questions" className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 bg-white/5 rounded-lg transition">Questions to ask</a>
                  </div>
                </div>
              </div>

              {/* RIGHT — location grid by borough */}
              <div className="bg-[#0d1117] border-l border-white/5 px-6 py-10 lg:py-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Pick your neighbourhood</div>
                    <div className="text-xs text-slate-500">{Object.keys(locations).length} areas covered</div>
                  </div>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-[#12161f] border border-white/5 rounded-xl p-3 text-center">
                    <div className="text-sm font-semibold text-emerald-400">Free</div>
                    <div className="text-[10px] text-slate-500">Always</div>
                  </div>
                  <div className="bg-[#12161f] border border-white/5 rounded-xl p-3 text-center">
                    <div className="text-sm font-semibold text-blue-400">{service.timeline.split(';')[0]}</div>
                    <div className="text-[10px] text-slate-500">Timeline</div>
                  </div>
                  <div className="bg-[#12161f] border border-white/5 rounded-xl p-3 text-center">
                    <div className="text-sm font-semibold text-purple-400">{service.costRange.split(',')[0].split('–')[0].trim()}</div>
                    <div className="text-[10px] text-slate-500">From</div>
                  </div>
                </div>

                {/* Borough groups — compact */}
                <div className="space-y-5 overflow-y-auto max-h-[380px] pr-1">
                  {locationsByBorough.map(({ borough, locations: boroughLocs }) => (
                    <div key={borough}>
                      <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">{borough}</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {boroughLocs.slice(0, 8).map(([locationSlug, loc]) => (
                          <Link
                            key={locationSlug}
                            href={`/services/${params.service}/${locationSlug}`}
                            className="group flex items-center justify-between px-3 py-2 rounded-lg bg-white/4 hover:bg-white/8 border border-white/5 hover:border-cyan-500/20 transition text-sm"
                          >
                            <span className="text-slate-300 group-hover:text-white text-xs truncate">{loc.name}</span>
                            <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 flex-shrink-0 ml-1" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="#neighborhoods"
                  className="block text-center text-xs text-cyan-400 hover:text-cyan-300 mt-4 transition"
                >
                  View all {Object.keys(locations).length} neighbourhoods ↓
                </Link>
              </div>
            </div>
          </section>

          {/* PAGE CONTENT */}
          <div className="space-y-12">
            {/* Quick Facts */}
            <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Quick facts about {noun.toLowerCase()}</h2>
              <div className={`grid ${service.extraQuickFact ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-6`}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-slate-400">Typical timeline</div>
                      <div className="font-semibold">{service.timeline}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-slate-400">Cost range</div>
                      <div className="font-semibold">{service.costRange}</div>
                    </div>
                  </div>
                </div>
                {service.extraQuickFact && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <ClipboardCheck className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-slate-400">Requirement</div>
                        <div className="font-semibold">{service.extraQuickFact.label}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

              {/* LOCATION GRID - Grouped by borough */}
              <section id="neighborhoods" className="bg-[#12161f] border border-white/10 rounded-2xl p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Choose a neighborhood</h2>
                      <p className="text-slate-400 mt-1">
                        Pick your area to view {noun.toLowerCase()} options and request help.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Borough-grouped locations */}
                <div className="space-y-8">
                  {locationsByBorough.map(({ borough, locations: boroughLocs }) => (
                    <div key={borough}>
                      <h3 className="text-xl font-bold mb-4 text-slate-300 flex items-center gap-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        {borough}
                      </h3>
                      
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {boroughLocs.map(([locationSlug, loc]) => (
                          <Link
                            key={locationSlug}
                            href={`/services/${params.service}/${locationSlug}`}
                            className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition"
                          >
                            <div>
                              <div className="font-semibold">{loc.name}</div>
                              <div className="text-xs text-slate-500 mt-0.5">
                                {service.timeline.split(';')[0]}
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* View all link — rendered as crawlable <a> via Next Link */}
                {allLocations.length > 30 && (
                  <div className="mt-8 text-center">
                    <Link
                      href={`/services/${params.service}/${allLocations[0][0]}`}
                      className="inline-block px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition"
                    >
                      View all {allLocations.length} neighborhoods →
                    </Link>
                  </div>
                )}
              </section>

              {/* DATA MOAT — dynamic per service */}
              {service.dataMoat && (
                <section className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-8 lg:p-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold">{service.dataMoat.headline}</h2>
                      <p className="text-slate-300 mt-1 text-sm">{service.dataMoat.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-slate-200 leading-relaxed mb-6 max-w-3xl">
                    {service.dataMoat.body}
                  </p>
                  <Link
                    href={service.dataMoat.ctaHref}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-xl transition"
                  >
                    <Search className="w-5 h-5" />
                    {service.dataMoat.ctaText}
                  </Link>
                </section>
              )}

              {/* FAQ ACCORDION — SEO-optimized with Schema.org */}
              {service.faqs.length > 0 && (
                <section id="faqs" className="bg-[#12161f] border border-white/10 rounded-2xl p-8 lg:p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <HelpCircle className="w-6 h-6 text-blue-400" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold">Frequently asked questions</h2>
                  </div>
                  <div className="space-y-4">
                    {service.faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                      >
                        <summary className="flex items-center justify-between cursor-pointer p-5 text-left font-semibold text-white hover:bg-white/5 transition list-none [&::-webkit-details-marker]:hidden">
                          <span className="pr-4">{faq.q}</span>
                          <ChevronRight className="w-5 h-5 text-slate-500 group-open:rotate-90 transition-transform flex-shrink-0" />
                        </summary>
                        <div className="px-5 pb-5 text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* QUICK SERVICE INFO */}
              <section id="requests" className="grid lg:grid-cols-2 gap-8">
                <div className="bg-[#12161f] border border-white/10 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6">What people typically request</h2>
                  <ul className="space-y-4">
                    {service.whyNeed.slice(0, 8).map((reason, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-emerald-500/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-slate-300 leading-relaxed">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="questions" className="bg-[#12161f] border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold">Questions to ask</h2>
                  </div>

                  <p className="text-slate-400 mb-6 leading-relaxed">
                    Want higher quality quotes and fewer surprises? Ask the right questions before you book, especially for NYC building access rules and pricing structure.
                  </p>

                  <Link
                    href={`/services/${params.service}/questions-to-ask`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition"
                  >
                    View questions to ask
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </section>

              {/* Footer CTA */}
              <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-3">Ready to request {noun.toLowerCase()} help?</h2>
                <p className="text-slate-300 mb-6 max-w-3xl">
                  Choose your neighborhood above to request service and see detailed expectations, costs and FAQs tailored to that area.
                </p>
                <div className="flex flex-wrap gap-3">
                  <OpenModalButton variant="primary">
                    Get matched now
                  </OpenModalButton>
                  <Link
                    href={getStartedHref}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition"
                  >
                    Browse neighborhoods
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </section>
          </div>
        </div>
      </main>

      <LeadModal serviceType={service.name} serviceSlug={params.service} location="NYC" locationSlug="nyc" />
      <Footer />
    </div>
  )
}
