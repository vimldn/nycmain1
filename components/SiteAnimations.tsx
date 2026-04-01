'use client'

import { useEffect } from 'react'

/*
  BHX Site-wide Animation Engine
  ─────────────────────────────────
  Watches all [data-animate] elements via IntersectionObserver.
  Adds class "is-visible" when element enters viewport.
  CSS in globals.css does the actual animation.
*/

export default function SiteAnimations() {
  useEffect(() => {
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
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
