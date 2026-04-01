'use client'

import React, { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertTriangle, CheckCircle, XCircle, ChevronRight, ChevronLeft, Home, FileText, Users, History, Hammer, MapPin, DollarSign, Clock, Star, ThumbsUp, MessageSquare, Flame, Bug, Volume2, ShieldAlert, ExternalLink } from 'lucide-react'
import { buildGuidePanel, VIOLATION_GUIDE_LINK_MAP } from '@/lib/violation-blog-map'
import ViolationLeadForm, { VIOLATION_SERVICE_MAP } from '@/components/ViolationLeadForm'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ACRISPanel from '@/components/ACRISPanel'

const SignalsAreaChart = dynamic(() => import('./SignalsAreaChart'), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center text-xs text-[#666]">Loading chart…</div>,
})

const ViolationsYearlyBarChart = dynamic(() => import('./ViolationsYearlyBarChart'), {
  ssr: false,
  loading: () => <div className="h-full w-full flex items-center justify-center text-xs text-[#666]">Loading chart…</div>,
})

type Tab = 'overview' | 'violations' | 'complaints' | 'timeline' | 'landlord' | 'permits' | 'sales' | 'neighborhood'
type RangeKey = '30d' | '90d' | '1y' | '3y'

class ChartBoundary extends React.Component<
  { children: React.ReactNode; title?: string },
  { hasError: boolean }
> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: any) { console.error('Chart render error:', error) }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center text-center px-4">
          <div>
            <div className="text-sm font-semibold text-[#111]">Chart unavailable</div>
            <div className="text-xs text-[#666] mt-1">
              {this.props.title ? `${this.props.title} couldn't load for this building.` : 'This chart could not be rendered for this building.'}
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

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

// ── Shared score helpers ────────────────────────────────────────
function sc(v: number) {
  return v >= 80 ? '#10b981' : v >= 60 ? '#f59e0b' : v >= 40 ? '#f97316' : '#ef4444'
}

function ScoreBar({ score, height = 4 }: { score: number; height?: number }) {
  const c = sc(score)
  return (
    <div style={{ height, background: '#e0e0e0', borderRadius: height / 2, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${score}%`, background: c, borderRadius: height / 2, transition: 'width .6s' }} />
    </div>
  )
}


// ── Category icon map (SVG, no emojis) ─────────────────────────
function CategoryIcon({ name }: { name: string }) {
  const n = name.toLowerCase()
  const s = { width:14, height:14 }
  const p = { fill:"none", stroke:"currentColor", strokeWidth:"2", strokeLinecap:"round" as const, strokeLinejoin:"round" as const }
  if (n.includes("heat") || n.includes("hot water"))
    return <svg {...s} viewBox="0 0 24 24" {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
  if (n.includes("pest") || n.includes("bug"))
    return <svg {...s} viewBox="0 0 24 24" {...p}><path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 12H3"/><path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"/><path d="M6 8l-3-3"/><path d="M18 8l3-3"/><path d="M6 16l-3 3"/><path d="M18 16l3 3"/></svg>
  if (n.includes("maintenance") || n.includes("repair"))
    return <svg {...s} viewBox="0 0 24 24" {...p}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
  if (n.includes("safety") && !n.includes("pedestrian") && !n.includes("traffic"))
    return <svg {...s} viewBox="0 0 24 24" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  if (n.includes("landlord") || n.includes("owner"))
    return <svg {...s} viewBox="0 0 24 24" {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  if (n.includes("stability") || n.includes("financial health"))
    return <svg {...s} viewBox="0 0 24 24" {...p}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  if (n.includes("violent") || n.includes("shooting"))
    return <svg {...s} viewBox="0 0 24 24" {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  if (n.includes("crime"))
    return <svg {...s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>
  if (n.includes("pedestrian") || n.includes("traffic"))
    return <svg {...s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>
  if (n.includes("transit") || n.includes("subway") || n.includes("bus"))
    return <svg {...s} viewBox="0 0 24 24" {...p}><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 2v5"/><circle cx="8.5" cy="17" r="1.5"/><circle cx="15.5" cy="17" r="1.5"/><path d="M8 12h8"/></svg>
  if (n.includes("noise") || n.includes("sound"))
    return <svg {...s} viewBox="0 0 24 24" {...p}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
  if (n.includes("flood") || n.includes("water"))
    return <svg {...s} viewBox="0 0 24 24" {...p}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
  // default
  return <svg {...s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
}

function CategoryCard({ name, icon, score, detail, onClick }: {
  name: string; icon: string; score: number; detail?: string; onClick?: () => void
}) {
  const c = sc(score)
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 55 ? 'D' : 'F'
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 bg-white border-2 border-[#e0e0e0] hover:border-[#0b8a7a] transition-colors cursor-pointer group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="text-xs text-[#666] group-hover:text-[#555] transition-colors leading-snug">{icon} {name}</div>
        <div className="flex items-baseline gap-1.5 flex-shrink-0">
          <span className="text-2xl font-black leading-none" style={{ color: c }}>{score}</span>
          <span className="text-sm font-bold" style={{ color: c }}>{grade}</span>
        </div>
      </div>
      <ScoreBar score={score} height={4} />
      {detail && <div className="text-xs text-[#777] mt-2">{detail}</div>}
    </button>
  )
}

function InlineScore({ value, label }: { value: number; label: string }) {
  const c = sc(value)
  return (
    <div className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
      <div className="text-2xl font-black mb-2" style={{ color: c }}>{value}</div>
      <ScoreBar score={value} height={3} />
      <div className="text-xs text-[#777] mt-2">{label}</div>
    </div>
  )
}

export default function BuildingPage() {
  const params = useParams()
  const router = useRouter()
  const bbl = params.bbl as string
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<Tab>('overview')
  const [range, setRange] = useState<RangeKey>('90d')
  

  const pendingScrollRef = React.useRef<{ tab: Tab; sectionId?: string } | null>(null)

  const goToTabAndScroll = (nextTab: Tab, sectionId?: string) => {
    setTab(nextTab)
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('tab', nextTab)
      if (sectionId) url.searchParams.set('section', sectionId)
      else url.searchParams.delete('section')
      window.history.replaceState({}, '', url.toString())
    } catch {}
    pendingScrollRef.current = { tab: nextTab, sectionId }
  }

  const signalSeries = useMemo(() => {
    const series = data?.signals?.series
    if (!series) return []
    if (range === '30d') return Array.isArray(series.daily30) ? series.daily30 : []
    if (range === '90d') return Array.isArray(series.weekly90) ? series.weekly90 : []
    const monthly = Array.isArray(series.monthly36) ? series.monthly36 : []
    if (range === '1y') return monthly.slice(-12)
    return monthly
  }, [data, range])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.matchMedia('(max-width: 639px)').matches
    if (!isMobile) return
    requestAnimationFrame(() => {
      ;(document.activeElement as HTMLElement | null)?.blur()
      window.scrollTo(0, 0)
    })
  }, [])

  useEffect(() => {
    try {
      const qs = new URLSearchParams(window.location.search)
      const r = (qs.get('range') || '').toLowerCase()
      if (r === '30d' || r === '90d' || r === '1y' || r === '3y') setRange(r)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      const qs = new URLSearchParams(window.location.search)
      const t = (qs.get('tab') || '').toLowerCase()
      const sectionId = qs.get('section') || undefined
      const allowed: Tab[] = ['overview', 'violations', 'complaints', 'timeline', 'landlord', 'permits', 'sales', 'neighborhood']
      if (allowed.includes(t as Tab)) {
        setTab(t as Tab)
        pendingScrollRef.current = { tab: t as Tab, sectionId }
      }
    } catch {}
  }, [])

  useEffect(() => {
    const pending = pendingScrollRef.current
    if (!pending) return
    if (pending.tab !== tab) return
    if (!pending.sectionId) { pendingScrollRef.current = null; return }
    const id = pending.sectionId
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); pendingScrollRef.current = null; return true }
      return false
    }
    if (tryScroll()) return
    const raf = requestAnimationFrame(() => { tryScroll() })
    return () => cancelAnimationFrame(raf)
  }, [tab, data])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/building?bbl=${bbl}`)
        const json = await res.json()
        if (json.error) setError(json.error)
        else setData(normalizeBuildingData(json))
      } catch { setError('Failed to load data') }
      finally { setLoading(false) }
    }
    if (bbl) load()
  }, [bbl])

    useEffect(() => {
    if (typeof window === 'undefined') return
    if (loading) { document.body.style.overflow = 'hidden'; document.body.style.touchAction = 'none' }
    else { document.body.style.overflow = ''; document.body.style.touchAction = '' }
    return () => { document.body.style.overflow = ''; document.body.style.touchAction = '' }
  }, [loading])

  if (loading) return (
    <div style={{ minHeight:'100vh', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <style>{`@keyframes bhx-spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:56, height:56, border:'2px solid #e0e0e0', position:'relative', margin:'0 auto 20px' }}>
          <div style={{ position:'absolute', inset:-2, border:'2px solid transparent', borderTopColor:'#0b8a7a', borderRadius:'50%', animation:'bhx-spin 0.8s linear infinite' }} />
        </div>
        <p style={{ fontFamily:'"Bebas Neue","Space Mono",sans-serif', fontSize:26, letterSpacing:'0.08em', color:'#0a0a0a', margin:'0 0 6px' }}>Analyzing Building</p>
        <p style={{ fontFamily:'"Space Mono",monospace', fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'#888', margin:0 }}>Fetching from 30+ data sources</p>
      </div>
    </div>
  )

  if (error || !data) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Building Not Found</h1>
        <p className="text-[#555] mb-6">{error}</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0b8a7a] hover:bg-blue-600 font-semibold">
          <ChevronLeft size={18} />Back to Search
        </Link>
      </div>
    </div>
  )

  const safeDate = (value: any, options?: Intl.DateTimeFormatOptions): string => {
    if (!value) return '—'
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return '—'
    try { return d.toLocaleDateString('en-US', options) } catch { return '—' }
  }

  const safeMoney = (value: any): string => {
    const n = typeof value === 'number' ? value : Number(value)
    return Number.isFinite(n) ? n.toLocaleString() : '—'
  }

  const { building: b, score: s } = data
  const scoreColor = sc(s.overall)
  const circumference = 2 * Math.PI * 42
  const strokeDashoffset = circumference - (s.overall / 100) * circumference

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'violations', label: 'Violations', icon: AlertTriangle },
    { id: 'complaints', label: 'Complaints', icon: FileText },
    { id: 'timeline', label: 'Timeline', icon: History },
    { id: 'landlord', label: 'Landlord', icon: Users },
    { id: 'permits', label: 'Permits', icon: Hammer },
    { id: 'sales', label: 'Sales', icon: DollarSign },
    { id: 'neighborhood', label: 'Neighborhood', icon: MapPin },
  ]

  const rangeOptions: { key: RangeKey; label: string; subtitle: string }[] = [
    { key: '30d', label: '30 days', subtitle: 'most recent' },
    { key: '90d', label: '90 days', subtitle: 'recent pattern' },
    { key: '1y', label: '1 year', subtitle: 'seasonality' },
    { key: '3y', label: '3 years', subtitle: 'longer trend' },
  ]

  const windowSignals = data?.signals?.windows?.[range]
  const signalCounts = windowSignals?.counts || { heat: 0, pests: 0, noise: 0, other: 0, total: 0 }
  const signalDeltas = windowSignals?.deltas || { heat: 0, pests: 0, noise: 0, other: 0, total: 0 }
  const rangeLabel = rangeOptions.find(r => r.key === range)?.label || '90 days'

  const catNav = (name: string) => {
    const n = String(name || '').toLowerCase()
    if (n.includes('pest')) return goToTabAndScroll('neighborhood', 'section-pest-control')
    if (n.includes('heat') || n.includes('hot water')) return goToTabAndScroll('complaints', 'section-heat-hot-water')
    if (n.includes('noise')) return goToTabAndScroll('neighborhood', 'section-noise')
    if (n.includes('crime') || n.includes('safety')) return goToTabAndScroll('neighborhood', 'section-crime')
    if (n.includes('violation')) return goToTabAndScroll('violations', 'section-building-violations')
    if (n.includes('transit')) return goToTabAndScroll('neighborhood', 'section-transit')
    return goToTabAndScroll('overview')
  }

  return (
    <div className="min-h-screen" style={{ background:'#fff' }}>

      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-28 pb-10">

        {/* ══ HERO — Magazine Spread ══ */}
        <div style={{ border:'2px solid #0a0a0a', marginBottom:24, overflow:'hidden' }}>

          {/* Address eyebrow bar */}
          <div style={{ borderBottom:'1px solid #e0e0e0', padding:'8px 20px', display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontFamily:'"Space Mono",monospace', fontSize:9, letterSpacing:'.14em', textTransform:'uppercase', color:'#888' }}>BHX Building Report</span>
            <span style={{ width:1, height:12, background:'#ddd', flexShrink:0 }} />
            <span style={{ fontFamily:'"Space Mono",monospace', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:'#555' }}>
              {b?.neighborhood && `${b.neighborhood} · `}{b?.borough} · NY {b?.zipcode}
            </span>
          </div>

          {/* Main two-column split */}
          <div className="bhx-report-grid" style={{ display:'grid', gridTemplateColumns:'160px 1fr' }}>

            {/* LEFT — score + meta */}
            <div style={{ background:'#f5f5f5', borderRight:'2px solid #0a0a0a', padding:'20px 10px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0 }}>
              <div style={{ fontFamily:'Georgia,serif', fontSize:'clamp(44px,10vw,80px)', fontWeight:700, lineHeight:1, color:scoreColor, letterSpacing:'-0.02em' }}>{s.grade}</div>
              <div style={{ fontFamily:'"Space Mono",monospace', fontSize:'clamp(18px,5vw,28px)', fontWeight:700, color:scoreColor, lineHeight:1, marginTop:2 }}>{s.overall}</div>
              <div style={{ fontFamily:'"Space Mono",monospace', fontSize:8, letterSpacing:'.12em', textTransform:'uppercase', color:'#888', marginTop:4 }}>/ 100 BHX</div>
              <div style={{ fontFamily:'"Space Mono",monospace', fontSize:9, letterSpacing:'.1em', textTransform:'uppercase', color:scoreColor, fontWeight:700, marginTop:10, padding:'3px 8px', border:`1px solid ${scoreColor}`, display:'inline-block' }}>{s.label}</div>
              <div style={{ marginTop:20, width:'100%' }}>
                {b?.unitsRes > 0 && <div style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:'1px solid #e0e0e0', fontSize:10 }}><span style={{ color:'#888' }}>Units</span><span style={{ fontWeight:700, color:'#0a0a0a' }}>{b.unitsRes?.toLocaleString()}</span></div>}
                {b?.yearBuilt && <div style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:'1px solid #e0e0e0', fontSize:10 }}><span style={{ color:'#888' }}>Built</span><span style={{ fontWeight:700, color:'#0a0a0a' }}>{b.yearBuilt}</span></div>}
                {b?.floors > 0 && <div style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:'1px solid #e0e0e0', fontSize:10 }}><span style={{ color:'#888' }}>Floors</span><span style={{ fontWeight:700, color:'#0a0a0a' }}>{b.floors}</span></div>}
                {b?.buildingClassDesc && <div style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', fontSize:10 }}><span style={{ color:'#888' }}>Type</span><span style={{ fontWeight:700, color:'#0a0a0a', textAlign:'right', maxWidth:80, fontSize:9 }}>{b.buildingClassDesc}</span></div>}
              </div>
            </div>

            {/* RIGHT — address + flags + badges */}
            <div style={{ padding:'20px 16px', background:'#fff' }}>
              <h1 style={{ fontFamily:'"Bebas Neue",Georgia,sans-serif', fontSize:'clamp(20px,4vw,52px)', lineHeight:.9, letterSpacing:'.03em', color:'#0a0a0a', marginBottom:8 }}>{b?.address || 'Unknown Address'}</h1>

              {/* Program badges */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:16 }}>
                {b?.isRentStabilized && <span className="badge badge-cyan">Rent Stabilised</span>}
                {data.programs?.aep && <span className="badge badge-red">AEP Building</span>}
                {data.programs?.speculationWatch && <span className="badge badge-orange">Speculation Watch</span>}
                {b?.isNycha && <span className="badge badge-purple">NYCHA</span>}
                {b?.isSubsidized && <span className="badge badge-green">Subsidised</span>}
              </div>

              {/* Red flags inline — only when present */}
              {data.redFlags?.length > 0 && (
                <div style={{ borderLeft:'3px solid #e24b4a', paddingLeft:14, marginBottom:16 }}>
                  <div style={{ fontFamily:'"Space Mono",monospace', fontSize:9, letterSpacing:'.08em', textTransform:'uppercase', color:'#e24b4a', fontWeight:700, marginBottom:6 }}>
                    {data.redFlags.length} Red Flag{data.redFlags.length > 1 ? 's' : ''} Detected
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                    {data.redFlags.slice(0, 6).map((f: any, i: number) => (
                      <div key={i} style={{ fontSize:11, color: f.severity === 'critical' ? '#c0392b' : f.severity === 'warning' ? '#b45309' : '#555', display:'flex', gap:6, alignItems:'flex-start' }}>
                        <span style={{ width:4, height:4, borderRadius:'50%', background: f.severity === 'critical' ? '#e24b4a' : f.severity === 'warning' ? '#d97706' : '#888', flexShrink:0, marginTop:4 }} />
                        <span><strong>{f.title}</strong> — {f.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick stats row */}
              <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:'"Space Mono",monospace', fontSize:22, fontWeight:700, color: (data.violations?.hpd?.classC ?? 0) > 0 ? '#e24b4a' : '#10b981', lineHeight:1 }}>{data.violations?.hpd?.classC ?? 0}</div>
                  <div style={{ fontFamily:'"Space Mono",monospace', fontSize:8, letterSpacing:'.1em', textTransform:'uppercase', color:'#888', marginTop:3 }}>Class C</div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:'"Space Mono",monospace', fontSize:22, fontWeight:700, color: (data.complaints?.hpd?.heatHotWater ?? 0) > 5 ? '#d97706' : '#10b981', lineHeight:1 }}>{data.complaints?.hpd?.heatHotWater ?? 0}</div>
                  <div style={{ fontFamily:'"Space Mono",monospace', fontSize:8, letterSpacing:'.1em', textTransform:'uppercase', color:'#888', marginTop:3 }}>Heat complaints</div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:'"Space Mono",monospace', fontSize:22, fontWeight:700, color: (data.evictions?.total ?? 0) > 0 ? '#e24b4a' : '#10b981', lineHeight:1 }}>{data.evictions?.total ?? 0}</div>
                  <div style={{ fontFamily:'"Space Mono",monospace', fontSize:8, letterSpacing:'.1em', textTransform:'uppercase', color:'#888', marginTop:3 }}>Evictions</div>
                </div>
                {data.pests?.bedbugReports > 0 && (
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontFamily:'"Space Mono",monospace', fontSize:22, fontWeight:700, color:'#e24b4a', lineHeight:1 }}>{data.pests.bedbugReports}</div>
                    <div style={{ fontFamily:'"Space Mono",monospace', fontSize:8, letterSpacing:'.1em', textTransform:'uppercase', color:'#888', marginTop:3 }}>Bedbug reports</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Category score strip */}
          {data.categoryScores?.length > 0 && (
            <div className="bhx-cat-strip" style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(data.categoryScores.length, 6)}, 1fr)`, borderTop:'2px solid #0a0a0a' }}>
              {data.categoryScores.map((c: any, i: number) => {
                const cc = sc(c.score)
                return (
                  <button
                    key={c.name}
                    onClick={() => catNav(c.name)}
                    style={{
                      padding:'12px 10px', textAlign:'left', background:'#fff', border:'none',
                      borderRight: i < data.categoryScores.length - 1 ? '1px solid #e0e0e0' : 'none',
                      cursor:'pointer', transition:'background .12s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background='#f5f5f5')}
                    onMouseLeave={e => (e.currentTarget.style.background='#fff')}
                  >
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6 }}>
                      <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:9, color:'#666', letterSpacing:'.04em', textTransform:'uppercase', fontFamily:'"Space Mono",monospace' }}>
                        <CategoryIcon name={c.name} />{c.name}
                      </span>
                      <span style={{ fontSize:14, fontWeight:700, color:cc, flexShrink:0, marginLeft:4 }}>{c.score}</span>
                    </div>
                    <div style={{ height:3, background:'#efefef', borderRadius:0 }}>
                      <div style={{ height:'100%', width:`${c.score}%`, background:cc, transition:'width .6s' }} />
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* ══ TAB BAR ══ */}
        {/* ══ TAB BAR ══ */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`tab flex items-center gap-1.5 flex-shrink-0 ${tab === t.id ? 'tab-active' : ''}`}
            >
              <t.icon size={14} />{t.label}
              {t.id === 'violations' && (data?.violations?.hpd?.classC ?? 0) > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400">{data.violations.hpd.classC}C</span>
              )}
              {t.id === 'complaints' && (data?.complaints?.hpd?.heatHotWater ?? 0) > 5 && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5 text-orange-400"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
              )}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            OVERVIEW TAB
        ══════════════════════════════════════════ */}
        {tab === 'overview' && (
          <div className="space-y-5 animate-fade-in">

            {/* Range toggle — compact */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
              <span style={{ fontFamily:'"Space Mono",monospace', fontSize:9, letterSpacing:'.12em', textTransform:'uppercase', color:'#888' }}>Window</span>
              <div style={{ display:'flex', gap:0 }}>
                {rangeOptions.map((r, i) => (
                  <button key={r.key} onClick={() => setRange(r.key)} style={{ fontFamily:'"Space Mono",monospace', fontSize:9, letterSpacing:'.08em', textTransform:'uppercase', padding:'5px 12px', background: range === r.key ? '#0b8a7a' : '#fff', color: range === r.key ? '#fff' : '#666', border:'1px solid #ddd', borderRight: i < rangeOptions.length - 1 ? 'none' : '1px solid #ddd', cursor:'pointer', transition:'all .12s' }}>{r.label}</button>
                ))}
              </div>
              <span className="hidden sm:inline" style={{ fontFamily:'"Space Mono",monospace', fontSize:9, color:'#aaa' }}>vs prior period</span>
            </div>

            {/* Signal stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Heat & hot water reports', count: signalCounts.heat, delta: signalDeltas.heat, icon: <Flame size={16} className="text-yellow-400" />, cls: 'stat-yellow', numCls: 'text-yellow-600' },
                { label: 'Pest signals', count: signalCounts.pests, delta: signalDeltas.pests, icon: <Bug size={16} className="text-emerald-400" />, cls: 'stat-green', numCls: 'text-emerald-700' },
                { label: 'Noise signals', count: signalCounts.noise, delta: signalDeltas.noise, icon: <Volume2 size={16} className="text-[#0b8a7a]" />, cls: 'stat-blue', numCls: 'text-[#076d5f]' },
                { label: 'Hazardous violations', count: data?.violations?.hpd?.classC ?? 0, delta: 0, sub: 'Class C', icon: <ShieldAlert size={16} className="text-red-400" />, cls: 'stat-red', numCls: 'text-red-600' },
              ].map(({ label, count, delta, icon, cls, numCls, sub }: any) => (
                <div key={label} className={`card p-5 ${cls}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[#666] text-[10px] sm:text-xs leading-tight">{label}</div>
                    {icon}
                  </div>
                  <div className={`text-3xl font-black ${numCls}`}>{count}</div>
                  <div className={`text-xs mt-1 ${delta > 0 ? 'text-red-600' : delta < 0 ? 'text-emerald-700' : 'text-[#777]'}`}>
                    {sub ?? (delta === 0 ? 'No change vs prior period' : `${delta > 0 ? '+' : ''}${delta} vs prior period`)}
                  </div>
                </div>
              ))}
            </div>

            {/* Area chart */}
            <div className="card p-6">
              <div className="bhx-chart-header flex items-start justify-between mb-4 gap-2">
                <h3 className="font-bold text-sm sm:text-base">Reports over time ({rangeLabel})</h3>
                <div className="text-[10px] sm:text-xs text-[#666] text-right">Heat / Pests / Noise / Other</div>
              </div>
              <div className="h-72">
                <ChartBoundary title="Reports over time">
                  <SignalsAreaChart data={signalSeries || []} />
                </ChartBoundary>
              </div>
              <div className="mt-3 text-xs text-[#666]">
                Total reports in this window: <span style={{fontWeight:700,color:"#0a0a0a"}}>{signalCounts.total}</span>
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════
            VIOLATIONS TAB
        ══════════════════════════════════════════ */}
        {tab === 'violations' && (
          <div className="space-y-5 animate-fade-in">

            {/* Summary counts */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { label: 'Class C', val: data?.violations?.hpd?.classC ?? 0, cls: 'text-red-400' },
                { label: 'Class B', val: data.violations.hpd.classB, cls: 'text-yellow-400' },
                { label: 'Class A', val: data.violations.hpd.classA, cls: 'text-[#0b8a7a]' },
                { label: 'Total HPD', val: data.violations.hpd.total, cls: 'text-white' },
                { label: 'DOB', val: data.violations.dob.total, cls: 'text-orange-400' },
                { label: 'ECB', val: data.violations.ecb.total, cls: 'text-purple-400' },
              ].map(({ label, val, cls }) => (
                <div key={label} className="card p-4 text-center">
                  <div className={`text-2xl font-black ${cls}`}>{val}</div>
                  <div className="text-xs text-[#666] mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Yearly chart */}
            <div className="card p-6">
              <h3 className="font-bold mb-4 text-base">Violations by year</h3>
              <div className="h-56">
                <ChartBoundary title="Violations by Year">
                  <ViolationsYearlyBarChart data={(data.yearlyStats ? data.yearlyStats.slice(0, 8).reverse() : [])} />
                </ChartBoundary>
              </div>
            </div>

            <div className="card p-6" id="section-building-violations">
              <h3 className="font-bold mb-4 text-base">Recent violations ({data.violations.recent?.length})</h3>


              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {data.violations.recent?.length > 0 ? data.violations.recent.map((v: any) => {
                  return (
                    <div key={v.id} className="p-4 bg-[#f5f5f5] rounded-xl border border-[#ddd]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <span className={`px-2 py-1 rounded text-xs font-bold flex-shrink-0 ${v.class === 'C' ? 'violation-c' : v.class === 'B' ? 'violation-b' : v.source === 'DOB' ? 'badge-orange' : 'violation-a'}`}>
                            {v.source}{v.class ? ` ${v.class}` : ''}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm">{v.description}</p>
                            <div className="flex gap-3 mt-1 text-xs text-[#666]">
                              <span>{v.category}</span>
                              {v.unit && <span>Unit: {v.unit}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className={`text-xs font-medium ${v.status === 'Open' ? 'text-red-400' : 'text-[#666]'}`}>{v.status}</span>
                          <p className="text-xs text-[#888] mt-1">{v.date && new Date(v.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {/* Contextual lead form — only for open violations with a mapped service */}
                      {v.status === 'Open' && VIOLATION_SERVICE_MAP[v.category] && (
                        <ViolationLeadForm
                          violationCategory={v.category}
                          violationDescription={v.description || ''}
                          buildingAddress={b?.address || ''}
                          bbl={bbl}
                          violationClass={v.class}
                          violationSource={v.source}
                        />
                      )}
                      {/* Inline guide link — tenant rights guide for this violation type */}
                      {v.status === 'Open' && VIOLATION_GUIDE_LINK_MAP[v.category] && (
                        <div className="mt-3 pt-3 border-t border-[#ddd]">
                          <Link
                            href={`/guides/${VIOLATION_GUIDE_LINK_MAP[v.category].slug}`}
                            className="inline-flex items-center gap-1.5 text-xs text-[#0b8a7a] hover:text-[#076d5f] font-medium transition-colors"
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            </svg>
                            {VIOLATION_GUIDE_LINK_MAP[v.category].label}
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                            </svg>
                          </Link>
                        </div>
                      )}
                    </div>
                  )
                }) : (
                  <div className="text-center py-10 text-[#666]">
                    <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />No violations
                  </div>
                )}
              </div>

            {/* ── Guide Panel — one article card per violation category ── */}
            {data.violations.recent?.length > 0 && (() => {
              const guides = buildGuidePanel(data.violations.recent)
              if (!guides.length) return null

              // SVG icons per category — no emojis
              const catIcon: Record<string, React.ReactNode> = {
                'Security':     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
                'Plumbing':     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
                'Lead Paint':   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
                'Structural':   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
                'Pests':        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 12H3"/><path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"/><path d="M6 8l-3-3"/><path d="M18 8l3-3"/><path d="M6 16l-3 3"/><path d="M18 16l3 3"/></svg>,
                'Heat/Hot Water':<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>,
                'Mold':         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
                'Fire Safety':  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
                'Electrical':   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
                'Gas':          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
                'Elevator':     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 9l3-3 3 3"/><path d="M9 15l3 3 3-3"/></svg>,
                'Sanitation':   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
                'Other':        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
              }
              const defaultIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>

              return (
                <div className="card p-6">
                  <h3 className="font-bold text-base mb-5">Guides for this building</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {guides.map(({ category, guide }) => (
                      <Link
                        key={category}
                        href={`/blog/${guide.slug}`}
                        className="group flex flex-col bg-[#f5f5f5] rounded-xl border border-[#ddd] hover:border-[#bbb] overflow-hidden transition-colors"
                      >
                        {/* Image */}
                        <div className="relative w-full h-36 bg-[#f0f0f0] flex-shrink-0 overflow-hidden">
                          <img
                            src={guide.image}
                            alt={guide.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            loading="lazy"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                          />
                          {/* Category pill over image */}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#f0f0f0]/80 text-[#555] text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                            <span className="text-[#666]">{catIcon[category] ?? defaultIcon}</span>
                            {category}
                          </div>
                        </div>
                        {/* Text */}
                        <div className="p-4 flex flex-col flex-1">
                          <p className="text-sm font-semibold text-[#111] leading-snug mb-2 group-hover:text-white transition-colors">
                            {guide.title}
                          </p>
                          <p className="text-xs text-[#666] leading-relaxed flex-1">{guide.excerpt}</p>
                          <div className="mt-3 flex items-center gap-1 text-xs text-[#0b8a7a] group-hover:text-[#076d5f] font-medium transition-colors">
                            Read guide
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })()}

            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            COMPLAINTS TAB
        ══════════════════════════════════════════ */}
        {tab === 'complaints' && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Total HPD', val: data.complaints.hpd.total, cls: 'text-white', id: undefined },
                { label: 'Last 12 months', val: data.complaints.hpd.recentYear, cls: 'text-yellow-400', id: undefined },
                { label: 'Heat / Hot Water', val: data.complaints.hpd.heatHotWater, cls: 'text-orange-400', id: 'section-heat-hot-water' },
                { label: '311 Requests', val: data.complaints.sr311.total, cls: 'text-[#0b8a7a]', id: undefined },
              ].map(({ label, val, cls, id }) => (
                <div key={label} className="card p-4 text-center" id={id}>
                  <div className={`text-2xl font-black ${cls}`}>{val}</div>
                  <div className="text-xs text-[#666] mt-1">{label}</div>
                </div>
              ))}
            </div>
            <div className="card p-6">
              <h3 className="font-bold mb-4 text-base">Recent complaints</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {data.complaints.recent?.length > 0 ? data.complaints.recent.map((c: any) => (
                  <div key={c.id} className="p-4 bg-[#f5f5f5] rounded-xl border border-[#ddd] flex items-center justify-between">
                    <div>
                      <span className={`badge ${c.source === 'HPD' ? 'badge-blue' : c.source === '311' ? 'badge-purple' : 'badge-orange'} mr-2`}>{c.source}</span>
                      <span className="text-sm">{c.type}</span>
                      {c.descriptor && <span className="text-xs text-[#666] ml-2">({c.descriptor})</span>}
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#666]">{c.status}</span>
                      <p className="text-xs text-[#888]">{c.date && new Date(c.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                )) : <div className="text-center py-10 text-[#666]">No complaints</div>}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            TIMELINE TAB
        ══════════════════════════════════════════ */}
        {tab === 'timeline' && (
          <div className="card p-6 animate-fade-in">
            <h3 className="font-bold mb-6 text-base">Building timeline ({data.timeline?.length} events)</h3>
            <div className="space-y-4 max-h-[700px] overflow-y-auto">
              {data.timeline?.length > 0 ? data.timeline.map((e: any, i: number) => (
                <div key={i} className={`timeline-item severity-${e.severity || 'low'} pb-4`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className={`badge ${e.type === 'violation' ? 'badge-red' : e.type === 'complaint' ? 'badge-yellow' : e.type === 'sale' ? 'badge-green' : e.type === 'eviction' ? 'badge-purple' : e.type === 'litigation' ? 'badge-orange' : 'badge-blue'} mr-2`}>{e.type}</span>
                      <span className="text-xs text-[#666]">{e.source}</span>
                      <p className="text-sm mt-1">{e.description}</p>
                    </div>
                    <span className="text-xs text-[#666] flex-shrink-0">{e.date && new Date(e.date).toLocaleDateString()}</span>
                  </div>
                </div>
              )) : <div className="text-center py-10 text-[#666]">No events</div>}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            LANDLORD TAB
        ══════════════════════════════════════════ */}
        {tab === 'landlord' && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Open violations', val: data.violations.hpd.open, cls: 'text-white' },
                { label: 'Total violations', val: data.violations.hpd.total, cls: 'text-white' },
                { label: 'Eviction filings', val: data.evictions.filings?.total || 0, cls: 'text-orange-400' },
                { label: 'Evictions executed', val: data.evictions.total, cls: 'text-red-400' },
              ].map(({ label, val, cls }) => (
                <div key={label} className="card p-4 text-center">
                  <div className={`text-2xl font-black ${cls}`}>{val}</div>
                  <div className="text-xs text-[#666] mt-1">{label}</div>
                </div>
              ))}
            </div>

            <div className="card p-6">
              <h3 className="font-bold mb-2 text-base">Who's the landlord of this building?</h3>
              <p className="text-[#666] text-xs mb-5">Learn more about the people responsible for this building</p>
              <div className="space-y-3">
                {data.landlord.owners?.map((c: any, i: number) => (
                  <div key={`owner-${i}`} className="p-4 bg-[#f5f5f5] rounded-xl border-l-4 border-[#0b8a7a]">
                    <div className="font-bold text-base">{c.name}</div>
                    <div className="text-sm text-[#0b8a7a]">{c.title || 'Head Officer'}</div>
                    {c.address && <div className="text-sm text-[#666] mt-1">{c.address}</div>}
                  </div>
                ))}
                {data.landlord.agents?.map((c: any, i: number) => (
                  <div key={`agent-${i}`} className="p-4 bg-[#f5f5f5] rounded-xl border-l-4 border-green-500">
                    <div className="font-bold text-base">{c.name}</div>
                    <div className="text-sm text-green-400">{c.title || 'Agent'}</div>
                    {c.address && <div className="text-sm text-[#666] mt-1">{c.address}</div>}
                  </div>
                ))}
                {data.landlord.siteManagers?.filter((c: any) => !data.landlord.agents?.find((a: any) => a.name === c.name)).map((c: any, i: number) => (
                  <div key={`site-${i}`} className="p-4 bg-[#f5f5f5] rounded-xl border-l-4 border-purple-500">
                    <div className="font-bold text-base">{c.name}</div>
                    <div className="text-sm text-purple-400">Site Manager</div>
                    {c.address && <div className="text-sm text-[#666] mt-1">{c.address}</div>}
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 bg-[#eeeeee] rounded-xl">
                <div className="font-bold text-base mb-1">{data.landlord.name}</div>
                <div className="flex flex-wrap gap-4 text-sm text-[#555]">
                  {data.landlord.registrationDate && <span>{data.landlord.registrationDate}</span>}
                  {data.landlord.registrationExpires && <span className="text-yellow-400">({data.landlord.registrationExpires})</span>}
                </div>
                {data.sales?.recent?.[0] && (
                  <div className="mt-2 text-sm">
                    <span className="text-[#666]">Last sold: </span>
                    <span className="text-white">{safeDate(data.sales.recent[0].date, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-emerald-400 ml-2">for ${safeMoney(data.sales.recent[0].amount)}</span>
                  </div>
                )}
              </div>
              {data.landlord.portfolioSize > 1 && (
                <div className="mt-4 p-4 bg-[#0b8a7a]/10 border border-[#0b8a7a]/20 rounded-xl">
                  <div className="text-[#0b8a7a] font-medium text-sm">This landlord owns {data.landlord.portfolioSize} buildings</div>
                </div>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={`https://whoownswhat.justfix.org/bbl/${bbl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b8a7a]/10 hover:bg-[#0b8a7a]/20 border border-[#0b8a7a]/20 rounded-lg text-[#0b8a7a] text-sm">Who Owns What <ExternalLink size={13} /></a>
                <a href={`https://hpdonline.nyc.gov/hpdonline/building/${bbl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#e8e8e8] hover:bg-[#ddd] rounded-lg text-sm">HPD Profile <ExternalLink size={13} /></a>
              </div>
            </div>

            {data.landlord.portfolio?.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 text-base">Other buildings by this owner ({data.landlord.portfolioSize})</h3>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {data.landlord.portfolio.map((p: any) => (
                    <Link key={p.bbl} href={`/building/${p.bbl}`} className="block p-3 bg-[#f5f5f5] rounded-lg hover:bg-[#e8e8e8] border border-[#ddd] hover:border-[#bbb] transition-colors">
                      <div className="flex items-center justify-between">
                        <div><div className="font-medium text-sm">{p.address}</div><div className="text-xs text-[#666]">{p.borough} {p.zipcode}</div></div>
                        <ChevronRight size={14} className="text-[#888]" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {data.evictions.filings?.recent?.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 text-base">Housing court filings ({data.evictions.filings.total})</h3>
                <div className="space-y-3">
                  {data.evictions.filings.recent.map((f: any) => (
                    <div key={f.id} className="p-4 bg-[#f5f5f5] rounded-xl flex items-center justify-between border border-[#ddd]">
                      <div><span className="badge badge-orange mr-2">Filing</span><span className="text-sm">{f.caseType || 'Housing Court'}</span></div>
                      <span className="text-xs text-[#666]">{f.filedDate && new Date(f.filedDate).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.litigations.recent?.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 text-base">HPD legal actions ({data.litigations.total})</h3>
                <div className="space-y-3">
                  {data.litigations.recent.map((l: any) => (
                    <div key={l.id} className="p-4 bg-[#f5f5f5] rounded-xl flex items-center justify-between border border-[#ddd]">
                      <div><span className="badge badge-purple mr-2">{l.caseType}</span><span className="text-sm">{l.caseStatus}</span>{l.penalty && <span className="text-emerald-400 text-sm ml-2">${l.penalty.toLocaleString()}</span>}</div>
                      <span className="text-xs text-[#666]">{l.caseOpenDate && new Date(l.caseOpenDate).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.evictions.recent?.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 text-base">Evictions executed ({data.evictions.total})</h3>
                <div className="space-y-3">
                  {data.evictions.recent.map((e: any) => (
                    <div key={e.id} className="p-4 bg-[#f5f5f5] rounded-xl flex items-center justify-between border border-[#ddd]">
                      <div><span className="badge badge-red mr-2">Executed</span><span className="text-sm">{e.type}</span></div>
                      <span className="text-xs text-[#666]">{e.executedDate && new Date(e.executedDate).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════
            PERMITS TAB
        ══════════════════════════════════════════ */}
        {tab === 'permits' && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total filings', val: data.permits.total, cls: 'text-white' },
                { label: 'Major alterations', val: data.permits.majorAlterations, cls: 'text-orange-400' },
                { label: 'Last 3 years', val: data.permits.recentActivity, cls: 'text-[#0b8a7a]' },
              ].map(({ label, val, cls }) => (
                <div key={label} className="card p-4 text-center">
                  <div className={`text-2xl font-black ${cls}`}>{val}</div>
                  <div className="text-xs text-[#666] mt-1">{label}</div>
                </div>
              ))}
            </div>
            <div className="card p-6">
              <h3 className="font-bold mb-4 text-base">Recent permits & filings</h3>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {data.permits.recent?.length > 0 ? data.permits.recent.map((p: any) => (
                  <div key={p.jobNumber} className="p-4 bg-[#f5f5f5] rounded-xl border border-[#ddd]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge badge-blue">{p.jobTypeDesc || p.jobType}</span>
                      <span className="text-xs text-[#666]">{p.filingDate && new Date(p.filingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm">{p.workType || 'Work filing'}</div>
                    {p.estimatedCost && <div className="text-xs text-emerald-400 mt-1">Est. Cost: ${p.estimatedCost.toLocaleString()}</div>}
                    <div className="text-xs text-[#666] mt-1">Status: {p.jobStatusDesc || p.jobStatus}</div>
                  </div>
                )) : <div className="text-center py-10 text-[#666]">No permits</div>}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            SALES TAB
        ══════════════════════════════════════════ */}
        {tab === 'sales' && (
          <div className="space-y-5 animate-fade-in">
            {data.sales.recent?.length > 0 ? (
              <div className="card p-6">
                <h3 className="font-bold mb-4 text-base">Property sales history</h3>
                <div className="space-y-3">
                  {data.sales.recent.map((sale: any) => (
                    <div key={sale.id} className="p-4 bg-[#f5f5f5] rounded-xl flex items-center justify-between border border-[#ddd]">
                      <div className="flex items-center gap-3">
                        <DollarSign className="text-green-400" size={18} />
                        <div>
                          <div className="font-bold text-green-400">${safeMoney(sale.amount)}</div>
                          <div className="text-xs text-[#666]">{sale.docType || 'Sale'}</div>
                        </div>
                      </div>
                      <span className="text-sm text-[#666]">{safeDate(sale.date)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : <div className="card p-6 text-center text-[#666]">No sales data available</div>}
            <div className="card p-6">
              <h3 className="font-bold mb-4 text-base">External records</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <a href={`https://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${bbl[0]}&block=${bbl.slice(1,6)}&lot=${bbl.slice(6)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-[#f5f5f5] rounded-xl hover:bg-[#e8e8e8] border border-[#ddd] hover:border-[#bbb] transition-colors text-sm"><span>ACRIS (Full History)</span><ExternalLink size={13} className="text-[#888]" /></a>
                <a href={`https://zola.planning.nyc.gov/lot/${bbl[0]}/${bbl.slice(1,6).replace(/^0+/, '')}/${bbl.slice(6).replace(/^0+/, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-[#f5f5f5] rounded-xl hover:bg-[#e8e8e8] border border-[#ddd] hover:border-[#bbb] transition-colors text-sm"><span>ZoLa (Zoning)</span><ExternalLink size={13} className="text-[#888]" /></a>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            NEIGHBORHOOD TAB
        ══════════════════════════════════════════ */}
        {tab === 'neighborhood' && (
          <div className="space-y-5 animate-fade-in">

            {/* Neighborhood BHX Score */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base">Neighborhood BHX Score</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black" style={{ color: sc(data.neighborhoodScore || 0) }}>{data.neighborhoodScore || 'N/A'}</span>
                  <span className="text-sm text-[#777]">/ 100</span>
                </div>
              </div>
              {data.neighborhoodScore > 0 && <div className="mb-5"><ScoreBar score={data.neighborhoodScore} height={6} /></div>}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { emoji: 'crime', label: 'Crime level', val: data.crime?.level || 'N/A', color: sc(data.crime?.score ?? 50) },
                  { emoji: 'violent', label: 'Violent crime', val: data.shootings?.level || 'N/A', color: sc(data.shootings?.score ?? 50) },
                  { emoji: 'pedestrian', label: 'Pedestrian safety', val: data.trafficSafety?.level || 'N/A', color: sc(data.trafficSafety?.score ?? 50) },
                  { emoji: 'flood', label: 'Flood risk', val: data.flood?.floodRisk || 'LOW', color: data.flood?.floodRisk === 'LOW' ? '#10b981' : data.flood?.floodRisk === 'MODERATE' ? '#f59e0b' : '#ef4444' },
                ].map(({ emoji, label, val, color }) => (
                  <div key={label} className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#f0f0f0] mb-2 mx-auto">
                      {emoji === 'crime' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#555]"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg>}
                      {emoji === 'violent' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#555]"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                      {emoji === 'pedestrian' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#555]"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>}
                      {emoji === 'flood' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#555]"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>}
                    </div>
                    <div className="text-base font-black" style={{ color }}>{val}</div>
                    <div className="text-xs text-[#777] mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* HUD Fair Market Rent */}
            {data.rentFairness?.hudFMR && (
              <div className="card p-6 border border-[#0b8a7a]/20">
                <h3 className="font-bold mb-2 text-base flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 border border-[#ddd] bg-[#f5f5f5] text-[#555] mr-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>Rent Fairness Meter (HUD FY2025)</h3>
                <p className="text-xs text-[#666] mb-4">HUD Fair Market Rent benchmarks — 40th percentile of NYC area rents</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[['Studio', data.rentFairness.hudFMR.studio], ['1 BR', data.rentFairness.hudFMR.oneBr], ['2 BR', data.rentFairness.hudFMR.twoBr], ['3 BR', data.rentFairness.hudFMR.threeBr], ['4 BR', data.rentFairness.hudFMR.fourBr]].map(([label, val]: any) => (
                    <div key={label} className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                      <div className="text-xs text-[#666] mb-1">{label}</div>
                      <div className="text-base font-black text-[#0b8a7a]">${val?.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#777] mt-3">If rent is significantly above FMR, it may be overpriced. Source: HUD.gov</p>
              </div>
            )}

            {/* Shootings */}
            <div className="card p-6">
              <h3 className="font-bold mb-4 text-base flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 border border-[#ddd] bg-[#f5f5f5] text-[#555] mr-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>Shooting incidents (500m, 3 years)</h3>
              <div className="grid sm:grid-cols-4 gap-3 mb-4">
                <InlineScore value={data.shootings?.score || 100} label="Safety BHX Score" />
                <div className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                  <div className="text-2xl font-black" style={{ color: data.shootings?.total === 0 ? '#10b981' : data.shootings?.total <= 2 ? '#f59e0b' : '#ef4444' }}>{data.shootings?.total || 0}</div>
                  <div className="text-xs text-[#777] mt-1">Total shootings</div>
                </div>
                <div className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                  <div className="text-2xl font-black text-red-400">{data.shootings?.fatal || 0}</div>
                  <div className="text-xs text-[#777] mt-1">Fatal</div>
                </div>
                <div className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                  <div className="text-base font-black" style={{ color: data.shootings?.level === 'LOW' ? '#10b981' : data.shootings?.level === 'MODERATE' ? '#f59e0b' : '#ef4444' }}>{data.shootings?.level || 'LOW'}</div>
                  <div className="text-xs text-[#777] mt-1">Risk level</div>
                </div>
              </div>
              {data.shootings?.total === 0 && <p className="text-sm text-green-400">No shooting incidents nearby in the last 3 years</p>}
            </div>

            {/* Pedestrian safety */}
            <div className="card p-6">
              <h3 className="font-bold mb-4 text-base flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 border border-[#ddd] bg-[#f5f5f5] text-[#555] mr-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg></span>Pedestrian & traffic safety (300m, 2 years)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-3">
                <InlineScore value={data.trafficSafety?.score || 100} label="Safety BHX Score" />
                {[
                  { label: 'Crashes', val: data.trafficSafety?.crashes || 0, cls: 'text-white' },
                  { label: 'Ped injuries', val: data.trafficSafety?.pedestrianInjuries || 0, cls: 'text-orange-400' },
                  { label: 'Ped deaths', val: data.trafficSafety?.pedestrianFatalities || 0, cls: 'text-red-400' },
                  { label: 'Cyclist injuries', val: data.trafficSafety?.cyclistInjuries || 0, cls: 'text-yellow-400' },
                ].map(({ label, val, cls }) => (
                  <div key={label} className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                    <div className={`text-2xl font-black ${cls}`}>{val}</div>
                    <div className="text-xs text-[#777] mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#777]">Data from NYC Vision Zero motor vehicle collision reports</p>
            </div>

            {/* Crime */}
            <div className="card p-6" id="section-crime">
              <h3 className="font-bold mb-4 text-base flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 border border-[#ddd] bg-[#f5f5f5] text-[#555] mr-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/></svg></span>All crime (500m radius, last year)</h3>
              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                <InlineScore value={data.crime?.score || 0} label="Safety BHX Score" />
                <div className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                  <div className="text-2xl font-black">{data.crime?.total || 0}</div>
                  <div className="text-xs text-[#777] mt-1">Total incidents</div>
                </div>
                <div className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                  <div className="text-2xl font-black text-red-400">{data.crime?.violent || 0}</div>
                  <div className="text-xs text-[#777] mt-1">Violent crimes</div>
                </div>
              </div>
              {data.crime?.byType?.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {data.crime.byType.slice(0, 8).map((c: any) => (
                    <div key={c.type} className="flex items-center justify-between p-2 bg-[#eeeeee] rounded-lg">
                      <span className="text-sm text-[#555]">{c.type}</span>
                      <span className="text-sm font-medium">{c.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Noise */}
            {data.noise && (
              <div className="card p-6" id="section-noise">
                <h3 className="font-bold mb-4 text-base flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 border border-[#ddd] bg-[#f5f5f5] text-[#555] mr-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg></span>Noise complaints (3 years)</h3>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                    <div className="text-2xl font-black" style={{ color: data.noise.level === 'LOW' ? '#10b981' : data.noise.level === 'MODERATE' ? '#f59e0b' : '#ef4444' }}>{data.noise.total || 0}</div>
                    <div className="text-xs text-[#777] mt-1">Total noise complaints</div>
                  </div>
                  <div className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                    <div className="text-base font-black" style={{ color: data.noise.level === 'LOW' ? '#10b981' : data.noise.level === 'MODERATE' ? '#f59e0b' : '#ef4444' }}>{data.noise.level}</div>
                    <div className="text-xs text-[#777] mt-1">Noise level</div>
                  </div>
                </div>
                {data.noise?.byType?.length > 0 && (
                  <div className="space-y-2">
                    {data.noise.byType.map((n: any) => (
                      <div key={n.type} className="flex items-center justify-between p-2 bg-[#eeeeee] rounded-lg">
                        <span className="text-sm text-[#555]">{n.type}</span>
                        <span className="text-sm font-medium">{n.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Transit */}
            <div className="card p-6" id="section-transit">
              <h3 className="font-bold mb-3 text-base flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 border border-[#ddd] bg-[#f5f5f5] text-[#555] mr-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 2v5"/><circle cx="8.5" cy="17" r="1.5"/><circle cx="15.5" cy="17" r="1.5"/><path d="M8 12h8"/></svg></span>Transit & accessibility</h3>
              <p className="text-sm text-[#555]">Transit scoring is coming soon. For now, use the Building Health X report to sanity-check the building itself (heat/hot water, pests, noise, safety hazards) and treat commute details as a separate decision layer.</p>
            </div>

            {/* Pest control */}
            {data.pests && (
              <div className="card p-6" id="section-pest-control">
                <h3 className="font-bold mb-4 text-base flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 border border-[#ddd] bg-[#f5f5f5] text-[#555] mr-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 12H3"/><path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"/><path d="M6 8l-3-3"/><path d="M18 8l3-3"/><path d="M6 16l-3 3"/><path d="M18 16l3 3"/></svg></span>Pest control BHX Score</h3>
                <div className="grid sm:grid-cols-4 gap-3 mb-4">
                  <InlineScore value={data.pests.score} label="Pest BHX Score" />
                  {[
                    { label: 'Rodent fails', val: data.pests.rodentFails, cls: 'text-orange-400' },
                    { label: 'Bedbug reports', val: data.pests.bedbugReports, cls: 'text-red-400' },
                    { label: 'Restaurant pests', val: data.pests.restaurantPestViolations, cls: 'text-yellow-400' },
                  ].map(({ label, val, cls }) => (
                    <div key={label} className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                      <div className={`text-2xl font-black ${cls}`}>{val}</div>
                      <div className="text-xs text-[#777] mt-1">{label}</div>
                    </div>
                  ))}
                </div>
                <div className={`p-3 rounded-lg text-sm font-medium ${data.pests.level === 'LOW' ? 'bg-green-500/10 text-green-400' : data.pests.level === 'MODERATE' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>
                  Pest risk: <strong>{data.pests.level}</strong>
                </div>
              </div>
            )}

            {/* Restaurants */}
            {data.restaurants && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 text-base flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 border border-[#ddd] bg-[#f5f5f5] text-[#555] mr-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg></span>Nearby restaurant inspections (100m)</h3>
                <div className="grid sm:grid-cols-4 gap-3 mb-3">
                  {[
                    { label: 'Restaurants', val: data.restaurants.nearbyCount, cls: 'text-white' },
                    { label: 'Avg grade', val: data.restaurants.avgGrade || '—', cls: data.restaurants.avgGrade === 'A' ? 'text-emerald-400' : data.restaurants.avgGrade === 'B' ? 'text-yellow-400' : 'text-red-400' },
                    { label: 'Critical violations', val: data.restaurants.criticalViolations, cls: 'text-red-400' },
                    { label: 'Pest violations', val: data.restaurants.pestViolations, cls: 'text-orange-400' },
                  ].map(({ label, val, cls }) => (
                    <div key={label} className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                      <div className={`text-2xl font-black ${cls}`}>{val}</div>
                      <div className="text-xs text-[#777] mt-1">{label}</div>
                    </div>
                  ))}
                </div>
                {data.restaurants.note && <p className="text-sm text-orange-400">{data.restaurants.note}</p>}
              </div>
            )}

            {/* Cooling towers */}
            {data.coolingTowers && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 text-base flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 border border-[#ddd] bg-[#f5f5f5] text-[#555] mr-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M6 20V10l6-8 6 8v10"/><path d="M10 20v-6h4v6"/></svg></span>Cooling towers (Legionella risk)</h3>
                <div className={`p-4 rounded-xl ${data.coolingTowers.hasTower ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-green-500/10 border border-green-500/30'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cooling tower present</span>
                    <span className={`font-bold ${data.coolingTowers.hasTower ? 'text-yellow-400' : 'text-green-400'}`}>{data.coolingTowers.hasTower ? `YES (${data.coolingTowers.count})` : 'NO'}</span>
                  </div>
                  {data.coolingTowers.hasTower && <p className="text-xs text-[#666] mt-2">{data.coolingTowers.riskNote}</p>}
                  {data.coolingTowers.lastCertification && <p className="text-xs text-[#666] mt-1">Last certification: {data.coolingTowers.lastCertification}</p>}
                </div>
              </div>
            )}

            {/* Tax exemptions */}
            {data.taxExemptions && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 text-base flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 border border-[#ddd] bg-[#f5f5f5] text-[#555] mr-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg></span>Tax exemptions & rent stabilization</h3>
                <div className="grid sm:grid-cols-3 gap-3 mb-3">
                  {[
                    { label: '421-a Exemption', val: data.taxExemptions.has421a ? 'YES' : 'NO', active: data.taxExemptions.has421a },
                    { label: 'J-51 Exemption', val: data.taxExemptions.hasJ51 ? 'YES' : 'NO', active: data.taxExemptions.hasJ51 },
                    { label: 'Rent stabilized', val: data.taxExemptions.rentStabilizedByExemption ? 'LIKELY' : 'UNKNOWN', active: data.taxExemptions.rentStabilizedByExemption },
                  ].map(({ label, val, active }) => (
                    <div key={label} className={`p-3 rounded-xl border ${active ? 'bg-[#0b8a7a]/10 border-[#0b8a7a]/30' : 'bg-[#f5f5f5] border-[#ddd]'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{label}</span>
                        <span className={`font-bold text-sm ${active ? 'text-[#0b8a7a]' : 'text-[#666]'}`}>{val}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {data.taxExemptions.note && <p className="text-sm text-[#0b8a7a] mb-2">{data.taxExemptions.note}</p>}
                {data.taxExemptions.exemptionExpiration && <p className="text-sm text-yellow-400">Exemption expires: {data.taxExemptions.exemptionExpiration} — rent may increase after</p>}
              </div>
            )}

            {/* Financial health */}
            {data.financialHealth && (
              <div className="card p-6">
                <h3 className="font-bold mb-4 text-base flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 border border-[#ddd] bg-[#f5f5f5] text-[#555] mr-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>Building financial health</h3>
                <div className="grid sm:grid-cols-3 gap-3 mb-3">
                  <InlineScore value={data.financialHealth.score} label="Financial BHX Score" />
                  <div className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                    <div className="text-2xl font-black" style={{ color: data.financialHealth.taxLiens === 0 ? '#10b981' : '#ef4444' }}>{data.financialHealth.taxLiens}</div>
                    <div className="text-xs text-[#777] mt-1">Tax liens</div>
                  </div>
                  <div className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                    <div className="text-base font-black" style={{ color: data.financialHealth.level === 'HEALTHY' ? '#10b981' : data.financialHealth.level === 'FAIR' ? '#f59e0b' : '#ef4444' }}>{data.financialHealth.level}</div>
                    <div className="text-xs text-[#777] mt-1">Status</div>
                  </div>
                </div>
                {data.taxLiens?.warning && <p className="text-sm text-red-400">{data.taxLiens.warning}</p>}
              </div>
            )}

            {/* Flood */}
            <div className="card p-6">
              <h3 className="font-bold mb-4 text-base flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 border border-[#ddd] bg-[#f5f5f5] text-[#555] mr-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg></span>Flood & hurricane risk</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl ${data.flood?.inFloodZone ? 'bg-red-500/10 border border-red-500/30' : 'bg-green-500/10 border border-green-500/30'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">FEMA flood zone</span>
                    <span className={`font-bold ${data.flood?.inFloodZone ? 'text-red-400' : 'text-green-400'}`}>{data.flood?.inFloodZone ? data.flood.floodZoneType || 'YES' : 'NO'}</span>
                  </div>
                  <p className="text-xs text-[#666] mt-1">{data.flood?.inFloodZone ? 'Consider flood insurance' : 'Not in a flood zone'}</p>
                </div>
                <div className={`p-4 rounded-xl ${data.flood?.inHurricaneZone ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-green-500/10 border border-green-500/30'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hurricane evac zone</span>
                    <span className={`font-bold ${data.flood?.inHurricaneZone ? 'text-orange-400' : 'text-green-400'}`}>{data.flood?.inHurricaneZone ? `Zone ${data.flood.hurricaneZone}` : 'NO'}</span>
                  </div>
                  <p className="text-xs text-[#666] mt-1">{data.flood?.inHurricaneZone ? 'May need to evacuate during hurricanes' : 'Not in evacuation zone'}</p>
                </div>
              </div>
            </div>

            {/* Parks */}
            <div className="card p-6">
              <h3 className="font-bold mb-4 text-base flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 border border-[#ddd] bg-[#f5f5f5] text-[#555] mr-1"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14l-5-5-5 5"/><path d="M17 8l-5-5-5 5"/><path d="M12 19v-8"/></svg></span>Parks & green space</h3>
              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                {[
                  { label: 'Parks nearby', val: data.parks?.count || 0, cls: 'text-green-400' },
                  { label: 'Total acres', val: data.parks?.totalAcres || 0, cls: 'text-emerald-400' },
                  { label: 'Street trees', val: data.trees?.count || 0, cls: 'text-lime-400' },
                ].map(({ label, val, cls }) => (
                  <div key={label} className="p-3 bg-white border-2 border-[#e0e0e0] text-center">
                    <div className={`text-2xl font-black ${cls}`}>{val}</div>
                    <div className="text-xs text-[#777] mt-1">{label}</div>
                  </div>
                ))}
              </div>
              {data.parks?.nearby?.length > 0 && (
                <div className="space-y-2">
                  {data.parks.nearby.slice(0, 5).map((p: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-[#eeeeee] rounded-lg">
                      <span className="text-sm">{p.name}</span>
                      {p.acres && <span className="text-xs text-[#666]">{p.acres} acres</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══ Official records ══ */}
        <div className="card p-6 mt-5">
          <h3 className="font-bold mb-4 text-base">Official records</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'HPD Building Profile', url: `https://hpdonline.nyc.gov/hpdonline/building/${bbl}` },
              { label: 'DOB Building Info', url: `https://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${bbl[0]}&block=${bbl.slice(1,6)}&lot=${bbl.slice(6)}` },
              { label: 'ACRIS (Sales)', url: `https://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${bbl[0]}&block=${bbl.slice(1,6)}&lot=${bbl.slice(6)}` },
              { label: 'Who Owns What', url: `https://whoownswhat.justfix.org/bbl/${bbl}` },
            ].map(link => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-[#f5f5f5] rounded-xl hover:bg-[#e8e8e8] border border-[#ddd] hover:border-[#bbb] transition-colors text-sm">
                <span>{link.label}</span><ExternalLink size={13} className="text-[#888]" />
              </a>
            ))}
          </div>
        </div>

        {/* Financial health — ACRIS */}
        <ACRISPanel bbl={bbl} />

        {/* Disclaimer */}
        <div className="mt-5 p-4 bg-[#eeeeee] rounded-xl border border-[#ddd] text-center">
          <p className="text-xs text-[#666]">{data.dataDisclaimer}</p>
        </div>

      </main>

      <Footer />
    </div>
  )
}
