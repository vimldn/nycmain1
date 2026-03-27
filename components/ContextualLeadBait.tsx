'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ContextualLeadBaitProps {
  serviceSlug: string
  serviceName: string
  cta: string
  buildingAddress?: string
  violationType?: string
}

type Status = 'idle' | 'open' | 'submitting' | 'success' | 'error'

export default function ContextualLeadBait({
  serviceSlug,
  serviceName,
  cta,
  buildingAddress = '',
  violationType = '',
}: ContextualLeadBaitProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const context = [
    violationType && `Violation type: ${violationType}`,
    buildingAddress && `Building: ${buildingAddress}`,
    `Service needed: ${serviceName}`,
  ].filter(Boolean).join('. ')

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
          message: context || `Requesting quotes for ${serviceName} in NYC.`,
          serviceType: serviceName,
          serviceSlug,
          location: buildingAddress || 'NYC',
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="my-8 flex items-start gap-4 p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <div>
          <div className="font-semibold text-emerald-300 text-sm mb-1">Request sent</div>
          <div className="text-sm text-emerald-400/70">We'll match you with certified {serviceName.toLowerCase()} in NYC and send quotes to your inbox within 24 hours.</div>
        </div>
      </div>
    )
  }

  if (status === 'idle') {
    return (
      <div className="my-8 p-5 rounded-xl border border-blue-500/25 bg-blue-500/6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-blue-300 mb-1">{cta}</div>
            <div className="text-xs text-[#475569]">Free quotes · No obligation · NYC-certified professionals only</div>
          </div>
          <button
            onClick={() => setStatus('open')}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-semibold text-white"
          >
            Get Free Quotes
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="my-8 p-5 rounded-xl border border-blue-500/25 bg-[#0d1321]">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="text-sm font-semibold text-blue-300 mb-0.5">{cta}</div>
          <div className="text-xs text-[#475569]">Free quotes · No obligation · NYC-certified professionals only</div>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="text-[#475569] hover:text-[#94a3b8] transition-colors flex-shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
      </div>

      <form onSubmit={submit} className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className="w-full rounded-lg bg-[#111827] border border-[#1e293b] px-3 py-2.5 text-sm text-[#e2e8f0] placeholder:text-[#475569] focus:outline-none focus:border-blue-500/50"
          />
          <input
            required
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Phone number"
            autoComplete="tel"
            className="w-full rounded-lg bg-[#111827] border border-[#1e293b] px-3 py-2.5 text-sm text-[#e2e8f0] placeholder:text-[#475569] focus:outline-none focus:border-blue-500/50"
          />
        </div>
        <input
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email address"
          autoComplete="email"
          className="w-full rounded-lg bg-[#111827] border border-[#1e293b] px-3 py-2.5 text-sm text-[#e2e8f0] placeholder:text-[#475569] focus:outline-none focus:border-blue-500/50"
        />
        {error && <div className="text-xs text-red-400">{error}</div>}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 transition-colors text-sm font-semibold text-white"
        >
          {status === 'submitting' ? 'Sending…' : 'Get Free Quotes'}
        </button>
        <p className="text-[10px] text-[#475569] text-center">100% free · No spam · Response within 24 hours</p>
      </form>

      <div className="mt-4 pt-4 border-t border-[#1e293b]">
        <Link
          href={`/services/${serviceSlug}`}
          className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors"
        >
          Browse all {serviceName} in NYC →
        </Link>
      </div>
    </div>
  )
}
