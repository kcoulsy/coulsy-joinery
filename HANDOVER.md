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
| **HEAD** | `58ef9d6` |
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

## 6. Outstanding work — none started

| Item | Reference |
| --- | --- |
| **Astro upgrade — on 5.15.3, latest is 7.x.** Two majors behind. **Not** related to the §1a mobile-nav defect. Own bounded slice; not started. | §1a |
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
