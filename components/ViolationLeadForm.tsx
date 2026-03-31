'use client'

import { useState } from 'react'

// Maps violation categories to the service that can fix them
export const VIOLATION_SERVICE_MAP: Record<string, { serviceSlug: string; serviceName: string; cta: string }> = {
  'Pests':          { serviceSlug: 'pest-control',      serviceName: 'Pest Control',       cta: 'Get quotes from NYC-certified exterminators' },
  'Heat/Hot Water': { serviceSlug: 'hvac-repair',       serviceName: 'HVAC Repair',        cta: 'Get quotes from NYC heating specialists' },
  'Mold':           { serviceSlug: 'mold-remediation',  serviceName: 'Mold Remediation',   cta: 'Get quotes from NYC mold remediation specialists' },
  'Plumbing':       { serviceSlug: 'plumbers',          serviceName: 'Plumbers',           cta: 'Get quotes from NYC-licensed plumbers' },
  'Electrical':     { serviceSlug: 'electricians',      serviceName: 'Electricians',       cta: 'Get quotes from NYC-licensed electricians' },
  'Gas':            { serviceSlug: 'electricians',      serviceName: 'Electricians',       cta: 'Get quotes from NYC gas & electrical specialists' },
  'Lead Paint':     { serviceSlug: 'painters',          serviceName: 'Painters',           cta: 'Get quotes from NYC lead paint remediation pros' },
  'Structural':     { serviceSlug: 'building-inspectors', serviceName: 'Building Inspectors', cta: 'Get a certified NYC building inspection' },
  'Fire Safety':    { serviceSlug: 'building-inspectors', serviceName: 'Building Inspectors', cta: 'Get a certified fire safety inspection' },
  'Security':       { serviceSlug: 'locksmith',         serviceName: 'Locksmith',          cta: 'Get quotes from NYC-licensed locksmiths' },
}

interface ViolationLeadFormProps {
  violationCategory: string
  violationDescription: string
  buildingAddress: string
  bbl: string
  violationClass?: string
  violationSource?: string
}

type Status = 'idle' | 'open' | 'submitting' | 'success' | 'error'

export default function ViolationLeadForm({
  violationCategory,
  violationDescription,
  buildingAddress,
  bbl,
  violationClass,
  violationSource,
}: ViolationLeadFormProps) {
  const service = VIOLATION_SERVICE_MAP[violationCategory]
  if (!service) return null

  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const violationLabel = [violationSource, violationClass].filter(Boolean).join(' ')
  const autoMessage = `I have ${violationLabel ? `an open ${violationLabel} ` : 'an open '}${violationCategory} violation at ${buildingAddress}. ${violationDescription.slice(0, 120)}${violationDescription.length > 120 ? '…' : ''}`

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: autoMessage,
          serviceType: service.serviceName,
          serviceSlug: service.serviceSlug,
          location: buildingAddress,
          locationSlug: bbl,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
          // Extra context passed through for the sheet
          violationCategory,
          violationClass: violationClass || '',
          violationBBL: bbl,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  // Collapsed state — just a CTA button
  if (status === 'idle') {
    return (
      <div className="mt-3 pt-3 border-t border-[#dddddd]">
        <button
          onClick={() => setStatus('open')}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-blue-600/10 border border-blue-500/25 hover:bg-blue-600/20 hover:border-blue-500/40 transition-colors group"
        >
          <span className="text-xs font-semibold text-blue-300 group-hover:text-blue-200">{service.cta}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 flex-shrink-0 ml-2">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>
    )
  }

  // Success state
  if (status === 'success') {
    return (
      <div className="mt-3 pt-3 border-t border-[#dddddd]">
        <div className="flex items-start gap-3 px-3 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 flex-shrink-0 mt-0.5">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
          <div>
            <div className="text-xs font-semibold text-emerald-300">Request sent</div>
            <div className="text-xs text-emerald-400/70 mt-0.5">We'll match you with {service.serviceName.toLowerCase()} in NYC. Expect a response within 24 hours.</div>
          </div>
        </div>
      </div>
    )
  }

  // Expanded form
  return (
    <div className="mt-3 pt-3 border-t border-[#dddddd]">
      <div className="p-3 rounded-xl bg-[#0d1321] border border-blue-500/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs font-semibold text-blue-300">{service.cta}</div>
            <div className="text-[10px] text-[#777777] mt-0.5">Free quotes • No obligation • NYC-certified only</div>
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="text-[#777777] hover:text-[#555555] transition-colors flex-shrink-0 ml-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        {/* Pre-filled context — read only */}
        <div className="mb-3 px-2.5 py-2 rounded-lg bg-[#f5f5f5] border border-[#dddddd] text-[10px] text-[#666666] leading-relaxed">
          {autoMessage}
        </div>

        {/* Form fields */}
        <form onSubmit={submit} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                className="w-full rounded-lg bg-[#f5f5f5] border border-[#dddddd] px-2.5 py-2 text-xs text-[#111111] placeholder:text-[#777777] focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <div>
              <input
                required
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone number"
                autoComplete="tel"
                className="w-full rounded-lg bg-[#f5f5f5] border border-[#dddddd] px-2.5 py-2 text-xs text-[#111111] placeholder:text-[#777777] focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>
          <div>
            <input
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              autoComplete="email"
              className="w-full rounded-lg bg-[#f5f5f5] border border-[#dddddd] px-2.5 py-2 text-xs text-[#111111] placeholder:text-[#777777] focus:outline-none focus:border-blue-500/50"
            />
          </div>

          {error && (
            <div className="text-[10px] text-red-400 px-2">{error}</div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 transition-colors text-xs font-semibold text-white"
          >
            {status === 'submitting' ? 'Sending…' : 'Get Free Quotes'}
          </button>
        </form>
      </div>
    </div>
  )
}
