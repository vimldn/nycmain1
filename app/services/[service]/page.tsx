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

export const dynamic = 'force-dynamic'

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
    <div className="min-h-screen bg-white">
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
          <nav className="flex items-center gap-2 text-sm text-[#888] mb-8">
            <Link href="/" className="hover:text-[#0a0a0a] transition">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-[#0a0a0a] transition">
              Services
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{service.name}</span>
          </nav>

          {/* HERO - Full-width with centered content */}
          <section className="mb-16">
            {/* Background image with overlay */}
            <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden mb-12">
              <Image
                src={`/services/${params.service}.png`}
                alt={`${service.name} in NYC`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80" />
            </div>

            {/* Headline + CTA (NOT inside the image) */}
            <div className="max-w-5xl mx-auto mb-10">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-5">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  {headline}
                </h1>
                <OpenModalButton variant="primary" className="lg:w-auto w-full whitespace-nowrap">
                  Get quotes
                </OpenModalButton>
              </div>
              {/* Sub-headline with trust signal */}
              {service.subHeadline ? (
                <p className="text-lg sm:text-xl text-[#333] leading-relaxed">
                  {service.subHeadline}
                </p>
              ) : (
                <p className="text-lg sm:text-xl text-[#333] leading-relaxed">
                  {pitch}
                </p>
              )}
            </div>

            {/* Stats grid */}
            <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
              <div className="bg-[#f5f5f5] border border-[#a7f3d0]  p-6 text-center">
                <div className="w-14 h-14 bg-[#e0f5f2]  flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-[#0b8a7a]" />
                </div>
                <div className="font-semibold text-lg mb-1">Matched to availability</div>
                <div className="text-sm text-[#555]">Local options that serve you</div>
              </div>
              
              <div className="bg-[#f5f5f5] border border-[#bfdbfe]  p-6 text-center">
                <div className="w-14 h-14 bg-[#e8f0fe]  flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-[#1a56db]" />
                </div>
                <div className="font-semibold text-lg mb-1">{service.timeline}</div>
                <div className="text-sm text-[#555]">Typical timing</div>
              </div>
              
              <div className="bg-[#f5f5f5] border border-purple-500/20  p-6 text-center">
                <div className="w-14 h-14 bg-[#f3e8ff]  flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-7 h-7 text-[#6b21a8]" />
                </div>
                <div className="font-semibold text-lg mb-1">{service.costRange}</div>
                <div className="text-sm text-[#555]">Typical cost range</div>
              </div>
            </div>

            {/* Extra quick fact (e.g. COI requirement for movers) */}
            {service.extraQuickFact && (
              <div className="max-w-5xl mx-auto mb-8">
                <div className="bg-[#f5f5f5] border border-[#d97706]  p-6 flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#fffbeb]  flex items-center justify-center flex-shrink-0">
                    <ClipboardCheck className="w-7 h-7 text-[#b45309]" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">Requirements: {service.extraQuickFact.label}</div>
                    <div className="text-sm text-[#555]">{service.extraQuickFact.detail}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick navigation - prominent */}
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              <a href="#neighborhoods" className="px-6 py-3 bg-[#0b8a7a] hover:bg-[#076d5f] text-white font-semibold transition" style={{fontFamily:'"Bebas Neue",sans-serif',fontSize:'20px',letterSpacing:'.08em'}}>
                Browse neighborhoods
              </a>
              <a href="#requests" className="px-6 py-3 bg-[#f5f5f5] hover:bg-[#eeeeee] border-2 border-[#e0e0e0] text-[#0a0a0a] font-semibold transition" style={{fontFamily:'"Bebas Neue",sans-serif',fontSize:'20px',letterSpacing:'.08em'}}>
                Common requests
              </a>
              <a href="#faqs" className="px-6 py-3 bg-[#f5f5f5] hover:bg-[#eeeeee] border border-[#e0e0e0]  font-semibold transition">
                FAQs
              </a>
              <a href="#questions" className="px-6 py-3 bg-[#f5f5f5] hover:bg-[#eeeeee] border border-[#e0e0e0]  font-semibold transition">
                Questions to ask
              </a>
            </div>
          </section>

          {/* PAGE CONTENT */}
          <div className="space-y-12">
            {/* Quick Facts */}
            <section className="bg-white border-2 border-[#e0e0e0]  p-8">
              <h2 className="text-2xl font-bold mb-6">Quick facts about {noun.toLowerCase()}</h2>
              <div className={`grid ${service.extraQuickFact ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-6`}>
                <div className="bg-[#f5f5f5] border border-[#e0e0e0]  p-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#1a56db] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[#555]">Typical timeline</div>
                      <div className="font-semibold">{service.timeline}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f5f5f5] border border-[#e0e0e0]  p-6">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-[#15803d] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-[#555]">Cost range</div>
                      <div className="font-semibold">{service.costRange}</div>
                    </div>
                  </div>
                </div>
                {service.extraQuickFact && (
                  <div className="bg-[#f5f5f5] border border-[#e0e0e0]  p-6">
                    <div className="flex items-start gap-3">
                      <ClipboardCheck className="w-5 h-5 text-[#b45309] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-[#555]">Requirement</div>
                        <div className="font-semibold">{service.extraQuickFact.label}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

              {/* DATA MOAT — dynamic per service */}
              {service.dataMoat && (
                <section className="bg-[#fffbf0] border-2 border-[#d97706]  p-8 lg:p-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#fffbeb]  flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-[#b45309]" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold">{service.dataMoat.headline}</h2>
                      <p className="text-[#444] mt-1 text-sm">{service.dataMoat.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-[#333] leading-relaxed mb-6 max-w-3xl">
                    {service.dataMoat.body}
                  </p>
                  <Link
                    href={service.dataMoat.ctaHref}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0b8a7a] hover:bg-[#076d5f] text-white font-semibold transition" style={{fontFamily:'"Bebas Neue",sans-serif',fontSize:'20px',letterSpacing:'.08em'}}
                  >
                    <Search className="w-5 h-5" />
                    {service.dataMoat.ctaText}
                  </Link>
                </section>
              )}

              {/* FAQ ACCORDION — SEO-optimized with Schema.org */}
              {service.faqs.length > 0 && (
                <section id="faqs" className="bg-[#f5f5f5] border border-[#e0e0e0]  p-8 lg:p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#e8f0fe]  flex items-center justify-center">
                      <HelpCircle className="w-6 h-6 text-[#1a56db]" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold">Frequently asked questions</h2>
                  </div>
                  <div className="space-y-4">
                    {service.faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group bg-[#f5f5f5] border border-[#e0e0e0]  overflow-hidden"
                      >
                        <summary className="flex items-center justify-between cursor-pointer p-5 text-left font-semibold text-[#0a0a0a] hover:bg-[#e8e8e8] transition list-none [&::-webkit-details-marker]:hidden">
                          <span className="pr-4">{faq.q}</span>
                          <ChevronRight className="w-5 h-5 text-[#888] group-open:rotate-90 transition-transform flex-shrink-0" />
                        </summary>
                        <div className="px-5 pb-5 text-[#444] leading-relaxed border-t border-[#eeeeee] pt-4">
                          {faq.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* QUICK SERVICE INFO */}
              <section id="requests" className="grid lg:grid-cols-2 gap-8">
                <div className="bg-[#f5f5f5] border border-[#e0e0e0]  p-8">
                  <h2 className="text-2xl font-bold mb-6">What people typically request</h2>
                  <ul className="space-y-4">
                    {service.whyNeed.slice(0, 8).map((reason, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-[#d0eeeb]  flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-[#0b8a7a]" />
                        </div>
                        <span className="text-[#444] leading-relaxed">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="questions" className="bg-[#f5f5f5] border border-[#e0e0e0]  p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#e8f0fe]  flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-[#1a56db]" />
                    </div>
                    <h2 className="text-2xl font-bold">Questions to ask</h2>
                  </div>

                  <p className="text-[#555] mb-6 leading-relaxed">
                    Want higher quality quotes and fewer surprises? Ask the right questions before you book, especially for NYC building access rules and pricing structure.
                  </p>

                  <Link
                    href={`/services/${params.service}/questions-to-ask`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#f5f5f5] hover:bg-[#eeeeee] border border-[#e0e0e0]  font-semibold transition"
                  >
                    View questions to ask
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </section>

              {/* LOCATION GRID - Collapsible, at the bottom */}
              <details id="neighborhoods" className="group bg-[#f5f5f5] border border-[#e0e0e0]  overflow-hidden">
                <summary className="flex items-center justify-between p-8 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-[#f5f5f5] transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#e0f7fa]  flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Browse by neighborhood</h2>
                      <p className="text-[#555] text-sm mt-0.5">{allLocations.length} areas covered across all 5 boroughs</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#555] group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>

                <div className="px-8 pb-8 border-t border-[#eeeeee] pt-6 space-y-8">
                  {locationsByBorough.map(({ borough, locations: boroughLocs }) => (
                    <div key={borough}>
                      <h3 className="text-sm font-bold mb-3 text-[#555] uppercase st flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 "></div>
                        {borough}
                      </h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {boroughLocs.map(([locationSlug, loc]) => (
                          <Link
                            key={locationSlug}
                            href={`/services/${params.service}/${locationSlug}`}
                            className="group/card flex items-center justify-between p-3  bg-[#f5f5f5] hover:bg-[#eeeeee] border border-[#eeeeee] hover:border-[#e0e0e0] transition"
                          >
                            <span className="font-medium text-sm">{loc.name}</span>
                            <ChevronRight className="w-4 h-4 text-[#888] group-hover/card:text-[#0b8a7a] transition" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </details>

              {/* Footer CTA */}
              <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-[#bfdbfe]  p-8">
                <h2 className="text-2xl font-bold mb-3">Ready to request {noun.toLowerCase()} help?</h2>
                <p className="text-[#444] mb-6 max-w-3xl">
                  Choose your neighborhood above to request service and see detailed expectations, costs and FAQs tailored to that area.
                </p>
                <div className="flex flex-wrap gap-3">
                  <OpenModalButton variant="primary">
                    Get matched now
                  </OpenModalButton>
                  <Link
                    href={getStartedHref}
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#f5f5f5] font-semibold transition" style={{fontFamily:'"Bebas Neue",sans-serif',fontSize:'20px',letterSpacing:'.08em'}}
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
