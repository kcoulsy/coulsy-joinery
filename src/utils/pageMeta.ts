import { capitalizeFirstLetter, formatLocationName } from "./capitalizeFirstLetter";
import { LOCATIONS } from "../constants/locations";

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
  pageTitle: string;
} {
  const { location, service } = Astro.params;
  
  // Determine service name from the current page path
  let serviceName = "joinery"; // default fallback
  
  if (service) {
    // If service parameter exists, use it
    serviceName = service;
  } else {
    // Extract service name from the current page path
    const pathname = Astro.url.pathname;
    const pathSegments = pathname.split('/');
    
    // Look for service name in the path
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      if (segment === 'joinery-services' && pathSegments[i + 1]) {
        const nextSegment = pathSegments[i + 1];
        
        // Check if this is a location-service format by looking for known location slugs
        const knownLocations = LOCATIONS.map(l => l.slug);
        
        // Check if the segment starts with a known location
        let foundLocation = null;
        for (const loc of knownLocations) {
          if (nextSegment.startsWith(loc + '-')) {
            foundLocation = loc;
            break;
          }
        }
        
        if (foundLocation) {
          // Remove the location part and join the rest as service name
          serviceName = nextSegment.substring(foundLocation.length + 1); // +1 for the hyphen
        } else {
          // It's just a service name (no location)
          serviceName = nextSegment;
        }
        break;
      }
    }
  }
  
  // Clean and format the service name - preserve hyphens for multi-word services
  const cleanRawType = serviceName.replace(/[^a-zA-Z-]/g, "");
  const baseType = cleanRawType;

  // Split by hyphens and capitalize each part, then join with spaces
  const formattedServiceName = baseType
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");

  const locationFormated = location ? formatLocationName(location) : "";
  const locationInText = location ? ` in ${locationFormated}` : "";

  const cleanLocationName = location
    ? formatLocationName(location)
    : "";

  // Create SEO-friendly page title
  let pageTitle = formattedServiceName;
  if (location) {
    // For location-specific pages, use format: "Door Hanging in Boston Spa" or "Boston Spa Door Hanging Services"
    pageTitle = `${formattedServiceName} in ${cleanLocationName}`;
  }

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
    enhancedDescription,
    pageTitle
  };
}