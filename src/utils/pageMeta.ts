import { LOCATIONS } from "../constants/locations";

export function capitalizeFirstLetter(str: string) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

export function getFormattedPageData(Astro: any): {
  formattedServiceName: string;
  locationFormated: string;
  locationInText: string;
  cleanLocationName: string;
  defaultDescription: string;
  businessSchema: any;
  serviceSchema: any;
  faqSchema: any;
  lastmod: string;
} {
  const { location } = Astro.params;
  const pathname = Astro.url.pathname;
  const rawType = pathname.replace(/\/$/, "").split("/").pop() ?? "";

  const cleanRawType = rawType.replace(/\.html$/i, "");

  const baseType = location
    ? cleanRawType
        .replace(new RegExp(`^${location}-`, "i"), "")
        .replace(new RegExp(`-${location}$`, "i"), "")
    : cleanRawType;

  const formattedServiceName = baseType
    .split("-")
    .map(capitalizeFirstLetter)
    .join(" ");

  const locationFormated = location ? capitalizeFirstLetter(location) : "";
  const locationInText = location ? ` in ${locationFormated}` : "";

  const cleanLocationName = location
  ? locationFormated.trim().replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  : "";


  const fallbackGeo = { lat: 53.9655, lng: -1.205 };
  const geo = LOCATIONS.find((l) => l.slug === location) ?? fallbackGeo;

  const defaultDescription = `Trusted local joiner offering bespoke joinery services ${locationInText.trim()}, including kitchens, staircases, windows, doors, and heritage woodwork. Over 30 years' experience. Free quotes across Yorkshire.`;

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://coulsyjoinery.co.uk/#business",
    name: "Coulsy Joinery",
    description: defaultDescription,
    url: `https://coulsyjoinery.co.uk/joinery-services/${location ? `${location}-${baseType}` : baseType}`,
    image: "https://coulsyjoinery.co.uk/images/logo.png",
    email: "robert@coulsy.co.uk",
    telephone: "+44 7544 030486",
    priceRange: "££",
    paymentAccepted: ["Cash", "Bank Transfer"],
    currenciesAccepted: "GBP",
    knowsAbout: ["Joinery", "Carpentry", "Kitchen Fitting", "Heritage Restoration", "Bespoke Joinery"],
    award: ["City & Guilds Qualified", "30+ Years Experience"],
    address: {
      "@type": "PostalAddress",
      addressLocality: locationFormated || "York",
      postalCode: "YO26 7NW",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    },
    openingHours: "Mo-Fr 07:00-18:00",
    areaServed: [
      locationFormated || "York",
      "Leeds",
      "Wetherby",
      "Harrogate",
      "Yorkshire"
    ],
    hasMap: `https://www.google.com/maps?q=${geo.lat},${geo.lng}`,
    sameAs: [
      "https://www.linkedin.com/company/coulsy-limited/?viewAsMember=true",
      "https://www.facebook.com/coulsyjoinery/"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Service-specific schema for better service search rankings
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${formattedServiceName} ${locationInText}`,
    "description": defaultDescription,
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://coulsyjoinery.co.uk/#business",
      "name": "Coulsy Joinery"
    },
    "areaServed": {
      "@type": "City",
      "name": locationFormated || "York"
    },
    "serviceType": "Joinery",
    "category": "Home Improvement",
    "url": `https://coulsyjoinery.co.uk/joinery-services/${location ? `${location}-${baseType}` : baseType}`
  };

  // FAQ schema for rich snippets in search results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much does ${formattedServiceName.toLowerCase()} work cost ${locationInText}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our ${formattedServiceName.toLowerCase()} costs vary depending on the project scope and materials required. I provide detailed quotes for all work ${locationInText} after assessing your specific requirements.`
        }
      },
      {
        "@type": "Question",
        "name": `How long does ${formattedServiceName.toLowerCase()} work take?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Most ${formattedServiceName.toLowerCase()} projects take 1-3 days depending on complexity. I'll provide a detailed timeline during your consultation and keep you updated throughout the project.`
        }
      },
      {
        "@type": "Question",
        "name": `What types of ${formattedServiceName.toLowerCase()} work do you do?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `I offer comprehensive ${formattedServiceName.toLowerCase()} services including doors, floors, stairs, windows, and general building work. From small repairs to complete installations, I handle all aspects of joinery and small building projects.`
        }
      },
      {
        "@type": "Question",
        "name": `Are you qualified for ${formattedServiceName.toLowerCase()} and building work?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, I'm a fully qualified City & Guilds joiner with over 30 years' experience in both joinery and small building works. I'm qualified to handle structural work, building maintenance, and all types of joinery projects.`
        }
      },
      {
        "@type": "Question",
        "name": `Do you work on both domestic and commercial ${formattedServiceName.toLowerCase()} projects?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, I work on both domestic and commercial projects. From residential joinery and building work to commercial installations and maintenance, I provide the same high-quality service for all types of properties.`
        }
      }
    ]
  };

  const lastmod = new Date().toISOString();

return {
  formattedServiceName,
  locationFormated,
  locationInText,
  cleanLocationName,
  defaultDescription,
  businessSchema,
  serviceSchema,
  faqSchema,
  lastmod,
};
}