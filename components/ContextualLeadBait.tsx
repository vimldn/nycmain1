'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ContextualLeadBaitProps {
  serviceSlug: string
  serviceName: string
  cta: string
}

type Status = 'idle' | 'open' | 'submitting' | 'success' | 'error'

export default function ContextualLeadBait({ serviceSlug, serviceName, cta }: ContextualLeadBaitProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

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
          message: `Requesting quotes for ${serviceName} — referred from guide page.`,
          serviceType: serviceName,
          serviceSlug,
          location: 'NYC',
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
      <div className="my-10 rounded-xl border border-emerald-500/25 bg-emerald-500/8 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
          <span className="font-semibold text-emerald-300 text-sm">Request received</span>
        </div>
        <p className="text-sm text-emerald-400/80 pl-11">
          We'll match you with certified {serviceName.toLowerCase()} in NYC and send quotes within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="my-10 rounded-xl border border-[#1e293b] bg-[#111827] overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400" />

      <div className="p-6">
        {status === 'idle' && (
          <>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12 19.79 19.79 0 0 1 1.56 3.47 2 2 0 0 1 3.53 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.09 6.09l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#e2e8f0] text-sm mb-1">{cta}</p>
                <p className="text-xs text-[#64748b]">Free quotes · No obligation · NYC-certified professionals only</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setStatus('open')}
                className="flex-1 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-semibold text-white"
              >
                Get free quotes
              </button>
              <Link
                href={`/services/${serviceSlug}`}
                className="flex-1 py-2.5 px-4 rounded-lg border border-[#1e293b] hover:border-[#334155] hover:bg-[#1a2235] transition-colors text-sm font-medium text-[#94a3b8] text-center"
              >
                Browse {serviceName.toLowerCase()}
              </Link>
            </div>
          </>
        )}

        {status === 'open' && (
          <>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-semibold text-[#e2e8f0] text-sm mb-0.5">{cta}</p>
                <p className="text-xs text-[#64748b]">Free · No obligation · Response within 24 hours</p>
              </div>
              <button
                onClick={() => setStatus('idle')}
                className="text-[#475569] hover:text-[#94a3b8] transition-colors ml-4 flex-shrink-0"
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
                  className="w-full rounded-lg bg-[#0d1321] border border-[#1e293b] px-3 py-2.5 text-sm text-[#e2e8f0] placeholder:text-[#475569] focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Phone number"
                  autoComplete="tel"
                  className="w-full rounded-lg bg-[#0d1321] border border-[#1e293b] px-3 py-2.5 text-sm text-[#e2e8f0] placeholder:text-[#475569] focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                autoComplete="email"
                className="w-full rounded-lg bg-[#0d1321] border border-[#1e293b] px-3 py-2.5 text-sm text-[#e2e8f0] placeholder:text-[#475569] focus:outline-none focus:border-blue-500/50 transition-colors"
              />
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 transition-colors text-sm font-semibold text-white"
              >
                {status === 'submitting' ? 'Sending…' : 'Get free quotes'}
              </button>
              <p className="text-[10px] text-[#475569] text-center">We never sell your data or spam your inbox.</p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
