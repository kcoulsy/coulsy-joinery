/**
 * MARKETING contact details — safe for any public component to import.
 *
 * The statutory company information (registered name, number, registered office, VAT number)
 * deliberately does NOT live here. It is in `src/constants/company.ts` and is imported by
 * exactly ONE page. See the note in that file.
 */
/**
 * Robert Coulson's professional MEMBERSHIP — one source of truth for the wording.
 *
 * MICWCI is a membership GRADE, conferred 28 August 2026. It is not a qualification, not a
 * licence, and it does not mean Coulsy Joinery is accredited or certified by the Institute.
 * Never use "qualified Clerk of Works", never put it in `hasCredential`, and do not use the
 * Institute's logo without permission. See `about/qualifications.astro`.
 */
export const MEMBERSHIP = {
  POST_NOMINAL: "MICWCI",
  INSTITUTE: "Institute of Clerks of Works and Construction Inspectorate",
  INSTITUTE_SHORT: "ICWCI",
} as const;

/** Schema.org `memberOf` for Robert's Person nodes. Never a credential or an accreditation. */
export const MEMBER_OF_NODE = {
  "@type": "Organization",
  name: MEMBERSHIP.INSTITUTE,
  alternateName: MEMBERSHIP.INSTITUTE_SHORT,
} as const;

export const DETAILS = {
    PHONE: "07544 030486",
  /**
   * The dialling form of PHONE, for `tel:` links. A `tel:` URI must not contain spaces, and the
   * international form (+44, no leading 0) dials correctly from any handset or country.
   * Display text keeps the spaced UK form above. Every `tel:` link uses this one value, so the
   * links cannot drift apart again (they were a mix of "07544 030486" and "07544030486").
   */
  PHONE_HREF: "tel:+447544030486",
  
  EMAIL: "robert@coulsy.co.uk",
  FIRST_NAME: "Robert",
  SOCIALS: {
    LINKEDIN:
      "https://www.linkedin.com/company/coulsy-limited/?viewAsMember=true",
    YOUTUBE: "https://www.youtube.com/@coulsyjoinery",
  },
  GOOGLE_REVIEWS_LINK:
    "https://www.google.co.uk/search?sca_esv=a2fccd0347a25b28&sxsrf=AHTn8zqWFT7yKdHkqFDJKwKg9v9rhOBmDw:1745422782131&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2Kzb0XEp2uqMuZLtIVp1vswCvGbtdWC0cAFOUS22wpt7JVpgeq3QRwQZzTsLvEq68EiFwzMF-rfzBf7Ml14mKLYAjZL83lBs5jytyxwPnB3cIc7enSrg%3D%3D&q=Coulsy+Joinery+%26+Small+Build+Reviews&sa=X&ved=2ahUKEwjMvKXHvu6MAxU6k_0HHWzBLowQ0bkNegQIHxAD&biw=1920&bih=917&dpr=1",
};
