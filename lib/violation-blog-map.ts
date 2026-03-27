// Maps HPD/DOB violation categories to the most relevant blog posts.
// Category strings must match what the API's categorize() function returns:
// 'Heat/Hot Water' | 'Pests' | 'Lead Paint' | 'Mold' | 'Fire Safety' |
// 'Electrical' | 'Plumbing' | 'Security' | 'Elevator' | 'Gas' |
// 'Structural' | 'Sanitation' | 'Other'

export type ViolationBlogLink = {
  slug: string
  title: string
}

export const VIOLATION_BLOG_MAP: Record<string, ViolationBlogLink[]> = {
  'Pests': [
    { slug: 'what-does-a-bed-bug-violation-mean-on-nyc-building-records', title: 'What Does a Bed Bug Violation Mean on NYC Building Records?' },
    { slug: 'is-my-landlord-required-to-pay-for-bed-bug-treatment-in-nyc', title: 'Is My Landlord Required to Pay for Bed Bug Treatment in NYC?' },
    { slug: 'how-to-check-for-mouse-and-rat-complaints-in-nyc-buildings', title: 'How to Check for Mouse & Rat Complaints in NYC Buildings' },
    { slug: 'what-do-dohmh-pest-inspection-results-mean', title: 'What Do DOHMH Pest Inspection Results Mean?' },
  ],
  'Heat/Hot Water': [
    { slug: 'how-to-check-heat-complaints-before-renting-in-nyc', title: 'How to Check Heat Complaints Before Renting in NYC' },
    { slug: 'what-temperature-must-nyc-landlords-maintain', title: 'What Temperature Must NYC Landlords Maintain?' },
    { slug: 'how-long-can-an-nyc-apartment-go-without-heat-legally', title: 'How Long Can an NYC Apartment Go Without Heat Legally?' },
    { slug: 'how-to-file-a-311-heat-complaint-in-nyc', title: 'How to File a 311 Heat Complaint in NYC' },
  ],
  'Lead Paint': [
    { slug: 'should-i-avoid-buildings-with-lead-paint-violations', title: 'Should I Avoid Buildings With Lead Paint Violations?' },
  ],
  'Mold': [
    { slug: 'what-do-i-do-if-my-nyc-apartment-has-mold', title: 'What Do I Do If My NYC Apartment Has Mold?' },
  ],
  'Fire Safety': [
    { slug: 'how-to-check-fire-safety-violations-before-renting', title: 'How to Check Fire Safety Violations Before Renting' },
    { slug: 'how-to-check-if-smoke-detectors-are-code-compliant', title: 'How to Check If Smoke Detectors Are Code Compliant' },
    { slug: 'what-are-sprinkler-system-violations', title: 'What Are Sprinkler System Violations?' },
    { slug: 'how-to-find-buildings-with-working-fire-escapes', title: 'How to Find Buildings With Working Fire Escapes' },
  ],
  'Electrical': [
    { slug: 'how-to-look-up-gas-and-electrical-safety-violations', title: 'How to Look Up Gas & Electrical Safety Violations' },
  ],
  'Gas': [
    { slug: 'how-to-look-up-gas-and-electrical-safety-violations', title: 'How to Look Up Gas & Electrical Safety Violations' },
  ],
  'Elevator': [
    { slug: 'how-to-look-up-elevator-violations-in-nyc', title: 'How to Look Up Elevator Violations in NYC' },
    { slug: 'how-many-elevators-should-a-nyc-high-rise-have', title: 'How Many Elevators Should a NYC High-Rise Have?' },
  ],
  'Other': [
    { slug: 'what-are-class-a-b-and-c-violations-in-nyc', title: 'What Are Class A, B and C Violations in NYC?' },
    { slug: 'what-does-an-open-hpd-violation-mean', title: 'What Does an Open HPD Violation Mean?' },
  ],
  'Plumbing': [
    { slug: 'what-are-class-a-b-and-c-violations-in-nyc', title: 'What Are Class A, B and C Violations in NYC?' },
    { slug: 'what-does-an-open-hpd-violation-mean', title: 'What Does an Open HPD Violation Mean?' },
  ],
  'Structural': [
    { slug: 'what-are-immediately-hazardous-violations-in-nyc', title: 'What Are Immediately Hazardous Violations in NYC?' },
    { slug: 'what-does-an-open-hpd-violation-mean', title: 'What Does an Open HPD Violation Mean?' },
  ],
  'Security': [
    { slug: 'what-does-an-open-hpd-violation-mean', title: 'What Does an Open HPD Violation Mean?' },
  ],
  'Sanitation': [
    { slug: 'how-many-pest-violations-are-too-many-in-an-nyc-building', title: 'How Many Pest Violations Are Too Many in an NYC Building?' },
  ],
}

/**
 * Given a violation category string, return up to `max` relevant blog links.
 * Falls back to general HPD posts when no category-specific links exist.
 */
export function getBlogLinksForCategory(
  category: string,
  max = 2,
): ViolationBlogLink[] {
  const links = VIOLATION_BLOG_MAP[category] ?? VIOLATION_BLOG_MAP['Other']
  return links.slice(0, max)
}
