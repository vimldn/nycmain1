type Faq = { q: string; a: string }

type Props = {
  faqs: Faq[]
}

export function FaqJsonLd({ faqs }: Props) {
  if (!faqs.length) return null

  // Deduplicate by question text to prevent duplicate FAQPage entity errors
  const seen = new Set<string>()
  const unique = faqs.filter(({ q }) => {
    const key = q.trim().toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  if (!unique.length) return null

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: unique.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
