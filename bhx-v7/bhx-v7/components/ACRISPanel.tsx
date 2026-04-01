'use client'

// components/ACRISPanel.tsx
//
// Drop-in financial health panel for the building detail page.
// Fetches from /api/acris/[bbl] — completely independent of the main building API.
//
// Usage (one line in app/building/[bbl]/page.tsx):
//   import ACRISPanel from '@/components/ACRISPanel'
//   ...
//   <ACRISPanel bbl={bbl} />

import { useEffect, useState } from 'react'

// ─── Types ─────────────────────────────────────────────────────────────────────

type RiskLevel = 'critical' | 'high' | 'medium' | 'low'

interface RiskProfile {
  label:  string
  level:  RiskLevel
  detail: string
}

interface Signals {
  financialScore:       number
  riskProfile:          RiskProfile
  activeLisPendensCount: number
  activeMortgageCount:  number
  totalMortgageDebt:    number
  taxLienCount:         number
  mechLienCount:        number
  recentMechLienCount:  number
  recentSaleCount:      number
  ownershipDays:        number | null
  lastOwner:            string | null
  lastSaleDate:         string | null
}

interface TimelineEvent {
  id:      string
  group:   'DEED' | 'MTGE' | 'SMTG' | 'LPDE' | 'MLIE' | 'ALIE' | 'UCC' | 'OTHER'
  docType: string
  date:    string
  amount:  number
  grantor: string | null
  grantee: string | null
}

interface ACRISData {
  bbl:      string
  docCount: number
  signals:  Signals | null
  timeline: TimelineEvent[]
  cached:   boolean
}

// ─── Styling helpers ────────────────────────────────────────────────────────────

const RISK_COLORS: Record<RiskLevel, string> = {
  critical: '#ef4444',
  high:     '#f97316',
  medium:   '#eab308',
  low:      '#22c55e',
}

const GROUP_LABELS: Record<string, string> = {
  DEED: 'Deed transfer',
  MTGE: 'Mortgage',
  SMTG: 'Mortgage satisfied',
  LPDE: 'Lis pendens',
  MLIE: "Mechanic's lien",
  ALIE: 'Tax lien',
  UCC:  'UCC filing',
}

const GROUP_COLORS: Record<string, string> = {
  DEED: '#60a5fa',
  MTGE: '#a78bfa',
  SMTG: '#34d399',
  LPDE: '#f87171',
  MLIE: '#fb923c',
  ALIE: '#fbbf24',
  UCC:  '#555555',
}

function fmt$(n: number) {
  if (!n) return '—'
  return n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : `$${(n / 1_000).toFixed(0)}K`
}

function fmtDays(days: number | null) {
  if (!days) return '—'
  if (days > 365) return `${Math.floor(days / 365)}y ${Math.floor((days % 365) / 30)}m`
  return `${days}d`
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  const r  = 28
  const cx = 36
  const cy = 36
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ

  return (
    <svg width="72" height="72" viewBox="0 0 72 72" style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#dddddd" strokeWidth={7} />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={color}
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ * 0.25}
        style={{ transition: 'stroke-dasharray 0.6s ease' }}
      />
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: 18, fontWeight: 700, fill: color, fontFamily: 'inherit' }}>
        {score}
      </text>
    </svg>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────────

export default function ACRISPanel({ bbl }: { bbl: string }) {
  const [data,    setData]    = useState<ACRISData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    if (!bbl) return
    setLoading(true)
    setError(null)
    fetch(`/api/acris/${bbl}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error)
        setData(d)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [bbl])

  // ── Loading ──
  if (loading) {
    return (
      <div style={styles.card}>
        <div style={styles.sectionHeader}>Financial Health (ACRIS)</div>
        <div style={{ padding: '24px 0', color: '#666666', fontSize: 13, textAlign: 'center' }}>
          Loading financial records…
        </div>
      </div>
    )
  }

  // ── Error ──
  if (error) {
    return (
      <div style={styles.card}>
        <div style={styles.sectionHeader}>Financial Health (ACRIS)</div>
        <div style={{ padding: '12px', color: '#f87171', fontSize: 13 }}>
          Could not load ACRIS data: {error}
        </div>
      </div>
    )
  }

  // ── No documents found ──
  if (!data || !data.signals || data.docCount === 0) {
    return (
      <div style={styles.card}>
        <div style={styles.sectionHeader}>Financial Health (ACRIS)</div>
        <div style={{ padding: '12px', color: '#666666', fontSize: 13 }}>
          No ACRIS records found for this property.
        </div>
      </div>
    )
  }

  const { signals, timeline } = data
  const riskColor  = RISK_COLORS[signals.riskProfile.level]
  const scoreColor = signals.financialScore >= 75 ? '#22c55e'
    : signals.financialScore >= 50 ? '#eab308'
    : '#ef4444'

  const visibleEvents = showAll ? timeline : timeline.slice(0, 8)

  return (
    <div style={styles.card}>

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={styles.sectionHeader}>Financial Health (ACRIS)</div>
          <div style={{ fontSize: 12, color: '#777777', marginTop: 2 }}>
            {data.docCount} documents on record
            {data.cached && <span style={{ marginLeft: 6, color: '#bbbbbb' }}>· cached</span>}
          </div>
        </div>
        <a
          href={`https://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${bbl[0]}&block=${bbl.slice(1,6)}&lot=${bbl.slice(6)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 11, color: '#60a5fa', textDecoration: 'none' }}
        >
          View on ACRIS →
        </a>
      </div>

      {/* Score + risk profile */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20,
        padding: '14px', background: '#ffffff', borderRadius: 0, border: '1px solid #dddddd' }}>
        <ScoreRing score={signals.financialScore} color={scoreColor} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: '#777777', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Financial health score
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4,
            padding: '2px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600,
            background: `${riskColor}18`, color: riskColor, border: `1px solid ${riskColor}40`
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: riskColor, flexShrink: 0 }} />
            {signals.riskProfile.label}
          </div>
          <div style={{ fontSize: 12, color: '#666666', marginTop: 6, lineHeight: 1.5 }}>
            {signals.riskProfile.detail}
          </div>
        </div>
      </div>

      {/* Signal grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 20 }}>
        <StatCell
          label="Lis pendens"
          value={signals.activeLisPendensCount}
          danger={signals.activeLisPendensCount > 0}
          tooltip="Active foreclosure proceedings"
        />
        <StatCell
          label="Tax liens"
          value={signals.taxLienCount}
          danger={signals.taxLienCount > 1}
          tooltip="Outstanding tax lien filings"
        />
        <StatCell
          label="Mechanic's liens"
          value={signals.mechLienCount}
          warn={signals.mechLienCount > 0}
          tooltip="Contractor dispute filings"
        />
        <StatCell
          label="Active mortgages"
          value={signals.activeMortgageCount}
          tooltip="Estimated unsatisfied mortgages"
        />
        <StatCell
          label="Total debt"
          value={fmt$(signals.totalMortgageDebt)}
          tooltip="Sum of active mortgage amounts"
        />
        <StatCell
          label="Ownership tenure"
          value={fmtDays(signals.ownershipDays)}
          tooltip="Time since last deed transfer"
        />
      </div>

      {/* Recent sales warning */}
      {signals.recentSaleCount >= 2 && (
        <div style={{ ...styles.alert, borderColor: '#f9731640', background: '#f9731610', color: '#fb923c' }}>
          <span style={{ fontWeight: 600 }}>Flip pattern detected</span>
          {' '}— {signals.recentSaleCount} deed transfers in the last 3 years.
          High turnover combined with violations may indicate deferred investment.
        </div>
      )}

      {signals.activeLisPendensCount > 0 && (
        <div style={{ ...styles.alert, borderColor: '#ef444440', background: '#ef444410', color: '#f87171' }}>
          <span style={{ fontWeight: 600 }}>Active foreclosure</span>
          {' '}— lis pendens on file. Owner may be financially unable to address violations.
        </div>
      )}

      {/* Last known owner */}
      {signals.lastOwner && (
        <div style={{ fontSize: 12, color: '#666666', marginBottom: 16 }}>
          Current owner of record:{' '}
          <span style={{ color: '#cbd5e1', fontWeight: 500 }}>{signals.lastOwner}</span>
          {signals.lastSaleDate && (
            <span style={{ color: '#777777' }}> · since {signals.lastSaleDate}</span>
          )}
        </div>
      )}

      {/* Document timeline */}
      {timeline.length > 0 && (
        <>
          <div style={{ fontSize: 11, color: '#777777', textTransform: 'uppercase',
            letterSpacing: '0.06em', marginBottom: 10 }}>
            Document timeline
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {visibleEvents.map(ev => (
              <div key={ev.id} style={{
                padding: '8px 10px', borderRadius: 7,
                background: '#ffffff', border: '1px solid #dddddd',
                fontSize: 12,
              }}>
                {/* Top row: dot + date + type + amount */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    flexShrink: 0, width: 8, height: 8, borderRadius: '50%',
                    background: GROUP_COLORS[ev.group] ?? '#666666',
                  }} />
                  <span style={{ color: '#555555', flexShrink: 0, minWidth: 0 }}>{ev.date}</span>
                  <span style={{ color: GROUP_COLORS[ev.group] ?? '#666666', fontWeight: 600, flexShrink: 0 }}>
                    {GROUP_LABELS[ev.group] ?? ev.docType}
                  </span>
                  {ev.amount > 0 && (
                    <span style={{ color: '#555555', marginLeft: 'auto', flexShrink: 0 }}>{fmt$(ev.amount)}</span>
                  )}
                </div>
                {/* Second row: party name */}
                {(ev.grantee ?? ev.grantor) && (
                  <div style={{ color: '#888', fontSize: 11, marginTop: 3, paddingLeft: 16,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {ev.grantee ?? ev.grantor}
                  </div>
                )}
              </div>
            ))}
          </div>

          {timeline.length > 8 && (
            <button
              onClick={() => setShowAll(v => !v)}
              style={{ marginTop: 10, fontSize: 12, color: '#60a5fa', background: 'none',
                border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {showAll ? 'Show less' : `Show all ${timeline.length} events`}
            </button>
          )}
        </>
      )}

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 16, paddingTop: 14,
        borderTop: '1px solid #dddddd' }}>
        {Object.entries(GROUP_LABELS).map(([key, label]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#777777' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: GROUP_COLORS[key] ?? '#666666', flexShrink: 0 }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Sub-components ─────────────────────────────────────────────────────────────

function StatCell({
  label, value, tooltip, danger = false, warn = false,
}: {
  label:   string
  value:   string | number
  tooltip: string
  danger?: boolean
  warn?:   boolean
}) {
  const color = danger ? '#ef4444' : warn ? '#eab308' : '#111111'
  return (
    <div title={tooltip} style={{
      padding: '10px 12px', background: '#ffffff', borderRadius: 0,
      border: `1px solid ${danger ? '#ef444440' : warn ? '#eab30840' : '#dddddd'}`,
    }}>
      <div style={{ fontSize: 16, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 10, color: '#777777', marginTop: 2, lineHeight: 1.3 }}>{label}</div>
    </div>
  )
}

// ─── Styles ─────────────────────────────────────────────────────────────────────

const styles = {
  card: {
    background: '#f5f5f5',
    border:     '1px solid #dddddd',
    borderRadius: 14,
    padding:    '20px',
    marginTop:  '24px',
  } as React.CSSProperties,

  sectionHeader: {
    fontSize:   15,
    fontWeight: 600,
    color:      '#111111',
  } as React.CSSProperties,

  alert: {
    fontSize:     12,
    lineHeight:   1.6,
    padding:      '10px 12px',
    borderRadius: 0,
    border:       '1px solid',
    marginBottom: 12,
  } as React.CSSProperties,
}
