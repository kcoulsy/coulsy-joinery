# Handover — start here

**Last updated:** 13 July 2026
**Read after:** `README.md`. Then `ARCHITECTURE.md` for strategy, `AUDIT_2026-07-13.md` for the audit record.

> This repository has **no `docs/` directory** and no `00_START_HERE.md` / `01_PROJECT_STATUS.md`.
> If a prompt tells you to read those, it is describing a different project. The canonical set is:
> **`README.md` → `HANDOVER.md` (this file) → `ARCHITECTURE.md` → `AUDIT_2026-07-13.md`.**

---

## 1. Verified release state

| | |
| --- | --- |
| **Last code change** | `bcbbb39` (UK English) / `3a32185` (fire door hand-off, §1c). Docs commits may sit on top. |
| **Branch** | `main` |
| **local main / origin/main** | **synchronised** — 0 ahead, 0 behind |
| **Working tree** | **clean** |
| **Production** | **deployed and verified serving** |

**Deployment method:** Netlify auto-build on push to `origin/main`. There is **no `netlify.toml`**;
the only GitHub workflow (`_studio.yml`) is an Astro Studio DB job and does **not** deploy. Build
config lives in the Netlify dashboard.

**Do not trust the `data-deploy` attribute on `<body>`** — it is a stale marker from an April deploy
and cannot identify the live build. **Poll for actual content instead.**

### Production checks used to verify this release

Verified against `https://coulsyjoinery.co.uk`:

- `/joinery-services/kitchen-installers` (hub) — **200**
- `/joinery-services/leeds-kitchen-installers` (geo) — **200**
- `/joinery-services/harrogate-kitchen-installers` (geo) — **200**
- `/`, `/sitemap-index.xml`, `/sitemap-0.xml` — **200**; sitemap serving **1,032 URLs**
- On all three kitchen pages: **Howdens = 0, Magnet = 0, logo images = 0**, new card **present**
- Supplier-neutral hero copy present; revised gallery alt text present
- Sampled `/_astro/` image assets all **200** — no broken references

---

## 1a. P0 — mobile navigation was dead for ~3 months (`58ef9d6`, fixed 13 July 2026)

**The mobile menu accepted no taps in production from 18 April to 13 July 2026.** It opened,
but the chevrons would not expand the service dropdowns, links would not navigate, and neither
the menu nor the page would scroll while it was open. Mobile is **55% of all clicks.**

**Root cause — one inverted boolean in `Navbar.astro`.** `toggleMenu()` derived the open state
from `menu.classList.contains("-translate-y-full")`. That class slides the menu **off-screen**,
so it is present when the menu is **CLOSED**. The boolean was therefore inverted, and every
consumer of it ran backwards: `aria-expanded`, both `aria-hidden` attributes, focus management,
and — decisively — **`inert`**.

**Tapping the burger slid the menu into view and simultaneously marked the now-visible menu
`inert`.** An inert subtree is not hit-testable, so taps fell straight through to
`#mobile-nav-overlay` behind it, whose handler closed the menu. That is why it read as "the menu
does nothing". The burger kept working only because it sits **outside** the menu.

**The fix is one line** — negate the producer, so `isOpen` means "was open when the toggle fired",
which is what all five consumers already assumed:

```js
const isOpen = !menu?.classList.contains("-translate-y-full");
```

### Why it survived three months

- **Desktop was never affected.** The defect is invisible to desktop testing.
- **`astro check` and the build were clean throughout.** This is a logic inversion, not a type
  error. A green build proves nothing here.
- It shipped in `dd3f73f` — *"Housekeeping: SEO variation, perf cleanup, a11y to 100"* — the pass
  that **introduced `inert`**. An accessibility improvement broke the thing it was improving.
- **Astro was not the cause.** We were on 5.15.3 (latest is 7.x); the shipped bundle matched the
  source line-for-line. The upgrade is unrelated backlog — do not conflate the two.

### It was copied into the fire-doors site too

`kcoulsy/fire-doors` carries the **identical** inverted boolean, introduced by its own
`d30190e` — *"SEO + perf + a11y cleanup mirroring joinery site work"*. Both live sites were
broken by the same copy-pasted defect. **These two repositories share navigation and
accessibility code by copy-paste: a defect in one is a defect in both. Always check the sibling.**

### Standing rule

> **Any shared accessibility or navigation change must be exercised in a real mobile browser
> before release.** Tap the burger, tap a chevron, follow a link, scroll the open menu, close it,
> confirm the page scrolls again. `inert`, `overflow-hidden` scroll locks, `pointer-events` and
> z-index/overlay stacking are all invisible to a type-check, to a clean build, and to desktop.

Live verification used on 13 July 2026 (all passed against `https://coulsyjoinery.co.uk` at an
iPhone 13 viewport): menu opens with `inert` cleared and ARIA correct; a hit-test at a menu
link's centre resolves to the menu and not the scrim; chevron expands the 14-link Services
dropdown; the open menu scrolls its overflow; a menu link navigates; the close button closes,
re-arms `inert` and restores page scrolling; desktop nav, hover dropdown and scrolling
unaffected; zero console errors.

---

## 1b. Customer reviews — the site was misquoting real people (`3529367`, 13 July 2026)

**This is the third false-claim class found on this site, and the worst of them.** The first two
(£10m public liability, "35+ years of fire safety experience") were claims about *us*. **This one
put words into named customers' mouths.**

Three reviews carried wording the reviewer never wrote:

| Reviewer | Was on the site | What they actually published |
| --- | --- | --- |
| Sales UK | "everything you want **a builder to be**" | "everything you want **a tradesperson should be**" |
| Luisa D | "delighted with **the result**" | "delighted with **the installation of the door**" |
| Sophie Vohra | "**Thorough, professional, and kept us informed every step of the way**" | **She never wrote this sentence.** |

Two more were silently truncated, and **two reviews were missing entirely** (Barbara, Richard Hand).
The homepage schema claimed **10** reviews while **12** were live.

### The rules now in force — see `src/constants/reviews.ts`

- **`text` is VERBATIM.** No paraphrasing, no tidying, no shortening. Keep the customers' own typos
  ("Cousy", "unforseen") and Graeme Kynman's trailing signature. **Redundancy is not a licence to
  edit a customer's words.**
- **Names are EXACTLY as Google displays them** — including lower-case (`Kim hosking`,
  `graeme ian kynman`, `edris mahmud`) and run-together names (`MartinS`).
  **Capitalisation is an alteration too.** Do not normalise.
- **ONE SOURCE OF TRUTH.** The list previously existed **twice** inside `Reviews.astro` — the second
  copy sat in a dead `!useHardcoded` branch that nothing invoked and no page loaded. **That
  duplication is how the copies drifted apart.** Both it and the broken Google Places fetch it
  wrapped are gone.
- **NO DATES.** The old list stored relative phrases ("a month ago") that were true the day they
  were typed and rotted from then on — a September 2025 review still told visitors it was
  "a month ago" in July 2026. **A date that rots is worse than no date.** If dates ever return,
  store absolute ones.

### Self-serving review schema — removed, deliberately. Do not add it back.

`aggregateRating` sat on our **own** `LocalBusiness` entity. **Google has not shown review rich
results for self-serving LocalBusiness/Organization markup since 2019**, so it was **ineligible** —
it could never have earned a star snippet, whatever the values said. Removing it forfeits nothing:
the stars Coulsy shows in Maps and the local pack come from the **Google Business Profile**, which
this markup does not feed.

`cc5e794` stripped the same markup from 1,027 service pages for the adjacent rule (the rated
reviews must be present on the page) but **missed the homepage**. This completes it. Sitewide there
are now **0** `aggregateRating`, `ratingValue`, `reviewCount` and `Review` nodes. **Normal
`LocalBusiness` schema is retained on 1,028 pages.**

**The human-facing evidence stays, and is derived:** the homepage shows
**"★★★★★ 5.0 out of 5 (12 reviews on Google)"**, computed from the array — so the number shown can
never again disagree with the reviews on the page.

### Deferred — do not guess it

**The Google Business Profile URL is still outstanding** and is **not** in `sameAs` (the business
schema currently has no `sameAs` at all). **Do not invent or derive one.** Add it only when Robert
supplies the verified profile URL.

---

## 1c. Fire door hand-off — Joinery is not a fire door compliance site (`3a32185`, 14 July 2026)

**Full architecture: `ARCHITECTURE.md` §5 and §5a. Read those before touching anything cross-site.**

### The defect

**The joinery site was advertising fire door inspections on 57 pages — "Book a Fire Door
Inspection" — and routing every one of those leads to its own `/contact` form.**
`coulsyfiredoors.co.uk`, the site built for exactly that work, received **nothing: zero links, zero
referrals.**

That is not an SEO problem. It is a **lead leak** — the most valuable, credential-gated, legally
compelled work Robert does was being captured by the wrong brand and dropped into a general joinery
enquiry form.

### What shipped

- **The CTA is now a contextual hand-off** to `coulsyfiredoors.co.uk/fire-door-inspectors`, rendered
  by `SpecialistHandoff.astro` at the foot of the door-hanging pages — the moment a reader who has
  just learned how fire doors fail may realise they need an *inspection*, not a *joiner*.
- **`src/constants/specialists.ts`** — the single source of truth for every cross-site link.
  **One entry. No forward references. No hardcoded domains anywhere else.** See `ARCHITECTURE.md`
  §5.4 for why this is not over-engineering.
- **Three uncited statistics removed** — "75% fire door failures found in inspections", "6,500
  workplace fires annually", "11 minutes average fire service response time". Presented as fact,
  animated for emphasis, **with no source anywhere in the repository.** This site has already had to
  remove an unevidenced "35+ years of fire safety experience" claim. **An uncited number is a claim
  we cannot stand behind.**
- **The FireQual credential card stays.** It is true, it is Robert's, and it evidences that the
  person hanging the door knows what a compliant one looks like.
- **RRO 2005 removed from the standards list**; Approved Document B and BS 8214 kept. The Regulatory
  Reform Order governs the **Responsible Person's ongoing duty to inspect** — Fire Doors'
  proposition. AD B and BS 8214 govern **how a door must be fitted** — which is the service the page
  actually sells. The split is the boundary in miniature.
- **"our qualified fire door inspectors" → singular.** There is no team.
- **Dead `/about#qualifications` link fixed** on all 57 pages — no such anchor exists. `cc5e794`
  fixed 399 dead qualification links and missed this one.

### The rule this establishes

> **Coulsy Joinery remains a complete, truthful joinery business — never a portal.** It hands a
> visitor over **only** where their need genuinely exceeds its discipline, and it says so plainly
> when it does. It does not scatter links to sibling businesses, and it does not carry a footer
> directory of them.

---

## 2. Supplier slice — shipped (`42537a2`)

- **Howdens, Magnet and DIY Kitchens logos removed** from the kitchens card. **No supplier logos
  remain anywhere on the site.** The three source assets (296 KB) were deleted.
- Howdens and Magnet were **also** named outside the logo card — in the **service hero description**
  (all 57 kitchen pages) and a **gallery alt text**. Both corrected. Removing only the images would
  have missed them.
- **The logo-related CLS source is eliminated, not patched.** All three declared
  `width=100 height=40`, but DIY Kitchens is genuinely square (448×448, shipped 100×100), so the
  browser reserved the wrong box and the row shifted on load. The images are gone.
- Replacement card presents **standard *and* made-to-measure** kitchen capability, stays
  supplier-neutral, and **never claims in-house cabinet manufacture**.

**Why they were removed:** Howdens and Magnet had been advertised for **years** after Robert stopped
using them, drawing 159 impressions and **zero clicks** for suppliers he no longer works with. DIY
Kitchens earned no impressions at all. **Logos rot.** Prefer text.

**One file drives 57 pages:** `[location]-kitchen-installers.astro` imports
`kitchen-installers.astro` as a component. This pattern applies to every service.

---

## 3. Verified capability model — **"specified, sourced and installed"**

**This is the most important fact on the site. It has been stated wrongly in both directions.**

Robert **surveys, plans, specifies, sources, adapts and installs.** Made-to-measure cabinets and
doors are **sourced from specialist manufacturers**.

| Wording | Accurate? |
| --- | --- |
| "manufactured by Coulsy Joinery" / owned-workshop implication | ❌ **No.** There is no workshop. |
| "made to measure" | ✅ **Yes** — the products are *sourced*, not made in-house. |
| "fitted" alone | ⚠️ True, but **undersells it** — reduces the service to labour. |
| **"specified, sourced and installed"** | ✅ **Use this.** |

**The differentiator is the specification and sourcing** — neither the manufacture nor the labour.
Full rules: `ARCHITECTURE.md` §2a. Reference implementation:
`src/pages/joinery-services/kitchen-installers.astro`.

---

## 4. Handyman / property-maintenance — verified gap (`ARCHITECTURE.md` §6c)

**Verified from the repository and Search Console, not inferred.**

- **No dedicated Handyman route, hub, alias or geo-page family exists.**
- **"handyman" appears ZERO times** across all 1,035 built pages. So do "odd job", "call out",
  "letting agent" and "property manager".
- `building-maintenance` **does** exist: hub + **56 geo pages**, and it sits **4th in the desktop and
  mobile navigation — already above both roof services**, with 1,035 inbound internal links.
- **So this is NOT a menu-position defect.** It is a **content and naming gap.**
- The existing content is framed around **commercial facilities management**
  (`TITLE: … | Commercial Building Maintenance & Facilities Management`) and does **not** meaningfully
  target handyman, property repairs, callouts, letting agents or property managers.
- **The cost:** `building-maintenance` earns **3 clicks**. Meanwhile 34 repair queries draw
  **2,887 impressions and ZERO clicks** — nineteen towns of `window repairs [town]` ranking at
  positions 14–54 and converting nothing.

**Recorded future work (§6c, not started):** consider repositioning the **existing**
`/joinery-services/building-maintenance` route **in place**, around a broader **property repairs and
building maintenance** proposition.

> ⚠️ **Do NOT create a competing Handyman or Property Maintenance geo-page family** without first
> resolving cannibalisation risk. Two maintenance services competing in the same town is precisely
> the intra-town competition described in `ARCHITECTURE.md` §8 P0(a), which is the strongest
> evidenced cause of the current de-indexing. **Adding one would make things worse.**

The future proposition must stay relevant to **domestic** customers **and** commercial/repeat clients
— estate agents, letting agents, landlords, property managers.

### Scope note on the earlier navigation investigation

The services-navigation investigation established only that the **then-current navigation matched the
configured hierarchy**. It did **not** establish that every commercially important service had a
dedicated page or menu item. **The Handyman / property-repairs discovery is a separate content and
service-architecture gap.**

---

## 5. Future dedicated handyman site

This repository **may be reused as the architectural template** for a dedicated handyman, repairs and
property-maintenance website (`ARCHITECTURE.md` §6a).

- Likely **primarily domestic — but must NOT be framed as domestic-only.**
- **It may continue to operate through Coulsy Ltd.**
- **Legal entity, VAT, insurance, branding and service scope are OWNER DECISIONS. Do not invent,
  assume or record them.**
- **Reuse:** the Astro structure, the locations engine, the SEO patterns and appropriate shared
  components.
- **Do not reuse:** the existing service catalogue, or any unverified business claim.

**Template-safety rule: verify, never inherit.** This site shipped a **false £10m public liability
claim** for years. Templating is exactly how such an error propagates into a second site.

---

## 5a. Dependencies — where we are, and why we stopped where we did

**Astro 5.18.2** (was 5.15.3, updated 13 July 2026, `40b0a74`). Also on that slice:
`@astrojs/sitemap` 3.7.3, `@astrojs/check` 0.9.9, `sass` 1.101.0, `tailwindcss` 3.4.19,
`typescript` 5.9.3. **Lockfile-only** — the declared `^` ranges already permitted all of it, so
`package.json` was not touched.

**Advisories: 23 → 3.** Every advisory with a fix inside the 5.x line is cleared.

### Why we did NOT go to Astro 6 or 7

**`@astrojs/tailwind@6.0.2` is the latest, and it peers `astro ^3 || ^4 || ^5`. It does not
support Astro 6+.** So crossing that major is not an Astro upgrade — it forces a **Tailwind 3 → 4
migration**: CSS-first `@theme` config, `tailwind.config.mjs` deleted, the `brand-*` palette
re-declared, and utility-level breaking changes across ~50 components and 1,035 pages whose entire
visual layer is utility classes. That is the real cost, and it is much larger than the version
numbers suggest. Astro 7.0.0 is also very young (22 June 2026; 7.0.8 landed three weeks later).

### The 3 remaining advisories are not reachable here — but that argument has a limit

This site is **pure static**: no adapter, no `output` mode, no `define:vars`, no `searchParams` or
`Astro.request`, no server islands. **No Astro server runs in production** — Netlify serves flat
HTML. The residual Astro items each need a running server or a template feature the site does not
use, and none have a 5.x fix (they land in 6.x). The `esbuild` item is a dev-server file read on
Windows; we are on macOS.

> ⚠️ **That whole argument rests on "static, no adapter."** The day anything becomes
> server-rendered — a real contact-form endpoint, live reviews — **the calculus flips and Astro 6+
> becomes a security requirement, Tailwind migration and all.** Re-run `npm audit` and re-read this
> section before adding any SSR.

---

## 6. Outstanding work — none started

| Item | Reference |
| --- | --- |
| **⭐ Record where every enquiry ACTUALLY came from. Highest-value item on this list, and it is not a code task.** After 6–12 months this answers the questions that decide where to invest: *is Fire Doors generating its own work? Is Joinery mainly serving existing customers? Does the Google Business Profile outperform the website? Are referrals still the strongest channel?* Log every job: client, source (referral / Google search / Google Business Profile / website / existing contact), and detail. **Nothing on this website is worth as much as knowing this.** Everything shipped in July 2026 was done WITHOUT it. | §1d |
| **Search Console exports — joinery AND fire doors.** 3 months, UK, **judge on clicks, not impressions.** Blocks the geo-page family review (§8 P0(a)), the 324 orphans (§8b), and the fire-doors 4-family consolidation. Until this lands, every conclusion about synonym pages, orphans, geo pages and internal linking is an educated guess. | `ARCHITECTURE.md` §8, §8b |
| **324 pages unreachable from the homepage — INVESTIGATED, not started.** A BFS crawl of the built site reaches **711 of 1,036** pages; the rest exist, build, are in the sitemap and return 200, but **no chain of internal links reaches them** (~18 towns per family). `door-hanging` — the extreme case, all 57 pages orphaned — was fixed in `8ddb478`. **Do NOT record the fixed-base distance calculation as a defect: proximity to Robert's base is genuinely relevant.** The real questions are why 37 of 56 towns fall back to one hardcoded 8-town list, and whether every geo page needs a deliberate route in rather than being linked by side-effect. | `ARCHITECTURE.md` §8b |
| **🔒 Structured data — the site declares 1,026 businesses that do not exist. INVESTIGATED, NOT FIXED.** `pageMeta.ts:327` substitutes each page's town into the **business address** (`addressLocality`, `postalCode`, `geo`), producing **1,026 distinct `@id`s**, **3,080 `LocalBusiness` nodes** and **36 claimed postcodes** for one business. `areaServed` is already correct and must be kept. **Objectives settled** (one stable `@id`, no page-scoped identities, no fabricated address/geo, at most one `LocalBusiness` per page, `areaServed` untouched) — **but the entity-graph implementation is NOT decided and must not be built from the doc.** **The registered address is Robert's HOME and must NEVER be published** — Coulsy is a service-area business. **Truth defect first; SEO effect unproven — do not record it as a diagnosis.** | `ARCHITECTURE.md` §8a |
| **`astro.config.mjs` disables minification** — `minify: false` on both the Vite build and esbuild, so production ships **unminified JS and CSS across all 1,035 pages**. Likely a significant payload win. Needs its own **measured** slice: record before/after transfer sizes; do not assume. **Not started.** | `astro.config.mjs` |
| **Copy defect — `fitting kitchens .`** (stray space before the full stop) in the kitchens service hero. Small content correction, own slice. **Not started.** | `kitchen-installers.astro` |
| **Google Business Profile URL → `sameAs`.** Deferred from §1b. The business schema has **no `sameAs` at all**. **Do not guess or derive the URL** — it must come from Robert, verified. **Not started.** | §1b |
| **Reciprocal hand-off — Fire Doors → Joinery.** The Joinery→Fire Doors direction shipped (§1c); the return leg has not. It belongs in the **fire-doors repository**, so it needs coordinating, not doing from here. **Not started.** | §1c |
| **Geo-page family review — HIGH PRIORITY, and BLOCKED on evidence.** The site generates **1,026 geographical service pages across 18 service families** (18 × 57 towns). **Several families appear to target overlapping or synonymous intent** — `joiner`, `carpenter`, `joinery` and `general-joinery` are the obvious candidates — creating a **material risk of intra-town competition and diluted authority** (see `ARCHITECTURE.md` §8 P0(a)). **Search Console page/query evidence is required** before deciding which families should be consolidated, redirected, retained or removed. **Start with the synonym/intent overlap above.** **Genuinely distinct services may legitimately keep separate geographical families** — this is not an argument for fewer pages as such. **Do NOT delete a single page on a hypothesis.** | §8 P0(a) |
| **Astro 6/7 + Tailwind 4** — deferred deliberately, see §5a. Not urgent; not a security requirement under the current static architecture. **Not started.** | §5a |
| §6c bounded investigation — reposition Building Maintenance around property repairs | `ARCHITECTURE.md` §6c |
| Item 5 — site-wide capability wording review ("specified, sourced and installed") | `ARCHITECTURE.md` §10, item 5 |
| Add ICWCI to the hero evidence panel — **only after 28 August 2026** | `HeroEvidencePanel.astro` |
| P1-2 — review snippets | — |
| P2-1 — singular headings (person-nouns only) | — |
| `OptimizedImage` technical debt (`loading="lazy"` + `fetchpriority` conflict) | — |
| Homepage ships **three `<h1>`s** (`HeroSlider`, one per slide) | pre-existing |
| Heritage signals audit — **359 FAQ schema instances** | `ARCHITECTURE.md` §10a |
| "DIY Kitchens fitter [town]" niche | `ARCHITECTURE.md` §6b |

---

## 7. Things that will waste your time if you don't know them

- **This repository is PUBLIC** (`kcoulsy/coulsy-joinery`). Never commit policy numbers, certificate
  numbers, or anything not already published on the live site.
- **A green browser test can be green for the wrong site.** The sibling `fire-doors` repo is often
  running its own `astro dev`. Whoever starts second gets bumped off port 4321 to **4322** — and a
  test pointed at 4321 then passes happily against the *wrong site*. This happened during the
  dependency slice: a 10/10 run turned out to be testing fire doors (4 dropdown links instead of 14,
  navigating to `/fire-door-installers`). **Before trusting any browser result, confirm the port
  AND assert site identity** — check the `<title>`, a known link count, or a route that only this
  site has. Astro prints its actual port in the dev-server banner; read it, don't assume 4321.
- **`<meta name="generator">` is a real deploy marker; `data-deploy` on `<body>` is not.** Astro
  stamps its own version into `generator` at build time (`Astro v5.18.2`), so polling it proves
  which build is live. The `data-deploy` attribute is a stale hardcoded April string — ignore it.
- **Production sits behind Cloudflare**, which rewrites every `mailto:` to
  `/cdn-cgi/l/email-protection#…`. `dist/` and production will legitimately differ. Not a defect.
- **Astro renders HTML comments (`<!-- -->`) into production.** Use `{/* … */}` for internal notes.
  This has bitten twice — an internal note naming removed suppliers shipped to 57 pages.
- **Search Console exports:** check the date range. A 12-month export describes a year that has
  largely passed. And impressions are inflated by non-commercial traffic — one cluster carried
  16,249 impressions and zero clicks at positions 1–5. **Judge on clicks, and on UK traffic.**
- **Verify every business claim before publishing it.** Two false claims were found and fixed this
  release cycle: £10m public liability (actual: £5m) and "35+ years of fire safety experience"
  (unevidenced). When a claim cannot be verified, **stop** — do not pick the more flattering number.
