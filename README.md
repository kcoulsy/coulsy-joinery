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

- **In the trade since 1988**; City & Guilds Craft (Distinction) 1987–89, Advanced 1990.
  Anchor copy to the **year**, never a drifting "N+ years" figure — it goes stale annually
  and previously drifted out of sync across pages.
- **ICWCI**: election takes effect **28 August 2026**. Until then the site must not claim
  membership or the MICWCI post-nominal. See the comment in `src/pages/about/qualifications.astro`.
- Claims of qualification (CSCS, CITB, GQA, FireQual, City & Guilds) appear in schema markup
  as well as visible copy — update both.

## Search Console data

`seo-data/` holds Search Console exports (queries, pages, coverage). They're the evidence
base for keyword and pruning decisions — read them before changing titles or descriptions.
`AUDIT_2026-07-13.md` is a full audit against that data.
