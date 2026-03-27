'use client'

import { useState } from 'react'

export default function GuidesEmailCapture() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: 'N/A',
          message: 'Requested: NYC Renter\'s Red Flag Checklist (guides page email capture)',
          serviceType: 'Email List — Red Flag Checklist',
          serviceSlug: 'email-list',
          location: 'NYC',
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-start gap-3 p-5 rounded-xl bg-emerald-500/8 border border-emerald-500/25">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-300 mb-0.5">You're in.</p>
          <p className="text-xs text-emerald-400/80">Check your inbox — the Red Flag Checklist is on its way.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[#1e293b] bg-[#0d1321] overflow-hidden">
      {/* Top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500" />

      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4 mb-5">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
              <rect x="9" y="3" width="6" height="4" rx="1"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">Free download</p>
            <h3 className="text-base font-black text-[#e2e8f0] leading-snug">
              NYC Renter's Red Flag Checklist
            </h3>
            <p className="text-sm text-[#64748b] mt-1">
              The 5 things you must check in any NYC apartment before you hand over a deposit.
            </p>
          </div>
        </div>

        {/* Checklist preview */}
        <ul className="space-y-2 mb-6">
          {[
            'How to pull HPD violations in under 2 minutes',
            'The one 311 complaint pattern that reveals a bad landlord',
            'What Local Law 69 requires landlords to tell you (most don\'t)',
            'The boiler room test no one tells you about',
            'How to check if your apartment is actually rent-stabilised',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-[#94a3b8]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/60 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2.5">
          <input
            required
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="First name"
            className="flex-shrink-0 sm:w-32 rounded-lg bg-[#111827] border border-[#1e293b] px-3 py-2.5 text-sm text-[#e2e8f0] placeholder:text-[#475569] focus:outline-none focus:border-blue-500/50 transition-colors"
          />
          <input
            required
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 rounded-lg bg-[#111827] border border-[#1e293b] px-3 py-2.5 text-sm text-[#e2e8f0] placeholder:text-[#475569] focus:outline-none focus:border-blue-500/50 transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="flex-shrink-0 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 transition-colors text-sm font-semibold text-white whitespace-nowrap"
          >
            {status === 'submitting' ? 'Sending…' : 'Send me the list →'}
          </button>
        </form>
        {status === 'error' && (
          <p className="text-xs text-red-400 mt-2">Something went wrong. Please try again.</p>
        )}
        <p className="text-[10px] text-[#334155] mt-3">No spam. Unsubscribe any time.</p>
      </div>
    </div>
  )
}
