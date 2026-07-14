/**
 * STATUTORY COMPANY INFORMATION.
 *
 * This is a legal disclosure. It is NOT marketing copy, and it is NOT a customer location.
 *
 * ─────────────────────────────────────────────────────────────────────────────────────────
 * IMPORT RULE: exactly ONE page may import this file — `/company-information`.
 *
 * Do NOT import it into the footer, the contact page, any marketing component, or any
 * structured-data block. Marketing contact details live in `details.ts`; import that instead.
 * ─────────────────────────────────────────────────────────────────────────────────────────
 *
 * WHY THE SEPARATION EXISTS:
 *
 *   The registered office is Robert's HOME. Coulsy is a SERVICE-AREA BUSINESS — customers are
 *   not received there. The address previously appeared on the contact page under the heading
 *   "Where to Find Me", beside a map pin, which reads as an invitation to visit. It also fed
 *   the LocalBusiness schema, where the page's town was substituted into it, producing 1,026
 *   fabricated business addresses.
 *
 *   The registered office must be published (statutory disclosure) but must never be presented
 *   as somewhere a customer goes. Publishing it ONCE, plainly labelled, satisfies both.
 *
 * NEVER put this address, its postcode or its coordinates into:
 *   - `address`, `postalCode` or `geo` on any LocalBusiness / Organization schema
 *   - `hasMap`
 *   - any heading implying a visit ("Where to Find Me", "Visit Us", "Find Us", "Our Location")
 *
 * Service coverage is expressed by `Service.areaServed` — never by a business address.
 *
 * Source of truth: Robert Coulson, owner of Coulsy Limited.
 */
export const COMPANY = {
  /** Registered company name. */
  NAME: "Coulsy Limited",
  /** Trading name used in marketing. */
  TRADING_NAME: "Coulsy Joinery & Small Build",
  /** Companies House number. Eight digits — the leading zero is part of it. */
  NUMBER: "08575688",
  JURISDICTION: "England and Wales",
  VAT_NUMBER: "168340989",
  /**
   * REGISTERED OFFICE — a statutory address, not a place of business.
   * Note: "Rose Cottage" is NOT part of the registered office and must not be added back.
   */
  REGISTERED_OFFICE: {
    LINE_1: "1 Post Office Row",
    TOWN: "Bilton-in-Ainsty",
    COUNTY: "York",
    POSTCODE: "YO26 7NW",
  },
} as const;

/** The registered office as ordered lines, for rendering the disclosure. */
export const REGISTERED_OFFICE_LINES: readonly string[] = [
  COMPANY.REGISTERED_OFFICE.LINE_1,
  COMPANY.REGISTERED_OFFICE.TOWN,
  COMPANY.REGISTERED_OFFICE.COUNTY,
  COMPANY.REGISTERED_OFFICE.POSTCODE,
];
