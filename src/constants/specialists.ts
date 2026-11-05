/**
 * Coulsy specialist businesses that the Joinery site hands visitors over to.
 *
 * SINGLE SOURCE OF TRUTH. Every cross-site link on this site derives from here.
 * Nothing may hardcode another Coulsy domain anywhere else.
 *
 * WHY THIS FILE EXISTS — read this before changing anything:
 *
 *   `coulsycontractsolutions.co.uk` was hardcoded into `Footer.astro` and shipped on all
 *   1,035 pages. The domain was later relinquished, and it stayed a dead outbound link on
 *   every page of the site for YEARS before anyone noticed (fixed in `cc5e794`). One
 *   hardcoded URL in one shared component did that.
 *
 *   So: one file, one URL, one place to fix. Adding a future specialist site means adding
 *   one object to SPECIALISTS below — not editing components.
 *
 * RULES:
 *
 * 1. NO FORWARD REFERENCES. This array contains only businesses that are LIVE and verified
 *    right now. No placeholders, no "coming soon", no aspirational entries. In particular:
 *      - `coulsy.co.uk` (the future parent brand site) is OWNED but does not yet resolve.
 *        It must NOT be linked from production until the replacement is live and verified.
 *      - Nothing may reference Property Maintenance, Clerk of Works or an inspection
 *        website before those exist. Robert's MICWCI membership became effective
 *        28 August 2026 and is published as a CREDENTIAL on /about/qualifications —
 *        that is not licence to link or allude to an inspection business that does not.
 * 2. `url` + `ctaPath` MUST return 200. Verify before shipping, and re-verify periodically.
 *    A dead cross-site link is the exact failure this file exists to prevent.
 * 3. `notOurs` is not decoration. It states what deliberately STAYS on the Joinery site.
 *    Joinery is a complete joinery business, not a portal — it hands off only where a
 *    visitor's need genuinely exceeds its discipline.
 */

export interface SpecialistBusiness {
  /** Stable key used by components. */
  id: string;
  /** Trading name, exactly as that business presents itself. */
  name: string;
  /** Origin. Must return 200. */
  url: string;
  /** One-line description of the discipline this business owns. */
  discipline: string;
  /** What that site is the authority for — and what we therefore hand over. */
  owns: string[];
  /** What deliberately REMAINS on the Joinery site. Keeps the boundary explicit. */
  notOurs: string;
  /** The contextual hand-off shown at the point a visitor's need exceeds Joinery. */
  handoff: {
    heading: string;
    body: string;
    ctaLabel: string;
    /** Path on the specialist site. Deep-link to the proposition, not the front door. */
    ctaPath: string;
  };
}

const FIRE_DOORS: SpecialistBusiness = {
  id: "fire-doors",
  name: "Coulsy Fire Doors",
  url: "https://coulsyfiredoors.co.uk",
  // As of 5 Nov 2026, Coulsy Fire Doors no longer sells independent fire-door inspection,
  // compliance assessment or certification as a standalone product — see
  // FIRE_DOORS_COMPLIANCE_HANDOVER.md. This entry hands off to the SPECIALIST CONTRACTING
  // end of fire-door work (multi-door programmes, formal insurer/RP-facing paperwork),
  // never to an inspection product. Joinery keeps advertising, and doing, ordinary
  // fire-door install/repair/maintenance work — including the physical remedial work
  // arising from a customer-supplied fire risk assessment.
  discipline: "Fire door remedial work and compliance programmes",
  owns: [
    "Remedial work against an existing fire risk assessment",
    "Multi-door compliance programmes",
    "New fire door fit-outs for landlords, HMOs and commercial buildings",
    "Written fire-door records for insurers and Responsible Persons",
  ],
  notOurs:
    "Fire door installation, fitting and repair carried out as part of joinery work — " +
    "including remedial work identified by a fire risk assessment — stays on the Joinery " +
    "site, as does the FireQual credential itself.",
  handoff: {
    heading: "Got a fire risk assessment flagging multiple doors?",
    body:
      "A single fire door fitted or repaired as part of joinery work stays with me — but a " +
      "multi-door compliance programme, or a written record for your insurer or Responsible " +
      "Person, is specialist contracting work that Coulsy Fire Doors runs as a dedicated " +
      "service.",
    ctaLabel: "Visit Coulsy Fire Doors",
    ctaPath: "/fire-door-services",
  },
};

/** Live, verified specialist businesses. Exactly one today. */
export const SPECIALISTS: SpecialistBusiness[] = [FIRE_DOORS];

/** Look up a specialist by id. Throws loudly rather than rendering a broken link. */
export function getSpecialist(id: string): SpecialistBusiness {
  const found = SPECIALISTS.find((s) => s.id === id);
  if (!found) {
    throw new Error(
      `Unknown specialist "${id}". Add it to SPECIALISTS in src/constants/specialists.ts — ` +
        `and only once the site is live and its URL returns 200.`
    );
  }
  return found;
}

/** Absolute URL for a specialist's hand-off CTA. */
export function handoffUrl(s: SpecialistBusiness): string {
  return `${s.url}${s.handoff.ctaPath}`;
}
