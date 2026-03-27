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

export type FaqItem = { q: string; a: string }

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
  datePublished?: string
  dateModified?: string
  content: GuideSection[]
  relatedSlugs: string[]
  relatedServicePages: { label: string; href: string }[]
  furtherReading: { slug: string; title: string }[]
  govLinks: { label: string; url: string; description: string }[]
}

export type GuideSection =
  | { type: 'intro'; body: string }
  | { type: 'h2'; heading: string }
  | { type: 'body'; body: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; rows: string[][] }
  | { type: 'step'; stepNumber: number; heading: string; body?: string; items?: string[] }
  | { type: 'warning'; body: string }
  | { type: 'tip'; body: string }
  | { type: 'leadbait' }
  | { type: 'stat'; value: string; label: string; source?: string; color?: 'blue' | 'yellow' | 'green' | 'red' }
  | { type: 'statrow'; stats: { value: string; label: string; source?: string }[] }
  | { type: 'faq'; heading?: string; items: FaqItem[] }

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
    datePublished: '2024-09-01',
    dateModified: '2025-03-01',
    relatedSlugs: ['hire-plumber-nyc-hpd-violation', 'clear-hpd-pest-violation-nyc', 'what-to-check-before-signing-nyc-lease'],
    relatedServicePages: [
      { label: 'Mold Remediation in Brooklyn', href: '/services/mold-remediation/brooklyn' },
      { label: 'Mold Remediation in Manhattan', href: '/services/mold-remediation/manhattan' },
      { label: 'Mold Remediation in the Bronx', href: '/services/mold-remediation/bronx' },
    ],
    furtherReading: [
      { slug: 'what-do-i-do-if-my-nyc-apartment-has-mold', title: 'What Do I Do If My NYC Apartment Has Mold?' },
      { slug: 'what-does-an-open-hpd-violation-mean', title: 'What Does an Open HPD Violation Mean?' },
      { slug: 'how-to-check-if-hpd-violations-were-actually-fixed', title: 'How to Check If HPD Violations Were Actually Fixed' },
      { slug: 'can-i-get-a-rent-reduction-if-my-landlord-has-open-violations', title: 'Can I Get a Rent Reduction If My Landlord Has Open Violations?' },
    ],
    govLinks: [
      { label: 'HPD eCertification Portal', url: 'https://hpdonline.nyc.gov/hpdonline/selfcertify/', description: 'File your Certification of Correction for HPD violations online.' },
      { label: 'NYS DOL Mold Contractor Lookup', url: 'https://labor.ny.gov/workerprotection/safetyhealth/mold_contractor_cert.shtm', description: 'Verify a mold assessor or remediator licence is valid under NYS Labor Law Article 32.' },
      { label: 'Local Law 55 (NYC Admin Code §27-2017.1)', url: 'https://www.nyc.gov/site/hpd/services-and-information/mold.page', description: "HPD's official guidance on Local Law 55 mold obligations for landlords." },
      { label: 'NYC HPD Online — Violation Search', url: 'https://hpdonline.nyc.gov', description: "Look up any building's full HPD violation history by address." },
      { label: 'ECB/OATH Tribunal', url: 'https://www.nyc.gov/site/oath/index.page', description: 'Office of Administrative Trials and Hearings — manage ECB fines and hearings.' },
    ],
    content: [
      {
        type: 'intro',
        body: "If you have received a Notice of Violation (NOV) from the NYC Department of Housing Preservation and Development (HPD) for mold, the clock is already ticking — and it is ticking fast. Under Local Law 55 of 2018, landlords of multiple-dwelling buildings are legally required to maintain tenants' apartments free from mold in all areas under their control. This is not a discretionary obligation. Failure to act within the prescribed window triggers compounding daily fines, potential Emergency Repair Program intervention at your direct expense, and a significant downgrade to your building's BHX Score — which is publicly visible to every prospective tenant and buyer who looks up your address. This guide gives you the complete legal roadmap to correct the violation, communicate properly with your tenant, and certify the correction with HPD before your deadline expires.",
      },
      {
        type: 'statrow',
        stats: [
          { value: '21 days', label: 'Correction deadline for a Class C mold violation before daily fines begin', source: 'NYC HPD' },
          { value: '$25,000', label: 'Maximum ECB civil penalty for wilful or repeated non-compliance', source: 'NYC Admin Code' },
          { value: '2', label: 'Licensed professionals required by law — assessor and remediator must be separate', source: 'NYS Labor Law Article 32' },
        ],
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
      { type: 'leadbait' },
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
      {
        type: 'faq',
        heading: 'Frequently asked questions about HPD mold violations',
        items: [
          {
            q: 'Can I use the same company to assess and remediate the mold?',
            a: 'No. New York State Labor Law Article 32 explicitly prohibits the same licensed entity from performing both the mold assessment and the mold remediation on the same project. The assessor must be independent from the remediator. Any contractor who offers a combined assess-and-fix service is violating state law, and HPD will reject your certification if the same license number appears for both roles.',
          },
          {
            q: 'How long does it take for HPD to process my certification after I file it?',
            a: 'HPD typically processes mold violation certifications within 5 to 10 business days of submission. During this period the violation will still show as open in HPD Online — this is normal and does not mean your filing failed. If the status has not changed after 15 business days, contact HPD directly. A rejected certification will come with a notice explaining what documentation was missing.',
          },
          {
            q: 'What happens if my tenant refuses to let the remediation contractor in?',
            a: 'Send a written notice (certified mail) to the tenant specifying the date, time, and purpose of entry. Document every attempt in writing. If the tenant continues to refuse, you can petition Housing Court for an access order — this demonstrates good faith to HPD and is essential for protecting yourself from fine liability during the access refusal period. Keep HPD informed of the situation by calling your district office.',
          },
          {
            q: 'Do I need a mold violation cleared before I can sell or refinance the building?',
            a: 'Yes, in practice. While HPD violations do not automatically block a sale, lenders conducting due diligence and buyers\' attorneys routinely pull HPD Online records. An open Class B or C mold violation will almost always trigger a lender condition requiring resolution before closing, or will become a price negotiation point. Clear violations before listing wherever possible.',
          },
          {
            q: 'My building had a roof leak fixed six months ago but mold is still appearing. What is happening?',
            a: 'Mold can persist or recur after a moisture source is repaired if the affected building materials were not properly remediated after the leak. Water-damaged drywall, insulation, and wood framing are ongoing mold sources even after the leak stops. A licensed mold assessor needs to inspect and determine whether the existing mold growth pre-dates or post-dates the roof repair, and whether additional remediation of the building materials is required.',
          },
          {
            q: 'What is the difference between HPD mold violations and DOH mold violations?',
            a: 'HPD (Housing Preservation & Development) issues mold violations in residential buildings under Local Law 55 and the Housing Maintenance Code — these are the violations that appear on HPD Online and affect your building\'s record. The NYC Department of Health (DOH/DOHMH) handles mold in schools and public buildings. For residential properties, HPD is the relevant agency and the eCertification portal is where you file corrections.',
          },
        ],
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
    datePublished: '2024-09-01',
    dateModified: '2025-03-01',
    relatedSlugs: ['clear-hpd-mold-violation-nyc', 'what-to-check-before-signing-nyc-lease', 'clear-hpd-heat-violation-nyc'],
    relatedServicePages: [
      { label: 'Pest Control in Brooklyn', href: '/services/pest-control/brooklyn' },
      { label: 'Pest Control in Manhattan', href: '/services/pest-control/manhattan' },
      { label: 'Pest Control in the Bronx', href: '/services/pest-control/bronx' },
    ],
    furtherReading: [
      { slug: 'what-does-a-bed-bug-violation-mean-on-nyc-building-records', title: 'What Does a Bed Bug Violation Mean on NYC Building Records?' },
      { slug: 'is-my-landlord-required-to-pay-for-bed-bug-treatment-in-nyc', title: 'Is My Landlord Required to Pay for Bed Bug Treatment in NYC?' },
      { slug: 'what-to-do-if-your-nyc-landlord-wont-treat-bed-bugs', title: "What to Do if Your NYC Landlord Won't Treat Bed Bugs" },
      { slug: 'how-many-pest-violations-are-too-many-in-an-nyc-building', title: 'How Many Pest Violations Are Too Many in an NYC Building?' },
    ],
    govLinks: [
      { label: 'HPD eCertification Portal', url: 'https://hpdonline.nyc.gov/hpdonline/selfcertify/', description: 'File your Certification of Correction online.' },
      { label: 'Local Law 69 — Bed Bug Disclosure', url: 'https://www.nyc.gov/site/hpd/services-and-information/bedbug.page', description: "HPD's official bed bug disclosure requirements for landlords under Local Law 69 of 2017." },
      { label: 'NYS DEC Pesticide Applicator Licence Lookup', url: 'https://www.dec.ny.gov/chemical/8765.html', description: 'Verify a pest management professional holds a valid NYS DEC licence before hiring.' },
      { label: 'NYC Bed Bug 311 Report', url: 'https://portal.311.nyc.gov/', description: 'File or check the status of a bed bug complaint with the city.' },
      { label: 'ECB/OATH Tribunal', url: 'https://www.nyc.gov/site/oath/index.page', description: 'Manage ECB fines and hearings.' },
    ],
    content: [
      {
        type: 'intro',
        body: "An HPD pest violation means a city inspector has visited your building and confirmed an active infestation. It is now a matter of public record — visible to any tenant, buyer, or journalist who searches your address on HPD Online or BuildingHealthX. Beyond the reputational damage, the legal and financial exposure is significant. Under the NYC Housing Maintenance Code, landlords of multiple dwellings are strictly liable for exterminating pests in all units and common areas under their control. There are no exceptions for new ownership, deferred maintenance, or tenant-caused conditions. This guide explains exactly what you must do, in what order, and what it will cost to clear the violation legally and permanently.",
      },
      {
        type: 'statrow',
        stats: [
          { value: '30 days', label: 'To correct a Class B bed bug or rodent violation before daily fines begin', source: 'NYC HPD' },
          { value: '$25,000', label: 'Maximum ECB penalty for buildings with multiple pest violation cycles', source: 'NYC Admin Code' },
          { value: '2×', label: 'Minimum bed bug treatments required — eggs survive most single applications', source: 'NYC DOHMH' },
        ],
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
      { type: 'leadbait' },
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
      {
        type: 'faq',
        heading: 'Frequently asked questions about HPD pest violations',
        items: [
          {
            q: 'Who is responsible for paying for bed bug extermination — the landlord or the tenant?',
            a: 'Under NYC law, the landlord is responsible for exterminating pests in residential buildings regardless of who introduced the infestation. The exception is if a tenant demonstrably brought infested items into the building — but this is very difficult for landlords to prove and rarely succeeds as a defence at ECB hearings. The safest and legally correct approach is to treat the infestation promptly and document everything.',
          },
          {
            q: 'Can I certify a bed bug violation after just one treatment?',
            a: 'No. HPD requires a minimum of two bed bug treatments, performed 10–14 days apart, because standard chemical treatments do not kill eggs. A certification filed after only one treatment will be rejected. The second treatment must be completed and documented before you file. Your exterminator should provide signed treatment reports for both visits.',
          },
          {
            q: 'What is the Alternative Enforcement Program (AEP) and how do I avoid it?',
            a: 'The AEP is an HPD programme for buildings with persistently high violation rates — typically three or more Class B or C violations within 24 months. AEP designation means mandatory quarterly inspections, public identification on HPD\'s website, and significantly higher oversight costs. The only reliable way to avoid it is to resolve violations promptly, maintain a quarterly IPM pest control contract, and keep common areas and garbage disposal areas clean and sealed.',
          },
          {
            q: 'My exterminator says the tenant is causing the infestation by refusing to prepare the unit. What do I do?',
            a: 'Tenant preparation is your responsibility to ensure, even if the tenant is resistant. Send written preparation instructions (certified mail) and document that they were delivered. If a tenant actively prevents treatment, you can seek an access order from Housing Court. Throughout this process, continue documenting your attempts — this is your primary defence against fine liability while the access issue is being resolved.',
          },
          {
            q: 'How long does it take for an HPD pest violation reinspection to occur?',
            a: 'After you file your Certification of Correction, HPD typically schedules a reinspection within 21 days. During peak complaint periods this can extend to 30 days. The violation will continue to show as open until the inspector visits and marks it complied. Do not assume the violation is cleared just because you filed — continue monitoring HPD Online until the status changes.',
          },
        ],
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
    datePublished: '2024-09-01',
    dateModified: '2025-03-01',
    relatedSlugs: ['clear-hpd-mold-violation-nyc', 'clear-hpd-pest-violation-nyc', 'hire-plumber-nyc-hpd-violation'],
    relatedServicePages: [
      { label: 'HVAC Repair in Brooklyn', href: '/services/hvac-repair/brooklyn' },
      { label: 'HVAC Repair in Manhattan', href: '/services/hvac-repair/manhattan' },
      { label: 'HVAC Repair in the Bronx', href: '/services/hvac-repair/bronx' },
    ],
    furtherReading: [
      { slug: 'how-to-check-heat-complaints-before-renting-in-nyc', title: 'How to Check Heat Complaints Before Renting in NYC' },
      { slug: 'what-temperature-must-nyc-landlords-maintain', title: 'What Temperature Must NYC Landlords Maintain?' },
      { slug: 'how-to-file-a-311-heat-complaint-in-nyc', title: 'How to File a 311 Heat Complaint in NYC' },
      { slug: 'how-to-check-if-a-building-has-chronic-heat-problems', title: 'How to Check if a Building Has Chronic Heat Problems' },
    ],
    govLinks: [
      { label: 'HPD Heat Season Information', url: 'https://www.nyc.gov/site/hpd/services-and-information/heat-hot-water.page', description: "NYC's official heat season rules, tenant rights, and landlord obligations." },
      { label: 'HPD Heat Complaint (311)', url: 'https://portal.311.nyc.gov/', description: 'Report a heat or hot water outage to 311 online.' },
      { label: 'HPD eCertification Portal', url: 'https://hpdonline.nyc.gov/hpdonline/selfcertify/', description: 'File your heat violation Certification of Correction.' },
      { label: 'NYC DOB Boiler Inspection Records', url: 'https://a810-bisweb.nyc.gov/bisweb/bispi00.jsp', description: 'Check boiler permit history and inspection status for any building.' },
      { label: 'ECB/OATH Tribunal', url: 'https://www.nyc.gov/site/oath/index.page', description: 'Manage ECB fines related to heat violations.' },
    ],
    content: [
      {
        type: 'intro',
        body: "A heat or hot water violation from HPD is classified as a Class C — Immediately Hazardous — violation. That is the most serious category HPD issues, and it demands action within 24 hours, not 30 days. During heat season, which runs from October 1 through May 31, NYC law imposes strict minimum temperature requirements on every residential landlord in the city. Missing those requirements even once is grounds for a violation. Missing them repeatedly puts your building on the HPD Heat Watch list, triggers daily fines of up to $1,000 per day, and can result in the city sending its own contractors to fix your boiler and billing you at a significant premium. This guide explains every legal obligation and the exact steps to clear a heat violation before it destroys your operating budget.",
      },
      {
        type: 'statrow',
        stats: [
          { value: '24 hrs', label: 'Maximum time to restore heat after a Class C violation — not 30 days', source: 'NYC HPD' },
          { value: '68°F', label: 'Minimum daytime indoor temp required (6am–10pm) when it\'s below 55°F outside', source: 'NYC Admin Code §27-2029' },
          { value: '$1,000', label: 'Per day maximum fine for repeat heat violations during a single heat season', source: 'NYC HPD' },
        ],
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
      { type: 'leadbait' },
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
      {
        type: 'faq',
        heading: 'Frequently asked questions about HPD heat violations',
        items: [
          {
            q: 'What is the NYC heat season and when does it start?',
            a: 'NYC\'s heat season runs from October 1 through May 31 each year. During this period, landlords must maintain minimum indoor temperatures of 68°F between 6am and 10pm (when outside temperatures drop below 55°F) and 62°F at all times overnight. Hot water at a minimum of 120°F is required year-round, not just during heat season.',
          },
          {
            q: 'My boiler broke in the evening — do I have to wait until the morning to call someone?',
            a: 'No. A heat failure during the heating season is a Class C immediately hazardous violation the moment HPD becomes aware of it — the correction window is 24 hours. You need a licensed HVAC technician on-site as soon as possible, and you must provide electric space heaters to affected tenants in the meantime. After-hours emergency HVAC rates are expensive, but they are far cheaper than ERP intervention or daily fines.',
          },
          {
            q: 'Can a tenant call 311 about heat even if the outside temperature is above 55°F?',
            a: 'Yes. The overnight requirement (62°F from 10pm to 6am) applies regardless of outside temperature during the heat season. A tenant who is cold at 2am on a 58°F October night can file a valid complaint, and if an inspector finds the temperature below 62°F, a violation will be issued. The daytime threshold only triggers when outside temperatures drop below 55°F.',
          },
          {
            q: 'What is the HPD Heat Line and how does it help?',
            a: 'The HPD Heat Line (718-840-4200) is a direct reporting line for landlords to notify HPD that heat has been restored after a failure. Calling it as soon as heat is restored can help stop the fine accrual clock while your formal eCertification is processed. It does not replace the eCertification filing — you still need to file online — but it creates a contemporaneous record of restoration that is useful at ECB hearings.',
          },
          {
            q: 'Do I need a DOB permit to replace my boiler?',
            a: 'Yes. Boiler replacements always require a NYC Department of Buildings boiler permit and a post-installation inspection. The licensed HVAC contractor must file the permit before work begins. After installation, a DOB boiler inspector visits to sign off. This process typically takes 5–15 business days for inspection scheduling. Without the DOB sign-off, HPD may reject your certification for major boiler work.',
          },
          {
            q: 'How do I prevent my building from being placed on HPD Heat Watch?',
            a: 'Buildings with three or more heat complaints in a single heat season are flagged for Heat Watch designation. The most effective prevention is annual boiler servicing before October 1 — replacing worn parts, bleeding the system, testing all zone valves and thermostats, and ensuring adequate fuel supply. Many HVAC companies offer pre-season boiler tune-ups specifically for this purpose. Keep records of all maintenance to show HPD proactive compliance.',
          },
        ],
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
    datePublished: '2024-09-01',
    dateModified: '2025-03-01',
    relatedSlugs: ['clear-hpd-mold-violation-nyc', 'clear-hpd-heat-violation-nyc', 'clear-hpd-electrical-violation-nyc'],
    relatedServicePages: [
      { label: 'Plumbers in Brooklyn', href: '/services/plumbers/brooklyn' },
      { label: 'Plumbers in Manhattan', href: '/services/plumbers/manhattan' },
      { label: 'Plumbers in the Bronx', href: '/services/plumbers/bronx' },
    ],
    furtherReading: [
      { slug: 'what-are-class-a-b-and-c-violations-in-nyc', title: 'What Are Class A, B and C Violations in NYC?' },
      { slug: 'what-does-an-open-hpd-violation-mean', title: 'What Does an Open HPD Violation Mean?' },
      { slug: 'how-to-check-if-hpd-violations-were-actually-fixed', title: 'How to Check If HPD Violations Were Actually Fixed' },
      { slug: 'how-long-do-landlords-have-to-fix-hpd-violations', title: 'How Long Do Landlords Have to Fix HPD Violations?' },
    ],
    govLinks: [
      { label: 'NYC DOB Licence Verification', url: 'https://a810-bisweb.nyc.gov/bisweb/LicenseQueryServlet', description: 'Verify a NYC Master Plumber licence is active before hiring.' },
      { label: 'DOB NOW — Permit Filing', url: 'https://a810-bisweb.nyc.gov/bisweb/bispi00.jsp', description: 'Check permit status or verify a permit was filed for work at your building.' },
      { label: 'HPD eCertification Portal', url: 'https://hpdonline.nyc.gov/hpdonline/selfcertify/', description: 'File your plumbing violation Certification of Correction.' },
      { label: 'NYC HPD Online — Violation Search', url: 'https://hpdonline.nyc.gov', description: "Search any building's full HPD violation and complaint history." },
      { label: 'ECB/OATH Tribunal', url: 'https://www.nyc.gov/site/oath/index.page', description: 'Office of Administrative Trials and Hearings — dispute or pay ECB fines.' },
    ],
    content: [
      {
        type: 'intro',
        body: "Receiving an HPD plumbing violation — whether for a leaking pipe, defective faucet, failed drain, inadequate water pressure, or sewer backup — means you need a licensed plumber, not a handyman, not a general contractor, and not your building's maintenance staff. NYC has some of the most stringent plumbing licensing requirements in the country, and work performed without the correct license cannot be certified through HPD's portal, cannot receive a DOB sign-off, and will generate additional violations on top of the one you are already trying to clear. Hiring wrong is more expensive than hiring right. This guide tells you exactly what to look for, what to pay, and how the certification process works.",
      },
      {
        type: 'statrow',
        stats: [
          { value: '90 days', label: 'To correct a Class A plumbing violation (minor leaks, dripping faucets)', source: 'NYC HPD' },
          { value: '24 hrs', label: 'To correct a Class C plumbing violation (sewer backup, no water supply)', source: 'NYC HPD' },
          { value: '$150/day', label: 'Maximum daily fine for an uncorrected Class C plumbing violation', source: 'NYC Admin Code' },
        ],
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
      { type: 'leadbait' },
      {
        type: 'h2',
        heading: 'Step 2: DOB Permit Requirements — When You Need One and Why',
      },
      {
        type: 'body',
        body: "This is the most misunderstood aspect of HPD plumbing violation clearance. Most landlords assume that hiring a licensed plumber and doing the work is sufficient. It is not. Most plumbing repairs that address an HPD violation require a NYC Department of Buildings (DOB) plumbing permit to be filed before work begins. Work performed without a permit that required one creates a compounding problem:",
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
      {
        type: 'faq',
        heading: 'Frequently asked questions about HPD plumbing violations',
        items: [
          {
            q: 'Can a general contractor do the plumbing work to clear an HPD violation?',
            a: 'No. All plumbing work in NYC multi-unit residential buildings must be performed by or under the direct supervision of a licensed NYC Master Plumber. A general contractor can manage the overall project but cannot perform or certify the plumbing work itself. HPD will ask for the Master Plumber\'s license number when you file your certification — if you cannot provide one, your filing will be rejected.',
          },
          {
            q: 'What is the difference between a Master Plumber and a journeyman plumber in NYC?',
            a: 'A Master Plumber holds a NYC DOB-issued license allowing them to operate independently, file permits, and take legal responsibility for plumbing work. A journeyman (or licensed plumber) can perform plumbing work but must work under a Master Plumber\'s supervision and cannot file permits independently. When hiring for HPD violation work, always confirm the contractor holds an active Master Plumber license, not just a journeyman license.',
          },
          {
            q: 'How long does a DOB plumbing permit inspection take?',
            a: 'After the work is complete and your Master Plumber files for inspection through DOB NOW, the inspection is typically scheduled within 3–10 business days. During busy periods (post-storm, late fall) this can extend to 2 weeks. Your Master Plumber can request expedited inspection in urgent cases by paying an expedite fee, which is worth considering for violations with tight deadlines.',
          },
          {
            q: 'My HPD violation says "defective plumbing" but the leak was caused by the tenant. Am I still responsible?',
            a: 'Yes. As the landlord of record, you are legally responsible for the condition regardless of how it occurred. HPD does not adjudicate between landlord and tenant fault — the violation is against the building owner. You may have a civil claim against the tenant for the cost of repairs if you can document they caused the damage, but you must still fix the plumbing and certify the correction on your HPD timeline regardless.',
          },
          {
            q: 'Do I need a permit to replace a toilet or sink in a rental apartment?',
            a: 'A like-for-like replacement of a toilet or sink in the same location, without modifying the supply or drain connections, generally does not require a DOB permit. However, if the fixture is being relocated or the connections are being extended or rerouted, a permit is required. When in doubt, ask your licensed Master Plumber before work begins — they are responsible for knowing what requires a permit and must not perform work that triggers permit requirements without filing.',
          },
        ],
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
    datePublished: '2024-09-01',
    dateModified: '2025-03-01',
    relatedSlugs: ['clear-hpd-mold-violation-nyc', 'clear-hpd-pest-violation-nyc', 'clear-hpd-heat-violation-nyc'],
    relatedServicePages: [
      { label: 'Building Inspectors in Manhattan', href: '/services/building-inspectors/manhattan' },
      { label: 'Building Inspectors in Brooklyn', href: '/services/building-inspectors/brooklyn' },
      { label: 'Building Inspectors in Queens', href: '/services/building-inspectors/queens' },
    ],
    furtherReading: [
      { slug: 'what-does-an-open-hpd-violation-mean', title: 'What Does an Open HPD Violation Mean?' },
      { slug: 'how-to-check-if-an-nyc-apartment-is-rent-stabilized', title: 'How to Check If an NYC Apartment Is Rent Stabilised' },
      { slug: 'can-i-rent-an-apartment-with-active-hpd-violations', title: 'Can I Rent an Apartment with Active HPD Violations?' },
      { slug: 'what-are-immediately-hazardous-violations-in-nyc', title: 'What Are Immediately Hazardous Violations in NYC?' },
    ],
    govLinks: [
      { label: 'NYC HPD Online — Violation & Complaint Search', url: 'https://hpdonline.nyc.gov', description: "Search any building's full HPD violation and 311 complaint history by address." },
      { label: 'Who Owns What — Landlord Portfolio Lookup', url: 'https://whoownswhat.justfix.org', description: "See a landlord's entire NYC portfolio and cross-building complaint rates." },
      { label: 'ACRIS — Property Ownership Records', url: 'https://a836-acris.nyc.gov', description: 'Search NYC property ownership history, mortgage records, and deed transfers.' },
      { label: 'NYC Housing Court Records', url: 'https://iapps.courts.state.ny.us/nyscef/HomePage', description: 'Search for eviction filings and HPD litigation by landlord name or address.' },
      { label: 'DHCR Rent History Lookup', url: 'https://apps.hcr.ny.gov/BuildingSearch/', description: "Check whether an apartment is rent-stabilised and request its official rent history." },
      { label: 'NYC DOB Certificate of Occupancy Search', url: 'https://a810-bisweb.nyc.gov/bisweb/COsByLocationServlet', description: "Verify a building's Certificate of Occupancy is current and matches the legal use." },
    ],
    content: [
      {
        type: 'intro',
        body: "In NYC's rental market, tenants are frequently pressured to sign immediately or lose the apartment. That urgency is manufactured. The reality is that every residential building in New York City has years of public data available within minutes — violation history, complaint records, landlord court filings, ownership changes, and financial health indicators. A landlord who discourages you from doing this research is a landlord with something to hide. This checklist tells you every public database you should check, what red flags look like, and what you can legitimately use as leverage before signing.",
      },
      {
        type: 'statrow',
        stats: [
          { value: '6 min', label: 'Average time to pull a building\'s complete HPD violation and complaint history on BHX', source: 'Building Health X' },
          { value: '250K+', label: 'Open HPD violations across NYC at any given time — many in buildings being actively marketed', source: 'NYC HPD' },
          { value: '$0', label: 'Cost to check HPD Online, Who Owns What, ACRIS, and Housing Court records before signing', source: 'NYC Open Data' },
        ],
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
      { type: 'leadbait' },
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
      {
        type: 'faq',
        heading: 'Frequently asked questions about NYC lease due diligence',
        items: [
          {
            q: 'Is it legal for a landlord to rent an apartment with open HPD violations?',
            a: 'Technically yes — there is no blanket prohibition on renting a unit with open violations. However, a landlord with open Class C (immediately hazardous) violations is in ongoing breach of their legal obligations. More importantly, signing a lease does not protect you from those conditions — it means you will live with them. Always check HPD Online before signing and negotiate remediation of any open violations as a lease condition.',
          },
          {
            q: 'What is the BHX Score and how is it calculated?',
            a: 'The Building Health X Score is a 0–100 composite rating that aggregates data from multiple NYC open data sources: HPD violation counts and classes, 311 complaint history and trends, landlord housing court litigation records, pest inspection results, eviction filings, and neighbourhood context. Category sub-scores show how a building performs in specific dimensions — pest control, heat reliability, water safety, and building stability — which are often more useful than the overall composite.',
          },
          {
            q: 'How do I check if an NYC apartment is rent-stabilised?',
            a: 'Search the building address at apps.hcr.ny.gov (DHCR\'s Building Search). You can also request the official rent history for a specific apartment from DHCR, which will show all registered legal rents going back to 1984. If the landlord claims an apartment is market-rate but the building was built before 1974 and has six or more units, treat that claim with scepticism and verify through DHCR.',
          },
          {
            q: 'What is the Alternative Enforcement Program (AEP) and should I avoid AEP buildings?',
            a: 'The AEP is an HPD designation for buildings with persistently high violation rates. AEP buildings are legally required to post this designation at the building entrance. While AEP buildings are under heightened oversight — which theoretically pushes landlords to improve — the designation indicates chronic problems. Whether to rent in an AEP building depends on whether violations are being actively cleared. Check the trend in violation counts, not just the total.',
          },
          {
            q: 'Can I negotiate with a landlord based on HPD violation records?',
            a: 'Yes, and you should. Open violations — especially Class B and C — give you legitimate leverage for rent reductions, free months, or lease conditions requiring the landlord to remediate specific issues before move-in. Frame the negotiation around the risk the violations pose to you as a tenant rather than as criticism of the landlord. A written addendum to the lease specifying conditions that must be resolved is enforceable and protects you if the landlord fails to follow through.',
          },
          {
            q: 'Is a landlord required to give me the bedbug history of the apartment before I sign?',
            a: 'Yes. Under Local Law 69 of 2017, landlords must provide a written disclosure of the bedbug infestation history for both the specific apartment and the entire building for the 12 months prior to the new tenancy. This disclosure must be provided at lease signing. If your landlord does not provide it, they are in violation of NYC law. Do not sign without this disclosure — request it in writing and keep a copy.',
          },
        ],
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
    datePublished: '2024-09-01',
    dateModified: '2025-03-01',
    relatedSlugs: ['hire-plumber-nyc-hpd-violation', 'clear-hpd-mold-violation-nyc', 'what-to-check-before-signing-nyc-lease'],
    relatedServicePages: [
      { label: 'Electricians in Brooklyn', href: '/services/electricians/brooklyn' },
      { label: 'Electricians in Manhattan', href: '/services/electricians/manhattan' },
      { label: 'Electricians in the Bronx', href: '/services/electricians/bronx' },
    ],
    furtherReading: [
      { slug: 'how-to-look-up-gas-and-electrical-safety-violations', title: 'How to Look Up Gas and Electrical Safety Violations' },
      { slug: 'how-to-check-if-smoke-detectors-are-code-compliant', title: 'How to Check If Smoke Detectors Are Code Compliant' },
      { slug: 'does-my-nyc-apartment-need-to-have-a-smoke-detector', title: 'Does My NYC Apartment Need to Have a Smoke Detector?' },
      { slug: 'what-are-ecb-violations-and-should-i-care', title: 'What Are ECB Violations and Should I Care?' },
    ],
    govLinks: [
      { label: 'NYC DOB Master Electrician Licence Lookup', url: 'https://a810-bisweb.nyc.gov/bisweb/LicenseQueryServlet', description: 'Verify a NYC Master Electrician licence is active and in good standing.' },
      { label: 'DOB NOW — Electrical Permit Status', url: 'https://a810-bisweb.nyc.gov/bisweb/bispi00.jsp', description: 'Check whether an electrical permit was filed and inspect its status.' },
      { label: 'HPD eCertification Portal', url: 'https://hpdonline.nyc.gov/hpdonline/selfcertify/', description: 'File your electrical violation Certification of Correction with HPD.' },
      { label: 'ECB/OATH Tribunal', url: 'https://www.nyc.gov/site/oath/index.page', description: 'Contest or pay ECB fines for electrical violations at the OATH Tribunal.' },
      { label: 'NYC Fire Department — Smoke Detector Rules', url: 'https://www.nyc.gov/site/fdny/fire-safety/safety-tips/smoke-detector.page', description: 'FDNY requirements for smoke and carbon monoxide detectors in NYC buildings.' },
    ],
    content: [
      {
        type: 'intro',
        body: "Electrical violations in NYC buildings come from two different agencies — HPD and DOB — and the correction process for each is distinct. HPD issues electrical violations under the Housing Maintenance Code for conditions that directly affect tenant safety: faulty outlets, exposed wiring, missing smoke detectors, inoperative CO detectors, and overloaded circuits. DOB issues electrical violations under the Building Code for structural electrical issues: outdated panels, unpermitted electrical work, failed inspections, and code non-compliance. Both carry significant financial penalties if not corrected correctly and on time, and both require a licensed Master Electrician to perform the work. Using anyone else — including a journeyman working independently, a general contractor, or maintenance staff — will result in your certification being rejected and your fine clock continuing to run.",
      },
      {
        type: 'statrow',
        stats: [
          { value: '21 days', label: 'To correct a Class C HPD electrical violation (exposed wiring, faulty outlets)', source: 'NYC HPD' },
          { value: '$25,000', label: 'Maximum ECB penalty for wilful or repeat electrical non-compliance', source: 'NYC Admin Code' },
          { value: '10 ft', label: 'Maximum distance from any bedroom where a working smoke detector must be installed', source: 'NYC FDNY' },
        ],
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
        heading: "Step 1: Verify Your Electrician's License — Two Layers",
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
      { type: 'leadbait' },
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
      {
        type: 'faq',
        heading: 'Frequently asked questions about HPD electrical violations',
        items: [
          {
            q: 'What is the difference between an HPD electrical violation and a DOB electrical violation?',
            a: 'HPD violations are issued under the Housing Maintenance Code and typically relate to immediate tenant safety issues — faulty outlets, exposed wiring, missing or broken smoke/CO detectors. DOB violations relate to building code compliance — unpermitted electrical work, outdated panels, failed inspections. Both use the ECB system for fines, but they have separate correction portals and separate hearing processes. A single electrical problem can result in violations from both agencies simultaneously.',
          },
          {
            q: 'Do I need a permit to replace a smoke detector in NYC?',
            a: 'A direct like-for-like replacement of a smoke or CO detector in the same location generally does not require a DOB electrical permit. However, if you are adding new detectors, relocating existing ones, or wiring them into the building\'s electrical system (hardwired units), a permit is required. Given that smoke detector violations are a common HPD compliance issue, it is worth having a licensed electrician assess your entire building\'s detector situation rather than replacing units piecemeal.',
          },
          {
            q: 'Can I use an out-of-state licensed electrician for HPD violation work in NYC?',
            a: 'No. New York City requires a NYC DOB-issued Master Electrician license for electrical work in residential buildings. An out-of-state license — even from New Jersey, Connecticut, or another state — does not satisfy this requirement. The NYC Master Electrician license is issued separately from any state license. Verify the specific NYC DOB license number through the DOB\'s online verification portal before hiring.',
          },
          {
            q: 'How do ECB hearings work and can I reduce my fine?',
            a: 'ECB hearings at the OATH Tribunal are administrative proceedings, not criminal court. You present evidence and the hearing officer decides on dismissal, reduced penalty, or full penalty. The most effective arguments for reduction are: the violation was corrected promptly (ideally within the original window); you acted in good faith; you have no prior violations of this type; and the violation was minor. Bring all documentation — permit sign-offs, contractor invoices, dated photos. Judges routinely reduce fines by 50–75% for first-time landlords who corrected promptly.',
          },
          {
            q: 'What happens if I do the electrical work myself to save money?',
            a: 'Do not do this. Unlicensed electrical work in a residential building with multiple units is illegal in NYC, voids your insurance, and will result in HPD rejecting your certification. If an inspector discovers the work was done without a licensed Master Electrician, you will receive a new violation for the unlicensed work on top of the original violation. The cost savings are entirely illusory — one rejected certification plus the resulting fine escalation will cost more than any legitimate electrician would have charged.',
          },
        ],
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


// ─────────────────────────────────────────────────────────────────────────────
// MONEY PAGE 1: Break your lease due to violations
// Intent bucket: Escaping | Service: Moving Companies
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'how-to-break-lease-nyc-violations',
  category: 'inspections-leasing',
  title: 'How to Break Your NYC Lease Due to Landlord Violations',
  metaTitle: 'How to Break Your NYC Lease Due to Landlord Violations | Building Health X',
  metaDescription: 'NYC tenants can legally break a lease when a landlord fails to fix violations. Learn constructive eviction, the warranty of habitability, required notice steps, and how to get your deposit back.',
  headline: 'How to Break Your NYC Lease When Your Landlord Won\'t Fix Violations',
  subheadline: 'The exact legal process for NYC tenants who want out — constructive eviction, warranty of habitability breaches, required documentation, and how to protect your deposit.',
  serviceSlug: 'moving-companies',
  serviceName: 'Moving Companies',
  leadBaitCta: 'Ready to move? Get free quotes from vetted NYC movers.',
  datePublished: '2024-11-01',
  dateModified: '2025-03-01',
  relatedSlugs: ['what-to-check-before-signing-nyc-lease', 'get-security-deposit-back-nyc', 'clear-hpd-mold-violation-nyc'],
  relatedServicePages: [
    { label: 'Moving companies in Manhattan', href: '/services/moving-companies/manhattan' },
    { label: 'Moving companies in Brooklyn', href: '/services/moving-companies/brooklyn' },
    { label: 'Moving companies in Queens', href: '/services/moving-companies/queens' },
    { label: 'Moving companies in the Bronx', href: '/services/moving-companies/bronx' },
    { label: 'Moving companies in Staten Island', href: '/services/moving-companies/staten-island' },
  ],
  furtherReading: [
    { slug: 'what-does-an-open-hpd-violation-mean', title: 'What Does an Open HPD Violation Mean?' },
    { slug: 'can-i-get-a-rent-reduction-if-my-landlord-has-open-violations', title: 'Can I Get a Rent Reduction If My Landlord Has Open Violations?' },
    { slug: 'what-are-immediately-hazardous-violations-in-nyc', title: 'What Are Immediately Hazardous Violations in NYC?' },
  ],
  govLinks: [
    { label: 'NY Real Property Law §235-b (Warranty of Habitability)', url: 'https://codes.findlaw.com/ny/real-property-law/rpy-sect-235-b.html', description: 'The statutory basis for your right to break a lease over uninhabitable conditions.' },
    { label: 'NYC Housing Court — HP Proceedings', url: 'https://www.courts.state.ny.us/courts/nyc/housing/', description: 'File a Housing Part case to force repairs or document breach for lease termination.' },
    { label: 'HPD Online — Violation Search', url: 'https://hpdonline.nyc.gov', description: 'Pull the official violation record you\'ll need to document your landlord\'s breach.' },
    { label: 'NYC Legal Aid Society — Tenant Resources', url: 'https://www.legalaidnyc.org/', description: 'Free legal help for eligible tenants facing habitability and lease issues.' },
  ],
  content: [
    {
      type: 'intro',
      body: "Breaking a lease early in NYC typically costs you — forfeited deposit, remaining rent, legal fees. But when a landlord allows uninhabitable conditions to persist despite proper notice, the law flips. Under New York Real Property Law §235-b, a landlord\'s failure to maintain a habitable apartment can constitute a material breach of the lease, giving you a legal pathway to terminate without penalty. This guide explains exactly when that applies, how to document it properly, and what to do step by step so you leave clean — without owing your landlord anything.",
    },
    {
      type: 'statrow',
      stats: [
        { value: '§235-b', label: 'New York Real Property Law — your statutory right to a habitable apartment that cannot be waived in any lease', source: 'NY State Law' },
        { value: '2× rent', label: 'What a landlord owes you in punitive damages if they wrongfully withhold your security deposit after you leave', source: 'NY General Obligations Law §7-108' },
        { value: '14 days', label: 'Time landlord has to return your deposit or itemize deductions after your tenancy ends', source: 'NY General Obligations Law §7-108' },
      ],
    },
    {
      type: 'h2',
      heading: 'When Can You Legally Break Your NYC Lease?',
    },
    {
      type: 'body',
      body: "NYC lease termination without penalty is available under two related but distinct legal theories. Both require documentation — the stronger your paper trail, the better your position.",
    },
    {
      type: 'table',
      rows: [
        ['Legal theory', 'What it means', 'Strength of claim'],
        ['Warranty of Habitability breach', 'Landlord failed to maintain a safe, liveable apartment', 'Strong if conditions are documented + landlord was notified'],
        ['Constructive Eviction', 'Conditions are so severe you were effectively forced to leave', 'Very strong but requires you to actually vacate — risky if done wrong'],
        ['Actual eviction / lease violation', 'Landlord violated the lease (illegal entry, harassment, shutting off utilities)', 'Strong — document every incident with dates'],
        ['Military deployment', 'Active duty orders (SCRA)', 'Absolute right — no negotiation needed'],
        ['Domestic violence (VAWA)', 'You are a victim of domestic violence', 'Absolute right under NY RPL §227-c'],
      ],
    },
    {
      type: 'body',
      body: "The most common successful lease break for renters in NYC is the warranty of habitability route — particularly when the condition involves mold, pests, lack of heat, or structural hazards, and the landlord has been formally notified via HPD complaint and has open Class B or C violations.",
    },
    {
      type: 'h2',
      heading: 'Step 1: Build an Unassailable Documentation File',
    },
    {
      type: 'step',
      stepNumber: 1,
      heading: 'Create a chronological paper trail starting today',
      body: 'Courts and landlords alike respond to documentation. If you do not have a written record of the problem and your attempts to get it fixed, you are significantly weakened in any dispute. Start building this file immediately.',
      items: [
        'Pull your building\'s full HPD violation record at hpdonline.nyc.gov — screenshot it with today\'s date visible. Every open violation is evidence.',
        'Take dated photos and video of every affected area in the apartment — mold, no heat, pest activity, structural damage, broken fixtures.',
        'Compile every written communication with your landlord about the condition — emails, texts, building app messages. If you have had verbal-only conversations, send a follow-up email confirming what was said: "Confirming our conversation today — you said the boiler would be fixed by Friday."',
        'If you have filed 311 complaints, print the confirmation numbers and complaint descriptions from the 311 online portal.',
      ],
    },
    {
      type: 'h2',
      heading: 'Step 2: Send Formal Written Notice to Your Landlord',
    },
    {
      type: 'step',
      stepNumber: 2,
      heading: 'Send a notice of breach by certified mail',
      body: 'Before you can break the lease, you must give your landlord a formal written notice of the breach and a reasonable opportunity to remedy it. This protects you legally — it shows you gave them a chance to fix the problem before you left.',
      items: [
        'Write a concise letter identifying: the specific conditions that breach the warranty of habitability, the dates you first reported them, the HPD violation numbers if any, and a clear deadline for correction (typically 10–14 days for serious conditions).',
        'Send it via certified mail with return receipt requested to the landlord\'s registered address (search ACRIS if unsure of the correct entity) AND via email.',
        'Keep the green return card when it comes back — that proves delivery.',
        'If the landlord does not respond or fails to correct within your stated deadline, this letter becomes the foundation of your lease termination claim.',
      ],
    },
    {
      type: 'tip',
      body: "Send the notice to the landlord's legal entity as listed on your lease AND to the managing agent if there is one. Sending to just the super or a property manager does not always constitute legal notice to the landlord — courts have dismissed breach claims on this technicality.",
    },
    {
      type: 'leadbait',
    },
    {
      type: 'h2',
      heading: 'Step 3: File an HP Proceeding in Housing Court',
    },
    {
      type: 'step',
      stepNumber: 3,
      heading: 'Create an official court record of the breach',
      body: 'An HP (Housing Part) proceeding is a court order requiring your landlord to make specific repairs. Filing one achieves two things: it forces the repair process through the court system, and it creates an official legal record of the landlord\'s non-compliance that massively strengthens any subsequent lease termination claim.',
      items: [
        'File at NYC Housing Court — no attorney required, the court\'s Help Center can assist you. There is no filing fee for tenants in HP proceedings.',
        'The court will schedule an inspection by an HPD housing specialist who will document all conditions in writing.',
        'If the judge orders repairs and the landlord still does not comply, you have powerful evidence for constructive eviction.',
        'The HP proceeding stays on the building\'s court record — it also protects future tenants and may cause the landlord to settle rather than fight.',
      ],
    },
    {
      type: 'h2',
      heading: 'Step 4: Send Your Lease Termination Letter',
    },
    {
      type: 'step',
      stepNumber: 4,
      heading: 'Give proper notice of termination',
      body: 'If the landlord has failed to cure the breach after formal notice, you can now send your lease termination letter. This is a separate, distinct document from your notice of breach.',
      items: [
        'State clearly that you are terminating the lease as of a specific date (typically 30 days out) due to the landlord\'s material breach of the warranty of habitability under NY RPL §235-b.',
        'Reference the specific conditions, your earlier notice letter and its date, and any HPD violations or court proceedings by case number.',
        'State that you expect the full return of your security deposit within 14 days of vacating, per NY General Obligations Law §7-108.',
        'Send via certified mail with return receipt — and also email so you have a timestamp.',
        'Do NOT abandon the apartment without sending this letter. Abandonment without proper notice is treated differently from legal termination and can result in liability for remaining rent.',
      ],
    },
    {
      type: 'warning',
      body: "Constructive eviction requires you to actually vacate within a reasonable time of the intolerable conditions. If you stay in the apartment for an extended period after claiming the conditions are uninhabitable, courts will often find you waived the claim. If you plan to use constructive eviction, you need to leave — not stay and keep fighting from inside.",
    },
    {
      type: 'h2',
      heading: 'Getting Your Security Deposit Back',
    },
    {
      type: 'body',
      body: "Under NY General Obligations Law §7-108, your landlord has 14 days from the end of the tenancy to either return your full deposit or send you an itemized list of deductions with receipts. If they fail to do this within 14 days, they forfeit their right to make any deductions — and you are entitled to the full amount. If they withhold it wrongfully, you can sue in Small Claims Court for up to 2× the deposit amount in punitive damages, plus the deposit itself.",
    },
    {
      type: 'table',
      rows: [
        ['What landlords can deduct', 'What they cannot deduct'],
        ['Damage beyond normal wear and tear', 'Painting after a normal tenancy'],
        ['Missing keys or lock replacement', 'General cleaning if apartment was left reasonably clean'],
        ['Unpaid rent (with documentation)', 'Repairs for pre-existing conditions'],
        ['Repairs for tenant-caused damage', 'Deductions without receipts after the 14-day window'],
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about breaking an NYC lease over violations',
      items: [
        {
          q: 'Can I just stop paying rent and leave if my apartment is uninhabitable?',
          a: 'No. Stopping rent without following the proper legal procedure — written notice, reasonable cure period, formal termination — exposes you to eviction proceedings and a judgment for unpaid rent that can affect your credit. The legal route takes slightly longer but protects you completely. The steps in this guide are the correct sequence.',
        },
        {
          q: 'My landlord has HPD violations but says the conditions aren\'t that bad. Do I have a case?',
          a: 'Open Class B or C HPD violations are strong objective evidence that conditions breach the housing code — your landlord cannot simply characterize them away. Class C violations are classified as "immediately hazardous" by a trained city inspector. Courts give significant weight to HPD violation records. The more violations, the older they are, and the higher their class, the stronger your breach claim.',
        },
        {
          q: 'Do I need a lawyer to break my lease due to violations?',
          a: 'Not necessarily. Tenants can file HP proceedings and send breach notices without an attorney. However, if your landlord retaliates, refuses to return the deposit, or files an eviction proceeding against you, having a tenant attorney is strongly advisable. NYC Legal Aid Society offers free services to eligible tenants. Many tenant attorneys also take cases on contingency for deposit disputes.',
        },
        {
          q: 'What if my lease has a clause saying I waive the right to terminate?',
          a: 'That clause is unenforceable under New York law. The warranty of habitability under NY RPL §235-b explicitly cannot be waived by any lease provision or tenant agreement. Courts routinely void such clauses. Do not let a landlord intimidate you with lease language that New York law makes void.',
        },
        {
          q: 'I\'m on a month-to-month tenancy, not a fixed lease. Is this different?',
          a: 'Month-to-month tenants have the same warranty of habitability rights as fixed-term lease tenants. The termination process is somewhat simpler — you give proper notice (typically 30 days, or whatever your lease specifies for month-to-month termination) with documentation of the breach. The landlord cannot retaliate against a month-to-month tenant for a habitability complaint within 180 days of the complaint under NY RPL §223-b.',
        },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// MONEY PAGE 2: Get your security deposit back
// Intent bucket: Escaping | Service: Cleaning Services
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'get-security-deposit-back-nyc',
  category: 'inspections-leasing',
  title: 'How to Get Your Security Deposit Back in NYC',
  metaTitle: 'How to Get Your Security Deposit Back in NYC | Building Health X',
  metaDescription: 'NYC landlords have 14 days to return your deposit or lose the right to deduct anything. Learn the exact law, what they can and cannot deduct, and how to sue in Small Claims Court.',
  headline: 'How to Get Your Security Deposit Back in NYC',
  subheadline: 'The exact law on deductions, the 14-day deadline, move-out walkthrough strategy, and how to take a landlord to Small Claims Court and win.',
  serviceSlug: 'cleaning-services',
  serviceName: 'Cleaning Services',
  leadBaitCta: 'Leave the apartment spotless — get free quotes from NYC move-out cleaners.',
  datePublished: '2024-11-01',
  dateModified: '2025-03-01',
  relatedSlugs: ['how-to-break-lease-nyc-violations', 'what-to-check-before-signing-nyc-lease', 'clear-hpd-mold-violation-nyc'],
  relatedServicePages: [
    { label: 'Cleaning services in Manhattan', href: '/services/cleaning-services/manhattan' },
    { label: 'Cleaning services in Brooklyn', href: '/services/cleaning-services/brooklyn' },
    { label: 'Cleaning services in Queens', href: '/services/cleaning-services/queens' },
    { label: 'Cleaning services in the Bronx', href: '/services/cleaning-services/bronx' },
    { label: 'Cleaning services in Staten Island', href: '/services/cleaning-services/staten-island' },
  ],
  furtherReading: [
    { slug: 'how-to-check-if-an-nyc-apartment-is-rent-stabilized', title: 'How to Check If an NYC Apartment Is Rent Stabilised' },
    { slug: 'can-i-get-a-rent-reduction-if-my-landlord-has-open-violations', title: 'Can I Get a Rent Reduction If My Landlord Has Open Violations?' },
    { slug: 'what-does-an-open-hpd-violation-mean', title: 'What Does an Open HPD Violation Mean?' },
  ],
  govLinks: [
    { label: 'NY General Obligations Law §7-108', url: 'https://codes.findlaw.com/ny/general-obligations-law/gob-sect-7-108.html', description: 'The NYC security deposit law — 14-day return deadline, itemization requirements, and penalties for wrongful withholding.' },
    { label: 'NYC Small Claims Court', url: 'https://www.courts.state.ny.us/courts/nyc/smallclaims/', description: 'File a Small Claims Court case against your landlord for up to $10,000 without an attorney.' },
    { label: 'NYC Tenant Rights Guide (HPD)', url: 'https://www.nyc.gov/site/hpd/renters/tenant-rights.page', description: 'Official HPD guide to tenant rights in NYC.' },
  ],
  content: [
    {
      type: 'intro',
      body: "Your security deposit is your money. Under New York law, your landlord holds it in trust — they do not own it and cannot spend it. When your tenancy ends, they have exactly 14 days to return it in full or send you an itemized statement of deductions with supporting documentation. Miss that window, and they forfeit every right to deduct a single dollar. This guide explains the law precisely, tells you exactly how to protect yourself before you leave, and walks you through Small Claims Court if the landlord tries to steal your deposit anyway.",
    },
    {
      type: 'statrow',
      stats: [
        { value: '14 days', label: 'Landlord\'s deadline to return your deposit or itemize deductions — after that they forfeit all deductions', source: 'NY General Obligations Law §7-108' },
        { value: '2×', label: 'Punitive damages you can win in court on top of the deposit if the landlord withholds it in bad faith', source: 'NY General Obligations Law §7-108' },
        { value: '$10,000', label: 'Maximum claim in NYC Small Claims Court — no attorney required to file', source: 'NYC Courts' },
      ],
    },
    {
      type: 'h2',
      heading: 'Step 1: The Move-Out Walkthrough — Your Most Important Protection',
    },
    {
      type: 'step',
      stepNumber: 1,
      heading: 'Request a joint move-out inspection with your landlord',
      body: 'Under NY General Obligations Law §7-108(1-a), you have the right to request a pre-departure inspection by the landlord before you vacate. This is one of the most underused tenant protections in New York. The landlord must give you written notice of any conditions they intend to deduct for — and then give you the opportunity to cure those conditions before you leave.',
      items: [
        'Send a written request for a pre-departure inspection at least a week before your move-out date.',
        'If the landlord agrees, attend the walkthrough with your phone recording video the entire time.',
        'Note every condition they flag — you then have the right to clean or repair those items before turning in the keys.',
        'If the landlord refuses the walkthrough or fails to schedule it, they may forfeit their right to claim deductions for those conditions. Document the refusal in writing.',
        'Take a comprehensive video of every room, every surface, every appliance, and every fixture immediately before handing back the keys. Time-stamp everything.',
      ],
    },
    {
      type: 'h2',
      heading: 'Step 2: What Landlords Can and Cannot Deduct',
    },
    {
      type: 'body',
      body: "The most common source of wrongful deductions is landlords blurring the line between 'normal wear and tear' — which you are not responsible for — and actual damage. New York law is clear on this distinction.",
    },
    {
      type: 'table',
      rows: [
        ['Landlord CAN deduct', 'Landlord CANNOT deduct'],
        ['Holes in walls beyond normal picture-hanging', 'Small nail holes from pictures'],
        ['Burns, stains, or gouges in floors', 'Surface scuffs from normal furniture use'],
        ['Broken fixtures, doors, or window glass (tenant fault)', 'Repainting if walls were in normal condition'],
        ['Missing or damaged appliances', 'General apartment cleaning if reasonably clean'],
        ['Unpaid rent (with documentation)', 'Repairs for pre-existing conditions'],
        ['Replacing lost keys or re-keying (if lease requires)', 'Deductions without receipts'],
        ['Any deduction with documentation within 14 days', 'Any deduction made after the 14-day window'],
      ],
    },
    {
      type: 'tip',
      body: "A professional move-out clean is the single best investment for maximising your deposit return. A landlord who wants to deduct for cleaning must show the apartment was left in worse-than-normal condition. A professional clean with a receipt shifts that burden completely. NYC move-out cleaning typically costs $150–$350 for a 1BR — versus a potential landlord claim of $500–$1,500.",
    },
    {
      type: 'leadbait',
    },
    {
      type: 'h2',
      heading: 'Step 3: What to Do When You Get the Itemized Statement',
    },
    {
      type: 'body',
      body: "If your landlord returns less than the full deposit, they must send an itemized deduction statement within 14 days of your tenancy ending. Read it carefully and dispute any items that are:",
    },
    {
      type: 'list',
      items: [
        "Normal wear and tear (paint, minor scuffs, carpet wear from normal use)",
        "Pre-existing conditions you documented at move-in (this is why move-in photos are essential — take them even if you forgot for this tenancy)",
        "Missing receipts or contractor invoices — deductions must be substantiated with documentation",
        "Repairs for conditions that were HPD violations during your tenancy (the landlord was legally responsible for those — they cannot deduct them from your deposit)",
        "Any deduction that arrived after the 14-day window — even one day late forfeits the right to deduct",
      ],
    },
    {
      type: 'h2',
      heading: 'Step 4: Disputing the Deductions in Writing',
    },
    {
      type: 'step',
      stepNumber: 4,
      heading: 'Send a formal written dispute within 10 days',
      body: 'If you dispute any deduction, send a written dispute letter by certified mail within 10 days of receiving the itemization. This creates a timestamped record and gives the landlord a chance to correct the error before court.',
      items: [
        'Reference the specific deductions you dispute and explain why each is improper (wear and tear, pre-existing condition, missing documentation, etc.)',
        'Attach your move-out photos and video evidence',
        'Include a copy of your move-in condition documentation if available',
        'State the specific amount you believe you are owed and the date you expect it returned',
        'Notify the landlord that you will file in Small Claims Court if the matter is not resolved',
      ],
    },
    {
      type: 'h2',
      heading: 'Step 5: Small Claims Court — Straightforward and Effective',
    },
    {
      type: 'step',
      stepNumber: 5,
      heading: 'File in NYC Small Claims Court if the landlord does not comply',
      body: 'Small Claims Court in NYC handles disputes up to $10,000. The filing fee is $15–$20. You do not need an attorney. Landlords who wrongfully withhold deposits rarely want to appear in court — many pay before the hearing date.',
      items: [
        'File at your borough\'s Civil Court (Manhattan: 111 Centre Street, Brooklyn: 141 Livingston Street, Queens: 89-17 Sutphin Blvd, Bronx: 851 Grand Concourse, Staten Island: 927 Castleton Ave)',
        'Bring: your lease, all correspondence with the landlord, your move-out photo/video evidence, the 14-day itemization (or evidence they failed to send one), your professional cleaning receipt if applicable, and any HPD violation records for conditions they are attempting to charge you for',
        'If the landlord failed to return the deposit within 14 days OR failed to send an itemized statement within 14 days, cite NY General Obligations Law §7-108(1-a)(e) — this provision entitles you to the full deposit AND punitive damages up to 2× the deposit',
        'Judges in NYC Small Claims Court are experienced with deposit cases and are familiar with landlord tactics. Clear documentation usually wins.',
      ],
    },
    {
      type: 'warning',
      body: "If you are in a rent-stabilised apartment, your security deposit may not exceed one month\'s legal regulated rent. If your landlord collected more than one month\'s rent as a deposit for a stabilised apartment, that excess collection was itself illegal — and you may have a claim for its return plus penalties entirely separately from the standard deposit dispute.",
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about NYC security deposits',
      items: [
        {
          q: 'My landlord did not send an itemized statement within 14 days. Do I automatically get my full deposit back?',
          a: 'Yes. Under NY General Obligations Law §7-108(1-a)(e), if the landlord fails to provide an itemized statement with documentation within 14 days of the tenancy ending, they forfeit their right to make any deductions — and you are entitled to the full deposit. You may need to sue in Small Claims Court to recover it, but the legal entitlement is clear. Document the date your tenancy ended and the date (if any) the statement arrived.',
        },
        {
          q: 'My landlord is deducting for painting. Is that allowed?',
          a: 'In most cases, no. In New York, painting is generally considered a landlord\'s maintenance responsibility after a normal tenancy. Unless you caused specific damage to the walls beyond normal wear and tear — large holes, heavy markings, smoke damage — a landlord cannot deduct painting costs from your deposit. Courts consistently rule that a fresh coat of paint at tenancy end is a normal maintenance expense, not a tenant-caused damage.',
        },
        {
          q: 'The landlord is claiming I damaged the apartment but I have photos showing it was pre-existing. What do I do?',
          a: 'Your photos are your evidence. At Small Claims Court, present your move-in and move-out photos with timestamps showing the conditions existed before you lived there. If you did not document conditions at move-in, check whether you sent any early maintenance requests about those conditions — emails or 311 complaints mentioning the problem before you could reasonably have caused it are useful evidence. Also check the HPD violation record — pre-existing HPD violations for those conditions prove the landlord was already aware of them.',
        },
        {
          q: 'How do I get my deposit back if my landlord has already spent it?',
          a: 'Under New York law, security deposits must be held in a separate account and cannot be commingled with the landlord\'s personal or operating funds. If a landlord has spent your deposit, they are still legally obligated to return it — this is a debt owed by the landlord personally. A Small Claims Court judgment against the landlord can be enforced through wage garnishment, bank account levies, and property liens. This is why you get the judgment even if the funds are spent — you can then enforce it.',
        },
        {
          q: 'Should I hire a lawyer for a deposit dispute?',
          a: 'For most deposit disputes under $10,000, Small Claims Court is specifically designed for self-represented parties — you do not need a lawyer. The filing fee is $15–$20 and the process is straightforward. If your deposit is larger, if the landlord is countersuing you for significant unpaid rent, or if the situation involves complex lease break circumstances, a tenant attorney is worth consulting. Many work on contingency for deposit cases where they believe the landlord acted in bad faith.',
        },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// MONEY PAGE 3: Landlord won't fix roaches or bedbugs
// Intent bucket: Fighting | Service: Pest Control
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'landlord-wont-fix-roaches-bedbugs',
  category: 'pests-infestations',
  title: 'My Landlord Won\'t Fix Roaches or Bed Bugs in NYC — What to Do',
  metaTitle: 'Landlord Won\'t Fix Roaches or Bed Bugs in NYC | Building Health X',
  metaDescription: 'NYC landlords are legally required to exterminate pests — and face daily fines if they refuse. Here\'s how to force the issue: 311 complaints, HPD violations, rent withholding, and getting your own exterminator.',
  headline: 'My NYC Landlord Won\'t Fix Roaches or Bed Bugs. Now What?',
  subheadline: 'Your landlord is breaking the law. Here\'s how to use 311, HPD violations, Housing Court, and rent withholding to force them to act — or get compensated if they don\'t.',
  serviceSlug: 'pest-control',
  serviceName: 'Pest Control',
  leadBaitCta: 'While you fight them: get a licensed NYC exterminator quote — fast.',
  datePublished: '2024-11-01',
  dateModified: '2025-03-01',
  relatedSlugs: ['clear-hpd-pest-violation-nyc', 'what-to-check-before-signing-nyc-lease', 'how-to-break-lease-nyc-violations'],
  relatedServicePages: [
    { label: 'Pest control in Manhattan', href: '/services/pest-control/manhattan' },
    { label: 'Pest control in Brooklyn', href: '/services/pest-control/brooklyn' },
    { label: 'Pest control in Queens', href: '/services/pest-control/queens' },
    { label: 'Pest control in the Bronx', href: '/services/pest-control/bronx' },
    { label: 'Pest control in Staten Island', href: '/services/pest-control/staten-island' },
  ],
  furtherReading: [
    { slug: 'what-does-a-bed-bug-violation-mean-on-nyc-building-records', title: 'What Does a Bed Bug Violation Mean on NYC Building Records?' },
    { slug: 'is-my-landlord-required-to-pay-for-bed-bug-treatment-in-nyc', title: 'Is My Landlord Required to Pay for Bed Bug Treatment in NYC?' },
    { slug: 'how-many-pest-violations-are-too-many-in-an-nyc-building', title: 'How Many Pest Violations Are Too Many in an NYC Building?' },
  ],
  govLinks: [
    { label: 'File a 311 Pest Complaint (NYC)', url: 'https://portal.311.nyc.gov/', description: 'File a pest complaint online — this triggers an HPD inspection and creates an official record.' },
    { label: 'HPD Online — Building Violation History', url: 'https://hpdonline.nyc.gov', description: 'See if your building already has pest violations on record.' },
    { label: 'NYC Housing Court — HP Proceedings', url: 'https://www.courts.state.ny.us/courts/nyc/housing/', description: 'File a Housing Part case to court-order your landlord to exterminate.' },
    { label: 'NYC Bed Bug Portal (HPD)', url: 'https://www.nyc.gov/site/hpd/services-and-information/bedbug.page', description: 'HPD\'s official bed bug resources for tenants and landlords.' },
  ],
  content: [
    {
      type: 'intro',
      body: "Under the NYC Housing Maintenance Code Section 27-2017, your landlord is legally required to exterminate pests in your apartment and building. This is not a courtesy — it is a statutory obligation with financial penalties for every day they ignore it. If your landlord is shrugging off your roach or bed bug complaint, they are breaking the law right now. This guide gives you the exact escalation ladder — from 311 complaint to Housing Court — that forces their hand.",
    },
    {
      type: 'statrow',
      stats: [
        { value: '$150/day', label: 'Maximum daily HPD fine for an uncorrected pest violation — starts 21 days after the notice of violation', source: 'NYC Housing Maintenance Code' },
        { value: '$25,000', label: 'Maximum ECB civil penalty for buildings with repeat or wilful pest non-compliance', source: 'NYC Admin Code' },
        { value: '30 days', label: 'Legal correction deadline for a bed bug or roach violation — after which fines begin accruing', source: 'NYC HPD' },
      ],
    },
    {
      type: 'h2',
      heading: 'First: Notify Your Landlord in Writing',
    },
    {
      type: 'step',
      stepNumber: 1,
      heading: 'Send written notice of the pest problem today',
      body: 'Before escalating to the city, notify your landlord in writing. This is both legally prudent and tactically smart — it establishes a baseline timeline and gives the landlord a chance to act. Send it via email AND text so you have timestamps.',
      items: [
        'Describe the specific pest and where you\'ve seen activity — bedroom, kitchen, bathroom, common areas.',
        'State the date you first observed the problem.',
        'Attach photos or video if you have them.',
        'Ask the landlord to confirm receipt and provide a timeline for treatment.',
        'If you\'ve made verbal complaints before, reference them: "As I\'ve told you verbally multiple times since [date], the bed bug infestation in my apartment has not been addressed."',
      ],
    },
    {
      type: 'h2',
      heading: 'Step 2: File a 311 Complaint — This Is How You Start the Clock',
    },
    {
      type: 'step',
      stepNumber: 2,
      heading: 'File a 311 complaint online or by phone',
      body: 'A 311 pest complaint triggers an HPD inspection. The inspector visits, confirms the infestation, and issues a Notice of Violation — typically a Class B (30-day deadline) or Class C (21-day deadline) violation. From that moment, the landlord has a government deadline with daily fines attached.',
      items: [
        'File at portal.311.nyc.gov or call 311. Select "Pest/Rodent" and specify bed bugs, roaches, or mice/rats.',
        'Write down your complaint tracking number — you can check the status online.',
        'HPD will schedule an inspection. You do not need to be home for the hallway/common area inspection, but unit access helps. Make sure you or someone 18+ can let the inspector in.',
        'If HPD confirms the infestation, a Notice of Violation will be issued to the landlord. It appears on the building\'s public HPD record within days.',
        'Check the violation on HPD Online at hpdonline.nyc.gov — screenshot it with date. This is your evidence.',
      ],
    },
    {
      type: 'tip',
      body: "File the 311 complaint even if your landlord has promised to fix it. The HPD record protects you — if the landlord's treatment fails, you already have a violation on record. If they do fix it properly, the violation gets certified and closes. You lose nothing by filing.",
    },
    { type: 'leadbait' },
    {
      type: 'h2',
      heading: 'Step 3: File an HP Proceeding in Housing Court',
    },
    {
      type: 'step',
      stepNumber: 3,
      heading: 'Get a court order requiring the landlord to exterminate',
      body: 'If the 311 complaint and HPD violation don\'t move your landlord, an HP (Housing Part) proceeding in NYC Housing Court is the next escalation. This is a legal proceeding where a judge orders the landlord to make specific repairs — in your case, extermination. It costs you nothing to file.',
      items: [
        'File at your borough\'s Housing Court. The court\'s Help Center (free, walk-in) will help you fill out the forms.',
        'Include: your written notice to the landlord, HPD violation number, photos of pest activity, and any evidence that the landlord has ignored your complaints.',
        'The court will schedule a hearing — both you and the landlord appear. Judges in Housing Court deal with pest cases constantly and take them seriously.',
        'If the landlord has already been issued an HPD violation for the same infestation, the court has hard evidence of their obligation and non-compliance.',
        'The court can order extermination by a specific date, require proof of treatment, and impose contempt penalties if the landlord defies the order.',
      ],
    },
    {
      type: 'h2',
      heading: 'Step 4: Hire Your Own Exterminator and Deduct From Rent',
    },
    {
      type: 'body',
      body: "In extreme cases where the landlord refuses to act and you need immediate relief, you may have the right to hire a licensed exterminator yourself and deduct the cost from the following month\'s rent. This is called the 'repairs and deduct' remedy under New York law. It is not without risk — your landlord may claim non-payment of rent — but it is legally available under the right conditions.",
    },
    {
      type: 'list',
      items: [
        "You must have given the landlord written notice and a reasonable opportunity to fix the problem first — typically at least 30 days for a non-emergency, shorter for an acute infestation.",
        "The deduction cannot exceed one month\'s rent in any single month.",
        "You must hire a licensed NYS DEC Pesticide Applicator — not any contractor. Keep the invoice and documentation of the treatment.",
        "Send the landlord a letter explaining what you did, why, the cost, and that you are deducting it from next month\'s rent. Attach the exterminator\'s invoice.",
        "This is a risky move if you do not have a clear paper trail showing prior notice and landlord non-response. Only do it after attempting Steps 1–3.",
      ],
    },
    {
      type: 'h2',
      heading: 'Step 5: Seek Rent Reduction for Pest Conditions',
    },
    {
      type: 'body',
      body: "If you have been living with an active infestation while your landlord ignored it, you may be entitled to a rent abatement — a retroactive reduction in rent for the period during which your apartment was below the habitable standard. In a Housing Court HP proceeding or a subsequent DHCR complaint (for rent-stabilised tenants), a judge or hearing officer will calculate a percentage reduction based on the severity and duration of the pest condition. Tenants with strong documentation regularly receive 10–30% rent abatements for extended pest infestations.",
    },
    {
      type: 'warning',
      body: "Do not throw out furniture, bedding, or personal property without photographing it first — even if it is heavily infested. This documentation is evidence of the severity of the infestation. If you need to dispose of items due to bed bugs, photograph them in place, then label them 'Bed Bug Infested — Do Not Take\' per NYC DSNY rules before putting them at the kerb.",
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about landlords ignoring pest problems in NYC',
      items: [
        {
          q: 'My landlord says I brought the bed bugs in and refuses to treat. Is that a valid defence for them?',
          a: 'No. Under NYC Housing Maintenance Code Section 27-2017, landlords are strictly liable for pest extermination regardless of the source. Even if a tenant introduced bed bugs, the landlord\'s legal obligation to treat the infestation does not change. The only situation where a landlord might have a civil claim against a tenant is if the tenant demonstrably refused treatment — but this does not relieve the landlord of the duty to exterminate. File the 311 complaint regardless of who your landlord blames.',
        },
        {
          q: 'How long does the 311 → HPD inspection → violation process take?',
          a: 'After you file a 311 complaint, HPD typically schedules a pest inspection within 3–10 business days. If the inspector confirms the infestation, the violation is usually issued within 1–3 business days of the inspection and appears on HPD Online shortly after. From there, the landlord has 30 days (Class B) or 21 days (Class C) to correct before daily fines begin. The whole process from your 311 filing to a landlord having a legal deadline with fines typically runs 2–5 weeks.',
        },
        {
          q: 'Can I withhold rent entirely until the landlord treats the infestation?',
          a: 'You can withhold rent by paying into a court-managed escrow account through an HP proceeding — this is the safest method. Unilateral rent withholding without a court process exposes you to eviction for non-payment, even if the infestation is real and the landlord is in breach. The HP proceeding + escrow route achieves the same pressure effect while protecting you legally. Do not simply stop paying rent without consulting a tenant attorney first.',
        },
        {
          q: 'My building has had multiple 311 pest complaints. Does that help my case?',
          a: 'Significantly. A building with a pattern of pest complaints — searchable on HPD Online and displayed on BuildingHealthX — indicates a systemic infestation rather than an isolated unit issue. Courts and HPD treat building-wide patterns more seriously, and the landlord faces greater difficulty arguing your situation is isolated. In an HP proceeding, building-wide complaint history is powerful evidence that the landlord has failed to maintain the property.',
        },
        {
          q: 'The landlord sent an exterminator once but the bugs are back. What now?',
          a: 'One treatment is almost never sufficient for bed bugs — eggs survive most chemical applications, and a second treatment 10–14 days later is legally required. If your landlord sent a single treatment and considers the matter closed, that does not meet the legal standard. File a follow-up 311 complaint if bugs persist after 3–4 weeks. If the HPD violation was certified after only one treatment, you can call your HPD district office to flag that the infestation returned — this can trigger a new inspection and violation.',
        },
      ],
    },
  ],
})
