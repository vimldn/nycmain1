import Link from 'next/link'

const mono = { fontFamily: 'var(--font-space-mono,monospace)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' as const }
const bebas = { fontFamily: 'var(--font-bebas,"Bebas Neue",sans-serif)', letterSpacing: '0.06em' }

const SERVICES = [
  { slug: 'moving-companies', name: 'Moving Companies' },
  { slug: 'pest-control', name: 'Pest Control' },
  { slug: 'cleaning-services', name: 'Cleaning Services' },
  { slug: 'renters-insurance', name: 'Renters Insurance' },
  { slug: 'plumbers', name: 'Plumbers' },
  { slug: 'electricians', name: 'Electricians' },
]

const LOCATIONS = [
  { slug: 'manhattan', name: 'Manhattan' },
  { slug: 'brooklyn', name: 'Brooklyn' },
  { slug: 'queens', name: 'Queens' },
  { slug: 'bronx', name: 'The Bronx' },
  { slug: 'williamsburg', name: 'Williamsburg' },
  { slug: 'astoria', name: 'Astoria' },
  { slug: 'upper-east-side', name: 'Upper East Side' },
  { slug: 'park-slope', name: 'Park Slope' },
]

const RESOURCES = [
  { href: '/blog', name: 'Blog' },
  { href: '/guides', name: 'Guides' },
  { href: '/news', name: 'News' },
  { href: '/press', name: 'Press' },
  { href: '/data-sources', name: 'Data Sources' },
]

const LEGAL = [
  { href: '/privacy-policy', name: 'Privacy Policy' },
  { href: '/terms-of-service', name: 'Terms of Service' },
]

const footerLink = {
  display: 'block',
  ...mono,
  fontSize: '11px',
  color: 'rgba(255,255,255,0.45)',
  textDecoration: 'none',
  marginBottom: '10px',
  transition: 'color 0.15s',
}

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', borderTop: '3px solid #0a0a0a' }}>

      {/* Main footer grid */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '56px 24px 40px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '48px' }}>

        {/* Brand col */}
        <div>
          <div style={{ ...bebas, fontSize: '28px', color: '#fff', marginBottom: '12px' }}>
            Building<span style={{ color: 'var(--teal,#0b8a7a)' }}>Health</span>X
          </div>
          <p style={{ ...mono, fontSize: '10px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8, marginBottom: '24px' }}>
            NYC's most comprehensive building violations lookup tool. Make informed decisions before signing your lease.
          </p>
          <Link href="/" style={{
            display: 'inline-block',
            ...bebas, fontSize: '16px', letterSpacing: '0.08em',
            background: 'var(--teal,#0b8a7a)', color: '#fff',
            padding: '10px 20px', textDecoration: 'none',
            border: '1px solid rgba(11,138,122,0.5)',
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--teal-dark,#076d5f)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--teal,#0b8a7a)')}>
            Check a Building Free →
          </Link>
        </div>

        {/* Services */}
        <div>
          <div style={{ ...bebas, fontSize: '18px', color: '#fff', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>Services</div>
          {SERVICES.map(s => (
            <Link key={s.slug} href={`/services/${s.slug}`} style={footerLink}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal,#0b8a7a)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
              {s.name}
            </Link>
          ))}
          <Link href="/services" style={{ ...footerLink, color: 'var(--teal,#0b8a7a)' }}>View all →</Link>
        </div>

        {/* Locations */}
        <div>
          <div style={{ ...bebas, fontSize: '18px', color: '#fff', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>Locations</div>
          {LOCATIONS.map(l => (
            <Link key={l.slug} href={`/locations/${l.slug}`} style={footerLink}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal,#0b8a7a)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
              {l.name}
            </Link>
          ))}
          <Link href="/locations" style={{ ...footerLink, color: 'var(--teal,#0b8a7a)' }}>View all →</Link>
        </div>

        {/* Resources */}
        <div>
          <div style={{ ...bebas, fontSize: '18px', color: '#fff', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>Resources</div>
          {RESOURCES.map(r => (
            <Link key={r.href} href={r.href} style={footerLink}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal,#0b8a7a)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
              {r.name}
            </Link>
          ))}
        </div>

        {/* Legal */}
        <div>
          <div style={{ ...bebas, fontSize: '18px', color: '#fff', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>Legal</div>
          {LEGAL.map(l => (
            <Link key={l.href} href={l.href} style={footerLink}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal,#0b8a7a)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
              {l.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Data sources strip */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <span style={{ ...mono, fontSize: '10px', color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>Powered by</span>
        {['HPD', 'DOB', '311', 'DHCR', 'DOHMH', 'ACRIS', 'FDNY', 'NYC Open Data'].map(s => (
          <span key={s} style={{ ...mono, fontSize: '10px', color: 'rgba(255,255,255,0.2)', cursor: 'default' }}>{s}</span>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ ...mono, fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>© 2025 Building Health X. All rights reserved.</span>
        <span style={{ ...mono, fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>Data sourced from NYC Open Data</span>
      </div>
    </footer>
  )
}
