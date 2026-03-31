'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown, X, Menu } from 'lucide-react'

interface HeaderProps {
  showSearch?: boolean
  searchPlaceholder?: string
}

const SERVICES = [
  { href: '/services/moving-companies', label: 'Moving Companies', desc: 'Licensed NYC movers' },
  { href: '/services/pest-control', label: 'Pest Control', desc: 'Bed bugs, roaches, rodents' },
  { href: '/services/cleaning-services', label: 'Cleaning Services', desc: 'Move-in/out cleaning' },
  { href: '/services/building-inspectors', label: 'Building Inspectors', desc: 'Pre-lease inspections' },
  { href: '/services/renters-insurance', label: 'Renters Insurance', desc: 'Instant quotes' },
  { href: '/services/plumbers', label: 'Plumbers', desc: 'Emergency & scheduled' },
]

const LOCATIONS = [
  { slug: 'manhattan', name: 'Manhattan' },
  { slug: 'brooklyn', name: 'Brooklyn' },
  { slug: 'queens', name: 'Queens' },
  { slug: 'bronx', name: 'The Bronx' },
  { slug: 'staten-island', name: 'Staten Island' },
  { slug: 'williamsburg', name: 'Williamsburg' },
  { slug: 'astoria', name: 'Astoria' },
  { slug: 'upper-east-side', name: 'Upper East Side' },
]

const NAV = [
  { href: '/blog', label: 'Blog' },
  { href: '/guides', label: 'Guides' },
  { href: '/news', label: 'News' },
]

export default function Header({ showSearch = false, searchPlaceholder = 'Search any NYC address...' }: HeaderProps) {
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [locationsOpen, setLocationsOpen] = useState(false)
  const [mobileServices, setMobileServices] = useState(false)
  const [mobileLocations, setMobileLocations] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // JS-based responsive — more reliable than Tailwind in client components
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    setMobileOpen(false); setServicesOpen(false); setLocationsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const q = search.trim()
    if (!q) return
    setSearching(true); setSearchError('')
    try {
      const res = await fetch(`/api/lookup?address=${encodeURIComponent(q)}`)
      const json = await res.json()
      if (json?.bbl) { setMobileOpen(false); router.push(`/building/${json.bbl}`) }
      else setSearchError(json?.error || 'Address not found')
    } catch { setSearchError('Search failed. Please try again.') }
    finally { setSearching(false) }
  }

  const mono = { fontFamily: '"Space Mono", monospace', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' as const }
  const navLink = { ...mono, padding: '0 14px', lineHeight: '60px', color: '#555', textDecoration: 'none', display: 'block', transition: 'color 0.15s' }
  const dropItem = { display: 'block', padding: '12px 16px', borderBottom: '1px solid #e0e0e0', textDecoration: 'none', color: '#0a0a0a', fontSize: '13px', fontWeight: 500, transition: 'background 0.1s' }

  return (
    <>
      <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, background:'#fff', borderBottom:'3px solid #0a0a0a', height:'60px', display:'flex', alignItems:'center' }}>
        <div style={{ width:'100%', maxWidth:'1400px', margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'24px' }}>

          {/* Logo */}
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none', flexShrink:0 }}>
            <div style={{ width:'32px', height:'32px', border:'2px solid #0a0a0a', overflow:'hidden', position:'relative', flexShrink:0 }}>
              <Image src="/logo.png" alt="BHX" fill sizes="32px" style={{ objectFit:'contain' }} priority />
            </div>
            <span style={{ fontFamily:'"Bebas Neue", sans-serif', fontSize:'30px', letterSpacing:'0.04em', lineHeight:'1', color:'#0a0a0a', textTransform:'uppercase' }}>
              BUILDING<span style={{ color:'#0b8a7a' }}>HEALTH</span>X
            </span>
          </Link>

          {/* Desktop search */}
          {showSearch && !isMobile && (
            <form onSubmit={handleSearch} style={{ flex:1, maxWidth:'480px' }}>
              <div style={{ display:'flex', border:'2px solid #0a0a0a' }}>
                <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder={searchPlaceholder} disabled={searching}
                  style={{ flex:1, padding:'8px 14px', border:'none', outline:'none', fontFamily:'"Space Mono", monospace', fontSize:'12px', color:'#0a0a0a' }} />
                <button type="submit" disabled={searching}
                  style={{ background:'#0b8a7a', color:'#fff', border:'none', padding:'8px 16px', cursor:'pointer', fontFamily:'"Bebas Neue", sans-serif', fontSize:'16px', letterSpacing:'0.08em' }}>
                  {searching ? '…' : 'Search'}
                </button>
              </div>
              {searchError && <p style={{ ...mono, color:'#e24b4a', marginTop:'4px' }}>{searchError}</p>}
            </form>
          )}

          {/* Desktop nav — hidden on mobile */}
          {!isMobile && (
            <nav style={{ display:'flex', alignItems:'center', gap:0 }}>
              <Link href="/" style={navLink}
                onMouseEnter={e=>(e.currentTarget.style.color='#0b8a7a')}
                onMouseLeave={e=>(e.currentTarget.style.color='#555')}>Home</Link>
              <span style={{ color:'#d0d0d0', fontSize:'14px', userSelect:'none' }}>|</span>

              <div style={{ position:'relative' }} onMouseEnter={()=>setServicesOpen(true)} onMouseLeave={()=>setServicesOpen(false)}>
                <button style={{ ...navLink, background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', height:'60px', padding:'0 14px' } as React.CSSProperties}
                  onMouseEnter={e=>(e.currentTarget.style.color='#0b8a7a')}
                  onMouseLeave={e=>(e.currentTarget.style.color='#555')}>
                  Services <ChevronDown size={12} />
                </button>
                {servicesOpen && (
                  <div style={{ position:'absolute', top:'100%', left:0, background:'#fff', border:'2px solid #0a0a0a', borderTop:'none', minWidth:'240px', zIndex:100 }}>
                    {SERVICES.map(s=>(
                      <Link key={s.href} href={s.href} style={dropItem}
                        onMouseEnter={e=>(e.currentTarget.style.background='#e0f5f2')}
                        onMouseLeave={e=>(e.currentTarget.style.background='#fff')}>
                        {s.label}
                        <span style={{ display:'block', fontFamily:'"Space Mono", monospace', fontSize:'10px', letterSpacing:'0.06em', color:'#aaa', marginTop:'2px' }}>{s.desc}</span>
                      </Link>
                    ))}
                    <Link href="/services" style={{ ...dropItem, borderBottom:'none', color:'#0b8a7a', fontWeight:700 }}
                      onMouseEnter={e=>(e.currentTarget.style.background='#e0f5f2')}
                      onMouseLeave={e=>(e.currentTarget.style.background='#fff')}>View all services →</Link>
                  </div>
                )}
              </div>
              <span style={{ color:'#d0d0d0', fontSize:'14px', userSelect:'none' }}>|</span>

              <div style={{ position:'relative' }} onMouseEnter={()=>setLocationsOpen(true)} onMouseLeave={()=>setLocationsOpen(false)}>
                <button style={{ ...navLink, background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', height:'60px', padding:'0 14px' } as React.CSSProperties}
                  onMouseEnter={e=>(e.currentTarget.style.color='#0b8a7a')}
                  onMouseLeave={e=>(e.currentTarget.style.color='#555')}>
                  Locations <ChevronDown size={12} />
                </button>
                {locationsOpen && (
                  <div style={{ position:'absolute', top:'100%', left:0, background:'#fff', border:'2px solid #0a0a0a', borderTop:'none', minWidth:'200px', zIndex:100 }}>
                    {LOCATIONS.map(l=>(
                      <Link key={l.slug} href={`/locations/${l.slug}`} style={dropItem}
                        onMouseEnter={e=>(e.currentTarget.style.background='#e0f5f2')}
                        onMouseLeave={e=>(e.currentTarget.style.background='#fff')}>
                        {l.name}
                      </Link>
                    ))}
                    <Link href="/locations" style={{ ...dropItem, borderBottom:'none', color:'#0b8a7a', fontWeight:700 }}
                      onMouseEnter={e=>(e.currentTarget.style.background='#e0f5f2')}
                      onMouseLeave={e=>(e.currentTarget.style.background='#fff')}>View all locations →</Link>
                  </div>
                )}
              </div>
              <span style={{ color:'#d0d0d0', fontSize:'14px', userSelect:'none' }}>|</span>

              {NAV.map((l, i)=>(
                <React.Fragment key={l.href}>
                  <Link href={l.href} style={navLink}
                    onMouseEnter={e=>(e.currentTarget.style.color='#0b8a7a')}
                    onMouseLeave={e=>(e.currentTarget.style.color='#555')}>{l.label}</Link>
                  {i < NAV.length - 1 && <span style={{ color:'#d0d0d0', fontSize:'14px', userSelect:'none' }}>|</span>}
                </React.Fragment>
              ))}

              <Link href="/" style={{ fontFamily:'"Bebas Neue", sans-serif', fontSize:'20px', letterSpacing:'0.08em', textTransform:'uppercase', padding:'0 24px', height:'40px', display:'flex', alignItems:'center', background:'#0b8a7a', color:'#fff', textDecoration:'none', marginLeft:'16px', whiteSpace:'nowrap', transition:'background 0.15s', flexShrink:0, alignSelf:'center' }}
                onMouseEnter={e=>(e.currentTarget.style.background='#076d5f')}
                onMouseLeave={e=>(e.currentTarget.style.background='#0b8a7a')}>
                CHECK A BUILDING
              </Link>
            </nav>
          )}

          {/* Mobile hamburger — ONLY on mobile */}
          {isMobile && (
            <button onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Toggle menu"
              style={{ background:'none', border:'2px solid #0a0a0a', padding:'6px 10px', cursor:'pointer', display:'flex', alignItems:'center', flexShrink:0 }}>
              {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
            </button>
          )}
        </div>
      </header>

      {/* Mobile slide-in drawer */}
      {isMobile && (
        <>
          {/* Backdrop */}
          <div
            onClick={()=>setMobileOpen(false)}
            style={{
              position:'fixed', inset:0, zIndex:48,
              background:'rgba(0,0,0,0.45)',
              opacity: mobileOpen ? 1 : 0,
              pointerEvents: mobileOpen ? 'auto' : 'none',
              transition:'opacity 0.25s',
            }}
          />

          {/* Drawer — slides in from right */}
          <div style={{
            position:'fixed', top:0, right:0, bottom:0,
            width:'300px', maxWidth:'85vw',
            background:'#fff',
            borderLeft:'3px solid #0a0a0a',
            zIndex:49,
            overflowY:'auto',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
            transition:'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {/* Drawer header */}
            <div style={{ height:'60px', borderBottom:'2px solid #0a0a0a', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', flexShrink:0 }}>
              <span style={{ fontFamily:'"Bebas Neue", sans-serif', fontSize:'20px', letterSpacing:'0.06em', color:'#0a0a0a' }}>
                BUILDING<span style={{ color:'#0b8a7a' }}>HEALTH</span>X
              </span>
              <button onClick={()=>setMobileOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', padding:'4px', display:'flex' }}>
                <X size={20}/>
              </button>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} style={{ padding:'16px', borderBottom:'1px solid #e0e0e0' }}>
              <div style={{ display:'flex', border:'2px solid #0a0a0a' }}>
                <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search any NYC address..." disabled={searching}
                  style={{ flex:1, padding:'10px 12px', border:'none', outline:'none', fontFamily:'"Space Mono", monospace', fontSize:'11px', color:'#0a0a0a' }} />
                <button type="submit" disabled={searching}
                  style={{ background:'#0b8a7a', color:'#fff', border:'none', padding:'10px 14px', cursor:'pointer', fontFamily:'"Bebas Neue", sans-serif', fontSize:'16px', letterSpacing:'0.08em' }}>
                  {searching ? '…' : 'GO'}
                </button>
              </div>
              {searchError && <p style={{ fontFamily:'"Space Mono", monospace', fontSize:'10px', color:'#e24b4a', marginTop:'4px' }}>{searchError}</p>}
            </form>

            <Link href="/" onClick={()=>setMobileOpen(false)}
              style={{ display:'block', fontFamily:'"Space Mono", monospace', fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', padding:'16px 20px', borderBottom:'1px solid #e0e0e0', textDecoration:'none', color:'#0a0a0a' }}>
              Home
            </Link>

            <button onClick={()=>setMobileServices(!mobileServices)}
              style={{ width:'100%', textAlign:'left', fontFamily:'"Space Mono", monospace', fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', padding:'16px 20px', background:'none', border:'none', borderBottom:'1px solid #e0e0e0', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', color:'#0a0a0a' }}>
              Services <ChevronDown size={12} style={{ transform:mobileServices?'rotate(180deg)':'none', transition:'transform 0.2s' }}/>
            </button>
            {mobileServices && (
              <div style={{ background:'#f5f5f5', borderBottom:'1px solid #e0e0e0' }}>
                {SERVICES.map(s=>(
                  <Link key={s.href} href={s.href} onClick={()=>setMobileOpen(false)}
                    style={{ display:'block', padding:'12px 20px 12px 32px', fontFamily:'"Space Mono", monospace', fontSize:'10px', letterSpacing:'0.08em', textTransform:'uppercase', textDecoration:'none', color:'#0a0a0a', borderBottom:'1px solid rgba(0,0,0,0.06)' }}>
                    {s.label}
                  </Link>
                ))}
                <Link href="/services" onClick={()=>setMobileOpen(false)}
                  style={{ display:'block', padding:'12px 20px 12px 32px', fontFamily:'"Space Mono", monospace', fontSize:'10px', letterSpacing:'0.08em', textTransform:'uppercase', textDecoration:'none', color:'#0b8a7a' }}>
                  View all →
                </Link>
              </div>
            )}

            <button onClick={()=>setMobileLocations(!mobileLocations)}
              style={{ width:'100%', textAlign:'left', fontFamily:'"Space Mono", monospace', fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', padding:'16px 20px', background:'none', border:'none', borderBottom:'1px solid #e0e0e0', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', color:'#0a0a0a' }}>
              Locations <ChevronDown size={12} style={{ transform:mobileLocations?'rotate(180deg)':'none', transition:'transform 0.2s' }}/>
            </button>
            {mobileLocations && (
              <div style={{ background:'#f5f5f5', borderBottom:'1px solid #e0e0e0' }}>
                {LOCATIONS.map(l=>(
                  <Link key={l.slug} href={`/locations/${l.slug}`} onClick={()=>setMobileOpen(false)}
                    style={{ display:'block', padding:'12px 20px 12px 32px', fontFamily:'"Space Mono", monospace', fontSize:'10px', letterSpacing:'0.08em', textTransform:'uppercase', textDecoration:'none', color:'#0a0a0a', borderBottom:'1px solid rgba(0,0,0,0.06)' }}>
                    {l.name}
                  </Link>
                ))}
                <Link href="/locations" onClick={()=>setMobileOpen(false)}
                  style={{ display:'block', padding:'12px 20px 12px 32px', fontFamily:'"Space Mono", monospace', fontSize:'10px', letterSpacing:'0.08em', textTransform:'uppercase', textDecoration:'none', color:'#0b8a7a' }}>
                  View all →
                </Link>
              </div>
            )}

            {NAV.map(l=>(
              <Link key={l.href} href={l.href} onClick={()=>setMobileOpen(false)}
                style={{ display:'block', fontFamily:'"Space Mono", monospace', fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', padding:'16px 20px', borderBottom:'1px solid #e0e0e0', textDecoration:'none', color:'#0a0a0a' }}>
                {l.label}
              </Link>
            ))}

            <div style={{ padding:'20px' }}>
              <Link href="/" onClick={()=>setMobileOpen(false)}
                style={{ display:'block', textAlign:'center', background:'#0b8a7a', color:'#fff', fontFamily:'"Bebas Neue", sans-serif', fontSize:'22px', letterSpacing:'0.08em', padding:'14px', textDecoration:'none', border:'2px solid #0a0a0a' }}>
                CHECK A BUILDING
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
