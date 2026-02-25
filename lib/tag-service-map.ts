import { locations } from './locations-data'

// Maps blog post tags to relevant service slugs
export const TAG_SERVICE_MAP: Record<string, string[]> = {
  'Moving': [
    'moving-companies',
    'packing-services',
    'storage-facilities',
    'junk-removal',
    'cleaning-services',
  ],
  'Building Issues': [
    'pest-control',
    'mold-remediation',
    'plumbers',
    'electricians',
    'hvac-repair',
    'building-inspectors',
  ],
  'Building Violations': [
    'pest-control',
    'mold-remediation',
    'plumbers',
    'electricians',
    'hvac-repair',
    'building-inspectors',
  ],
  'Safety & Security': [
    'building-inspectors',
    'locksmith',
    'electricians',
  ],
  'Tenant Rights': [
    'real-estate-agents',
    'renters-insurance',
    'building-inspectors',
  ],
  'Rent & Leases': [
    'real-estate-agents',
    'renters-insurance',
  ],
  'NYC Housing': [
    'real-estate-agents',
    'renters-insurance',
    'building-inspectors',
  ],
  'Neighbourhoods': [
    'moving-companies',
    'cleaning-services',
    'pest-control',
    'real-estate-agents',
  ],
}

// Friendly display names for services
export const SERVICE_NAMES: Record<string, string> = {
  'moving-companies': 'Moving Companies',
  'packing-services': 'Packing Services',
  'storage-facilities': 'Storage Facilities',
  'junk-removal': 'Junk Removal',
  'cleaning-services': 'Cleaning Services',
  'real-estate-agents': 'Real Estate Agents',
  'building-inspectors': 'Building Inspectors',
  'renters-insurance': 'Renters Insurance',
  'internet-providers': 'Internet Providers',
  'locksmith': 'Locksmith Services',
  'furniture-assembly': 'Furniture Assembly',
  'painters': 'Painters',
  'pest-control': 'Pest Control',
  'hvac-repair': 'HVAC Repair',
  'plumbers': 'Plumbers',
  'electricians': 'Electricians',
  'mold-remediation': 'Mold Remediation',
}

/**
 * Given a list of tags, return up to `limit` unique relevant service slugs
 */
export function getServicesForTags(tags: string[], limit = 4): string[] {
  const seen = new Set<string>()
  const result: string[] = []

  for (const tag of tags) {
    const mapped = TAG_SERVICE_MAP[tag] || []
    for (const slug of mapped) {
      if (!seen.has(slug)) {
        seen.add(slug)
        result.push(slug)
      }
      if (result.length >= limit) return result
    }
  }

  // Fallback — always show at least these if no tags matched
  if (result.length === 0) {
    return ['moving-companies', 'pest-control', 'building-inspectors', 'renters-insurance']
  }

  return result
}

/**
 * Detect a location slug from a blog post slug or title.
 * Returns the matched location slug or null.
 */
export function detectLocationFromPost(postSlug: string, postTitle?: string): string | null {
  const locationSlugs = Object.keys(locations)
  const text = `${postSlug} ${postTitle || ''}`.toLowerCase()

  // Direct slug match (e.g. post slug contains "williamsburg")
  for (const locSlug of locationSlugs) {
    if (text.includes(locSlug.toLowerCase())) return locSlug
  }

  // Match on location name (e.g. "Brooklyn" in title)
  for (const [locSlug, locData] of Object.entries(locations)) {
    if (text.includes(locData.name.toLowerCase())) return locSlug
  }

  return null
}

/**
 * Get nearby locations in the same borough (for location-specific posts)
 */
export function getNearbyLocations(locationSlug: string, limit = 4): { slug: string; name: string }[] {
  const location = locations[locationSlug]
  if (!location) return []

  return Object.entries(locations)
    .filter(([slug, loc]) => loc.borough === location.borough && slug !== locationSlug)
    .slice(0, limit)
    .map(([slug, loc]) => ({ slug, name: loc.name }))
}
