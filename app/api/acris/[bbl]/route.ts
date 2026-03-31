// app/api/acris/[bbl]/route.ts
//
// Standalone ACRIS financial data endpoint.
// Does NOT touch /api/building — safe to add without breaking anything.
//
// No API key required. NYC Open Data is public.
// Optional: set NYC_OPEN_DATA_APP_TOKEN in .env.local for higher rate limits.
// Get a free token at: https://data.cityofnewyork.us/profile/app_tokens
//
// Endpoints used (all public):
//   Legals  (BBL → document_id list) : data.cityofnewyork.us/resource/8h5j-fqxa.json
//   Master  (doc type, date, amount) : data.cityofnewyork.us/resource/bnx9-e6tj.json
//   Parties (grantor / grantee names): data.cityofnewyork.us/resource/636b-3b5g.json
//
// Cache strategy: results cached 48 hours in Supabase keyed by BBL.
// If Supabase is not configured, falls back to Next.js fetch cache (no persistence).

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE    = 'https://data.cityofnewyork.us/resource'
const LEGALS  = `${BASE}/8h5j-fqxa.json`   // BBL → document_ids
const MASTER  = `${BASE}/bnx9-e6tj.json`   // doc type, date, amount
const PARTIES = `${BASE}/636b-3b5g.json`   // grantor / grantee

const APP_TOKEN = process.env.NYC_OPEN_DATA_APP_TOKEN ?? ''
const CACHE_TTL_MS = 48 * 60 * 60 * 1000  // 48 hours

// Document type classifications — covers all common ACRIS codes
const DOC_GROUPS = {
  DEED: ['DEED', 'DEEDO', 'DEDP', 'DEEDP', 'DEED, IN', 'DEED, L', 'DEED, T'],
  MTGE: ['MTGE', 'MTGEO', 'AMTG', 'AGMT', 'MTGE,'],
  SMTG: ['SMTG', 'SAT MTG', 'SATI', 'SATS'],
  LPDE: ['LPDE', 'LIS P', 'LISPE'],
  MLIE: ['MLIE', 'MECHANI', 'ML'],
  ALIE: ['ALIE', 'TAX L', 'TLIE', 'TAX LIEN'],
  UCC:  ['UCC', 'UCC-1', 'UCC-3'],
} as const

type DocGroup = keyof typeof DOC_GROUPS

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseBBL(bbl: string) {
  // BBL is a 10-char string: 1 borough + 5 block + 4 lot
  // ACRIS Socrata stores block/lot WITHOUT leading zeros
  const raw = bbl.replace(/\D/g, '').padStart(10, '0')
  return {
    borough: raw[0],
    block:   String(parseInt(raw.slice(1, 6), 10)),  // strips leading zeros
    lot:     String(parseInt(raw.slice(6),    10)),
  }
}

function classifyDoc(docType: string): DocGroup | 'OTHER' {
  const upper = docType.toUpperCase().trim()
  for (const [group, prefixes] of Object.entries(DOC_GROUPS)) {
    if ((prefixes as readonly string[]).some(p => upper.startsWith(p))) {
      return group as DocGroup
    }
  }
  return 'OTHER'
}

function headers() {
  const h: Record<string, string> = { 'Content-Type': 'application/json' }
  if (APP_TOKEN) h['X-App-Token'] = APP_TOKEN
  return h
}

// Chunk an array into groups of n — avoids URL length limits on IN() queries
function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n))
  return out
}

// ─── Socrata fetchers ──────────────────────────────────────────────────────────

async function fetchDocumentIds(bbl: string): Promise<string[]> {
  const { borough, block, lot } = parseBBL(bbl)
  const url = new URL(LEGALS)
  // SoQL filter — ACRIS legals uses string equality for these fields
  url.searchParams.set(
    '$where',
    `borough='${borough}' AND block='${block}' AND lot='${lot}'`
  )
  url.searchParams.set('$select', 'document_id')
  url.searchParams.set('$limit',  '1000')

  const res = await fetch(url.toString(), {
    headers: headers(),
    next: { revalidate: 172800 },  // 48hr Next.js cache as fallback
  })
  if (!res.ok) throw new Error(`ACRIS legals error ${res.status}`)
  const rows: Array<{ document_id: string }> = await res.json()
  return [...new Set(rows.map(r => r.document_id))]
}

async function fetchMasterRecords(docIds: string[]) {
  if (!docIds.length) return []
  const chunks = chunk(docIds, 100)  // 100 IDs per request keeps URL short
  const results = await Promise.all(
    chunks.map(async ids => {
      const inClause = ids.map(id => `'${id}'`).join(',')
      const url = new URL(MASTER)
      url.searchParams.set('$where',  `document_id IN(${inClause})`)
      url.searchParams.set('$select', 'document_id,doc_type,document_date,doc_amount,good_through_date,recorded_filed')
      url.searchParams.set('$limit',  '500')
      const res = await fetch(url.toString(), {
        headers: headers(),
        next: { revalidate: 172800 },
      })
      if (!res.ok) return []
      return res.json()
    })
  )
  return results.flat()
}

async function fetchParties(docIds: string[]) {
  if (!docIds.length) return []
  const chunks = chunk(docIds, 100)
  const results = await Promise.all(
    chunks.map(async ids => {
      const inClause = ids.map(id => `'${id}'`).join(',')
      const url = new URL(PARTIES)
      url.searchParams.set('$where',  `document_id IN(${inClause})`)
      url.searchParams.set('$select', 'document_id,party_type,name')
      url.searchParams.set('$limit',  '500')
      const res = await fetch(url.toString(), {
        headers: headers(),
        next: { revalidate: 172800 },
      })
      if (!res.ok) return []
      return res.json()
    })
  )
  return results.flat()
}

// ─── Signal computation ────────────────────────────────────────────────────────

function computeSignals(docs: ReturnType<typeof buildDocList>) {
  const now = new Date()
  const threeYrsAgo = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate())
  const tenYrsAgo   = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate())

  const deeds        = docs.filter(d => d.group === 'DEED')
  const mortgages    = docs.filter(d => d.group === 'MTGE')
  const satisfactions = docs.filter(d => d.group === 'SMTG')
  const lisPendens   = docs.filter(d => d.group === 'LPDE')
  const mechLiens    = docs.filter(d => d.group === 'MLIE')
  const taxLiens     = docs.filter(d => d.group === 'ALIE')

  // A mortgage is "satisfied" if a SMTG doc exists referencing it.
  // ACRIS doesn't explicitly link them, so we approximate:
  // count active mortgages as total MTGE minus total SMTG (floor 0)
  const activeMortgageCount = Math.max(0, mortgages.length - satisfactions.length)
  const totalMortgageDebt   = mortgages
    .slice(0, activeMortgageCount)         // most recent ones are most likely active
    .reduce((s, m) => s + m.amount, 0)

  // Lis pendens: active if good_through_date is null or in the future
  const activeLisPendens = lisPendens.filter(d => !d.goodThru || d.goodThru > now)

  // Flip velocity: how many deed transfers in the last 3 years
  const recentSales = deeds.filter(d => d.date >= threeYrsAgo)

  // Ownership tenure
  const lastDeed = deeds[0] ?? null
  const ownershipDays = lastDeed
    ? Math.floor((now.getTime() - lastDeed.date.getTime()) / 86400000)
    : null

  // Mechanic's liens in last 3 years (leading indicator for deferred maintenance)
  const recentMechLiens = mechLiens.filter(d => d.date >= threeYrsAgo)

  // Financial health score (0–100)
  let score = 100
  score -= Math.min(activeLisPendens.length * 35, 60)   // foreclosure = massive hit
  score -= Math.min(taxLiens.length * 8, 24)
  score -= Math.min(recentMechLiens.length * 6, 18)
  if (recentSales.length >= 2) score -= 12              // flip pattern
  if (recentSales.length >= 3) score -= 8
  if (activeMortgageCount >= 4) score -= 8
  if (activeMortgageCount >= 6) score -= 8
  if (ownershipDays && ownershipDays > 3650) score += 5 // long tenure bonus
  const financialScore = Math.max(0, Math.min(100, Math.round(score)))

  // Investor risk label
  const riskProfile = getRiskProfile(financialScore, activeLisPendens.length, recentSales.length, recentMechLiens.length)

  return {
    financialScore,
    riskProfile,
    activeLisPendensCount: activeLisPendens.length,
    activeMortgageCount,
    totalMortgageDebt,
    taxLienCount:      taxLiens.length,
    mechLienCount:     mechLiens.length,
    recentMechLienCount: recentMechLiens.length,
    recentSaleCount:   recentSales.length,
    ownershipDays,
    lastOwner:         lastDeed?.grantee ?? null,
    lastSaleDate:      lastDeed?.date.toISOString().slice(0, 10) ?? null,
  }
}

function getRiskProfile(score: number, lisPendens: number, recentSales: number, mechLiens: number) {
  if (lisPendens > 0) {
    return {
      label: 'Distressed asset',
      level: 'critical' as const,
      detail: 'Active foreclosure proceeding. Owner likely unable to fund maintenance or remediation.',
    }
  }
  if (recentSales >= 2 && score < 65) {
    return {
      label: 'Predatory equity risk',
      level: 'high' as const,
      detail: 'Multiple recent ownership transfers with financial stress signals. Often precedes rapid deterioration.',
    }
  }
  if (mechLiens >= 2) {
    return {
      label: 'Contractor dispute history',
      level: 'medium' as const,
      detail: 'Unresolved mechanic\'s liens on record. Maintenance may be stalled or disputed.',
    }
  }
  if (score >= 80) {
    return { label: 'Financially stable', level: 'low' as const, detail: 'No major financial stress indicators.' }
  }
  return { label: 'Moderate risk', level: 'medium' as const, detail: 'Some financial stress signals present.' }
}

// ─── Document list builder ─────────────────────────────────────────────────────

function buildDocList(master: any[], parties: any[]) {
  // Build party lookup
  const partyMap: Record<string, { grantor?: string; grantee?: string }> = {}
  for (const p of parties) {
    if (!partyMap[p.document_id]) partyMap[p.document_id] = {}
    if (p.party_type === '1') partyMap[p.document_id].grantor = (p.name ?? '').trim()
    if (p.party_type === '2') partyMap[p.document_id].grantee = (p.name ?? '').trim()
  }

  return master
    .map((d: any) => ({
      id:       d.document_id as string,
      group:    classifyDoc(d.doc_type ?? ''),
      docType:  (d.doc_type ?? '').trim(),
      date:     new Date(d.document_date ?? d.recorded_filed ?? '1970-01-01'),
      amount:   parseFloat(d.doc_amount ?? '0') || 0,
      goodThru: d.good_through_date ? new Date(d.good_through_date) : null,
      grantor:  partyMap[d.document_id]?.grantor ?? null,
      grantee:  partyMap[d.document_id]?.grantee ?? null,
    }))
    .filter(d => d.date.getFullYear() > 1970)   // skip malformed dates
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

// ─── Supabase cache ────────────────────────────────────────────────────────────

async function getCached(bbl: string) {
  if (!supabase) return null
  const { data } = await supabase
    .from('acris_cache')
    .select('payload, refreshed_at')
    .eq('bbl', bbl)
    .single()
  if (!data) return null
  const age = Date.now() - new Date(data.refreshed_at).getTime()
  if (age > CACHE_TTL_MS) return null
  return data.payload
}

async function setCache(bbl: string, payload: object) {
  if (!supabase) return
  await supabase
    .from('acris_cache')
    .upsert({ bbl, payload, refreshed_at: new Date().toISOString() }, { onConflict: 'bbl' })
}

// ─── Route handler ─────────────────────────────────────────────────────────────

export async function GET(_req: NextRequest, { params }: { params: { bbl: string } }) {
  const { bbl } = params

  if (!bbl || !/^\d{10}$/.test(bbl)) {
    return NextResponse.json({ error: 'Invalid BBL — must be 10 digits' }, { status: 400 })
  }

  try {
    // 1. Check Supabase cache first
    const cached = await getCached(bbl)
    if (cached) {
      return NextResponse.json({ ...cached, cached: true })
    }

    // 2. Fetch from NYC Open Data
    const docIds = await fetchDocumentIds(bbl)

    if (!docIds.length) {
      const empty = { bbl, docCount: 0, signals: null, timeline: [], cached: false }
      await setCache(bbl, empty)
      return NextResponse.json(empty)
    }

    const [masterRaw, partiesRaw] = await Promise.all([
      fetchMasterRecords(docIds),
      fetchParties(docIds),
    ])

    const docs    = buildDocList(masterRaw, partiesRaw)
    const signals = computeSignals(docs)

    // 3. Build a clean timeline (last 30 events, meaningful groups only)
    const timeline = docs
      .filter(d => d.group !== 'OTHER')
      .slice(0, 30)
      .map(d => ({
        id:      d.id,
        group:   d.group,
        docType: d.docType,
        date:    d.date.toISOString().slice(0, 10),
        amount:  d.amount,
        grantor: d.grantor,
        grantee: d.grantee,
      }))

    const payload = { bbl, docCount: docIds.length, signals, timeline, cached: false }
    await setCache(bbl, payload)

    return NextResponse.json(payload)

  } catch (err: any) {
    console.error('[ACRIS]', err)
    return NextResponse.json(
      { error: 'Failed to fetch ACRIS data', detail: err.message },
      { status: 500 }
    )
  }
}
