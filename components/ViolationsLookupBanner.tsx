import Link from 'next/link'
import type { ComponentType } from 'react'
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ChevronRight,
  FileSearch,
  Flame,
  Home,
  MapPin,
  Search,
  Shield,
  Wrench,
} from 'lucide-react'

type BannerVariant = {
  id: string
  eyebrow: string
  title: string
  body: string
  cta: string
  pill: string
  icon: ComponentType<{ className?: string }>
  containerClass: string
  accentClass: string
  buttonClass: string
  keywords: string[] // used to pick a relevant banner for each post
}

const VARIANTS: BannerVariant[] = [
  {
    id: 'lookup-core',
    eyebrow: 'NYC Building Signals',
    title: 'Look up open building violations in seconds',
    body: 'Search any NYC address to see DOB/HPD activity, safety signals, and what might be driving tenant complaints.',
    cta: 'Try the NYC Building Violations Lookup Tool',
    pill: 'Fast • Free • No signup',
    icon: Search,
    containerClass:
      'bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-secondary)] to-[color-mix(in_oklab,var(--bg-secondary),black_8%)]',
    accentClass: 'from-emerald-400/25 to-cyan-400/20',
    buttonClass: 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90',
    keywords: ['violations', 'lookup', 'address', 'dob', 'hpd', 'records', 'database', 'search'],
  },
  {
    id: 'renters',
    eyebrow: 'Know Before You Rent',
    title: 'Is this building a repeat offender?',
    body: 'Run a quick scan for NYC building violations and patterns that can affect safety, health, and habitability.',
    cta: 'Scan a building now',
    pill: 'Tenants • Buyers • Brokers',
    icon: AlertTriangle,
    containerClass:
      'bg-gradient-to-br from-[var(--bg-secondary)] via-[color-mix(in_oklab,var(--bg-secondary),white_4%)] to-[color-mix(in_oklab,var(--bg-secondary),black_10%)]',
    accentClass: 'from-amber-400/25 to-rose-400/20',
    buttonClass: 'bg-amber-500 text-black hover:opacity-90',
    keywords: ['rent', 'renter', 'lease', 'apartment', 'tenant', 'move', 'broker', 'agent', 'buyer', 'co-op', 'condo'],
  },
  {
    id: 'operators',
    eyebrow: 'For Property Managers',
    title: 'Spot issues early and stay ahead of inspections',
    body: 'Use our lookup tool to quickly review a building’s NYC violations footprint and prioritize fixes.',
    cta: 'Open the lookup tool',
    pill: 'Reduce risk • Improve uptime',
    icon: Shield,
    containerClass:
      'bg-gradient-to-br from-[var(--bg-secondary)] via-[color-mix(in_oklab,var(--bg-secondary),white_3%)] to-[color-mix(in_oklab,var(--bg-secondary),black_12%)]',
    accentClass: 'from-indigo-400/25 to-sky-400/20',
    buttonClass: 'bg-indigo-500 text-white hover:opacity-90',
    keywords: ['property manager', 'management', 'owner', 'landlord', 'portfolio', 'compliance', 'inspection', 'violations management'],
  },
  {
    id: 'neighborhood',
    eyebrow: 'Neighborhood Context',
    title: 'Compare one building to what’s typical nearby',
    body: 'Pull a building’s NYC violations profile and get a clearer sense of how it stacks up in its area.',
    cta: 'Compare a NYC address',
    pill: 'Context matters',
    icon: MapPin,
    containerClass:
      'bg-gradient-to-br from-[var(--bg-secondary)] via-[color-mix(in_oklab,var(--bg-secondary),white_2%)] to-[color-mix(in_oklab,var(--bg-secondary),black_12%)]',
    accentClass: 'from-teal-400/25 to-lime-400/20',
    buttonClass: 'bg-teal-500 text-black hover:opacity-90',
    keywords: ['neighborhood', 'borough', 'brooklyn', 'queens', 'manhattan', 'bronx', 'staten island', 'zip', 'block', 'lot'],
  },
  {
    id: 'due-diligence',
    eyebrow: 'Due Diligence',
    title: 'A quick check that can save you a headache',
    body: 'Before you sign, look up NYC building violations to uncover red flags like recurring safety or maintenance issues.',
    cta: 'Run a quick check',
    pill: '5 seconds to search',
    icon: FileSearch,
    containerClass:
      'bg-gradient-to-br from-[var(--bg-secondary)] via-[color-mix(in_oklab,var(--bg-secondary),white_3%)] to-[color-mix(in_oklab,var(--bg-secondary),black_14%)]',
    accentClass: 'from-fuchsia-400/25 to-violet-400/20',
    buttonClass: 'bg-fuchsia-600 text-white hover:opacity-90',
    keywords: ['due diligence', 'before you rent', 'before you buy', 'checklist', 'red flags', 'screening', 'background'],
  },
  {
    id: 'fire-safety',
    eyebrow: 'Safety First',
    title: 'See what violations say about building safety',
    body: 'From fire risks to structural concerns, our NYC Building Violations Lookup Tool helps you understand the paper trail.',
    cta: 'Check violations & safety signals',
    pill: 'Clear • Practical • Actionable',
    icon: Flame,
    containerClass:
      'bg-gradient-to-br from-[var(--bg-secondary)] via-[color-mix(in_oklab,var(--bg-secondary),white_2%)] to-[color-mix(in_oklab,var(--bg-secondary),black_14%)]',
    accentClass: 'from-orange-400/25 to-red-400/20',
    buttonClass: 'bg-orange-500 text-black hover:opacity-90',
    keywords: ['fire', 'smoke', 'sprinkler', 'alarm', 'egress', 'stairwell', 'hazard', 'unsafe', 'structural', 'collapse', 'safety'],
  },
  {
    id: 'building-health',
    eyebrow: 'Building Health X',
    title: 'NYC violations, decoded for real people',
    body: 'Get a fast snapshot of building violations—then use it to ask better questions of owners, agents, or management.',
    cta: 'Use the NYC lookup tool',
    pill: 'Plain-English insights',
    icon: Building2,
    containerClass:
      'bg-gradient-to-br from-[var(--bg-secondary)] via-[color-mix(in_oklab,var(--bg-secondary),white_3%)] to-[color-mix(in_oklab,var(--bg-secondary),black_12%)]',
    accentClass: 'from-sky-400/25 to-emerald-400/20',
    buttonClass: 'bg-sky-500 text-black hover:opacity-90',
    keywords: ['what does it mean', 'explained', 'guide', 'how to', 'understand', 'interpret', 'meaning', 'class', 'code'],
  },
  {
    id: 'simple-search',
    eyebrow: 'Make It Easy',
    title: 'Find the building’s record without digging through portals',
    body: 'One search surfaces the NYC building violations footprint so you can focus on what it means, not where to click.',
    cta: 'Search an address',
    pill: 'One tool • One place',
    icon: ChevronRight,
    containerClass:
      'bg-gradient-to-br from-[var(--bg-secondary)] via-[color-mix(in_oklab,var(--bg-secondary),white_3%)] to-[color-mix(in_oklab,var(--bg-secondary),black_10%)]',
    accentClass: 'from-blue-400/25 to-violet-400/20',
    buttonClass: 'bg-blue-600 text-white hover:opacity-90',
    keywords: ['portal', 'website', 'where to check', 'how to look up', 'search tool', 'lookup tool', 'database'],
  },
  {
    id: 'maintenance',
    eyebrow: 'Fix Faster',
    title: 'Turn violations into a clear punch list',
    body: 'Use the lookup tool to review recurring issues, then align maintenance priorities with what inspectors care about.',
    cta: 'Review a building’s violations',
    pill: 'Operators • Supers • Owners',
    icon: Wrench,
    containerClass:
      'bg-gradient-to-br from-[var(--bg-secondary)] via-[color-mix(in_oklab,var(--bg-secondary),white_2%)] to-[color-mix(in_oklab,var(--bg-secondary),black_14%)]',
    accentClass: 'from-slate-400/25 to-emerald-400/20',
    buttonClass: 'bg-slate-900 text-white hover:opacity-90',
    keywords: ['maintenance', 'repairs', 'work order', 'superintendent', 'contractor', 'mold', 'lead', 'leaks', 'heat', 'hot water', 'pest'],
  },
  {
    id: 'peace-of-mind',
    eyebrow: 'Quick Win',
    title: 'A simple check for peace of mind',
    body: 'Look up NYC building violations to spot trends—then decide what questions to ask before you commit.',
    cta: 'Open the NYC violations lookup',
    pill: 'Smart renters do this',
    icon: CheckCircle2,
    containerClass:
      'bg-gradient-to-br from-[var(--bg-secondary)] via-[color-mix(in_oklab,var(--bg-secondary),white_4%)] to-[color-mix(in_oklab,var(--bg-secondary),black_10%)]',
    accentClass: 'from-green-400/25 to-sky-400/20',
    buttonClass: 'bg-green-500 text-black hover:opacity-90',
    keywords: ['moving', 'new apartment', 'signing', 'peace of mind', 'avoid', 'tips', 'check before'],
  },
]

function normalize(s: string) {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function hashToIndex(input: string, modulo: number) {
  let h = 0
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0
  return modulo ? h % modulo : 0
}

function pickVariant(inputText: string, fallbackKey: string) {
  const text = ` ${normalize(inputText)} `
  const scores = VARIANTS.map((v) => {
    let score = 0
    for (const k of v.keywords) {
      const kw = ` ${normalize(k)} `
      if (kw.length <= 2) continue
      if (text.includes(kw)) score += 3
      else {
        // softer match: individual tokens
        const tokens = normalize(k).split(' ').filter(Boolean)
        if (tokens.length > 1 && tokens.every((t) => text.includes(` ${t} `))) score += 2
        else if (tokens.length === 1 && text.includes(` ${tokens[0]} `)) score += 1
      }
    }
    return score
  })

  const bestScore = Math.max(...scores)
  if (bestScore >= 3) {
    const bestIdx = scores.indexOf(bestScore)
    return VARIANTS[bestIdx]
  }

  // If nothing matches meaningfully, keep deterministic rotation by slug
  return VARIANTS[hashToIndex(fallbackKey || 'blog', VARIANTS.length)]
}

export default function ViolationsLookupBanner({
  postSlug,
  title,
  excerpt,
  tags,
  className = '',
}: {
  postSlug: string
  title?: string
  excerpt?: string
  tags?: string[]
  className?: string
}) {
  const input = [title, excerpt, (tags || []).join(' ')].filter(Boolean).join(' ')
  const v = pickVariant(input, postSlug)
  const Icon = v.icon

  return (
    <section
      aria-label="NYC Building Violations Lookup Tool"
      className={`card relative overflow-hidden border border-[var(--border-primary)] ${v.containerClass} ${className}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-br ${v.accentClass} blur-2xl`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr ${v.accentClass} blur-2xl opacity-70`}
      />

      <div className="relative p-6 md:p-7">
        <div className="flex items-start gap-4">
          <div className="shrink-0 rounded-2xl border border-[var(--border-primary)] bg-[color-mix(in_oklab,var(--bg-primary),white_3%)] p-3">
            <Icon className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-muted)]">
                {v.eyebrow}
              </span>
              <span className="text-xs rounded-full border border-[var(--border-primary)] bg-[color-mix(in_oklab,var(--bg-primary),white_4%)] px-2.5 py-1 text-[var(--text-secondary)]">
                {v.pill}
              </span>
            </div>

            <h2 className="mt-2 text-xl md:text-2xl font-extrabold leading-tight">{v.title}</h2>
            <p className="mt-2 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">{v.body}</p>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <Link
                href="/"
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition ${v.buttonClass}`}
              >
                {v.cta}
                <ChevronRight className="h-4 w-4" />
              </Link>

              <div className="text-xs text-[var(--text-muted)]">
                Tip: paste an address or BBL on the homepage search.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
