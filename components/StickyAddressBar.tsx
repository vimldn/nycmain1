'use client'

import { useState, useEffect } from 'react'

const DISMISS_KEY = 'bhx-sticky-dismissed'

export default function StickyAddressBar() {
  const [dismissed, setDismissed] = useState(true) // start hidden to avoid flash
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const wasDismissed = sessionStorage.getItem(DISMISS_KEY)
    if (!wasDismissed) setDismissed(false)
  }, [])

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, '1')
    setDismissed(true)
  }

  if (!mounted || dismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 bg-[#0f172a] border border-blue-500/30 rounded-xl px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur-sm">
          {/* Pulse dot */}
          <div className="flex-shrink-0 relative">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block" />
            <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping opacity-75" />
          </div>

          {/* Text */}
          <p className="text-xs sm:text-sm text-[#94a3b8] flex-1 min-w-0 leading-snug">
            <span className="text-[#e2e8f0] font-semibold">Does your landlord have hidden violations?</span>
            {' '}Check your building's health score — free.
          </p>

          {/* CTA */}
          <a
            href="/"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-xs font-semibold text-white whitespace-nowrap"
          >
            Search address
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>

          {/* Dismiss */}
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="flex-shrink-0 text-[#334155] hover:text-[#64748b] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
