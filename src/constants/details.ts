/**
 * MARKETING contact details — safe for any public component to import.
 *
 * The statutory company information (registered name, number, registered office, VAT number)
 * deliberately does NOT live here. It is in `src/constants/company.ts` and is imported by
 * exactly ONE page. See the note in that file.
 */
export const DETAILS = {
  PHONE: "07544 030486",
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
