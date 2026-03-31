import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ChevronRight,
  MapPin,
  Building2,
  Train,
  Home as HomeIcon,
  AlertTriangle,
  Truck,
  Package,
  Archive,
  Trash2,
  Sparkles,
  ClipboardCheck,
  Shield,
  Wifi,
  Key,
  Wrench,
  PaintBucket,
  Bug,
  Thermometer,
  Droplets,
  Zap,
  AlertOctagon,
  TrendingUp,
  Info,
  FileSearch,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { services } from '@/lib/services-data'
import { locations } from '@/lib/locations-data'
import { BreadcrumbJsonLd, LocationJsonLd, FaqJsonLd } from '@/components/seo'

const getServiceIcon = (service: string, size: string = 'w-6 h-6') => {
  const icons: Record<string, React.ReactNode> = {
    'moving-companies': <Truck className={size} />,
    'packing-services': <Package className={size} />,
    'storage-facilities': <Archive className={size} />,
    'junk-removal': <Trash2 className={size} />,
    'cleaning-services': <Sparkles className={size} />,
    'real-estate-agents': <HomeIcon className={size} />,
    'building-inspectors': <ClipboardCheck className={size} />,
    'renters-insurance': <Shield className={size} />,
    'internet-providers': <Wifi className={size} />,
    locksmith: <Key className={size} />,
    'furniture-assembly': <Wrench className={size} />,
    painters: <PaintBucket className={size} />,
    'pest-control': <Bug className={size} />,
    'hvac-repair': <Thermometer className={size} />,
    plumbers: <Droplets className={size} />,
    electricians: <Zap className={size} />,
    'mold-remediation': <AlertOctagon className={size} />,
  }
  return icons[service] || <Wrench className={size} />
}

const RiskBadge = ({ level }: { level: 'Low' | 'Medium' | 'High' }) => {
  const styles = {
    Low: 'bg-[#e0f5f2] text-[#0b8a7a] border-[#a7f3d0]',
    Medium: 'bg-[#fffbeb] text-[#b45309] border-[#d97706]',
    High: 'bg-[#fef2f2] text-[#e24b4a] border-red-500/20',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5  text-xs font-semibold border ${styles[level]}`}>
      {level}
    </span>
  )
}

const servicesByCategory = Object.entries(services).reduce((acc, [slug, svc]) => {
  if (!acc[svc.category]) acc[svc.category] = []
  acc[svc.category].push({ slug, ...svc })
  return acc
}, {} as Record<string, Array<{ slug: string; name: string; description: string; category: string }>>)

const categoryOrder = ['Moving Services', 'Pre-Lease Research', 'Settling In', 'Ongoing Needs']
const categoryColors: Record<string, string> = {
  'Moving Services': 'emerald',
  'Pre-Lease Research': 'blue',
  'Settling In': 'purple',
  'Ongoing Needs': 'orange',
}

type Props = { params: { location: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const location = locations[params.location]
  if (!location) return {}
  return {
    title: `Renter Services in ${location.name}, ${location.borough} | Building Health X`,
    description: `Find trusted renter services in ${location.name}. ${location.description} Research buildings and compare service providers across ${Object.keys(services).length} categories.`,
  }
}

export async function generateStaticParams() {
  return Object.keys(locations).map((location) => ({ location }))
}

export default function LocationPage({ params }: Props) {
  const location = locations[params.location]
  if (!location) return notFound()

  const vp = location.violationProfile

  const relatedLocations = Object.entries(locations)
    .filter(([slug, loc]) => loc.borough === location.borough && slug !== params.location)
    .slice(0, 8)

  const otherBoroughLocations = Object.entries(locations)
    .filter(([slug, loc]) => loc.borough !== location.borough)
    .slice(0, 6)

  return (
    <div className="min-h-screen bg-white">
      <LocationJsonLd
        name={location.name}
        url={`/locations/${params.location}`}
        description={`NYC Building Violations Lookup and renter services for ${location.name}, ${location.borough}. Research any building before you sign.`}
        borough={location.borough}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Locations', url: '/locations' },
          { name: location.name, url: `/locations/${params.location}` },
        ]}
      />
      {vp && (
        <FaqJsonLd
          faqs={[
            {
              q: `What are the most common building violations in ${location.name}?`,
              a: `The most common building violations in ${location.name} are: ${vp.topIssues.join(', ')}. ${vp.avgViolationsNote}`,
            },
            {
              q: `What is the pest risk in ${location.name}?`,
              a: `Pest risk in ${location.name} is rated ${vp.pestRisk}. ${vp.avgViolationsNote}`,
            },
            {
              q: `What should renters know before signing a lease in ${location.name}?`,
              a: vp.rentersNote,
            },
            {
              q: `How old are the buildings in ${location.name}?`,
              a: `${vp.buildingAge}. Building age is a key factor in violation risk — older buildings tend to have more heat, plumbing, and structural issues.`,
            },
            {
              q: `How bad are heat complaints in ${location.name}?`,
              a: `Heat complaint levels in ${location.name} are rated ${vp.heatComplaintLevel}. ${vp.avgViolationsNote}`,
            },
          ]}
        />
      )}

      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          <nav className="flex items-center gap-2 text-sm text-[#888] mb-8">
            <Link href="/" className="hover:text-[#0a0a0a] transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/locations" className="hover:text-[#0a0a0a] transition">Locations</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{location.name}</span>
          </nav>

          {/* Hero */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1  text-xs font-semibold uppercase  bg-[#e0f7fa] text-cyan-400">
                  {location.borough}
                </span>
                <span className="inline-flex items-center px-3 py-1  text-xs font-semibold uppercase  bg-[#e8f0fe] text-[#1a56db]">
                  {Object.keys(services).length} Services Available
                </span>
                {vp && (
                  <span className="inline-flex items-center px-3 py-1  text-xs font-semibold uppercase  bg-[#f3e8ff] text-[#6b21a8]">
                    Building Data Available
                  </span>
                )}
              </div>

              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500  flex items-center justify-center text-white flex-shrink-0">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                    Renter services &amp; building research in{' '}
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {location.name}
                    </span>
                  </h1>
                  <p className="text-xl text-[#444] leading-relaxed">
                    {location.description} Research any {location.name} building before you sign — then find trusted local service providers.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-[#f5f5f5] border border-[#eeeeee]  p-5">
                  <div className="text-sm font-semibold text-white mb-1">Search any {location.name} address</div>
                  <p className="text-sm text-[#555]">
                    Pull HPD violations, 311 complaints, pest inspections, and ownership history for any building.
                  </p>
                </div>
                <div className="bg-[#f5f5f5] border border-[#eeeeee]  p-5">
                  <div className="text-sm font-semibold text-white mb-1">How service requests work</div>
                  <p className="text-sm text-[#555]">
                    Choose a service, share a few details, and we connect you with providers who serve {location.name}.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border-2 border-[#e0e0e0]  p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#0b8a7a]  flex items-center justify-center text-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-base">Get free quotes</h2>
                    <p className="text-xs text-[#555]">Licensed providers · No commitment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Violation Profile */}
          {vp && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <h2 className="text-2xl font-bold">Building violation profile: {location.name}</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                <div className="bg-[#f5f5f5] border border-[#eeeeee]  p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Bug className="w-4 h-4 text-[#555]" />
                      <span className="text-sm text-[#555] font-medium">Pest Risk</span>
                    </div>
                    <RiskBadge level={vp.pestRisk} />
                  </div>
                  <p className="text-xs text-[#888]">Based on 311 pest complaint density and HPD pest-related violation history</p>
                </div>

                <div className="bg-[#f5f5f5] border border-[#eeeeee]  p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-[#555]" />
                      <span className="text-sm text-[#555] font-medium">Heat Complaint Level</span>
                    </div>
                    <RiskBadge level={vp.heatComplaintLevel} />
                  </div>
                  <p className="text-xs text-[#888]">Based on HPD heat &amp; hot water violation frequency during heating season</p>
                </div>

                <div className="bg-[#f5f5f5] border border-[#eeeeee]  p-5 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4 text-[#555]" />
                    <span className="text-sm text-[#555] font-medium">Typical Building Age</span>
                  </div>
                  <p className="text-sm font-medium text-white">{vp.buildingAge}</p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2 mb-4">
                <div className="bg-[#f5f5f5] border border-[#eeeeee]  p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-[#b45309]" />
                    <h3 className="font-semibold text-sm">Most common issues in {location.name}</h3>
                  </div>
                  <ul className="space-y-2">
                    {vp.topIssues.map((issue, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-[#444]">
                        <span className="w-5 h-5  bg-[#fffbeb] text-[#b45309] text-xs flex items-center justify-center font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-500/5 border border-[#bfdbfe]  p-5">
                    <div className="flex items-start gap-3">
                      <Info className="w-4 h-4 text-[#1a56db] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#1a56db] mb-1">About this data</p>
                        <p className="text-sm text-[#555]">{vp.avgViolationsNote}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20  p-5">
                    <div className="flex items-start gap-3">
                      <FileSearch className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-cyan-300 mb-1">Renter tip for {location.name}</p>
                        <p className="text-sm text-[#555]">{vp.rentersNote}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20  p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-white mb-1">Research a specific {location.name} building</p>
                  <p className="text-sm text-[#555]">Search any address to see its full HPD violation history, 311 complaints, and ownership records.</p>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold  transition whitespace-nowrap flex-shrink-0"
                >
                  <FileSearch className="w-4 h-4" />
                  Search an address
                </Link>
              </div>
            </section>
          )}

          {/* Neighbourhood Info */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-[#f5f5f5] border border-[#eeeeee]  p-4">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-5 h-5 text-[#1a56db]" />
                <span className="text-sm text-[#555]">Building Types</span>
              </div>
              <p className="text-sm font-medium">{location.buildingTypes}</p>
            </div>
            <div className="bg-[#f5f5f5] border border-[#eeeeee]  p-4">
              <div className="flex items-center gap-3 mb-2">
                <Train className="w-5 h-5 text-[#0b8a7a]" />
                <span className="text-sm text-[#555]">Transit</span>
              </div>
              <p className="text-sm font-medium">{location.transit}</p>
            </div>
            <div className="bg-[#f5f5f5] border border-[#eeeeee]  p-4">
              <div className="flex items-center gap-3 mb-2">
                <HomeIcon className="w-5 h-5 text-[#6b21a8]" />
                <span className="text-sm text-[#555]">Character</span>
              </div>
              <p className="text-sm font-medium">{location.character}</p>
            </div>
            <div className="bg-[#f5f5f5] border border-[#eeeeee]  p-4">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-[#b45309]" />
                <span className="text-sm text-[#555]">Challenges</span>
              </div>
              <p className="text-sm font-medium">{location.challenges}</p>
            </div>
          </div>

          {/* Popular Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Popular services in {location.name}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(services).slice(0, 6).map(([slug, svc]) => (
                <Link
                  key={slug}
                  href={`/services/${slug}/${params.location}`}
                  className="group bg-[#f5f5f5] border border-[#eeeeee]  p-4 hover:border-[#1a56db] hover:bg-blue-500/5 transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#e8f0fe]  flex items-center justify-center text-[#1a56db] group-hover:bg-[#d0dcfb] transition flex-shrink-0">
                      {getServiceIcon(slug, 'w-5 h-5')}
                    </div>
                    <h3 className="font-semibold group-hover:text-[#1a56db] transition">{svc.name}</h3>
                  </div>
                  <p className="text-sm text-[#555] line-clamp-2">{svc.description}</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a href="#all-services" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#f5f5f5] hover:bg-[#eeeeee]  text-sm font-medium transition">
                View All {Object.keys(services).length} Services
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* All Services + Sidebar */}
          <div id="all-services" className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {categoryOrder.map((category) => {
                const categoryServices = servicesByCategory[category]
                if (!categoryServices || categoryServices.length === 0) return null
                const color = categoryColors[category] || 'blue'
                return (
                  <section key={category}>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <span className={`w-3 h-3  bg-${color}-400`}></span>
                      {category}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {categoryServices.map((svc) => (
                        <Link
                          key={svc.slug}
                          href={`/services/${svc.slug}/${params.location}`}
                          className={`group bg-[#f5f5f5] border border-[#eeeeee]  p-5 hover:border-${color}-500/30 hover:bg-${color}-500/5 transition`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 bg-${color}-500/10  flex items-center justify-center text-${color}-400 group-hover:bg-${color}-500/20 transition`}>
                              {getServiceIcon(svc.slug)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg mb-1 group-hover:text-[#1a56db] transition">{svc.name}</h3>
                              <p className="text-sm text-[#555] line-clamp-2">{svc.description}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#888] group-hover:text-[#1a56db] transition flex-shrink-0 mt-1" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-28">
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20  p-5">
                  <h3 className="font-semibold mb-2">Research a {location.name} building</h3>
                  <p className="text-sm text-[#555] mb-4">
                    Check HPD violations, 311 history, and ownership records before signing any lease.
                  </p>
                  <Link
                    href="/"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold  transition"
                  >
                    <FileSearch className="w-4 h-4" />
                    Search an address
                  </Link>
                </div>

                {relatedLocations.length > 0 && (
                  <div className="bg-[#f5f5f5] border border-[#eeeeee]  p-5">
                    <h3 className="font-semibold mb-4 text-sm text-[#555] uppercase r">
                      More in {location.borough}
                    </h3>
                    <div className="space-y-2">
                      {relatedLocations.map(([slug, loc]) => (
                        <Link
                          key={slug}
                          href={`/locations/${slug}`}
                          className="flex items-center justify-between p-3  hover:bg-[#f5f5f5] transition group"
                        >
                          <span className="text-sm">{loc.name}</span>
                          <ChevronRight className="w-4 h-4 text-[#888] group-hover:text-[#0a0a0a] transition" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {otherBoroughLocations.length > 0 && (
                  <div className="bg-[#f5f5f5] border border-[#eeeeee]  p-5">
                    <h3 className="font-semibold mb-4 text-sm text-[#555] uppercase r">
                      Other Neighborhoods
                    </h3>
                    <div className="space-y-2">
                      {otherBoroughLocations.map(([slug, loc]) => (
                        <Link
                          key={slug}
                          href={`/locations/${slug}`}
                          className="flex items-center justify-between p-3  hover:bg-[#f5f5f5] transition group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#f5f5f5]  flex items-center justify-center text-[#555] group-hover:text-[#0a0a0a] transition">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <span className="text-sm">{loc.name}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#888] group-hover:text-[#0a0a0a] transition" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
