// app/api/acris/[bbl]/route.ts
//
// Standalone ACRIS financial data endpoint.
// Does NOT touch /api/building — safe to add without breaking anything.
//
// No API key required. NYC Open Data is public.
// Optional: set NYC_OPEN_DATA_APP_TOKEN in .env.local for higher rate limits.
// Get a free token at: https://data.cityofnewyork.us/profile/app_tokens
//
// Debug mode: hit /api/acris/[bbl]?debug=1 to see raw query params + Socrata response
// (useful for diagnosing zero-result issues without touching the UI)

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE    = 'https://data.cityofnewyork.us/resource'
const LEGALS  = `${BASE}/8h5j-fqxa.json`
const MASTER  = `${BASE}/bnx9-e6tj.json`
const PARTIES = `${BASE}/636b-3b5g.json`

const APP_TOKEN    = process.env.NYC_OPEN_DATA_APP_TOKEN ?? ''
const CACHE_TTL_MS = 48 * 60 * 60 * 1000

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
  // BBL: 10 digits — 1 borough + 5 block + 4 lot
  // ACRIS Socrata stores block as 5-char zero-padded TEXT ('00047')
  // and lot as 4-char zero-padded TEXT ('7501').
  // Do NOT strip leading zeros — exact string match is required.
  const raw = bbl.replace(/\D/g, '').padStart(10, '0')
  return {
    borough: raw[0],          // '1'
    block:   raw.slice(1, 6), // '00047' — preserves leading zeros
    lot:     raw.slice(6),    // '7501'
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

function reqHeaders() {
  const h: Record<string, string> = { 'Content-Type': 'application/json' }
  if (APP_TOKEN) h['X-App-Token'] = APP_TOKEN
  return h
}

function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n))
  return out
}

// ─── Socrata fetchers ──────────────────────────────────────────────────────────

async function fetchDocumentIds(bbl: string, debugMode: boolean) {
  const { borough, block, lot } = parseBBL(bbl)

  // Build three query variants — try each until one returns results.
  // ACRIS dataset has inconsistent formatting across boroughs and time periods.
  const variants = [
    `borough='${borough}' AND block='${block}' AND lot='${lot}'`,
    `borough='${borough}' AND block='${String(parseInt(block, 10))}' AND lot='${String(parseInt(lot, 10))}'`,
    `borough=${borough} AND block=${parseInt(block, 10)} AND lot=${parseInt(lot, 10)}`,
  ]

  const debugInfo: any[] = []

  for (const whereClause of variants) {
    const url = new URL(LEGALS)
    url.searchParams.set('$where',  whereClause)
    url.searchParams.set('$select', 'document_id')
    url.searchParams.set('$limit',  '1000')

    const fullUrl = url.toString()
    const res = await fetch(fullUrl, {
      headers: reqHeaders(),
      next: { revalidate: 172800 },
    })

    if (!res.ok) {
      if (debugMode) debugInfo.push({ variant: whereClause, status: res.status, error: await res.text() })
      continue
    }

    const rows: Array<{ document_id: string }> = await res.json()

    if (debugMode) {
      debugInfo.push({ variant: whereClause, url: fullUrl, count: rows.length, sample: rows.slice(0, 3) })
    }

    if (rows.length > 0) {
      return { ids: Array.from(new Set(rows.map(r => r.document_id))), debugInfo, matched: whereClause }
    }
  }

  return { ids: [], debugInfo, matched: null }
}

async function fetchMasterRecords(docIds: string[]) {
  if (!docIds.length) return []
  const results = await Promise.all(
    chunk(docIds, 100).map(async ids => {
      const inClause = ids.map(id => `'${id}'`).join(',')
      const url = new URL(MASTER)
      url.searchParams.set('$where',  `document_id IN(${inClause})`)
      url.searchParams.set('$select', 'document_id,doc_type,document_date,doc_amount,good_through_date,recorded_filed')
      url.searchParams.set('$limit',  '500')
      const res = await fetch(url.toString(), { headers: reqHeaders(), next: { revalidate: 172800 } })
      if (!res.ok) return []
      return res.json()
    })
  )
  return results.flat()
}

async function fetchParties(docIds: string[]) {
  if (!docIds.length) return []
  const results = await Promise.all(
    chunk(docIds, 100).map(async ids => {
      const inClause = ids.map(id => `'${id}'`).join(',')
      const url = new URL(PARTIES)
      url.searchParams.set('$where',  `document_id IN(${inClause})`)
      url.searchParams.set('$select', 'document_id,party_type,name')
      url.searchParams.set('$limit',  '500')
      const res = await fetch(url.toString(), { headers: reqHeaders(), next: { revalidate: 172800 } })
      if (!res.ok) return []
      return res.json()
    })
  )
  return results.flat()
}

// ─── Signal computation ────────────────────────────────────────────────────────

function buildDocList(master: any[], parties: any[]) {
  const partyMap: Record<string, { grantor?: string; grantee?: string }> = {}
  for (const p of parties) {
    if (!partyMap[p.document_id]) partyMap[p.document_id] = {}
    if (p.party_type === '1') partyMap[p.document_id].grantor = (p.name ?? '').trim()
    if (p.party_type === '2') partyMap[p.document_id].grantee = (p.name ?? '').trim()
  }
  return master
    .map((d: any) => ({
      id:      d.document_id as string,
      group:   classifyDoc(d.doc_type ?? ''),
      docType: (d.doc_type ?? '').trim(),
      date:    new Date(d.document_date ?? d.recorded_filed ?? '1970-01-01'),
      amount:  parseFloat(d.doc_amount ?? '0') || 0,
      goodThru: d.good_through_date ? new Date(d.good_through_date) : null,
      grantor:  partyMap[d.document_id]?.grantor ?? null,
      grantee:  partyMap[d.document_id]?.grantee ?? null,
    }))
    .filter(d => d.date.getFullYear() > 1970)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

function computeSignals(docs: ReturnType<typeof buildDocList>) {
  const now        = new Date()
  const threeYrsAgo = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate())

  const deeds         = docs.filter(d => d.group === 'DEED')
  const mortgages     = docs.filter(d => d.group === 'MTGE')
  const satisfactions = docs.filter(d => d.group === 'SMTG')
  const lisPendens    = docs.filter(d => d.group === 'LPDE')
  const mechLiens     = docs.filter(d => d.group === 'MLIE')
  const taxLiens      = docs.filter(d => d.group === 'ALIE')

  const activeMortgageCount = Math.max(0, mortgages.length - satisfactions.length)
  const totalMortgageDebt   = mortgages.slice(0, activeMortgageCount).reduce((s, m) => s + m.amount, 0)
  const activeLisPendens    = lisPendens.filter(d => !d.goodThru || d.goodThru > now)
  const recentSales         = deeds.filter(d => d.date >= threeYrsAgo)
  const recentMechLiens     = mechLiens.filter(d => d.date >= threeYrsAgo)
  const lastDeed            = deeds[0] ?? null
  const ownershipDays       = lastDeed
    ? Math.floor((now.getTime() - lastDeed.date.getTime()) / 86400000)
    : null

  let score = 100
  score -= Math.min(activeLisPendens.length * 35, 60)
  score -= Math.min(taxLiens.length * 8, 24)
  score -= Math.min(recentMechLiens.length * 6, 18)
  if (recentSales.length >= 2) score -= 12
  if (recentSales.length >= 3) score -= 8
  if (activeMortgageCount >= 4) score -= 8
  if (activeMortgageCount >= 6) score -= 8
  if (ownershipDays && ownershipDays > 3650) score += 5
  const financialScore = Math.max(0, Math.min(100, Math.round(score)))

  return {
    financialScore,
    riskProfile:          getRiskProfile(financialScore, activeLisPendens.length, recentSales.length, recentMechLiens.length),
    activeLisPendensCount: activeLisPendens.length,
    activeMortgageCount,
    totalMortgageDebt,
    taxLienCount:         taxLiens.length,
    mechLienCount:        mechLiens.length,
    recentMechLienCount:  recentMechLiens.length,
    recentSaleCount:      recentSales.length,
    ownershipDays,
    lastOwner:            lastDeed?.grantee ?? null,
    lastSaleDate:         lastDeed?.date.toISOString().slice(0, 10) ?? null,
  }
}

function getRiskProfile(score: number, lisPendens: number, recentSales: number, mechLiens: number) {
  if (lisPendens > 0)    return { label: 'Distressed asset',         level: 'critical' as const, detail: 'Active foreclosure proceeding. Owner likely unable to fund maintenance or remediation.' }
  if (recentSales >= 2 && score < 65) return { label: 'Predatory equity risk', level: 'high' as const,     detail: 'Multiple recent ownership transfers with financial stress signals.' }
  if (mechLiens >= 2)    return { label: 'Contractor dispute history', level: 'medium' as const,  detail: "Unresolved mechanic's liens on record. Maintenance may be stalled or disputed." }
  if (score >= 80)       return { label: 'Financially stable',        level: 'low' as const,      detail: 'No major financial stress indicators.' }
  return                        { label: 'Moderate risk',             level: 'medium' as const,  detail: 'Some financial stress signals present.' }
}

// ─── Supabase cache ────────────────────────────────────────────────────────────

async function getCached(bbl: string) {
  if (!supabase) return null
  try {
    const { data } = await supabase
      .from('acris_cache')
      .select('payload, refreshed_at')
      .eq('bbl', bbl)
      .single()
    if (!data) return null
    if (Date.now() - new Date(data.refreshed_at).getTime() > CACHE_TTL_MS) return null
    return data.payload
  } catch { return null }
}

async function setCache(bbl: string, payload: object) {
  if (!supabase) return
  try {
    await supabase
      .from('acris_cache')
      .upsert({ bbl, payload, refreshed_at: new Date().toISOString() }, { onConflict: 'bbl' })
  } catch {}
}

// ─── Route handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest, { params }: { params: { bbl: string } }) {
  const { bbl } = params
  const debugMode = req.nextUrl.searchParams.get('debug') === '1'

  if (!bbl || !/^\d{10}$/.test(bbl)) {
    return NextResponse.json({ error: 'Invalid BBL — must be 10 digits' }, { status: 400 })
  }

  // Debug mode — skip cache, return raw query info so you can see exactly what's being sent
  if (debugMode) {
    try {
      const parsed = parseBBL(bbl)
      const { ids, debugInfo, matched } = await fetchDocumentIds(bbl, true)
      return NextResponse.json({
        debug: true,
        bbl,
        parsed,
        docIdsFound: ids.length,
        matchedVariant: matched,
        variants: debugInfo,
        note: 'If docIdsFound=0 across all variants, this BBL has no ACRIS records or the dataset field format has changed.',
      })
    } catch (err: any) {
      return NextResponse.json({ debug: true, error: err.message }, { status: 500 })
    }
  }

  try {
    const cached = await getCached(bbl)
    if (cached) return NextResponse.json({ ...cached, cached: true })

    const { ids: docIds } = await fetchDocumentIds(bbl, false)

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
    return NextResponse.json({ error: 'Failed to fetch ACRIS data', detail: err.message }, { status: 500 })
  }
}
