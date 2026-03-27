// One featured guide article per violation category.
// Category strings match the API's categorize() output.

export type ViolationGuide = {
  slug: string
  title: string
  excerpt: string
  image: string
}

export const VIOLATION_GUIDE_MAP: Record<string, ViolationGuide> = {
  'Pests': {
    slug: 'what-does-a-bed-bug-violation-mean-on-nyc-building-records',
    title: 'What does a bed bug violation mean on NYC building records?',
    excerpt: 'HPD enforcement, Local Law 69 rules, inspection triggers, and what it means for tenants and buyers.',
    image: 'https://files.autoblogging.ai/images/what-does-a-bed-bug-violation-mean-on-nyc-building-records(ss2h)_4.jpeg',
  },
  'Heat/Hot Water': {
    slug: 'how-to-check-heat-complaints-before-renting-in-nyc',
    title: 'How to check heat complaints before renting in NYC',
    excerpt: 'Use 311, HPD, and Open Data to spot buildings with chronic heating failures before you sign a lease.',
    image: 'https://files.autoblogging.ai/images/how-to-check-heat-complaints-before-renting-in-nyc(j5e2)_4.jpeg',
  },
  'Lead Paint': {
    slug: 'should-i-avoid-buildings-with-lead-paint-violations',
    title: 'Should I avoid buildings with lead paint violations?',
    excerpt: 'Health risks, violation details, and what landlords are legally required to do about lead paint in NYC.',
    image: 'https://files.autoblogging.ai/images/should-i-avoid-buildings-with-lead-paint-violations(lmcy)_4.jpeg',
  },
  'Mold': {
    slug: 'what-do-i-do-if-my-nyc-apartment-has-mold',
    title: 'What do I do if my NYC apartment has mold?',
    excerpt: 'Your rights, the landlord\'s obligations, and step-by-step guidance on getting mold properly remediated.',
    image: 'https://files.autoblogging.ai/images/what-does-an-open-hpd-violation-mean(b3xt)_4.jpeg',
  },
  'Fire Safety': {
    slug: 'how-to-check-fire-safety-violations-before-renting',
    title: 'How to check fire safety violations before renting',
    excerpt: 'How to probe government databases and spot hazards like faulty detectors, blocked escapes, and sprinkler defects.',
    image: 'https://files.autoblogging.ai/images/how-to-check-fire-safety-violations-before-renting(r4x1)_4.jpeg',
  },
  'Electrical': {
    slug: 'how-to-look-up-gas-and-electrical-safety-violations',
    title: 'How to look up gas and electrical safety violations',
    excerpt: 'A practical guide to finding electrical and gas violations using NYC Open Data and DOB records.',
    image: 'https://files.autoblogging.ai/images/how-to-look-up-gas-and-electrical-safety-violations(qcg3)_4.jpeg',
  },
  'Gas': {
    slug: 'how-to-look-up-gas-and-electrical-safety-violations',
    title: 'How to look up gas and electrical safety violations',
    excerpt: 'A practical guide to finding electrical and gas violations using NYC Open Data and DOB records.',
    image: 'https://files.autoblogging.ai/images/how-to-look-up-gas-and-electrical-safety-violations(qcg3)_4.jpeg',
  },
  'Elevator': {
    slug: 'how-to-look-up-elevator-violations-in-nyc',
    title: 'How to look up elevator violations in NYC',
    excerpt: 'Search DOB BIS, PropertyShark, and NYC Open Data to find elevator inspection failures by address.',
    image: 'https://files.autoblogging.ai/images/how-to-look-up-elevator-violations-in-nyc(25x5)_4.jpeg',
  },
  'Plumbing': {
    slug: 'what-are-class-a-b-and-c-violations-in-nyc',
    title: 'What are Class A, B and C violations in NYC?',
    excerpt: 'Penalties up to $2,500, real examples from HPD records, and how each class affects tenants and landlords.',
    image: 'https://files.autoblogging.ai/images/what-are-class-a-b-and-c-violations-in-nyc(wyqn)_4.jpeg',
  },
  'Security': {
    slug: 'what-are-window-guard-laws-in-nyc',
    title: 'What are window guard laws in NYC?',
    excerpt: 'NYC landlords must install window guards in units with children under 11. Here\'s what the law requires.',
    image: 'https://files.autoblogging.ai/images/what-are-window-guard-laws-in-nyc(36q2)_1.jpeg',
  },
  'Structural': {
    slug: 'should-i-worry-about-dob-emergency-declarations',
    title: 'Should I worry about DOB emergency declarations?',
    excerpt: 'What triggers a DOB emergency, what stop-work orders mean, and how to assess risk before renting.',
    image: 'https://files.autoblogging.ai/images/should-i-worry-about-dob-emergency-declarations(qyub)_4.jpeg',
  },
  'Sanitation': {
    slug: 'how-many-pest-violations-are-too-many-in-an-nyc-building',
    title: 'How many pest violations are too many in an NYC building?',
    excerpt: 'HPD Class A, B, and C pest rules explained — and at what point a building\'s record should be a dealbreaker.',
    image: 'https://files.autoblogging.ai/images/how-many-pest-violations-are-too-many-in-an-nyc-building(9k2m)_4.jpeg',
  },
  'Other': {
    slug: 'what-does-an-open-hpd-violation-mean',
    title: 'What does an open HPD violation mean?',
    excerpt: 'What open, certified, and dismissed statuses mean on HPD records — and how long violations stay on file.',
    image: 'https://files.autoblogging.ai/images/what-does-an-open-hpd-violation-mean(b3xt)_4.jpeg',
  },
}

/**
 * Returns the single featured guide for a violation category.
 * Falls back to 'Other' if not found.
 */
export function getGuideForCategory(category: string): ViolationGuide {
  return VIOLATION_GUIDE_MAP[category] ?? VIOLATION_GUIDE_MAP['Other']
}

/**
 * Given a list of violations, returns one featured guide per unique category.
 * Deduplicates so the same guide never appears twice.
 */
export function buildGuidePanel(
  violations: { category?: string }[],
): { category: string; guide: ViolationGuide }[] {
  const seenCats = new Set<string>()
  const seenSlugs = new Set<string>()
  const result: { category: string; guide: ViolationGuide }[] = []
  for (const v of violations) {
    const cat = v.category || 'Other'
    if (seenCats.has(cat)) continue
    seenCats.add(cat)
    const guide = VIOLATION_GUIDE_MAP[cat] ?? VIOLATION_GUIDE_MAP['Other']
    if (seenSlugs.has(guide.slug)) continue
    seenSlugs.add(guide.slug)
    result.push({ category: cat, guide })
  }
  return result
}

/**
 * Maps open violation categories to the tenant-facing /guides/ page
 * that is most relevant to a renter experiencing that violation.
 * Used to render an inline guide link inside each open violation card
 * on the building profile page.
 */
export const VIOLATION_GUIDE_LINK_MAP: Record<string, { slug: string; label: string }> = {
  'Pests':         { slug: 'landlord-wont-fix-roaches-bedbugs',          label: 'Landlord won\'t exterminate? Know your legal options' },
  'Heat/Hot Water':{ slug: 'no-heat-hot-water-force-landlord-fix-nyc',   label: 'No heat or hot water? Here\'s how to force a fix' },
  'Mold':          { slug: 'landlord-ignoring-mold-nyc-tenant-rights',   label: 'Landlord ignoring mold? Your rights under Local Law 55' },
  'Plumbing':      { slug: 'hire-plumber-nyc-hpd-violation',             label: 'Open plumbing violation — what this means for you' },
  'Electrical':    { slug: 'clear-hpd-electrical-violation-nyc',         label: 'Open electrical violation — your tenant rights' },
  'Lead Paint':    { slug: 'what-to-check-before-signing-nyc-lease',     label: 'Lead paint in your building — what the law requires' },
  'Structural':    { slug: 'who-pays-pipe-burst-nyc-apartment',          label: 'Structural issues — who is legally responsible' },
}

// Legacy compat — some callers still use this signature
export function getBlogLinksForCategory(category: string, max = 2) {
  const guide = VIOLATION_GUIDE_MAP[category] ?? VIOLATION_GUIDE_MAP['Other']
  return [{ slug: guide.slug, title: guide.title }].slice(0, max)
}
