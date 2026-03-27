// All guide content lives here.
// Each guide maps to a service slug for the lead form injection.

export type GuideCategory = {
  slug: string
  title: string
  description: string
  icon: string // SVG path string
  color: string // tailwind color key
}

export type GuidePost = {
  slug: string
  category: string // matches GuideCategory.slug
  title: string
  metaTitle: string
  metaDescription: string
  headline: string
  subheadline: string
  serviceSlug: string
  serviceName: string
  leadBaitCta: string
  content: GuideSection[]
  relatedSlugs: string[]
  relatedServicePages: { label: string; href: string }[]
}

export type GuideSection = {
  type: 'intro' | 'step' | 'warning' | 'tip' | 'leadbait' | 'list' | 'heading'
  heading?: string
  body?: string
  items?: string[]
  stepNumber?: number
}

export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    slug: 'violations-repairs',
    title: 'Violations & Repairs',
    description: 'Clear city mandates fast and avoid compounding fines.',
    icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
    color: 'blue',
  },
  {
    slug: 'pests-infestations',
    title: 'Pests & Infestations',
    description: 'Protect your health and your lease from NYC\'s most common invaders.',
    icon: 'M8 2v4M16 2v4M21 12H3M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zM6 8l-3-3M18 8l3-3M6 16l-3 3M18 16l3 3',
    color: 'orange',
  },
  {
    slug: 'heat-utilities',
    title: 'Heat & Utilities',
    description: 'Stay compliant and comfortable during the NYC heating season.',
    icon: 'M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z',
    color: 'red',
  },
  {
    slug: 'inspections-leasing',
    title: 'Inspections & Leasing',
    description: 'Don\'t sign a lease or buy a building blind. Know the hidden risks.',
    icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4',
    color: 'emerald',
  },
  {
    slug: 'plumbing-electrical',
    title: 'Plumbing & Electrical',
    description: 'Navigate NYC code requirements for the systems that matter most.',
    icon: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
    color: 'yellow',
  },
]

export const GUIDES: GuidePost[] = [
  // ─── MOLD ────────────────────────────────────────────────────────────────
  {
    slug: 'clear-hpd-mold-violation-nyc',
    category: 'violations-repairs',
    title: 'How to Clear an HPD Mold Violation in NYC (Local Law 55)',
    metaTitle: 'How to Clear an HPD Mold Violation in NYC | Building Health X',
    metaDescription: 'Step-by-step guide to clearing an HPD mold violation under Local Law 55. Learn the exact legal process, required contractors, and how to file certification.',
    headline: 'How to Clear an HPD Mold Violation in NYC',
    subheadline: 'A step-by-step legal guide for landlords and property managers under Local Law 55.',
    serviceSlug: 'mold-remediation',
    serviceName: 'Mold Remediation',
    leadBaitCta: 'Running out of time? Get a fast, free quote from a certified NYC mold remediator.',
    relatedSlugs: ['hire-plumber-nyc-hpd-violation', 'what-is-bhx-score', 'clear-hpd-pest-violation-nyc'],
    relatedServicePages: [
      { label: 'Mold Remediation in Brooklyn', href: '/services/mold-remediation/brooklyn' },
      { label: 'Mold Remediation in Manhattan', href: '/services/mold-remediation/manhattan' },
      { label: 'Mold Remediation in the Bronx', href: '/services/mold-remediation/bronx' },
    ],
    content: [
      {
        type: 'intro',
        body: 'If you have received a Notice of Violation (NOV) from the NYC Department of Housing Preservation and Development (HPD) for mold, the clock is already ticking. Under Local Law 55, landlords are required to keep tenants\' homes free of mold and pests. Ignoring this violation can lead to compounding fines, litigation, and a severe drop in your building\'s BHX Score. Here is the exact step-by-step process to legally remediate the issue and certify the correction with HPD.',
      },
      {
        type: 'step',
        stepNumber: 1,
        heading: 'Identify the violation class',
        body: 'HPD categorises mold violations based on severity. Check your Notice of Violation carefully:',
        items: [
          'Class B (Hazardous): Evidence of mold in a living area. Must be corrected within 30 days.',
          'Class C (Immediately Hazardous): Extensive mold coverage posing an immediate health risk. Must be corrected within 21 days.',
        ],
      },
      {
        type: 'tip',
        body: 'Check your building\'s public profile on BuildingHealthX to see if this violation has already negatively impacted your overall BHX Score and Maintenance category.',
      },
      {
        type: 'leadbait',
      },
      {
        type: 'step',
        stepNumber: 2,
        heading: 'Hire the right professionals — and avoid this costly mistake',
        body: 'Under NYS Labor Law Section 930, you cannot use the same company to both assess the mold and remove it. This is treated as a conflict of interest and will invalidate your certification. You must hire two separate licensed professionals:',
        items: [
          'Mold Assessor: Inspects the area, identifies the source, and writes a formal remediation plan.',
          'Mold Remediator: Follows the assessor\'s plan to safely remove the mold using approved methods.',
          'Warning: Having your maintenance staff paint over the mold will result in a failed reinspection, additional fines, and a Class C upgrade.',
        ],
      },
      {
        type: 'step',
        stepNumber: 3,
        heading: 'Fix the underlying source of moisture',
        body: 'HPD will not dismiss the violation if you remove the mold but leave the root cause. You must document that the water intrusion source has been repaired — whether that is a leaking pipe, a roof failure, or inadequate ventilation. Your plumber or contractor must provide a signed work order confirming the repair.',
      },
      {
        type: 'step',
        stepNumber: 4,
        heading: 'File the Certification of Correction with HPD',
        body: 'Once the remediation and underlying repair are complete, you must certify the correction through HPD\'s eCertification portal. Required documents:',
        items: [
          'The mold assessor\'s New York State license number',
          'The mold remediator\'s New York State license number',
          'A signed affidavit confirming the underlying moisture source was repaired',
          'Post-remediation assessment report from the assessor confirming mold is cleared',
        ],
      },
      {
        type: 'warning',
        body: 'HPD conducts random reinspections after certification. If mold returns within 60 days, you will receive a new violation with a faster correction deadline and higher fines. Ensure the moisture problem is permanently resolved, not just patched.',
      },
      {
        type: 'leadbait',
      },
    ],
  },

  // ─── PESTS ───────────────────────────────────────────────────────────────
  {
    slug: 'clear-hpd-pest-violation-nyc',
    category: 'pests-infestations',
    title: 'How to Clear an HPD Pest Violation in NYC (Bed Bugs, Roaches & Rodents)',
    metaTitle: 'How to Clear an HPD Pest Violation in NYC | Building Health X',
    metaDescription: 'Step-by-step guide to clearing HPD pest violations in NYC. Covers bed bugs, roaches, rodents — legal requirements, licensed exterminators, and certification.',
    headline: 'How to Clear an HPD Pest Violation in NYC',
    subheadline: 'The legal process for clearing bed bug, roach, and rodent violations under HPD enforcement.',
    serviceSlug: 'pest-control',
    serviceName: 'Pest Control',
    leadBaitCta: 'Get a fast, free quote from a licensed NYC exterminator to clear this violation.',
    relatedSlugs: ['clear-hpd-mold-violation-nyc', 'what-is-bhx-score'],
    relatedServicePages: [
      { label: 'Pest Control in Brooklyn', href: '/services/pest-control/brooklyn' },
      { label: 'Pest Control in Manhattan', href: '/services/pest-control/manhattan' },
      { label: 'Pest Control in the Bronx', href: '/services/pest-control/bronx' },
    ],
    content: [
      {
        type: 'intro',
        body: 'An HPD pest violation means a city inspector has confirmed an active infestation in your building. Under the NYC Housing Maintenance Code, landlords are legally responsible for exterminating pests in all units and common areas. Ignoring a pest violation will result in daily fines, Emergency Repair Program intervention at your expense, and a severely damaged BHX Score.',
      },
      {
        type: 'step',
        stepNumber: 1,
        heading: 'Understand the violation type',
        body: 'HPD issues pest violations under different sections depending on the pest:',
        items: [
          'Bed Bugs (Local Law 69/2017): Class B violation. Must be corrected within 30 days. Requires annual disclosure to tenants.',
          'Roaches and Mice: Class B or C depending on severity. C violations require correction within 21 days.',
          'Rodents (Rats): Often includes a DOH involvement. May require a licensed pest management professional and environmental remediation.',
        ],
      },
      {
        type: 'leadbait',
      },
      {
        type: 'step',
        stepNumber: 2,
        heading: 'Hire a licensed pest management professional',
        body: 'NYC requires all pest extermination in multi-family buildings to be performed by a licensed pest management professional (PMP). You cannot use general maintenance staff for this work. The exterminator must:',
        items: [
          'Hold a valid NYS DEC pesticide applicator license',
          'Use EPA-registered products and follow Integrated Pest Management (IPM) protocols',
          'Provide a written treatment report documenting the areas treated, products used, and follow-up schedule',
          'For bed bugs: conduct a minimum of two treatments with a follow-up inspection',
        ],
      },
      {
        type: 'step',
        stepNumber: 3,
        heading: 'Address the root cause — not just the symptom',
        body: 'HPD inspectors are trained to look for harborage conditions that allow pests to return. Before your reinspection, you must also:',
        items: [
          'Seal all cracks, gaps, and holes in walls, floors, and around pipes (caulk or steel wool)',
          'Fix any plumbing leaks — moisture attracts roaches and rodents',
          'Remove clutter and ensure proper garbage disposal in common areas',
          'For rodents: seal all exterior entry points with hardware cloth or steel plates',
        ],
      },
      {
        type: 'step',
        stepNumber: 4,
        heading: 'Certify the correction with HPD',
        body: 'Once treatment is complete, file your Certification of Correction through HPD\'s eCertification portal. You will need:',
        items: [
          'The exterminator\'s NYS DEC license number',
          'The signed treatment report with dates of service',
          'For bed bugs: a post-treatment inspection report confirming no live activity',
          'Documentation of any structural repairs made (crack sealing, pipe repairs)',
        ],
      },
      {
        type: 'warning',
        body: 'HPD conducts surprise reinspections within 90 days of certification. If the infestation returns, the violation is reopened with escalated fines. Ensure you have a follow-up treatment scheduled with your exterminator before filing certification.',
      },
      {
        type: 'leadbait',
      },
    ],
  },

  // ─── HEAT ────────────────────────────────────────────────────────────────
  {
    slug: 'clear-hpd-heat-violation-nyc',
    category: 'heat-utilities',
    title: 'How to Clear an HPD Heat Violation in NYC (Heat Season Rules)',
    metaTitle: 'How to Clear an HPD Heat Violation in NYC | Building Health X',
    metaDescription: 'Step-by-step guide to clearing an HPD heat or hot water violation. NYC heat season rules, legal temperatures, and how to certify correction with HPD.',
    headline: 'How to Clear an HPD Heat Violation in NYC',
    subheadline: 'Legal temperature requirements, correction timelines, and the certification process for NYC heat violations.',
    serviceSlug: 'hvac-repair',
    serviceName: 'HVAC Repair',
    leadBaitCta: 'Get a fast, free quote from a licensed NYC HVAC specialist to fix this violation.',
    relatedSlugs: ['clear-hpd-pest-violation-nyc', 'clear-hpd-mold-violation-nyc'],
    relatedServicePages: [
      { label: 'HVAC Repair in Brooklyn', href: '/services/hvac-repair/brooklyn' },
      { label: 'HVAC Repair in Manhattan', href: '/services/hvac-repair/manhattan' },
      { label: 'HVAC Repair in the Bronx', href: '/services/hvac-repair/bronx' },
    ],
    content: [
      {
        type: 'intro',
        body: 'A heat or hot water violation from HPD is one of the most serious and time-sensitive violations a landlord can receive. During heat season (October 1 to May 31), NYC law requires landlords to maintain minimum temperatures in all apartments. Failure to comply results in Class C violations, daily fines of up to $1,000 per day, and potential Emergency Repair Program intervention — where the city fixes it at your expense and bills you.',
      },
      {
        type: 'step',
        stepNumber: 1,
        heading: 'Know the legal temperature requirements',
        body: 'NYC Administrative Code §27-2029 sets out the minimum heating requirements:',
        items: [
          'Between 6am and 10pm: If outside temperature drops below 55°F, all apartments must be heated to at least 68°F.',
          'Between 10pm and 6am: All apartments must be maintained at a minimum of 62°F regardless of outside temperature.',
          'Hot water: Must be supplied 24 hours a day, 365 days a year, at a minimum of 120°F at the tap.',
          'Heat violations are classified as Class C (Immediately Hazardous) and must be corrected within 24 hours.',
        ],
      },
      {
        type: 'leadbait',
      },
      {
        type: 'step',
        stepNumber: 2,
        heading: 'Diagnose the system failure immediately',
        body: 'A Class C heat violation requires correction within 24 hours. You need a licensed HVAC technician on site as quickly as possible to diagnose the failure:',
        items: [
          'Boiler failure: Most common cause. Check pilot light, fuel supply, and pressure gauge.',
          'Thermostat or zone valve failure: Affects specific units or floors rather than the whole building.',
          'Radiator issues: Blocked steam traps, air-locked radiators, or faulty valves.',
          'Hot water heater failure: Separate from heating — affects hot water supply year-round.',
        ],
      },
      {
        type: 'step',
        stepNumber: 3,
        heading: 'Provide temporary heat during repairs',
        body: 'While your system is being repaired, you are legally required to provide temporary heat to tenants. Failure to do this is treated as a separate violation:',
        items: [
          'Provide electric space heaters to affected units (document delivery with tenant signatures)',
          'Keep a log of heaters provided, units affected, and dates',
          'Do not use gas-powered heaters indoors — carbon monoxide risk creates additional liability',
        ],
      },
      {
        type: 'step',
        stepNumber: 4,
        heading: 'Certify the correction with HPD',
        body: 'Once the system is repaired and heating is restored, certify the correction immediately through HPD\'s eCertification portal. Required documentation:',
        items: [
          'Licensed HVAC contractor\'s license number and signed work order',
          'Description of the repair made and parts replaced',
          'Confirmation that all affected apartments have been restored to legal temperature',
          'For boiler work: NYC DOB boiler inspection certificate if a major repair was performed',
        ],
      },
      {
        type: 'warning',
        body: 'HPD maintains a Heat Complaint Tracking System. Buildings with recurring heat violations are flagged for priority inspection and may be placed on the Alternative Enforcement Program (AEP) — a designation that significantly impacts your BHX Score and requires expensive quarterly inspections.',
      },
      {
        type: 'leadbait',
      },
    ],
  },

  // ─── PLUMBING ─────────────────────────────────────────────────────────────
  {
    slug: 'hire-plumber-nyc-hpd-violation',
    category: 'plumbing-electrical',
    title: 'How to Hire a Plumber in NYC for an HPD Violation',
    metaTitle: 'How to Hire a Plumber for an HPD Plumbing Violation in NYC | Building Health X',
    metaDescription: 'What to look for when hiring a licensed NYC plumber for an HPD violation. License requirements, cost ranges, permit rules, and how to get your violation dismissed.',
    headline: 'How to Hire a Plumber in NYC for an HPD Plumbing Violation',
    subheadline: 'License requirements, cost ranges, and exactly what to ask before you hire.',
    serviceSlug: 'plumbers',
    serviceName: 'Plumbers',
    leadBaitCta: 'Get free quotes from NYC-licensed plumbers who handle HPD violations.',
    relatedSlugs: ['clear-hpd-mold-violation-nyc', 'clear-hpd-heat-violation-nyc'],
    relatedServicePages: [
      { label: 'Plumbers in Brooklyn', href: '/services/plumbers/brooklyn' },
      { label: 'Plumbers in Manhattan', href: '/services/plumbers/manhattan' },
      { label: 'Plumbers in the Bronx', href: '/services/plumbers/bronx' },
    ],
    content: [
      {
        type: 'intro',
        body: 'Receiving an HPD plumbing violation — whether for a leaking pipe, defective faucet, inadequate water pressure, or sewer backup — requires a licensed plumber, not a handyman. NYC has strict licensing requirements for plumbing work in multi-family buildings, and using an unlicensed contractor can result in the violation being invalidated, voided permits, and personal liability. Here is exactly what you need to know before hiring.',
      },
      {
        type: 'step',
        stepNumber: 1,
        heading: 'Understand what your violation requires',
        body: 'HPD plumbing violations fall under the Housing Maintenance Code and range in severity:',
        items: [
          'Class A (Non-Hazardous): Minor issues like dripping faucets or slow drains. Correct within 90 days.',
          'Class B (Hazardous): Leaking pipes, no hot water, blocked drains. Correct within 30 days.',
          'Class C (Immediately Hazardous): Sewer backup, no water supply, flooding. Correct within 24 hours.',
        ],
      },
      {
        type: 'leadbait',
      },
      {
        type: 'step',
        stepNumber: 2,
        heading: 'Verify the plumber\'s license — non-negotiable',
        body: 'In NYC, all plumbing work in buildings with more than one unit must be performed by a licensed Master Plumber. Before hiring, verify:',
        items: [
          'NYC Master Plumber license (search the NYC DOB License Verification portal)',
          'Active Certificate of Insurance — minimum $1M general liability and $500K workers comp',
          'Familiar with NYC DOB permit requirements — any work affecting supply or drainage lines requires a permit',
          'Experience with HPD violation work specifically — they must understand the certification process',
        ],
      },
      {
        type: 'step',
        stepNumber: 3,
        heading: 'Understand permit requirements',
        body: 'Most plumbing repairs that address an HPD violation will require a DOB plumbing permit. Your plumber must file this permit before starting work. Unpermitted plumbing work:',
        items: [
          'Will not satisfy the HPD violation — inspectors check DOB records',
          'Creates additional DOB violations that compound the problem',
          'Exposes you to personal liability if the work causes damage or injury',
          'Cannot be certified through HPD\'s eCertification portal without permit documentation',
        ],
      },
      {
        type: 'step',
        stepNumber: 4,
        heading: 'What to expect in terms of cost',
        body: 'NYC plumbing costs for HPD violation work vary significantly by scope:',
        items: [
          'Faucet or fixture repair: $200–$500 including parts',
          'Pipe repair or replacement (per section): $500–$2,500 depending on access',
          'Drain clearing and camera inspection: $300–$800',
          'Full bathroom or kitchen replumb: $3,000–$8,000+',
          'Emergency/after-hours rates: Add 50–100% to standard rates',
        ],
      },
      {
        type: 'step',
        stepNumber: 5,
        heading: 'Certify the correction with HPD',
        body: 'Once the licensed plumber completes the work and the permit is signed off by DOB, file your certification through HPD\'s eCertification portal with:',
        items: [
          'NYC Master Plumber license number',
          'DOB permit number and sign-off date',
          'Plumber\'s signed work order with description of repairs',
        ],
      },
      {
        type: 'leadbait',
      },
    ],
  },

  // ─── BUILDING INSPECTION ─────────────────────────────────────────────────
  {
    slug: 'what-to-check-before-signing-nyc-lease',
    category: 'inspections-leasing',
    title: 'The Complete Checklist: What to Check Before Signing an NYC Lease',
    metaTitle: 'What to Check Before Signing an NYC Lease | Building Health X',
    metaDescription: 'The complete tenant checklist for NYC lease signing. HPD violations, 311 complaints, landlord history, BHX Score, and what to negotiate before you sign.',
    headline: 'What to Check Before Signing an NYC Lease',
    subheadline: 'The complete due diligence checklist — from HPD violations to landlord court history — before you hand over a deposit.',
    serviceSlug: 'building-inspectors',
    serviceName: 'Building Inspectors',
    leadBaitCta: 'Want a professional eye on this building before you sign? Get a certified NYC building inspection.',
    relatedSlugs: ['clear-hpd-mold-violation-nyc', 'clear-hpd-pest-violation-nyc', 'hire-plumber-nyc-hpd-violation'],
    relatedServicePages: [
      { label: 'Building Inspectors in Manhattan', href: '/services/building-inspectors/manhattan' },
      { label: 'Building Inspectors in Brooklyn', href: '/services/building-inspectors/brooklyn' },
      { label: 'Building Inspectors in Queens', href: '/services/building-inspectors/queens' },
    ],
    content: [
      {
        type: 'intro',
        body: 'In NYC\'s competitive rental market, tenants are pressured to sign quickly and ask questions later. That is exactly how landlords get away with hiding chronic problems. Before you hand over a security deposit and first month\'s rent, you have access to years of public data on every building in the city. This checklist tells you exactly where to look, what to search for, and what red flags to walk away from.',
      },
      {
        type: 'step',
        stepNumber: 1,
        heading: 'Check the building\'s BHX Score',
        body: 'Start by searching the building\'s address on BuildingHealthX. Your BHX Score gives you an instant 0–100 rating covering violations, complaints, landlord history, pest records, and neighbourhood safety. A score below 60 warrants serious scrutiny before signing.',
      },
      {
        type: 'leadbait',
      },
      {
        type: 'step',
        stepNumber: 2,
        heading: 'Look up HPD violations',
        body: 'Search the address on HPD\'s online portal (hpdonline.nyc.gov). Focus on:',
        items: [
          'Open violations — any unresolved issues the landlord is legally required to fix',
          'Class C violations — immediately hazardous conditions. More than 2 open Class C violations is a serious red flag',
          'Violation history — a pattern of the same violation (e.g. recurring heat complaints) indicates a systemic problem',
          'AEP (Alternative Enforcement Program) designation — means the building has chronically high violation rates',
        ],
      },
      {
        type: 'step',
        stepNumber: 3,
        heading: 'Check 311 complaint history',
        body: 'HPD violations only appear after an inspector confirms the problem. But 311 complaints show what tenants have reported — often months before a violation is issued. On BuildingHealthX, check:',
        items: [
          'Heat and hot water complaints — especially between October and March',
          'Pest complaints — roaches, mice, bed bugs',
          'Water damage and leak complaints',
          'Noise complaints — especially if you are sensitive to noise',
        ],
      },
      {
        type: 'step',
        stepNumber: 4,
        heading: 'Research the landlord',
        body: 'The landlord matters as much as the building. Search the owner\'s name on:',
        items: [
          'NYC Housing Court records — repeated eviction filings or HPD litigation are major red flags',
          'Who Owns What (whoownswhat.justfix.org) — see their entire portfolio and complaint rates across buildings',
          'ACRIS (the NYC property database) — check when they bought the building; new landlords often defer maintenance',
          'BBB and Google reviews — useful but treat as supplementary, not definitive',
        ],
      },
      {
        type: 'step',
        stepNumber: 5,
        heading: 'Do a physical walkthrough with this checklist',
        body: 'Never sign without viewing the specific unit. During your walkthrough, check:',
        items: [
          'Run every tap — check water pressure and hot water temperature',
          'Test all radiators or HVAC units',
          'Look for water stains on ceilings and walls — sign of past or ongoing leaks',
          'Check under sinks and around toilets for mold or soft flooring',
          'Inspect window frames and sills for mold',
          'Check that all door locks work — front door, apartment door, window locks',
          'Look along baseboards and behind appliances for pest droppings or evidence',
        ],
      },
      {
        type: 'warning',
        body: 'If the landlord pressures you to sign without viewing the unit, or refuses to answer questions about the building\'s violation history, that is a significant red flag. NYC law requires landlords to disclose bed bug history and lead paint presence. Any refusal to provide this is itself a violation.',
      },
      {
        type: 'leadbait',
      },
    ],
  },

  // ─── ELECTRICAL ───────────────────────────────────────────────────────────
  {
    slug: 'clear-hpd-electrical-violation-nyc',
    category: 'plumbing-electrical',
    title: 'How to Clear an HPD Electrical Violation in NYC',
    metaTitle: 'How to Clear an HPD Electrical Violation in NYC | Building Health X',
    metaDescription: 'Step-by-step guide to clearing HPD and DOB electrical violations in NYC. License requirements, permit rules, ECB fines, and the certification process.',
    headline: 'How to Clear an HPD Electrical Violation in NYC',
    subheadline: 'What to do when HPD or DOB flags your building for electrical defects — the legal correction process.',
    serviceSlug: 'electricians',
    serviceName: 'Electricians',
    leadBaitCta: 'Get free quotes from NYC-licensed electricians who specialise in HPD violation work.',
    relatedSlugs: ['hire-plumber-nyc-hpd-violation', 'clear-hpd-mold-violation-nyc', 'what-to-check-before-signing-nyc-lease'],
    relatedServicePages: [
      { label: 'Electricians in Brooklyn', href: '/services/electricians/brooklyn' },
      { label: 'Electricians in Manhattan', href: '/services/electricians/manhattan' },
      { label: 'Electricians in the Bronx', href: '/services/electricians/bronx' },
    ],
    content: [
      {
        type: 'intro',
        body: 'Electrical violations in NYC come from both HPD (for housing maintenance code issues like faulty outlets and exposed wiring) and DOB (for building code violations like outdated panels and unpermitted electrical work). Both are serious — electrical violations are frequently classified as Class C (Immediately Hazardous) and can trigger ECB fines of $1,000 per day. Here is the exact process to clear them legally and permanently.',
      },
      {
        type: 'step',
        stepNumber: 1,
        heading: 'Identify the source of the violation — HPD or DOB',
        body: 'Electrical violations come from two separate agencies with different correction processes:',
        items: [
          'HPD violations: Housing maintenance code issues affecting tenant safety — faulty outlets, exposed wiring, missing smoke/CO detectors. Certified through HPD\'s eCertification portal.',
          'DOB violations: Building code and permit issues — outdated electrical panels, unpermitted work, failed inspections. Corrected through DOB NOW and require a licensed electrician and permit.',
          'ECB violations: Issued alongside DOB violations. Require a separate hearing or payment in addition to the physical correction.',
        ],
      },
      {
        type: 'leadbait',
      },
      {
        type: 'step',
        stepNumber: 2,
        heading: 'Hire a licensed NYC electrician — this is not optional',
        body: 'All electrical work in NYC multi-family buildings must be performed by a licensed electrician. Verify before hiring:',
        items: [
          'NYC Master Electrician license (verify on the NYC DOB license portal)',
          'Active Certificate of Insurance — minimum $1M general liability',
          'Experience filing DOB electrical permits and handling HPD certification',
          'Familiarity with NYC Electrical Code (based on NEC with NYC amendments)',
        ],
      },
      {
        type: 'step',
        stepNumber: 3,
        heading: 'File a DOB electrical permit before any work starts',
        body: 'Most electrical repairs that address an HPD or DOB violation require a filed permit. Your electrician files through DOB NOW. Work done without a permit:',
        items: [
          'Will not satisfy the violation — inspectors cross-reference DOB permit records',
          'Creates new DOB violations for unpermitted work',
          'Cannot be certified through either HPD or DOB portals without permit documentation',
        ],
      },
      {
        type: 'step',
        stepNumber: 4,
        heading: 'Get a DOB electrical inspection sign-off',
        body: 'After the repair is complete, your licensed electrician must request a DOB electrical inspection. The DOB inspector will verify the work meets code. Upon passing:',
        items: [
          'The permit is signed off and closed in DOB\'s system',
          'You receive a signed inspection card — keep this for your HPD certification filing',
          'The violation status will update in the DOB system within 5–10 business days',
        ],
      },
      {
        type: 'step',
        stepNumber: 5,
        heading: 'Certify with HPD and resolve any ECB hearings',
        body: 'Once the DOB work is complete and signed off, file your HPD Certification of Correction. If you also have an ECB violation:',
        items: [
          'File proof of correction at the ECB hearing (OATH Tribunal)',
          'Bring: DOB permit sign-off, electrician\'s license number, proof of inspection',
          'ECB fines may be reduced or waived if you can demonstrate timely correction',
        ],
      },
      {
        type: 'leadbait',
      },
    ],
  },
]

// ─── Helpers ───────────────────────────────────────────────────────────────

export function getAllGuides(): GuidePost[] {
  return GUIDES
}

export function getGuideBySlug(slug: string): GuidePost | undefined {
  return GUIDES.find(g => g.slug === slug)
}

export function getGuidesByCategory(categorySlug: string): GuidePost[] {
  return GUIDES.filter(g => g.category === categorySlug)
}

export function getCategoryBySlug(slug: string): GuideCategory | undefined {
  return GUIDE_CATEGORIES.find(c => c.slug === slug)
}

export function getRelatedGuides(slugs: string[]): GuidePost[] {
  return slugs.map(s => GUIDES.find(g => g.slug === s)).filter(Boolean) as GuidePost[]
}
