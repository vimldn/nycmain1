/**
 * Maps blog posts to the most relevant BHX service based on
 * keywords found in the post title, slug, tags, and excerpt.
 */

export type ServiceMatch = {
  slug: string
  label: string
  description: string
}

const SERVICE_KEYWORDS: Record<string, string[]> = {
  'moving-companies': [
    'moving', 'move', 'movers', 'relocation', 'move-out', 'move-in',
    'moving day', 'relocate', 'moving truck', 'moving company',
  ],
  'packing-services': [
    'packing', 'packing boxes', 'unpack', 'wrapping', 'boxes', 'pack up',
  ],
  'storage-facilities': [
    'storage', 'storage unit', 'self-storage', 'liquidation', 'storage rent',
    'storage fee', 'unit auction', 'stored items',
  ],
  'junk-removal': [
    'junk', 'hauling', 'cleanout', 'clean out', 'debris', 'clutter',
    'trash', 'dump', 'dumping', 'bulk', 'hoarder', 'hoarding', 'estate cleanout',
    'warehouse cleanout', 'eviction cleanout', 'junk removal', 'rubbish',
    'fly dumping', 'illegal dumping', 'freon', 'appliance', 'mattress',
    'furniture disposal', 'e-waste', 'renovation waste', 'construction debris',
  ],
  'cleaning-services': [
    'cleaning', 'clean', 'sanitiz', 'deep clean', 'disinfect',
    'bed bug', 'infestation cleanup', 'biohazard', 'odor', 'after flood',
  ],
  'building-inspectors': [
    'inspection', 'inspector', 'compliance', 'violation', 'certificate',
    'building code', 'permit', 'bhx score', 'building health',
  ],
  'renters-insurance': [
    'insurance', 'liability', 'renter insurance', 'coverage', 'policy',
    'claim', 'insured', 'bonded',
  ],
  'internet-providers': [
    'internet', 'wifi', 'broadband', 'provider', 'connectivity', 'isp',
  ],
  locksmith: [
    'lock', 'locksmith', 'key', 'lockout', 'door lock', 'deadbolt',
  ],
  'furniture-assembly': [
    'furniture assembly', 'assemble', 'ikea', 'flatpack', 'flat pack',
  ],
  painters: [
    'paint', 'painting', 'painter', 'wall paint', 'repaint', 'color',
    'paint touch', 'drywall',
  ],
  'pest-control': [
    'pest', 'rodent', 'rat', 'bug', 'bed bug', 'cockroach', 'infestation',
    'vermin', 'mice', 'exterminator', 'litter basket', 'trash bin',
    'overflowing bin', 'rat mitigation',
  ],
  'hvac-repair': [
    'hvac', 'heating', 'cooling', 'thermostat', 'furnace', 'air conditioning',
    'mercury rule', 'freon', 'refrigerant',
  ],
  plumbers: [
    'plumb', 'pipe', 'leak', 'flood', 'water damage', 'sewer', 'drain',
    'basement flooding', 'burst pipe', 'sewage',
  ],
  electricians: [
    'electric', 'wiring', 'outlet', 'circuit', 'power', 'electrical',
  ],
  'mold-remediation': [
    'mold', 'mould', 'water damage', 'moisture', 'remediation',
    'flooding', 'dampness', 'basement flood',
  ],
}

const SERVICE_META: Record<string, { label: string; description: string }> = {
  'moving-companies':   { label: 'Moving Companies',     description: 'Get quotes from trusted NYC movers.' },
  'packing-services':   { label: 'Packing Services',     description: 'Professional packing for a stress-free move.' },
  'storage-facilities': { label: 'Storage Facilities',   description: 'Find secure storage near you.' },
  'junk-removal':       { label: 'Junk Removal',         description: 'Fast, licensed junk removal across NYC.' },
  'cleaning-services':  { label: 'Cleaning Services',    description: 'Deep cleaning and post-move sanitization.' },
  'building-inspectors':{ label: 'Building Inspectors',  description: 'Know what you\'re renting before you sign.' },
  'renters-insurance':  { label: 'Renters Insurance',    description: 'Protect your belongings from day one.' },
  'internet-providers': { label: 'Internet Providers',   description: 'Compare NYC internet plans instantly.' },
  locksmith:            { label: 'Locksmiths',           description: '24/7 locksmith service across NYC.' },
  'furniture-assembly': { label: 'Furniture Assembly',   description: 'We assemble it so you don\'t have to.' },
  painters:             { label: 'Painters',             description: 'Fresh paint, fair prices, NYC-wide.' },
  'pest-control':       { label: 'Pest Control',         description: 'Licensed exterminators for NYC buildings.' },
  'hvac-repair':        { label: 'HVAC Repair',          description: 'Heating and cooling repairs, same day.' },
  plumbers:             { label: 'Plumbers',             description: 'Emergency plumbing across all 5 boroughs.' },
  electricians:         { label: 'Electricians',         description: 'Licensed NYC electricians on demand.' },
  'mold-remediation':   { label: 'Mold Remediation',    description: 'Certified mold removal for NYC homes.' },
}

export function getRelevantService(
  title: string,
  slug: string,
  tags: string[],
  excerpt: string
): ServiceMatch | null {
  const haystack = [title, slug, ...tags, excerpt].join(' ').toLowerCase()

  let bestSlug = ''
  let bestScore = 0

  for (const [serviceSlug, keywords] of Object.entries(SERVICE_KEYWORDS)) {
    let score = 0
    for (const kw of keywords) {
      if (haystack.includes(kw.toLowerCase())) {
        // longer / more specific keywords score higher
        score += kw.split(' ').length
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestSlug = serviceSlug
    }
  }

  // Only return a match if we have at least some confidence
  if (bestScore < 2) return null

  const meta = SERVICE_META[bestSlug]
  if (!meta) return null

  return { slug: bestSlug, ...meta }
}
