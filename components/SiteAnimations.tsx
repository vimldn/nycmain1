'use client'

import { useEffect } from 'react'

/*
  BHX Animation Engine — Progressive Enhancement
  ──────────────────────────────────────────────────
  Elements are VISIBLE by default.
  JS adds 'bhx-anim-ready' to <html>, which hides [data-animate] elements.
  IntersectionObserver then adds 'is-visible' to trigger each animation.

  This means: if JS is slow / fails / element already in view = always visible.
  No invisible headings, no flicker on refresh.
*/

export default function SiteAnimations() {
  useEffect(() => {
    // Step 1: mark document ready so CSS can opt-in to hiding
    document.documentElement.classList.add('bhx-anim-ready')

    const els = document.querySelectorAll('[data-animate]')
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.delay || '0'
            el.style.animationDelay = `${delay}ms`
            el.classList.add('is-visible')
            io.unobserve(el)
          }
        })
      },
      // rootMargin pushes the trigger point UP so elements in/near
      // the viewport fire immediately on load
      { threshold: 0.01, rootMargin: '0px 0px -20px 0px' }
    )

    // Step 2: immediately reveal anything already in the viewport
    els.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // In viewport — reveal with a tiny stagger so it still feels alive
        const el2 = el as HTMLElement
        const delay = parseInt(el2.dataset.delay || '0') 
        setTimeout(() => el2.classList.add('is-visible'), delay)
      } else {
        io.observe(el)
      }
    })

    return () => io.disconnect()
  }, [])

  return null
}
