/**
 * The canonical Coulsy Joinery business entity for structured data.
 *
 * ONE business. ONE `@id`. Byte-identical on every page that declares it.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────
 * WHAT THIS REPLACES:
 *
 *   `pageMeta.ts` used to build a per-page LocalBusiness whose `@id` was
 *   `…/{town}-{service}#business` and whose `address` was the PAGE'S TOWN, substituted in:
 *
 *       addressLocality: cleanLocationName || "York"
 *
 *   The built site therefore declared 1,026 DIFFERENT BUSINESSES, all named Coulsy Joinery,
 *   at 36 different postcodes — 3,080 LocalBusiness nodes in total, three per geo page.
 *   None of those businesses exist.
 * ─────────────────────────────────────────────────────────────────────────────────────────
 *
 * RULES — do not break these:
 *
 * 1. NO `address`, `postalCode`, `geo` or `hasMap`. Ever.
 *    The registered office is Robert's home and Coulsy is a service-area business. It is
 *    published once, as a legal disclosure, on `/company-information` — and nowhere else.
 *    See `company.ts`.
 *
 * 2. NO page-specific values. This node must be IDENTICAL on every page, or it stops
 *    describing one entity and starts describing many. That is the defect this file fixes.
 *    Anything page-specific belongs on the `Service` node.
 *
 * 3. Coverage is expressed by `Service.areaServed`, never by a business address.
 *
 * 4. `Service.provider` must reference `BUSINESS_ID` — but the business node is still emitted
 *    on the same page, inside the same `@graph`. A bare `{"@id": …}` pointing at a node
 *    declared on a DIFFERENT document is not reliably resolved by crawlers; JSON-LD nodes are
 *    not automatically joined across pages. Each page's graph must stand alone.
 */
import { DETAILS } from "./details";

/** Stable, site-scoped. Never page-scoped. */
export const BUSINESS_ID = "https://coulsyjoinery.co.uk/#business";

/** A reference to the canonical business, for use as `Service.provider`. */
export const BUSINESS_REF = { "@id": BUSINESS_ID } as const;

/**
 * The canonical LocalBusiness node. Emitted at most ONCE per page, inside that page's
 * `@graph`, identically every time.
 */
export const BUSINESS_NODE = {
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: "Coulsy Joinery",
  alternateName: "Coulsy Joinery & Small Build",
  url: "https://coulsyjoinery.co.uk",
  image: "https://coulsyjoinery.co.uk/coulsy-logo-sm.jpg",
  email: DETAILS.EMAIL,
  telephone: "+44 7544 030486",
  priceRange: "££",
  paymentAccepted: ["Cash", "Bank Transfer"],
  currenciesAccepted: "GBP",
  openingHours: "Mo-Fr 07:00-18:00",
  knowsAbout: [
    "Joinery",
    "Carpentry",
    "Kitchen Fitting",
    "Bespoke Joinery",
    "Structural Timber",
  ],
  award: ["City & Guilds Qualified", "Joiner Since 1988"],
  sameAs: [DETAILS.SOCIALS.LINKEDIN, DETAILS.SOCIALS.YOUTUBE],
  // NO address. NO postalCode. NO geo. NO hasMap. See rule 1.
} as const;
