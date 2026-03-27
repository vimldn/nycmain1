// Maps HPD/DOB violation categories to the most relevant blog posts.
// Category strings match what the API's categorize() function returns:
// 'Heat/Hot Water' | 'Pests' | 'Lead Paint' | 'Mold' | 'Fire Safety' |
// 'Electrical' | 'Plumbing' | 'Security' | 'Elevator' | 'Gas' |
// 'Structural' | 'Sanitation' | 'Other'

export type ViolationBlogLink = {
  slug: string
  title: string
}

export type ViolationGuideCategory = {
  icon: string
  links: ViolationBlogLink[]
}

export const VIOLATION_BLOG_MAP: Record<string, ViolationGuideCategory> = {
  'Pests': {
    icon: '🐛',
    links: [
      { slug: 'what-does-a-bed-bug-violation-mean-on-nyc-building-records', title: 'What does a bed bug violation mean on NYC building records?' },
      { slug: 'is-my-landlord-required-to-pay-for-bed-bug-treatment-in-nyc', title: 'Is my landlord required to pay for bed bug treatment?' },
      { slug: 'how-to-check-for-mouse-and-rat-complaints-in-nyc-buildings', title: 'How to check for mouse & rat complaints in NYC buildings' },
      { slug: 'what-do-dohmh-pest-inspection-results-mean', title: 'What do DOHMH pest inspection results mean?' },
    ],
  },
  'Heat/Hot Water': {
    icon: '🔥',
    links: [
      { slug: 'how-to-check-heat-complaints-before-renting-in-nyc', title: 'How to check heat complaints before renting in NYC' },
      { slug: 'what-temperature-must-nyc-landlords-maintain', title: 'What temperature must NYC landlords maintain?' },
      { slug: 'how-long-can-an-nyc-apartment-go-without-heat-legally', title: 'How long can an NYC apartment go without heat legally?' },
      { slug: 'how-to-file-a-311-heat-complaint-in-nyc', title: 'How to file a 311 heat complaint in NYC' },
    ],
  },
  'Lead Paint': {
    icon: '🎨',
    links: [
      { slug: 'should-i-avoid-buildings-with-lead-paint-violations', title: 'Should I avoid buildings with lead paint violations?' },
      { slug: 'what-are-class-a-b-and-c-violations-in-nyc', title: 'What are Class A, B and C violations in NYC?' },
    ],
  },
  'Mold': {
    icon: '💧',
    links: [
      { slug: 'what-do-i-do-if-my-nyc-apartment-has-mold', title: 'What do I do if my NYC apartment has mold?' },
      { slug: 'what-are-immediately-hazardous-violations-in-nyc', title: 'What are immediately hazardous violations in NYC?' },
    ],
  },
  'Fire Safety': {
    icon: '🚒',
    links: [
      { slug: 'how-to-check-fire-safety-violations-before-renting', title: 'How to check fire safety violations before renting' },
      { slug: 'how-to-check-if-smoke-detectors-are-code-compliant', title: 'How to check if smoke detectors are code compliant' },
      { slug: 'what-are-sprinkler-system-violations', title: 'What are sprinkler system violations?' },
      { slug: 'how-to-find-buildings-with-working-fire-escapes', title: 'How to find buildings with working fire escapes' },
    ],
  },
  'Electrical': {
    icon: '⚡',
    links: [
      { slug: 'how-to-look-up-gas-and-electrical-safety-violations', title: 'How to look up gas & electrical safety violations' },
      { slug: 'what-are-immediately-hazardous-violations-in-nyc', title: 'What are immediately hazardous violations in NYC?' },
    ],
  },
  'Gas': {
    icon: '🔆',
    links: [
      { slug: 'how-to-look-up-gas-and-electrical-safety-violations', title: 'How to look up gas & electrical safety violations' },
      { slug: 'what-are-immediately-hazardous-violations-in-nyc', title: 'What are immediately hazardous violations in NYC?' },
    ],
  },
  'Elevator': {
    icon: '🛗',
    links: [
      { slug: 'how-to-look-up-elevator-violations-in-nyc', title: 'How to look up elevator violations in NYC' },
      { slug: 'how-many-elevators-should-a-nyc-high-rise-have', title: 'How many elevators should a NYC high-rise have?' },
      { slug: 'what-are-immediately-hazardous-violations-in-nyc', title: 'What are immediately hazardous violations in NYC?' },
    ],
  },
  'Plumbing': {
    icon: '🔧',
    links: [
      { slug: 'what-are-class-a-b-and-c-violations-in-nyc', title: 'What are Class A, B and C violations in NYC?' },
      { slug: 'how-long-do-landlords-have-to-fix-hpd-violations', title: 'How long do landlords have to fix HPD violations?' },
      { slug: 'how-to-check-if-hpd-violations-were-actually-fixed', title: 'How to check if HPD violations were actually fixed' },
      { slug: 'can-i-rent-an-apartment-with-active-hpd-violations', title: 'Can I rent an apartment with active HPD violations?' },
    ],
  },
  'Security': {
    icon: '🔒',
    links: [
      { slug: 'what-are-window-guard-laws-in-nyc', title: 'What are window guard laws in NYC?' },
      { slug: 'does-my-nyc-building-need-to-have-a-doorman', title: 'Does my NYC building need to have a doorman?' },
      { slug: 'what-are-class-a-b-and-c-violations-in-nyc', title: 'What are Class A, B and C violations in NYC?' },
      { slug: 'how-long-do-landlords-have-to-fix-hpd-violations', title: 'How long do landlords have to fix HPD violations?' },
    ],
  },
  'Structural': {
    icon: '🏚️',
    links: [
      { slug: 'what-are-immediately-hazardous-violations-in-nyc', title: 'What are immediately hazardous violations in NYC?' },
      { slug: 'should-i-worry-about-dob-emergency-declarations', title: 'Should I worry about DOB emergency declarations?' },
      { slug: 'what-does-it-mean-if-my-building-has-open-dob-violations', title: 'What does it mean if my building has open DOB violations?' },
      { slug: 'what-are-ecb-violations-and-should-i-care', title: 'What are ECB violations and should I care?' },
    ],
  },
  'Sanitation': {
    icon: '🗑️',
    links: [
      { slug: 'how-many-pest-violations-are-too-many-in-an-nyc-building', title: 'How many pest violations are too many in an NYC building?' },
      { slug: 'what-are-class-a-b-and-c-violations-in-nyc', title: 'What are Class A, B and C violations in NYC?' },
    ],
  },
  'Other': {
    icon: '📋',
    links: [
      { slug: 'what-are-class-a-b-and-c-violations-in-nyc', title: 'What are Class A, B and C violations in NYC?' },
      { slug: 'what-does-an-open-hpd-violation-mean', title: 'What does an open HPD violation mean?' },
      { slug: 'how-to-check-if-hpd-violations-were-actually-fixed', title: 'How to check if HPD violations were actually fixed' },
      { slug: 'can-i-rent-an-apartment-with-active-hpd-violations', title: 'Can I rent an apartment with active HPD violations?' },
    ],
  },
}

/**
 * Return up to `max` blog links for a violation category.
 * Falls back to 'Other' if not found.
 */
export function getBlogLinksForCategory(
  category: string,
  max = 2,
): ViolationBlogLink[] {
  const entry = VIOLATION_BLOG_MAP[category] ?? VIOLATION_BLOG_MAP['Other']
  return entry.links.slice(0, max)
}

/**
 * Returns full guide entry (icon + all links) for a category.
 */
export function getGuideForCategory(category: string): ViolationGuideCategory {
  return VIOLATION_BLOG_MAP[category] ?? VIOLATION_BLOG_MAP['Other']
}

/**
 * Given a list of violation objects, returns unique categories found,
 * each with their icon and full link list — ready to render as a guide panel.
 */
export function buildGuidePanel(
  violations: { category?: string }[],
): { category: string; icon: string; links: ViolationBlogLink[] }[] {
  const seen = new Set<string>()
  const result: { category: string; icon: string; links: ViolationBlogLink[] }[] = []
  for (const v of violations) {
    const cat = v.category || 'Other'
    if (seen.has(cat)) continue
    seen.add(cat)
    const entry = VIOLATION_BLOG_MAP[cat] ?? VIOLATION_BLOG_MAP['Other']
    result.push({ category: cat, icon: entry.icon, links: entry.links })
  }
  return result
}
