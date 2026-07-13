# Coulsy Joinery — Service & Information Architecture

**Status:** APPROVED. Partially implemented and deployed — see §12 (Release log).
**Date:** 13 July 2026
**Evidence base:** the repository, `AUDIT_2026-07-13.md`, and the Search Console exports in
`seo-data/` (12 months to 2026-04-18, and 3 months to 2026-07-11). Where a claim rests on
measurement, the number is given.

> **The repository is public.** Never record policy numbers, certificate numbers, or anything
> not already published on the live site.

---

## 0. The correction that shapes everything below

An earlier recommendation — mine, and the audit's — said that `joiner`, `carpenter`, `joinery`
and `general-joinery` were near-duplicate templates that should be merged. **That was wrong**,
and the architecture would have been badly damaged by acting on it.

The "96.6% overlap" figure was measured between `leeds-joiner` and `otley-joiner` — two *towns*
of the *same* service. It was then misapplied as an argument about *services*. Measuring the two
axes separately:

| Axis | Comparison | Body-copy overlap |
| --- | --- | --- |
| **Geo** (same service, different town) | `leeds-joiner` vs `otley-joiner` | **86.6%** |
| **Geo** | `leeds-kitchen-installers` vs `ripon-kitchen-installers` | **85.7%** |
| **Service** (different service, same town) | `leeds-joiner` vs `leeds-carpenter` | **16.8%** |
| **Service** | `leeds-joiner` vs `leeds-joinery` | **15.3%** |

The four service pages carry 57–65% wholly unique copy each. **They are not duplicate content.**

### 0.1 — Second correction: "deepen the town pages" was also wrong

The conclusion drawn from the above — *do not consolidate; deepen the town pages instead* — was then
tested by page-level comparison (see §8 P0(a)) and **also fails.**

`ilkley-joiner` (kept, 8 clicks / 590 impressions) and `york-joiner` (discarded, zero impressions)
are **equivalent**: 565 vs 566 words, identical images, headings, schema, FAQ entries and outbound
links. `ilkley-joiner` has **zero** inbound internal links; `york-joiner` has **56**. The page is not
the variable.

**The strongest evidenced factor in survival is which sibling won the town.** In all 16 towns sampled, one of
{joiner, carpenter, joinery, general-joinery} dominates and the other three are suppressed. These
pages are **distinct content competing for the same search intent** — and Google seats one page per
town per intent.

### 0.2 — The resulting position

| Question | Answer | Basis |
| --- | --- | --- |
| Are the 4 services duplicate content? | **No** | 16% body overlap; 57–65% unique copy |
| Do they compete for the same intent? | **Yes** | One winner per town, 16/16 towns |
| Will deepening the losing pages rescue them? | **No** | Losers are equivalent to winners; they lose to siblings, not on quality |
| Should they be consolidated? | **Partially — `carpenter` clearly; beyond that, model first** | 242 impressions, wins 1 town in 16 |
| Should the geo (town) strategy change? | **No** | It works: Leeds, Wetherby, Pocklington, Thirsk all convert |

Deepening town pages remains worthwhile for the **surviving** page in each town. It cannot rescue the
suppressed ones. Roughly **171 of the 228 pages** in this 4-service cluster are structurally
unseatable while all four exist.

---

## 1. Navigation philosophy

Three sets, deliberately different:

- **What we sell** → the visible navigation. Chosen by Robert, not by traffic.
- **What we can be found for** → the index and sitemap. Chosen by search demand.
- **What we no longer want** → still indexed if it holds authority, but never advertised.

A page's presence in the sitemap is a *discovery* signal. Its presence in the navigation is a
*sales* signal. Conflating the two is what produced the current inversion, in which
Heritage & Restoration — work Robert does not want — carries **1,035 inbound internal links**
(navbar + footer, i.e. every page on the site), while work he does want is buried.

Removing a page from navigation does not remove it from the site, from the index, or from the
sitemap. Those are four independent decisions.

---

## 2. Primary services — prominent in navigation

Chosen to reflect the work Robert wants to attract. **Requires his confirmation** — this list is
inferred from his stated constraints (no heritage marketing; no workshop fabrication; building
and maintenance work wanted), not from the traffic table.

| Service | Rationale |
| --- | --- |
| Fitted Kitchens | Core, high-value, strong existing demand (102 clicks / 16,450 impressions) |
| General Joinery | Core trade identity; distinct page, distinct demand |
| Small Build Services | Wanted work; extends the joinery proposition naturally |
| Building Maintenance | Wanted work; already integrated; commercial/repeat potential |
| Garden Offices | Wanted; on-site build work; no workshop required |
| Stud Wall Partitioning | Wanted; site carpentry |
| Traditional Cut Roofs | Genuine craft differentiator; hard skill few competitors hold |
| Joinery Subcontracting | Trade/commercial channel; different buyer, steady work |

**Deliberately excluded from primary navigation:** Heritage & Restoration (unwanted work),
Door Hanging (low-value work), Steel Fire Exit Doors (see §5).

---

## 3. Secondary services — on site, indexed, not in primary navigation

Reachable by contextual link and from the `/joinery-services` hub, but not given menu prominence.

| Service | Treatment |
| --- | --- |
| Truss Roof Installers | Keep indexed. Contextual link from Traditional Cut Roofs. |
| Accessible Kitchens | Keep indexed. Contextual link from Fitted Kitchens. Genuine niche. |
| Garden Rooms | Keep indexed. Overlaps Garden Offices; link between them. |
| Bespoke Joinery | **Keep, but rewrite.** Currently promises staircases, timber windows, garage doors and handmade furniture across 58 URLs. There is no workshop. Reframe as *fitted* joinery installed on site (alcove units, panelling, shelving, window seats). |
| Heritage & Restoration | **Keep indexed. Remove from navigation and homepage cards.** Do not delete, noindex or redirect — it holds real authority (92 clicks). Simply stop advertising it. Business decision, not an SEO one. |

---

## 4. Supporting SEO landing pages — acquisition, not navigation

Indexed, in the sitemap, contextually linked. **Not** in the primary menu. Their job is to catch
search demand, not to represent the sales proposition.

| Page | Evidence it earns its place |
| --- | --- |
| Joiner | 147 clicks; "joiner" terms = 12,028 impressions. Distinct copy (16% overlap with siblings). |
| Joinery | 50 clicks; "joinery" terms = 9,774 impressions. Distinct copy. |
| Carpenter | 49 clicks; "carpenter" terms = 4,163 impressions. Distinct copy. |
| Door Hanging | 158 clicks — but low-value work. Keep indexed; keep out of navigation; do not promote. |

**Recommended additions, evidence-led:**

| Proposed page | Evidence |
| --- | --- |
| **Window & Door Repairs** | 19 towns, **2,046 impressions, ZERO clicks** — no page exists. On-site repair work; no workshop needed. The strongest uncaptured demand on the site. |
| **Fencing, Gates & Decking** | 14 queries, **4,075 impressions, ZERO clicks**. Already ranks page 2 in three towns off a single image caption. On-site timber work. |

---

## 5. Fire doors — FROZEN, pending brand decision

**No changes are proposed and none have been made.**

The `door-hanging` template currently welds together two unrelated propositions:

- **plain internal door hanging** — low-value work Robert does not want;
- **fire doors and FireQual compliance** — legally mandated (Fire Safety (England) Regulations 2022:
  flat entrance doors annually, communal doors quarterly), recurring, and Robert is *certified* for it.

They share a URL. Any structural action on one affects the other. Additionally,
`steel-fire-exit-doors-installers` shows 23,849 impressions — but see §7: most of that is noise.

**Options, for later decision — not now:**

- **A.** If **Coulsy Fire Doors** becomes a real specialist business → Coulsy Joinery retains a single
  concise "Fire Doors" capability page that refers users to the specialist brand.
- **B.** If it never materialises → Coulsy Joinery keeps and develops the fire-door content, and the
  compliance/inspection angle becomes a genuine recurring-revenue line here.

**Do not restructure fire-door content until this is decided.** Acting early forecloses option A.

---

## 6. Future migration to other brands

| Work | Destination brand | Notes |
| --- | --- | --- |
| Fire doors, steel fire exit doors, fire-door inspection | **Coulsy Fire Doors** | Frozen — see §5. |
| Small callout work, window/door repairs, odd jobs | **Handyman** (personal, non-VAT sole trader) | Note: "handyman" draws **zero** impressions in the current data — but that is because no handyman content exists, so the site cannot appear. Absence of impressions is *not* evidence of absent demand. Size with keyword-tool data before building. |
| Extensions, structural work, full renovations | **Builder** | Coulsy Joinery legitimately keeps *small* build services as an extension of joinery; the Builder brand takes the larger projects. No cannibalisation. |
| ICWCI, clerk of works, quality consultancy, compliance inspection | **Professional Inspection / Consultancy** | ICWCI election effective **28 Aug 2026** — until then the site must not claim membership or the post-nominal. |

---

## 7. Traffic quality — read the data with care

The raw impression counts are materially inflated by non-commercial traffic:

| Segment | Clicks | Impressions | CTR |
| --- | --- | --- | --- |
| United Kingdom | 1,218 | 104,740 | 1.16% |
| **United States** | **1** | **19,474** | **0.01%** |

The "Ossett" cluster alone: **54 queries, 16,249 impressions, zero clicks — at positions 1.1–5.0.**
Ranking top-three with hundreds of impressions and *no clicks* is not human behaviour.

**Consequence:** `steel-fire-exit-doors-installers` looks like a 23,849-impression page. Strip the
noise and it is a 16-click page. **Do not make architecture decisions on impressions alone.**

Mobile converts at **1.52%** vs desktop **0.54%**, and mobile is **55% of clicks** (686 of 1,249).
Mobile conversion outranks almost every other consideration.

---

## 8. Technical SEO priorities

> **UPDATED 13 July 2026** after a fresh 3-month Search Console export. Two conclusions in the
> previous revision were overturned by current data. Both corrections are recorded below rather
> than quietly edited out.

### P0(a) — STRONGEST EVIDENCED HYPOTHESIS: intra-town service competition

**This supersedes the "thin content" hypothesis below.** A page-level A/B was run, as it should have
been before any conclusion was drawn.

**Test:** `ilkley-joiner` (kept — 8 clicks / 590 impressions) vs `york-joiner` (discarded — zero
impressions). Same template, same service.

| Attribute | ilkley-joiner (KEPT) | york-joiner (DISCARDED) |
| --- | --- | --- |
| Body words | 565 | 566 |
| Images | 8 | 8 |
| `<h2>` headings | 6 | 6 |
| Internal links out | 9 | 9 |
| JSON-LD blocks | 6 | 6 |
| FAQ schema entries | 4 | 4 |
| Town mentions | 7 | 7 |
| Canonical correct | yes | yes |
| **Inbound internal links** | **0** | **56** |

**The pages are equivalent. The page cannot be the explanation.**

Two hypotheses were tested and **refuted**:

1. **Weak internal linking** — refuted, and close to inverted. `ilkley-joiner` has **zero** inbound
   internal links and is the best-performing joiner page on the site; `york-joiner` has **56** and
   earns nothing. Across the cluster: pages *with* impressions average 10.4 inbound links, pages
   *without* average 5.1 — but the extremes contradict it outright.
2. **Thin content** — refuted as a *discriminator*. Both pages are equally thin (~565 words). One
   ranks perfectly well.

**Strongest evidenced hypothesis — intra-town service competition:**

| Town | joiner | carpenter | joinery | general-joinery | Google's pick |
| --- | --- | --- | --- | --- | --- |
| york | – | – | 324 | 344 | general-joinery |
| ilkley | **590** | 9 | – | 25 | joiner |
| harrogate | 462 | 9 | **1211** | 43 | joinery |
| knaresborough | – | **165** | 23 | 3 | carpenter |
| otley | – | – | 24 | **415** | general-joinery |
| thirsk | **211** | – | – | 81 | joiner |

*(impressions, 3-month window; "–" = absent from the report entirely)*

**In every town, one of the four dominates and the other three are suppressed.** Which one wins
varies arbitrarily — general-joinery takes 7 of 16 sampled towns, joiner 5, joinery 3, carpenter 1.

These pages are **not duplicate content** (16% body overlap — genuinely distinct text). They are
**overlapping search intent**, and Google resolves overlapping intent by seating one page per town.

**Consequence — and this is the important part:** 4 services × 57 towns = **228 pages, of which Google
will seat roughly one per town ≈ 57.** The other ~171 are structurally destined for "crawled – not
indexed" *regardless of how much local content is added to them.* They are not losing on quality;
they are losing to their own siblings.

**Therefore: deepening the geo pages would NOT fix this.** That recommendation (P0(b) below) is
withdrawn as the primary remedy. Page depth remains worthwhile for the *surviving* pages; it cannot
rescue the suppressed ones.

**Implication for consolidation (revisited, evidence-led):**

| Service | Impressions across sampled towns | Towns won |
| --- | --- | --- |
| general-joinery | **2,421** | 7 / 16 |
| joinery | 1,988 | 3 / 16 |
| joiner | 1,819 | 5 / 16 |
| carpenter | **242** | 1 / 16 |

- **`carpenter` is the clear merge candidate** — 242 impressions, wins one town in sixteen.
- **Do NOT reflexively consolidate into `joiner`.** It is the natural choice (Robert's identity; the
  largest head-term demand at 12,028 impressions) — but it is *not* the largest current earner.
  301-ing `general-joinery` into it would redirect the biggest performer into a smaller one.
- **4 → 2 is defensible on this evidence. 4 → 1 is not, yet.** A per-town model is needed before any
  redirect is written.

**Confidence:** high that the *pattern* holds (16/16 towns). The pattern is strong evidence for
intra-town competition as the mechanism, but remains an inference — not a confirmed cause. Moderate on the
correct consolidation target — that requires per-town modelling not yet done.

### P0(b) — Indexed-page count has fallen (observation; cause now attributed to P0(a))

Search Console currently reports approximately **129 fewer indexed pages** than previously
observed (452 -> 323), with a step change on a single day:

| Date | Not indexed | Indexed | Change |
| --- | --- | --- | --- |
| 2026-05-30 | 953 | 444 | +5 |
| 2026-06-12 | 955 | 426 | 0 |
| **2026-06-13** | **989** | **323** | **−103** |
| 2026-06-30 | 989 | 323 | 0 |

Corroborated independently: **"Crawled – currently not indexed" rose 342 → 485 (+143)**. Pages moved
from *indexed* to *crawled-and-rejected*.

**The last commit was 18 April 2026.** No deploy, no code change — so this is not a regression we
introduced. Intra-town service competition (P0(a)) is the strongest evidenced hypothesis,
established by page-level comparison. It is an inference from observed patterns, not something
Google has confirmed. Quality-classifier changes and crawl behaviour have not been ruled out.

**Caveat:** the count sits at exactly 989/323 for 17 consecutive days, which may indicate a stalled
report rather than a stable state. **Confirm in the live Indexing → Pages report before acting.**

**Consequence:** §P4 (geo-page depth) is no longer a "someday" item. It is the live wound. Traffic has
not yet fallen — 441 clicks this quarter, annualising above last year — but impressions follow the
index and clicks follow impressions, with a lag.

### P1 — `.html` duplicate URLs — DOWNGRADED to preventative maintenance

**Correction.** The previous revision called this the highest priority, based on the 12-month export
(346 clicks, 27.5% of click volume, on `.html` URLs). **That analysis was historical, not current.**
The 12-month window ran 2025-04-17 → 2026-04-16; it described a year that has largely passed.

Current 3-month data:

| Metric | April export (12 mo) | Current (3 mo) |
| --- | --- | --- |
| `.html` URLs ranking | 463 | **22** |
| `.html` clicks | 347 (27.5%) | **5 (~1.1%)** |
| `.html` impressions | 88,921 | **554** |
| "Alternative page with proper canonical" | 135 | **31** |

**Google has consolidated them on its own.** The only `.html` URL with meaningful traffic is
`castleford-bespoke-joinery.html` (5 clicks / 210 impressions).

The redirects remain **correct and worth doing** — the server behaviour is still structurally wrong,
and every *new* page is born with a duplicate twin — but this is now **preventative technical debt,
not an SEO recovery**. It should not jump ahead of business-facing work.

### P1 (original) — `.html` duplicate URLs: the underlying defect (unchanged)

Every geo page is served at **two URLs, both returning HTTP 200**:

```
/joinery-services/leeds-joiner          -> 200
/joinery-services/leeds-joiner.html     -> 200   (duplicate)
/about.html                             -> 301   (correctly redirected)
```

The current build emits **no** `.html` files (`build.format` defaults to `directory`), but Netlify
still resolves `/foo.html` to `/foo/index.html`. `public/_redirects` handles only **7** top-level
paths; the ~1,027 service pages are unhandled.

Search Console shows **463 `.html` URLs carrying 88,921 impressions and 347 clicks — 27% of all
click volume** — on URLs Google is progressively deprecating in favour of the canonical.

Canonicals *are* correct and self-referencing, which is why 135 are already marked "alternative page
with proper canonical". Canonicalisation is a hint; a 301 is an instruction.

**Fix:** generate `/joinery-services/*.html → /joinery-services/*` 301s into `_redirects` at build
time from `LOCATIONS × SERVICES`. Netlify's splat cannot suffix-match, so they must be enumerated —
generated, never hand-written.
**Risk:** must not touch `/_astro/` asset paths, or every image gains a redirect hop.

### P2 — Qualifications page is `noindex`

`src/pages/about/qualifications.astro:55` sets `noindex={true}`, and `astro.config.mjs` excludes it
from the sitemap ("trust signals, not enquiry drivers"). Same for `/about/compliance` and
`/about/sustainability`.

This page carries City & Guilds, NVQ Level 7, CSCS, CITB, GQA, FireQual — and now ICWCI. It is the
entire experience-and-expertise case, and Google is forbidden from seeing it. It is also the target
of the 399 internal links just repaired.

**Recommend making it indexable and adding it to the sitemap.** Low risk, real gain.

### P3 — Dead robots & sitemap implementations

Three sources for one `robots.txt`:

| Source | Status |
| --- | --- |
| `public/robots.txt` | Ships |
| `src/pages/robots.txt.ts` | Identical output — dead |
| `astro-robots-txt` (dependency) | Installed, never added to `integrations` — dead |

Plus `src/pages/sitemap-index.xml.ts` — 153 lines, silently overwritten by `@astrojs/sitemap`, and
*wrong* (it omits door-hanging). If anyone ever "fixes" the collision by trusting it, 57 pages drop
out of the sitemap.

All three produce `Allow: /`, so removal is behaviour-neutral. **Only remove once verified byte-identical.**

### P4 — Geo-page thinness (the real duplication)

86% overlap between town variants of the same service; ~500 words of body copy each. **604 of 1,031
pages are "crawled/discovered — not indexed."** This is the cause.

**Do not solve this by cutting towns** — only 5 of 56 earned zero clicks; Leeds pulls 132, Wetherby 98,
Pocklington 66. The geo strategy works. Solve it by giving each town page at least one genuinely
local paragraph: a real job done there, the postcode area, local building stock.

If that cannot be written for 500+ pages, reduce the *town* list to those that convert and write real
content for them — but that is a last resort, not a first move.

---

## 9. Risks of consolidation

| Risk | Assessment |
| --- | --- |
| **Merging joiner/carpenter/joinery/general-joinery** | **Do not.** 16% content overlap, distinct demand. Merging destroys four working, differentiated pages and forfeits ~374 clicks. This was the earlier error. |
| Merging garden-rooms → garden-offices | Plausible (they overlap heavily). Low value either way. Defer. |
| Merging truss-roofs → cut-roofs | Plausible. Both are real skills with distinct demand. Defer. |
| Retiring door-hanging | Blocked on the fire-door brand decision (§5). Premature action forecloses options. |
| Any 301 consolidation | Every merge permanently forfeits the merged page's independent ranking. 301s pass most, not all, authority. Reversible only at further cost. |

**Principle:** consolidation is irreversible in practice. Differentiation is not. Prefer
differentiating a page over merging it, unless the page is genuinely duplicative.

---

## 10. Implementation status

**Revised 13 July 2026** in light of the 3-month export (see §8 P0/P1).
Items marked **DONE** are deployed — see §12.

| # | Item | Status |
| --- | --- | --- |
| — | Remove dead `coulsycontractsolutions.co.uk` link (was on all 1,035 pages) | ✅ **DONE** |
| — | Fix 399 dead `/qualifications` links across 342 pages | ✅ **DONE** |
| — | Anchor experience claims to 1988 (were "30+" / "35+" / "since 1989") | ✅ **DONE** |
| — | Remove `aggregateRating` from 1,027 pages that render no reviews | ✅ **DONE** |
| — | Remove unevidenced "35+ years fire safety experience" (58 pages) | ✅ **DONE** |
| — | Mobile phone CTA on homepage (had none between `<main>` and `<footer>`) | ✅ **DONE** |
| 3 | Make `/about/qualifications` indexable + add to sitemap | ✅ **DONE** |
| 4 | Remove Heritage from navbar + homepage cards (page kept indexed) | ✅ **DONE** |
| — | Service-page hero: evidence panel, portrait, dual CTA, badge removed | ✅ **DONE** |
| — | Correct the false **£10m public liability** claim; state real cover | ✅ **DONE** |
| 1 | **Confirm the 103-page de-indexing is real** (live GSC, Indexing → Pages) | ⏳ Robert — 30 seconds |
| 2 | **Deepen geo pages with genuine local content** | ⏳ Strategy decision |
| 5 | Rewrite Bespoke Joinery for no-workshop reality | ⏳ Not started |
| 6 | New page: Window & Door Repairs (live demand, 0 clicks) | ⏳ Robert's confirmation |
| 7 | New page: Fencing, Gates & Decking (~1,300 impressions, 0 clicks) | ⏳ Robert's confirmation |
| 8 | Delete dead robots/sitemap sources (behaviour-neutral) | ⏳ Not started |
| 9 | `.html` → clean-URL 301s — **preventative debt, not urgent** | ⏳ Not started |
| — | Heritage signals audit (359 FAQ schema instances) — see §10a | ⏳ Not started |
| — | Supplier logos: order, and Howarth Timber asset | ⏳ Not started |
| — | Review snippets; singular headings; `OptimizedImage` debt; homepage 3×`<h1>` | ⏳ Not started |
| 10 | Fire-door restructuring | 🔒 **FROZEN** — brand decision |
| 11 | Service consolidation | ❌ **NOT RECOMMENDED** (§9) |

---

## 10a. DEFERRED — heritage signals audit (bounded slice, not yet authorised)

Heritage has been demoted from the navbar and homepage cards. The **machine-readable** heritage
signals were deliberately **left untouched**, because demoting a service from primary promotion is
not the same as erasing every reference to period-property capability.

Outstanding, for a separate bounded investigation:

| Signal | Instances | Source |
| --- | --- | --- |
| Geo keyword references ("heritage restoration {town}") | **1,027** | `pageMeta.ts:289` |
| Period-property FAQ in **structured data** | **359** | `pageMeta.ts:451` |
| Geo meta descriptions ("heritage repairs") | **267** | `pageMeta.ts:275, 282` |
| Homepage meta description / keywords / schema | 2+ | `MainPage.astro:52, 54, 63` |
| Sitewide default keywords | 1 | `Layout.astro:32` |

That investigation must classify each instance as one of:

1. **legitimate capability statement** — Robert *can* do sympathetic timber repair; saying so is honest;
2. **stale template residue** — boilerplate that no longer reflects the business;
3. **active promotion of unwanted work** — soliciting the heritage leads he does not want;
4. **structured data that does not match visible page content** — the most serious category.

The **359 FAQ structured-data instances are the priority.** Structured data must reflect content
actually visible on the page and services genuinely offered. A FAQ answer inviting period-property
enquiries, injected into the schema of pages that are not heritage pages, fails that test.

**Do not perform a global search-and-replace.** Each category needs a different remedy.

---

## 11. Open questions for Robert

1. **Confirm the primary service list** in §2. It is inferred, not stated. **The Services
   navigation is deliberately unchanged pending this** — it is not an oversight.
2. **Coulsy Fire Doors** — real, or not? Everything in §5 waits on this.
3. **Window & Door Repairs / Fencing** — do you want this work? Both are on-site, no workshop,
   and both have live demand you currently earn nothing from.
4. **Howarth Timber logo** — not in the repository. Needed for the supplier slice.

*(Resolved: the qualifications page was hidden from Google as an index-bloat measure that
overshot. It is now indexable — it carries the entire experience-and-expertise case.)*

---

## 12. Release log

### 2026-07-13 — deployed to production (`cc5e794` → `570f27d`)

Four commits, pushed to `origin/main`, auto-built by Netlify and **verified live** by polling
production until it served the new build (not assumed from a successful push).

| Commit | What |
| --- | --- |
| `cc5e794` | Stale claims, dead links, invalid schema, mobile CTA, qualifications indexing, heritage demotion |
| `33d7c07` | This document, `AUDIT_2026-07-13.md`, and a rewritten `README.md` |
| `6f8d5bd` | Service-page hero: two-column layout, evidence panel, portrait, dual CTA, badge removed |
| `570f27d` | Insurance wording — see below |

**Verified in production:** `astro check` 0 errors / 0 warnings · 1,035 pages · 84,994 internal
links, 0 broken · 10 live URLs all HTTP 200.

#### The most important thing in this release

**The site was advertising insurance it does not hold.** `/about/compliance` claimed
**"£10 million Public Liability Insurance"**. The actual cover is **£5m**. The £10m figure was
introduced by an unattributed commit (`8e209eb`, *"minor changes"*) with no evidence behind it,
and had been live ever since.

It was found only because the new hero evidence panel required every claim to be *verifiable* —
and the verification failed. **The correct response to an unverifiable claim is to stop, not to
pick the more flattering number.** The release was deliberately blocked until the owner supplied
the policy figures.

Correct cover is now stated on the site, with the three limits kept separate. See `README.md`
→ *Facts that must stay accurate*. **Never collapse them into a single figure.**

#### Also worth knowing

- **The live site sits behind Cloudflare**, which rewrites every `mailto:` to
  `/cdn-cgi/l/email-protection#…` and decodes it with JavaScript on click. This predates the
  release. Consequence: **the email link depends on JS**; the phone link and the enquiry form
  do not. Not a defect, but don't be surprised by it when diffing production against `dist/`.
- **Deployment is Netlify auto-build on push to `origin/main`.** There is no `netlify.toml`;
  the only GitHub workflow (`_studio.yml`) is an Astro Studio DB job and does **not** deploy.
  Build configuration lives in the Netlify dashboard.
- The `data-deploy` attribute on `<body>` is a stale marker from an April deploy and is **not**
  a reliable way to tell which build is live. Poll for actual content instead.
