// Type definitions
export type Service = {
  name: string
  description: string
  category: string
  intro: string
  whyNeed: string[]
  whatToLookFor: { title: string; desc: string }[]
  costRange: string
  timeline: string
  faqs: { q: string; a: string }[]
  /** Optional SEO overrides for high-value service pages */
  h1Override?: string
  subHeadline?: string
  extraQuickFact?: { label: string; detail: string }
  dataMoat?: { headline: string; subtitle: string; body: string; ctaText: string; ctaHref: string }
  faqSchema?: boolean
}

export type Location = {
  name: string
  borough: string
  description: string
  buildingTypes: string
  transit: string
  character: string
  challenges: string
}

// Service definitions with rich SEO content
export const services: Record<string, {
  name: string
  description: string
  category: string
  intro: string
  whyNeed: string[]
  whatToLookFor: { title: string; desc: string }[]
  costRange: string
  timeline: string
  faqs: { q: string; a: string }[]
  h1Override?: string
  subHeadline?: string
  extraQuickFact?: { label: string; detail: string }
  dataMoat?: { headline: string; subtitle: string; body: string; ctaText: string; ctaHref: string }
  faqSchema?: boolean
}> = {
  'moving-companies': {
    name: 'Moving Companies',
    description: 'Licensed and insured NYC movers for local and long-distance moves',
    category: 'Moving Services',
    intro: `Get quotes from fully licensed, insured, and COI-ready movers who know how to navigate New York City. NYC presents unique challenges: narrow staircases in pre-war buildings, strict co-op and condo board requirements, limited street parking, and tight elevator schedules. Professional NYC movers understand these challenges and come prepared with the right equipment, insurance, and experience.`,
    h1Override: 'Top-Rated NYC Moving Companies (Vetted for Co-ops, Condos & Walk-Ups)',
    subHeadline: 'Get quotes from fully licensed, insured, and COI-ready movers who know how to navigate New York City.',
    extraQuickFact: { label: 'COI (Certificate of Insurance)', detail: 'Usually required by building management before move day' },
    dataMoat: {
      headline: "Don\u2019t Let an Elevator Violation Ruin Your Move",
      subtitle: 'Check your building before you book',
      body: "Before you pay a deposit for a moving company, use our free tool to check your new building\u2019s address. Active DOB elevator violations, ongoing construction permits, or strict freight elevator rules can double your moving time and cost. Verify your building\u2019s reality first.",
      ctaText: 'Look up a building address',
      ctaHref: '/building',
    },
    faqSchema: true,
    whyNeed: [
      'NYC buildings often require professional movers with specific insurance coverage (COI)',
      'Pre-war buildings have narrow staircases and tight corners requiring experience',
      'Many co-ops and condos restrict move times to specific windows',
      'Street parking for moving trucks is limited and heavily regulated',
      'Professional movers protect your belongings AND the building\'s common areas'
    ],
    whatToLookFor: [
      { title: 'NYC DOT License', desc: 'All local movers must be licensed by NYC Department of Transportation. Verify their license number before booking.' },
      { title: 'COI Capability', desc: 'Can they provide a Certificate of Insurance with your building listed as additional insured? Most NYC buildings require this.' },
      { title: 'Transparent Pricing', desc: 'Get written estimates breaking down hourly rates, truck fees, and additional charges. Avoid vague quotes.' },
      { title: 'Building Experience', desc: 'Have they worked in your building type before? Ask about walk-ups, co-ops, or high-rises specifically.' },
      { title: 'Reviews with Details', desc: 'Look for reviews mentioning specific neighborhoods or building types similar to yours.' }
    ],
    costRange: '$400–$800 for studios, $600–$1,200 for 1BR, $900–$1,800 for 2BR, $1,500–$3,000+ for 3BR+',
    timeline: 'Book 2–4 weeks ahead; 6+ weeks for peak season',
    faqs: [
      { q: 'What is a COI for moving in NYC?', a: 'A Certificate of Insurance (COI) proves your mover carries general liability and property damage coverage. Almost every NYC co-op, condo, and managed rental building requires one naming the building as an additional insured party before they will approve a move. All movers listed here can issue a COI — ask for it when you book so it is ready well before move day.' },
      { q: 'How much extra do movers charge for walk-up apartments?', a: 'Most NYC movers add a per-flight stair fee — typically $50–$75 per flight above the ground floor. A third-floor walk-up usually adds $100–$150 to the total, a fifth-floor walk-up $200–$300. Some companies charge per item instead of per flight, so always confirm the stair-fee structure in your written estimate.' },
      { q: 'Do NYC movers handle parking and potential tickets?', a: 'Professional NYC movers factor street logistics into their quotes. Many will secure a temporary "No Parking" permit from the city (DOT) to reserve curb space on move day. If they cannot get a permit, they build potential double-parking exposure into pricing. Always ask whether parking is included or an extra charge — it varies by company.' },
      { q: 'Are these movers NYSDOT licensed?', a: 'Legally operating movers in New York State must hold an active Department of Transportation (NYSDOT) number for moves within the state and a USDOT number for interstate moves. You can verify any mover\'s license status on the NYSDOT website. All movers surfaced through Building Health X are checked for active licensing.' },
      { q: 'How far in advance should I book movers?', a: 'Book 2-3 weeks ahead for most moves. For month-end dates or summer moves, book 4-6 weeks in advance.' },
      { q: 'Can I move on weekends?', a: 'Depends on your building. Many co-ops only allow weekday moves. Check with building management before booking.' },
      { q: 'Should I tip my movers?', a: 'Standard tip is $20-40 per mover for a local move, more for difficult moves. Tip in cash at the end.' }
    ]
  },
  'packing-services': {
    name: 'Packing Services',
    description: 'Professional packing and unpacking services for NYC apartments',
    category: 'Moving Services',
    h1Override: 'Professional NYC Packing Services (Vetted & Fully Equipped)',
    subHeadline: 'Save hours of stress. Get matched with expert packers who bring the supplies, navigate tight NYC apartments, and ensure your items are insurance-approved for the move.',
    extraQuickFact: { label: 'Materials included', detail: 'Boxes, wardrobe cartons, and wrapping are typically quoted upfront and brought on-site' },
    dataMoat: {
      headline: "Check Your Building\u2019s Pest History Before You Pack",
      subtitle: "Don\u2019t take building pests with you",
      body: "Moving out of an apartment with a history of bed bugs or roaches? Standard packing might not be enough. Use our tool to check your current building\u2019s HPD pest violations. If there is a history, you can request specialized \u2018pest-prep packing\u2019 from our pros to ensure you don\u2019t bring unwanted guests to your new home.",
      ctaText: 'Check your building\u2019s pest history',
      ctaHref: '/building',
    },
    intro: `Professional packing services take the most time-consuming part of moving off your plate. NYC apartments present unique challenges: deep but narrow closets, compact kitchens, and oddly-shaped alcoves. Professional packers arrive with the right boxes, materials, and techniques to pack efficiently and protect your belongings.`,
    whyNeed: ['Professional packers work 3-5x faster than DIY packing', 'Proper techniques reduce damage during transport', 'Saves significant time when juggling work and move prep', 'Professionals bring all materials - no hunting for boxes', 'Insurance typically covers professionally packed items'],
    whatToLookFor: [
      { title: 'Materials Included', desc: 'Confirm boxes, tape, bubble wrap, and paper are included - not surprise extras.' },
      { title: 'Unpacking Services', desc: 'Many offer unpacking at destination. Worth it to settle in quickly.' },
      { title: 'Specialty Item Experience', desc: 'Ask about artwork, antiques, or fragile items if you have them.' },
      { title: 'Labeling System', desc: 'Good packers label boxes with contents and destination room.' },
      { title: 'Timeline Flexibility', desc: 'Can they pack the day before, or need multiple days?' }
    ],
    costRange: '$200–$400 for studios, $300–$600 for 1BR, $500–$1,000+ for larger',
    timeline: 'Book 1-2 weeks ahead; packing usually done 1-2 days before move',
    faqs: [
      { q: 'Do professional packers provide the boxes and moving supplies?', a: 'Yes — most NYC packing crews arrive with everything they need: heavy-duty moving boxes in multiple sizes, wardrobe cartons for hanging clothes, dish-pack kits for kitchenware, custom crating for framed artwork, and all the tape, paper, and bubble wrap to fill them. This is a major advantage over DIY packing, where you would otherwise spend hours tracking down free boxes from liquor stores or paying retail at a UPS store.' },
      { q: 'Does professional packing affect my moving insurance?', a: 'It can make a significant difference. Many NYC moving companies will only offer full-value protection (also called full replacement valuation) on items that were packed by professionals — not items the owner packed themselves. If you pack your own boxes and something breaks, the mover may only cover the minimum released-value liability (60 cents per pound). If the packing pros handle it, the full-value coverage typically applies. Always confirm this with your mover before packing day.' },
      { q: 'What is bed bug prep packing?', a: 'Bed bug prep packing is a specialized service common in NYC where packers seal your belongings in ways that prevent bed bugs from travelling to your next apartment. This usually involves encasing mattresses and upholstered furniture in certified bed-bug-proof covers, sealing all clothing and linens in airtight bags, and inspecting items before boxing. If your current building has HPD pest violations, requesting this add-on is strongly recommended — it typically adds $150–$300 to a standard packing job but can save you thousands in extermination costs at your new place.' },
      { q: 'Do packers also unpack at the new apartment?', a: 'Unpacking is a standard add-on offered by most professional packing services. The crew will unpack boxes, place items in designated rooms or cabinets, and remove all packing materials and empty boxes when they leave. Many NYC clients book same-day unpacking so they are fully settled by evening. Expect unpacking to cost roughly 60-80% of the packing fee and take slightly less time since placement is faster than wrapping.' },
      { q: 'Should I pack anything myself?', a: 'Pack personal items, valuables, and essentials. Let pros handle fragile items and furniture.' },
      { q: 'How long does packing take?', a: 'A studio takes 2-3 hours, 1BR 3-5 hours, 2BR 5-8 hours.' }
    ]
  },
  'storage-facilities': {
    name: 'Storage Facilities',
    description: 'Secure self-storage and full-service valet storage in NYC',
    category: 'Moving Services',
    h1Override: 'Top-Rated NYC Storage Facilities (Self-Storage & Full-Service Valet)',
    subHeadline: 'Expand your NYC apartment or bridge a lease gap. Get matched with secure, climate-controlled self-storage or full-service companies that pick up and deliver.',
    extraQuickFact: { label: 'Self-access units or valet bin storage', detail: 'Choose between traditional self-access units or full-service companies that pick up and deliver via an app' },
    dataMoat: {
      headline: 'Is Your New Building Delaying Your Move-In?',
      subtitle: 'Caught in a lease gap? Check your new building',
      body: "Building management delays, active DOB permit work, or sudden stop-work orders can leave you caught in a lease gap. If you need emergency gap storage because your new apartment isn\u2019t ready, verify the building\u2019s permit status using our free tool so you know exactly how long you\u2019ll need a storage unit.",
      ctaText: 'Check your building\u2019s permit status',
      ctaHref: '/building',
    },
    intro: `Storage in NYC serves a different purpose than elsewhere. Here, storage is often an extension of your living space \u2014 a way to make a small apartment livable by rotating seasonal items or holding furniture during lease gaps. Options range from traditional self-storage to full-service valet companies that pick up, store, and deliver on demand.`,
    whyNeed: ['NYC apartments are small - storage extends your living space', 'Useful during lease gaps or renovations', 'Seasonal item rotation (winter clothes, AC units, bikes)', 'Full-service options mean no truck rental needed', 'Climate control protects furniture and valuables'],
    whatToLookFor: [
      { title: 'Climate Control', desc: 'Essential for furniture, electronics, and anything sensitive to humidity.' },
      { title: 'Access Hours', desc: 'Self-storage hours vary. Some offer 24/7, others limited access.' },
      { title: 'Security Features', desc: 'Look for surveillance, individual unit alarms, and secure access.' },
      { title: 'Full-Service Option', desc: 'They pick up, store, and deliver - no truck needed.' },
      { title: 'Month-to-Month Terms', desc: 'Avoid long contracts unless you get a significant discount.' }
    ],
    costRange: '$100\u2013$200/month for small, $200\u2013$400 for medium, $400+ for large',
    timeline: 'Can often start same week; full-service needs 2-3 days',
    faqs: [
      { q: 'What is the difference between self-storage and full-service storage in NYC?', a: 'Self-storage means you rent a unit at a facility and handle transport yourself \u2014 you either rent a truck or hire movers to bring your items to and from the unit, and you visit the facility whenever you need something. Full-service (also called valet storage) works differently: the company sends bins or a crew to your apartment, picks everything up, catalogues it with photos in an app, and stores it at their warehouse. When you need something back, you request delivery through the app and they bring it to your door. Full-service costs more per month but eliminates the need for a truck, movers, and trips to a storage facility.' },
      { q: 'Do I need climate-controlled storage in New York?', a: 'For anything beyond cardboard boxes of clothes, yes. NYC summers regularly push past 90\u00B0F with extreme humidity, and winters drop well below freezing. That swing can warp wood furniture, crack leather, damage electronics, degrade photographs, and promote mold growth on upholstered items. Climate-controlled units typically maintain 55\u201380\u00B0F year-round with humidity management. Expect to pay 20\u201330% more than a standard unit, but the protection is worth it for furniture, electronics, instruments, or anything you plan to use again.' },
      { q: 'How do I protect my stored items from bed bugs and pests?', a: 'Ask any facility about their pest-control protocol before signing \u2014 reputable NYC facilities run monthly treatments. On your end, never store items in cardboard boxes from the street (a common NYC bed bug vector). Use sealed plastic bins, encase mattresses and upholstered furniture in certified pest-proof covers, and wash all clothing and linens on high heat before packing. If your current apartment has a pest history (you can check HPD violations using our building lookup tool), take extra precautions or request a pest-prep service from your movers.' },
      { q: 'What are the minimum rental terms for NYC storage?', a: 'Most self-storage facilities in NYC offer month-to-month leases with no long-term commitment required. Some will offer a discount for 3-, 6-, or 12-month prepayment. Full-service valet providers also typically operate month-to-month, though some charge a minimum pickup/delivery fee that makes very short terms (under 2 months) less cost-effective. For lease-gap storage, month-to-month flexibility is essential \u2014 always confirm cancellation terms and whether there is a mandatory notice period before signing.' },
      { q: 'How much space do I need?', a: '5x5 fits boxes. 5x10 fits a studio. 10x10 fits a 1-2BR.' },
      { q: 'What shouldn\'t I store?', a: 'Perishables, flammables, anything illegal, and irreplaceable items.' }
    ]
  },
  'junk-removal': {
    name: 'Junk Removal',
    description: 'Fast, insured, and eco-friendly junk removal and furniture disposal in NYC',
    category: 'Moving Services',
    h1Override: 'Top-Rated NYC Junk Removal & Furniture Disposal',
    subHeadline: 'Clear out your space without lifting a finger. Get matched with fully insured, eco-friendly haulers who navigate NYC walk-ups and ensure strict compliance with DSNY disposal rules.',
    extraQuickFact: { label: 'DSNY compliance required', detail: 'Mattresses must be sealed in plastic, freon appliances require special handling, and bulk items cannot sit curbside' },
    dataMoat: {
      headline: "Don\u2019t Let Curbside Dumping Cost You Your Security Deposit",
      subtitle: 'Avoid DSNY fines & landlord disputes',
      body: "NYC\u2019s Department of Sanitation (DSNY) aggressively fines buildings for improper bulk disposal \u2014 and landlords often pass those fines directly to departing tenants. Before you drag that old couch to the curb, use our free tool to check your building\u2019s history of sanitation and waste violations. If your building is a target for inspectors, use our vetted haulers for same-day removal so nothing sits on the sidewalk.",
      ctaText: 'Check your building\u2019s violation history',
      ctaHref: '/building',
    },
    intro: `Junk removal in NYC isn\u2019t as simple as putting stuff on the curb. Large items require appointments with sanitation, and many things can\u2019t go curbside at all. Professional services handle the heavy lifting, navigate building rules, and ensure items are disposed of properly \u2014 or donated when possible.`,
    whyNeed: ['NYC sanitation has strict rules about large item disposal', 'Buildings often prohibit leaving items in common areas', 'Heavy items are difficult to move through walk-ups', 'Many services donate usable items instead of landfilling', 'Same-day service available for urgent cleanouts'],
    whatToLookFor: [
      { title: 'Transparent Pricing', desc: 'Most charge by volume. Get quotes before they arrive.' },
      { title: 'Donation Policy', desc: 'Good services donate usable items. Ask what percentage gets donated.' },
      { title: 'Building Compliance', desc: 'They should know how to work with building staff and elevators.' },
      { title: 'Same-Day Available', desc: 'Useful for urgent cleanouts or move-out deadlines.' },
      { title: 'E-Waste Handling', desc: 'Electronics require special disposal. Confirm they handle e-waste properly.' }
    ],
    costRange: '$100\u2013$250 for small loads, $300\u2013$500 for half truck, $500\u2013$800+ for full',
    timeline: 'Often available same-day or next-day',
    faqs: [
      { q: 'Do I need a special bag to throw away a mattress in NYC?', a: 'Yes \u2014 NYC law requires all mattresses and box springs to be sealed in a heavy-duty plastic bag before they can be placed curbside or removed from a building. The rule was enacted specifically to slow the spread of bed bugs between apartments. If you put an unbagged mattress on the curb, DSNY can fine the building and the landlord will almost certainly pass that fine to you. Professional junk removal haulers bring compliant mattress bags as standard \u2014 it is one of the main reasons to hire a pro instead of dragging it out yourself.' },
      { q: 'Will junk removal companies take old AC units or refrigerators?', a: 'Yes, but these appliances require special handling because they contain CFC or Freon refrigerant gas that is illegal to vent into the atmosphere. NYC vetted junk removers transport them to certified recycling centres where the refrigerant is safely recovered before the unit is scrapped. You cannot put a freon appliance curbside with regular trash \u2014 DSNY will not collect it, and the building can be fined. If you have a window AC unit, a fridge, or a chest freezer, always confirm with the hauler that they handle freon-containing appliances before booking.' },
      { q: 'How do haulers calculate pricing for walk-up apartments?', a: 'Most NYC junk removal companies price primarily by volume \u2014 specifically, how much space your items occupy in the truck (measured in fractions like \u00BC truck, \u00BD truck, or full truck). On top of the volume rate, many charge a labor surcharge for walk-ups: typically $25\u2013$50 per flight above the ground floor. A fifth-floor walk-up cleanout can add $100\u2013$200 in stair fees. Some haulers also add charges for exceptionally heavy single items like safes, pianos, or cast-iron tubs. Always get a written quote that breaks out volume, stair fees, and any heavy-item surcharges before the crew starts loading.' },
      { q: 'What items will NYC junk removers NOT take?', a: 'Most haulers will not accept hazardous materials including liquid paint (dried latex paint cans are usually fine), motor oil, gasoline, propane tanks, industrial solvents, pesticides, medical waste, and asbestos-containing materials. These require disposal through the NYC Department of Sanitation\u2019s SAFE (Solvents, Automotive, Flammables, Electronics) disposal events or private hazmat contractors. Some companies also decline to take construction debris like drywall or concrete unless you book a dedicated demolition cleanout. Always disclose everything you need removed when requesting a quote to avoid day-of surprises.' },
      { q: 'Do junk removal services donate usable items?', a: 'Reputable services donate usable furniture and goods rather than landfilling everything.' },
      { q: 'Do I need to be present during the removal?', a: 'Usually yes for building access and to confirm exactly what goes. Some services allow you to designate items in advance if your building can provide access.' }
    ]
  },
  'cleaning-services': {
    name: 'Cleaning Services',
    description: 'Professional move-in and move-out deep cleaning services in NYC',
    category: 'Moving Services',
    h1Override: 'Top-Rated NYC Move-In & Move-Out Cleaning Services',
    subHeadline: 'Secure your deposit or start fresh. Get matched with professional NYC cleaners equipped to erase years of city grime, sanitize your space, and meet strict landlord turnover standards.',
    extraQuickFact: { label: 'Broom-clean or deep clean', detail: 'Choose between standard broom-clean turnover or a full deep clean including inside appliances and cabinets' },
    dataMoat: {
      headline: 'Moving Into a Building with a Pest or Mold History?',
      subtitle: 'Sanitize based on building history',
      body: "City grime is one thing, but a building\u2019s history is another. Before you book a standard clean for your new apartment, use our free tool to check the building\u2019s 311 complaints for mold, leaks, or HPD pest violations. If your new building has a history, you can request a heavy-duty sanitization clean to ensure you are starting with a truly safe, healthy slate before your boxes arrive.",
      ctaText: 'Check your building\u2019s complaint history',
      ctaHref: '/building',
    },
    intro: `Move-in and move-out cleaning in NYC goes beyond regular cleaning. You\u2019re dealing with years of city grime and need to meet building or landlord standards. Professional cleaners have the equipment and products to deep clean efficiently, which can help you get your security deposit back or ensure you\u2019re moving into a truly clean space.`,
    whyNeed: ['Deep cleaning helps recover your security deposit', 'NYC apartments accumulate city grime that needs professional treatment', 'Move-in cleaning ensures you start fresh', 'Saves time during already stressful moving period', 'Professional equipment reaches areas you can\'t'],
    whatToLookFor: [
      { title: 'Move-Out Guarantee', desc: 'Some cleaners guarantee landlord approval or re-clean free.' },
      { title: 'Supplies Included', desc: 'Confirm they bring all cleaning supplies and equipment.' },
      { title: 'Checklist Provided', desc: 'Professional services provide detailed checklists.' },
      { title: 'Appliance Cleaning', desc: 'Oven, refrigerator interiors should be included.' },
      { title: 'Window Cleaning', desc: 'Interior windows often included; exterior may cost extra.' }
    ],
    costRange: '$150\u2013$250 for studios, $200\u2013$350 for 1BR, $300\u2013$500+ for 2BR+',
    timeline: 'Book 3-5 days ahead; same-day possible at premium',
    faqs: [
      { q: 'Will a move-out clean guarantee I get my security deposit back?', a: "Not automatically, but it dramatically strengthens your position. New York law only requires tenants to leave an apartment in \u201Cbroom-clean\u201D condition \u2014 meaning swept, free of personal belongings, and without obvious damage. However, many NYC landlords aggressively push for a much higher \u201Cdeep clean\u201D standard and will try to deduct cleaning costs from your deposit regardless. Professional move-out cleaning gives you two advantages: first, the apartment will genuinely meet or exceed what any landlord expects, and second, you get a dated receipt and photo documentation proving the work was done. If the landlord still tries to withhold deposit money for \u201Ccleaning,\u201D that receipt is your strongest evidence in housing court or small claims." },
      { q: 'Do NYC cleaning services bring their own supplies and vacuums?', a: "Yes \u2014 vetted professional cleaning crews arrive with everything they need: commercial-grade vacuums, mops, microfibre cloths, heavy-duty degreasers, bathroom disinfectants, and glass cleaners. You do not need to leave a vacuum behind or buy supplies for an empty apartment. If you have specific preferences (for example, you want non-toxic or fragrance-free products), mention it when booking so the crew can bring the right alternatives. Some services also bring steam cleaners for deep sanitization at an additional cost." },
      { q: 'Does move-in or move-out cleaning include the inside of appliances?', a: "This is typically what separates a standard clean from a proper move-out deep clean. A standard \u201Cbroom-clean\u201D service covers floors, countertops, and bathroom surfaces. A deep clean adds the interior of the refrigerator and freezer, the oven cavity and racks, the inside of the dishwasher, the microwave interior, and all kitchen and bathroom cabinets \u2014 inside and out. Landlords performing a move-out inspection almost always open the oven and fridge, so skipping these areas is the most common reason for deposit deductions. Always confirm that \u201Cinside appliances\u201D is explicitly listed on the service checklist before booking." },
      { q: 'How do cleaners get access if the apartment is empty?', a: "There are a few standard approaches used across NYC. The most common is leaving keys with the doorman or building super with a written note authorising the cleaning crew by name and date. For walk-ups without a doorman, many clients use a lockbox on the door handle with a code shared the morning of the appointment. You can also meet the cleaners at the apartment to let them in and then head to work \u2014 most crews are fine being locked in and pulling the door shut when they leave. If you have already returned your keys to the landlord, coordinate with building management to arrange temporary access for the cleaning window." },
      { q: 'How long does cleaning take?', a: 'Studios 2-3 hours, 1BR 3-4 hours, 2BR 4-6 hours.' },
      { q: 'Should I clean before or after moving?', a: 'Move-out: after furniture is gone. Move-in: before your stuff arrives.' }
    ]
  },
  'real-estate-agents': {
    name: 'Real Estate Agents',
    description: 'Tenant-focused NYC apartment brokers who negotiate in your favor',
    category: 'Pre-Lease Research',
    h1Override: 'Tenant-Focused NYC Real Estate Agents & Apartment Brokers',
    subHeadline: 'Level the playing field. Get matched with vetted, tenant-first brokers who help you find off-market listings, avoid bait-and-switch scams, and negotiate lease terms in your favor.',
    extraQuickFact: { label: 'Application fees capped at $20', detail: 'NYC apartment application and credit check fees are legally capped at $20 under state law' },
    dataMoat: {
      headline: "Don\u2019t Let a Broker Push You Into a Problem Building",
      subtitle: 'Vet the building before you apply',
      body: "A shiny \u2018newly renovated\u2019 apartment might be hiding a nightmare. Before your agent submits your application and deposit, run the address through our free building lookup tool. If we find active heat complaints, pest infestations, or stop-work orders, you can use that official data to negotiate a lower rent, or walk away before you\u2019re trapped in a lease.",
      ctaText: 'Look up a building before you apply',
      ctaHref: '/building',
    },
    intro: `Finding an apartment in NYC often involves brokers, but not all work in your interest. Tenant-focused agents help you find listings, negotiate lease terms, and navigate applications. Understanding the difference between a landlord\u2019s broker and a tenant\u2019s agent can save you thousands of dollars and months of frustration.`,
    whyNeed: ['Access to listings not on public sites', 'Help navigating NYC\'s competitive rental market', 'Negotiate lease terms and move-in costs', 'Guide through application and approval process', 'Knowledge of neighborhood-specific market conditions'],
    whatToLookFor: [
      { title: 'Tenant Representation', desc: 'Confirm they represent you, not the landlord.' },
      { title: 'Fee Structure', desc: 'Understand who pays the broker fee.' },
      { title: 'Neighborhood Expertise', desc: 'Agents specializing in your target areas know the buildings.' },
      { title: 'Responsiveness', desc: 'NYC moves fast. You need quick responses.' },
      { title: 'No-Fee Listings Access', desc: 'Good agents know which buildings offer no-fee apartments.' }
    ],
    costRange: 'Broker fees typically 1 month rent or 12-15% annual; many no-fee options',
    timeline: 'Start searching 30-45 days before move date',
    faqs: [
      { q: "What is the difference between a landlord\u2019s broker and a tenant\u2019s broker?", a: "A landlord\u2019s broker (also called a listing agent) is hired and paid by the building owner to fill vacancies at the highest possible rent. Their loyalty is to the landlord. A tenant\u2019s broker works on your side \u2014 they search for apartments that match your budget and requirements, give you access to off-market and exclusive listings, negotiate lease terms and rent on your behalf, and guide you through the application process. In NYC, the distinction matters because a listing agent has no obligation to tell you about problems with the building or negotiate a lower rent. A tenant\u2019s broker does." },
      { q: 'Are NYC broker fees negotiable?', a: "The standard NYC broker fee is one month\u2019s rent or 12\u201315% of the annual rent. However, this is not fixed by law \u2014 it is negotiable. A savvy tenant\u2019s broker can often steer you toward \u201COP\u201D (Owner Pays) listings where the landlord covers the entire fee, effectively making it a no-fee apartment for you. Even on listings with a tenant-paid fee, brokers will sometimes reduce their commission to close a deal, especially during slower rental months (November through February). Always ask about OP listings first, and don\u2019t assume the quoted fee is final." },
      { q: 'How much are apartment application fees in NYC?', a: "Under the Housing Stability and Tenant Protection Act of 2019, landlords and brokers in New York State are legally capped at charging $20 total for background and credit check fees per application. Any charge above $20 is illegal. This law was enacted to prevent the old practice of collecting $50\u2013$100+ application fees from dozens of applicants with no intention of renting to most of them. If a broker or landlord asks for more than $20 in application fees, that is a red flag \u2014 and a violation of state law you can report to the Attorney General\u2019s office." },
      { q: 'What documents do I need to prepare for an NYC apartment hunt?', a: "NYC landlords move fast and expect a complete application package on the spot. The standard requirements are: proof of income meeting the 40x monthly rent rule (for example, $120,000 annual salary for a $3,000/month apartment), a letter of employment on company letterhead, your two most recent pay stubs, the last two months of bank statements, your most recent federal tax return, and a government-issued photo ID. If you don\u2019t meet the 40x income threshold, most landlords will accept a guarantor who earns 80x the monthly rent. Having these documents organized in a single PDF before you start touring apartments gives you a serious edge in NYC\u2019s competitive market." },
      { q: 'How far ahead should I look?', a: 'Most NYC listings are for 30-day move-in. Start actively touring 3-4 weeks before your target move date.' },
      { q: 'Can I find an apartment without a broker?', a: 'Yes, through direct-from-landlord listings on platforms like StreetEasy (filter for no-fee), RentHop, and building websites. However, a tenant\u2019s broker can access off-market inventory and negotiate on your behalf.' }
    ]
  },
  'building-inspectors': {
    name: 'Building Inspectors',
    description: 'Certified pre-lease apartment and building inspectors in NYC',
    category: 'Pre-Lease Research',
    h1Override: 'Pre-Lease NYC Apartment & Building Inspectors',
    subHeadline: "Don\u2019t sign a lease blindly. Get matched with certified inspectors who uncover hidden water damage, illegal electrical work, mold, and pest evidence before you hand over your security deposit.",
    extraQuickFact: { label: 'Ideal for high-stakes leases', detail: 'Best for luxury rentals, co-op/condo purchases, or poorly maintained pre-war units where hidden damage is common' },
    dataMoat: {
      headline: 'Tell Your Inspector Exactly What to Look For',
      subtitle: 'Pair your digital inspection with a physical one',
      body: "Before your physical walkthrough, run the apartment address through our free building lookup tool. If our database shows historical 311 complaints for mice, winter heat outages, or bathroom leaks, you can hand that exact data to your inspector so they know exactly which baseboards, radiators, and pipes to scrutinize.",
      ctaText: 'Run a free building check first',
      ctaHref: '/building',
    },
    intro: `Before signing a lease, a professional inspection can reveal issues the landlord won\u2019t mention: pest evidence, water damage, mold, lead paint, or faulty electrical. In NYC\u2019s competitive market, this step can save you from a nightmare situation \u2014 and the documented report gives you leverage to negotiate repairs, a rent reduction, or walk away entirely before you\u2019re locked in.`,
    whyNeed: ['Identify hidden issues before signing a lease', 'Document existing damage to protect your deposit', 'Check for pests, mold, water damage, and safety hazards', 'Verify apartment matches listing claims', 'Leverage findings to negotiate repairs or rent'],
    whatToLookFor: [
      { title: 'Rental-Specific Experience', desc: 'Different from home buying. Find someone who knows rental issues.' },
      { title: 'Pest Detection', desc: 'Should check for signs of roaches, mice, and bed bugs.' },
      { title: 'Photo Documentation', desc: 'Detailed photos protect you when moving out.' },
      { title: 'Quick Turnaround', desc: 'NYC moves fast - they should accommodate tight timelines.' },
      { title: 'Written Report', desc: 'Get a detailed written report you can reference.' }
    ],
    costRange: '$150\u2013$300 for standard apartment inspection',
    timeline: 'Can often schedule within 2-3 days',
    faqs: [
      { q: 'Can I hire an inspector for a rental apartment in NYC?', a: "Yes \u2014 and it\u2019s increasingly common. While apartment inspections have traditionally been associated with buyers, \u201Crenter inspections\u201D are becoming a standard practice in NYC, especially for longer leases and older buildings. A pre-lease inspection documents pre-existing damage (cracks, stains, scuffed floors, chipped paint) with timestamped photos, which protects you from unfair security deposit deductions when you move out. It also catches safety hazards \u2014 faulty outlets, mold behind bathroom tiles, pest evidence in cabinet gaps \u2014 that you would never spot during a rushed 15-minute showing. For a 12-month lease at $3,000/month, you\u2019re committing $36,000 \u2014 a $200 inspection is insurance against signing into a problem apartment." },
      { q: 'Do apartment inspectors check for lead paint?', a: "A qualified inspector can check for lead paint, which is a critical concern in NYC buildings constructed before 1960. Under NYC\u2019s Local Law 1 (the Childhood Lead Poisoning Prevention Act), landlords of pre-1960 buildings are required to inspect for and remediate lead-based paint hazards in apartments where children under six reside. An inspector can use an XRF (X-ray fluorescence) device to test paint layers non-destructively and verify whether the landlord has met their legal remediation obligations \u2014 or whether they\u2019ve simply painted over lead paint with a fresh coat (which does not meet the legal standard). If you have children or plan to, a lead paint check before signing a lease in any pre-1960 building is strongly recommended." },
      { q: 'Will the inspector check the building\u2019s central heating?', a: "A good rental inspector will test every radiator or heating unit in the apartment, verify that hot water reaches adequate temperature (120\u00B0F minimum), and check water pressure at all fixtures \u2014 especially in upper-floor walk-ups where gravity-fed systems often deliver weak flow. Heat and hot water complaints are the number one 311 issue in NYC, so this is arguably the most important part of a pre-lease inspection. While an apartment-level inspector cannot inspect the building\u2019s central boiler directly, they can identify symptoms of a failing system: radiators that don\u2019t heat, inconsistent hot water temperature, and banging pipes (water hammer) that indicate systemic problems. Pair the physical inspection with our building lookup tool to check the property\u2019s historical heat complaint record for a complete picture." },
      { q: 'What happens if the inspector finds mold or bed bugs?', a: "Documented proof of mold or bed bugs gives you powerful leverage before you\u2019ve signed anything. With a written inspection report in hand, you have three options: first, walk away entirely \u2014 you have no obligation to sign a lease on a unit with active hazards. Second, present the report to the landlord and demand professional remediation (not just a paint job or a spray) as a condition of signing. Third, use the documented issues to negotiate a lower rent or concessions (such as a free month or waived broker fee) to offset the risk. If you\u2019ve already signed but the inspection reveals conditions the landlord failed to disclose, the report becomes evidence for an HPD complaint, a Warranty of Habitability claim, or \u2014 in severe cases \u2014 lease termination. The key is documentation: a professional report with photos carries far more weight than a verbal complaint." },
      { q: 'Can I use the inspection report to negotiate?', a: 'Absolutely. Documented issues like water damage, pest evidence, or faulty appliances give you concrete leverage to request repairs before move-in, negotiate a rent reduction, or ask the landlord to cover specific fixes as a lease condition.' },
      { q: 'What if the landlord won\u2019t allow an inspection?', a: 'This is a serious red flag. A landlord who refuses a reasonable pre-lease inspection likely knows about issues they don\u2019t want documented. In a competitive NYC market it can feel risky to push back, but signing a 12-month lease on an uninspected apartment in a pre-war building is a far bigger risk.' }
    ]
  },
  'renters-insurance': {
    name: 'Renters Insurance',
    description: 'Affordable NYC renters insurance that meets landlord and co-op requirements',
    category: 'Pre-Lease Research',
    h1Override: 'Top-Rated NYC Renters Insurance (Landlord & Co-op Approved)',
    subHeadline: 'Protect yourself from upstairs leaks, theft, and liability. Get matched with affordable NYC policies that meet strict landlord requirements and cover your temporary housing if disaster strikes.',
    extraQuickFact: { label: '$100K personal liability (standard)', detail: 'Most NYC landlords require at least $100,000 in personal liability coverage before move-in' },
    dataMoat: {
      headline: 'Does Your New Building Have a History of Leaks or Broken Locks?',
      subtitle: 'Assess your building\u2019s risk factor',
      body: "In NYC, your biggest threat isn\u2019t usually yourself \u2014 it\u2019s the 80-year-old plumbing in the apartment above you, or the constantly broken front door in the lobby. Before you skip buying a policy, run your building\u2019s address through our free lookup tool. If we find historical 311 complaints for plumbing leaks, roof damage, or broken security locks, a $15/month insurance policy is the smartest investment you can make.",
      ctaText: 'Check your building\u2019s risk history',
      ctaHref: '/building',
    },
    intro: `Renters insurance is one of the most affordable ways to protect yourself in NYC. For roughly $15\u201330 per month, you get coverage for your belongings, liability protection, and additional living expenses if your place becomes uninhabitable. Most landlords and co-op boards now require it before move-in.`,
    whyNeed: ['Protects belongings from theft, fire, and water damage', 'Liability coverage if someone is injured in your home', 'Many NYC landlords require proof of coverage', 'Covers additional living expenses if displaced', 'Surprisingly affordable - often under $20/month'],
    whatToLookFor: [
      { title: 'Coverage Amount', desc: 'Inventory your belongings. Most need $20,000-$50,000.' },
      { title: 'Replacement vs Actual Value', desc: 'Get replacement cost - it pays for new items.' },
      { title: 'Liability Limits', desc: '$100,000 minimum recommended; $300,000 for extra protection.' },
      { title: 'Deductible Options', desc: 'Higher deductible = lower premium.' },
      { title: 'Valuable Items Coverage', desc: 'Standard policies limit jewelry, electronics, art. Add riders if needed.' }
    ],
    costRange: '$12\u2013$30/month for most NYC apartments',
    timeline: 'Can get coverage same day; quotes in minutes online',
    faqs: [
      { q: 'Does renters insurance cover water damage from the neighbor above me?', a: "Yes \u2014 this is one of the most common claims in NYC. If the upstairs neighbor\u2019s bathtub overflows, an old pipe bursts inside the wall, or the building\u2019s roof leaks into your unit, your landlord\u2019s insurance typically covers the building structure but not your personal belongings. Your ruined laptop, couch, clothes, and hardwood-floor damage to items you own are your responsibility. A renters insurance policy with personal property coverage pays to replace those items. In pre-war NYC buildings with aging plumbing, water damage from other units is far more likely than theft \u2014 making this coverage essential, not optional." },
      { q: 'Will renters insurance pay for a hotel if my building has a fire or vacate order?', a: "Yes \u2014 this falls under \u201CLoss of Use\u201D (also called Additional Living Expenses or ALE) coverage, which is included in virtually every standard renters policy. If the NYC Department of Buildings issues a vacate order due to a fire, structural damage, gas leak, or even a problem in an adjacent building, Loss of Use coverage pays for your hotel, temporary apartment, meals, and other reasonable living expenses until you can return or find a new place. In NYC, this is critical: e-bike lithium battery fires and adjacent-building collapses have displaced entire floors of tenants with zero warning. ALE coverage typically provides 20\u201340% of your total policy limit for these expenses." },
      { q: 'How much liability coverage do I need for an NYC apartment?', a: "The standard requirement from most NYC management companies and landlords is $100,000 in personal liability coverage. However, stricter co-op and condo boards \u2014 particularly on the Upper East Side, Upper West Side, and in Downtown Manhattan \u2014 may require $300,000 or even $500,000 in liability to cover potential damage you could cause to common areas, hallways, or neighbouring units (for example, if you leave a tap running and flood three floors below you). The cost difference between $100K and $300K in liability is typically only $2\u20135 per month, so opting for the higher limit is almost always worth it. Check your lease or board requirements before purchasing." },
      { q: 'Does renters insurance cover my bike if it\u2019s stolen from the building basement?', a: "In most cases, yes. Standard personal property coverage protects your belongings whether they are inside your apartment, in a designated building storage area (bike room, basement cage, roof storage), or even locked up outside on the street. If your bike is stolen from the building\u2019s basement or common bike room, you can file a claim for the replacement value (if you have replacement cost coverage) or the depreciated value (if you have actual cash value coverage). High-value bikes over $1,000\u2013$1,500 may hit the sub-limit for individual items on a standard policy \u2014 if you own an expensive bike, add a scheduled personal property rider to ensure it is fully covered." },
      { q: 'How much coverage do I need?', a: 'Total the replacement cost of all your belongings. Most NYC renters need $20,000\u2013$50,000 in personal property coverage.' },
      { q: 'Does my policy cover my roommate?', a: 'Usually no. Each person on the lease typically needs their own policy unless you are related or domestic partners on the same plan.' }
    ]
  },
  'internet-providers': {
    name: 'Internet Providers',
    description: 'Find fiber, cable, and 5G home internet options for your NYC building',
    category: 'Settling In',
    h1Override: 'NYC Internet Providers (Find Fiber, Cable & 5G for Your Building)',
    subHeadline: "Don\u2019t get stuck with a slow connection. Check which providers actually service your specific building, compare real speeds, and find out if you\u2019re eligible for gigabit fiber or alternative 5G home internet.",
    extraQuickFact: { label: 'Building wiring limits your options', detail: 'Many NYC buildings are only wired for one specific cable provider \u2014 check availability before signing a lease' },
    dataMoat: {
      headline: "Check Your Building\u2019s Infrastructure Before Signing",
      subtitle: 'Is your building stuck in the dark ages?',
      body: "If you work from home, a building\u2019s internet infrastructure is just as important as the plumbing. Neglected buildings with heavy HPD violations often have decades-old coaxial wiring that drops connections during peak hours. Use our free building lookup tool to check the property\u2019s overall maintenance history and DOB electrical permits before you commit to a lease in a digital dead zone.",
      ctaText: 'Check your building\u2019s maintenance history',
      ctaHref: '/building',
    },
    intro: `Internet options in NYC vary dramatically by building and neighborhood. Some buildings have fiber with multiple providers; others are stuck with one slow cable option. If you work from home, checking internet availability before signing a lease is just as important as checking the subway commute.`,
    whyNeed: ['Work from home requires reliable, fast internet', 'Options vary significantly by building - check before signing', 'Some buildings have exclusive deals with one provider', 'Fiber availability is expanding but not universal', 'Speeds advertised vs actual speeds often differ'],
    whatToLookFor: [
      { title: 'Building Availability', desc: 'Check which providers service your specific building.' },
      { title: 'Fiber vs Cable', desc: 'Fiber offers faster, more reliable speeds.' },
      { title: 'Actual Speed Tests', desc: 'Ask tenants or check speed test databases.' },
      { title: 'Contract Terms', desc: 'Avoid long contracts. Many offer month-to-month.' },
      { title: 'Installation Timeline', desc: 'Schedule before move-in. Waits can be weeks.' }
    ],
    costRange: '$40\u2013$60 basic, $60\u2013$80 mid-tier, $80\u2013$100+ gigabit',
    timeline: 'Order 1-2 weeks before move; installation times vary',
    faqs: [
      { q: 'Why can I only get one internet provider in my NYC apartment?', a: "While exclusive landlord\u2013ISP contracts were technically banned by the FCC, physical wiring limitations in older NYC buildings often produce the same result. If your pre-war walk-up was only ever wired with coaxial cable by one company \u2014 typically Spectrum (formerly Time Warner) in Manhattan and Brooklyn, or Optimum (Altice) in parts of the Bronx and outer boroughs \u2014 that is the only provider whose infrastructure actually reaches your unit. A second provider would need to run new lines through the building, which requires landlord permission and construction. The practical result is a de facto monopoly in thousands of NYC buildings, even though it is not a legal one." },
      { q: 'How do I get Verizon Fios or fiber internet in my building?', a: "Fios availability depends on whether Verizon has physically wired your building with fiber-optic cable \u2014 not just whether fiber runs down your street. The landlord or building management must grant Verizon access to install the necessary infrastructure inside the building (conduit, risers, and in-unit ONT boxes). Some landlords refuse or delay this process. You can check Fios availability by address on Verizon\u2019s website, but if your building is not listed, your best move is to request it formally through Verizon and simultaneously ask your landlord to permit installation. NYC has a \u201Cright of access\u201D provision, but enforcement is slow. In the meantime, 5G home internet may be a viable workaround." },
      { q: 'Are 5G home internet options good for NYC renters?', a: "5G home internet from T-Mobile and Verizon has become the go-to workaround for renters stuck in buildings with terrible traditional cable wiring. The setup is simple: you plug a small router into a window-facing outlet, it picks up the outdoor 5G signal, and broadcasts Wi-Fi throughout your apartment. No installation appointment, no drilling, no landlord permission needed. Speeds vary by location and building line-of-sight to the nearest tower \u2014 T-Mobile typically advertises 72\u2013245 Mbps, while Verizon 5G Home can hit 300+ Mbps in strong coverage areas. It is month-to-month with no contract, making it ideal for renters. The main downside is latency can be higher than wired fiber, which matters for competitive gaming or real-time video production but is fine for video calls and streaming." },
      { q: 'Who installs the internet jack if my bedroom doesn\u2019t have one?', a: "ISP technicians can usually run a new line to any room in your apartment, but how they do it depends on your building. The simplest approach is running the cable along baseboards and around door frames using adhesive clips \u2014 this requires no building approval and is standard practice. If you want the wire hidden behind the walls (a \u201Cfished\u201D installation), the technician typically needs approval from building management because it involves drilling into walls and potentially accessing shared risers. In co-ops and condos, you may need written board approval for any wall penetration. Always ask the ISP during scheduling whether they can run the line to your desired room and what the process involves for your specific building type." },
      { q: 'What speed do I need?', a: '100 Mbps handles most needs. 200+ Mbps for regular video calls. 500+ Mbps for households with multiple heavy users streaming and working simultaneously.' },
      { q: 'Can I get internet set up before I move in?', a: 'You can place the order in advance, but the installation appointment usually requires someone present in the apartment for access. Schedule for your first day in the new place.' }
    ]
  },
  'locksmith': {
    name: 'Locksmith Services',
    description: 'Licensed NYC locksmiths for apartment lock changes, lockouts, and security upgrades',
    category: 'Settling In',
    h1Override: 'Vetted NYC Locksmiths (Apartment Lock Changes & Lockouts)',
    subHeadline: 'Protect your new apartment from day one. Get matched with licensed, transparently-priced NYC locksmiths who understand local fire codes and tenant lock-change laws.',
    extraQuickFact: { label: 'Tenant lock-change rights', detail: 'NYC tenants can change locks but must provide management with a duplicate key for emergency access' },
    dataMoat: {
      headline: 'Broken Intercoms and Unlocked Lobbies',
      subtitle: 'Is your building\u2019s front door actually secure?',
      body: "Your apartment lock is only your second line of defense. Before you move in, use our free lookup tool to check your new building\u2019s 311 history. If the property has chronic complaints for a broken front door, a busted intercom system, or trespassing, upgrading your apartment\u2019s deadbolt from a standard pin-and-tumbler to a high-security lock (like Medeco or Mul-T-Lock) is an absolute necessity.",
      ctaText: 'Check your building\u2019s security complaints',
      ctaHref: '/building',
    },
    intro: `Changing locks when you move into a new NYC apartment is smart security \u2014 you don\u2019t know who has copies from previous tenants, dog walkers, or old housekeepers. NYC tenants have the legal right to change locks (provided you give the landlord a duplicate key). A licensed locksmith can also upgrade your security to high-security cylinders that prevent unauthorized key duplication.`,
    whyNeed: ['Previous tenants may have key copies', 'NYC law allows tenants to change locks', 'Upgrade from basic locks to high-security options', 'Emergency lockout services when you\'re stuck', 'Can add additional security like deadbolts'],
    whatToLookFor: [
      { title: 'Licensed and Insured', desc: 'NYC requires locksmith licensing. Verify before hiring.' },
      { title: 'Upfront Pricing', desc: 'Get a quote before work begins.' },
      { title: 'Emergency Availability', desc: 'Find one with 24/7 service for lockouts.' },
      { title: 'High-Security Options', desc: 'They should offer quality lock brands.' },
      { title: 'Key Copy Policies', desc: 'Remember you must provide landlord with a key.' }
    ],
    costRange: '$75\u2013$150 standard lock change; $150\u2013$300 high-security; $100\u2013$200 emergency lockout',
    timeline: 'Same-day service usually available',
    faqs: [
      { q: 'Can my NYC landlord legally stop me from changing my apartment locks?', a: "No. Under New York City law, tenants have the right to install or change their own locks at their own expense. However, you are legally required to provide the landlord or building superintendent with a duplicate key upon request \u2014 this is to ensure emergency access in case of fire, flood, or gas leak. Refusing to provide a key can put you in violation of your lease. In practice, the best approach is to have the locksmith make an extra copy on the spot and drop it off with building management the same day. Your landlord cannot refuse to accept the key, and they cannot demand you use a specific locksmith." },
      { q: 'Are double-cylinder deadbolts legal in NYC apartments?', a: "No \u2014 double-cylinder deadbolts (locks that require a key to open from both the inside and the outside) are strict violations of the NYC Fire Code. These locks can trap residents during a fire when they cannot find their key in smoke and panic. Any reputable NYC locksmith will only install single-cylinder deadbolts with a thumb-turn on the interior side, allowing you to exit quickly without a key. If your apartment currently has a double-cylinder deadbolt installed by a previous tenant or landlord, it should be replaced immediately. This is one of the most common fire-code violations found in older NYC walk-ups." },
      { q: 'How do I avoid emergency lockout scams in NYC?', a: "The most common scam works like this: you search \u201Clocksmith near me\u201D in a panic, call the first result, and are quoted $29\u2013$49 over the phone. The technician arrives, claims the lock needs to be drilled out and replaced, and hands you a bill for $250\u2013$400. This bait-and-switch is rampant in NYC. To avoid it: never hire from a Google ad without checking the company\u2019s physical address and NYC locksmith license number, get the total price confirmed in writing or text before work begins, and know that most standard lockouts can be resolved without drilling \u2014 a skilled locksmith can pick or bypass a typical NYC apartment lock in minutes. Using Building Health X\u2019s vetted locksmiths guarantees transparent, flat-rate pricing with no surprise charges." },
      { q: 'Do I need a high-security lock like a Medeco or Mul-T-Lock?', a: "Standard pin-and-tumbler locks \u2014 the type installed in most NYC apartments \u2014 can be bumped or picked by someone with basic tools and a YouTube tutorial in under 60 seconds. High-security locks from brands like Medeco, Mul-T-Lock, and Abloy use patented keyways and pick-resistant pin configurations that are effectively impossible to bypass without the correct key. Crucially, their keys can only be duplicated at authorised dealers with a registered ID card, which prevents previous tenants, ex-partners, dog walkers, or building staff from making unauthorised copies at a corner hardware store. For ground-floor apartments, buildings with broken intercoms, or anyone with security concerns, upgrading to a high-security cylinder is one of the highest-value investments you can make \u2014 typically $150\u2013$300 per lock installed." },
      { q: 'How much does a lock change cost?', a: 'Basic pin-and-tumbler lock change: $75\u2013$150 per lock. High-security lock (Medeco, Mul-T-Lock): $150\u2013$300 per lock. Prices include hardware and labour.' },
      { q: 'What should I do if I\u2019m locked out?', a: 'Call a licensed locksmith with transparent pricing \u2014 not the first Google ad result. Most standard lockouts cost $100\u2013$200 and can be resolved without drilling. Keep a spare key with a trusted neighbour or in a lockbox as backup.' }
    ]
  },
  'furniture-assembly': {
    name: 'Furniture Assembly',
    description: 'Insured IKEA and flat-pack furniture assembly services in NYC',
    category: 'Settling In',
    h1Override: 'NYC Furniture & IKEA Assembly Services (Vetted & Insured)',
    subHeadline: 'Skip the frustration and the leftover screws. Get matched with insured professionals who specialize in complex IKEA PAX builds, Murphy beds, and safe wall-mounting for pre-war NYC apartments.',
    extraQuickFact: { label: 'Top requests', detail: 'IKEA PAX wardrobe systems, TV wall-mounting, and heavy bed frames are the most common bookings' },
    dataMoat: {
      headline: 'Drilling Into NYC Plaster? Check the Building First.',
      subtitle: 'Know your walls before you drill',
      body: "In New York, anchoring a heavy bookshelf or mounting a TV means rolling the dice on 80-year-old plaster, hidden pipes, and strict landlord rules. Before your pro starts drilling, use our free tool to check the building\u2019s DOB profile. If there are active plumbing violations or structural complaints, you\u2019ll know exactly which walls to avoid. Plus, our vetted assemblers are fully insured \u2014 just in case.",
      ctaText: 'Check your building\u2019s DOB profile',
      ctaHref: '/building',
    },
    intro: `Flat-pack furniture is an NYC apartment staple \u2014 it\u2019s affordable and fits through narrow doorways. But assembly can be frustrating, especially when you\u2019re dealing with uneven pre-war floors, plaster walls that crumble when you drill, and IKEA instructions that assume you own a garage. Professional assemblers have the tools, experience, and insurance to get it done quickly and correctly.`,
    whyNeed: ['Saves hours of frustrating DIY assembly', 'Professionals have proper tools and experience', 'Correctly assembled furniture is safer and lasts longer', 'Can handle complex pieces like PAX wardrobes, murphy beds', 'Often available same-day or next-day'],
    whatToLookFor: [
      { title: 'Flat Rate vs Hourly', desc: 'Flat rate per piece is often better for complex items.' },
      { title: 'Tools Provided', desc: 'They should bring all necessary tools.' },
      { title: 'Experience with Your Brand', desc: 'IKEA is common but other brands have quirks.' },
      { title: 'Wall Mounting Included', desc: 'Confirm they do this if needed.' },
      { title: 'Disposal of Packaging', desc: 'Good services remove all cardboard.' }
    ],
    costRange: '$50\u2013$100 simple items; $100\u2013$200 complex (PAX, beds); hourly $50\u2013$80',
    timeline: 'Often available same-day or next-day',
    faqs: [
      { q: 'How much does it cost to build an IKEA PAX wardrobe in NYC?', a: "IKEA PAX systems are not standard flat-pack builds \u2014 they require precise wall anchoring (a tipping hazard if unsecured), ceiling clearance checks (NYC apartments often have non-standard ceiling heights or crown molding), and careful leveling on the uneven floors typical of pre-war buildings. Because of this, most NYC assemblers quote PAX as a complex flat-rate build rather than billing by the hour. Expect $150\u2013$350 for a single two-door PAX unit including anchoring, and $300\u2013$600+ for a multi-section PAX system with sliding doors, drawers, and interior organisers. The flat rate protects you from the clock running while the assembler fights your crooked floor \u2014 always confirm the price includes wall anchoring before booking." },
      { q: 'Do the assemblers carry the heavy boxes up my walk-up stairs?', a: "Assembly and delivery are typically separate services. Most furniture assemblers expect the flat-pack boxes to already be in the room where the piece will be built. That said, many NYC pros will help move boxes from the lobby or front door into the apartment for an additional fee \u2014 usually $20\u2013$50 depending on the number of boxes and the floor. If you\u2019re on the 4th or 5th floor of a walk-up, mention it when booking so the assembler comes prepared and quotes accordingly. For heavy single-box items like bed frames, confirm stair-carry availability before the appointment." },
      { q: 'Can they anchor furniture safely into pre-war brick or plaster walls?', a: "Yes \u2014 this is one of the main reasons to hire a professional instead of doing it yourself. NYC\u2019s pre-war apartments have walls that range from lathe-and-plaster (which crumbles with standard drywall anchors) to exposed brick (which requires masonry bits) to hollow-tile construction (which needs specialty toggle bolts). Vetted assemblers carry the right drill bits and anchoring hardware for each wall type and know how to locate studs behind plaster without tearing out chunks of wall. This matters for safety \u2014 an improperly anchored PAX wardrobe or bookshelf is a genuine tipping hazard \u2014 and for your lease, since oversized holes in plaster walls often result in deposit deductions." },
      { q: 'What happens if an assembler scratches my hardwood floors?', a: "This is the biggest risk of hiring unvetted gig workers from general marketplaces. A heavy bed frame dragged across original hardwood can leave gouges that cost hundreds to repair. Professionals matched through Building Health X are fully insured \u2014 meaning if damage occurs, their liability coverage pays for the repair. Vetted assemblers also take preventive steps as standard practice: laying down protective blankets or moving pads under the build area, using felt pads on furniture legs, and assembling large pieces in sections rather than sliding a completed unit across the floor. Always confirm insurance coverage before the appointment, and take a quick photo of the floor beforehand for your own records." },
      { q: 'How long does assembly take?', a: 'Simple bookshelf or side table: 15\u201330 minutes. Bed frame: 45\u201390 minutes. IKEA PAX wardrobe: 2\u20134 hours depending on configuration and wall anchoring.' },
      { q: 'Do assemblers also disassemble furniture for moving?', a: 'Yes \u2014 most professional assemblers offer disassembly as well. This is especially useful for IKEA pieces that need to be taken apart to fit back through narrow NYC doorways and hallways.' }
    ]
  },
  'painters': {
    name: 'Painters',
    description: 'Professional NYC apartment painters for move-in, move-out, and custom paint jobs',
    category: 'Settling In',
    h1Override: 'NYC Apartment Painters (Move-In, Move-Out & Custom Paint)',
    subHeadline: "Skip the sloppy \u2018landlord special.\u2019 Get matched with professional, fully insured NYC painters to refresh your space, cover up bold colors, or restore your walls to pristine white to guarantee your security deposit.",
    extraQuickFact: { label: 'NYC law: repaint every 3 years', detail: 'Landlords are legally required to paint rental apartments in multiple dwellings every three years' },
    dataMoat: {
      headline: "Don\u2019t Let a Fresh Coat Hide a Major Hazard",
      subtitle: 'Check for lead paint before you sand',
      body: "If you\u2019re moving into a pre-war NYC apartment, peeling paint isn\u2019t just an eyesore \u2014 it could be a toxic lead hazard. Before you or a painter start scraping and sanding, use our free lookup tool to check your new building\u2019s HPD profile for lead-based paint violations. If your building has a history, our vetted painters use EPA-certified safe work practices to encapsulate and paint your walls safely.",
      ctaText: 'Check your building\u2019s lead paint history',
      ctaHref: '/building',
    },
    intro: `NYC apartments often need paint \u2014 whether you\u2019re covering a previous tenant\u2019s bold colors, refreshing dingy walls after years of city grime, or restoring everything to landlord white before move-out. NYC law requires landlords to repaint every three years, but quality varies wildly. Professional painters deliver results that last and protect your deposit.`,
    whyNeed: ['Fresh paint transforms a space quickly', 'Cover previous tenant\'s color choices', 'NYC law requires repainting every 3 years - but quality varies', 'Professional prep work ensures lasting results', 'Repair wall damage before moving out'],
    whatToLookFor: [
      { title: 'Prep Work Included', desc: 'Good jobs require wall repair, sanding, and priming.' },
      { title: 'Paint Quality', desc: 'Ask what paint brand they use. Cheap paint doesn\'t last.' },
      { title: 'Furniture Moving', desc: 'Do they move furniture and protect floors?' },
      { title: 'Timeline Accuracy', desc: 'Get a realistic timeline.' },
      { title: 'Touch-Up Policy', desc: 'Good painters return for touch-ups.' }
    ],
    costRange: '$300\u2013$500 per room; whole apartment $800\u2013$2,000+',
    timeline: 'Book 1-2 weeks ahead; job takes 1-3 days',
    faqs: [
      { q: 'Do NYC landlords have to paint before I move in?', a: "Under NYC\u2019s Housing Maintenance Code, landlords of multiple dwellings are legally required to paint or wallpaper apartments every three years. In practice, most landlords comply by sending a building super or day labourer to roll the cheapest flat white paint available over every surface as fast as possible \u2014 often painting directly over cracked plaster, nail holes, switch plates, and even cable wires. The result is the infamous \u2018landlord special\u2019: thick, lumpy coats hiding years of damage. If the paint job in your new apartment is clearly substandard, you can file an HPD maintenance complaint, but hiring your own professional painter to do it properly is usually faster and gives you a space you actually want to live in." },
      { q: 'Can my landlord keep my deposit if I paint the walls a different color?', a: "Most NYC leases contain a clause requiring you to return the apartment in its original condition, which includes wall colour. If you paint your walls navy blue, forest green, or any non-standard colour during your tenancy, the landlord will almost certainly deduct the cost of repainting from your security deposit when you move out \u2014 and professional repainting quotes of $1,500\u2013$3,000+ for a full apartment are not unusual. The safest approach is to hire a professional painter to restore everything to standard \u2018landlord white\u2019 (typically Benjamin Moore Super White or a similar flat white) before your lease ends. Keep the receipt and take dated photos as proof. This investment of $800\u2013$1,500 usually saves you more than double in deposit deductions." },
      { q: 'Will the painters prep the walls or just paint over the cracks?', a: "Professional NYC painters include prep work as a standard part of the job \u2014 and it\u2019s what separates a quality result from another landlord special. Proper prep includes: scraping and sanding any peeling or flaking paint, skim-coating crumbling plaster and filling nail holes with spackle, sanding the patches smooth, priming repaired areas (and entire walls if switching from dark to light colours), taping edges around trim, windows, and ceilings, and laying drop cloths over floors and any remaining furniture. The prep typically takes longer than the actual painting. If a quote seems suspiciously low, ask specifically what prep work is included \u2014 cheap painters skip it, and the result shows within months." },
      { q: 'Do I need building management approval to hire a painter?', a: "In most standard rental apartments, painting is considered routine maintenance and does not require formal approval beyond whatever your lease says about alterations. However, in co-ops, condos, and many luxury managed buildings, hiring any outside contractor \u2014 including painters \u2014 almost always requires the contractor to submit a Certificate of Insurance (COI) naming the building as additional insured before work can begin. Some buildings also restrict work hours (typically 9 AM\u20135 PM weekdays only) and require advance notice to the super. Always check with building management before scheduling the job. Our vetted painters are familiar with NYC building requirements and can provide a COI on request." },
      { q: 'How long does painting take?', a: 'One room including prep: 1 day. Full apartment (studio or 1BR): 2\u20133 days. Larger apartments: 3\u20134 days. Empty apartments go faster since there is no furniture to work around.' },
      { q: 'Should I paint before or after moving in?', a: 'Before. Painting an empty apartment is significantly faster, cheaper, and produces better results since every wall and corner is accessible without moving furniture.' }
    ]
  },
  'pest-control': {
    name: 'Pest Control',
    description: 'Licensed NYC exterminators for bed bugs, roaches, rodents, and building-wide infestations',
    category: 'Ongoing Needs',
    h1Override: 'Top-Rated NYC Exterminators (Bed Bugs, Roaches & Rodents)',
    subHeadline: "Don\u2019t wait weeks for your landlord\u2019s cheap exterminator to show up with a spray can. Get matched with licensed NYC pest control pros who perform deep exclusion work and eradicate infestations at the source.",
    extraQuickFact: { label: 'Landlord must keep apartments pest-free', detail: 'NYC landlords are legally required to eradicate pests under the Warranty of Habitability' },
    dataMoat: {
      headline: "Treating Your Unit Won\u2019t Work if the Neighbors Have Bugs",
      subtitle: 'Check if the whole building is infested',
      body: "In NYC\u2019s dense pre-war buildings, roaches and mice travel easily through shared walls and radiator pipes. Before you pay out of pocket for an exterminator, use our free tool to check your building\u2019s 311 complaint history and HPD pest violations. If the whole building has an active infestation, you have the data and legal leverage to force your landlord to pay for a building-wide treatment.",
      ctaText: 'Check your building\u2019s pest complaint history',
      ctaHref: '/building',
    },
    intro: `Pests are an unfortunate reality of NYC apartment living. The density of pre-war buildings means roaches, mice, and bed bugs spread easily between units through shared walls, radiator pipes, and electrical conduits. NYC landlords are legally required to provide pest control, but many rely on the cheapest monthly service that only sprays and leaves. For serious infestations \u2014 especially bed bugs \u2014 professional deep treatment is the only effective solution.`,
    whyNeed: ['NYC density means pests spread easily between units', 'Bed bugs require professional treatment - no DIY solution works', 'Landlords are legally required to address infestations', 'Quick action prevents small problems from becoming major', 'Document issues for potential lease-breaking or legal action'],
    whatToLookFor: [
      { title: 'NYC Licensed', desc: 'Pest control requires state licensing. Verify credentials.' },
      { title: 'Specific Pest Expertise', desc: 'Bed bugs, roaches, and rodents each require different approaches.' },
      { title: 'Treatment Plan', desc: 'Should explain what they\'ll do and timeline.' },
      { title: 'Follow-Up Included', desc: 'Most pests require multiple treatments.' },
      { title: 'Guarantee', desc: 'Reputable services guarantee results.' }
    ],
    costRange: 'Roaches $100\u2013$250; Bed bugs $300\u2013$1,500; Rodents $150\u2013$400',
    timeline: 'Often available within 1-3 days',
    faqs: [
      { q: 'Who is responsible for paying for an exterminator in NYC?', a: "Under the NYC Housing Maintenance Code, landlords are legally obligated to eradicate pest infestations in rental apartments \u2014 this includes roaches, mice, rats, and bed bugs. Landlords typically contract a monthly pest control service that visits the building on a set schedule. However, these building-contracted exterminators often do little more than spray baseboards and leave bait traps. When that fails to solve the problem, many tenants hire a private licensed exterminator out of pocket and then pursue reimbursement from the landlord (or deduct from rent with proper legal process). If your landlord refuses to address a documented infestation, you can file an HPD complaint, which triggers an inspection and can result in violations and fines against the building." },
      { q: 'What is exclusion work and why do I need it in an older apartment?', a: "Exclusion work is the process of finding and physically sealing every entry point that pests use to get into your apartment \u2014 and in NYC\u2019s pre-war buildings, there are dozens. Common entry points include gaps around radiator pipes where they pass through walls, openings under sink cabinets where plumbing enters, spaces around electrical outlet boxes on shared walls, cracks along baseboards, and gaps under the apartment\u2019s front door. A proper exclusion job involves stuffing these gaps with steel wool (which mice cannot chew through), sealing with caulk or expanding foam, and installing door sweeps. Without exclusion, spraying chemicals only kills the pests currently inside \u2014 new ones walk right back in from the hallway, neighbouring units, or the building\u2019s basement within days." },
      { q: 'Can I break my lease if my apartment has bed bugs?', a: "Potentially, but there is a specific legal process you must follow. Under New York\u2019s Warranty of Habitability, a landlord is required to maintain the apartment in a livable condition, and a persistent pest infestation that the landlord fails to resolve can constitute a breach of that warranty. To build a legal case: first, notify your landlord in writing (email is fine) describing the infestation in detail. Give the landlord a reasonable period to cure \u2014 typically 30 days. Document everything with photos, inspection reports from a licensed exterminator, and copies of all communication. If the landlord fails to cure after written notice and a reasonable cure period, you may have grounds to break the lease without penalty. Consult a tenant rights attorney \u2014 many offer free consultations \u2014 before taking action." },
      { q: 'How are NYC bed bug treatments different from roach treatments?', a: "Roach treatments are relatively straightforward: a licensed exterminator applies gel bait, boric acid, and targeted sprays to harbourage areas, and the problem is usually resolved within 1\u20132 visits combined with exclusion work. Bed bugs are an entirely different challenge. Effective bed bug treatment requires intensive tenant prep work (laundering all clothing and linens on high heat, emptying closets and drawers, encasing mattresses), followed by either chemical treatment across multiple visits spaced 2\u20133 weeks apart, or a single-visit whole-room heat treatment where the apartment is brought to 130\u00B0F+ for several hours to kill all life stages. DIY foggers and bug bombs are actively counterproductive for bed bugs \u2014 they scatter the bugs deeper into walls and furniture, spreading the infestation to other rooms and neighbouring units. Always hire a licensed professional for bed bugs." },
      { q: 'How do I prevent roaches in my apartment?', a: 'Keep all food in sealed containers, never leave dishes in the sink overnight, seal gaps around pipes with steel wool and caulk, fix any leaky faucets (roaches need water), and take trash out daily. These steps reduce the attractants but exclusion work is needed to physically block entry points.' },
      { q: 'I think I have bed bugs \u2014 what do I do first?', a: 'Confirm identification (look for small reddish-brown bugs in mattress seams, or tiny dark spots on sheets), notify your landlord in writing immediately, and do not move furniture to other rooms or sleep in another room \u2014 this spreads the infestation. Request a professional inspection as soon as possible.' }
    ]
  },
  'hvac-repair': {
    name: 'HVAC Repair',
    description: 'Licensed NYC HVAC technicians for AC, PTAC, and heating repair',
    category: 'Ongoing Needs',
    h1Override: 'NYC HVAC Repair (AC, PTAC & Heating Specialists)',
    subHeadline: 'Survive brutal NYC summers and freezing winters. Get matched with licensed technicians who service window ACs, repair complex PTAC units, and handle emergency heating outages.',
    extraQuickFact: { label: 'Heat Season law: 68\u00B0F minimum', detail: 'Landlords must legally maintain indoor temperatures of at least 68\u00B0F during the day from October 1 through May 31' },
    dataMoat: {
      headline: 'Chronic Boiler Failures and Freezing Apartments',
      subtitle: 'Is your landlord ignoring the heat law?',
      body: "In NYC, lack of heat and hot water is the single most common 311 complaint. Before you pay out of pocket to fix a radiator or buy an expensive space heater, use our free lookup tool to check your building\u2019s history. If the landlord has chronic HPD violations for a failing boiler, you have the official data you need to file a formal complaint or withhold rent legally, rather than paying for their neglected maintenance.",
      ctaText: 'Check your building\u2019s heat complaint history',
      ctaHref: '/building',
    },
    intro: `Heating and cooling issues are serious in NYC \u2014 winter heat is legally required, and summer without AC is brutal. Know who\u2019s responsible: landlords must provide heat and hot water during Heat Season (October 1\u2013May 31), but AC maintenance varies by lease. PTAC units, steam radiators, and window ACs each require specialised service from technicians who understand NYC\u2019s unique building systems.`,
    whyNeed: ['Legal heating requirements in NYC (Oct 1 \u2013 May 31)', 'No heat is an emergency - landlord must respond quickly', 'AC repair needs can be urgent in NYC summers', 'Window AC units require annual maintenance', 'PTAC units in newer buildings need specialized service'],
    whatToLookFor: [
      { title: 'NYC Experience', desc: 'NYC has unique systems - PTACs, steam radiators, window units.' },
      { title: 'Emergency Service', desc: 'No heat in winter is an emergency. Find 24/7 availability.' },
      { title: 'Landlord vs Tenant Systems', desc: 'Clarify what you\'re responsible for.' },
      { title: 'Window Unit Service', desc: 'Many handle window AC installation and repair.' },
      { title: 'Diagnostic Fee Policy', desc: 'Some charge fees that apply toward repair.' }
    ],
    costRange: 'Service calls $75\u2013$150; repairs $150\u2013$500; window AC service $100\u2013$200',
    timeline: 'Emergency same-day; routine 2-5 days',
    faqs: [
      { q: 'What are the exact rules for NYC Heat Season?', a: "NYC Heat Season runs from October 1 through May 31. During this period, landlords are legally required to provide heat. The specific rules are: between 6 AM and 10 PM, if the outside temperature drops below 55\u00B0F, the indoor temperature must be at least 68\u00B0F. Between 10 PM and 6 AM, the indoor temperature must be at least 62\u00B0F regardless of the outside temperature. Hot water must be provided year-round at a minimum of 120\u00B0F. If your apartment fails to meet these thresholds, call 311 to file a complaint \u2014 HPD will schedule an inspection and can issue violations with daily fines against the landlord. Document the temperature with a dated photo of a thermometer as evidence." },
      { q: 'Who is responsible for repairing a PTAC unit in NYC?', a: "PTAC (Packaged Terminal Air Conditioner) units are the through-wall heating and cooling systems common in newer NYC condos, luxury rentals, and hotels converted to residential. Responsibility depends on your lease and building structure. In most cases, the building maintains the metal sleeve (the housing built into the wall) and the electrical connection, while the tenant or unit owner is responsible for repairing or replacing the actual chassis \u2014 the removable machine that slides into the sleeve. In some luxury rental buildings, the landlord covers the entire unit. Always check your lease for the specific PTAC maintenance clause before calling a technician. PTAC repairs typically run $150\u2013$400, while full chassis replacement costs $800\u2013$1,500 depending on the brand and BTU rating." },
      { q: 'Do HVAC pros clean and service window AC units?', a: "Yes, and it\u2019s more important in NYC than most places. Window AC units in the city accumulate massive amounts of street exhaust particulates, dust, mold, and \u2014 in upper-floor units \u2014 pigeon debris and feathers in the exterior housing. Running a dirty unit recirculates all of that directly into your living space, which can trigger allergies and respiratory issues. A professional deep clean involves removing the unit from the window (or servicing in place), cleaning the evaporator and condenser coils, flushing the drain pan and line, replacing or cleaning the filter, and straightening bent fins to restore airflow. This typically costs $100\u2013$200 per unit and should be done annually before summer. The difference in cooling performance and air quality is immediately noticeable." },
      { q: 'Can I deduct HVAC repair costs from my rent?', a: "New York recognises a \u201Crepair and deduct\u201D doctrine, but it comes with strict conditions. You can only deduct repair costs from rent if: the issue is a serious habitability problem (no heat in winter qualifies; a slightly noisy AC does not), you notified the landlord in writing and gave them a reasonable period to fix it (typically 30 days, or less for a genuine emergency like no heat below freezing), the landlord failed to act within that period, you hired a licensed professional and obtained a paid receipt, and the repair cost is reasonable relative to the issue. Even then, landlords may dispute the deduction. The safest approach is to document everything \u2014 written notices, photos with timestamps, thermometer readings, and the repair invoice \u2014 and consult a tenant rights attorney if the amount is significant. For emergency heating failures, calling 311 first creates an official record that strengthens your position." },
      { q: 'My heat isn\u2019t working \u2014 what do I do?', a: 'Notify your landlord or building management immediately in writing (email or text creates a record). If they do not respond within a reasonable time, call 311 to file a heat complaint. HPD treats no-heat complaints as emergencies during Heat Season.' },
      { q: 'Can I install my own window AC unit?', a: 'Usually yes for standard window units, but check your lease. Some buildings require professional installation or restrict AC placement to certain windows. Co-ops may require board approval for any exterior-facing modification.' }
    ]
  },
  'plumbers': {
    name: 'Plumbers',
    description: 'Licensed emergency and scheduled plumbing services for NYC apartments',
    category: 'Ongoing Needs',
    h1Override: 'Emergency NYC Plumbers (Apartment Leaks, Clogs & Repairs)',
    subHeadline: 'Stop the leak before it destroys the apartment below you. Get matched with licensed NYC plumbers who respond faster than your landlord and know how to navigate 100-year-old pre-war pipes.',
    extraQuickFact: { label: 'Shut off your water valve immediately', detail: 'Always locate and shut off your local water valve during a leak to minimize damage to neighbours below you' },
    dataMoat: {
      headline: "Don\u2019t Pay for Your Landlord\u2019s Rotten Pipes",
      subtitle: 'Is it your drain, or the building\u2019s main line?',
      body: "If your sink keeps backing up or your ceiling is dripping, it might not be your fault. Before you pay out of pocket to snake a drain, use our free tool to check your building\u2019s 311 complaint history. If there are chronic complaints for plumbing leaks, water damage, or HPD mold violations, the issue is likely in the building\u2019s main risers. Use our official data to force your landlord to hire a Master Plumber, rather than just sending the super with a wrench.",
      ctaText: 'Check your building\u2019s plumbing complaint history',
      ctaHref: '/building',
    },
    intro: `Plumbing emergencies in NYC apartments can quickly affect multiple units \u2014 a burst pipe or overflowing fixture in your apartment can send water cascading into the unit below within minutes, exposing you to potential liability. Most plumbing issues are the landlord\u2019s responsibility, but response times vary wildly and sometimes you need professional help faster than the super can arrive with a wrench.`,
    whyNeed: ['Plumbing emergencies can damage multiple units quickly', 'Clogged drains and leaks need fast response', 'Old NYC plumbing systems have unique quirks', 'Landlord response times vary', 'Document issues for landlord reimbursement'],
    whatToLookFor: [
      { title: 'NYC Licensed', desc: 'Plumbers must be licensed in NYC. Verify license number.' },
      { title: '24/7 Emergency Service', desc: 'Plumbing emergencies don\'t wait.' },
      { title: 'Apartment Building Experience', desc: 'NYC plumbing is interconnected.' },
      { title: 'Upfront Pricing', desc: 'Get quotes before work begins.' },
      { title: 'Warranty on Work', desc: 'Good plumbers stand behind their repairs.' }
    ],
    costRange: 'Service calls $100\u2013$200; minor repairs $150\u2013$350; major $400+',
    timeline: 'Emergency same-day; routine 1-3 days',
    faqs: [
      { q: 'Can I hire an emergency plumber and deduct the cost from my NYC rent?', a: "New York recognises a \u201Crepair and deduct\u201D doctrine for genuine emergencies. If a pipe bursts or a severe leak is actively damaging your apartment, the landlord is unreachable (or refuses to act), and the situation qualifies as an immediate threat to habitability, you can hire a licensed plumber yourself and deduct the cost from your next month\u2019s rent. However, the conditions are strict: you must have notified the landlord in writing first (text or email with a timestamp counts), given them a reasonable window to respond (for a true emergency, hours \u2014 not days \u2014 is considered reasonable), and the repair must be performed by a licensed professional with a proper invoice. Keep photos of the damage, a copy of your communication to the landlord, and the paid receipt. For non-emergency plumbing issues, the standard notice period is typically 30 days before you can deduct. When in doubt, consult a tenant rights attorney before withholding rent." },
      { q: 'Am I financially responsible if my plumbing issue damages the apartment below me?', a: "It depends on the cause. If the leak originates from the building\u2019s infrastructure \u2014 a corroded riser, a failed main valve, or a shared waste line \u2014 the landlord is responsible for all damage, including to your neighbour\u2019s apartment. However, if the leak was caused by something you did or failed to do \u2014 leaving a sink or bathtub running, improperly installing a bidet attachment, hooking up a dishwasher or washing machine without proper fittings, or ignoring a visibly dripping fixture for weeks \u2014 you can be held personally liable for the downstairs neighbour\u2019s property damage. This is exactly why renters insurance with personal liability coverage is essential. The fastest way to limit your exposure during an active leak is to shut off the local water valve immediately and call a licensed plumber. A $200 emergency call is dramatically cheaper than a $15,000 water damage lawsuit from the apartment below." },
      { q: 'Can I hire a plumber to install a washing machine in my apartment?', a: "Technically a plumber can install the hookups, but the bigger issue is whether your building and lease allow it. Most standard NYC leases explicitly ban in-unit washing machines because the building\u2019s ageing drain stacks and water supply lines were never designed for the volume and pressure that modern washers produce. There are also strict \u201Cwet over dry\u201D rules: if your apartment is above a bedroom, living room, or any non-water space in the unit below, an in-unit washer is almost certainly prohibited because a leak would cause catastrophic damage to the neighbour\u2019s living space. Violating the washer clause in your lease is one of the most common grounds for eviction proceedings in NYC. If your building does permit washers (some newer condos and luxury rentals do), a licensed plumber should install the supply and drain connections to code, including a proper drain pan and automatic shut-off valve." },
      { q: 'Why is the water pressure so low in my 5th-floor walk-up?', a: "Most NYC walk-ups built before 1940 rely on gravity-fed rooftop water tanks. Water is pumped up to the tank on the roof and then flows down to each unit by gravity alone. The higher your floor, the closer you are to the tank, and the less gravitational pressure pushes water through your fixtures. Compounding the problem, the original galvanized steel pipes in many pre-war buildings have had decades of mineral and calcium buildup inside them, narrowing the internal diameter and further choking flow. A licensed plumber can help in several ways without replacing the entire building\u2019s pipes: cleaning clogged aerators on faucets, replacing showerheads with high-pressure low-flow models, checking and adjusting the building\u2019s pressure-reducing valve (PRV) if one exists, and in some cases installing a small booster pump for your unit. If the issue is building-wide, the landlord is responsible for maintaining adequate water pressure \u2014 document the problem and file a 311 complaint." },
      { q: 'My toilet is overflowing \u2014 what do I do?', a: 'Shut off the water valve behind the toilet immediately (turn clockwise). This stops the flow. Then contact your landlord or building super. If they are unresponsive, call a licensed plumber for same-day service.' },
      { q: 'Is the building\u2019s plumbing the landlord\u2019s responsibility?', a: 'Yes. Any issue originating in shared infrastructure \u2014 risers, main waste lines, the boiler, or the rooftop tank \u2014 is the landlord\u2019s legal responsibility. Document what the plumber identifies as the source and keep the report for your records.' }
    ]
  },
  'electricians': {
    name: 'Electricians',
    description: 'Licensed NYC Master Electricians for apartment wiring, fixtures, and repairs',
    category: 'Ongoing Needs',
    h1Override: 'NYC Licensed Electricians (Apartment Wiring, Fixtures & Repairs)',
    subHeadline: "Don\u2019t risk an electrical fire or blown fuses. Get matched with NYC Master Electricians who can safely upgrade two-prong outlets, install heavy light fixtures, and fix overloaded pre-war circuits.",
    extraQuickFact: { label: 'Master Electrician required', detail: 'All complex wiring and panel work in NYC must be performed by a licensed Master Electrician' },
    dataMoat: {
      headline: 'Is Your Building Hiding Illegal Wiring?',
      subtitle: 'Verify your building\u2019s electrical safety',
      body: "In old NYC apartments, cheap landlords often hire unlicensed handymen to do electrical work, leading to overloaded circuits and severe fire hazards. Before you plug in your expensive electronics or air conditioners, use our free tool to check your building\u2019s DOB profile. If the property has active electrical violations or a history of unpermitted wiring, you can use our vetted, licensed professionals to inspect and secure your apartment\u2019s outlets.",
      ctaText: 'Check your building\u2019s electrical violation history',
      ctaHref: '/building',
    },
    intro: `Electrical work in NYC apartments should always be done by licensed professionals \u2014 it\u2019s both a safety issue and a legal requirement. Old NYC buildings often have outdated electrical systems that were designed for a few light bulbs and a radio, now struggling to support air conditioners, computers, and modern kitchen appliances on circuits that haven\u2019t been upgraded in decades.`,
    whyNeed: ['Electrical work requires licensing in NYC - no DIY', 'Old buildings often have outdated, overtaxed systems', 'Tripping circuits usually indicates bigger problems', 'Outlet and fixture additions need professional installation', 'Safety issues require immediate attention'],
    whatToLookFor: [
      { title: 'NYC Licensed', desc: 'Electrical work requires licensing. Verify master electrician license.' },
      { title: 'Landlord Notification', desc: 'Some work requires landlord permission and permits.' },
      { title: 'Old Building Experience', desc: 'Pre-war electrical has quirks.' },
      { title: 'Clear Communication', desc: 'They should explain findings and recommendations.' },
      { title: 'Emergency Availability', desc: 'Electrical emergencies need immediate response.' }
    ],
    costRange: 'Service calls $100\u2013$200; outlet repair $150\u2013$300; larger work $300+',
    timeline: 'Emergency same-day; routine 2-5 days',
    faqs: [
      { q: 'Can I change a light fixture myself in an NYC rental?', a: "While many tenants do swap out light fixtures themselves, most standard NYC leases classify any electrical modification as an unauthorised alteration. If you hardwire a chandelier or ceiling fan and it later causes a short circuit or fire, you can be held personally liable for the damage \u2014 to your unit, the building, and your neighbours\u2019 apartments. A licensed electrician ensures the fixture is rated for the existing wiring (crucial in pre-war buildings where 60-year-old cloth-insulated wire may be behind the ceiling box), that the junction box can support the weight, and that the work is performed to NYC electrical code. The cost to have a pro swap a fixture is typically $75\u2013$150 \u2014 far less than the liability exposure of doing it yourself without authorisation." },
      { q: 'Why does my window AC unit keep tripping the breaker?', a: "This is one of the most common electrical complaints in older NYC apartments. The root cause is almost always an overloaded circuit. Pre-war and mid-century NYC buildings were typically wired with 15-amp circuits serving multiple rooms \u2014 meaning your bedroom outlets, living room outlets, and sometimes even kitchen outlets all share a single breaker. A modern window AC unit draws 8\u201312 amps on its own, leaving almost no headroom for anything else on that circuit. When you turn on a lamp, charge a laptop, or run a microwave, the total load exceeds 15 amps and the breaker trips. The proper fix is a dedicated 20-amp circuit from the electrical panel to the outlet where the AC is plugged in. This requires a licensed electrician and, in many buildings, landlord approval and a DOB permit. As a temporary workaround, avoid plugging anything else into outlets on the same circuit as your AC." },
      { q: 'Are two-prong outlets illegal in NYC apartments?', a: "Existing two-prong (ungrounded) outlets in older NYC buildings are not technically illegal \u2014 they are \u201Cgrandfathered\u201D under the electrical code, meaning they were legal when installed and are allowed to remain. However, the cheap plastic three-to-two-prong adapters that most tenants use to plug in modern electronics are genuinely dangerous. These adapters do not actually ground the device \u2014 the third prong exists specifically to safely divert electrical faults away from you. Without a true ground, a surge or short circuit in your laptop, TV, or appliance can deliver a shock or start a fire. The proper upgrade is to have a licensed electrician replace two-prong outlets with grounded three-prong outlets (which requires running a ground wire back to the panel) or, where rewiring is impractical, install GFCI-protected outlets that detect ground faults and cut power in milliseconds. This is typically a landlord responsibility in rental apartments \u2014 document and request it in writing." },
      { q: 'What is the difference between a handyman and an NYC Master Electrician?', a: "In New York City, only a licensed Master Electrician (or a journeyman working under one) has the legal authority, insurance, and training to perform electrical work in a multi-family residential building. A Master Electrician can pull DOB permits, certify that work meets the NYC Electrical Code, and carry the liability insurance required to work in occupied buildings. An unlicensed handyman doing electrical work in an NYC apartment building is breaking the law \u2014 and if their work causes a fire, the building\u2019s insurance may not cover the damage, leaving you and the landlord exposed. For simple tasks like changing a light switch cover plate, a handyman is fine. For anything involving wiring, outlets, circuits, panels, or fixtures, always verify that the person holds an active NYC Master Electrician license (searchable on the DOB website)." },
      { q: 'Who pays for electrical repairs in a rental?', a: 'The landlord is responsible for maintaining the existing electrical system \u2014 that includes the panel, wiring, and all original outlets and fixtures. If you want upgrades beyond what the building provides (such as adding outlets or a dedicated AC circuit), the cost is usually on you, but the work still must be done by a licensed electrician.' },
      { q: 'I smell burning from an outlet \u2014 what do I do?', a: 'This is an emergency. Immediately stop using the outlet, unplug everything connected to it, and flip the corresponding breaker off at the panel if you can identify it. Do not touch the outlet if it is hot or discoloured. Contact your landlord and a licensed electrician immediately. If you see smoke or flames, call 911.' }
    ]
  },
  'mold-remediation': {
    name: 'Mold Remediation',
    description: 'NYS-licensed mold inspection and remediation for NYC apartments',
    category: 'Ongoing Needs',
    h1Override: 'NYC Mold Remediation & Inspection (Licensed & Local Law 55 Compliant)',
    subHeadline: "Don\u2019t just paint over it. Get matched with NYS-licensed mold assessors and remediators who identify the moisture source, provide independent clearance testing, and ensure your landlord complies with NYC\u2019s strict indoor allergen laws.",
    extraQuickFact: { label: 'Testing and removal must be separate companies', detail: 'NYS law prohibits the same company from performing both mold assessment and remediation on the same project (anti-fraud requirement)' },
    dataMoat: {
      headline: "Check Your Building\u2019s HPD Mold Violation History",
      subtitle: 'Is your apartment hiding a mold history?',
      body: "Mold is often just a symptom of a deeper building issue like a leaking roof or a cracked riser pipe. Before you pay for professional cleaning, use our free tool to check your building\u2019s history of 311 mold complaints and Class B/C violations. Under Local Law 55, if your building has 10+ units and a major mold issue, your landlord is legally required to hire independent licensed professionals \u2014 not just the building super \u2014 to fix it.",
      ctaText: 'Check your building\u2019s mold complaint history',
      ctaHref: '/building',
    },
    intro: `Mold is common in NYC apartments due to extreme humidity, ageing building systems, and deferred maintenance. Small surface patches can be cleaned yourself, but significant growth \u2014 anything over 10 square feet \u2014 requires professional remediation by NYS-licensed contractors. NYC landlords are legally required to address mold conditions under Local Law 55, and New York State law mandates that mold testing and removal be performed by two separate companies to prevent conflicts of interest.`,
    whyNeed: ['NYC humidity and old buildings create mold-friendly conditions', 'Professional remediation needed for significant growth', 'NYC landlords are legally required to address mold', 'Health impacts can be serious with prolonged exposure', 'Document for potential lease-breaking or legal action'],
    whatToLookFor: [
      { title: 'NYS Mold License', desc: 'New York State requires separate licenses for mold assessment and remediation. Verify both.' },
      { title: 'Testing Services', desc: 'Professional testing identifies mold type and extent via air and surface sampling.' },
      { title: 'Source Identification', desc: 'Good remediators find the moisture source, not just remove mold.' },
      { title: 'Containment Protocols', desc: 'Proper remediation contains spores during removal with negative air pressure.' },
      { title: 'Post-Remediation Clearance', desc: 'Independent follow-up testing by a different company confirms success.' }
    ],
    costRange: 'Testing $200\u2013$600; remediation $500\u2013$3,000+ depending on extent',
    timeline: 'Testing 1-3 days; remediation scheduling 1-2 weeks',
    faqs: [
      { q: 'What is Local Law 55 and how does it protect NYC tenants from mold?', a: "Local Law 55 (the Asthma-Free Housing Act) is one of the strongest tenant protections against mold in the country. For buildings with 3 or more units, landlords are required to proactively inspect for and remediate indoor allergen hazards including mold, pest infestations, and excessive moisture. For buildings with 10 or more units, the requirements are even stricter: any mold-affected area exceeding 10 square feet must be remediated by NYS-licensed mold professionals \u2014 not by the building super painting over it. Landlords must also address the underlying moisture source (leaking pipes, roof damage, condensation from poor ventilation) that caused the mold in the first place. If your landlord paints over mold without fixing the moisture source, that is a violation of Local Law 55 and you can file an HPD complaint to trigger an inspection." },
      { q: 'Why do I need two different companies for mold testing and removal?', a: "Under New York State Labor Law Article 32, the same contractor is legally prohibited from performing both the mold assessment (testing) and the mold remediation (removal) on the same project. This anti-fraud law was enacted specifically to prevent unscrupulous companies from using scare-tactic test results to upsell unnecessary remediation work. In practice, this means you hire one NYS-licensed mold assessor to test, identify the type and extent of mold, and write a remediation plan. You then hire a separate NYS-licensed mold remediation company to perform the actual removal according to that plan. After remediation is complete, the original assessor (or another independent assessor) returns to perform clearance testing confirming the mold has been successfully removed. This two-company structure protects you from being overcharged and ensures objective results." },
      { q: 'Can I break my NYC lease because of mold?', a: "Mold that significantly impacts your health or makes the apartment uninhabitable can constitute a breach of the Warranty of Habitability, which may give you grounds to break your lease. However, the legal process requires specific steps: first, notify your landlord in writing (email with photos is ideal) describing the mold condition in detail. Give the landlord a \u201Creasonable\u201D time to cure \u2014 typically 21 to 30 days for mold remediation. If the landlord fails to act within that period, you may pursue a constructive eviction claim or a rent abatement (a reduction in rent proportional to the loss of use of the affected space). Document everything: photos with timestamps, a professional mold assessment report, copies of all written communication with the landlord, and any medical records if you have developed respiratory symptoms. Consult a tenant rights attorney before vacating \u2014 leaving without following the proper legal process can expose you to liability for the remaining lease term." },
      { q: 'How much does professional mold testing cost in NYC?', a: "A standard professional mold assessment in NYC typically costs $200\u2013$600 depending on the size of the apartment and the number of samples taken. The assessment usually includes a visual inspection of all rooms, moisture readings with a specialised meter, and air quality and surface sampling sent to an accredited laboratory for analysis. The lab results identify the specific mold species present and their concentration levels, which is critical information for two purposes: first, it determines whether the remediation plan needs to address toxic species like Stachybotrys (black mold), and second, it provides the documented evidence you need to file an HPD complaint, demand landlord action under Local Law 55, or pursue legal remedies. Without a professional assessment, you have no official record of the hazard \u2014 which means your landlord can claim the mold was superficial and refuse to act." },
      { q: 'Can I clean mold myself?', a: 'Small areas of surface mold under 10 square feet can be cleaned with detergent and water. Anything larger, or any mold behind walls, in HVAC systems, or on porous materials like drywall, requires professional remediation with proper containment to prevent spreading spores.' },
      { q: 'Who pays for mold remediation?', a: 'If the mold is caused by building issues (leaking roof, broken pipes, poor ventilation), the landlord is legally responsible for both the assessment and remediation costs. If the mold was caused by your own actions (blocking vents, never running the bathroom fan), responsibility may fall to you.' }
    ]
  }
}
