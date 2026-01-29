'use client'

import React, { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Building2, AlertTriangle, CheckCircle, XCircle, Search, ChevronRight, ChevronLeft, Home, FileText, Users, History, Hammer, MapPin, DollarSign, Clock, Star, ThumbsUp, MessageSquare, Flame, Bug, Volume2, ShieldAlert, ExternalLink, User, Wallet, Train, Shield, Droplet, UtensilsCrossed, Factory, Trees } from 'lucide-react'
import ScoreLink from '@/components/ScoreLink'
import Header from '@/components/Header'

const SignalsAreaChart = dynamic(() => import('./SignalsAreaChart'), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center text-xs text-[#64748b]">Loading chart…</div>,
})

const ViolationsYearlyBarChart = dynamic(() => import('./ViolationsYearlyBarChart'), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center text-xs text-[#64748b]">Loading chart…</div>,
})

type Tab = 'overview' | 'violations' | 'complaints' | 'timeline' | 'landlord' | 'permits' | 'sales' | 'neighborhood'

type RangeKey = '30d' | '90d' | '1y' | '3y'

// Recharts is generally stable, but a single unexpected value can occasionally
// trigger a runtime error that would otherwise take down the whole page.
// This boundary keeps the rest of the building page usable.
class ChartBoundary extends React.Component<
  { children: React.ReactNode; title?: string },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any) {
    console.error('Chart render error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center text-center px-4">
          <div>
            <div className="text-sm font-semibold text-[#e2e8f0]">Chart unavailable</div>
            <div className="text-xs text-[#64748b] mt-1">
              {this.props.title ? `${this.props.title} couldn't load for this building.` : 'This chart could not be rendered for this building.'}
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// The building API is large and some upstream datasets can be temporarily empty
// or fail to return. Normalize the response so the UI never hard-crashes on
// missing nested objects/arrays.
function normalizeBuildingData(input: any) {
  const d: any = (input && typeof input === 'object') ? { ...input } : {}

  d.building = d.building ?? {}
  d.score = d.score ?? {}
  d.score.overall = Number.isFinite(+d.score.overall) ? +d.score.overall : 0
  d.score.label = typeof d.score.label === 'string' ? d.score.label : 'N/A'
  d.score.grade = d.score.grade ?? 'N/A'
  d.score.breakdown = d.score.breakdown ?? {}

  d.categoryScores = Array.isArray(d.categoryScores) ? d.categoryScores : []

  d.violations = d.violations ?? {}
  d.violations.hpd = d.violations.hpd ?? {}
  d.violations.dob = d.violations.dob ?? {}
  d.violations.ecb = d.violations.ecb ?? {}
  d.violations.safety = d.violations.safety ?? {}
  d.violations.recent = Array.isArray(d.violations.recent) ? d.violations.recent : []

  d.complaints = d.complaints ?? {}
  d.complaints.hpd = d.complaints.hpd ?? {}
  d.complaints.dob = d.complaints.dob ?? {}
  d.complaints.sr311 = d.complaints.sr311 ?? {}
  d.complaints.recent = Array.isArray(d.complaints.recent) ? d.complaints.recent : []
  d.complaints.byCategory = Array.isArray(d.complaints.byCategory) ? d.complaints.byCategory : []

  d.litigations = d.litigations ?? {}
  d.litigations.recent = Array.isArray(d.litigations.recent) ? d.litigations.recent : []

  d.evictions = d.evictions ?? {}
  d.evictions.recent = Array.isArray(d.evictions.recent) ? d.evictions.recent : []
  d.evictions.filings = d.evictions.filings ?? {}
  d.evictions.filings.recent = Array.isArray(d.evictions.filings.recent) ? d.evictions.filings.recent : []

  d.permits = d.permits ?? {}
  d.permits.recent = Array.isArray(d.permits.recent) ? d.permits.recent : []

  d.sales = d.sales ?? {}
  d.sales.recent = Array.isArray(d.sales.recent) ? d.sales.recent : []

  d.timeline = Array.isArray(d.timeline) ? d.timeline : []

  d.redFlags = Array.isArray(d.redFlags) ? d.redFlags : []

  d.landlord = d.landlord ?? {}
  d.landlord.owners = Array.isArray(d.landlord.owners) ? d.landlord.owners : []
  d.landlord.agents = Array.isArray(d.landlord.agents) ? d.landlord.agents : []
  d.landlord.siteManagers = Array.isArray(d.landlord.siteManagers) ? d.landlord.siteManagers : []
  d.landlord.portfolio = Array.isArray(d.landlord.portfolio) ? d.landlord.portfolio : []

  d.crime = d.crime ?? {}
  d.crime.byType = Array.isArray(d.crime.byType) ? d.crime.byType : []

  d.noise = d.noise ?? {}
  d.noise.byType = Array.isArray(d.noise.byType) ? d.noise.byType : []

  d.parks = d.parks ?? {}
  d.parks.nearby = Array.isArray(d.parks.nearby) ? d.parks.nearby : []

  d.schools = d.schools ?? {}
  d.schools.nearby = Array.isArray(d.schools.nearby) ? d.schools.nearby : []

  d.cafes = d.cafes ?? {}
  d.cafes.nearby = Array.isArray(d.cafes.nearby) ? d.cafes.nearby : []

  d.wifi = d.wifi ?? {}
  d.wifi.nearby = Array.isArray(d.wifi.nearby) ? d.wifi.nearby : []

  d.signals = d.signals ?? {}
  d.signals.windows = d.signals.windows ?? {}
  d.signals.series = d.signals.series ?? {}
  d.signals.series.daily30 = Array.isArray(d.signals.series.daily30) ? d.signals.series.daily30 : []
  d.signals.series.weekly90 = Array.isArray(d.signals.series.weekly90) ? d.signals.series.weekly90 : []
  d.signals.series.monthly36 = Array.isArray(d.signals.series.monthly36) ? d.signals.series.monthly36 : []

  return d
}

export default function BuildingPage() {
  const params = useParams()
  const router = useRouter()
  const bbl = params.bbl as string

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [rangeKey, setRangeKey] = useState<RangeKey>('30d')

  useEffect(() => {
    if (!bbl) return
    setLoading(true)
    setError(null)
    fetch(`/api/building/${bbl}`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(raw => {
        setData(normalizeBuildingData(raw))
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(err.message || 'Failed to load building data')
        setLoading(false)
      })
  }, [bbl])

  const safetyScore = useMemo(() => {
    if (!data?.categoryScores) return null
    return data.categoryScores.find((c: any) => c.category === 'Safety & Violations')
  }, [data])

  const maintenanceScore = useMemo(() => {
    if (!data?.categoryScores) return null
    return data.categoryScores.find((c: any) => c.category === 'Maintenance')
  }, [data])

  const legalScore = useMemo(() => {
    if (!data?.categoryScores) return null
    return data.categoryScores.find((c: any) => c.category === 'Legal & Compliance')
  }, [data])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e17] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-[#64748b]">Loading building data…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0e17] text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <XCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Unable to Load Building</h1>
          <p className="text-[#64748b] mb-6">{error}</p>
          <button onClick={() => router.back()} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!data) return null

  const building = data.building
  const score = data.score

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <Header />

      {/* Hero / Building Header */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border-b border-[#1e293b]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#64748b] hover:text-white mb-6">
            <ChevronLeft size={16} />
            Back to Search
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{building.address}</h1>
              <div className="flex flex-wrap items-center gap-4 text-[#94a3b8]">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {building.borough}
                </span>
                <span>BBL: {bbl}</span>
                {building.yearBuilt && <span>Built {building.yearBuilt}</span>}
                {building.units && <span>{building.units} units</span>}
              </div>
            </div>

            {/* Score Badge */}
            <div className="flex-shrink-0">
              <ScoreLink bbl={bbl} score={score.overall} label={score.label} grade={score.grade} size="lg" showLabel />
            </div>
          </div>

          {/* Red Flags */}
          {data.redFlags && data.redFlags.length > 0 && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-400 mb-2">Red Flags</h3>
                  <ul className="space-y-1 text-sm">
                    {data.redFlags.map((flag: string, i: number) => (
                      <li key={i} className="text-red-200">{flag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#0f172a] border-b border-[#1e293b] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
            {[
              { key: 'overview' as Tab, label: 'Overview', icon: Home },
              { key: 'violations' as Tab, label: 'Violations', icon: FileText },
              { key: 'complaints' as Tab, label: 'Complaints', icon: AlertTriangle },
              { key: 'timeline' as Tab, label: 'Timeline', icon: History },
              { key: 'landlord' as Tab, label: 'Landlord', icon: Users },
              { key: 'permits' as Tab, label: 'Permits', icon: Hammer },
              { key: 'sales' as Tab, label: 'Sales', icon: DollarSign },
              { key: 'neighborhood' as Tab, label: 'Neighborhood', icon: MapPin },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === key
                    ? 'bg-blue-500 text-white'
                    : 'text-[#94a3b8] hover:bg-[#1a2235] hover:text-white'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Score Breakdown */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">Score Breakdown</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {data.categoryScores.map((cat: any) => (
                  <div key={cat.category} className="text-center">
                    <div
                      className="w-24 h-24 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl font-bold"
                      style={{
                        background: `conic-gradient(${cat.color} ${cat.score * 3.6}deg, #1e293b ${cat.score * 3.6}deg)`,
                      }}
                    >
                      <div className="w-20 h-20 bg-[#0a0e17] rounded-full flex items-center justify-center">
                        {cat.score}
                      </div>
                    </div>
                    <div className="font-semibold mb-1">{cat.category}</div>
                    <div className="text-sm text-[#64748b]">{cat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <FileText size={20} className="text-[#64748b]" />
                  <span className="text-2xl font-bold">{data.violations.hpd.open || 0}</span>
                </div>
                <div className="text-sm text-[#94a3b8]">Open HPD Violations</div>
              </div>

              <div className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle size={20} className="text-[#64748b]" />
                  <span className="text-2xl font-bold">{data.complaints.hpd.total || 0}</span>
                </div>
                <div className="text-sm text-[#94a3b8]">Total Complaints</div>
              </div>

              <div className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <Users size={20} className="text-[#64748b]" />
                  <span className="text-2xl font-bold">{data.landlord.portfolio?.length || 0}</span>
                </div>
                <div className="text-sm text-[#94a3b8]">Buildings in Portfolio</div>
              </div>

              <div className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign size={20} className="text-[#64748b]" />
                  <span className="text-2xl font-bold">{data.sales.recent?.length || 0}</span>
                </div>
                <div className="text-sm text-[#94a3b8]">Sales on Record</div>
              </div>
            </div>

            {/* Activity Signals Chart */}
            {data.signals && data.signals.series && (
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold">Activity Signals</h3>
                  <div className="flex gap-2">
                    {(['30d', '90d', '1y', '3y'] as RangeKey[]).map(r => (
                      <button
                        key={r}
                        onClick={() => setRangeKey(r)}
                        className={`px-3 py-1 text-xs rounded-lg ${
                          rangeKey === r ? 'bg-blue-500 text-white' : 'bg-[#1a2235] text-[#94a3b8] hover:bg-[#232938]'
                        }`}
                      >
                        {r === '30d' ? '30 Days' : r === '90d' ? '90 Days' : r === '1y' ? '1 Year' : '3 Years'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-64">
                  <ChartBoundary title="Activity Signals">
                    <SignalsAreaChart data={data.signals} rangeKey={rangeKey} />
                  </ChartBoundary>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#1e293b]">
                  <div className="text-center">
                    <div className="text-xs text-[#64748b] mb-1">Violations</div>
                    <div className="text-xl font-bold">{data.signals.windows?.[rangeKey]?.violations || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-[#64748b] mb-1">Complaints</div>
                    <div className="text-xl font-bold">{data.signals.windows?.[rangeKey]?.complaints || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-[#64748b] mb-1">Permits</div>
                    <div className="text-xl font-bold">{data.signals.windows?.[rangeKey]?.permits || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-[#64748b] mb-1">311 Calls</div>
                    <div className="text-xl font-bold">{data.signals.windows?.[rangeKey]?.sr311 || 0}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            {data.timeline && data.timeline.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {data.timeline.slice(0, 10).map((event: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-[#0f172a] rounded-lg">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold">{event.type}</span>
                          <span className="text-xs text-[#64748b]">{event.date}</span>
                        </div>
                        <p className="text-sm text-[#94a3b8]">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Violations Tab */}
        {activeTab === 'violations' && (
          <div className="space-y-6">
            {/* Violations Summary */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="card p-6">
                <h3 className="font-semibold mb-4 text-[#64748b]">HPD Violations</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Open</span>
                    <span className="font-bold text-red-400">{data.violations.hpd.open || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Class A</span>
                    <span className="font-bold">{data.violations.hpd.classA || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Class B</span>
                    <span className="font-bold">{data.violations.hpd.classB || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Class C</span>
                    <span className="font-bold">{data.violations.hpd.classC || 0}</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-semibold mb-4 text-[#64748b]">DOB Violations</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Open</span>
                    <span className="font-bold text-red-400">{data.violations.dob.open || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total</span>
                    <span className="font-bold">{data.violations.dob.total || 0}</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-semibold mb-4 text-[#64748b]">ECB Violations</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Open</span>
                    <span className="font-bold text-red-400">{data.violations.ecb.open || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total</span>
                    <span className="font-bold">{data.violations.ecb.total || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Violations by Year Chart */}
            {data.violations.byYear && (
              <div className="card p-6">
                <h3 className="font-bold mb-4">Violations by Year</h3>
                <div className="h-64">
                  <ChartBoundary title="Violations by Year">
                    <ViolationsYearlyBarChart data={data.violations.byYear} />
                  </ChartBoundary>
                </div>
              </div>
            )}

            {/* Recent Violations List */}
            {data.violations.recent && data.violations.recent.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4">Recent Violations</h3>
                <div className="space-y-3">
                  {data.violations.recent.slice(0, 20).map((v: any, i: number) => (
                    <div key={i} className="p-4 bg-[#0f172a] rounded-lg">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`badge ${v.class === 'C' ? 'badge-red' : v.class === 'B' ? 'badge-yellow' : 'badge-blue'}`}>
                            Class {v.class}
                          </span>
                          <span className="text-xs text-[#64748b]">{v.source}</span>
                        </div>
                        <span className="text-xs text-[#64748b]">{v.date}</span>
                      </div>
                      <p className="text-sm text-[#e2e8f0]">{v.description}</p>
                      {v.status && (
                        <div className="mt-2">
                          <span className={`text-xs px-2 py-1 rounded ${v.status === 'Open' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                            {v.status}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Complaints Tab */}
        {activeTab === 'complaints' && (
          <div className="space-y-6">
            {/* Complaints Summary */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="card p-6">
                <h3 className="font-semibold mb-4 text-[#64748b]">HPD Complaints</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total</span>
                    <span className="font-bold">{data.complaints.hpd.total || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Emergency</span>
                    <span className="font-bold text-red-400">{data.complaints.hpd.emergency || 0}</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-semibold mb-4 text-[#64748b]">DOB Complaints</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total</span>
                    <span className="font-bold">{data.complaints.dob.total || 0}</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-semibold mb-4 text-[#64748b]">311 Service Requests</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total</span>
                    <span className="font-bold">{data.complaints.sr311.total || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Complaints by Category */}
            {data.complaints.byCategory && data.complaints.byCategory.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4">Complaints by Category</h3>
                <div className="space-y-2">
                  {data.complaints.byCategory.map((cat: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                      <span className="text-sm">{cat.category}</span>
                      <span className="font-bold">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Complaints */}
            {data.complaints.recent && data.complaints.recent.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4">Recent Complaints</h3>
                <div className="space-y-3">
                  {data.complaints.recent.slice(0, 20).map((c: any, i: number) => (
                    <div key={i} className="p-4 bg-[#0f172a] rounded-lg">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="badge badge-blue">{c.source}</span>
                          {c.type && <span className="text-xs text-[#64748b]">{c.type}</span>}
                        </div>
                        <span className="text-xs text-[#64748b]">{c.date}</span>
                      </div>
                      <p className="text-sm text-[#e2e8f0]">{c.description}</p>
                      {c.status && (
                        <div className="mt-2">
                          <span className={`text-xs px-2 py-1 rounded ${c.status.includes('Close') ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {c.status}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-bold mb-6">Complete Building Timeline</h3>
              {data.timeline && data.timeline.length > 0 ? (
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#1e293b]"></div>
                  <div className="space-y-6">
                    {data.timeline.map((event: any, i: number) => (
                      <div key={i} className="relative pl-12">
                        <div className="absolute left-2.5 w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="p-4 bg-[#0f172a] rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">{event.type}</span>
                            <span className="text-xs text-[#64748b]">{event.date}</span>
                          </div>
                          <p className="text-sm text-[#94a3b8]">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-[#64748b] py-8">No timeline events available</p>
              )}
            </div>
          </div>
        )}

        {/* Landlord Tab */}
        {activeTab === 'landlord' && (
          <div className="space-y-6">
            {/* Owners */}
            {data.landlord.owners && data.landlord.owners.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4">Property Owners</h3>
                <div className="space-y-3">
                  {data.landlord.owners.map((owner: any, i: number) => (
                    <div key={i} className="p-4 bg-[#0f172a] rounded-lg">
                      <div className="font-semibold mb-1">{owner.name}</div>
                      {owner.address && <p className="text-sm text-[#64748b]">{owner.address}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agents */}
            {data.landlord.agents && data.landlord.agents.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4">Managing Agents</h3>
                <div className="space-y-3">
                  {data.landlord.agents.map((agent: any, i: number) => (
                    <div key={i} className="p-4 bg-[#0f172a] rounded-lg">
                      <div className="font-semibold mb-1">{agent.name}</div>
                      {agent.phone && <p className="text-sm text-[#64748b]">Phone: {agent.phone}</p>}
                      {agent.address && <p className="text-sm text-[#64748b]">{agent.address}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Site Managers */}
            {data.landlord.siteManagers && data.landlord.siteManagers.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4">Site Managers</h3>
                <div className="space-y-3">
                  {data.landlord.siteManagers.map((manager: any, i: number) => (
                    <div key={i} className="p-4 bg-[#0f172a] rounded-lg">
                      <div className="font-semibold">{manager.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio */}
            {data.landlord.portfolio && data.landlord.portfolio.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4">Landlord Portfolio ({data.landlord.portfolio.length} buildings)</h3>
                <div className="space-y-2">
                  {data.landlord.portfolio.slice(0, 20).map((building: any, i: number) => (
                    <Link key={i} href={`/building/${building.bbl}`} className="block p-3 bg-[#0f172a] rounded-lg hover:bg-[#1a2235]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{building.address}</span>
                        <ChevronRight size={16} className="text-[#64748b]" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Permits Tab */}
        {activeTab === 'permits' && (
          <div className="space-y-6">
            {data.permits.recent && data.permits.recent.length > 0 ? (
              <div className="card p-6">
                <h3 className="font-bold mb-4">Building Permits</h3>
                <div className="space-y-3">
                  {data.permits.recent.map((permit: any, i: number) => (
                    <div key={i} className="p-4 bg-[#0f172a] rounded-lg">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <span className="font-semibold">{permit.type}</span>
                          {permit.number && <span className="text-xs text-[#64748b] ml-2">#{permit.number}</span>}
                        </div>
                        <span className="text-xs text-[#64748b]">{permit.date}</span>
                      </div>
                      {permit.description && <p className="text-sm text-[#94a3b8] mb-2">{permit.description}</p>}
                      {permit.status && (
                        <span className={`text-xs px-2 py-1 rounded ${permit.status.includes('Approved') ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {permit.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="card p-12 text-center">
                <Hammer className="w-16 h-16 text-[#4a5568] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Permits Found</h3>
                <p className="text-[#64748b]">No building permits on record for this property</p>
              </div>
            )}
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            {data.sales.recent && data.sales.recent.length > 0 ? (
              <div className="card p-6">
                <h3 className="font-bold mb-4">Property Sales History</h3>
                <div className="space-y-3">
                  {data.sales.recent.map((sale: any, i: number) => (
                    <div key={i} className="p-4 bg-[#0f172a] rounded-lg">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="font-semibold text-green-400">{sale.price}</div>
                          <div className="text-xs text-[#64748b]">{sale.date}</div>
                        </div>
                      </div>
                      {sale.buyer && (
                        <div className="text-sm text-[#94a3b8] mt-2">
                          <span className="text-[#64748b]">Buyer:</span> {sale.buyer}
                        </div>
                      )}
                      {sale.seller && (
                        <div className="text-sm text-[#94a3b8]">
                          <span className="text-[#64748b]">Seller:</span> {sale.seller}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="card p-12 text-center">
                <DollarSign className="w-16 h-16 text-[#4a5568] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Sales Records</h3>
                <p className="text-[#64748b]">No property sales found for this building</p>
              </div>
            )}
          </div>
        )}

        {/* Neighborhood Tab */}
        {activeTab === 'neighborhood' && (
          <div className="space-y-6">
            {/* Crime Data */}
            {data.crime && data.crime.byType && data.crime.byType.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Shield className="text-blue-400" size={20} /> Crime & Safety</h3>
                <div className="space-y-2">
                  {data.crime.byType.map((crime: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                      <span className="text-sm">{crime.type}</span>
                      <span className="font-bold">{crime.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Noise Complaints */}
            {data.noise && data.noise.byType && data.noise.byType.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Volume2 className="text-orange-400" size={20} /> Noise Complaints</h3>
                <div className="space-y-2">
                  {data.noise.byType.map((noise: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#0f172a] rounded-lg">
                      <span className="text-sm">{noise.type}</span>
                      <span className="font-bold">{noise.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transit Access */}
            {data.transit && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Train className="text-purple-400" size={20} /> Transit Access</h3>
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-[#0f172a] rounded-xl text-center">
                    <div className="text-2xl font-bold text-purple-400">{data.transit.nearestStation?.distance || 'N/A'}</div>
                    <div className="text-xs text-[#64748b]">Nearest Subway</div>
                    {data.transit.nearestStation?.name && <div className="text-xs text-[#94a3b8] mt-1">{data.transit.nearestStation.name}</div>}
                  </div>
                  <div className="p-3 bg-[#0f172a] rounded-xl text-center">
                    <div className="text-2xl font-bold text-blue-400">{data.transit.stationsWithin5min || 0}</div>
                    <div className="text-xs text-[#64748b]">Stations (5 min walk)</div>
                  </div>
                  <div className="p-3 bg-[#0f172a] rounded-xl text-center">
                    <div className="text-2xl font-bold text-emerald-400">{data.transit.totalLines || 0}</div>
                    <div className="text-xs text-[#64748b]">Subway Lines</div>
                  </div>
                </div>
                {data.transit.lines && data.transit.lines.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {data.transit.lines.map((line: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-semibold">{line}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Restaurants */}
            {data.restaurants && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2"><UtensilsCrossed className="text-yellow-400" size={20} /> Restaurants Nearby</h3>
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-[#0f172a] rounded-xl text-center">
                    <div className="text-2xl font-bold text-yellow-400">{data.restaurants.total || 0}</div>
                    <div className="text-xs text-[#64748b]">Total Restaurants</div>
                  </div>
                  <div className="p-3 bg-[#0f172a] rounded-xl text-center">
                    <div className="text-2xl font-bold text-orange-400">{data.restaurants.avgScore || 'N/A'}</div>
                    <div className="text-xs text-[#64748b]">Avg Health Score</div>
                  </div>
                  <div className="p-3 bg-[#0f172a] rounded-xl text-center">
                    <div className="text-2xl font-bold text-red-400">{data.restaurants.violations || 0}</div>
                    <div className="text-xs text-[#64748b]">Health Violations</div>
                  </div>
                </div>
                {data.restaurants.note && <p className="text-sm text-orange-400">{data.restaurants.note}</p>}
              </div>
            )}

            {/* Cooling Towers (Legionella) */}
            {data.coolingTowers && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Factory className="text-gray-400" size={20} /> Cooling Towers (Legionella Risk)</h3>
                <div className={`p-4 rounded-xl ${data.coolingTowers.hasTower ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-green-500/10 border border-green-500/30'}`}>
                  <div className="flex items-center justify-between">
                    <span>Cooling Tower Present</span>
                    <span className={`font-bold ${data.coolingTowers.hasTower ? 'text-yellow-400' : 'text-green-400'}`}>{data.coolingTowers.hasTower ? `YES (${data.coolingTowers.count})` : 'NO'}</span>
                  </div>
                  {data.coolingTowers.hasTower && (
                    <p className="text-xs text-[#64748b] mt-2">{data.coolingTowers.riskNote}</p>
                  )}
                  {data.coolingTowers.lastCertification && (
                    <p className="text-xs text-[#64748b] mt-1">Last certification: {data.coolingTowers.lastCertification}</p>
                  )}
                </div>
              </div>
            )}

            {/* Tax Exemptions & Rent Stabilization */}
            {data.taxExemptions && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Building2 className="text-blue-400" size={20} /> Tax Exemptions & Rent Stabilization</h3>
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${data.taxExemptions.has421a ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-[#0f172a]'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">421-a Exemption</span>
                      <span className={`font-bold ${data.taxExemptions.has421a ? 'text-blue-400' : 'text-[#64748b]'}`}>{data.taxExemptions.has421a ? 'YES' : 'NO'}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${data.taxExemptions.hasJ51 ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-[#0f172a]'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">J-51 Exemption</span>
                      <span className={`font-bold ${data.taxExemptions.hasJ51 ? 'text-blue-400' : 'text-[#64748b]'}`}>{data.taxExemptions.hasJ51 ? 'YES' : 'NO'}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${data.taxExemptions.rentStabilizedByExemption ? 'bg-green-500/10 border border-green-500/30' : 'bg-[#0f172a]'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rent Stabilized</span>
                      <span className={`font-bold ${data.taxExemptions.rentStabilizedByExemption ? 'text-green-400' : 'text-[#64748b]'}`}>{data.taxExemptions.rentStabilizedByExemption ? 'LIKELY' : 'UNKNOWN'}</span>
                    </div>
                  </div>
                </div>
                {data.taxExemptions.note && <p className="text-sm text-blue-400 mb-2">{data.taxExemptions.note}</p>}
                {data.taxExemptions.exemptionExpiration && <p className="text-sm text-yellow-400"><AlertTriangle className="inline mr-1" size={14} /> Exemption expires: {data.taxExemptions.exemptionExpiration} - rent may increase after</p>}
              </div>
            )}

            {/* Financial Health */}
            {data.financialHealth && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Wallet className="text-green-400" size={20} /> Building Financial Health</h3>
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-[#0f172a] rounded-xl text-center">
                    <div className="text-2xl font-bold" style={{ color: data.financialHealth.score >= 70 ? '#10b981' : data.financialHealth.score >= 50 ? '#f59e0b' : '#ef4444' }}>{data.financialHealth.score}</div>
                    <div className="text-xs text-[#64748b]">Financial BHX Score</div>
                  </div>
                  <div className="p-3 bg-[#0f172a] rounded-xl text-center">
                    <div className="text-2xl font-bold" style={{ color: data.financialHealth.taxLiens === 0 ? '#10b981' : '#ef4444' }}>{data.financialHealth.taxLiens}</div>
                    <div className="text-xs text-[#64748b]">Tax Liens</div>
                  </div>
                  <div className="p-3 bg-[#0f172a] rounded-xl text-center">
                    <div className="text-lg font-bold" style={{ color: data.financialHealth.level === 'HEALTHY' ? '#10b981' : data.financialHealth.level === 'FAIR' ? '#f59e0b' : '#ef4444' }}>{data.financialHealth.level}</div>
                    <div className="text-xs text-[#64748b]">Status</div>
                  </div>
                </div>
                {data.taxLiens?.warning && <p className="text-sm text-red-400">{data.taxLiens.warning}</p>}
              </div>
            )}

            {/* Flood & Hurricane */}
            <div className="card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Droplet className="text-blue-400" size={20} /> Flood & Hurricane Risk</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl ${data.flood?.inFloodZone ? 'bg-red-500/10 border border-red-500/30' : 'bg-green-500/10 border border-green-500/30'}`}>
                  <div className="flex items-center justify-between">
                    <span>FEMA Flood Zone</span>
                    <span className={`font-bold ${data.flood?.inFloodZone ? 'text-red-400' : 'text-green-400'}`}>{data.flood?.inFloodZone ? data.flood.floodZoneType || 'YES' : 'NO'}</span>
                  </div>
                  <p className="text-xs text-[#64748b] mt-1">{data.flood?.inFloodZone ? 'Consider flood insurance' : 'Not in a flood zone'}</p>
                </div>
                <div className={`p-4 rounded-xl ${data.flood?.inHurricaneZone ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-green-500/10 border border-green-500/30'}`}>
                  <div className="flex items-center justify-between">
                    <span>Hurricane Evac Zone</span>
                    <span className={`font-bold ${data.flood?.inHurricaneZone ? 'text-orange-400' : 'text-green-400'}`}>{data.flood?.inHurricaneZone ? `Zone ${data.flood.hurricaneZone}` : 'NO'}</span>
                  </div>
                  <p className="text-xs text-[#64748b] mt-1">{data.flood?.inHurricaneZone ? 'May need to evacuate during hurricanes' : 'Not in evacuation zone'}</p>
                </div>
              </div>
            </div>

            {/* Parks & Green Space */}
            <div className="card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Trees className="text-green-400" size={20} /> Parks & Green Space</h3>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-[#0f172a] rounded-xl text-center"><div className="text-2xl font-bold text-green-400">{data.parks?.count || 0}</div><div className="text-xs text-[#64748b]">Parks Nearby</div></div>
                <div className="p-3 bg-[#0f172a] rounded-xl text-center"><div className="text-2xl font-bold text-emerald-400">{data.parks?.totalAcres || 0}</div><div className="text-xs text-[#64748b]">Total Acres</div></div>
                <div className="p-3 bg-[#0f172a] rounded-xl text-center"><div className="text-2xl font-bold text-lime-400">{data.trees?.count || 0}</div><div className="text-xs text-[#64748b]">Street Trees</div></div>
              </div>
              {data.parks?.nearby?.length > 0 && (
                <div className="space-y-2">
                  {data.parks.nearby.slice(0,5).map((p: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-[#0f172a] rounded-lg">
                      <span>{p.name}</span>
                      {p.acres && <span className="text-xs text-[#64748b]">{p.acres} acres</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* External Links */}
        <div className="card p-6 mt-6">
          <h3 className="font-bold mb-4">Official Records</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'HPD Building Profile', url: `https://hpdonline.nyc.gov/hpdonline/building/${bbl}` },
              { label: 'DOB Building Info', url: `https://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${bbl[0]}&block=${bbl.slice(1,6)}&lot=${bbl.slice(6)}` },
              { label: 'ACRIS (Sales)', url: `https://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${bbl[0]}&block=${bbl.slice(1,6)}&lot=${bbl.slice(6)}` },
              { label: 'Who Owns What', url: `https://whoownswhat.justfix.org/bbl/${bbl}` },
            ].map(link => (<a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-[#1a2235] rounded-xl hover:bg-[#232938] text-sm"><span>{link.label}</span><ExternalLink size={14} className="text-[#4a5568]" /></a>))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-[#151c2c] rounded-xl border border-[#1e293b] text-center">
          <p className="text-xs text-[#64748b]">{data.dataDisclaimer}</p>
        </div>
      </main>
    </div>
  )
}
