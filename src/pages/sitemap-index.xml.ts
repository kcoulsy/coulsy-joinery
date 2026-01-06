import type { APIRoute } from "astro";

// Define services in SEO-optimized order: high-value services first, roofing services last
// Priority mapping: high-priority (0.9), medium (0.8), low/roofing (0.6)
const services = [
  // High-Priority Services (0.9)
  { slug: "kitchen-installers", priority: "0.9" },
  { slug: "bespoke-joinery", priority: "0.9" },
  { slug: "general-joinery", priority: "0.9" },
  { slug: "garden-offices", priority: "0.9" },
  { slug: "garden-rooms", priority: "0.9" },
  
  // Medium-Priority Services (0.8)
  { slug: "heritage-restoration-joinery", priority: "0.8" },
  { slug: "accessible-kitchen-installers", priority: "0.8" },
  { slug: "stud-wall-partitioning", priority: "0.8" },
  { slug: "steel-fire-exit-doors-installers", priority: "0.8" },
  { slug: "joinery-subcontractors", priority: "0.8" },
  
  // Lower-Priority Services (0.6) - Roofing services grouped together at end
  { slug: "traditional-cut-roofs", priority: "0.6" },
  { slug: "truss-roof-installers", priority: "0.6" },
  
  // Legacy/Deprecated (keep for backwards compatibility)
  { slug: "joiner", priority: "0.7" },
  { slug: "carpenter", priority: "0.7" },
  { slug: "joinery", priority: "0.7" },
];

// Define locations directly to avoid import issues
const LOCATIONS = [
  { slug: "aberford", lat: 53.838, lng: -1.332 },
  { slug: "alwoodley", lat: 53.859, lng: -1.542 },
  { slug: "bardsey", lat: 53.881, lng: -1.459 },
  { slug: "boston-spa", lat: 53.903, lng: -1.330 },
  { slug: "boroughbridge", lat: 54.095, lng: -1.399 },
  { slug: "bramham", lat: 53.892, lng: -1.372 },
  { slug: "castleford", lat: 53.724, lng: -1.354 },
  { slug: "clifford", lat: 53.899, lng: -1.378 },
  { slug: "collingham", lat: 53.901, lng: -1.415 },
  { slug: "east-keswick", lat: 53.892, lng: -1.468 },
  { slug: "elvington", lat: 53.917, lng: -0.948 },
  { slug: "follifoot", lat: 53.970, lng: -1.493 },
  { slug: "garforth", lat: 53.791, lng: -1.381 },
  { slug: "harewood", lat: 53.891, lng: -1.512 },
  { slug: "harrogate", lat: 53.992, lng: -1.541 },
  { slug: "horsforth", lat: 53.843, lng: -1.637 },
  { slug: "ilkley", lat: 53.924, lng: -1.825 },
  { slug: "knaresborough", lat: 54.009, lng: -1.465 },
  { slug: "leeds", lat: 53.800, lng: -1.549 },
  { slug: "linton", lat: 53.915, lng: -1.437 },
  { slug: "malton", lat: 54.134, lng: -0.798 },
  { slug: "masham", lat: 54.222, lng: -1.656 },
  { slug: "otley", lat: 53.905, lng: -1.691 },
  { slug: "pannal", lat: 53.964, lng: -1.537 },
  { slug: "pocklington", lat: 53.930, lng: -0.780 },
  { slug: "pontefract", lat: 53.693, lng: -1.312 },
  { slug: "ripley", lat: 54.039, lng: -1.537 },
  { slug: "ripon", lat: 54.137, lng: -1.521 },
  { slug: "rothwell", lat: 53.752, lng: -1.478 },
  { slug: "scarcroft", lat: 53.865, lng: -1.464 },
  { slug: "selby", lat: 53.781, lng: -1.070 },
  { slug: "spofforth", lat: 53.978, lng: -1.470 },
  { slug: "stamford-bridge", lat: 54.017, lng: -0.909 },
  { slug: "tadcaster", lat: 53.885, lng: -1.264 },
  { slug: "thirsk", lat: 54.232, lng: -1.343 },
  { slug: "thorp-arch", lat: 53.900, lng: -1.336 },
  { slug: "towton", lat: 53.847, lng: -1.277 },
  { slug: "wakefield", lat: 53.683, lng: -1.496 },
  { slug: "walton", lat: 53.885, lng: -1.342 },
  { slug: "wetherby", lat: 53.928, lng: -1.386 },
  { slug: "welburn", lat: 54.111, lng: -0.864 },
  { slug: "york", lat: 53.959, lng: -1.082 },
  { slug: "yorkshire", lat: 53.957, lng: -1.082 },
  { slug: "barwick-in-elmet", lat: 53.827, lng: -1.411 },
  { slug: "monk-fryston", lat: 53.757, lng: -1.231 },
  { slug: "shadwell", lat: 53.848, lng: -1.469 },
  { slug: "moortown", lat: 53.840, lng: -1.546 },
  { slug: "roundhay", lat: 53.836, lng: -1.496 },
  { slug: "chapel-allerton", lat: 53.829, lng: -1.535 },
  { slug: "thorner", lat: 53.855, lng: -1.429 },
  { slug: "normanton", lat: 53.698, lng: -1.419 },
  { slug: "knottingley", lat: 53.705, lng: -1.252 },
  { slug: "altofts", lat: 53.707, lng: -1.417 },
  { slug: "featherstone", lat: 53.681, lng: -1.353 },
  { slug: "horbury", lat: 53.659, lng: -1.571 },
  { slug: "ossett", lat: 53.681, lng: -1.580 }
];

export const GET: APIRoute = async ({ url }) => {
  const baseUrl = url.origin;
  const currentDate = new Date().toISOString();

  // Generate all location-based URLs with optimized priorities
  const locationUrls = [];
  
  for (const service of services) {
    const serviceSlug = typeof service === 'string' ? service : service.slug;
    const servicePriority = typeof service === 'string' ? "0.8" : service.priority;
    
    // Add the main service page with service-specific priority
    locationUrls.push({
      url: `${baseUrl}/joinery-services/${serviceSlug}`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: servicePriority
    });

    // Add all location-specific pages with adjusted priority (0.1 lower than main page)
    const locationPriority = parseFloat(servicePriority) - 0.1;
    for (const location of LOCATIONS) {
      locationUrls.push({
        url: `${baseUrl}/joinery-services/${location.slug}-${serviceSlug}`,
        lastmod: currentDate,
        changefreq: "weekly", 
        priority: locationPriority.toFixed(1)
      });
    }
  }

  // Static pages
  const staticPages = [
    { url: baseUrl, priority: "1.0", changefreq: "daily", lastmod: currentDate },
    { url: `${baseUrl}/about`, priority: "0.8", changefreq: "monthly", lastmod: currentDate },
    { url: `${baseUrl}/contact`, priority: "0.9", changefreq: "monthly", lastmod: currentDate },
    { url: `${baseUrl}/joinery-services`, priority: "0.9", changefreq: "weekly", lastmod: currentDate },
    { url: `${baseUrl}/about/qualifications`, priority: "0.7", changefreq: "monthly", lastmod: currentDate },
    { url: `${baseUrl}/about/compliance`, priority: "0.7", changefreq: "monthly", lastmod: currentDate },
    { url: `${baseUrl}/about/sustainability`, priority: "0.7", changefreq: "monthly", lastmod: currentDate },
  ];

  const allUrls = [...staticPages, ...locationUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq || "weekly"}</changefreq>
    <priority>${page.priority || "0.5"}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600"
    },
  });
};
