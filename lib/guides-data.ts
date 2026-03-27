export type GuideCategory = {
  slug: string
  title: string
  description: string
  icon: string
  color: string
}

export type ViolationBlogLink = {
  slug: string
  title: string
}

export type GuidePost = {
  slug: string
  category: string
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
  type: 'intro' | 'step' | 'warning' | 'tip' | 'leadbait' | 'list' | 'h2' | 'body' | 'table'
  heading?: string
  body?: string
  items?: string[]
  rows?: string[][]
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
    description: "Protect your health and your lease from NYC's most common invaders.",
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
    description: "Don't sign a lease or buy a building blind. Know the hidden risks.",
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

  // ─────────────────────────────────────────────────────────────────────────
  // 1. MOLD
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'clear-hpd-mold-violation-nyc',
    category: 'violations-repairs',
    title: 'How to Clear an HPD Mold Violation in NYC (Local Law 55)',
    metaTitle: 'How to Clear an HPD Mold Violation in NYC | Building Health X',
    metaDescription: 'Step-by-step guide to clearing an HPD mold violation under Local Law 55. Exact fines, timelines, required contractors, tenant notice rules, and the HPD certification process.',
    headline: 'How to Clear an HPD Mold Violation in NYC',
    subheadline: 'An exhaustive legal guide for landlords and property managers under Local Law 55 — covering fines, timelines, contractor requirements, tenant communication, and the HPD certification process.',
    serviceSlug: 'mold-remediation',
    serviceName: 'Mold Remediation',
    leadBaitCta: 'Running out of time? Get a fast, free quote from a certified NYC mold remediator.',
    relatedSlugs: ['hire-plumber-nyc-hpd-violation', 'clear-hpd-pest-violation-nyc', 'what-to-check-before-signing-nyc-lease'],
    relatedServicePages: [
      { label: 'Mold Remediation in Brooklyn', href: '/services/mold-remediation/brooklyn' },
      { label: 'Mold Remediation in Manhattan', href: '/services/mold-remediation/manhattan' },
      { label: 'Mold Remediation in the Bronx', href: '/services/mold-remediation/bronx' },
    ],
    content: [
      {
        type: 'intro',
        body: "If you have received a Notice of Violation (NOV) from the NYC Department of Housing Preservation and Development (HPD) for mold, the clock is already ticking — and it is ticking fast. Under Local Law 55 of 2018, landlords of multiple-dwelling buildings are legally required to maintain tenants' apartments free from mold in all areas under their control. This is not a discretionary obligation. Failure to act within the prescribed window triggers compounding daily fines, potential Emergency Repair Program intervention at your direct expense, and a significant downgrade to your building's BHX Score — which is publicly visible to every prospective tenant and buyer who looks up your address. This guide gives you the complete legal roadmap to correct the violation, communicate properly with your tenant, and certify the correction with HPD before your deadline expires.",
      },
      {
        type: 'h2',
        heading: 'Step 1: Identify Your Violation Class — The Clock Is Different for Each',
      },
      {
        type: 'body',
        body: "HPD classifies mold violations under the Housing Maintenance Code based on the severity of the hazard. Your Notice of Violation will state the class clearly. The distinction is critical because it determines how much time you have before penalties begin to compound.",
      },
      {
        type: 'table',
        rows: [
          ['Violation Class', 'Severity', 'Correction Deadline', 'Starting Fine'],
          ['Class A', 'Non-Hazardous', '90 days', '$10–$50 per day after deadline'],
          ['Class B', 'Hazardous', '30 days', '$25–$100 per day after deadline'],
          ['Class C', 'Immediately Hazardous', '21 days', '$50–$150 per day after deadline, up to $25,000 for wilful non-compliance'],
        ],
      },
      {
        type: 'body',
        body: "Class C violations — the most serious — are those where the mold covers a large area (typically more than 10 square feet), or is located in sleeping rooms, bathrooms, or areas where vulnerable tenants such as children or the elderly reside. If HPD has issued you a Class C mold violation, you must begin remediation immediately. The 21-day deadline is not a planning window — it is a correction deadline. Fines for Class C violations can escalate to $150 per day per violation, and if HPD determines the non-compliance is wilful or repeated, they can refer the case to the Environmental Control Board (ECB) for civil penalties of up to $25,000.",
      },
      {
        type: 'tip',
        body: "Check your building's public BHX Score on BuildingHealthX to understand how this violation is already affecting your Maintenance and Safety category scores — both of which are visible to prospective tenants searching your address.",
      },
      {
        type: 'h2',
        heading: 'Step 2: Serve the Correct Tenant Notice Before You Enter',
      },
      {
        type: 'body',
        body: "Before any contractor sets foot in the affected unit, you have a legal obligation to provide written notice to the tenant under New York Real Property Law §235-b and Local Law 55. This is the step most landlords skip — and it is the step that creates the most legal exposure. Failing to provide proper notice can result in harassment claims, additional HPD violations, and tenant rent-abatement proceedings even if you correct the mold on time.",
      },
      {
        type: 'body',
        body: "The required notice must be delivered in writing (in-person delivery or certified mail) at least 24 hours before the first inspection or remediation visit. For emergency conditions under a Class C violation, HPD may allow shorter notice but you must document your attempt. The notice must state:",
      },
      {
        type: 'list',
        items: [
          "The nature of the work to be performed and why it is being done (reference the HPD violation number)",
          "The date and approximate time window of the planned entry",
          "The name and license number of the mold assessor and remediator who will be entering",
          "Tenant preparation instructions — for example, whether furniture needs to be moved away from walls, whether they should vacate during treatment, and whether pets need to be removed",
          "Contact information where the tenant can reach you or your managing agent with questions",
        ],
      },
      {
        type: 'body',
        body: "Keep a signed copy of every notice. If a tenant refuses entry, document the refusal in writing and contact HPD immediately. Refusing access to perform a court-ordered or violation-driven repair does not protect the tenant — it creates separate legal exposure for them — but you must follow the correct procedure to protect yourself.",
      },
      {
        type: 'leadbait',
      },
      {
        type: 'h2',
        heading: 'Step 3: Hire Two Separate Licensed Professionals — This is the Law',
      },
      {
        type: 'body',
        body: "This is the single most common and costly mistake landlords make when clearing a mold violation. Under NYS Labor Law Article 32, you are prohibited from using the same company to both assess the mold and remediate it. This separation of roles is not a suggestion — it is a statutory requirement designed to prevent conflicts of interest. Any contractor who offers to 'inspect and fix' the mold in one visit is either performing unlicensed work or violating state law. HPD will not accept certification from a remediation company that also performed the assessment.",
      },
      {
        type: 'body',
        body: "You need two distinct licensed professionals:",
      },
      {
        type: 'list',
        items: [
          "Licensed Mold Assessor (LMA): Must hold a current New York State Department of Labor Mold Assessor license (verify at labor.ny.gov). The assessor inspects the affected area, identifies the moisture source, determines the scope of mold contamination, and produces a written Mold Remediation Plan that the remediator must follow exactly.",
          "Licensed Mold Remediator (LMR): Must hold a current New York State Department of Labor Mold Remediator license. They follow the assessor's plan, perform the physical removal and treatment of mold using approved containment and disposal methods, and cannot deviate from the plan without a written amendment from the assessor.",
          "What will not work: Painting over mold, using bleach sprays and calling it done, or having building maintenance staff perform the work. All of these will result in a failed reinspection, a new violation, and escalating fines.",
        ],
      },
      {
        type: 'h2',
        heading: 'Step 4: Repair the Underlying Moisture Source — HPD Will Check',
      },
      {
        type: 'body',
        body: "Mold is a symptom, not a cause. HPD inspectors are specifically trained to identify whether the moisture source driving the mold growth has been addressed. If you remove the mold but leave a leaking pipe, a failed roof membrane, or inadequate bathroom ventilation unrepaired, your certification will be rejected and the violation will remain open. The moisture source must be documented as repaired in writing, typically through a licensed plumber's or contractor's signed work order.",
      },
      {
        type: 'body',
        body: "Common moisture sources that drive HPD mold violations in NYC:",
      },
      {
        type: 'list',
        items: [
          "Leaking supply or drain pipes within walls (requires a licensed Master Plumber to repair and document)",
          "Failed building envelope — gaps around windows, cracked facade, or deteriorating parapet allowing water infiltration",
          "Roof leaks in top-floor and penthouse units (requires DOB-permitted roof work for structural repairs)",
          "Condensation from inadequate ventilation — chronic in bathrooms without operable windows or exhaust fans",
          "HVAC condensate drain failures — particularly in central air systems serving multiple units",
        ],
      },
      {
        type: 'h2',
        heading: 'Step 5: What the Clearance Document Must Contain',
      },
      {
        type: 'body',
        body: "Once remediation is complete, the mold assessor must return to the property to perform a post-remediation assessment. This is not optional. The assessor inspects the remediated area and — if mold is no longer detectable — issues a Clearance Document (also called a Post-Remediation Assessment Report or Clearance Report). This document is what HPD requires to accept your certification. Without it, your eCertification filing will be rejected.",
      },
      {
        type: 'body',
        body: "The clearance document must contain all of the following to be accepted by HPD:",
      },
      {
        type: 'list',
        items: [
          "The licensed mold assessor's full name, NYS license number, and license expiration date",
          "The address, unit number, and specific rooms inspected",
          "A statement confirming that the remediation was performed in accordance with the original Mold Remediation Plan",
          "Confirmation that no visible mold was present at the time of post-remediation inspection",
          "Results of any air sampling or surface testing performed (required if the original violation covered more than 10 square feet)",
          "The assessor's original signature and the date of the post-remediation inspection",
          "Documentation that the underlying moisture source has been repaired (or a reference to the plumber/contractor work order)",
        ],
      },
      {
        type: 'warning',
        body: "HPD conducts random reinspections within 60 days of certification. If mold is found at reinspection — even in a different unit in the same building — they will issue a new violation with a faster deadline. The root cause must be permanently resolved, not temporarily treated.",
      },
      {
        type: 'h2',
        heading: 'Step 6: File the Certification of Correction with HPD',
      },
      {
        type: 'body',
        body: "Once you have the clearance document in hand, file your Certification of Correction through HPD's eCertification portal at hpdonline.nyc.gov. You cannot file by paper for mold violations — it must be done online. You will need to submit:",
      },
      {
        type: 'list',
        items: [
          "The HPD violation number (from your NOV)",
          "The licensed mold assessor's NYS license number",
          "The licensed mold remediator's NYS license number",
          "Upload of the post-remediation Clearance Document",
          "Upload of the signed work order from the plumber or contractor who repaired the moisture source",
          "An affidavit (which you sign online) confirming that all work was completed in compliance with NYS Labor Law Article 32",
        ],
      },
      {
        type: 'body',
        body: "HPD typically processes certifications within 5 to 10 business days. During this period, the violation remains listed as open — this is normal. Once processed and accepted, the status will update to 'Certified' in the public record. If HPD rejects the certification (usually due to missing documentation), you will receive a notification and have a short window to refile. Do not wait — a rejection does not extend your correction deadline, and fines continue to accrue.",
      },
      {
        type: 'h2',
        heading: 'What Does Mold Remediation Actually Cost in NYC?',
      },
      {
        type: 'body',
        body: "Realistic cost ranges for a standard NYC apartment mold remediation job in 2025:",
      },
      {
        type: 'table',
        rows: [
          ['Service', 'Typical NYC Cost Range', 'Notes'],
          ['Mold Assessment (LMA)', '$400–$900', 'Includes written remediation plan and pre-assessment visit'],
          ['Post-Remediation Assessment (LMA)', '$300–$600', 'Required for clearance document — separate visit'],
          ['Air Sampling / Lab Testing', '$200–$500 per sample', 'Required if mold area exceeds 10 sq ft'],
          ['Mold Remediation (LMR) — small area (<10 sq ft)', '$500–$1,500', 'Single room, limited containment'],
          ['Mold Remediation (LMR) — medium area (10–50 sq ft)', '$1,500–$4,000', 'Requires full containment and negative air pressure'],
          ['Mold Remediation (LMR) — large/multi-room', '$4,000–$15,000+', 'Building-wide or multi-unit situations'],
          ['Moisture source repair (plumbing)', '$300–$3,000', 'Depends on pipe access and scope'],
          ['ECB fine if uncorrected (Class C)', '$150/day, up to $25,000', 'Begins at end of 21-day window'],
        ],
      },
      {
        type: 'body',
        body: "The cost of doing this correctly — assessor, remediator, moisture repair, and clearance document — typically runs between $2,500 and $7,000 for a standard NYC apartment. That is significantly less than the combined cost of daily ECB fines, tenant rent-abatement claims, and potential HPD Emergency Repair Program intervention, where the city performs the work and charges you a premium with an administrative fee on top.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. PESTS
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'clear-hpd-pest-violation-nyc',
    category: 'pests-infestations',
    title: 'How to Clear an HPD Pest Violation in NYC (Bed Bugs, Roaches & Rodents)',
    metaTitle: 'How to Clear an HPD Pest Violation in NYC | Building Health X',
    metaDescription: 'Complete guide to clearing HPD pest violations in NYC. Exact fines, legal requirements, licensed exterminator rules, tenant notice obligations, and HPD certification.',
    headline: 'How to Clear an HPD Pest Violation in NYC',
    subheadline: 'The complete legal process for clearing bed bug, roach, and rodent violations — fines, exterminator licensing requirements, tenant obligations, and HPD certification.',
    serviceSlug: 'pest-control',
    serviceName: 'Pest Control',
    leadBaitCta: 'Get a fast, free quote from a licensed NYC exterminator to clear this violation.',
    relatedSlugs: ['clear-hpd-mold-violation-nyc', 'what-to-check-before-signing-nyc-lease', 'clear-hpd-heat-violation-nyc'],
    relatedServicePages: [
      { label: 'Pest Control in Brooklyn', href: '/services/pest-control/brooklyn' },
      { label: 'Pest Control in Manhattan', href: '/services/pest-control/manhattan' },
      { label: 'Pest Control in the Bronx', href: '/services/pest-control/bronx' },
    ],
    content: [
      {
        type: 'intro',
        body: "An HPD pest violation means a city inspector has visited your building and confirmed an active infestation. It is now a matter of public record — visible to any tenant, buyer, or journalist who searches your address on HPD Online or BuildingHealthX. Beyond the reputational damage, the legal and financial exposure is significant. Under the NYC Housing Maintenance Code, landlords of multiple dwellings are strictly liable for exterminating pests in all units and common areas under their control. There are no exceptions for new ownership, deferred maintenance, or tenant-caused conditions. This guide explains exactly what you must do, in what order, and what it will cost to clear the violation legally and permanently.",
      },
      {
        type: 'h2',
        heading: 'Understanding HPD Pest Violation Classes and Fines',
      },
      {
        type: 'body',
        body: "HPD pest violations are issued under Housing Maintenance Code Section 27-2017 and classified by severity. The class determines your correction deadline and the daily fine rate that begins to accrue the moment that deadline passes.",
      },
      {
        type: 'table',
        rows: [
          ['Pest Type', 'Typical Class', 'Correction Window', 'Daily Fine After Deadline'],
          ['Bed Bugs (confirmed live activity)', 'Class B', '30 days', '$25–$100 per day'],
          ['Roaches (widespread/multiple units)', 'Class B or C', '30 or 21 days', '$25–$150 per day'],
          ['Mice (evidence in unit)', 'Class B', '30 days', '$25–$100 per day'],
          ['Rats (exterior/interior burrows)', 'Class C', '21 days', '$50–$150 per day'],
          ['Multiple pest types in same building', 'Class C escalation likely', '21 days', 'Up to $25,000 per ECB case'],
        ],
      },
      {
        type: 'body',
        body: "Repeat violations — where the same building receives a pest violation within 12 months of a previous one — are subject to enhanced penalties at ECB hearings. Buildings with three or more pest violations within 24 months may be placed on HPD's Alternative Enforcement Program (AEP), which triggers mandatory quarterly inspections, public designation on the HPD website, and significantly higher correction costs.",
      },
      {
        type: 'h2',
        heading: 'Step 1: Serve the Required Tenant Notice',
      },
      {
        type: 'body',
        body: "Before any exterminator enters a tenant's unit, you must provide written notice. This is a legal requirement under NYC Administrative Code Section 27-2017.1 and Local Law 69 of 2017 (for bed bugs specifically). The notice must be delivered at least 24 hours before entry. For Class C violations requiring immediate action, document all attempts to provide notice even if the 24-hour window cannot be met.",
      },
      {
        type: 'body',
        body: "The notice must include the date and time of the planned treatment, the name and NYS DEC license number of the exterminator, the pesticide or method to be used, and any preparation instructions the tenant must follow before treatment — such as removing dishes from cabinets, bagging clothing, or vacating the unit for a specified period. Keep a signed copy. For bed bug violations specifically, you must also provide tenants with the building's bed bug infestation history for the prior year, as required by Local Law 69.",
      },
      {
        type: 'h2',
        heading: 'Step 2: Hire a Licensed Pest Management Professional',
      },
      {
        type: 'body',
        body: "In NYC, all pest extermination in residential buildings must be performed by a licensed Pest Management Professional (PMP) holding a valid NYS Department of Environmental Conservation (DEC) Pesticide Applicator license. Using unlicensed contractors — including building maintenance staff or general contractors — will result in HPD rejecting your certification. The inspector will ask for the exterminator's license number when reviewing your certification submission.",
      },
      {
        type: 'list',
        items: [
          "Verify the exterminator's NYS DEC license at the DEC website before hiring — licenses are searchable by name and number",
          "The exterminator must use EPA-registered pesticides and follow Integrated Pest Management (IPM) protocols — IPM prioritizes targeted treatment over broad chemical application",
          "For bed bugs: a minimum of two treatments 10–14 days apart is required, as eggs are not killed by most chemical treatments and a second treatment is needed to address newly hatched nymphs",
          "For rodents: the exterminator must perform both interior baiting and exterior burrow treatment, and must identify and document all entry points",
          "Request a written treatment report after each visit — this is required documentation for your HPD certification",
        ],
      },
      {
        type: 'leadbait',
      },
      {
        type: 'h2',
        heading: 'Step 3: Address Harborage Conditions or Reinspection Will Fail',
      },
      {
        type: 'body',
        body: "HPD inspectors at reinspection look for both active pest presence and conditions that allow pests to survive. If you treat the units but leave the harborage conditions intact, reinspection will fail and the violation will remain open. Before your certification, your exterminator or a contractor must address:",
      },
      {
        type: 'list',
        items: [
          "Cracks and gaps in walls, floors, and baseboards — these are primary roach and mouse harborage points. Must be sealed with caulk or steel wool.",
          "Plumbing gaps and pipe penetrations — any unsealed pipe entry point is an active pest highway. Requires licensed plumber documentation if structural work is needed.",
          "Exterior entry points for rodents — gaps in foundation, utility entries, roof edges. Seal with hardware cloth (min. 19-gauge, 1/4-inch mesh) or steel plates.",
          "Garbage disposal practices — common area garbage rooms are a major HPD inspection focus. Ensure sealed receptacles, regular collection, and clean surrounding areas.",
          "Drain conditions — floor drains in basements and mechanical rooms must have functioning screens or caps, as these are direct rodent entry points.",
        ],
      },
      {
        type: 'h2',
        heading: 'What Pest Treatment Costs in NYC (2025 Estimates)',
      },
      {
        type: 'table',
        rows: [
          ['Treatment Type', 'Typical NYC Cost Range', 'Notes'],
          ['Bed bug chemical treatment (per unit)', '$300–$700 per treatment', 'Minimum 2 treatments required'],
          ['Bed bug heat treatment (per unit)', '$1,000–$2,500 per treatment', 'Single treatment, more thorough'],
          ['Roach treatment (per unit)', '$150–$400', 'Gel bait + residual spray protocol'],
          ['Rodent extermination (per building)', '$500–$2,000', 'Includes baiting, trapping, entry point assessment'],
          ['Structural sealing (contractor)', '$500–$3,000', 'Depends on scope of gaps and pipe work'],
          ['Annual IPM contract (small building)', '$1,500–$5,000/year', 'Prevents repeat violations — highly recommended'],
        ],
      },
      {
        type: 'h2',
        heading: 'Step 4: Certify the Correction with HPD',
      },
      {
        type: 'body',
        body: "Once all treatment is complete and harborage conditions have been addressed, file your Certification of Correction through HPD's eCertification portal. Required documentation:",
      },
      {
        type: 'list',
        items: [
          "The HPD violation number from your NOV",
          "The exterminator's NYS DEC license number",
          "Signed treatment reports from all treatment visits (including the second bed bug treatment if applicable)",
          "For rodents: documentation of structural repairs to entry points (plumber or contractor work order)",
          "Your signed affidavit confirming that all units were treated and harborage conditions addressed",
        ],
      },
      {
        type: 'warning',
        body: "HPD maintains a Heat and Pest Complaint Tracking System. Buildings with multiple pest violation cycles are flagged for enhanced scrutiny. Consider establishing a quarterly IPM contract with a licensed exterminator — it costs far less than one round of ECB fines, and it is the single most effective way to prevent repeat violations.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. HEAT
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'clear-hpd-heat-violation-nyc',
    category: 'heat-utilities',
    title: 'How to Clear an HPD Heat Violation in NYC (Heat Season Rules)',
    metaTitle: 'How to Clear an HPD Heat Violation in NYC | Building Health X',
    metaDescription: 'Complete guide to clearing an HPD heat or hot water violation in NYC. Legal temperature requirements, daily fines, HVAC contractor rules, tenant notice obligations, and HPD certification.',
    headline: 'How to Clear an HPD Heat Violation in NYC',
    subheadline: 'Legal temperature requirements, daily fine rates, HVAC contractor obligations, temporary heat rules, and the full HPD certification process.',
    serviceSlug: 'hvac-repair',
    serviceName: 'HVAC Repair',
    leadBaitCta: 'Get a fast, free quote from a licensed NYC HVAC specialist — available 24/7 for heat emergencies.',
    relatedSlugs: ['clear-hpd-mold-violation-nyc', 'clear-hpd-pest-violation-nyc', 'hire-plumber-nyc-hpd-violation'],
    relatedServicePages: [
      { label: 'HVAC Repair in Brooklyn', href: '/services/hvac-repair/brooklyn' },
      { label: 'HVAC Repair in Manhattan', href: '/services/hvac-repair/manhattan' },
      { label: 'HVAC Repair in the Bronx', href: '/services/hvac-repair/bronx' },
    ],
    content: [
      {
        type: 'intro',
        body: "A heat or hot water violation from HPD is classified as a Class C — Immediately Hazardous — violation. That is the most serious category HPD issues, and it demands action within 24 hours, not 30 days. During heat season, which runs from October 1 through May 31, NYC law imposes strict minimum temperature requirements on every residential landlord in the city. Missing those requirements even once is grounds for a violation. Missing them repeatedly puts your building on the HPD Heat Watch list, triggers daily fines of up to $1,000 per day, and can result in the city sending its own contractors to fix your boiler and billing you at a significant premium. This guide explains every legal obligation and the exact steps to clear a heat violation before it destroys your operating budget.",
      },
      {
        type: 'h2',
        heading: 'What the Law Requires: Exact Temperature Thresholds',
      },
      {
        type: 'body',
        body: "NYC Administrative Code Section 27-2029 establishes the minimum heating standards. These are not guidelines — they are enforceable legal thresholds with violation consequences for every degree below compliance.",
      },
      {
        type: 'table',
        rows: [
          ['Time Period', 'Outside Temp Trigger', 'Required Indoor Temp', 'Season'],
          ['6:00 AM – 10:00 PM', 'Below 55°F outside', 'Minimum 68°F inside all apartments', 'Oct 1 – May 31'],
          ['10:00 PM – 6:00 AM', 'Any temperature', 'Minimum 62°F inside all apartments', 'Oct 1 – May 31'],
          ['Hot water supply', 'N/A — year-round obligation', 'Minimum 120°F at tap, 24/7/365', 'All year'],
        ],
      },
      {
        type: 'body',
        body: "Note that the overnight requirement — 62°F from 10pm to 6am regardless of outside temperature — is frequently missed because landlords assume tenants simply need heat when it is cold outside. The overnight requirement applies even during unseasonably warm nights in October and May. HPD inspectors use calibrated thermometers, and the reading at the time of inspection is the legal record.",
      },
      {
        type: 'h2',
        heading: 'Fines and Penalties for Heat Violations',
      },
      {
        type: 'table',
        rows: [
          ['Violation Type', 'Fine Range', 'Notes'],
          ['Class C heat violation (first)', '$250–$1,000 per day per violation', 'Begins at end of 24-hour correction window'],
          ['Repeat heat violation (same heat season)', '$500–$2,000 per day', 'ECB enhanced penalty for repeat non-compliance'],
          ['AEP-designated building', 'Mandatory quarterly inspection fees + fines', 'Buildings with chronic heat complaints'],
          ['Emergency Repair Program (ERP) intervention', 'City repair cost + 15% administrative fee', 'City contracts HVAC and bills landlord directly'],
          ['Criminal court referral (wilful)', 'Up to $10,000 + potential misdemeanor', 'Reserved for egregious or repeated cases'],
        ],
      },
      {
        type: 'body',
        body: "The Emergency Repair Program is the most feared outcome for building owners. When HPD cannot reach a landlord or the heating system is not restored within the violation window, they contract emergency HVAC services directly and charge the cost — plus a 15% administrative fee — as a lien on the property. Emergency HVAC rates in NYC are premium, and the administrative overhead adds further cost. One ERP intervention typically costs more than a year of proper boiler maintenance.",
      },
      {
        type: 'h2',
        heading: 'Step 1: Diagnose the System Failure Immediately',
      },
      {
        type: 'body',
        body: "A Class C heat violation requires correction within 24 hours, which means you need a licensed HVAC technician diagnosing the problem within hours of receiving the NOV — not the next business day. Common causes of NYC heat failures in residential buildings:",
      },
      {
        type: 'list',
        items: [
          "Oil or gas boiler failure: Check fuel level first (an empty oil tank is a surprisingly common cause), then pilot light, burner, and pressure gauge. Boiler lockout codes indicate specific failure modes.",
          "Steam system issues: Faulty thermostatic radiator valves (TRVs), air-locked radiators, or failed main vents cause uneven heat distribution that triggers complaints in cold units even when the boiler is functioning.",
          "Zone valve failure: In hydronic (hot water) systems, a failed zone valve cuts heat to specific floors or units while the rest of the building is fine.",
          "Thermostat or aquastat failure: A malfunctioning aquastat causes the boiler to cycle incorrectly, resulting in insufficient heat output.",
          "Hot water heater failure: Separate from the heating system in most buildings — a failed domestic hot water heater creates a hot water violation even during summer when heating is not at issue.",
        ],
      },
      {
        type: 'leadbait',
      },
      {
        type: 'h2',
        heading: 'Step 2: Provide Temporary Heat While the System Is Being Repaired',
      },
      {
        type: 'body',
        body: "While your HVAC technician is working on the system, you are legally required to provide temporary heat to affected tenants. This is not optional. Failing to provide temporary heat is treated as a separate, concurrent violation and compounds your legal exposure significantly.",
      },
      {
        type: 'list',
        items: [
          "Provide electric space heaters to every affected unit. Deliver them personally and have the tenant sign a receipt — keep this documentation.",
          "Only use electric space heaters — never propane or kerosene heaters indoors. The carbon monoxide and fire risk creates additional liability far exceeding the cost of proper equipment.",
          "Document every delivery: unit number, tenant name, date and time, heater model number. This contemporaneous record protects you at any subsequent ECB hearing.",
          "If the building is large and you cannot source enough heaters quickly, contact a local property management supply company or HVAC emergency service — many maintain heater rental inventory for exactly this purpose.",
        ],
      },
      {
        type: 'h2',
        heading: 'Step 3: What Boiler and HVAC Repair Costs in NYC',
      },
      {
        type: 'table',
        rows: [
          ['Repair Type', 'Typical NYC Cost Range', 'Notes'],
          ['Emergency diagnostic call (nights/weekends)', '$250–$500 call fee', 'Before any parts or labor'],
          ['Boiler burner repair/replacement', '$500–$2,500', 'Gas or oil burner assembly'],
          ['Aquastat or thermostat replacement', '$200–$600', 'Parts + labor'],
          ['Zone valve replacement (per zone)', '$300–$800', 'Hydronic systems'],
          ['Steam trap replacement (per trap)', '$150–$400', 'Common cause of uneven heat'],
          ['Full boiler replacement (residential)', '$8,000–$25,000+', 'Includes DOB permit and inspection'],
          ['Hot water heater replacement', '$1,500–$5,000', 'Depends on size and fuel type'],
          ['ERP emergency contractor (city)', '$3,000–$10,000+', 'Plus 15% admin fee billed as property lien'],
        ],
      },
      {
        type: 'h2',
        heading: 'Step 4: Certify the Correction with HPD',
      },
      {
        type: 'body',
        body: "Once heating has been fully restored to all affected units, file your Certification of Correction through HPD's eCertification portal. For heat violations, HPD also has a Heat Line (718-840-4200) where you can report restoration — call this immediately when heat is restored, as it can slow the fine accrual clock while your formal certification processes.",
      },
      {
        type: 'list',
        items: [
          "HPD violation number from your NOV",
          "Licensed HVAC contractor's name, license number, and signed work order describing the repair",
          "For boiler work requiring a permit: DOB boiler inspection certificate if a major repair was performed (boiler replacements always require a DOB permit and inspection)",
          "Confirmation that heat has been restored to legal temperature in all affected units, documented with dated temperature readings if possible",
          "If you provided temporary heaters: documentation of delivery and retrieval",
        ],
      },
      {
        type: 'warning',
        body: "Buildings that accumulate three or more heat complaints in a single heat season are automatically flagged for the HPD Heat Watch designation. Heat Watch buildings receive proactive inspection calls during cold weather events, and any failure results in immediate violation issuance with shortened correction windows. The only reliable way to avoid Heat Watch status is preventive boiler maintenance performed before October 1 each year.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. PLUMBING
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'hire-plumber-nyc-hpd-violation',
    category: 'plumbing-electrical',
    title: 'How to Hire a Licensed Plumber for an HPD Violation in NYC',
    metaTitle: 'How to Hire a Plumber for an HPD Plumbing Violation in NYC | Building Health X',
    metaDescription: "What to know before hiring a plumber for an HPD violation in NYC. License requirements, DOB permit rules, realistic cost ranges, and how to certify the correction.",
    headline: 'How to Hire a Licensed Plumber for an HPD Plumbing Violation in NYC',
    subheadline: "License verification, DOB permit requirements, realistic cost estimates, and the exact certification process — everything you need before you hire.",
    serviceSlug: 'plumbers',
    serviceName: 'Plumbers',
    leadBaitCta: 'Get free quotes from NYC-licensed plumbers who specialise in HPD violation work.',
    relatedSlugs: ['clear-hpd-mold-violation-nyc', 'clear-hpd-heat-violation-nyc', 'clear-hpd-electrical-violation-nyc'],
    relatedServicePages: [
      { label: 'Plumbers in Brooklyn', href: '/services/plumbers/brooklyn' },
      { label: 'Plumbers in Manhattan', href: '/services/plumbers/manhattan' },
      { label: 'Plumbers in the Bronx', href: '/services/plumbers/bronx' },
    ],
    content: [
      {
        type: 'intro',
        body: "Receiving an HPD plumbing violation — whether for a leaking pipe, defective faucet, failed drain, inadequate water pressure, or sewer backup — means you need a licensed plumber, not a handyman, not a general contractor, and not your building's maintenance staff. NYC has some of the most stringent plumbing licensing requirements in the country, and work performed without the correct license cannot be certified through HPD's portal, cannot receive a DOB sign-off, and will generate additional violations on top of the one you are already trying to clear. Hiring wrong is more expensive than hiring right. This guide tells you exactly what to look for, what to pay, and how the certification process works.",
      },
      {
        type: 'h2',
        heading: 'HPD Plumbing Violations: Classes and Correction Deadlines',
      },
      {
        type: 'table',
        rows: [
          ['Violation', 'Class', 'Deadline', 'Fine if Missed'],
          ['Dripping faucets, slow drains, minor leaks', 'Class A', '90 days', '$10–$50/day'],
          ['Leaking supply or drain pipes', 'Class B', '30 days', '$25–$100/day'],
          ['No hot water supply to unit', 'Class B', '30 days', '$25–$100/day'],
          ['Sewer backup, no water supply', 'Class C', '24 hours', '$50–$150/day, up to $25,000 ECB'],
          ['Flooding from plumbing failure', 'Class C', '24 hours', '$50–$150/day, up to $25,000 ECB'],
        ],
      },
      {
        type: 'h2',
        heading: 'Step 1: License Requirements — What You Must Verify Before Hiring',
      },
      {
        type: 'body',
        body: "All plumbing work in NYC buildings with more than one dwelling unit must be performed by a licensed Master Plumber. A journeyman plumber working under a Master Plumber may perform the physical work, but the Master Plumber must supervise, sign the permit application, and take legal responsibility for the work. This is not flexible. Verify the following before signing any contract:",
      },
      {
        type: 'list',
        items: [
          "NYC Master Plumber license: Search the NYC DOB License Verification portal at a810-bisweb.nyc.gov. Verify that the license is active, not suspended or expired.",
          "Certificate of Insurance: The plumber must carry a minimum of $1 million in general liability insurance and $500,000 in workers' compensation coverage. Request the certificate naming your building as an additional insured before any work starts.",
          "HPD violation experience: Ask specifically whether the plumber has filed HPD violation corrections before and is familiar with the eCertification portal. Not all licensed plumbers have done this, and unfamiliarity with the process can cause certification delays.",
          "DOB permit filing capability: Confirm the Master Plumber is registered with NYC DOB to file permit applications. Some plumbers are licensed but not currently registered to file — this will prevent you from obtaining the required sign-off.",
        ],
      },
      {
        type: 'leadbait',
      },
      {
        type: 'h2',
        heading: 'Step 2: DOB Permit Requirements — When You Need One and Why',
      },
      {
        type: 'body',
        body: "This is the most misunderstood aspect of HPD plumbing violation clearance. Most landlords assume that hiring a licensed plumber and doing the work is sufficient. It is not. Most plumbing repairs that address an HPD violation require a NYC Department of Buildings (DOB) plumbing permit to be filed before work begins. Work performed without a required permit creates a compounding problem:",
      },
      {
        type: 'list',
        items: [
          "HPD will reject your certification if the work required a DOB permit and none was filed",
          "DOB may issue its own violation for unpermitted plumbing work — this is a separate violation that appears in DOB records and on your building's BHX Score",
          "Unpermitted plumbing work voids your building's insurance coverage for any damage caused by that work",
          "Without a DOB sign-off, you cannot prove the work was done to code — which creates liability exposure if the repair fails and causes damage",
        ],
      },
      {
        type: 'body',
        body: "Plumbing work that typically requires a DOB permit: replacing or relocating any pipe in the building's main supply or drainage system, installing or replacing fixtures beyond a simple swap, any work involving the building's water main or sewer connection, and boiler or water heater replacements. Work that typically does not require a permit: direct replacement of a faucet or valve without altering the supply line, clearing a blocked drain without modifying pipes, and repairing a toilet mechanism without changing the supply connection. When in doubt, ask your Master Plumber — they are legally responsible for knowing.",
      },
      {
        type: 'h2',
        heading: 'Step 3: Realistic Plumbing Costs for HPD Violation Work in NYC (2025)',
      },
      {
        type: 'table',
        rows: [
          ['Job Type', 'Typical NYC Cost Range', 'Notes'],
          ['Faucet or fixture repair/replacement', '$200–$600', 'No permit typically required'],
          ['Pipe repair (minor, accessible location)', '$400–$1,200', 'Permit may be required'],
          ['Pipe repair (behind walls)', '$1,000–$3,500', 'Includes opening and patching wall'],
          ['Drain clearing (snake/hydro-jet)', '$250–$700', 'Depends on severity and access'],
          ['Water heater replacement', '$1,500–$4,500', 'Permit + inspection required'],
          ['Main supply line repair/replacement', '$3,000–$10,000+', 'DOB permit required; may require DOT coordination'],
          ['Sewer line replacement', '$8,000–$30,000+', 'Major permit; street opening may be needed'],
          ['Emergency/after-hours surcharge', '+50–100% of standard rate', 'For Class C immediate violations'],
        ],
      },
      {
        type: 'h2',
        heading: 'Step 4: The DOB Inspection Sign-Off Process',
      },
      {
        type: 'body',
        body: "For permitted plumbing work, after your Master Plumber completes the repair they must request a DOB plumbing inspection. A DOB inspector will visit the site to verify that the work was performed to code. Upon passing the inspection, the permit is signed off and closed in the DOB system. This process typically takes 3–10 business days from the time the inspection is requested, depending on DOB workload. Your Master Plumber should be managing this process — if they are not, it is a red flag.",
      },
      {
        type: 'h2',
        heading: 'Step 5: Certifying the Correction with HPD',
      },
      {
        type: 'body',
        body: "Once the work is complete and any required DOB sign-off is obtained, file through HPD's eCertification portal with the following:",
      },
      {
        type: 'list',
        items: [
          "HPD violation number",
          "NYC Master Plumber license number",
          "DOB permit number and inspection sign-off date (if a permit was required)",
          "Plumber's signed work order with description of repairs performed",
          "Your affidavit confirming the repair was completed",
        ],
      },
      {
        type: 'warning',
        body: "Never attempt to certify an HPD plumbing violation without confirming DOB sign-off first if a permit was required. HPD cross-references DOB records. A certification filed without the corresponding DOB sign-off will be rejected, the violation will remain open, and fines will continue to accrue.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. PRE-LEASE INSPECTION
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'what-to-check-before-signing-nyc-lease',
    category: 'inspections-leasing',
    title: 'The Complete Checklist: What to Check Before Signing an NYC Lease',
    metaTitle: 'What to Check Before Signing an NYC Lease | Building Health X',
    metaDescription: "The complete tenant checklist for NYC lease signing — HPD violations, 311 complaint history, landlord court records, BHX Score, and what to negotiate before you hand over a deposit.",
    headline: 'What to Check Before Signing an NYC Lease',
    subheadline: "Complete due diligence from HPD violation records to landlord court history — every public data source you should check before handing over a deposit.",
    serviceSlug: 'building-inspectors',
    serviceName: 'Building Inspectors',
    leadBaitCta: 'Want a professional inspection before you sign? Get a certified NYC building inspector.',
    relatedSlugs: ['clear-hpd-mold-violation-nyc', 'clear-hpd-pest-violation-nyc', 'clear-hpd-heat-violation-nyc'],
    relatedServicePages: [
      { label: 'Building Inspectors in Manhattan', href: '/services/building-inspectors/manhattan' },
      { label: 'Building Inspectors in Brooklyn', href: '/services/building-inspectors/brooklyn' },
      { label: 'Building Inspectors in Queens', href: '/services/building-inspectors/queens' },
    ],
    content: [
      {
        type: 'intro',
        body: "In NYC's rental market, tenants are frequently pressured to sign immediately or lose the apartment. That urgency is manufactured. The reality is that every residential building in New York City has years of public data available within minutes — violation history, complaint records, landlord court filings, ownership changes, and financial health indicators. A landlord who discourages you from doing this research is a landlord with something to hide. This checklist tells you every public database you should check, what red flags look like, and what you can legitimately use as leverage before signing.",
      },
      {
        type: 'h2',
        heading: '1. Start With the BHX Score',
      },
      {
        type: 'body',
        body: "Search the building's address on BuildingHealthX first. The BHX Score is a 0–100 composite rating that aggregates HPD violations, 311 complaint history, landlord litigation records, pest inspection results, eviction filings, and neighbourhood safety data into a single number. A score above 80 is generally healthy. A score below 60 warrants serious scrutiny. A score below 40 — especially combined with active red flag designations like AEP or Speculation Watch — should give you significant pause before signing.",
      },
      {
        type: 'body',
        body: "Pay particular attention to the Category BHX Scores — especially Heat Reliability, Pest Control, and Stability. A building can have a moderate overall score while having a critically low Pest Control score of 7, which is far more relevant to your daily living experience than the composite average.",
      },
      {
        type: 'h2',
        heading: '2. HPD Online — Violations and Complaint History',
      },
      {
        type: 'body',
        body: "Go to hpdonline.nyc.gov and search the building address. Look at both the violations tab and the complaints tab separately — they tell different stories.",
      },
      {
        type: 'list',
        items: [
          "Open violations: Any unresolved HPD violation is a building the landlord is legally obligated to fix. More than 2 open Class C violations is a serious concern — these are immediately hazardous conditions the landlord is ignoring.",
          "Violation history pattern: A building with 50 resolved violations is not necessarily worse than one with 5 open ones — the pattern matters. Look for the same category of violation repeating (e.g., heat complaints every winter, pest violations every summer). Recurring violations signal systemic problems, not isolated incidents.",
          "AEP designation: If the building appears on HPD's Alternative Enforcement Program list, that is a public declaration that the building has chronically high violation rates. AEP buildings are required to post this designation at the entrance.",
          "Complaint-to-violation ratio: A building with 200 complaints and 3 violations does not have a good landlord — it has an unresponsive landlord who didn't fix things until the inspector showed up. High complaint volumes with low violation counts are a red flag, not a green one.",
        ],
      },
      {
        type: 'leadbait',
      },
      {
        type: 'h2',
        heading: '3. 311 Complaint Data — What Tenants Actually Reported',
      },
      {
        type: 'body',
        body: "HPD violations only appear in the record after an inspector confirms a condition. The 311 complaint data shows what tenants reported, often months before any inspector visited. On BuildingHealthX, the complaint history is aggregated and visualised — look at the trend charts, not just the totals.",
      },
      {
        type: 'list',
        items: [
          "Heat complaints between October and March: More than 5 heat complaints in a single winter indicates a building that cannot maintain legal temperatures reliably. This is significant — heat failures are dangerous and legally the landlord's problem to solve.",
          "Pest complaints: Even one bed bug complaint is worth taking seriously. Bed bug complaints that recur in the same building over multiple years indicate a building-wide problem that treatment alone cannot solve.",
          "Noise complaints: High noise complaint volumes from bars, nightlife, or construction nearby will affect your daily life. This data is specific to the immediate block, not the broader neighbourhood.",
          "Water damage complaints: Recurring water damage complaints indicate a building envelope problem — roof, windows, or facade — that the landlord is not resolving.",
        ],
      },
      {
        type: 'h2',
        heading: "4. Research the Landlord — Not Just the Building",
      },
      {
        type: 'body',
        body: "The building's physical condition matters, but the landlord's track record across their entire portfolio matters more. A professionally managed building deteriorates when a negligent owner takes it over. Conversely, a historically problematic building can improve dramatically under responsible ownership. Check all of the following:",
      },
      {
        type: 'list',
        items: [
          "Who Owns What (whoownswhat.justfix.org): See the owner's entire NYC portfolio. If they own 20 buildings and all of them have high complaint rates, the problem is management philosophy, not individual building age.",
          "NYC Housing Court records (iapps.courts.state.ny.us): Search the landlord's name and the building address. Multiple eviction filings in a single building often indicates a landlord using eviction as a pressure tactic. Frequent HPD litigation indicates a pattern of non-compliance.",
          "ACRIS ownership history: Search at a836-acris.nyc.gov. If the building was sold recently — particularly in the last 2 years — check whether violations spiked after the sale. Opportunistic buyers frequently purchase with renovation intent, and tenant disruption and deferred maintenance follow.",
          "Google reviews and community boards: Not legally definitive, but useful supplementary context. Search the landlord's name and management company name along with 'NYC reviews.'",
        ],
      },
      {
        type: 'h2',
        heading: '5. What the Landlord Must Legally Disclose to You',
      },
      {
        type: 'body',
        body: "NYC law requires landlords to disclose specific information before or at lease signing. A landlord who refuses to provide any of these is in violation of the law — and the refusal itself is a red flag:",
      },
      {
        type: 'list',
        items: [
          "Bed bug history: Under Local Law 69 of 2017, landlords must disclose the bed bug infestation history of the specific unit and the entire building for the prior year.",
          "Lead paint disclosure: For buildings built before 1978, landlords must provide the EPA's 'Protect Your Family from Lead in Your Home' pamphlet and a signed disclosure acknowledging whether lead paint is present.",
          "Rent history: For rent-stabilized apartments, tenants have the right to request the complete rent history from the DHCR. If the landlord claims an apartment is not rent-stabilized, verify this independently at apps.hcr.ny.gov.",
          "Operating permits: The building must have a current Certificate of Occupancy (CO) filed with DOB. Ask for the CO number and verify it at a810-bisweb.nyc.gov.",
        ],
      },
      {
        type: 'h2',
        heading: '6. The Physical Walkthrough Checklist',
      },
      {
        type: 'body',
        body: "Never sign a lease without viewing the specific unit you will occupy — not a comparable unit, not a model unit. Bring this checklist:",
      },
      {
        type: 'list',
        items: [
          "Run every tap for 60 seconds — check water pressure, drainage speed, and hot water temperature at the tap",
          "Test all radiators or HVAC units — feel for heat output and listen for knocking or banging in steam radiators",
          "Look up at every ceiling and along every wall for water stains — yellow or brown rings indicate past or ongoing leaks",
          "Open every cabinet under sinks and check the base for softness, staining, or mold odor",
          "Check window frames and sills with your finger — any give in the caulk or softness in the wood indicates water infiltration",
          "Crouch down and look along baseboards in the kitchen and bathrooms for droppings, grease trails, or entry holes — these indicate mice",
          "Check the inside of every closet corner — bed bugs prefer fabric contact points and dark enclosures",
          "Test every outlet with your phone charger — dead outlets indicate electrical issues",
          "Ask to see the boiler room or mechanical room — a well-maintained boiler room indicates a landlord who invests in the building",
        ],
      },
      {
        type: 'warning',
        body: "If a landlord refuses to let you see the unit before signing, claims the current tenant is still in residence and cannot be disturbed, or pressures you to sign a lease contingent on viewing later — walk away. This is a textbook tactic used to hide unit conditions that would cause you to renegotiate or decline. NYC law does not require you to sign without viewing, regardless of market competition.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. ELECTRICAL
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'clear-hpd-electrical-violation-nyc',
    category: 'plumbing-electrical',
    title: 'How to Clear an HPD Electrical Violation in NYC',
    metaTitle: 'How to Clear an HPD Electrical Violation in NYC | Building Health X',
    metaDescription: "Step-by-step guide to clearing HPD and DOB electrical violations in NYC. Exact fines, Master Electrician licensing requirements, permit rules, ECB hearings, and the certification process.",
    headline: 'How to Clear an HPD Electrical Violation in NYC',
    subheadline: "Fines, Master Electrician licensing, DOB permit requirements, ECB hearings, and the full HPD certification process for electrical violations.",
    serviceSlug: 'electricians',
    serviceName: 'Electricians',
    leadBaitCta: 'Get free quotes from NYC-licensed electricians who specialise in HPD violation clearance.',
    relatedSlugs: ['hire-plumber-nyc-hpd-violation', 'clear-hpd-mold-violation-nyc', 'what-to-check-before-signing-nyc-lease'],
    relatedServicePages: [
      { label: 'Electricians in Brooklyn', href: '/services/electricians/brooklyn' },
      { label: 'Electricians in Manhattan', href: '/services/electricians/manhattan' },
      { label: 'Electricians in the Bronx', href: '/services/electricians/bronx' },
    ],
    content: [
      {
        type: 'intro',
        body: "Electrical violations in NYC buildings come from two different agencies — HPD and DOB — and the correction process for each is distinct. HPD issues electrical violations under the Housing Maintenance Code for conditions that directly affect tenant safety: faulty outlets, exposed wiring, missing smoke detectors, inoperative CO detectors, and overloaded circuits. DOB issues electrical violations under the Building Code for structural electrical issues: outdated panels, unpermitted electrical work, failed inspections, and code non-compliance. Both carry significant financial penalties if not corrected correctly and on time, and both require a licensed Master Electrician to perform the work. Using anyone else — including a journeyman working independently, a general contractor, or maintenance staff — will result in your certification being rejected and your fine clock continuing to run.",
      },
      {
        type: 'h2',
        heading: 'HPD vs DOB Electrical Violations: Understanding the Difference',
      },
      {
        type: 'table',
        rows: [
          ['', 'HPD Electrical Violation', 'DOB Electrical Violation'],
          ['Issuing Agency', 'Department of Housing Preservation and Development', 'Department of Buildings'],
          ['Triggered by', 'Tenant 311 complaint or HPD proactive inspection', 'DOB inspection or permit review'],
          ['Common causes', 'Faulty outlets, exposed wiring, missing detectors', 'Unpermitted work, outdated panels, failed inspections'],
          ['Correction portal', 'HPD eCertification (hpdonline.nyc.gov)', 'DOB NOW or DOB BIS'],
          ['Associated fine', 'ECB civil penalty if uncorrected', 'ECB civil penalty, separate from HPD'],
          ['Typical deadline', '21–30 days depending on class', '20–60 days depending on violation'],
        ],
      },
      {
        type: 'body',
        body: "Many electrical violations result in both HPD and DOB violations simultaneously — HPD for the immediate tenant safety concern, and DOB for the underlying code issue. This means you may have two separate correction processes to manage and two separate ECB hearings to attend if either is not resolved on time. The financial exposure compounds quickly.",
      },
      {
        type: 'h2',
        heading: 'Fines and Penalties for Electrical Violations',
      },
      {
        type: 'table',
        rows: [
          ['Violation Type', 'Fine Range', 'Notes'],
          ['HPD Class C electrical (faulty outlet, exposed wire)', '$50–$150 per day', 'Begins 21 days after NOV date'],
          ['HPD Class B electrical (inoperative smoke detector)', '$25–$100 per day', 'Begins 30 days after NOV date'],
          ['DOB electrical violation (unpermitted work)', '$800–$25,000 ECB penalty', 'Based on scope and history of non-compliance'],
          ['DOB violation for illegal conversion with electrical', '$1,000–$10,000+', 'Enhanced penalty if electrical is part of illegal dwelling'],
          ['Wilful non-compliance (repeated)', 'Up to $25,000 per case', 'ECB enhanced penalty with criminal referral possible'],
        ],
      },
      {
        type: 'h2',
        heading: 'Step 1: Verify Your Electrician\'s License — Two Layers',
      },
      {
        type: 'body',
        body: "NYC electrical work in residential buildings requires a Master Electrician license — not a General Electrician license, not a journeyman license, and not an out-of-state license. There are two layers to verify:",
      },
      {
        type: 'list',
        items: [
          "NYC Master Electrician license: Issued by the NYC Department of Buildings. Search at a810-bisweb.nyc.gov. Verify the license is active and not expired or suspended.",
          "Certificate of Insurance: Minimum $1 million general liability and $500,000 workers' compensation. Request the certificate naming your building as an additional insured before any work begins.",
          "DOB permit filing registration: The Master Electrician must be registered to file permits through DOB NOW. Not all licensed electricians are currently registered — verify this directly.",
          "Experience with HPD violations specifically: Ask whether the electrician has filed HPD violation certifications before. The certification process is separate from the physical work, and inexperienced contractors often complete the work but fail to file correctly.",
        ],
      },
      {
        type: 'leadbait',
      },
      {
        type: 'h2',
        heading: 'Step 2: DOB Electrical Permit — Required for Most Work',
      },
      {
        type: 'body',
        body: "Most electrical repairs that address an HPD or DOB violation require a filed DOB electrical permit before work begins. The permit is filed by the Master Electrician through DOB NOW. Work performed without a permit that required one creates a cascading set of problems:",
      },
      {
        type: 'list',
        items: [
          "HPD will reject your certification if their cross-reference with DOB shows no filed permit for the work performed",
          "DOB may issue a new violation for unpermitted electrical work — this is a separate violation with its own ECB fine exposure",
          "Your building's insurance coverage is voided for any damage caused by unpermitted electrical work",
          "The unpermitted work will appear in DOB's records and impact your building's BHX Score under the Safety and Maintenance categories",
        ],
      },
      {
        type: 'body',
        body: "Electrical work that typically does not require a permit: direct replacement of a like-for-like outlet or switch without wiring changes, replacing a light fixture on an existing circuit without panel work, and replacing a smoke or CO detector in the same location. Everything else — panel work, new circuits, rewiring, adding outlets — requires a permit.",
      },
      {
        type: 'h2',
        heading: 'Step 3: The DOB Electrical Inspection',
      },
      {
        type: 'body',
        body: "After permitted work is completed, the Master Electrician requests a DOB electrical inspection through DOB NOW. A DOB electrical inspector visits the property to verify the work meets the NYC Electrical Code (based on the National Electrical Code with local amendments). Inspection wait times typically run 5–15 business days. Upon passing:",
      },
      {
        type: 'list',
        items: [
          "The permit is signed off and closed in the DOB system",
          "A signed inspection record is issued — keep this for your HPD certification filing",
          "The violation status updates in DOB's system within 5–10 business days",
          "For concurrent HPD violations, you can now proceed with HPD eCertification",
        ],
      },
      {
        type: 'h2',
        heading: 'Step 4: ECB Hearings — What to Expect if You Have an ECB Violation',
      },
      {
        type: 'body',
        body: "If your electrical violation resulted in an ECB (Environmental Control Board) hearing notice, you must appear at the OATH (Office of Administrative Trials and Hearings) Tribunal. Unlike the physical correction, the ECB hearing is a legal proceeding with a separate outcome — dismissal, reduced penalty, or full penalty. Bring:",
      },
      {
        type: 'list',
        items: [
          "Proof of correction: DOB permit sign-off, Master Electrician license number, signed work order with description of repairs and dates",
          "Proof of timely correction: Documentation showing the work was completed within the violation's correction window",
          "Timeline of action: A brief written narrative showing when you received the NOV, when you hired the electrician, when the permit was filed, and when the work was completed",
          "Timely correction is the strongest argument for penalty reduction at an ECB hearing. Judges regularly reduce or dismiss ECB fines when the landlord demonstrates they acted promptly and in good faith.",
        ],
      },
      {
        type: 'h2',
        heading: 'What Electrical Work Costs in NYC (2025 Estimates)',
      },
      {
        type: 'table',
        rows: [
          ['Job Type', 'Typical NYC Cost', 'Notes'],
          ['Outlet or switch replacement (no permit)', '$150–$400 per outlet', 'Direct replacement only'],
          ['New circuit installation', '$500–$1,500 per circuit', 'Permit required'],
          ['Smoke / CO detector installation', '$150–$350 per detector', 'Permit usually not required for direct replacement'],
          ['Electrical panel upgrade (100A to 200A)', '$3,000–$8,000', 'Permit + inspection required; often triggers DOB review'],
          ['Full apartment rewire', '$8,000–$20,000+', 'Permit + inspection; disruptive to tenant'],
          ['After-hours emergency call', '+50–100% surcharge', 'For Class C immediate violations'],
        ],
      },
      {
        type: 'warning',
        body: "Smoke detector and CO detector violations are among the most commonly missed HPD violations because landlords treat them as minor. They are not. Missing or inoperative detectors are Class B violations that escalate to Class C if a tenant files a follow-up complaint. NYC law requires working smoke detectors within 10 feet of every bedroom, and CO detectors within 15 feet of sleeping areas in any building with gas appliances or an attached garage.",
      },
    ],
  },
]

// Helpers
export function getAllGuides(): GuidePost[] { return GUIDES }
export function getGuideBySlug(slug: string): GuidePost | undefined { return GUIDES.find(g => g.slug === slug) }
export function getGuidesByCategory(categorySlug: string): GuidePost[] { return GUIDES.filter(g => g.category === categorySlug) }
export function getCategoryBySlug(slug: string): GuideCategory | undefined { return GUIDE_CATEGORIES.find(c => c.slug === slug) }
export function getRelatedGuides(slugs: string[]): GuidePost[] { return slugs.map(s => GUIDES.find(g => g.slug === s)).filter(Boolean) as GuidePost[] }
