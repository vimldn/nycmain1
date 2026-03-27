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

// ─────────────────────────────────────────────────────────────────────────────
// NEW 1: Who pays when a pipe bursts
// Intent bucket: Disasters | Service: Renters Insurance
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'who-pays-pipe-burst-nyc-apartment',
  category: 'plumbing-electrical',
  title: 'Who Pays When a Pipe Bursts in Your NYC Apartment?',
  metaTitle: 'Who Pays When a Pipe Bursts in Your NYC Apartment? | Building Health X',
  metaDescription: 'Burst pipe in your NYC apartment? Find out exactly who is legally responsible for repairs and your damaged belongings — and why renters insurance is the only real protection you have.',
  headline: 'Who Pays When a Pipe Bursts in Your NYC Apartment?',
  subheadline: 'The landlord fixes the building. Nobody replaces your stuff — unless you have renters insurance. Here\'s the full legal breakdown of liability, claims, and your rights.',
  serviceSlug: 'renters-insurance',
  serviceName: 'Renters Insurance',
  leadBaitCta: 'Don\'t get stuck paying for your neighbour\'s flood. Get 3 instant NYC renters insurance quotes.',
  datePublished: '2024-11-15',
  dateModified: '2025-03-01',
  relatedSlugs: ['what-to-check-before-signing-nyc-lease', 'hire-plumber-nyc-hpd-violation', 'get-security-deposit-back-nyc'],
  relatedServicePages: [
    { label: 'Renters insurance in Manhattan', href: '/services/renters-insurance/manhattan' },
    { label: 'Renters insurance in Brooklyn', href: '/services/renters-insurance/brooklyn' },
    { label: 'Renters insurance in Queens', href: '/services/renters-insurance/queens' },
    { label: 'Renters insurance in the Bronx', href: '/services/renters-insurance/bronx' },
    { label: 'Renters insurance in Staten Island', href: '/services/renters-insurance/staten-island' },
  ],
  furtherReading: [
    { slug: 'what-does-an-open-hpd-violation-mean', title: 'What Does an Open HPD Violation Mean?' },
    { slug: 'hire-plumber-nyc-hpd-violation', title: 'How to Hire a Licensed Plumber for an HPD Violation' },
    { slug: 'how-to-check-if-hpd-violations-were-actually-fixed', title: 'How to Check If HPD Violations Were Actually Fixed' },
  ],
  govLinks: [
    { label: 'NY Real Property Law §235-b — Warranty of Habitability', url: 'https://codes.findlaw.com/ny/real-property-law/rpy-sect-235-b.html', description: 'Your landlord\'s legal obligation to maintain plumbing and building systems.' },
    { label: 'HPD Online — Plumbing Violation Search', url: 'https://hpdonline.nyc.gov', description: 'Check if your building has open plumbing violations before disaster strikes.' },
    { label: 'NY Department of Financial Services — Renters Insurance', url: 'https://www.dfs.ny.gov/consumers/property_insurance/renters', description: 'State guidance on what renters insurance covers and your rights as a policyholder.' },
  ],
  content: [
    {
      type: 'intro',
      body: "A pipe bursts in the apartment above you. Water pours through your ceiling, soaks your mattress, ruins your laptop, and warps your floors. Two hours later, the landlord sends someone to fix the pipe. Nobody sends anyone for your stuff. This scenario happens thousands of times a year in NYC buildings — and most tenants discover too late that the landlord's legal obligation covers the building, not their belongings. This guide breaks down exactly who is responsible for what, what you can and cannot recover, and why renters insurance is the only protection that actually covers you.",
    },
    {
      type: 'statrow',
      stats: [
        { value: '$0', label: 'What your landlord is typically required to pay for your damaged personal belongings after a pipe burst', source: 'NY Real Property Law' },
        { value: '$15/mo', label: 'Average cost of renters insurance in NYC — less than a monthly MetroCard top-up', source: 'NY DFS' },
        { value: '72 hrs', label: 'Window you have to document water damage before evidence degrades — photograph everything immediately', source: 'Insurance best practice' },
      ],
    },
    {
      type: 'h2',
      heading: 'The Key Distinction: Building vs. Belongings',
    },
    {
      type: 'body',
      body: "New York landlord-tenant law draws a clear line that most tenants do not know about until it is too late. Your landlord is responsible for the physical building — pipes, plumbing systems, ceilings, floors, and structural elements. They are not responsible for your personal property, even when their negligence or a building failure caused the damage.",
    },
    {
      type: 'table',
      rows: [
        ['What was damaged', 'Who is responsible', 'How it gets paid'],
        ['The burst pipe itself', 'Landlord', 'Landlord must repair under HPD code and warranty of habitability'],
        ['Water-damaged ceiling or floor in your unit', 'Landlord', 'Landlord must restore building fabric — file HPD complaint if they don\'t'],
        ['Your furniture, clothing, electronics', 'You (unless landlord was negligent)', 'Your renters insurance personal property coverage'],
        ['Your neighbour\'s belongings (if your pipe burst)', 'Potentially you — or your renters insurance', 'Renters insurance liability coverage protects you here'],
        ['Temporary accommodation if unit is uninhabitable', 'Landlord may owe rent reduction; your insurance may cover hotel', 'Renters insurance loss-of-use coverage'],
        ['Mold from unaddressed water damage', 'Landlord — file HPD violation immediately', 'HPD enforcement + potential rent abatement claim'],
      ],
    },
    {
      type: 'h2',
      heading: 'When Is the Landlord Liable for Your Belongings?',
    },
    {
      type: 'body',
      body: "There is one exception to the 'landlord doesn\'t cover your stuff\' rule, and it matters: if the landlord was negligent, and that negligence directly caused the damage, they can be held liable for your personal property losses. Negligence in a plumbing context means they knew about a problem and failed to fix it.",
    },
    {
      type: 'list',
      items: [
        "Prior written complaints: If you reported a leaking pipe to the landlord in writing and they ignored it, and that pipe later burst and damaged your belongings, you have a strong negligence claim. This is why every maintenance request should be sent via email or text — not verbal.",
        "Open HPD violations: If the building had an open HPD plumbing violation for the same system that failed, that violation is documented evidence of known-and-ignored conditions. Pull the building\'s HPD record immediately after any water incident.",
        "Deferred maintenance patterns: A pattern of unresolved plumbing complaints in the building (visible on HPD Online and 311 complaint history) supports a negligence narrative even without a specific prior complaint from you.",
        "Important caveat: Even if you have a strong negligence claim, collecting on it requires either a settlement with the landlord or a court judgment. That process takes time and money. Renters insurance pays immediately and then pursues the landlord on your behalf — this is called subrogation.",
      ],
    },
    {
      type: 'tip',
      body: "Within 24 hours of any water incident, send the landlord a written notice (email) documenting the date, time, cause if known, and every item of yours that was damaged. Include photos. This creates the timestamped record you need for both a negligence claim and an insurance claim.",
    },
    { type: 'leadbait' },
    {
      type: 'h2',
      heading: 'What Renters Insurance Actually Covers in a Water Incident',
    },
    {
      type: 'body',
      body: "Standard renters insurance in NYC covers three things relevant to a burst pipe situation. Understanding each one tells you exactly what protection you have.",
    },
    {
      type: 'table',
      rows: [
        ['Coverage type', 'What it pays for', 'Typical limit'],
        ['Personal property', 'Furniture, electronics, clothing, appliances damaged by water', '$15,000–$50,000 (your choice at signup)'],
        ['Loss of use / ALE', 'Hotel or temporary housing if your unit is uninhabitable', '$5,000–$20,000 or 20–30% of property limit'],
        ['Liability', 'If your overflowing tub damages a neighbour\'s apartment below', '$100,000–$300,000 standard'],
        ['Medical payments', 'If someone is injured in your apartment due to the incident', '$1,000–$5,000'],
      ],
    },
    {
      type: 'warning',
      body: "Flood damage from external sources — rising groundwater, street flooding entering through windows or basement walls — is almost always excluded from standard renters insurance. 'Sudden and accidental' discharge from a burst pipe is typically covered. Gradual leaks you knew about and ignored are typically not. Read your policy\'s water damage exclusions before you need them.",
    },
    {
      type: 'h2',
      heading: 'Step-by-Step: What to Do in the First 48 Hours',
    },
    {
      type: 'step',
      stepNumber: 1,
      heading: 'Stop the water and photograph everything before cleanup',
      body: 'Before moving a single item, take a comprehensive video walking through every affected area. Photograph every damaged item in place. This is your evidence for both the insurance claim and any landlord negligence claim. Do not throw anything away until an adjuster has seen it.',
    },
    {
      type: 'step',
      stepNumber: 2,
      heading: 'Notify your landlord in writing immediately',
      body: 'Send an email (or text if that\'s your communication method) documenting the incident, the time, and every item damaged. If there\'s visible mold growth within 24–48 hours, photograph and note it — this signals a pre-existing moisture problem and strengthens a negligence argument.',
    },
    {
      type: 'step',
      stepNumber: 3,
      heading: 'File a claim with your renters insurance provider',
      body: 'Call your insurer\'s claims line within 24 hours. They will assign an adjuster and walk you through the documentation they need. Keep every receipt for any emergency expenses — temporary storage, hotel nights, replacement essentials. These may be reimbursable under loss-of-use coverage.',
    },
    {
      type: 'step',
      stepNumber: 4,
      heading: 'File a 311 complaint if the landlord doesn\'t repair the building damage promptly',
      body: 'Water damage to ceilings, floors, and walls is the landlord\'s legal obligation to repair under the warranty of habitability. If they do not act within a reasonable time (24–72 hours for active leaks, 30 days for resulting structural damage), file a 311 complaint. The HPD violation creates a paper trail and enforcement pressure simultaneously.',
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about water damage liability in NYC apartments',
      items: [
        {
          q: 'My upstairs neighbour\'s bathtub overflowed and ruined my ceiling. Who pays?',
          a: 'The liability picture depends on why the overflow happened. If your neighbour was negligent (left the tap running, ignored a known problem), their renters insurance liability coverage should cover your losses — if they have it. If they don\'t have renters insurance, you would need to sue them personally, which is often impractical. If the overflow was caused by a building plumbing failure rather than neighbour negligence, the landlord\'s building insurance may be involved. Your fastest and most reliable path to recovery in all these scenarios is your own renters insurance.',
        },
        {
          q: 'Can I withhold rent if my apartment has water damage the landlord won\'t fix?',
          a: 'You cannot simply stop paying rent — that exposes you to eviction proceedings. The correct approach is to file an HP proceeding in Housing Court, which allows you to pay rent into a court escrow account while forcing the landlord to make repairs. For severe water damage that makes the apartment uninhabitable, you may also be entitled to a rent abatement for the period the unit was below the habitable standard. Document everything and consult Legal Aid if the landlord is unresponsive.',
        },
        {
          q: 'Does renters insurance cover mold damage from a burst pipe?',
          a: 'Coverage for mold is policy-specific and often limited. Most standard policies cover mold that results directly from a covered water event (like a burst pipe) but exclude mold from gradual or repeated leakage, high humidity, or pre-existing conditions. Some policies have a specific mold sublimit (e.g., $10,000) even when the triggering event is covered. Check your policy\'s mold language specifically — it is usually in the exclusions section.',
        },
        {
          q: 'My landlord says I caused the pipe to burst and won\'t make repairs. What do I do?',
          a: 'The burden of proof is on the landlord to demonstrate tenant fault. Building pipe failures are almost never caused by tenant action — they result from aging infrastructure, deferred maintenance, or thermal stress. File a 311 complaint regardless of the landlord\'s claim. The HPD inspector will assess the condition and issue a violation if the building is responsible. The landlord\'s claim does not relieve them of their obligation to maintain habitable conditions.',
        },
        {
          q: 'I don\'t have renters insurance. Can I still recover my losses from the landlord?',
          a: 'Potentially, if you can prove landlord negligence — prior written complaints, open HPD violations for the same system, or a documented pattern of deferred maintenance. You would pursue this through Small Claims Court (up to $10,000) or Civil Court for larger amounts. The process is slower and less certain than an insurance claim. Going forward, NYC renters insurance typically costs $12–$18/month and covers $25,000+ in personal property — it is almost certainly worth it.',
        },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// NEW 2: Rent stabilisation check
// Intent bucket: Researching | Service: Building Search (→ homepage)
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'is-my-nyc-apartment-secretly-rent-stabilised',
  category: 'inspections-leasing',
  title: 'How to Find Out if Your NYC Apartment Is Secretly Rent-Stabilised',
  metaTitle: 'Is My NYC Apartment Secretly Rent-Stabilised? How to Check | Building Health X',
  metaDescription: 'Millions of NYC apartments are rent-stabilised and tenants don\'t know it. Here\'s how to request your DHCR rent history, check for illegal deregulation, and recover overcharged rent going back 6 years.',
  headline: 'Is Your NYC Apartment Secretly Rent-Stabilised? Here\'s How to Find Out.',
  subheadline: 'Millions of NYC renters are paying more than the legal limit and don\'t know it. The DHCR rent history check takes 5 minutes and could uncover years of overcharges.',
  serviceSlug: 'building-inspectors',
  serviceName: 'Building Inspectors',
  leadBaitCta: 'Check your building\'s full history — violations, rent records, and court filings — in seconds.',
  datePublished: '2024-11-15',
  dateModified: '2025-03-01',
  relatedSlugs: ['what-to-check-before-signing-nyc-lease', 'how-to-break-lease-nyc-violations', 'get-security-deposit-back-nyc'],
  relatedServicePages: [
    { label: 'Building inspectors in Manhattan', href: '/services/building-inspectors/manhattan' },
    { label: 'Building inspectors in Brooklyn', href: '/services/building-inspectors/brooklyn' },
    { label: 'Building inspectors in Queens', href: '/services/building-inspectors/queens' },
  ],
  furtherReading: [
    { slug: 'what-does-an-open-hpd-violation-mean', title: 'What Does an Open HPD Violation Mean?' },
    { slug: 'can-i-rent-an-apartment-with-active-hpd-violations', title: 'Can I Rent an Apartment with Active HPD Violations?' },
    { slug: 'how-to-check-if-an-nyc-apartment-is-rent-stabilized', title: 'How to Check If an NYC Apartment Is Rent Stabilised' },
  ],
  govLinks: [
    { label: 'DHCR Rent History Request (HCR)', url: 'https://apps.hcr.ny.gov/BuildingSearch/', description: 'Request the official rent registration history for your specific apartment going back to 1984.' },
    { label: 'NYC Rent Guidelines Board', url: 'https://rentguidelinesboard.cityofnewyork.us/', description: 'The official board that sets legal rent increase limits for stabilised apartments each year.' },
    { label: 'DHCR Overcharge Complaint Form', url: 'https://hcr.ny.gov/system/files/documents/2020/02/ra-89.pdf', description: 'File a formal rent overcharge complaint with DHCR if you discover you\'ve been overcharged.' },
    { label: 'NY Housing Stability & Tenant Protection Act 2019', url: 'https://www.nysenate.gov/legislation/bills/2019/S6458', description: 'The 2019 law that closed major loopholes landlords used to illegally deregulate stabilised apartments.' },
  ],
  content: [
    {
      type: 'intro',
      body: "Approximately one million apartments in New York City are rent-stabilised. Hundreds of thousands of tenants living in them do not know it — and a significant fraction of those are paying above the legal regulated rent. This is not a small oversight. Illegal deregulation and rent overcharges are among the most common forms of tenant exploitation in NYC, and since the Housing Stability and Tenant Protection Act of 2019 closed the major loopholes, tenants can now recover overcharged rent going back six years. This guide shows you exactly how to find out if your apartment is stabilised, what your legal rent should be, and what to do if you have been overcharged.",
    },
    {
      type: 'statrow',
      stats: [
        { value: '~1M', label: 'Rent-stabilised apartments in NYC — roughly half of all rental units in the city', source: 'NYC Rent Guidelines Board' },
        { value: '6 years', label: 'How far back a tenant can recover overcharged rent under the 2019 HSTPA', source: 'NY Housing Stability & Tenant Protection Act 2019' },
        { value: '3×', label: 'Treble damages — what you can recover per year of wilful overcharging, on top of the overcharged amount', source: 'NY Rent Stabilization Law' },
      ],
    },
    {
      type: 'h2',
      heading: 'Step 1: Check If Your Building Is Covered',
    },
    {
      type: 'body',
      body: "Rent stabilisation applies to apartments in buildings with 6 or more units, built before 1974, in New York City — unless the building received a tax exemption (like 421-a or J-51) that brought it under stabilisation regardless of age. The fastest way to check your specific building:",
    },
    {
      type: 'list',
      items: [
        "Search your address on BuildingHealthX — the building profile shows rent stabilisation status derived from DHCR registration data.",
        "Search the DHCR Building Search at apps.hcr.ny.gov — enter your address and see if the building is registered as stabilised.",
        "Check your lease: rent-stabilised leases must use the DHCR standard lease rider and state that the apartment is rent-stabilised. If yours does not mention stabilisation and your building qualifies, that is a red flag.",
        "Look at your rent history: if the legal regulated rent is not shown in your lease, that is another indicator something may be wrong.",
      ],
    },
    {
      type: 'h2',
      heading: 'Step 2: Request Your Official DHCR Rent History',
    },
    {
      type: 'step',
      stepNumber: 2,
      heading: 'Get the apartment\'s complete registered rent history',
      body: 'Even if you know the building is stabilised, you need the specific apartment\'s rent history to verify whether you are being charged the legal regulated rent. This history goes back to 1984 and is your most powerful document.',
      items: [
        "Go to apps.hcr.ny.gov/BuildingSearch and search your building address.",
        "Once the building appears, look for your specific unit number and request the rent history — it is free and you will receive it by mail within a few weeks.",
        "Alternatively, call DHCR directly at (718) 739-6400 to request a rent history over the phone.",
        "The rent history will show every registered legal rent for your apartment going back to the earliest registration, and any major capital improvement (MCI) increases or individual apartment improvement (IAI) increases that were used to raise the rent.",
      ],
    },
    {
      type: 'tip',
      body: "Request the rent history before you sign a new lease, not after. Once you have signed and moved in, discovering an overcharge becomes a dispute process. Before signing, a discrepancy gives you negotiating power — or a reason to walk away.",
    },
    {
      type: 'h2',
      heading: 'Step 3: How to Spot an Illegal Overcharge',
    },
    {
      type: 'body',
      body: "Compare the registered rent history against your current lease rent. Allowable increases between tenancies are set annually by the NYC Rent Guidelines Board (RGB) — the board publishes the legal percentages going back decades. Any increase that exceeds the RGB guidelines without a documented MCI or IAI application is potentially an overcharge.",
    },
    {
      type: 'table',
      rows: [
        ['Legal reason for rent increase', 'What it requires', 'Red flag'],
        ['Annual RGB guidelines (renewal)', 'Set each year — typically 1–4%', 'Any increase above the RGB number without documentation'],
        ['Vacancy bonus (pre-2019)', 'Was allowed before HSTPA 2019 — now eliminated', 'Any vacancy increase claimed after June 2019 is illegal'],
        ['Major Capital Improvement (MCI)', 'Requires DHCR approval and a filed application', 'Increase claimed without a DHCR MCI order on record'],
        ['Individual Apartment Improvement (IAI)', 'Post-2019: limited to $15,000 over 15 years max', 'Any IAI increase without documented renovation receipts'],
        ['High-rent deregulation', 'Eliminated by HSTPA 2019 — previously allowed at $2,774+', 'Any apartment claimed as deregulated via high-rent threshold after June 2019'],
      ],
    },
    { type: 'leadbait' },
    {
      type: 'h2',
      heading: 'Step 4: Filing an Overcharge Complaint',
    },
    {
      type: 'step',
      stepNumber: 4,
      heading: 'File a DHCR overcharge complaint',
      body: 'If you have identified that you are being charged more than the legal regulated rent, file a rent overcharge complaint with DHCR using Form RA-89. You do not need an attorney to file, and there is no filing fee.',
      items: [
        "Download Form RA-89 from hcr.ny.gov or pick it up at any DHCR borough office.",
        "Attach: your rent history printout, copies of all lease renewals showing rent amounts, and any DHCR correspondence you have received.",
        "DHCR will investigate and calculate the legal regulated rent. If they find an overcharge, they can order the landlord to refund up to 6 years of excess payments.",
        "For wilful overcharges (where DHCR finds the landlord deliberately overcharged), you may be entitled to treble damages — three times the amount overcharged per year.",
        "You can also file in Housing Court instead of DHCR, which is sometimes faster. A tenant attorney can advise on the better route for your specific situation.",
      ],
    },
    {
      type: 'warning',
      body: "If your landlord has told you the apartment is 'market rate' or 'deregulated,' do not simply accept this without verifying. The 2019 HSTPA made most high-rent deregulation illegal going forward, and apartments that were improperly deregulated before 2019 are being restored to stabilisation by DHCR and Housing Court decisions regularly. The DHCR rent history is the ground truth — your landlord\'s claim is not.",
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about rent stabilisation in NYC',
      items: [
        {
          q: 'How do I know if my apartment is rent-stabilised if my lease doesn\'t say so?',
          a: 'Request the DHCR rent history for your apartment at apps.hcr.ny.gov. If the apartment is registered as rent-stabilised, the history will show it. Additionally, search your building address on HPD Online — buildings with six or more units built before 1974 are generally covered unless they received specific exemptions. A missing stabilisation rider in your lease when the apartment should be covered is itself a potential violation worth pursuing.',
        },
        {
          q: 'My landlord says the apartment was deregulated because the rent was above $2,774. Is that valid?',
          a: 'It depends on when the alleged deregulation occurred. The high-rent vacancy deregulation threshold was eliminated by the Housing Stability and Tenant Protection Act of 2019. Any deregulation claimed to have occurred after June 14, 2019 based on rent level is invalid. If the landlord claims deregulation happened before 2019, you can still challenge whether it was properly done — DHCR records and rent histories are the verification tool.',
        },
        {
          q: 'I\'ve been overcharged for 3 years. How much can I recover?',
          a: 'You can recover overcharged rent going back up to 6 years. For each year, you get the overcharged amount. If DHCR finds the overcharge was wilful, you receive treble damages — three times the annual overcharge per year of wilful violation. The landlord is also required to roll your rent back to the legal regulated amount going forward. Depending on the scale of the overcharge, this can be a significant recovery — some tenants have recovered $20,000–$50,000+ in overcharged rent.',
        },
        {
          q: 'Can my landlord evict me for filing a rent overcharge complaint?',
          a: 'No. Retaliatory eviction in response to a rent overcharge complaint is illegal under New York Real Property Law §223-b. If your landlord attempts eviction, raises your rent, or reduces services within 180 days of your complaint, there is a legal presumption of retaliation. Document everything. A retaliatory eviction attempt after a DHCR complaint often strengthens your overall case.',
        },
        {
          q: 'My building got a 421-a tax exemption when it was built. Does that mean I\'m rent-stabilised?',
          a: 'Possibly, yes. Buildings that received 421-a tax exemptions are required to register their apartments as rent-stabilised for the duration of the exemption period — which can be 10, 15, 25, or 35 years depending on the specific exemption granted. Many newer luxury buildings in NYC have rent-stabilised apartments because of 421-a, even if the landlord markets them as luxury market-rate units. Check the DHCR registration and HPD\'s 421-a compliance records for your building.',
        },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// NEW 3: Eviction notice — rights and next steps
// Intent bucket: Fighting | Service: Moving Companies + Storage
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'eviction-notice-nyc-rights-next-steps',
  category: 'inspections-leasing',
  title: 'Received an Eviction Notice in NYC? Your Rights and Next Steps',
  metaTitle: 'Received an Eviction Notice in NYC? Rights & Next Steps | Building Health X',
  metaDescription: 'Got a notice to quit or petition in NYC? You have more rights and time than you think. Here\'s the difference between holdover and non-payment cases, Housing Court timelines, and what to do right now.',
  headline: 'Got an Eviction Notice in NYC? Read This Before You Do Anything Else.',
  subheadline: 'A notice to quit is not an eviction. You have rights, you have time, and in many cases you have defences your landlord is hoping you don\'t know about.',
  serviceSlug: 'moving-companies',
  serviceName: 'Moving Companies',
  leadBaitCta: 'Need to move fast? Get emergency quotes from NYC movers — 24-hour turnaround.',
  datePublished: '2024-11-15',
  dateModified: '2025-03-01',
  relatedSlugs: ['how-to-break-lease-nyc-violations', 'get-security-deposit-back-nyc', 'is-my-nyc-apartment-secretly-rent-stabilised'],
  relatedServicePages: [
    { label: 'Moving companies in Manhattan', href: '/services/moving-companies/manhattan' },
    { label: 'Moving companies in Brooklyn', href: '/services/moving-companies/brooklyn' },
    { label: 'Moving companies in Queens', href: '/services/moving-companies/queens' },
    { label: 'Moving companies in the Bronx', href: '/services/moving-companies/bronx' },
    { label: 'Storage facilities in NYC', href: '/services/storage-facilities' },
  ],
  furtherReading: [
    { slug: 'how-to-break-lease-nyc-violations', title: 'How to Break Your NYC Lease Due to Landlord Violations' },
    { slug: 'get-security-deposit-back-nyc', title: 'How to Get Your Security Deposit Back in NYC' },
    { slug: 'what-does-an-open-hpd-violation-mean', title: 'What Does an Open HPD Violation Mean?' },
  ],
  govLinks: [
    { label: 'NYC Housing Court — Tenant Information', url: 'https://www.courts.state.ny.us/courts/nyc/housing/tenantinfo.shtml', description: 'Official Housing Court information for tenants, including how to answer a petition and what to expect at hearings.' },
    { label: 'NYC Legal Aid Society', url: 'https://www.legalaidnyc.org/', description: 'Free legal representation for eligible tenants in Housing Court eviction cases.' },
    { label: 'Right to Counsel NYC', url: 'https://www.righttocounselnyc.org/', description: 'NYC\'s Universal Access to Counsel programme — free attorneys for income-eligible tenants in Housing Court.' },
    { label: 'Housing Court Answers (HCA)', url: 'https://hcanswers.org/', description: 'Non-profit staffing Housing Court help desks — free advice on answering petitions without an attorney.' },
  ],
  content: [
    {
      type: 'intro',
      body: "Receiving an eviction notice is one of the most stressful events in a tenant\'s life — and landlords know it. Many count on tenants panicking, not showing up to court, or vacating voluntarily without understanding their rights. The reality is that in New York City, actual eviction is a lengthy legal process that gives you significant time and multiple opportunities to resolve the situation or fight back. A piece of paper slipped under your door or handed to you is not an eviction. This guide explains exactly what you received, what it means, and what to do in the next 72 hours.",
    },
    {
      type: 'statrow',
      stats: [
        { value: '0', label: 'Legal evictions that happen without a court order — a landlord cannot remove you without going through Housing Court', source: 'NY Real Property Actions and Proceedings Law' },
        { value: 'Free', label: 'Legal representation available to income-eligible NYC tenants in Housing Court through Right to Counsel', source: 'NYC Universal Access to Counsel' },
        { value: '3–6 mo', label: 'Typical Housing Court timeline from petition filing to potential eviction — you have more time than you think', source: 'NYC Housing Court data' },
      ],
    },
    {
      type: 'h2',
      heading: 'Step 1: Identify What You Actually Received',
    },
    {
      type: 'body',
      body: "There are several different documents that get loosely called 'eviction notices.' What you actually received determines your next step and your timeline. Read it carefully.",
    },
    {
      type: 'table',
      rows: [
        ['Document', 'What it means', 'Your deadline'],
        ['Notice to Cure', 'Landlord says you violated the lease — fix it within X days or face eviction proceedings', 'Typically 10 days — fix the alleged violation or dispute it in writing'],
        ['Notice to Quit / Termination Notice', 'Landlord is terminating your tenancy — you must vacate by a stated date', 'Do NOT voluntarily vacate — wait for them to file in court'],
        ['Rent Demand (3-Day Notice)', 'Landlord claims you owe rent — pay within 3 days or they will sue', 'Pay if you owe it; dispute in writing if the amount is wrong'],
        ['Petition and Notice of Petition', 'Landlord has filed in Housing Court — you have been sued', 'You must respond by your court date — this is critical'],
        ['Marshal\'s Notice / Warrant of Eviction', 'A court has already ruled against you — eviction is imminent', 'Seek emergency legal help immediately — you may still have options'],
      ],
    },
    {
      type: 'warning',
      body: "Do NOT voluntarily vacate your apartment after receiving a notice to quit or termination notice before a court proceeding. A landlord\'s notice alone has no legal force to remove you — only a court order does. By leaving voluntarily, you forfeit any defences you had, lose your apartment, and may still owe rent. Stay put and let them take you to court if they intend to.",
    },
    {
      type: 'h2',
      heading: 'Step 2: The Two Types of Eviction Cases in NYC',
    },
    {
      type: 'body',
      body: "NYC Housing Court handles two main categories of eviction cases. Your rights and defences differ significantly between them.",
    },
    {
      type: 'table',
      rows: [
        ['', 'Non-Payment (NONPAY)', 'Holdover'],
        ['Why filed', 'Landlord claims you owe unpaid rent', 'Landlord claims you have no right to remain (lease ended, violated terms, etc.)'],
        ['Your primary defence', 'Pay the rent; or counterclaim for conditions (mold, pests, no heat) as rent abatement', 'Dispute the basis for termination; raise habitability issues; claim stabilisation rights'],
        ['Typical resolution', 'Stipulation (payment plan) or dismissal if rent is paid', 'Settlement, trial, or lease renewal negotiation'],
        ['Your biggest protection', 'Open HPD violations often reduce what you legally owe', 'If rent-stabilised, landlord must prove just cause for termination'],
        ['Time to resolve', '1–4 months typically', '3–9 months for contested cases'],
      ],
    },
    {
      type: 'h2',
      heading: 'Step 3: Get Legal Help — It\'s Free in NYC',
    },
    {
      type: 'step',
      stepNumber: 3,
      heading: 'Contact a tenant attorney before your court date',
      body: 'NYC has one of the strongest right-to-counsel programmes in the country. Income-eligible tenants in Housing Court eviction cases are entitled to free legal representation through the Universal Access to Counsel programme. You should contact them immediately after receiving a court petition.',
      items: [
        "Call 311 and say you need a tenant attorney for a Housing Court eviction case — they will refer you to the Right to Counsel programme.",
        "Show up early to your Housing Court date — Housing Court Help Centers are staffed by attorneys and non-profit advocates who provide free guidance, even if you don\'t qualify for full representation.",
        "Housing Court Answers (hcanswers.org) staffs desks at multiple boroughs — they can help you draft an answer to the petition on the spot.",
        "Even if you ultimately decide to move, having an attorney helps you negotiate exit terms — waived rent owed, deposit return, move-out timeline, no eviction on your record.",
      ],
    },
    { type: 'leadbait' },
    {
      type: 'h2',
      heading: 'Step 4: Raise Your Defences — Open Violations Are Powerful',
    },
    {
      type: 'body',
      body: "In non-payment cases, open HPD violations are one of the most effective defences available to tenants. If your landlord is suing you for unpaid rent but has open Class B or C HPD violations for conditions like no heat, mold, or pests, you have a counterclaim for rent abatement — a reduction in the rent you legally owed for the period during which conditions were substandard. Courts routinely reduce or eliminate the rent owed in non-payment cases where the landlord has ignored violations.",
    },
    {
      type: 'list',
      items: [
        "Pull your building\'s HPD violation record at hpdonline.nyc.gov before your court date and print it with all open violations highlighted.",
        "Bring all your written complaints to the landlord about conditions — texts, emails, building app messages.",
        "311 complaint records showing you reported conditions are additional evidence.",
        "In a holdover case where the landlord claims you violated the lease, check whether the alleged violation is actually in the lease and whether it is enforceable under NYC rent laws.",
        "If you are in a rent-stabilised apartment, the landlord must prove 'good cause\' for eviction — they cannot simply refuse to renew your lease without a specific legal reason.",
      ],
    },
    {
      type: 'h2',
      heading: 'If You\'ve Decided to Move: Protect Yourself on the Way Out',
    },
    {
      type: 'body',
      body: "Sometimes the right decision is to negotiate an exit rather than fight a case you might lose. If you decide to move, your goal is to leave with no eviction record, your deposit back, and no judgment against you. An attorney can negotiate these terms in a stipulation — and many landlords prefer a clean exit over a contested case.",
    },
    {
      type: 'list',
      items: [
        "Never agree to a stipulation without an attorney reviewing it — stipulations are binding court agreements.",
        "Push for a 'no-record\' agreement: the case is withdrawn from Housing Court records, which protects you from tenant screening databases.",
        "Negotiate the deposit return explicitly in the agreement — do not rely on the general law when you have leverage at the negotiating table.",
        "Get a realistic move-out timeline — most landlords will give 30–60 days in exchange for a clean exit.",
        "Once you have a move-out date, start getting quotes from movers immediately. NYC movers book up fast, especially for month-end moves.",
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about eviction notices in NYC',
      items: [
        {
          q: 'Can my landlord change the locks or remove my belongings if I don\'t leave after a notice to quit?',
          a: 'No. This is called an illegal lockout or self-help eviction, and it is a criminal offence in New York. A landlord cannot remove you from your apartment, change the locks, remove your belongings, or shut off your utilities to force you out — regardless of any notice they have served. Only a New York City Marshal, armed with a court-issued warrant of eviction, can legally carry out a physical eviction. If your landlord attempts any of these actions, call 911 and the Emergency Housing Court Part immediately.',
        },
        {
          q: 'I missed my Housing Court date. What happens now?',
          a: 'Missing your court date is serious — the judge will typically enter a default judgment against you, which means you lose automatically without any hearing. However, default judgments can often be vacated (overturned) if you act quickly and have a reasonable excuse for missing the date. Contact Housing Court Answers or Legal Aid immediately — same day if possible. Bring any evidence of why you missed (medical emergency, improper service of the petition, etc.). Courts are generally willing to vacate defaults for first-time absences with a reasonable explanation.',
        },
        {
          q: 'Does an eviction case show up on my rental history and prevent me from renting again?',
          a: 'A filed Housing Court case — even one that was resolved in your favour or dismissed — can appear in tenant screening reports. This is why negotiating a withdrawal of the case (rather than just a dismissal) is important if you are settling. Some tenant screening companies also report cases that were merely filed, not just adjudicated. NYC\'s Right to Counsel programme specifically focuses on helping tenants avoid eviction records, since they are often more damaging long-term than the eviction itself.',
        },
        {
          q: 'My landlord says my lease ended and I need to leave. Do I have to go?',
          a: 'Not immediately, and possibly not at all. If your apartment is rent-stabilised, your landlord must renew your lease unless they can prove one of the specifically enumerated just-cause grounds (non-payment, lease violations, owner use, etc.). If your apartment is market-rate, a holdover tenant (someone who stays after a lease ends) is still protected from self-help eviction — the landlord must take you to Housing Court. Additionally, if conditions in the apartment breach the warranty of habitability, you may have counterclaims that complicate or delay the holdover proceeding.',
        },
        {
          q: 'I received a 3-day rent demand but I paid the rent. What do I do?',
          a: 'Gather proof of payment immediately — bank statements, cancelled checks, wire transfer confirmations, money order receipts. Send the landlord a written response (email and certified mail) with proof attached, stating that rent was paid on date X and that the demand is in error. Keep a copy. If the landlord files in court anyway, your proof of payment is a complete defence to the non-payment petition. Courts dismiss these cases routinely when tenants present payment documentation.',
        },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// NEW 4: Break lease over noisy neighbour
// Intent bucket: Escaping | Service: Moving Companies
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'break-lease-noisy-neighbor-nyc',
  category: 'inspections-leasing',
  title: 'How to Break Your Lease Over a Noisy Neighbour in NYC',
  metaTitle: 'How to Break Your Lease Over a Noisy Neighbour in NYC | Building Health X',
  metaDescription: 'Constant stomping, music, or secondhand smoke from a neighbour in NYC can constitute a warranty of habitability breach. Here\'s how to document it and break your lease without penalty.',
  headline: 'How to Break Your NYC Lease Over a Noisy or Disruptive Neighbour',
  subheadline: 'When your landlord refuses to act on a chronic nuisance neighbour, the law may give you a way out — without penalties, back rent, or a broken lease on your record.',
  serviceSlug: 'moving-companies',
  serviceName: 'Moving Companies',
  leadBaitCta: 'Landlord won\'t fix it? Time to leave. Get free quotes from top-rated NYC movers.',
  datePublished: '2024-11-15',
  dateModified: '2025-03-01',
  relatedSlugs: ['how-to-break-lease-nyc-violations', 'get-security-deposit-back-nyc', 'eviction-notice-nyc-rights-next-steps'],
  relatedServicePages: [
    { label: 'Moving companies in Manhattan', href: '/services/moving-companies/manhattan' },
    { label: 'Moving companies in Brooklyn', href: '/services/moving-companies/brooklyn' },
    { label: 'Moving companies in Queens', href: '/services/moving-companies/queens' },
    { label: 'Moving companies in the Bronx', href: '/services/moving-companies/bronx' },
    { label: 'Moving companies in Staten Island', href: '/services/moving-companies/staten-island' },
  ],
  furtherReading: [
    { slug: 'how-to-break-lease-nyc-violations', title: 'How to Break Your NYC Lease Due to Landlord Violations' },
    { slug: 'eviction-notice-nyc-rights-next-steps', title: 'Received an Eviction Notice in NYC? Your Rights and Next Steps' },
    { slug: 'get-security-deposit-back-nyc', title: 'How to Get Your Security Deposit Back in NYC' },
  ],
  govLinks: [
    { label: 'NY Real Property Law §235-b — Warranty of Habitability', url: 'https://codes.findlaw.com/ny/real-property-law/rpy-sect-235-b.html', description: 'The legal basis for quiet enjoyment and habitability — including protection from chronic nuisance conditions.' },
    { label: 'NYC 311 — Noise Complaint Portal', url: 'https://portal.311.nyc.gov/', description: 'File noise complaints with 311 to create a documented record of the problem.' },
    { label: 'NYC Housing Court', url: 'https://www.courts.state.ny.us/courts/nyc/housing/', description: 'File an HP proceeding to compel your landlord to take action against a nuisance neighbour.' },
    { label: 'NYC Legal Aid Society', url: 'https://www.legalaidnyc.org/', description: 'Free legal help for eligible tenants pursuing lease termination or habitability claims.' },
  ],
  content: [
    {
      type: 'intro',
      body: "A noisy or disruptive neighbour is one of the most common reasons people want to break a lease early in NYC — and one of the least understood in terms of legal options. Landlords often brush off noise complaints as 'not their problem,\' but that is not always legally accurate. Your lease includes an implicit covenant of quiet enjoyment under New York law, and if a neighbour\'s chronic behaviour makes your apartment effectively uninhabitable — and your landlord has the power to stop it and refuses — you may have grounds to terminate your lease without penalty. This guide explains when the law is on your side, how to build the documentation, and how to get out clean.",
    },
    {
      type: 'statrow',
      stats: [
        { value: '§235-b', label: 'NY Real Property Law — your warranty of habitability covers more than physical defects; it covers any condition that materially affects your use of the apartment', source: 'NY Courts' },
        { value: '3 mo', label: 'Minimum documentation period courts typically expect before accepting a chronic nuisance claim as a basis for lease termination', source: 'Housing Court precedent' },
        { value: '$0', label: 'What you owe in penalties if you successfully establish constructive eviction from a nuisance condition — no remaining rent, no early termination fee', source: 'NY Real Property Law' },
      ],
    },
    {
      type: 'h2',
      heading: 'Does Neighbour Noise Actually Qualify as a Habitability Breach?',
    },
    {
      type: 'body',
      body: "The short answer is: sometimes, and it depends on severity, frequency, and whether your landlord had the power to stop it. Courts have found warranty of habitability breaches based on neighbour behaviour in the following circumstances:",
    },
    {
      type: 'table',
      rows: [
        ['Nuisance type', 'Legal viability as habitability breach', 'Key requirement'],
        ['Chronic loud music/stomping (30+ incidents documented)', 'Moderate — strengthens with volume and duration', 'Landlord must have been notified and failed to act'],
        ['Secondhand smoke entering your unit', 'Strong in NYC since Local Law 147 of 2017', 'Landlord has legal duty to adopt a smoking policy'],
        ['Harassment/threats from neighbour', 'Strong if documented and landlord is aware', 'Police report + written landlord notice required'],
        ['Hoarding that creates pest infestation', 'Very strong — objective health/safety condition', 'HPD violation record for the infestation is powerful evidence'],
        ['Occasional loud parties', 'Weak — courts expect occasional disturbance in dense city', 'Must be chronic, not isolated incidents'],
        ['Construction noise from neighbouring building (not your landlord)', 'Very weak — landlord typically not responsible for external noise', 'Harder to establish landlord control or duty'],
      ],
    },
    {
      type: 'h2',
      heading: 'Step 1: Build a 90-Day Documentation Log',
    },
    {
      type: 'step',
      stepNumber: 1,
      heading: 'Create a timestamped incident log starting today',
      body: 'Courts expect to see a pattern of documented incidents, not a vague claim that a neighbour is noisy. A disciplined log covering at least 60–90 days is typically what separates a successful nuisance claim from one that gets dismissed.',
      items: [
        "Create a simple spreadsheet or note with columns: date, time, duration, description of noise/incident, how it affected you (sleep disruption, inability to work, guests unable to stay, etc.)",
        "Supplement with recordings where possible — your phone placed on a table captures decibel levels and duration. NYC noise ordinance thresholds are 45 dB in bedrooms at night and 55 dB in living areas.",
        "Note every instance you complained to building management — date, method (email/call/in person), and any response received.",
        "File 311 noise complaints each time — call 311 or use the app. This creates city records with timestamps that you do not control and cannot be disputed.",
        "If the noise involves secondhand smoke, photograph smoke entering under doorways or through vents, and note any health effects (headaches, respiratory irritation) with dates.",
      ],
    },
    {
      type: 'h2',
      heading: 'Step 2: Put Your Landlord on Notice — Repeatedly and in Writing',
    },
    {
      type: 'step',
      stepNumber: 2,
      heading: 'Create a written notice trail with escalating urgency',
      body: 'Your landlord\'s legal duty to address a chronic nuisance depends partly on whether they knew about it and had a reasonable opportunity to act. This means your written notice record is as important as the incident log itself.',
      items: [
        "Send an initial written notice (email) after the first significant cluster of incidents — describe the problem, the frequency, and the impact on your ability to use the apartment.",
        "Follow up in writing every 2–3 weeks if the problem continues. Each notice should reference the previous ones and note that the situation has not improved.",
        "Escalate in tone as the pattern continues: first notice is informational, second is a formal complaint, third explicitly references the warranty of habitability and your right to a habitable apartment.",
        "If the landlord is a management company, CC both the building superintendent and the management company\'s main office — you want the written record to reach people who can actually act.",
        "If the neighbour is a fellow tenant, your landlord may be able to proceed against them for breach of their own lease\'s nuisance clause — point this out explicitly.",
      ],
    },
    {
      type: 'tip',
      body: "NYC Local Law 147 of 2017 requires all residential landlords with three or more units to adopt and distribute a written smoking policy. If secondhand smoke from a neighbour is the issue and your landlord has not adopted or enforced a smoking policy, they are in violation of the law. File a 311 complaint specifically for 'landlord failed to adopt smoking policy\' — this creates a separate legal lever.",
    },
    { type: 'leadbait' },
    {
      type: 'h2',
      heading: 'Step 3: File an HP Proceeding to Compel Action',
    },
    {
      type: 'step',
      stepNumber: 3,
      heading: 'Take the landlord to Housing Court',
      body: 'If your written notices have produced no action, an HP (Housing Part) proceeding in NYC Housing Court can compel your landlord to take steps against the nuisance neighbour. This is a powerful escalation tool and it costs nothing to file.',
      items: [
        "File the HP proceeding at your borough\'s Housing Court — the Help Center can assist you with the paperwork.",
        "Bring your full incident log, all written correspondence with the landlord, 311 complaint records, and any recordings.",
        "The court will schedule a hearing. The judge can order the landlord to take specific action — issue a notice to cure to the nuisance neighbour, begin lease termination proceedings against them, or make physical modifications to reduce noise transfer.",
        "An HP proceeding also creates a court record that strongly supports a subsequent constructive eviction claim if you decide to leave.",
      ],
    },
    {
      type: 'h2',
      heading: 'Step 4: Terminating Your Lease — the Constructive Eviction Argument',
    },
    {
      type: 'body',
      body: "If your landlord has been formally notified, had reasonable time to act, and has still not addressed the chronic nuisance, you may have grounds to claim constructive eviction — the legal theory that allows you to terminate a lease when conditions make the apartment effectively uninhabitable. This is a significant legal step and the requirements are specific.",
    },
    {
      type: 'list',
      items: [
        "The condition must be severe enough to substantially deprive you of the use of the apartment — courts require more than occasional inconvenience.",
        "You must have given the landlord written notice and a reasonable opportunity to cure (typically 30 days minimum, often longer for chronic neighbour issues).",
        "You should ideally have the HP proceeding record or at least a series of formal written complaints spanning multiple months.",
        "Send a formal lease termination letter citing constructive eviction under NY RPL §235-b, referencing your documentation log, written notices to the landlord, and the landlord\'s failure to act. State your vacate date (typically 30 days out).",
        "Importantly: consult a tenant attorney before sending this letter. Constructive eviction based on neighbour nuisance (rather than physical building defects) is a more complex claim, and the strength of your case depends heavily on how well your documentation supports it.",
      ],
    },
    {
      type: 'warning',
      body: "Do not use constructive eviction as a first move. It requires that you vacate the apartment, and if a court later finds your claim was insufficient, you could be liable for remaining rent. Build your documentation, exhaust the landlord notice process, and get legal advice before invoking constructive eviction. The documentation ladder in this guide is designed to give you the strongest possible position before that final step.",
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about breaking a lease over neighbour issues in NYC',
      items: [
        {
          q: 'My landlord says noise is "not their problem" and to deal with it myself. Is that true?',
          a: 'It depends on the nature and source of the noise. For building-related structural noise issues (thin floors, inadequate soundproofing in violation of code), the landlord does have direct responsibility. For neighbour-generated noise, the landlord\'s responsibility is more nuanced — they have a duty to enforce the lease\'s nuisance provisions against other tenants and to not allow conditions that make your apartment uninhabitable. "Not my problem" is not a legally accurate response if the noise is chronic, severe, and you have put them on notice in writing.',
        },
        {
          q: 'How many 311 complaints do I need before I have a strong case?',
          a: 'There is no magic number, but pattern is everything. Five or six 311 complaints clustered around the same time are less powerful than 15 complaints spread over 4 months showing a persistent, recurring problem. Courts look for chronicity and severity. The 311 record is most powerful as corroboration of your personal incident log, not as a standalone document.',
        },
        {
          q: 'Can I sue my noisy neighbour directly instead of dealing with the landlord?',
          a: 'Technically yes — you can file a private nuisance claim against a neighbour in Civil Court. In practice, suing a neighbour directly is slow, expensive, and uncertain, and even a judgment does not guarantee they stop the behaviour. The more effective path for most tenants is the landlord-pressure approach outlined in this guide, which uses the landlord\'s legal obligations to force action, or ultimately provides grounds to leave the apartment without penalty.',
        },
        {
          q: 'My lease has an early termination clause with a fee. Does constructive eviction override it?',
          a: 'Yes — if you successfully establish constructive eviction or a material breach of the warranty of habitability, you are entitled to terminate without the early termination fee. The basis for termination is not the early termination clause; it is the landlord\'s breach of their legal obligations. However, you will likely need to assert this as a defence if the landlord tries to collect the fee, either in a direct negotiation or in court. This is another reason to have an attorney involved before you leave.',
        },
        {
          q: 'The noisy neighbour is a month-to-month tenant. Can\'t the landlord just not renew their lease?',
          a: 'If the building is market-rate (not rent-stabilised), yes — the landlord can decline to renew a month-to-month tenancy with proper notice (typically 30 days). You can explicitly request this in writing as a solution. If the problem neighbour is in a rent-stabilised apartment, the landlord cannot simply decline to renew without just cause — they would need to pursue a holdover proceeding based on chronic nuisance, which is a longer process but is available to them if the conditions meet the legal threshold.',
        },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// SETTLING IN 1: Just signed — 5 things to do before moving in
// Bucket: Settling In | Services: Locksmith + Internet Providers
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'just-signed-nyc-lease-5-things-before-moving-in',
  category: 'inspections-leasing',
  title: 'Just Signed an NYC Lease? Do These 5 Things Before Moving In',
  metaTitle: 'Just Signed an NYC Lease? Do These 5 Things Before Moving In | Building Health X',
  metaDescription: 'Signed your NYC lease? Before you move a single box, change the locks, document existing damage, check HPD violations, set up utilities, and arrange renters insurance. Here\'s the complete checklist.',
  headline: 'Just Signed an NYC Lease? Do These 5 Things Before You Move In',
  subheadline: 'Most tenants skip all five. The ones who don\'t save themselves thousands in deposit disputes, utility headaches, and security nightmares.',
  serviceSlug: 'locksmith',
  serviceName: 'Locksmiths',
  leadBaitCta: 'Don\'t trust the old tenant\'s keys. Get a licensed NYC locksmith to change your cylinder today.',
  datePublished: '2024-12-01',
  dateModified: '2025-03-01',
  relatedSlugs: ['what-to-check-before-signing-nyc-lease', 'get-security-deposit-back-nyc', 'who-pays-pipe-burst-nyc-apartment'],
  relatedServicePages: [
    { label: 'Locksmiths in Manhattan', href: '/services/locksmith/manhattan' },
    { label: 'Locksmiths in Brooklyn', href: '/services/locksmith/brooklyn' },
    { label: 'Locksmiths in Queens', href: '/services/locksmith/queens' },
    { label: 'Locksmiths in the Bronx', href: '/services/locksmith/bronx' },
    { label: 'Internet providers in NYC', href: '/services/internet-providers' },
  ],
  furtherReading: [
    { slug: 'what-to-check-before-signing-nyc-lease', title: 'What to Check Before Signing an NYC Lease' },
    { slug: 'get-security-deposit-back-nyc', title: 'How to Get Your Security Deposit Back in NYC' },
    { slug: 'who-pays-pipe-burst-nyc-apartment', title: 'Who Pays When a Pipe Bursts in Your NYC Apartment?' },
  ],
  govLinks: [
    { label: 'NYC Admin Code §27-2043 — Tenant Lock Rights', url: 'https://www.nyc.gov/site/hpd/services-and-information/tenants.page', description: 'NYC law gives tenants the right to install and change their own door locks without landlord interference.' },
    { label: 'Con Edison — New Service Setup', url: 'https://www.coned.com/en/accounts-billing/start-stop-transfer-service', description: 'Start or transfer Con Edison electricity or gas service to your new address.' },
    { label: 'National Grid — NYC Gas Service', url: 'https://www.nationalgridus.com/ny-home/account-and-billing/start-service', description: 'Set up National Grid gas service for NYC addresses.' },
    { label: 'DHCR Move-In Letter Requirements', url: 'https://hcr.ny.gov/system/files/documents/2020/02/op-c1.pdf', description: 'Rent-stabilised tenants must receive a move-in letter with the legal regulated rent — what to check for.' },
  ],
  content: [
    {
      type: 'intro',
      body: "Signing your lease feels like the finish line. It is actually the starting gun. The days between signing and moving in are the most important window in your entire tenancy — and most tenants waste them. The five steps in this guide take less than a week total, cost under $500 combined, and protect you from the most common and expensive problems NYC renters face: deposit disputes, security incidents, utility chaos, and building surprises. Do them in order.",
    },
    {
      type: 'statrow',
      stats: [
        { value: '$0', label: 'Cost to document existing damage before move-in — worth thousands in deposit protection at move-out', source: 'Building Health X' },
        { value: '2–4 hrs', label: 'Time for a licensed locksmith to replace your cylinder and re-key your apartment in NYC', source: 'NYC locksmith industry average' },
        { value: '2–6 wks', label: 'Lead time some NYC internet providers need to schedule installation — book before you move in', source: 'Provider data' },
      ],
    },
    {
      type: 'h2',
      heading: 'Thing 1: Change Your Locks (You Have the Legal Right)',
    },
    {
      type: 'body',
      body: "In New York City, tenants have a legal right to change or add their own locks without landlord permission under NYC Admin Code. The previous tenant had your keys. Their friends, ex-partners, delivery contacts, and anyone they gave a spare to also had your keys. You have no idea how many copies exist. Changing the cylinder is not optional — it is basic security.",
    },
    {
      type: 'list',
      items: [
        "You do not need landlord permission to replace the lock cylinder — NYC law is explicit on this. You do need to provide the landlord with a copy of the new key upon request.",
        "Do not replace the entire lock body — just the cylinder. This preserves the door hardware the landlord owns while giving you control of who has access.",
        "Use a licensed NYC locksmith rather than a hardware store DIY job — a professional will ensure the new cylinder is the same grade or better, properly fitted, and comes with documented key control.",
        "Re-key all entrance doors on day one: front door, any back or side doors, mailbox if it uses a separate key.",
        "If your building has a doorman or key fob system, verify how building-level access is managed and whether you can request deactivation of old access credentials.",
      ],
    },
    {
      type: 'leadbait',
    },
    {
      type: 'h2',
      heading: 'Thing 2: Do a Damage Walkthrough — On Video, Before Any Furniture Arrives',
    },
    {
      type: 'step',
      stepNumber: 2,
      heading: 'Record every existing imperfection before your first box comes in',
      body: 'This is the single most important thing you can do to protect your security deposit. NYC landlords routinely attempt to deduct for damage that existed before the tenant moved in. Your only defence is a timestamped record created before you took possession.',
      items: [
        "Record a continuous, narrated video walkthrough of every room. Open every cabinet, check under the sink, pan slowly across every wall and ceiling.",
        "Call out and close-up every mark, scratch, stain, chip, crack, and imperfection. Say the date and time aloud at the start of the recording.",
        "Check every fixture: test all light switches, run all taps, flush toilets, check that all windows open and lock, test the stove, run the shower.",
        "Photograph the inside of appliances — fridges and ovens are common deduction targets. Also photograph the inside of closets and the condition of the flooring under where furniture will go.",
        "Email the video to yourself and a cloud backup the same day. The metadata timestamp is your legal evidence — never edit the file after this point.",
        "Send a written summary of major pre-existing issues to your landlord by email immediately. This creates a record that they knew about the conditions from day one.",
      ],
    },
    {
      type: 'h2',
      heading: 'Thing 3: Pull the Building\'s HPD Record Right Now',
    },
    {
      type: 'step',
      stepNumber: 3,
      heading: 'Check for violations and complaints you didn\'t know about',
      body: 'You probably checked the building before signing — but run it again now that you have the specific unit number. Unit-level violations matter more than building-level summary data.',
      items: [
        "Search hpdonline.nyc.gov for your exact address. Look specifically for violations on your unit number — not just the building.",
        "Check the complaint tab as well as the violations tab. Complaints show what tenants reported even if an inspector never came.",
        "Look for any open violations in your unit. If there are open Class B or C violations, notify your landlord in writing before move-in that you are aware of them and expect them to be resolved.",
        "Check the BHX Score for your building — the pest history and heat reliability sub-scores are the most predictive of problems you will experience as a tenant.",
        "Screenshot everything with the date visible. This document proves you reported pre-existing violations and cannot be held responsible for them later.",
      ],
    },
    {
      type: 'h2',
      heading: 'Thing 4: Set Up Utilities and Internet Before Move-In Day',
    },
    {
      type: 'step',
      stepNumber: 4,
      heading: 'Book internet installation before you move in — not after',
      body: 'This is the most consistently underestimated task. Internet installation in NYC buildings can take 2–6 weeks depending on provider and building infrastructure. Moving in with no internet and working from a hotspot for a month is entirely avoidable.',
      items: [
        "Electricity (Con Edison): Transfer or start service at coned.com at least 5 business days before move-in. It takes minutes online.",
        "Gas (Con Edison or National Grid): Call to transfer gas service — do not assume it transfers automatically with electricity. Gas requires a separate account.",
        "Internet: Check which providers service your building first — not all are available in all buildings. Options vary by building: Spectrum, Verizon Fios (if your building has fiber), Astound/RCN, or building-managed providers. Book installation the same day you sign your lease.",
        "If your building has a managed internet provider (common in newer buildings), check whether service is included in rent or billed separately — read the lease clause.",
        "Renters insurance: Many NYC leases require it. Even those that don\'t should — NYC renters insurance starts at ~$15/month. Set this up before move-in so you\'re covered from day one.",
      ],
    },
    {
      type: 'h2',
      heading: 'Thing 5: Get Your Move-In Letter (Rent-Stabilised Tenants Only)',
    },
    {
      type: 'step',
      stepNumber: 5,
      heading: 'Request your stabilisation documents if you\'re in a regulated apartment',
      body: 'If your building is rent-stabilised, your landlord is legally required to give you a move-in letter stating the legal regulated rent, the previous tenant\'s rent, and a copy of the DHCR lease rider. Many don\'t provide it without being asked.',
      items: [
        "Request the move-in letter in writing before or at lease signing. State that you are requesting it pursuant to the Rent Stabilization Code.",
        "Verify that the rent stated in your lease matches the registered legal rent in the DHCR system — search at apps.hcr.ny.gov.",
        "If the numbers don\'t match, this is a red flag for illegal deregulation or overcharging. Do not ignore it — request the full rent history.",
        "If the landlord refuses to provide the move-in letter, this itself is a violation you can report to DHCR.",
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about moving into an NYC apartment',
      items: [
        {
          q: 'Can my landlord refuse to let me change the locks?',
          a: 'No. NYC Administrative Code gives tenants the right to change their apartment door locks. The only requirement is that you must provide the landlord with a copy of the new key upon request. If your landlord threatens lease termination or makes any threat over you changing the locks, document it in writing — this is a tenant rights violation.',
        },
        {
          q: 'Which internet provider is best for NYC apartments?',
          a: 'Availability depends entirely on your building. Verizon Fios is considered best-in-class for speed and reliability but is only available in buildings already wired for fiber — check at verizon.com. Spectrum (formerly Charter/TWC) is the widest-coverage cable provider and available in most NYC buildings. Astound (formerly RCN) is available in parts of Manhattan, Brooklyn, and the Bronx and is often cheaper than Spectrum. Always check availability for your specific address rather than the neighbourhood generally.',
        },
        {
          q: 'Do I need renters insurance if my lease doesn\'t require it?',
          a: 'Yes — not legally, but practically. Your landlord\'s building insurance covers the structure; nothing covers your belongings, your liability, or your temporary housing costs if the apartment becomes uninhabitable. NYC renters insurance typically costs $12–$20/month for $25,000–$50,000 of personal property coverage plus $100,000+ in liability. The cost of not having it after a fire, flood, or theft is devastating.',
        },
        {
          q: 'What happens if I find serious damage after I move in?',
          a: 'Notify the landlord in writing immediately — the same day if possible. If the damage was not disclosed before move-in and makes the apartment uninhabitable, you have a warranty of habitability claim regardless of how long ago you moved in. For conditions that were pre-existing but the landlord denied: your move-in video documentation becomes critical evidence that the condition was there before you arrived.',
        },
        {
          q: 'How do I set up electricity in NYC if I\'ve never done it before?',
          a: 'Go to coned.com and select "Start Service." You will need your new address, move-in date, Social Security Number or ITIN, and a payment method. The process takes about 10 minutes online. If your apartment uses gas for cooking or heating, you need to set up gas service separately — either with Con Edison (for most of Manhattan and parts of Brooklyn) or National Grid (for most of Brooklyn, Queens, Staten Island, and parts of the Bronx). Call the provider — gas setup requires a phone call, not just online signup.',
        },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// SETTLING IN 2: Can I paint my NYC apartment?
// Bucket: Settling In | Services: Painters + Electricians + Furniture Assembly
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'can-i-paint-my-nyc-apartment',
  category: 'inspections-leasing',
  title: 'Can I Paint My NYC Apartment? Rules for Customizing Your Rental',
  metaTitle: 'Can I Paint My NYC Apartment? NYC Rental Customization Rules | Building Health X',
  metaDescription: 'NYC renters can paint walls, hang fixtures, and customize their apartment — within limits. Here\'s exactly what the law allows, what requires landlord permission, and how to avoid deposit deductions when you leave.',
  headline: 'Can I Paint My NYC Apartment? The Complete Rules for Customizing Your Rental',
  subheadline: 'Walls, fixtures, shelves, and light fittings — what you can change without asking, what needs permission, and how to do it without losing your deposit.',
  serviceSlug: 'painters',
  serviceName: 'Painters',
  leadBaitCta: 'Get a quote from a renter-friendly NYC painter who knows how to restore walls at move-out.',
  datePublished: '2024-12-01',
  dateModified: '2025-03-01',
  relatedSlugs: ['just-signed-nyc-lease-5-things-before-moving-in', 'get-security-deposit-back-nyc', 'what-to-check-before-signing-nyc-lease'],
  relatedServicePages: [
    { label: 'Painters in Manhattan', href: '/services/painters/manhattan' },
    { label: 'Painters in Brooklyn', href: '/services/painters/brooklyn' },
    { label: 'Painters in Queens', href: '/services/painters/queens' },
    { label: 'Electricians in Manhattan', href: '/services/electricians/manhattan' },
    { label: 'Furniture assembly in NYC', href: '/services/furniture-assembly' },
  ],
  furtherReading: [
    { slug: 'get-security-deposit-back-nyc', title: 'How to Get Your Security Deposit Back in NYC' },
    { slug: 'just-signed-nyc-lease-5-things-before-moving-in', title: 'Just Signed an NYC Lease? Do These 5 Things Before Moving In' },
    { slug: 'clear-hpd-electrical-violation-nyc', title: 'How to Clear an HPD Electrical Violation in NYC' },
  ],
  govLinks: [
    { label: 'NYC HPD — Landlord Painting Obligations', url: 'https://www.nyc.gov/site/hpd/services-and-information/painting.page', description: 'NYC law requires landlords to paint apartments every 3 years and between tenancies.' },
    { label: 'NYC DOB — Electrical Permit Requirements', url: 'https://www.nyc.gov/site/buildings/permits/permits-overview.page', description: 'Overview of what electrical work requires a DOB permit in NYC residential buildings.' },
  ],
  content: [
    {
      type: 'intro',
      body: "Your apartment is your home — even if you rent it. New York City law and most standard leases give you more customization rights than most tenants realise, and far fewer restrictions than most landlords imply. The question of whether you can paint, hang a shelf, or swap out a light fixture is not simply 'whatever your landlord says\' — there is actual law here. This guide explains what you can do without permission, what requires a conversation, what requires a licensed professional, and how to ensure that whatever you change doesn\'t cost you your deposit when you leave.",
    },
    {
      type: 'table',
      rows: [
        ['Customization', 'Permission needed?', 'Restore at move-out?', 'Notes'],
        ['Painting walls a non-white colour', 'Check lease — most require it', 'Yes — back to white or original', 'Landlord must repaint every 3 years regardless'],
        ['Painting walls white', 'Generally no', 'No', 'You\'re doing the landlord\'s job for them'],
        ['Small nail holes for pictures', 'No', 'Fill with spackling at move-out', 'Courts consider this normal wear and tear'],
        ['Large wall anchors or bolts', 'Technically a lease violation', 'Patch and paint', 'Fill and paint before leaving'],
        ['Swapping light fixture / chandelier', 'No for like-for-like; Yes if electrical work', 'Store and reinstall original at move-out', 'Must use licensed electrician for any wiring'],
        ['Installing shelving (wall-mounted)', 'Check lease', 'Remove and patch', 'Use proper anchors — don\'t leave gaps in walls'],
        ['Changing cabinet hardware', 'Generally no', 'Store originals, reinstall at move-out', 'Keep every screw in a labelled bag'],
        ['Window AC unit installation', 'Usually requires notification', 'Remove at move-out', 'May need landlord-provided bracket in some buildings'],
      ],
    },
    {
      type: 'h2',
      heading: 'Painting: Your Rights and the 3-Year Rule',
    },
    {
      type: 'body',
      body: "NYC Administrative Code requires landlords of multiple dwellings to repaint apartments at least every three years and between every tenancy. This means if you moved into a freshly painted white apartment, your landlord cannot deduct painting costs from your deposit simply because you lived there normally — they were going to repaint anyway. However, if you painted the walls a dark colour, you are responsible for restoring them to the original state (or a neutral white) before leaving.",
    },
    {
      type: 'list',
      items: [
        "Check your lease's painting clause before you pick up a roller. Many leases require written permission for any colour other than white. A clause saying 'tenant may not alter the apartment' without specifics is generally interpreted to include painting.",
        "If your lease is silent on painting, you are in a greyer area — technically you have a right to 'quiet enjoyment\' of the apartment, which some courts have interpreted to include painting. When in doubt, ask in writing so you have a record.",
        "The safest approach: email your landlord asking permission to paint a specific colour, and ask them to confirm in writing. Most reasonable landlords agree, especially if you commit to repainting at move-out.",
        "If you do paint: keep the paint brand, colour code, and finish so you can touch up or restore accurately. Paint the original colour on a piece of cardboard and photograph it before covering it.",
        "At move-out: you are responsible for a 'broom clean\' condition. If you painted a deep colour, you may need 2 coats of white primer plus 1–2 coats of white paint to fully cover it. Budget for this if you go bold.",
      ],
    },
    {
      type: 'leadbait',
    },
    {
      type: 'h2',
      heading: 'Light Fixtures and Electrical Changes',
    },
    {
      type: 'body',
      body: "Swapping out a light fixture is one of the most effective and reversible ways to personalise a rental. The legal and safety rules are straightforward: you can swap a fixture for a like-for-like replacement without a permit. Any work that involves the building\'s wiring — adding circuits, relocating junction boxes, installing ceiling fans with new wiring — requires a licensed Master Electrician and likely a DOB permit.",
    },
    {
      type: 'list',
      items: [
        "Always store the original fixture carefully — box it with the mounting hardware, label it with the room, and keep it in a closet. Reinstalling the original at move-out takes 20 minutes and avoids any deduction.",
        "Turn off the circuit breaker before touching any wiring — and verify the circuit is off with a non-contact voltage tester before touching wires.",
        "Ceiling fan installation: if you are replacing a light fixture with a ceiling fan, you need a fan-rated junction box (not just a light-rated box), which typically requires an electrician to install. If the existing box is already fan-rated, it\'s a straightforward swap.",
        "Dimmers and smart switches: replacing a standard switch with a dimmer or smart switch is generally a no-permit job on an existing circuit. Store the original switches and reinstall at move-out.",
        "Any work beyond these simple swaps — adding outlets, running new circuits, installing new junction boxes — requires a NYC Master Electrician and likely a DOB permit.",
      ],
    },
    {
      type: 'h2',
      heading: 'Furniture Assembly and Wall-Mounted Items',
    },
    {
      type: 'body',
      body: "Flat-pack furniture assembly is the universal NYC rental experience. Beyond standalone furniture, wall-mounted items — shelves, TV mounts, pegboards, and picture rails — require some thought about how they attach and what traces they leave.",
    },
    {
      type: 'list',
      items: [
        "Small nail holes (up to 1/8 inch) for picture hanging are universally considered normal wear and tear in NYC courts — no landlord can deduct for these.",
        "Larger anchors and bolts leave 1/2–3/4 inch holes that require spackling and painting. This is your responsibility at move-out — it is a 20-minute job per hole with the right materials.",
        "For heavy wall-mounted items like TV mounts or floating shelves: use proper toggle bolts or locate studs. The structural repair obligation is the same regardless of size, but improper anchoring creates safety risks during the tenancy.",
        "Command strips and adhesive hooks are the safest approach for lighter items — they leave no holes. Always check the weight rating and remove them slowly and correctly (pull the tab parallel to the wall, not away from it) to avoid paint damage.",
        "For complex furniture assembly — modular systems, Murphy beds, large bookshelves — a professional furniture assembly service saves time and ensures the piece is properly secured.",
      ],
    },
    {
      type: 'tip',
      body: "Create a 'restoration kit\' on day one: buy a small can of white touch-up paint (same sheen as your walls — typically flat or eggshell for NYC apartments), a tube of spackling compound, a putty knife, and a small foam roller. Keep it in a closet. At move-out, you can patch and touch up minor wall imperfections in under an hour, eliminating the most common deposit deductions.",
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about customizing your NYC rental',
      items: [
        {
          q: 'My landlord says I can\'t hang anything on the walls. Is that enforceable?',
          a: 'A blanket prohibition on hanging anything — including small picture hooks — is difficult to enforce and courts rarely uphold it against tenants who leave walls in normal condition. Small nail holes for pictures are universally considered normal wear and tear in NYC. A lease clause prohibiting all wall modifications may be enforceable for large-scale alterations, but should not prevent you from hanging a few frames. That said, read your specific lease — if it has an explicit clause, document any holes you make and patch them perfectly before leaving.',
        },
        {
          q: 'Can I install a ceiling fan in my NYC apartment?',
          a: 'Yes, if you replace an existing light fixture and the junction box is fan-rated. The key check is the ceiling junction box — a standard light-rated box is not rated for the weight and torque of a ceiling fan. If the existing box is not fan-rated, a licensed electrician needs to replace it (usually a 1–2 hour job). Store the original light fixture and reinstall it at move-out. The fan itself goes with you.',
        },
        {
          q: 'What paint finish should I use for NYC apartment walls?',
          a: 'Most NYC apartments use flat or matte finish on walls and semi-gloss on trim. Flat hides imperfections better but is harder to clean. Eggshell is a popular compromise — slightly washable while still hiding the bumps common in older plaster walls. If you\'re painting over existing paint, use the same finish to avoid sheen inconsistencies. For bathrooms and kitchens where moisture is an issue, use satin or semi-gloss.',
        },
        {
          q: 'Do I need permission to install a floating shelf?',
          a: 'Check your lease for any prohibition on "alterations." For a wall-mounted floating shelf, you are drilling into the wall — this arguably constitutes an alteration. Most landlords do not object to reasonable shelving, but asking via email first protects you. At move-out, remove the shelf, fill the holes with spackling, let it dry, sand smooth, and touch up with paint. Done properly, the wall looks original.',
        },
        {
          q: 'My apartment has ugly light fixtures. Can I just swap them out?',
          a: 'Yes — this is one of the easiest and most impactful rental upgrades. Turn off the circuit breaker, verify the power is off, unscrew the existing fixture, note which wires connect where (photograph it), connect the new fixture in the same configuration, and mount it. Store the original fixture with all its hardware. At move-out, you reinstall the original in 20 minutes and take your nicer fixture with you. No landlord permission required for a like-for-like replacement at the same junction box.',
        },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// SETTLING IN 3: Renters insurance — what NYC landlords require
// Bucket: Settling In | Service: Renters Insurance
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'nyc-renters-insurance-what-landlords-require',
  category: 'inspections-leasing',
  title: 'What NYC Landlords Require for Renters Insurance (And What It Actually Costs)',
  metaTitle: 'What NYC Landlords Require for Renters Insurance | Building Health X',
  metaDescription: 'Most NYC leases require renters insurance. Here\'s exactly what landlords can legally demand, what coverage you actually need, and how to get the right policy for under $20/month.',
  headline: 'What NYC Landlords Require for Renters Insurance — And What You Actually Need',
  subheadline: 'The lease clause decoded: what landlords can legally require, what coverage limits make sense in NYC, and how to buy the right policy without overpaying.',
  serviceSlug: 'renters-insurance',
  serviceName: 'Renters Insurance',
  leadBaitCta: 'Get 3 instant NYC renters insurance quotes — most policies approved same day.',
  datePublished: '2024-12-01',
  dateModified: '2025-03-01',
  relatedSlugs: ['who-pays-pipe-burst-nyc-apartment', 'just-signed-nyc-lease-5-things-before-moving-in', 'get-security-deposit-back-nyc'],
  relatedServicePages: [
    { label: 'Renters insurance in Manhattan', href: '/services/renters-insurance/manhattan' },
    { label: 'Renters insurance in Brooklyn', href: '/services/renters-insurance/brooklyn' },
    { label: 'Renters insurance in Queens', href: '/services/renters-insurance/queens' },
    { label: 'Renters insurance in the Bronx', href: '/services/renters-insurance/bronx' },
    { label: 'Renters insurance in Staten Island', href: '/services/renters-insurance/staten-island' },
  ],
  furtherReading: [
    { slug: 'who-pays-pipe-burst-nyc-apartment', title: 'Who Pays When a Pipe Bursts in Your NYC Apartment?' },
    { slug: 'just-signed-nyc-lease-5-things-before-moving-in', title: 'Just Signed an NYC Lease? Do These 5 Things Before Moving In' },
    { slug: 'how-to-break-lease-nyc-violations', title: 'How to Break Your NYC Lease Due to Landlord Violations' },
  ],
  govLinks: [
    { label: 'NY Department of Financial Services — Renters Insurance Guide', url: 'https://www.dfs.ny.gov/consumers/property_insurance/renters', description: 'State regulator\'s guide to renters insurance in New York, including your rights as a policyholder.' },
    { label: 'NY DFS — Insurance Company License Lookup', url: 'https://myportal.dfs.ny.gov/web/guest-applications/ins-co-search', description: 'Verify that any insurance company offering you a policy is licensed to operate in New York State.' },
  ],
  content: [
    {
      type: 'intro',
      body: "More than half of all NYC leases contain a renters insurance clause. Most tenants sign without fully understanding what they are agreeing to, buy the cheapest policy they can find, and discover years later that their coverage was inadequate or the landlord\'s specific requirements were not met. This guide decodes the standard NYC renters insurance lease clause, explains what landlords can and cannot legally require, and tells you exactly what to buy and why.",
    },
    {
      type: 'statrow',
      stats: [
        { value: '$15–$20', label: 'Average monthly cost of renters insurance in NYC for $30,000 personal property + $100,000 liability', source: 'NY DFS 2024' },
        { value: '$100K', label: 'Minimum liability coverage most NYC landlords and co-op/condo boards require in the lease', source: 'NYC lease standard' },
        { value: 'Same day', label: 'How quickly most NYC renters insurance policies can be bound — critical if your lease requires proof before key handover', source: 'Insurance industry' },
      ],
    },
    {
      type: 'h2',
      heading: 'What the Lease Clause Actually Says — and What It Means',
    },
    {
      type: 'body',
      body: "A standard NYC renters insurance clause typically requires the tenant to maintain renters/personal liability insurance throughout the tenancy, name the landlord as an 'additional interested party\' or 'additional insured,\' and provide proof of insurance upon request. Here\'s what each term means in practice.",
    },
    {
      type: 'table',
      rows: [
        ['Lease term', 'What it means', 'What you need to do'],
        ['"Maintain renters insurance"', 'You must have active coverage for the full tenancy — not just at move-in', 'Set up auto-renewal and never let the policy lapse'],
        ['"Minimum $100,000 liability"', 'Your policy\'s personal liability coverage must be at least $100,000', 'Standard policies include $100K–$300K liability — confirm the limit'],
        ['"Name landlord as additional interested party"', 'Landlord gets notified if the policy lapses or is cancelled', 'Ask your insurer to add the landlord — provide their legal entity name and address'],
        ['"Additional insured"', 'Stronger requirement — landlord can make a claim on your policy', 'Less common; confirm exactly what the lease says before purchasing'],
        ['"Provide proof of insurance"', 'You must show a certificate of insurance (COI) on request', 'Your insurer issues a COI — request one immediately after binding the policy'],
      ],
    },
    {
      type: 'h2',
      heading: 'What Can a Landlord Legally Require?',
    },
    {
      type: 'body',
      body: "Landlords in NYC can contractually require you to maintain renters insurance as a lease condition — this is enforceable. They can specify minimum coverage limits (most commonly $100,000 in liability). They can require to be named as an additional interested party.",
    },
    {
      type: 'body',
      body: "What they cannot legally require: they cannot force you to buy insurance from a specific provider or through their preferred agent (this would constitute illegal tied selling). They cannot require coverage limits that are unreasonably high — courts have found requirements for $1M+ in liability on a standard rental to be unenforceable. They cannot charge you a separate fee in lieu of insurance without it being an explicit, separately agreed lease addendum.",
    },
    {
      type: 'h2',
      heading: 'What Coverage Do You Actually Need in NYC?',
    },
    {
      type: 'table',
      rows: [
        ['Coverage type', 'Recommended limit for NYC', 'Why'],
        ['Personal property', '$25,000–$50,000', 'Electronics, furniture, clothing add up fast in a furnished apartment'],
        ['Personal liability', '$100,000 minimum; $300,000 recommended', 'If you accidentally flood your downstairs neighbour, $100K covers most claims; $300K protects against serious injury claims'],
        ['Loss of use / ALE', '20–30% of property limit or $10,000+', 'NYC hotel costs are high — you need this if your unit becomes uninhabitable'],
        ['Medical payments', '$1,000–$5,000', 'Covers minor medical expenses for guests injured in your apartment'],
        ['Deductible', '$250–$500', 'Lower deductibles mean higher premiums — $500 is a reasonable middle ground'],
      ],
    },
    { type: 'leadbait' },
    {
      type: 'h2',
      heading: 'Replacement Cost vs. Actual Cash Value — This Matters',
    },
    {
      type: 'body',
      body: "This is the most important policy detail most tenants do not understand until they file a claim. Renters insurance personal property coverage comes in two versions:",
    },
    {
      type: 'list',
      items: [
        "Replacement Cost Value (RCV): pays what it costs to buy a new equivalent item today. Your 3-year-old laptop stolen in a burglary? The policy pays what a similar laptop costs new.",
        "Actual Cash Value (ACV): pays the depreciated value of the item. Your 3-year-old laptop? The policy pays what it would sell for used — often a fraction of replacement cost.",
        "RCV policies cost 10–15% more per month but are vastly superior for expensive items like electronics, jewellery, and appliances.",
        "Always choose Replacement Cost Value coverage, especially in NYC where replacing electronics and furniture at current prices is expensive.",
        "High-value items like jewellery, cameras, or musical instruments above $1,500–$2,000 typically require a separate 'scheduled personal property\' rider — standard policies have sublimits for these categories.",
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about renters insurance in NYC',
      items: [
        {
          q: 'Can my landlord evict me for not having renters insurance if it\'s in my lease?',
          a: 'Technically, failing to maintain renters insurance as required by your lease is a lease violation that could be cited in a holdover proceeding. In practice, most landlords use this as leverage rather than as an eviction trigger — they will demand proof of coverage before the situation escalates. If your landlord sends a notice about the insurance requirement, respond with a COI promptly. Get the policy the same day if necessary.',
        },
        {
          q: 'What does "name the landlord as additional insured" actually mean?',
          a: '"Additional interested party\' means the landlord gets notified of policy changes or cancellations — this is standard and easy to arrange. "Additional insured" is a stronger status that allows the landlord to make claims on your policy — this is less common and more expensive. Read your lease carefully to determine which is required, since they are legally distinct. Most standard NYC residential leases require additional interested party status, not full additional insured.',
        },
        {
          q: 'My roommate has renters insurance. Am I covered under their policy?',
          a: 'Only if you are specifically named on the policy as an additional insured. A roommate\'s standard renters insurance covers their personal property and their liability — not yours. If you are not named on the policy and you have a claim (your laptop is stolen, you accidentally flood the unit below), you have no coverage. You need your own policy or need to be explicitly added to theirs.',
        },
        {
          q: 'What\'s not covered by standard renters insurance in NYC?',
          a: 'Common exclusions: flood damage from external sources (rising groundwater, street flooding — requires separate flood insurance), earthquake damage, intentional damage by the policyholder, pest damage (bed bugs, rodents), gradual water damage from a leak you knew about but ignored, and high-value items above sublimits (jewellery, fine art, musical instruments) without a scheduled rider. Read the exclusions section of your specific policy — they vary by insurer.',
        },
        {
          q: 'How quickly can I get renters insurance in NYC?',
          a: 'Most major renters insurance providers (Lemonade, State Farm, Allstate, Jetty, and others) can bind a policy and issue a Certificate of Insurance within 24 hours, and often within minutes online. If your landlord requires proof before key handover, apply the morning of your lease signing. Lemonade in particular is popular with NYC renters for its fast app-based approval process, though you should compare quotes across multiple providers before deciding.',
        },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// RESEARCHING +: Avoid broker fee scams
// Bucket: Researching | Service: Real Estate Agents
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'avoid-broker-fee-scams-fake-listings-nyc',
  category: 'inspections-leasing',
  title: 'How to Avoid Broker Fee Scams and Fake Listings in NYC',
  metaTitle: 'How to Avoid Broker Fee Scams and Fake Listings in NYC | Building Health X',
  metaDescription: 'Bait-and-switch listings, illegal broker fees, and ghost apartments are rampant in NYC. Here\'s how to verify a broker\'s license, spot fake listings, and know your legal rights on fees.',
  headline: 'How to Avoid Broker Fee Scams and Fake Listings in NYC',
  subheadline: 'Bait-and-switch apartments, illegal fees, unlicensed brokers, and ghost listings — how to spot each one before you\'re out $5,000 and stuck in a lease you didn\'t want.',
  serviceSlug: 'real-estate-agents',
  serviceName: 'Real Estate Agents',
  leadBaitCta: 'Tired of StreetEasy games? Get matched with a vetted, tenant-first NYC broker who negotiates for you.',
  datePublished: '2024-12-01',
  dateModified: '2025-03-01',
  relatedSlugs: ['what-to-check-before-signing-nyc-lease', 'is-my-nyc-apartment-secretly-rent-stabilised', 'just-signed-nyc-lease-5-things-before-moving-in'],
  relatedServicePages: [
    { label: 'Real estate agents in Manhattan', href: '/services/real-estate-agents/manhattan' },
    { label: 'Real estate agents in Brooklyn', href: '/services/real-estate-agents/brooklyn' },
    { label: 'Real estate agents in Queens', href: '/services/real-estate-agents/queens' },
  ],
  furtherReading: [
    { slug: 'what-to-check-before-signing-nyc-lease', title: 'What to Check Before Signing an NYC Lease' },
    { slug: 'is-my-nyc-apartment-secretly-rent-stabilised', title: 'Is Your NYC Apartment Secretly Rent-Stabilised?' },
    { slug: 'get-security-deposit-back-nyc', title: 'How to Get Your Security Deposit Back in NYC' },
  ],
  govLinks: [
    { label: 'NY DOS — Real Estate Broker License Lookup', url: 'https://www.dos.ny.gov/licensing/lookup.html', description: 'Verify any NYC real estate broker or agent holds a valid NYS license before paying a fee.' },
    { label: 'NY Homes and Community Renewal — FARE Act', url: 'https://hcr.ny.gov/', description: 'NYC\'s Fairness in Apartment Rental Expenses Act — landlords must pay broker fees when they hire the broker.' },
    { label: 'NYC Consumer and Worker Protection — Report a Scam', url: 'https://www.nyc.gov/site/dca/consumers/file-complaint.page', description: 'File a complaint about illegal broker fees or fraudulent rental listings with NYC DCWP.' },
  ],
  content: [
    {
      type: 'intro',
      body: "New York City has the most competitive and most scam-ridden rental market in the country. Fake listings designed to harvest your information, bait-and-switch apartments that don\'t exist, unlicensed 'brokers\' charging fees they have no right to collect, and illegal landlord-side fees being passed to tenants are all common. The NYC FARE Act, which took effect in 2025, changed who pays broker fees — but enforcement is uneven and many tenants are still being charged illegally. This guide gives you the tools to protect yourself at every step.",
    },
    {
      type: 'statrow',
      stats: [
        { value: 'FARE Act', label: 'NYC law effective 2025 — when a landlord hires the broker, the landlord pays the fee, not the tenant', source: 'NYC FARE Act 2025' },
        { value: '15%', label: 'Maximum legal broker fee when a tenant hires their own broker — one month\'s rent or 15% of annual rent, whichever applies', source: 'NYC DOS' },
        { value: '$0', label: 'What you owe a broker who was hired by your landlord — under the FARE Act, this fee must be paid by the landlord', source: 'NYC FARE Act 2025' },
      ],
    },
    {
      type: 'h2',
      heading: 'The NYC FARE Act: The Broker Fee Rule That Changed Everything',
    },
    {
      type: 'body',
      body: "The Fairness in Apartment Rental Expenses (FARE) Act took effect in NYC in 2025 and fundamentally changed the broker fee landscape. The core rule: if the landlord or management company hires the broker to find a tenant, the landlord pays the broker fee — not the tenant. You only owe a broker fee if you, the tenant, specifically hired and engaged that broker to represent you.",
    },
    {
      type: 'list',
      items: [
        "If you find a listing on StreetEasy, Zillow, Apartments.com, or a building\'s own website, and a broker reaches out to show you the apartment — that broker was likely hired by the landlord. You may owe nothing.",
        "If you called a brokerage and specifically asked them to search for apartments on your behalf and represent you in negotiations — you hired that broker and the fee applies.",
        "Many landlords and brokers are not complying with the FARE Act and are still trying to charge tenants. Knowing the law is your first defence.",
        "If a landlord-side broker asks you to pay the fee, get it in writing, then consult NYC DCWP (Department of Consumer and Worker Protection) or a tenant attorney.",
        "Some landlords are responding to the FARE Act by raising list rents to offset the cost — compare net effective rents across multiple listings rather than focusing solely on the advertised rent.",
      ],
    },
    {
      type: 'h2',
      heading: 'How to Spot a Fake or Bait-and-Switch Listing',
    },
    {
      type: 'body',
      body: "Fake listings and bait-and-switch tactics are epidemic on NYC rental platforms. The tell-tale signs:",
    },
    {
      type: 'table',
      rows: [
        ['Red flag', 'What it means', 'What to do'],
        ['Price significantly below comparable apartments', 'Ghost listing to harvest contact info', 'Search the address on HPD Online and Google Street View before contacting anyone'],
        ['"Sorry, that one just rented — but I have similar ones"', 'Classic bait-and-switch', 'Decline and report the listing to the platform'],
        ['Photos show a luxury apartment; actual unit looks nothing like it', 'Stock photos or photos from a different unit', 'Demand to see the specific unit before any payment'],
        ['Requests payment before you see the apartment', 'Scam', 'Never pay anything before a signed lease on a viewed unit'],
        ['Broker cannot tell you the owner\'s name or building address upfront', 'Ghost listing or unverified property', 'Require full address before any viewing'],
        ['Unusually fast pressure to sign immediately or "lose it"', 'Manufactured urgency', 'Real apartments wait 24–48 hours for a reasonable decision'],
      ],
    },
    {
      type: 'h2',
      heading: 'How to Verify a Broker\'s License in 60 Seconds',
    },
    {
      type: 'step',
      stepNumber: 1,
      heading: 'Check the NY DOS license lookup before paying anyone anything',
      body: 'Every legitimate real estate broker and agent in New York must hold a valid NYS Department of State license. Unlicensed individuals posing as brokers cannot legally collect fees — and you can report them to NYC DCWP.',
      items: [
        "Go to dos.ny.gov/licensing/lookup.html and search by the broker\'s name or the brokerage firm\'s name.",
        "Verify: the license is 'Active\' (not expired or suspended), the license type matches (Real Estate Broker for firms, Real Estate Salesperson for individual agents), and the name matches the person you are dealing with.",
        "If an individual cannot produce a license number and it does not appear in the DOS lookup, they are operating illegally. Do not pay them anything.",
        "A brokerage firm must also be licensed separately from the individual agents within it — check both.",
      ],
    },
    { type: 'leadbait' },
    {
      type: 'h2',
      heading: 'Illegal Fees to Watch For (Beyond Broker Fees)',
    },
    {
      type: 'body',
      body: "Beyond illegal broker fees, NYC tenants are regularly charged fees that have no legal basis. Know what is and is not legitimate:",
    },
    {
      type: 'list',
      items: [
        "'Application fees\': Landlords can charge a reasonable application fee to cover a credit check — typically $20–$50. Anything significantly higher is likely illegal profiteering and should be refused.",
        "'Move-in fees\': One-time move-in fees charged by management companies in addition to the security deposit are not legal in NYC — security deposits are the only upfront payment landlords are entitled to beyond first month\'s rent.",
        "'Admin fees\' or 'processing fees\': Invented charges that appear in some newer building leases. These are not permitted under NYC law as separate fees — push back and request their legal basis.",
        "'Key deposit\': A deposit for keys or fobs is legal only if it is returned in full when you return the keys. If it is non-refundable, it is effectively an additional security deposit, which is illegal beyond one month\'s rent.",
        "Always get an itemised receipt for every payment made before or at lease signing. If you cannot get a receipt, do not pay.",
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about broker fees and rental scams in NYC',
      items: [
        {
          q: 'Under the FARE Act, do I ever have to pay a broker fee?',
          a: 'Yes — if you specifically hire and engage a broker to represent you as a tenant\'s agent. If you call a brokerage, ask them to find you apartments, and they spend time and expertise negotiating on your behalf, a fee is appropriate. The FARE Act targets the historical practice of landlords hiring brokers and then charging the fee to applicants who had no choice. When you hire a broker for yourself, you enter the agreement voluntarily and knowingly.',
        },
        {
          q: 'A broker told me the apartment was "no fee" but now wants a fee at signing. What do I do?',
          a: 'Get the "no fee" representation in writing — a screenshot of the listing or an email from the broker. If a fee is now being demanded after a "no fee" representation, this may be a deceptive trade practice under NYC law. Contact NYC DCWP (nyc.gov/dca) and the NY Department of State. Do not sign the lease until the fee issue is resolved — signing under protest of an illegal fee claim is legally complicated.',
        },
        {
          q: 'How do I know if a rental listing is real before I spend time on it?',
          a: 'Before contacting anyone: search the address on Google Maps Street View to confirm the building exists and matches the photos. Search the address on HPD Online to verify it is a residential building. Reverse image search the listing photos to see if they appear on other listings for different addresses. Search the address on NYC ACRIS to verify the ownership and that the listed landlord or management company actually controls the property.',
        },
        {
          q: 'Is a no-fee apartment actually free to rent?',
          a: '"No-fee\' in NYC traditionally meant the tenant does not pay a broker fee. It does not mean the apartment is free. Under the FARE Act, the fee is now owed by the landlord to the broker — many landlords have responded by raising advertised rents to offset this cost. A no-fee apartment at $3,200/month may cost more than a fee apartment at $2,900/month when you consider the total annual cost. Calculate the 12-month total, not just the monthly rate.',
        },
        {
          q: 'I paid an illegal fee. How do I get it back?',
          a: 'File a complaint with NYC DCWP (Department of Consumer and Worker Protection) at nyc.gov/dca. DCWP can investigate and order the fee returned. You can also file in Small Claims Court for amounts up to $10,000. For larger amounts, consult a tenant attorney. Keep all documentation — listing screenshots, emails, receipts, and any written or digital communications about the fee.',
        },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// ESCAPING +: Get rid of furniture fast
// Bucket: Escaping | Service: Junk Removal
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'get-rid-of-furniture-fast-moving-out-nyc',
  category: 'inspections-leasing',
  title: 'How to Get Rid of Furniture Fast When Moving Out of NYC',
  metaTitle: 'How to Get Rid of Furniture Fast When Moving Out of NYC | Building Health X',
  metaDescription: 'Moving out of NYC and can\'t take everything? Here are the fastest legal ways to dispose of furniture — DSNY bulk pickup, donation centers, Facebook Marketplace, and junk removal — plus fines to avoid.',
  headline: 'How to Get Rid of Furniture Fast When Moving Out of NYC',
  subheadline: 'The DSNY rules, the donation options, the fines for getting it wrong, and when junk removal is faster than everything else combined.',
  serviceSlug: 'junk-removal',
  serviceName: 'Junk Removal',
  leadBaitCta: 'Missed trash day? Need it gone today? Get an instant quote for eco-friendly NYC junk removal.',
  datePublished: '2024-12-01',
  dateModified: '2025-03-01',
  relatedSlugs: ['get-security-deposit-back-nyc', 'how-to-break-lease-nyc-violations', 'between-leases-gap-week-nyc'],
  relatedServicePages: [
    { label: 'Junk removal in Manhattan', href: '/services/junk-removal/manhattan' },
    { label: 'Junk removal in Brooklyn', href: '/services/junk-removal/brooklyn' },
    { label: 'Junk removal in Queens', href: '/services/junk-removal/queens' },
    { label: 'Junk removal in the Bronx', href: '/services/junk-removal/bronx' },
    { label: 'Moving companies in NYC', href: '/services/moving-companies' },
  ],
  furtherReading: [
    { slug: 'get-security-deposit-back-nyc', title: 'How to Get Your Security Deposit Back in NYC' },
    { slug: 'between-leases-gap-week-nyc', title: 'Between Leases? How to Handle the Gap Week in NYC' },
    { slug: 'how-to-break-lease-nyc-violations', title: 'How to Break Your NYC Lease Due to Landlord Violations' },
  ],
  govLinks: [
    { label: 'DSNY — Bulk Item Disposal Rules', url: 'https://www.nyc.gov/site/dsny/residents/householders/bulk-items.page', description: 'Official NYC rules for placing bulk items including furniture for DSNY collection.' },
    { label: 'DSNY — Schedule a Bulk Pickup', url: 'https://www.nyc.gov/site/dsny/residents/householders/schedule-a-bulky-item-pickup.page', description: 'Schedule a free DSNY bulk item pickup for items your regular sanitation service won\'t take.' },
    { label: 'NYC311 — Illegal Dumping Report', url: 'https://portal.311.nyc.gov/', description: 'Report illegal dumping — and understand what puts you at risk of a fine.' },
  ],
  content: [
    {
      type: 'intro',
      body: "Moving out of a New York City apartment is a study in constraints: time, money, space, and the very specific rules of what you can legally put on the kerb and when. Get it right and you can clear a full apartment for under $200. Get it wrong and you face DSNY fines of up to $1,500, a landlord claiming you abandoned property in the apartment, and the embarrassing experience of watching sanitation workers refuse your furniture because you put it out on the wrong day. This guide covers every option, from fastest to cheapest, with the rules you need to know.",
    },
    {
      type: 'statrow',
      stats: [
        { value: '$1,500', label: 'Maximum DSNY fine for illegal dumping of bulk items in NYC — furniture left out on wrong days or without scheduling counts', source: 'NYC DSNY' },
        { value: '$0', label: 'Cost of DSNY bulk item pickup — free for NYC residents, but must be scheduled and placed out correctly', source: 'NYC DSNY' },
        { value: '2–5 hrs', label: 'Typical time for a professional NYC junk removal crew to clear a full apartment, same day', source: 'NYC junk removal industry' },
      ],
    },
    {
      type: 'h2',
      heading: 'Option 1: DSNY Bulk Item Pickup (Free — But Rules Apply)',
    },
    {
      type: 'body',
      body: "New York City\'s Department of Sanitation offers free bulk item pickup for large items that won\'t fit in your regular trash. This is the cheapest option — but it has specific rules that many people get wrong.",
    },
    {
      type: 'list',
      items: [
        "Schedule your pickup first at nyc.gov/dsny or by calling 311. You cannot simply leave furniture on the kerb and expect DSNY to take it without a scheduled appointment in most cases.",
        "Place items out the night before your scheduled pickup — not multiple days in advance. Items left on the kerb for more than a day before collection are considered illegal dumping.",
        "Label bed frames, mattresses, and upholstered furniture clearly as 'Bed Bug Free\' if they are free of infestation — DSNY requires this labelling. Infested mattresses must be bagged in heavy plastic before kerb placement.",
        "What DSNY bulk pickup covers: furniture, appliances (without Freon), mattresses, electronics (on designated e-waste days or at e-waste drop-off sites).",
        "What DSNY will not take: construction debris, hazardous materials, paint, and anything that should go to a special disposal facility.",
        "DSNY bulk pickup works well for 1–3 items. For clearing an entire apartment, scheduling multiple pickups across several weeks may be required — which is impractical for a move-out timeline.",
      ],
    },
    {
      type: 'h2',
      heading: 'Option 2: Sell or Give Away on Facebook Marketplace and Buy Nothing Groups',
    },
    {
      type: 'body',
      body: "For furniture in good condition, Facebook Marketplace and neighbourhood Buy Nothing groups on Facebook can move items within 24–48 hours — sometimes within hours. The key is pricing aggressively if speed matters more than money.",
    },
    {
      type: 'list',
      items: [
        "List items at 20–30% of retail if you need them gone fast — NYC buyers are experienced and know when they\'re getting a deal.",
        "'Free\' listings move fastest of all. If you have a solid wood bookcase, IKEA dresser, or leather sofa, listing it free with a 'must be picked up today\' condition will have people messaging within minutes.",
        "Join the Buy Nothing group for your specific neighbourhood — these are hyper-local groups where neighbours take items and carry them home themselves.",
        "For large items, arrange buyer pickup — do not offer delivery. Provide the building address and unit floor only after confirming pickup time.",
        "Beware of no-shows — NYC marketplace is notorious for them. Have a backup plan (a second interested buyer or a junk removal booking) for any item you absolutely need gone by a specific date.",
      ],
    },
    {
      type: 'h2',
      heading: 'Option 3: NYC Donation Centers (Best for Items in Good Condition)',
    },
    {
      type: 'body',
      body: "Several NYC non-profits accept furniture donations and will sometimes schedule a pickup for large items in good condition — though many require you to bring items to them:",
    },
    {
      type: 'list',
      items: [
        "Housing Works (housingworks.org): accepts furniture, books, clothing, and housewares at their locations across Manhattan and Brooklyn. Large furniture pickup available for eligible items — call first.",
        "Salvation Army: accepts furniture and appliances and offers free pickup scheduling in NYC — call your local branch and confirm availability for your specific items.",
        "Habitat for Humanity ReStore (NYC chapter): accepts working appliances, tools, and building materials. Call ahead for pickup availability.",
        "Important: most donation centers will not accept mattresses (regardless of condition), severely damaged furniture, particle board items in poor condition, or anything with significant pet damage. Do not waste time trying to donate items that will be refused.",
      ],
    },
    { type: 'leadbait' },
    {
      type: 'h2',
      heading: 'Option 4: Professional Junk Removal (Fastest, Most Reliable)',
    },
    {
      type: 'body',
      body: "When time is the constraint — you have a lease end date, a storage unit waiting, or a new tenancy starting — professional junk removal is the only option that guarantees results. A crew of 2–3 can clear a full apartment in 2–4 hours, same day or next day in most cases.",
    },
    {
      type: 'list',
      items: [
        "Get quotes from 2–3 providers — pricing varies significantly in NYC. Ask for a flat rate based on volume (truck portion) rather than hourly, which is harder to predict.",
        "Confirm they handle building logistics: COI requirements, freight elevator scheduling, staircase access. Professional NYC junk removal companies handle this routinely.",
        "Ask whether they donate or recycle eligible items — reputable companies divert 40–60% of material from landfill through donation and recycling partnerships.",
        "Prices for a full 1BR apartment clearance typically run $300–$700 depending on volume, floor, and access. This is often cheaper than the cost of your time spent on Marketplace and DSNY scheduling across multiple weeks.",
        "Same-day service is available from most major NYC junk removal providers for an additional premium — worth it if you are against a lease deadline.",
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about furniture disposal when moving out of NYC',
      items: [
        {
          q: 'Can I just leave furniture on the kerb without scheduling a DSNY pickup?',
          a: 'Not for bulk items in most situations. While there is a perception that "leaving it on the kerb" is acceptable in NYC, DSNY rules require scheduling for most large items — and leaving furniture out for multiple days before collection constitutes illegal dumping, which carries fines of $100–$1,500. The exception is that some items placed neatly with a "free" sign will be taken by passersby before DSNY ever sees them — but this is not guaranteed and you bear legal responsibility if the item sits there.',
        },
        {
          q: 'How do I dispose of a mattress legally in NYC?',
          a: 'Mattresses require special handling. If bed-bug-free, they can be placed for DSNY bulk pickup after scheduling. If there is any possibility of bed bug infestation, the mattress must be fully enclosed in a sealed plastic bag before being placed on the kerb — NYC law requires this labelling and containment. Most NYC junk removal companies accept mattresses and handle the disposal for you, which is typically the easiest approach.',
        },
        {
          q: 'My landlord is threatening to charge me for leaving furniture in the apartment. Can they?',
          a: 'Yes. Leaving furniture or other personal property in the apartment at the end of your tenancy is abandonment of property under NYC law. The landlord can charge for the cost of removal, and these charges can be deducted from your security deposit. If the removal cost exceeds your deposit, they can sue you for the difference. Clear everything from the apartment before your final move-out walkthrough.',
        },
        {
          q: 'What\'s the fastest way to get rid of a full apartment\'s worth of furniture in NYC?',
          a: 'A combination approach works best: list high-value items on Facebook Marketplace 2–3 weeks before your move-out to maximize sale time, schedule DSNY bulk pickup for the items you want the city to take (scheduling fills up, so do this early), and book a junk removal company for everything that\'s left. Having a junk removal booking as a backstop means you are never scrambling on the final day regardless of how many Marketplace no-shows you get.',
        },
        {
          q: 'Can I get a receipt for a furniture donation for tax purposes?',
          a: 'Yes — most NYC non-profit donation centers (Housing Works, Salvation Army, Habitat ReStore) will provide a donation receipt for tax purposes. The deduction is based on the fair market value of the donated items, not the original purchase price. Keep a list of what you donated with your best estimate of fair market value and the receipt from the organization. For high-value items, photograph them before donation to support the valuation.',
        },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// ESCAPING +: Between leases — the gap week
// Bucket: Escaping | Services: Storage Facilities + Packing Services
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'between-leases-gap-week-nyc',
  category: 'inspections-leasing',
  title: 'Between Leases? How to Handle the Gap Week in NYC',
  metaTitle: 'Between Leases in NYC? How to Handle the Gap Week | Building Health X',
  metaDescription: 'Old lease ends the 31st. New one starts the 3rd. Here\'s how to handle the NYC gap week: short-term storage, staying somewhere for 3 nights, and packing services that move fast.',
  headline: 'Between Leases in NYC? Here\'s How to Survive the Gap Week',
  subheadline: 'Old lease ends the 31st. New one starts the 3rd. You have stuff, nowhere to put it, and a city that charges you for every hour. Here is the plan.',
  serviceSlug: 'storage-facilities',
  serviceName: 'Storage Facilities',
  leadBaitCta: 'Need to stash your stuff for a week? Find secure short-term NYC storage with flexible start dates.',
  datePublished: '2024-12-01',
  dateModified: '2025-03-01',
  relatedSlugs: ['get-rid-of-furniture-fast-moving-out-nyc', 'get-security-deposit-back-nyc', 'just-signed-nyc-lease-5-things-before-moving-in'],
  relatedServicePages: [
    { label: 'Storage facilities in Manhattan', href: '/services/storage-facilities/manhattan' },
    { label: 'Storage facilities in Brooklyn', href: '/services/storage-facilities/brooklyn' },
    { label: 'Storage facilities in Queens', href: '/services/storage-facilities/queens' },
    { label: 'Packing services in NYC', href: '/services/packing-services' },
    { label: 'Moving companies in NYC', href: '/services/moving-companies' },
  ],
  furtherReading: [
    { slug: 'get-rid-of-furniture-fast-moving-out-nyc', title: 'How to Get Rid of Furniture Fast When Moving Out of NYC' },
    { slug: 'get-security-deposit-back-nyc', title: 'How to Get Your Security Deposit Back in NYC' },
    { slug: 'just-signed-nyc-lease-5-things-before-moving-in', title: 'Just Signed an NYC Lease? Do These 5 Things Before Moving In' },
  ],
  govLinks: [
    { label: 'NYC Short-Term Rental Rules (Airbnb)', url: 'https://www.nyc.gov/site/specialenforcement/short-term-rentals/short-term-rentals.page', description: 'NYC rules on short-term rentals — what\'s legal for a few nights\' accommodation between leases.' },
  ],
  content: [
    {
      type: 'intro',
      body: "The gap week is one of NYC\'s most reliable moving nightmares. Your lease ends on the last day of the month. Your new lease starts on the 1st — or the 3rd, or the 5th, because your new landlord needs time to prepare the apartment. You have a full household of belongings, no legal place to store them, possibly nowhere to sleep, and a moving company booked on a date that no longer works perfectly. This guide is the tactical plan for the gap week: where to put your stuff, where to sleep, and how to manage the logistics without spending a fortune.",
    },
    {
      type: 'statrow',
      stats: [
        { value: '5×5', label: 'Smallest storage unit size (25 sq ft) — fits a studio apartment\'s worth of boxes and small furniture', source: 'Storage industry standard' },
        { value: 'Month-to-month', label: 'Minimum commitment at most NYC self-storage facilities — no long-term lock-in required for a gap week', source: 'NYC self-storage industry' },
        { value: '48 hrs', label: 'How far in advance most NYC storage facilities can be booked — don\'t wait until the day before your old lease ends', source: 'Building Health X' },
      ],
    },
    {
      type: 'h2',
      heading: 'The 4-Part Gap Week Plan',
    },
    {
      type: 'body',
      body: "The gap week requires solving four separate problems simultaneously: where does your stuff go, where do you sleep, how do things move between locations, and how do you maintain access to essentials during the transition. Handle each piece separately and in advance.",
    },
    {
      type: 'h2',
      heading: 'Part 1: Storage — Your Stuff\'s Temporary Home',
    },
    {
      type: 'body',
      body: "NYC self-storage is surprisingly affordable and widely available for short-term gaps. The key is booking before your move-out date, not after.",
    },
    {
      type: 'table',
      rows: [
        ['Storage type', 'Best for', 'Typical NYC cost', 'Lead time needed'],
        ['Self-storage unit (5×5)', 'Boxes, small items, essentials', '$80–$150/month', '48 hrs minimum; book earlier for prime sizes'],
        ['Self-storage unit (10×10)', 'Full 1BR apartment', '$200–$350/month', '48–72 hrs for availability'],
        ['Portable container (PODS type)', 'Keeps everything accessible; unit brought to you', '$300–$500 for 2 weeks', '3–5 days lead time for delivery'],
        ['Valet storage (Clutter, Neighbor)', 'They pick up, store, and redeliver items', '$50–$150/month per room', '24–48 hrs but item-level tracking'],
        ['Friend or family space', 'Free — but manage expectations carefully', '$0 + goodwill debt', 'Immediate if confirmed in advance'],
      ],
    },
    {
      type: 'list',
      items: [
        "For a studio or 1BR apartment, a 10×10 storage unit holds almost everything if packed efficiently — use mattress bags, disassemble bed frames, and stack boxes floor to ceiling.",
        "Book month-to-month even if you only need 2 weeks — most facilities prorate or refund unused time, and having the flexibility avoids panic if your new move-in date shifts.",
        "Climate-controlled units are worth the extra $20–$40/month for electronics, artwork, vinyl records, and anything sensitive to temperature or humidity changes.",
        "Book a facility with 24-hour access if you will need to retrieve items during your gap — some facilities have access hours limitations that create logistical problems.",
      ],
    },
    {
      type: 'leadbait',
    },
    {
      type: 'h2',
      heading: 'Part 2: Packing — Do This Before, Not During',
    },
    {
      type: 'body',
      body: "The gap week move is a two-stage operation: from old apartment to storage, then from storage to new apartment. Two moves means double the packing and unpacking unless you plan carefully. A professional packing service the week before your move-out can save 8–12 hours of stress during the most logistically complicated period of your move.",
    },
    {
      type: 'list',
      items: [
        "Pack a 'gap bag\' separately from everything else: 3–7 days of clothing, toiletries, laptop, chargers, important documents (passport, lease, insurance), and any medication. This bag stays with you, not in storage.",
        "Label storage boxes by destination room in your new apartment, not by their current location — makes the unpack dramatically faster.",
        "Colour-code: use coloured tape (one colour per destination room) so movers and you can sort instantly at the new place.",
        "Professional packing services are particularly valuable for fragile items, art, and electronics — they pack faster, use better materials, and their packing is generally accepted by moving insurance policies where DIY packing often is not.",
        "Ask your moving company if they offer packing services — many do, and bundling is typically cheaper than separate contractors.",
      ],
    },
    {
      type: 'h2',
      heading: 'Part 3: Where to Sleep During the Gap',
    },
    {
      type: 'body',
      body: "NYC accommodation options for 3–10 nights, from cheapest to most convenient:",
    },
    {
      type: 'list',
      items: [
        "Friends or family: the only free option and the most logistically flexible. The catch is that you are a houseguest, not a tenant — set clear expectations about timing and space.",
        "Hotels: most flexible for access and comfort; expensive in NYC ($150–$350+/night for decent options). Use hotel points if you have them — this is exactly what they are for.",
        "Extended-stay hotels: slightly cheaper than standard hotels for week-long stays. Look at Courtyard by Marriott, Residence Inn, or Hilton Garden Inn locations in outer borough neighbourhoods.",
        "Furnished room rentals: sites like Furnished Finder, Sonder, or direct Airbnb (legal for 30+ night stays in NYC) can be cheaper than hotels for gaps longer than 5 nights.",
        "Sublet from a friend: many NYC tenants have a spare room or know someone travelling. A week\'s informal sublet for $200–$400 is common and perfectly legal for short periods.",
      ],
    },
    {
      type: 'h2',
      heading: 'Part 4: Managing the Two-Move Logistics',
    },
    {
      type: 'step',
      stepNumber: 4,
      heading: 'Coordinate both moves with one mover where possible',
      body: 'The most efficient gap week uses a single moving company for both legs: move from old apartment to storage on day 1, then from storage to new apartment on day N. Book both moves with the same company upfront — many offer a discount for back-to-back jobs, and you avoid the coordination overhead of two separate bookings.',
      items: [
        "Book move 1 (apartment to storage) and move 2 (storage to new apartment) at the same time — schedule both when you book.",
        "Confirm the storage facility allows your moving truck — some NYC storage locations have loading dock restrictions or require advance notice for moving trucks.",
        "For the storage-to-new-apartment move, schedule it for the day your new lease begins or the day after — not before you have legal access to the unit.",
        "Keep your moving company\'s contact on speed dial during gap week — schedule changes are common and a responsive mover is worth more than a cheap one.",
        "Tip your movers well on a gap week move — two moves in a short period is a harder job than a single straight move, and good movers remembered for fair treatment tend to prioritise your next-day call if anything goes wrong.",
      ],
    },
    {
      type: 'tip',
      body: "Ask your new landlord if you can have early access — even just to store boxes — a few days before your official start date. Many will agree if you have already paid first month\'s rent and the apartment is empty. This can eliminate storage entirely if the gap is short.",
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about the NYC lease gap week',
      items: [
        {
          q: 'My old landlord says I need to be fully out by midnight on my lease end date. Is that enforceable?',
          a: 'Technically yes — your legal right to possession ends at the end of your lease term. However, in practice, most NYC landlords are reasonable about a same-day or next-morning exit if you communicate in advance. If you need an extra day, ask in writing early — many will agree rather than deal with the paperwork of a holdover proceeding for one extra day. Never assume you can stay past your lease end date without explicit written permission.',
        },
        {
          q: 'Can I ask my new landlord to start my lease a few days earlier to avoid the gap?',
          a: 'Yes, and it is worth asking. Many landlords will agree to move the start date by 2–5 days, especially if the apartment is already vacant. Frame it as a convenience for both parties — you avoid a gap and they have a paying tenant a few days earlier. If they agree, make sure the new start date is reflected in the signed lease, not just a verbal agreement.',
        },
        {
          q: 'How much should I budget for a gap week in NYC?',
          a: 'A typical gap week budget for a 1BR apartment: storage unit $200–$350 (one month prorated), professional packing service $400–$800, two-leg moving company $600–$1,200, and accommodation $300–$1,500 depending on whether you stay with friends or in a hotel. Total range: $1,500–$4,000. Compare this against the cost of negotiating overlapping leases (paying two rents for a month, typically $3,000–$6,000) — the gap week approach is almost always cheaper.',
        },
        {
          q: 'What if my new apartment isn\'t ready on the date my new landlord promised?',
          a: 'This is unfortunately common — prior tenants delay their move-out, cleaning takes longer, or repairs are needed. Have a contingency plan: know in advance that your storage booking is flexible and your accommodation can be extended. If your new landlord\'s delay is their breach of contract (they gave you a specific move-in date in the lease), they may owe you a rent abatement for the delayed days or reimbursement of your storage and accommodation costs. Document the delay in writing.',
        },
        {
          q: 'Is there a way to avoid the gap week entirely?',
          a: 'Three approaches: (1) negotiate your new lease start date to match your old lease end date exactly — this requires coordination but is the cleanest solution; (2) negotiate a brief overlap where you pay rent on both apartments for a few days — expensive but stress-free; (3) ask your old landlord for a written licence to stay a few days after your lease ends, often at a prorated daily rate. The overlap approach is the most reliable if cost is not the primary constraint.',
        },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// FIGHTING: Landlord ignoring mold — tenant rights (Local Law 55)
// Bucket: Fighting | Services: Renters Insurance + Moving Companies
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'landlord-ignoring-mold-nyc-tenant-rights',
  category: 'violations-repairs',
  title: 'My Landlord Is Ignoring Mold: NYC Tenant Rights & Local Law 55',
  metaTitle: 'Landlord Ignoring Mold in NYC? Tenant Rights & Local Law 55 | Building Health X',
  metaDescription: 'NYC landlords must fix mold within 30 days under Local Law 55. If yours is ignoring it, here\'s exactly how to escalate — 311, HPD violations, Housing Court, and rent withholding.',
  headline: 'My Landlord Is Ignoring Mold. What Are My Rights in NYC?',
  subheadline: 'Under Local Law 55, NYC landlords have a legal deadline to fix mold — and daily fines if they miss it. Here\'s how to force the issue when they ignore you.',
  serviceSlug: 'mold-remediation',
  serviceName: 'Mold Remediation',
  leadBaitCta: 'Mold is getting worse? Get a professional assessment while you fight your landlord.',
  datePublished: '2024-12-15',
  dateModified: '2025-03-01',
  relatedSlugs: ['landlord-wont-fix-roaches-bedbugs', 'how-to-break-lease-nyc-violations', 'who-pays-pipe-burst-nyc-apartment'],
  relatedServicePages: [
    { label: 'Mold remediation in Manhattan', href: '/services/mold-remediation/manhattan' },
    { label: 'Mold remediation in Brooklyn', href: '/services/mold-remediation/brooklyn' },
    { label: 'Mold remediation in Queens', href: '/services/mold-remediation/queens' },
    { label: 'Mold remediation in the Bronx', href: '/services/mold-remediation/bronx' },
    { label: 'Moving companies in NYC', href: '/services/moving-companies' },
  ],
  furtherReading: [
    { slug: 'what-do-i-do-if-my-nyc-apartment-has-mold', title: 'What Do I Do If My NYC Apartment Has Mold?' },
    { slug: 'can-i-get-a-rent-reduction-if-my-landlord-has-open-violations', title: 'Can I Get a Rent Reduction If My Landlord Has Open Violations?' },
    { slug: 'how-to-check-if-hpd-violations-were-actually-fixed', title: 'How to Check If HPD Violations Were Actually Fixed' },
  ],
  govLinks: [
    { label: 'HPD — Local Law 55 Mold Information', url: 'https://www.nyc.gov/site/hpd/services-and-information/mold.page', description: 'Official HPD guidance on Local Law 55 mold obligations for landlords and tenant rights.' },
    { label: 'File a 311 Mold Complaint', url: 'https://portal.311.nyc.gov/', description: 'File a mold complaint online — triggers an HPD inspection and starts the violation clock.' },
    { label: 'HPD Online — Violation Search', url: 'https://hpdonline.nyc.gov', description: 'Check if your building already has open mold violations on record.' },
    { label: 'NYC Legal Aid — Tenant Resources', url: 'https://www.legalaidnyc.org/', description: 'Free legal help for eligible tenants — especially useful if you need to withhold rent or break a lease over mold.' },
  ],
  content: [
    {
      type: 'intro',
      body: "Mold in your apartment is not a cosmetic issue. It is a documented health hazard linked to respiratory illness, asthma, and allergic reactions — and under NYC Local Law 55, your landlord has a legal obligation to fix it, a mandatory deadline to do so, and daily financial penalties if they refuse. If your landlord is telling you to buy a dehumidifier, paint over it yourself, or that 'it's just a bit of mildew,' they are either uninformed or deliberately stalling. This guide explains exactly how the law works, what your escalation options are, and how to use the city\'s own enforcement machinery to force action.",
    },
    {
      type: 'statrow',
      stats: [
        { value: '30 days', label: 'Correction deadline for a Class B mold violation — daily fines begin the moment this window closes', source: 'NYC HPD' },
        { value: '21 days', label: 'Correction deadline for a Class C mold violation (large area, sleeping room, or vulnerable tenant)', source: 'NYC HPD' },
        { value: '$25,000', label: 'Maximum ECB civil penalty for wilful or repeat mold non-compliance', source: 'NYC Admin Code' },
      ],
    },
    {
      type: 'h2',
      heading: 'What Local Law 55 Actually Requires',
    },
    {
      type: 'body',
      body: "Local Law 55 of 2018 (NYC Admin Code §27-2017.1) requires landlords of multiple dwellings to maintain apartments free from mold in all areas under their control. Crucially, the law also requires landlords to address the underlying moisture source — not just clean the visible mold. A landlord who bleaches the mold without fixing the leaking pipe is not in compliance and will fail any HPD reinspection.",
    },
    {
      type: 'h2',
      heading: 'Step 1: Notify Your Landlord in Writing — Today',
    },
    {
      type: 'step',
      stepNumber: 1,
      heading: 'Send a written notice with photos',
      body: 'Before filing any city complaint, notify your landlord in writing. Email is fine. This creates a timestamp and gives you documented proof that they knew about the problem.',
      items: [
        'Describe the location, size, and appearance of the mold — "black mold approximately 18 inches across on the bathroom ceiling."',
        'Attach clear timestamped photos.',
        'State that you expect them to arrange a licensed mold assessment and remediation under Local Law 55.',
        'Give a 7-day response deadline.',
        'If your landlord has ignored previous verbal reports, reference those: "Despite notifying the super on [date], no action has been taken."',
      ],
    },
    {
      type: 'h2',
      heading: 'Step 2: File a 311 Complaint — This Creates the Official Clock',
    },
    {
      type: 'step',
      stepNumber: 2,
      heading: 'File at 311.nyc.gov under "Mold"',
      body: 'A 311 mold complaint triggers an HPD inspection. When the inspector confirms mold, they issue a Notice of Violation — a Class B or Class C — and the landlord\'s correction deadline starts. From this moment, every day of non-compliance carries a financial penalty.',
      items: [
        'File online at portal.311.nyc.gov — select "Mold/Mildew" from the complaint categories.',
        'Write down your service request number.',
        'HPD will schedule an inspection — typically within 30 days for non-emergency, within 24 hours if you report a Class C condition (large area, sleeping room, child under 6 present).',
        'If mold covers more than 10 square feet OR is in a bedroom or bathroom AND you have young children, explicitly report this on the complaint form — it triggers emergency inspection protocol.',
        'After the inspection, check HPD Online at hpdonline.nyc.gov to see if a violation was issued and what class it was assigned.',
      ],
    },
    {
      type: 'tip',
      body: "If the inspector doesn\'t show within 10 business days for a non-emergency complaint, call HPD\'s mold hotline and follow up in writing to your landlord referencing the pending inspection. The complaint record alone — even without a violation — strengthens your position in any subsequent proceeding.",
    },
    { type: 'leadbait' },
    {
      type: 'h2',
      heading: 'Step 3: File an HP Proceeding in Housing Court',
    },
    {
      type: 'step',
      stepNumber: 3,
      heading: 'Get a court order requiring remediation',
      body: 'If your landlord has an HPD mold violation and is still not acting, an HP (Housing Part) proceeding compels them through court order. It costs nothing to file, requires no attorney, and creates a legal record the landlord cannot ignore.',
      items: [
        'File at your borough\'s Housing Court Help Center — they will assist you with the paperwork.',
        'Bring: your written notice to the landlord, the HPD violation number, your 311 complaint number, photos of the mold, and any medical documentation if mold is affecting your health.',
        'The court will schedule a hearing. The judge can order the landlord to complete remediation by a specific date and require proof of certification.',
        'Non-compliance with a Housing Court order can result in contempt proceedings and significantly higher penalties than the HPD fines alone.',
      ],
    },
    {
      type: 'h2',
      heading: 'Step 4: Withhold Rent Legally — The Escrow Method',
    },
    {
      type: 'body',
      body: "A mold infestation serious enough to affect health and habitability is a breach of the warranty of habitability under NY RPL §235-b. This gives you the right to seek a rent abatement — a reduction in the rent owed for the period during which the apartment was substandard. The safest way to exercise this right is through the HP proceeding, where the court can authorise rent withholding into escrow. Do not simply stop paying rent without a court authorisation — that exposes you to eviction proceedings.",
    },
    {
      type: 'warning',
      body: "Mold affects health — if you or anyone in your household is experiencing respiratory symptoms, headaches, or worsening asthma, see a doctor and ask them to document the potential environmental cause. Medical records linking health issues to the mold in your apartment are significant evidence in both HPD proceedings and any subsequent rent abatement or lease termination case.",
    },
    {
      type: 'h2',
      heading: 'When to Consider Breaking Your Lease',
    },
    {
      type: 'body',
      body: "If the mold is extensive (covering large areas across multiple rooms), recurring despite treatment, or is making you or your family ill — and your landlord has failed to fix it despite HPD violations and court proceedings — you may have grounds for constructive eviction under the warranty of habitability. See our full guide on breaking a lease due to violations. If you reach this point, document everything meticulously: the lease break needs to be defensible.",
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about mold and tenant rights in NYC',
      items: [
        {
          q: 'My landlord says the mold is my fault because I don\'t ventilate enough. Is that a valid defence?',
          a: 'Rarely. Under Local Law 55, the landlord\'s obligation is to address moisture problems in areas under their control — which includes building envelopes, pipes, and inadequate ventilation systems. If your bathroom has no operable window or functioning exhaust fan (both of which are the landlord\'s responsibility to provide), claiming you caused the mold through poor ventilation is legally weak. HPD inspectors are trained to assess the moisture source, not just the mold symptom.',
        },
        {
          q: 'Can I clean the mold myself while waiting for the landlord to fix it?',
          a: 'For very small areas (under 10 square feet), surface cleaning with appropriate products can slow visible growth. However, DIY cleaning does not address the underlying moisture source and may not meet HPD\'s remediation standard. More importantly, cleaning it yourself could be used by your landlord to argue the mold is now resolved — do not clean it without first photographing it thoroughly and notifying the landlord in writing that you are doing interim cleaning solely to protect your health, not as acceptance of responsibility for the problem.',
        },
        {
          q: 'How long does the HPD mold inspection process take?',
          a: 'After a 311 complaint, HPD typically inspects within 30 days for standard mold complaints. If you report emergency conditions — mold in a sleeping area, child under 6 in the household, mold covering more than 10 square feet — the inspection should occur within 24 hours. Once a violation is issued, the landlord has 21 days (Class C) or 30 days (Class B) to complete remediation and file certification. Total timeline from complaint to compliance: 6–12 weeks if the landlord acts promptly.',
        },
        {
          q: 'My landlord painted over the mold. Has that fixed it legally?',
          a: 'No. Painting over mold is not a legally compliant remediation under NYC law and will result in a failed HPD reinspection. Local Law 55 requires licensed mold remediation by a NYS-licensed mold remediator following a separate assessment by a licensed mold assessor. A landlord who paints over mold is also creating conditions for faster recurrence, since the moisture source is not addressed. File a new 311 complaint immediately if this occurs.',
        },
        {
          q: 'The mold came back after treatment. Do I have to start the complaint process over?',
          a: 'Recurring mold after supposedly completed remediation is evidence that the underlying moisture source was not fixed — which is itself a violation of Local Law 55. File a new 311 complaint and reference the prior violation number. If the landlord certified a correction that was not genuine, HPD can issue a new violation with a faster deadline. Recurring violations are also treated more seriously in Housing Court.',
        },
      ],
    },
  ],
})

// ─────────────────────────────────────────────────────────────────────────────
// FIGHTING: No heat or hot water — force landlord to fix it
// Bucket: Fighting | Services: Renters Insurance + Moving Companies
// ─────────────────────────────────────────────────────────────────────────────
GUIDES.push({
  slug: 'no-heat-hot-water-force-landlord-fix-nyc',
  category: 'heat-utilities',
  title: 'No Heat or Hot Water in NYC? How to Force Your Landlord to Fix It',
  metaTitle: 'No Heat or Hot Water in NYC? How to Force Your Landlord to Fix It | Building Health X',
  metaDescription: 'No heat in your NYC apartment? Landlords have 24 hours to restore it or face $1,000/day fines. Here\'s how to file 311, document the violation, and get compensated for the outage.',
  headline: 'No Heat or Hot Water in Your NYC Apartment? Here\'s How to Force a Fix.',
  subheadline: 'Your landlord is legally required to restore heat within 24 hours. They face $1,000/day fines if they don\'t. Here\'s how to use that against them.',
  serviceSlug: 'hvac-repair',
  serviceName: 'HVAC Repair',
  leadBaitCta: 'Freezing right now? Get emergency HVAC quotes — 24/7 response.',
  datePublished: '2024-12-15',
  dateModified: '2025-03-01',
  relatedSlugs: ['landlord-ignoring-mold-nyc-tenant-rights', 'landlord-wont-fix-roaches-bedbugs', 'how-to-break-lease-nyc-violations'],
  relatedServicePages: [
    { label: 'HVAC repair in Manhattan', href: '/services/hvac-repair/manhattan' },
    { label: 'HVAC repair in Brooklyn', href: '/services/hvac-repair/brooklyn' },
    { label: 'HVAC repair in Queens', href: '/services/hvac-repair/queens' },
    { label: 'HVAC repair in the Bronx', href: '/services/hvac-repair/bronx' },
    { label: 'Renters insurance in NYC', href: '/services/renters-insurance' },
  ],
  furtherReading: [
    { slug: 'what-temperature-must-nyc-landlords-maintain', title: 'What Temperature Must NYC Landlords Maintain?' },
    { slug: 'how-to-file-a-311-heat-complaint-in-nyc', title: 'How to File a 311 Heat Complaint in NYC' },
    { slug: 'how-to-check-if-a-building-has-chronic-heat-problems', title: 'How to Check if a Building Has Chronic Heat Problems' },
  ],
  govLinks: [
    { label: 'File a 311 Heat or Hot Water Complaint', url: 'https://portal.311.nyc.gov/', description: 'File online — HPD treats heat complaints as emergencies and can dispatch an inspector same day.' },
    { label: 'HPD Heat Season Information', url: 'https://www.nyc.gov/site/hpd/services-and-information/heat-hot-water.page', description: 'Official NYC heat season rules, legal temperature requirements, and tenant rights.' },
    { label: 'HPD Heat Line', url: 'https://www.nyc.gov/site/hpd/services-and-information/heat-hot-water.page', description: 'HPD Heat Line: (212) 863-7900 — report a heat emergency during the heating season.' },
    { label: 'NYC Legal Aid — Tenant Resources', url: 'https://www.legalaidnyc.org/', description: 'Free legal help if your landlord refuses to restore heat or you want to seek rent abatement.' },
  ],
  content: [
    {
      type: 'intro',
      body: "In New York City, no heat in winter is not an inconvenience — it is a Class C immediately hazardous violation, the most serious category HPD issues. Your landlord must restore heat within 24 hours of being notified. Every day they fail to do so, they face fines of up to $1,000. If they still don\'t act, the city will send its own contractors and bill the landlord at premium rates as a lien on the property. You have significant legal leverage here. This guide tells you how to use it.",
    },
    {
      type: 'statrow',
      stats: [
        { value: '68°F', label: 'Minimum daytime temperature required in all NYC apartments from 6am–10pm when it\'s below 55°F outside', source: 'NYC Admin Code §27-2029' },
        { value: '24 hrs', label: 'Maximum legal window for your landlord to restore heat after a violation — after this, daily fines start', source: 'NYC HPD' },
        { value: '$1,000/day', label: 'Maximum daily fine for repeated heat violations in a single season', source: 'NYC HPD' },
      ],
    },
    {
      type: 'h2',
      heading: 'The Legal Temperature Requirements — Know These Exactly',
    },
    {
      type: 'table',
      rows: [
        ['Time', 'Outside temperature', 'Required inside temperature', 'Period'],
        ['6am – 10pm', 'Below 55°F', 'Minimum 68°F in all apartments', 'Oct 1 – May 31'],
        ['10pm – 6am', 'Any temperature', 'Minimum 62°F in all apartments', 'Oct 1 – May 31'],
        ['All hours', 'N/A', 'Hot water at minimum 120°F at the tap', 'Year-round'],
      ],
    },
    {
      type: 'body',
      body: "Note that the overnight 62°F requirement applies regardless of outside temperature during the heat season. Many tenants do not know this — they assume heat is only required when it\'s cold outside. The overnight requirement applies on a 50°F October night just as much as a 15°F February night.",
    },
    {
      type: 'h2',
      heading: 'Step 1: Document the Temperature — Then Notify Your Landlord',
    },
    {
      type: 'step',
      stepNumber: 1,
      heading: 'Measure and document the temperature before contacting anyone',
      body: 'Your documentation is your evidence. Before you call 311, create a timestamped record of the violation.',
      items: [
        'Use a digital thermometer — your phone\'s weather app shows outdoor temperature, not indoor. Any cheap digital indoor thermometer works. Screenshot or photograph the reading with the date/time visible.',
        'Measure in the warmest room — if the warmest room in your apartment is below 68°F during daytime, you have an unambiguous violation.',
        'Check the time of day and outside temperature — both matter for which threshold applies.',
        'Notify your landlord in writing simultaneously: "Indoor temperature is currently X°F at [time]. Please restore heat immediately per NYC Admin Code §27-2029."',
        'Keep recording temperature every 2–3 hours while the heat is out — this documents the duration of the violation for any subsequent rent abatement claim.',
      ],
    },
    {
      type: 'h2',
      heading: 'Step 2: Call 311 — Heat Complaints Get Emergency Priority',
    },
    {
      type: 'step',
      stepNumber: 2,
      heading: 'File a 311 heat complaint — HPD can dispatch same day',
      body: 'Unlike most HPD complaints, heat complaints during the heating season are treated as emergencies. HPD can dispatch an inspector same day or next day, and the violation triggers the 24-hour correction clock immediately.',
      items: [
        'Call 311 or file at portal.311.nyc.gov — select "Heat/Hot Water" under the housing complaint categories.',
        'Write down your service request number — you can track the status online.',
        'HPD may call you to confirm the complaint before dispatching. Answer the call.',
        'If an inspector visits and confirms the temperature is below the legal minimum, a Class C violation is issued on the spot. This is the highest violation class and triggers immediate financial penalties.',
        'Also call HPD\'s Heat Line at (212) 863-7900 during heat season to report the emergency directly — this can accelerate the response.',
      ],
    },
    {
      type: 'tip',
      body: "File the 311 complaint even if your landlord promises to fix it today. The complaint creates a city record that cannot be altered. If the landlord fails to deliver on their promise, you already have the enforcement process started. If they fix it, the complaint simply closes — no harm done.",
    },
    { type: 'leadbait' },
    {
      type: 'h2',
      heading: 'Step 3: What You\'re Entitled to While Heat Is Out',
    },
    {
      type: 'body',
      body: "While your landlord is required to restore heat, they are also legally obligated to provide temporary heat to affected tenants during the repair period. And beyond immediate relief, you may be entitled to a rent reduction for the period of the outage.",
    },
    {
      type: 'list',
      items: [
        "Temporary heat: your landlord must provide electric space heaters to every affected unit while repairs are underway. If they do not, add this to your 311 complaint and document the failure.",
        "Rent abatement: a heat outage that lasted multiple days represents a period during which your apartment was below the habitable standard. Courts calculate abatements proportionally — a 5-day heat outage in January might represent 10–20% of that month\'s rent. Document every hour of the outage.",
        "Hotel costs: if the heat outage made your apartment literally unliveable (temperatures below 50°F, vulnerable occupants), you may be able to claim hotel or alternative accommodation costs as part of a rent abatement or small claims action.",
        "Security deposit: if the landlord attempts to deduct anything from your deposit at move-out after a documented heat failure during your tenancy, the documented violation and any court records are evidence of their breach — not yours.",
      ],
    },
    {
      type: 'h2',
      heading: 'Step 4: If Your Landlord Still Won\'t Fix It',
    },
    {
      type: 'step',
      stepNumber: 4,
      heading: 'Escalate to Housing Court for an HP order',
      body: 'If the HPD violation has been issued and the landlord is still not restoring heat, an HP proceeding in Housing Court is the next escalation. A judge can order the landlord to restore heat by a specific date and refer any defiance to HPD\'s Emergency Repair Program — where the city fixes it and bills the landlord.',
      items: [
        'File the HP proceeding at your borough\'s Housing Court Help Center — free, no attorney required.',
        'Bring your documented temperature readings, the 311 complaint number, the HPD violation number, and your written notice to the landlord.',
        'Housing Court judges treat heat cases urgently during the heating season and typically schedule hearings within days, not weeks.',
        'If the Emergency Repair Program intervenes, the city sends its own HVAC contractor and charges the landlord directly — often at 2–3× market rates plus an administrative fee. This is a significant financial consequence that most landlords want to avoid.',
      ],
    },
    {
      type: 'warning',
      body: "Do not use propane or kerosene space heaters indoors as a substitute for building heat. Both produce carbon monoxide and pose serious fire and asphyxiation risks. If your landlord provides or suggests these as a solution, refuse them and report this to 311 as an additional safety violation. Only electric space heaters are appropriate for indoor temporary heat.",
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions about no heat and hot water in NYC',
      items: [
        {
          q: 'My landlord says the heat is fixed but my apartment is still cold. What do I do?',
          a: 'Document the temperature with a thermometer and file a new 311 complaint referencing the prior violation number. You can also call HPD to flag that a previously issued violation has not been genuinely resolved. If the landlord certified a correction that was incomplete — for example, the main boiler was repaired but steam is not reaching your unit due to a valve problem — that is an ongoing violation, not a resolved one.',
        },
        {
          q: 'Can I withhold rent because I have no heat?',
          a: 'The safest method is to pay rent into a court-supervised escrow account through an HP proceeding rather than simply stopping payment. Unilateral rent withholding without court authorisation exposes you to eviction proceedings even if the heat failure is real and documented. The HP proceeding achieves the same pressure effect (your rent goes into escrow, not to the landlord) while legally protecting you from non-payment claims.',
        },
        {
          q: 'My hot water is only lukewarm. Does that count as a violation?',
          a: 'Yes. Hot water must be a minimum of 120°F at the tap — year-round, not just during heat season. Consistently lukewarm water (below 120°F) is a Class B HPD violation. File a 311 complaint specifically for "no hot water" — bring a food thermometer to document the actual temperature at the tap before filing.',
        },
        {
          q: 'My building has radiators but only some get hot. What do I do?',
          a: 'Uneven heat distribution in a steam system — where some radiators get scalding hot while others stay cold — is a building maintenance problem, typically caused by failed thermostatic radiator valves, air-locked radiators, or an unbalanced steam system. If your specific unit\'s radiators are providing inadequate heat (below the legal minimums), you have a violation regardless of what other units experience. File a 311 complaint, document your temperature, and notify your landlord in writing.',
        },
        {
          q: 'Is the heating season always October through May?',
          a: 'In NYC, the legal heating season runs from October 1 through May 31. Outside this window, there are no legal minimum temperature requirements. However, if an unusual cold snap occurs outside the heating season and your landlord has control over the building\'s heating system, you may still have a warranty of habitability argument if temperatures drop to genuinely dangerous levels. During the heating season itself — October 1 through May 31 — the requirements apply every day, regardless of the weather.',
        },
      ],
    },
  ],
})
