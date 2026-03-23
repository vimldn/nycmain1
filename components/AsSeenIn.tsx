'use client'

const outlets = [
  { name: 'Boston Herald', domain: 'bostonherald.com' },
  { name: 'Star Tribune', domain: 'startribune.com' },
  { name: 'IBTimes', domain: 'ibtimes.com' },
  { name: 'Buffalo News', domain: 'buffnews.com' },
  { name: 'Post-Gazette', domain: 'postgazette.com' },
  { name: 'OpenPR', domain: 'openpr.com' },
  { name: 'WRAL', domain: 'wral.com' },
  { name: 'KUTV', domain: 'kutv.com' },
]

export default function AsSeenIn() {
  return (
    <section className="py-8 sm:py-10 border-y border-[var(--border-primary)] bg-[var(--bg-secondary)]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs sm:text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-5 sm:mb-6">
          As Featured In 500+ News Outlets
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10 sm:gap-y-4">
          {outlets.map((outlet) => (
            <span
              key={outlet.domain}
              className="text-sm sm:text-base md:text-lg font-bold text-[var(--text-muted)]/60 hover:text-[var(--text-secondary)] transition-colors select-none"
            >
              {outlet.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
