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
  enhancedKeywords: string;
  enhancedDescription: string;
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
    ? location.trim().replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
    : "";

  const fallbackGeo = { lat: 53.9655, lng: -1.205 };
  const geo = LOCATIONS.find((l) => l.slug === location) ?? fallbackGeo;

  const defaultDescription = `Trusted local joiner offering bespoke joinery services ${locationInText.trim()}, including kitchens, staircases, windows, doors, and heritage woodwork. Over 30 years' experience. Professional quotes across Yorkshire.`;

  // Enhanced description with location context
  const enhancedDescription = location 
    ? `${defaultDescription} Serving ${cleanLocationName} and surrounding areas. Local expertise, quality craftsmanship, and reliable service.`
    : defaultDescription;

  // Enhanced keywords with location and service
  const enhancedKeywords = `joinery ${locationInText}, carpentry ${locationInText}, kitchen installation ${locationInText}, bespoke joinery ${locationInText}, heritage restoration ${locationInText}, ${formattedServiceName.toLowerCase()} ${locationInText}, local joiner ${locationInText}, qualified carpenter ${locationInText}`;

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://coulsyjoinery.co.uk/joinery-services/${location ? `${location}-${baseType}` : baseType}#business`,
    name: "Coulsy Joinery",
    alternateName: "Coulsy Joinery & Small Build",
    description: enhancedDescription,
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
      addressLocality: cleanLocationName || "York",
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
      cleanLocationName || "York",
      "Leeds",
      "Wetherby", 
      "Harrogate",
      "Yorkshire"
    ],
    hasMap: `https://www.google.com/maps?q=${geo.lat},${geo.lng}`,
    sameAs: [
      "https://www.linkedin.com/company/coulsy-limited/?viewAsMember=true",
      "https://www.youtube.com/@coulsyjoinery"
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
    "description": enhancedDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Coulsy Joinery",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cleanLocationName || "York",
        "postalCode": "YO26 7NW",
        "addressCountry": "GB"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": cleanLocationName || "York"
    },
    "serviceType": formattedServiceName,
    "category": "Home Improvement",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "GBP",
      "priceRange": "££",
      "availability": "https://schema.org/InStock"
    }
  };

  // FAQ Schema for better search visibility
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What ${formattedServiceName.toLowerCase()} services do you offer ${locationInText}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We offer comprehensive ${formattedServiceName.toLowerCase()} services ${locationInText} including bespoke joinery, kitchen installations, heritage restoration, and general carpentry. All work is carried out by qualified craftsmen with over 30 years' experience.`
        }
      },
      {
        "@type": "Question", 
        "name": `Are you qualified and insured ${locationInText}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, I'm City & Guilds qualified since 1989, fully insured, and VAT registered. I hold a CSCS Gold Card and have over 30 years of experience in joinery and carpentry."
        }
      },
      {
        "@type": "Question",
        "name": `Do you provide free quotes ${locationInText}?`,
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "I provide professional quotes for all joinery work. Contact me to discuss your project requirements and I'll provide a detailed, competitive quote."
        }
      }
    ]
  };

  return {
    formattedServiceName,
    locationFormated,
    locationInText,
    cleanLocationName,
    defaultDescription,
    businessSchema,
    serviceSchema,
    faqSchema,
    lastmod: "2025-01-27",
    enhancedKeywords,
    enhancedDescription
  };
}