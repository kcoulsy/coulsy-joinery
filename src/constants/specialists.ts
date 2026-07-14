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
 *      - Nothing may reference Property Maintenance, Clerk of Works, MICWCI or an
 *        inspection website before those exist. ICWCI election is not effective until
 *        28 August 2026.
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
  discipline: "Fire door inspection and compliance",
  owns: [
    "Fire door inspections",
    "Fire door surveys",
    "Compliance reporting",
    "Fire risk assessment remedial works",
  ],
  notOurs:
    "Fire door installation, fitting and repair carried out as part of joinery work stays " +
    "on the Joinery site, as does the FireQual credential itself.",
  handoff: {
    heading: "Need a fire door inspection?",
    body:
      "Fire door inspection and compliance reporting is specialist work, so I run it as a " +
      "dedicated service. I install, fit and repair certified fire doors as part of my " +
      "joinery — but if you need a FireQual-certified inspection, a compliance survey or a " +
      "fire door report, that is handled by Coulsy Fire Doors.",
    ctaLabel: "Visit Coulsy Fire Doors",
    ctaPath: "/fire-door-inspectors",
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
