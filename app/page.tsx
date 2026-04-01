'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronRight,
  Search,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { services } from '@/lib/services-data'
import NYCInfoBar from '@/components/NYCInfoBar'
import AsSeenIn from '@/components/AsSeenIn'
import { DatasetJsonLd } from '@/components/seo'

interface Suggestion {
  bbl: string
  address: string
  borough: string
  zipcode: string
  neighborhood?: string
  units?: number
}

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const router = useRouter()
  const dropdownRef = useRef<HTMLFormElement>(null)

  // NEW: ref to the input so we can blur it (prevents iOS zoom + blinking caret)
  const inputRef = useRef<HTMLInputElement>(null)

  const abortRef = useRef<AbortController | null>(null)
  const reqSeqRef = useRef(0)

  const acCacheRef = useRef<Map<string, { t: number; data: Suggestion[] }>>(new Map())
  const AC_TTL_MS = 5 * 60 * 1000

  const getCached = (q: string): Suggestion[] | null => {
    const hit = acCacheRef.current.get(q)
    if (!hit) return null
    if (Date.now() - hit.t > AC_TTL_MS) {
      acCacheRef.current.delete(q)
      return null
    }
    return hit.data
  }

  const setCached = (q: string, data: Suggestion[]) => {
    if (acCacheRef.current.size > 75) {
      const firstKey = acCacheRef.current.keys().next().value
      if (firstKey) acCacheRef.current.delete(firstKey)
    }
    acCacheRef.current.set(q, { t: Date.now(), data })
  }
  // Desktop/tablet only: lock scroll while loading (avoid mobile layout "disforming")
  useEffect(() => {
    if (typeof window === 'undefined') return

    const isSmUp = window.matchMedia('(min-width: 640px)').matches
    if (!isSmUp) return

    if (loading) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [loading])


  useEffect(() => {
    if (query.length < 2) {
      abortRef.current?.abort()
      setSuggestions([])
      setShowDropdown(false)
      return
    }

    const trimmed = query.trim()

    const cachedExact = getCached(trimmed)
    if (cachedExact) {
      setSuggestions(cachedExact)
      setShowDropdown(cachedExact.length > 0)
    } else {
      let provisional: Suggestion[] | null = null
      for (let i = trimmed.length - 1; i >= 2; i--) {
        const prefix = trimmed.slice(0, i)
        const cachedPrefix = getCached(prefix)
        if (cachedPrefix && cachedPrefix.length) {
          const needle = trimmed.toLowerCase()
          provisional = cachedPrefix
            .filter((s) => s.address.toLowerCase().includes(needle))
            .slice(0, 8)
          break
        }
      }
      if (provisional && provisional.length) {
        setSuggestions(provisional)
        setShowDropdown(true)
      }
    }

    const seq = ++reqSeqRef.current
    const controller = new AbortController()
    abortRef.current?.abort()
    abortRef.current = controller

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/autocomplete?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        })
        const data = await res.json()
        if (reqSeqRef.current !== seq) return

        if (data?.suggestions?.length) {
          setSuggestions(data.suggestions)
          setShowDropdown(true)
          setCached(trimmed, data.suggestions)
        } else {
          setSuggestions([])
          setShowDropdown(false)
          setCached(trimmed, [])
        }
      } catch (e) {
        if ((e as any)?.name === 'AbortError') return
        setSuggestions([])
        setShowDropdown(false)
      }
    }, 80)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // NEW: helper to kill focus (stops blinking caret + iOS focus-zoom “sticking” into loading UI)
  const blurActive = () => {
    inputRef.current?.blur()
    ;(document.activeElement as HTMLElement | null)?.blur()
  }

  const handleSelect = (s: Suggestion) => {
    blurActive()
    setLoading(true)
    setShowDropdown(false)
    router.push(`/building/${s.bbl}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || !suggestions.length) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((p) => (p < suggestions.length - 1 ? p + 1 : p))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((p) => (p > 0 ? p - 1 : 0))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSelect(suggestions[selectedIndex])
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    blurActive()

    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSelect(suggestions[selectedIndex])
      return
    }

    if (!query.trim()) return

    setLoading(true)
    try {
      const res = await fetch(`/api/lookup?address=${encodeURIComponent(query)}`)
      const data = await res.json()
      if (data?.bbl) router.push(`/building/${data.bbl}`)
      else {
        setLoading(false)
        alert(data?.error || 'Address not found. Try including borough name.')
      }
    } catch {
      setLoading(false)
      alert('Something went wrong. Please try again.')
    }
  }

  useEffect(() => {
    const counters = document.querySelectorAll('.counter')

    const animateCounter = (element: Element) => {
      const target = parseInt(element.getAttribute('data-target') || '0', 10)
      const suffix = element.getAttribute('data-suffix') || ''
      const duration = 2000
      const startTime = Date.now()

      const updateCounter = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const current = Math.floor(progress * target)

        if (element instanceof HTMLElement) {
          element.textContent = `${current.toLocaleString()}${suffix}`
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter)
        }
      }

      requestAnimationFrame(updateCounter)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    counters.forEach((counter) => observer.observe(counter))

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`min-h-screen bg-[var(--bg-primary)] ${loading ? 'sm:overflow-hidden' : ''}`}>
      <DatasetJsonLd />
      <Header />

      {/* ── HERO — V2 Brutalist White/Teal ── */}
      <section style={{ borderBottom: '3px solid #0a0a0a', position: 'relative', overflow: 'hidden' }} className="bhx-hero pt-24 pb-16 px-6">

        {/* ESB silhouette — right side, top-aligned with headline */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: '-10px',
          width: '38%',
          height: '115%',
          opacity: 0.1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          <Image
            src="/esb.png"
            alt=""
            fill
            style={{ objectFit: 'contain', objectPosition: 'top right' }}
            priority={false}
            aria-hidden
          />
        </div>
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--teal)', border: '1px solid var(--teal)',
            padding: '6px 16px', marginBottom: '28px',
            // bhx-eyebrow handles mobile mb override via CSS, className:'bhx-eyebrow'
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal)', display: 'inline-block' }} />
            Free · Official NYC Data · 55+ Sources
          </div>

          {/* H1 — keyword included, reads like a real headline */}
          <h1 className="bhx-hero-h1" data-animate="fade-up" data-delay="100" style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(64px, 9vw, 120px)',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            color: '#0a0a0a',
            marginBottom: '28px',
          }}>
            Free NYC Building<br />
            Violations Lookup —<br />
            <span style={{ color: 'var(--teal)' }}>Know Before You Sign.</span>
          </h1>

          <p className="bhx-hero-p" data-animate="fade-up" data-delay="250" style={{
            fontSize: '19px', lineHeight: 1.75, color: 'var(--text-secondary)',
            maxWidth: '620px', margin: '0 auto 44px', fontWeight: 300,
          }}>
            Search any NYC address and instantly see building violations, pest history, heat complaints, and 311 records — pulled directly from official government data. Free, no login required.
          </p>

          {/* SEARCH BOX — the entire point of the page */}
          <div className="bhx-search-wrap max-w-3xl mx-auto" data-animate="fade-up" data-delay="380" style={{ marginBottom: '16px' }}>
            <form
              onSubmit={handleSubmit}
              ref={dropdownRef}
              style={{
                display: 'flex',
                border: '3px solid #0a0a0a',
                boxShadow: '6px 6px 0 #0a0a0a',
                background: '#fff',
                position: 'relative',
              }}
              className={`bhx-search-form${loading ? ' pointer-events-none' : ''}`}
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter any NYC address..."
                className="bhx-search-input"
                style={{
                  flex: 1, padding: '20px 24px', border: 'none', outline: 'none',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '16px', color: '#0a0a0a', background: 'none',
                  borderRight: '2px solid #0a0a0a',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="bhx-search-btn"
                style={{
                  background: 'var(--teal)', color: '#fff', border: 'none',
                  padding: '20px 28px', cursor: 'pointer', transition: 'background 0.15s',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '22px', letterSpacing: '0.08em', whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {loading ? 'Searching…' : <><span className="bhx-btn-full">Check Building</span><span className="bhx-btn-short" style={{display:'none'}}>Search</span></>}
              </button>

              {showDropdown && suggestions.length > 0 && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0,
                  background: '#fff', border: '2px solid #0a0a0a',
                  borderTop: 'none', zIndex: 50, maxHeight: 320, overflowY: 'auto',
                }}>
                  {suggestions.map((s, i) => (
                    <button
                      key={s.bbl}
                      type="button"
                      onClick={() => handleSelect(s)}
                      style={{
                        width: '100%', textAlign: 'left', padding: '14px 20px',
                        background: i === selectedIndex ? 'var(--teal-light)' : '#fff',
                        border: 'none', borderBottom: '1px solid #e0e0e0',
                        cursor: 'pointer', fontFamily: 'var(--font-inter), sans-serif',
                        transition: 'background 0.1s',
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '15px' }}>{s.address}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 2 }}>
                        {s.neighborhood ? `${s.neighborhood}, ` : ''}{s.borough}{s.zipcode ? ` ${s.zipcode}` : ''}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Search meta */}
          <div style={{
            fontFamily: '"Space Mono", monospace', fontSize: '12px',
            color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '24px',
          }}>
            // No login required · Updated daily · Always free
          </div>

          {/* NYC Live Bar — above fold */}
          <div className="mb-6">
            <NYCInfoBar />
          </div>

          {/* Quick-topic chips */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {['HPD Violations', '311 Complaints', 'Pest History', 'Rent Stabilised?', 'DOB Permits', 'Landlord Court Filings'].map(t => (
              <span key={t} style={{
                border: '1px solid #d0d0d0', padding: '7px 16px',
                fontSize: '13px', color: 'var(--text-muted)',
                fontFamily: '"Space Mono", monospace', cursor: 'pointer',
                letterSpacing: '0.04em', transition: 'all 0.15s',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>


      <AsSeenIn />
      
      {/* ── WHAT YOU'LL FIND ── */}
      <section style={{borderTop:'3px solid #0a0a0a',borderBottom:'3px solid #0a0a0a'}} className="py-16 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p data-animate="fade-in" style={{fontFamily:'"Space Mono", monospace',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--teal)',marginBottom:'10px'}}>What You'll Find</p>
            <h2 data-animate="slide-left" data-delay="100" style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'clamp(48px,5vw,72px)',letterSpacing:'0.03em',color:'#0a0a0a',lineHeight:0.95}}>Everything You Need to Know About Your Building</h2>
          </div>
          <div className="bhx-grid-4" style={{border:'2px solid #0a0a0a'}}>
            {[
              {num:'01',aDelay:0,title:'HPD Violations',desc:'Housing maintenance code violations — class A, B, and C — and their open/closed status.'},
              {num:'02',aDelay:100,title:'311 Complaints',desc:'Heat, hot water, pest, noise, and other tenant complaints filed with the city.'},
              {num:'03',aDelay:200,title:'Pest Reports',desc:'Rodent and pest inspection results from the Department of Health and Mental Hygiene.'},
              {num:'04',aDelay:300,title:'DOB Permits',desc:'Active construction permits, stop-work orders, and building work history.'},
              {num:'05',aDelay:400,title:'Eviction History',desc:'Eviction filings and legal proceedings data from Housing Court records.'},
              {num:'06',aDelay:500,title:'Property Records',desc:'Ownership history, deed transfers, and mortgage records from ACRIS.'},
              {num:'07',aDelay:600,title:'Rent Stabilisation',desc:'Whether the building has rent-stabilised units — confirmed via DHCR records.'},
              {num:'08',aDelay:700,title:'Safety Reports',desc:'Fire safety, elevator compliance, and boiler inspection records.'},
            ].map((item,i) => (
              <div key={item.num} data-animate="fade-up" data-delay={item.aDelay} style={{
                padding:'28px 24px',
                borderRight: i%4===3 ? 'none' : '1px solid #e0e0e0',
                borderBottom: i<4 ? '1px solid #e0e0e0' : 'none',
                cursor:'default',
                transition:'background 0.15s',
              }}
              onMouseEnter={e=>(e.currentTarget.style.background='var(--teal-light)')}
              onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
              >
                <div style={{fontFamily:'"Space Mono", monospace',fontSize:'10px',color:'#ccc',letterSpacing:'0.12em',marginBottom:'14px'}}>{item.num}</div>
                <div style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'22px',letterSpacing:'0.04em',marginBottom:'8px',color:'#0a0a0a'}}>{item.title}</div>
                <div style={{fontSize:'13px',color:'var(--text-muted)',lineHeight:1.65}}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE DATA STRIP ── */}
      <section style={{background:'#0a0a0a',borderBottom:'3px solid #0a0a0a'}} className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <p data-animate="fade-in" style={{fontFamily:'"Space Mono", monospace',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--teal)',marginBottom:'24px'}}>// Live NYC Building Database — Updated Daily</p>
          <div className="bhx-grid-4-dark" style={{}}>
            {[
              {target:1200000,suffix:'+',aDelay:0,label:'Properties Indexed',sub:'All 5 boroughs'},
              {target:800000,suffix:'+',aDelay:150,label:'Violations on Record',sub:'HPD open & closed'},
              {target:500000,suffix:'+',aDelay:300,label:'311 Complaints',sub:'Indexed & searchable'},
              {target:250000,suffix:'+',aDelay:450,label:'DOB Permits',sub:'Active & historical'},
            ].map((item,i) => (
              <div key={item.label} data-animate="count-bounce" data-delay={item.aDelay} style={{
                padding:'32px',
                borderRight: i<3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                <div className="counter" data-target={item.target} data-suffix={item.suffix}
                  style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'clamp(36px,4vw,52px)',color:'var(--teal)',letterSpacing:'0.04em',display:'block',lineHeight:1}}>
                  0{item.suffix}
                </div>
                <div style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'18px',letterSpacing:'0.06em',color:'rgba(255,255,255,0.8)',marginTop:'4px'}}>{item.label}</div>
                <div style={{fontFamily:'"Space Mono", monospace',fontSize:'10px',color:'rgba(255,255,255,0.3)',letterSpacing:'0.08em',marginTop:'4px',textTransform:'uppercase'}}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{borderBottom:'2px solid #e0e0e0'}} className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto bhx-grid-how">
          <div>
            <p style={{fontFamily:'"Space Mono", monospace',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--teal)',marginBottom:'12px'}}>Process</p>
            <h2 data-animate="slide-left" style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'clamp(48px,5vw,72px)',letterSpacing:'0.03em',lineHeight:0.95,color:'#0a0a0a'}}>Get Building Insights in 3 Steps</h2>
          </div>
          <div>
            {[
              {n:'01',aDelay:0,title:'Enter an Address',body:'Type any NYC address into our search bar. We instantly pull the building from 55+ official databases.'},
              {n:'02',aDelay:150,title:'Review the Data',body:'Browse violations, complaints, permits, ownership records, and safety reports — all in one place.'},
              {n:'03',aDelay:300,title:'Make an Informed Decision',body:'Use the data to decide if this building is right for you before handing over a deposit.'},
            ].map((step,i) => (
              <div key={step.n} className="bhx-step-grid" data-animate="fade-up" data-delay={step.aDelay} style={{
                padding:'28px 0',
                borderBottom: i<2 ? '1px solid #e0e0e0' : 'none',
              }}>
                <div style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'52px',color:'var(--teal)',letterSpacing:'0.04em',lineHeight:1}}>{step.n}</div>
                <div>
                  <div style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'24px',letterSpacing:'0.04em',marginBottom:'8px',color:'#0a0a0a'}}>{step.title}</div>
                  <div style={{fontSize:'15px',color:'var(--text-muted)',lineHeight:1.7,fontWeight:300}}>{step.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAMPLE BUILDING REPORT ── */}
      <section style={{borderBottom:'3px solid #0a0a0a',background:'var(--teal-light)'}} className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div style={{marginBottom:'32px'}}>
            <p style={{fontFamily:'"Space Mono", monospace',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--teal)',marginBottom:'10px'}}>See It in Action</p>
            <h2 style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'clamp(48px,5vw,72px)',letterSpacing:'0.03em',lineHeight:0.95,color:'#0a0a0a'}}>What a Building Report Looks Like</h2>
          </div>
          <div style={{border:'2px solid #0a0a0a',background:'#fff'}}>
            <div style={{background:'#0a0a0a',padding:'14px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontFamily:'"Space Mono", monospace',fontSize:'11px',color:'rgba(255,255,255,0.5)',letterSpacing:'0.1em'}}>SAMPLE BUILDING REPORT</div>
              <div style={{fontFamily:'"Space Mono", monospace',fontSize:'10px',color:'var(--teal)',letterSpacing:'0.08em',display:'flex',alignItems:'center',gap:'6px'}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:'var(--teal)',display:'inline-block'}}/>LIVE DATA
              </div>
            </div>
            <div style={{padding:'24px',borderBottom:'1px solid #e0e0e0'}}>
              <div style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'28px',letterSpacing:'0.04em',color:'#0a0a0a'}}>123 Main Street</div>
              <div style={{fontFamily:'"Space Mono", monospace',fontSize:'11px',color:'var(--text-muted)',letterSpacing:'0.06em',marginTop:'4px'}}>Manhattan, NY 10001</div>
            </div>
            <div className="bhx-grid-4-stats" style={{}}>
              {[
                {val:'12',label:'Active Violations',color:'#e24b4a'},
                {val:'8',label:'Heat Complaints (12mo)',color:'#ba7517'},
                {val:'3',label:'Pest Reports',color:'#0a0a0a'},
                {val:'5',label:'Active DOB Permits',color:'#0a0a0a'},
              ].map((item,i) => (
                <div key={item.label} style={{
                  padding:'24px',
                  borderRight: i<3 ? '1px solid #e0e0e0' : 'none',
                }}>
                  <div style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'48px',color:item.color,lineHeight:1,letterSpacing:'0.04em'}}>{item.val}</div>
                  <div style={{fontSize:'12px',color:'var(--text-muted)',marginTop:'4px',lineHeight:1.5}}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{borderBottom:'2px solid #e0e0e0'}} className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto bhx-grid-2">
          <div>
            <p style={{fontFamily:'"Space Mono", monospace',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--teal)',marginBottom:'12px'}}>Why Choose Us</p>
            <h2 style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'clamp(48px,5vw,72px)',letterSpacing:'0.03em',lineHeight:0.95,color:'#0a0a0a',marginBottom:'24px'}}>The Only NYC Building Violations Lookup Tool You'll Ever Need</h2>
            <p style={{fontSize:'16px',color:'var(--text-muted)',lineHeight:1.75,fontWeight:300,marginBottom:'36px'}}>
              Finding an apartment in New York City is already stressful enough. We've aggregated data from <strong style={{color:'#0a0a0a',fontWeight:700}}>55+ official NYC data sources</strong> so you can make informed decisions in minutes, not hours.
            </p>
            {[
              {n:'01',title:'Real-Time NYC Open Data Integration',body:'We pull directly from HPD, DOB, ACRIS, 311, DOHMH, and dozens more official sources.'},
              {n:'02',title:'Instant Lookup for Any NYC Building',body:'Search over 1 million properties across all five boroughs. No login, no fee, instant results.'},
              {n:'03',title:'Tenant-Focused Red Flag Alerts',body:'We surface repeated heat complaints, pest infestations, and buildings on HPD watchlists.'},
            ].map((item,i) => (
              <div key={item.n} style={{display:'flex',gap:'20px',alignItems:'start',padding:'20px 0',borderTop:'1px solid #e0e0e0'}}>
                <div style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'32px',color:'var(--teal)',lineHeight:1,flexShrink:0,letterSpacing:'0.04em'}}>{item.n}</div>
                <div>
                  <div style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'20px',letterSpacing:'0.04em',color:'#0a0a0a',marginBottom:'6px'}}>{item.title}</div>
                  <div style={{fontSize:'14px',color:'var(--text-muted)',lineHeight:1.65}}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{border:'2px solid #0a0a0a',background:'var(--teal-light)'}}>
            <div style={{background:'#0a0a0a',padding:'16px 24px'}}>
              <div style={{fontFamily:'"Space Mono", monospace',fontSize:'10px',color:'rgba(255,255,255,0.4)',letterSpacing:'0.12em',textTransform:'uppercase'}}>Data Sources</div>
            </div>
            <div style={{padding:'32px'}}>
              <div style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'80px',color:'var(--teal)',lineHeight:1,letterSpacing:'0.04em'}}>55+</div>
              <div style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'20px',color:'#0a0a0a',letterSpacing:'0.06em',marginBottom:'24px'}}>Official NYC Government Sources</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0',border:'1px solid #0a0a0a'}}>
                {[
                  {n:'1M+',l:'Properties'},
                  {n:'10K+',l:'Monthly Searches'},
                  {n:'5',l:'NYC Boroughs'},
                  {n:'24/7',l:'Data Updates'},
                ].map((item,i) => (
                  <div key={item.l} style={{
                    padding:'20px',
                    borderRight: i%2===0 ? '1px solid #0a0a0a' : 'none',
                    borderBottom: i<2 ? '1px solid #0a0a0a' : 'none',
                  }}>
                    <div style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'32px',color:'var(--teal)',letterSpacing:'0.04em',lineHeight:1}}>{item.n}</div>
                    <div style={{fontSize:'12px',color:'var(--text-muted)',marginTop:'4px'}}>{item.l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:'8px',marginTop:'20px'}}>
                {['HPD','DOB','311','DHCR','DOHMH','ACRIS','FDNY','ECB'].map(s => (
                  <span key={s} style={{border:'1px solid rgba(11,138,122,0.4)',padding:'5px 12px',fontFamily:'"Space Mono", monospace',fontSize:'10px',color:'var(--teal)',letterSpacing:'0.08em'}}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{borderBottom:'3px solid #0a0a0a',background:'#fff'}} className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div style={{marginBottom:'36px'}}>
            <p style={{fontFamily:'"Space Mono", monospace',fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--teal)',marginBottom:'10px'}}>Services</p>
            <h2 data-animate="slide-left" style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'clamp(48px,5vw,72px)',letterSpacing:'0.03em',lineHeight:0.95,color:'#0a0a0a'}}>Help at Every Step of Your Move</h2>
          </div>
          <div className="bhx-grid-services" style={{border:'2px solid #0a0a0a'}}>
            {Object.entries(services).slice(0,8).map(([slug, service], i) => (
              <Link key={slug} href={`/services/${slug}`}
                className="bhx-hover-lift"
                style={{
                  display:'block',
                  borderRight: i%4===3 ? 'none' : '1px solid #e0e0e0',
                  borderBottom: i<4 ? '1px solid #e0e0e0' : 'none',
                  textDecoration:'none',
                  color:'inherit',
                  transition:'background 0.15s',
                  position:'relative',
                  overflow:'hidden',
                }}
                onMouseEnter={e=>{
                  e.currentTarget.style.background='var(--teal-light)';
                  const bar = e.currentTarget.querySelector('.hover-bar') as HTMLElement;
                  if(bar) bar.style.transform='scaleX(1)';
                }}
                onMouseLeave={e=>{
                  e.currentTarget.style.background='transparent';
                  const bar = e.currentTarget.querySelector('.hover-bar') as HTMLElement;
                  if(bar) bar.style.transform='scaleX(0)';
                }}
              >
                <div className="hover-bar" style={{position:'absolute',bottom:0,left:0,right:0,height:'3px',background:'var(--teal)',transform:'scaleX(0)',transformOrigin:'left',transition:'transform 0.2s'}} />
                <div style={{position:'relative',width:'100%',height:'120px',overflow:'hidden',borderBottom:'1px solid #e0e0e0'}}>
                  <Image src={`/services/${slug}.png`} alt={service.name} fill className="object-cover" sizes="25vw" />
                </div>
                <div style={{padding:'20px'}}>
                  <div style={{fontFamily:'"Space Mono", monospace',fontSize:'9px',color:'#ccc',letterSpacing:'0.12em',marginBottom:'10px'}}>0{i+1}</div>
                  <div style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'20px',letterSpacing:'0.04em',color:'#0a0a0a',marginBottom:'8px'}}>{service.name}</div>
                  <div style={{fontSize:'12px',color:'var(--text-muted)',lineHeight:1.6}}>Get matched with experienced pros and fast availability.</div>
                  <div style={{fontFamily:'"Bebas Neue", sans-serif',fontSize:'13px',color:'var(--teal)',letterSpacing:'0.1em',marginTop:'14px'}}>Get Quotes →</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{marginTop:'16px',textAlign:'center'}}>
            <Link href="/services" style={{
              display:'inline-flex',alignItems:'center',gap:'8px',
              border:'2px solid #0a0a0a',padding:'14px 32px',
              fontFamily:'"Bebas Neue", sans-serif',fontSize:'18px',letterSpacing:'0.08em',
              color:'#0a0a0a',textDecoration:'none',transition:'all 0.15s',
              background:'transparent',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='#0a0a0a';e.currentTarget.style.color='#fff';}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='#0a0a0a';}}
            >View All Services →</Link>
          </div>
        </div>
      </section>

      {/* ── DATA SOURCES STRIP ── */}
      <section style={{background:'var(--bg-secondary)',borderBottom:'1px solid #e0e0e0'}} className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div style={{display:'flex',alignItems:'center',gap:'32px',flexWrap:'wrap'}}>
            <div style={{fontFamily:'"Space Mono", monospace',fontSize:'10px',color:'var(--text-muted)',letterSpacing:'0.12em',textTransform:'uppercase',flexShrink:0}}>Powered by</div>
            {['NYC Open Data','HPD','DOB','311','ACRIS','DOHMH','DHCR','FDNY'].map(s => (
              <div key={s} style={{fontFamily:'"Space Mono", monospace',fontSize:'12px',fontWeight:700,color:'var(--text-muted)',letterSpacing:'0.06em',cursor:'default',transition:'color 0.15s'}}
              onMouseEnter={e=>(e.currentTarget.style.color='var(--teal)')}
              onMouseLeave={e=>(e.currentTarget.style.color='var(--text-muted)')}
              >{s}</div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
