# Coulsy Joinery

Marketing site for **Coulsy Joinery** (Coulsy Ltd) — a time-served joiner covering York,
Wetherby, Harrogate, Leeds and the surrounding Yorkshire towns.

Live: <https://coulsyjoinery.co.uk> · Built with [Astro](https://astro.build) · Hosted on Netlify.

## How the site is structured

The site is a **location × service matrix**. This is the core of the SEO strategy and the
main thing to understand before changing anything.

- **57 locations** — `src/constants/locations.ts` (slug, lat/lng, postcode, type, region)
- **18 services** — one `.astro` file each in `src/pages/joinery-services/`
- Every service has a `[location]-<service>.astro` sibling that generates a dedicated page
  per town via `getStaticPaths`, e.g. `/joinery-services/wetherby-kitchen-installers`

That produces **~1,027 geo pages** (plus the hub pages), which is why a build emits ~1,035
HTML files. Someone searching "kitchen fitters wetherby" lands on a page written for
Wetherby rather than a generic one — and the Search Console data confirms this works.

**Do not "simplify" the matrix away.** Individual thin service/town combinations can be
pruned, but the mechanism itself is what earns the traffic.

### The SEO engine

`src/utils/pageMeta.ts` is the single most important file. `getFormattedPageData(Astro)`
parses the URL, works out the location and service, and returns the title, description,
keywords, FAQ content and JSON-LD schema for that page. Change a description variant there
and it propagates across hundreds of pages — so check the blast radius first.

`src/utils/getNearbyLocations.ts` drives the "nearby areas" internal-link grids, using the
lat/lng in `locations.ts`.

## Commands

| Command           | Action                                        |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Install dependencies                          |
| `npm run dev`     | Dev server (default `localhost:4321`)         |
| `npm run build`   | `astro check` + build to `./dist/`            |
| `npm run preview` | Preview the production build locally          |

Node >= 20.3, npm >= 10 (see `engines` in `package.json`).

## Contact form

The contact form is a **Netlify Form** — see `data-netlify="true"` and the hidden
`form-name` input in `src/components/ModernContactForm.astro`. Netlify detects it in the
built HTML at deploy time and captures submissions itself.

There is no server: the site builds fully static, with no Astro adapter. Any `src/pages/api/*`
route that only exports `POST` therefore cannot run and is dead code.

## Facts that must stay accurate

> **This repository is public.** Never commit policy numbers, certificate numbers, or any
> document not already published on the live site. The figures below are all already public.

- **In the trade since 1988**; City & Guilds Craft (Distinction) 1987–89, Advanced 1990.
  Anchor copy to the **year**, never a drifting "N+ years" figure — it goes stale annually
  and previously drifted out of sync across pages.

- **Capability: specified, sourced and installed.** There is **no workshop** and **no in-house
  manufacture**. Robert surveys, plans, specifies, sources, adapts and installs — including
  **made-to-measure** cabinets and doors obtained from specialist manufacturers.

  | Wording | Allowed? |
  | --- | --- |
  | "manufactured by us", "our workshop", "handcrafted by us" | ❌ **Never** — untrue |
  | "made to measure" | ✅ Accurate — the products are *sourced*, not made in-house |
  | "fitted" alone | ⚠️ True but **undersells it** — it reduces the service to labour |
  | **"specified, sourced and installed"** | ✅ **Use this** |

  The differentiator is the **specification and sourcing**, not the manufacture and not the
  labour. See `ARCHITECTURE.md` §2a. Reference wording:
  `src/pages/joinery-services/kitchen-installers.astro`.

- **Insurance.** State the three covers separately. **Never collapse them into one figure**,
  and never imply a single limit applies to all of them:

  | Cover | Limit |
  | --- | --- |
  | Public and Products Liability | **£5m** |
  | Employers' Liability | **£10m** |
  | Professional Indemnity | **£1m** |

  Professional indemnity belongs on `/about/compliance` and `/about/qualifications` only —
  it is a commercial/consultancy signal, not something a homeowner booking a kitchen weighs.
  The site previously claimed **£10m public liability**, which was false; see
  `ARCHITECTURE.md` §12.

- **ICWCI**: election takes effect **28 August 2026**. Until then the site must not claim
  membership or the MICWCI post-nominal. See the comment in `src/pages/about/qualifications.astro`.

- **CSCS Gold** card is current to **end of January 2029**. Recheck before that date.

- Claims of qualification (CSCS, CITB, GQA, FireQual, City & Guilds) appear in **schema markup
  as well as visible copy** — update both, or they will disagree.

## Project documentation

Read in this order. **There is no `docs/` directory** — if a prompt tells you to read
`docs/00_START_HERE.md`, it is describing a different project.

| # | Document | What it is |
| --- | --- | --- |
| 1 | `README.md` (this file) | How the site is built, and the facts that must stay accurate |
| 2 | [`HANDOVER.md`](HANDOVER.md) | **Current state.** Release status, what shipped, what is outstanding, and the traps that will waste your time. Start a new session here. |
| 3 | [`ARCHITECTURE.md`](ARCHITECTURE.md) | Service architecture (primary / secondary / SEO-only tiers), navigation philosophy, the brand-migration map for future Coulsy sites, technical SEO priorities, and the release log. Records conclusions that were reached and then **overturned by evidence** — read those before repeating them. |
| 4 | [`AUDIT_2026-07-13.md`](AUDIT_2026-07-13.md) | Forensic site audit: 78 findings raised, 73 surviving adversarial verification. |

## Search Console data

`seo-data/` holds Search Console exports (queries, pages, coverage). They're the evidence
base for keyword and pruning decisions — read them before changing titles or descriptions.

Two cautions learned the hard way, both documented in `ARCHITECTURE.md`:

1. **Check the date range.** A 12-month export describes a year that has largely passed. It is
   not a description of the present.
2. **Impressions are inflated by non-commercial traffic.** One cluster carried 16,249
   impressions and zero clicks at positions 1–5, which is not human behaviour. Judge on
   **clicks**, and on UK traffic.
