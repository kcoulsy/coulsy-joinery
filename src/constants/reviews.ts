/**
 * Google reviews for Coulsy Joinery & Small Build.
 *
 * SINGLE SOURCE OF TRUTH. `Reviews.astro` renders these and `MainPage.astro`
 * derives its AggregateRating schema from them, so the count Google is told can
 * never disagree with the reviews actually on the page. Add a review here and
 * both update together.
 *
 * RULES:
 *
 * 1. `text` is VERBATIM. These are named people's words. Do not paraphrase,
 *    tidy, or "improve" them — three reviews previously carried invented
 *    sentences, including one Sophie Vohra never wrote. Copy and paste from the
 *    Google Business Profile; keep their typos ("Cousy", "unforseen").
 * 2. NO DATES. The old list stored strings like "a month ago", which were true
 *    the day they were typed and rotted from then on — a review from September
 *    2025 was still telling visitors it was "a month ago" in July 2026. If you
 *    ever add dates back, store an absolute date, never a relative phrase.
 * 3. `rating` drives the schema. Do not hardcode a rating value anywhere else.
 *
 * Source: https://search.google.com/local/reviews?placeid=ChIJFREqq2Poe0gRFoS-2A2H_cg
 * Last reconciled against Google: 13 July 2026 — 12 reviews, all five stars.
 */

export interface Review {
  /**
   * Display name EXACTLY as Google shows it — including lower-case first
   * letters ("graeme ian kynman", "edris mahmud", "Kim hosking") and run-together
   * names ("MartinS"). Do not title-case or tidy these. Capitalisation is still
   * an alteration to something attributed to a real person.
   */
  author: string;
  rating: number;
  /** Verbatim. See rule 1 above. */
  text: string;
}

/** Newest first, matching the order Google presents them. */
export const REVIEWS: Review[] = [
  {
    author: "Barbara",
    rating: 5,
    text: "If I could give more than 5 stars I would! Robert was incredibly helpful and knowledgeable, and was able to replace my old terrible fire door and make it compliant quickly and efficiently (which was not easy thanks to the very non-compliant state it was in to start with). All work was done to the highest standard, fast, competitively priced and with great communication. Plus he helped with an unforseen follow-up due to new floors which was above and beyond. Thank you so much!",
  },
  {
    author: "Sally Gerrand-Jones",
    rating: 5,
    text: "I contacted Robert to survey the fire door of my York apartment. As a result of the survey, a new fire door was fitted. Both the survey and the subsequent door fitting were carried out to the highest standard and attention to detail. Thank you for all your help and advice Robert. I could not have found anyone better to carry out the work.",
  },
  {
    author: "Sales UK",
    rating: 5,
    text: "You read so many bad reviews about builders but I am delighted to say Cousy Joinery is not one of them. From the outset Robert was open, explained everything in detail, polite, extremely tidy, punctual - in fact everything you want a tradesperson should be. I would have absolutely no hesitation in recommending them for any work you need doing.",
  },
  {
    author: "MartinS",
    rating: 5,
    text: "Mr Coulson gave careful and precise work professionally and was personally very easy to deal with. I would certainly employ him again for any future joinery needs.",
  },
  {
    author: "Kim hosking",
    rating: 5,
    text: "Had a fire survey done on my apartment door by a previous company and no one could make head nor tail of it. I hired in Rob and he was friendly, knowledgeable and gave a full, clear breakdown of everything and the changes that needed to be made. Thank you so much!",
  },
  {
    author: "Donna Cresdee",
    rating: 5,
    text: "We have been extremely pleased with the professionalism shown by Robert, and the quality of our new fire door. A very quick response and delivery, would highly recommend.",
  },
  {
    author: "Luisa D",
    rating: 5,
    text: "We would strongly recommend Coulsy Ltd for anyone looking for good-quality joinery work. We used Robert and Debbie for the installation of an external fire door. Their pre-installation advice was excellent. We are delighted with the installation of the door. It was fitted with real skill and precision, they take real thought in not just getting it functionally spot-on but aesthetically too. They also left the place tidier than before they started the work. We're sorry we didn't know of this company sooner as we would have used them for other aspects of our project. However, I will be certainly getting in touch with them for any future work.",
  },
  {
    author: "Sophie Vohra",
    rating: 5,
    text: "I contracted Debbie and Robert to carry out fire safety repairs on my apartment door, following a request by the management company/freeholders. From start to finish they were a dream. They carried out their own survey, which flagged other key aspects that needed addressing, which the one the management company carried out clearly missed. They were punctual, well prepared with all the materials they'd need, and kept in contact every step of the way. For works that turned out to be a whole-day job, they worked efficiently and I can't believe how much they got done in that time, all to an amazing standard. I felt I was in very safe hands throughout the whole process, and I'm very glad to have had such an excellent team tackle the job while keeping me content and informed throughout.",
  },
  {
    author: "Richard Hand",
    rating: 5,
    text: "Amazing quality and attention to detail. No challenge too great.",
  },
  {
    author: "graeme ian kynman",
    rating: 5,
    // Ends with his own signature, "graeme kynman". It is part of what he published,
    // so it stays. Redundancy is not a licence to edit a customer's words.
    text: "I can testify that the joinery work rob produced for me was of an extremely high quality and would highly recommend him. If you have the chance to use him for a project you have do not hesitate because his quality work does not come along very often graeme kynman",
  },
  {
    author: "edris mahmud",
    rating: 5,
    text: "Carried out a fire door installation for us. Very fast and great installation done. Strongly recommend.",
  },
  {
    author: "Jean Putwain",
    rating: 5,
    text: "Dementia Care Home - replacement of Joists and Floor. Highly recommend Coulsy Joinery, excellent workmanship and professional company, cleaned up all debris. Would definitely use again. Thank you.",
  },
];

/** Total reviews. Derived — never hardcode this number anywhere. */
export const REVIEW_COUNT = REVIEWS.length;

/** Mean rating to one decimal place, e.g. "5.0". Derived — never hardcode it. */
export const AVERAGE_RATING = (
  REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
).toFixed(1);
