import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Database, RefreshCw, Building2, AlertTriangle } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { DatasetJsonLd } from '@/components/seo'

export const metadata: Metadata = {
  title: 'Data Sources | Building Health X',
  description:
    'Building Health X aggregates data from 55+ official NYC government sources including HPD, DOB, 311, ACRIS, and DOHMH to provide building transparency for NYC renters.',
}

const sources = [
  {
    agency: 'HPD — Housing Preservation and Development',
    url: 'https://www.nyc.gov/site/hpd/index.page',
    datasets: [
      { name: 'HPD Building Violations', desc: 'Open, pending, and resolved Housing Maintenance Code violations by building' },
      { name: 'HPD Complaints', desc: 'Tenant-initiated complaints about building conditions including heat, hot water, and pests' },
      { name: 'HPD Registration', desc: 'Landlord and property registration records required by NYC law' },
      { name: 'HPD Litigations', desc: 'Court cases and legal proceedings initiated by HPD against building owners' },
      { name: 'HPD Vacate Orders', desc: 'Emergency and non-emergency vacate orders issued for buildings deemed unsafe' },
    ],
  },
  {
    agency: 'DOB — Department of Buildings',
    url: 'https://www.nyc.gov/site/buildings/index.page',
    datasets: [
      { name: 'DOB Building Jobs', desc: 'Active and historical construction permits, filings, and work orders' },
      { name: 'DOB Complaints', desc: 'Complaints filed about construction, unsafe conditions, and code violations' },
      { name: 'DOB Violations', desc: 'Formal violations issued by DOB inspectors' },
      { name: 'DOB Certificate of Occupancy', desc: 'Legal occupancy status and permitted use of each building' },
      { name: 'Elevator Inspections', desc: 'Elevator safety inspection results and violation history' },
      { name: 'Boiler Inspections', desc: 'Boiler safety records and compliance status' },
    ],
  },
  {
    agency: '311 — NYC Service Requests',
    url: 'https://portal.311.nyc.gov/',
    datasets: [
      { name: '311 Service Requests', desc: 'All resident-submitted service requests by address, including heat, hot water, noise, rodents, and more — 30 days, 90 days, 1 year, and 3 year views' },
    ],
  },
  {
    agency: 'DOHMH — Department of Health and Mental Hygiene',
    url: 'https://www.nyc.gov/site/doh/index.page',
    datasets: [
      { name: 'Rodent Inspections', desc: 'Results of NYC Health Department rodent inspections by property' },
      { name: 'Pest Inspection Results', desc: 'Bed bug, cockroach, and general pest inspection history and outcomes' },
    ],
  },
  {
    agency: 'ACRIS — Automated City Register Information System',
    url: 'https://a836-acris.nyc.gov/',
    datasets: [
      { name: 'Property Deeds', desc: 'Ownership history, sale transactions, and deed transfers' },
      { name: 'Liens and Encumbrances', desc: 'Mortgages, mechanic\'s liens, and other financial claims against a property' },
      { name: 'Property Sales History', desc: 'Recent and historical sale prices and transfer dates' },
    ],
  },
  {
    agency: 'NYC Rent Guidelines Board',
    url: 'https://rentguidelinesboard.cityofnewyork.us/',
    datasets: [
      { name: 'Rent Stabilisation Status', desc: 'Whether a building contains rent-stabilised units and approximate unit counts' },
    ],
  },
  {
    agency: 'FDNY — Fire Department of New York',
    url: 'https://www.nyc.gov/site/fdny/index.page',
    datasets: [
      { name: 'FDNY Inspections', desc: 'Fire safety inspection records, violations, and compliance status by building' },
      { name: 'Sprinkler and Fire Safety Systems', desc: 'Status of fire suppression and alarm systems' },
    ],
  },
  {
    agency: 'NYC Open Data Portal',
    url: 'https://opendata.cityofnewyork.us/',
    datasets: [
      { name: 'Multiple Agency Datasets', desc: 'Building Health X pulls from numerous additional datasets hosted on the NYC Open Data portal, updated daily by participating city agencies' },
    ],
  },
]

export default function DataSourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <DatasetJsonLd />
      <Header />

      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#888] mb-10">
            <Link href="/" className="hover:text-[#0a0a0a] transition">Home</Link>
            <span>/</span>
            <span className="text-white">Data Sources</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-[#e8f0fe] border border-[#bfdbfe]  flex items-center justify-center">
                <Database className="w-7 h-7 text-[#1a56db]" />
              </div>
              <h1 className="text-4xl font-bold">Data Sources</h1>
            </div>
            <p className="text-lg text-[#444] leading-relaxed">
              Building Health X aggregates data from <strong className="text-white">55+ official NYC government
              sources</strong> to give you a complete picture of any building before you sign a lease. Every data
              point links back to a real public record.
            </p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            <div className="bg-[#f5f5f5] border border-[#e0e0e0]  p-6 text-center">
              <div className="text-3xl font-bold text-[#1a56db] mb-1">55+</div>
              <div className="text-sm text-[#555]">Official NYC data sources</div>
            </div>
            <div className="bg-[#f5f5f5] border border-[#e0e0e0]  p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <RefreshCw className="w-5 h-5 text-[#0b8a7a]" />
                <span className="text-3xl font-bold text-[#0b8a7a]">Daily</span>
              </div>
              <div className="text-sm text-[#555]">Data refresh cadence</div>
            </div>
            <div className="bg-[#f5f5f5] border border-[#e0e0e0]  p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Building2 className="w-5 h-5 text-[#6b21a8]" />
                <span className="text-3xl font-bold text-[#6b21a8]">1M+</span>
              </div>
              <div className="text-sm text-[#555]">NYC properties indexed</div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex gap-4 bg-[#fffbeb] border border-[#d97706]  p-5 mb-14">
            <AlertTriangle className="w-5 h-5 text-[#b45309] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#444] leading-relaxed">
              Data is sourced from public government databases and may have processing delays of up to 24–72 hours.
              Building Health X does not create or modify source records. For critical decisions, always verify
              information directly with the relevant NYC agency.
            </p>
          </div>

          {/* Sources list */}
          <div className="space-y-6">
            {sources.map((source) => (
              <div key={source.agency} className="bg-[#f5f5f5] border border-[#e0e0e0]  p-7">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <h2 className="text-xl font-bold">{source.agency}</h2>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-[#1a56db] hover:text-[#1a56db] transition flex-shrink-0"
                  >
                    Official site
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="space-y-3">
                  {source.datasets.map((dataset) => (
                    <div key={dataset.name} className="flex gap-3">
                      <div className="w-1.5 h-1.5 bg-blue-400  flex-shrink-0 mt-2" />
                      <div>
                        <span className="font-semibold text-white">{dataset.name}: </span>
                        <span className="text-[#555] text-sm">{dataset.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-14 p-8 bg-white border-2 border-[#e0e0e0]  text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to research your building?</h2>
            <p className="text-[#444] mb-6 max-w-xl mx-auto">
              Search any NYC address and get a full report pulling from all of these sources in seconds.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0b8a7a] hover:bg-[#076d5f]  font-semibold transition"
            >
              Search an address
            </Link>
          </div>

          {/* Related legal links */}
          <div className="mt-12 pt-8 border-t border-[#e0e0e0] flex flex-wrap gap-4 text-sm text-[#555]">
            <Link href="/privacy-policy" className="hover:text-[#0a0a0a] transition">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-[#0a0a0a] transition">Terms of Service</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
