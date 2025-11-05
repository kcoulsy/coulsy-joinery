import { formatLocationName } from "./capitalizeFirstLetter";
import { LOCATIONS } from "../constants/locations";
import { getNearbyLocations } from "./getNearbyLocations";

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
  // CRITICAL: Clean the entire URL pathname first to remove any .html extensions
  // This is the root cause of the "html" issue on the live site
  const cleanPathname = Astro.url.pathname.replace(/\.html$/i, '').replace(/\.htm$/i, '');
  
  // Override the pathname for all subsequent processing
  const originalPathname = Astro.url.pathname;
  Astro.url.pathname = cleanPathname;
  
  // CRITICAL: Extract location and service from the CLEANED pathname, not from Astro.params
  // This ensures we don't get .html extensions in the parameters
  let location: string | undefined;
  let service: string | undefined;
  
  // Parse the cleaned pathname to extract location and service
  const pathSegments = cleanPathname.split('/');
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
        // This is a location-service page
        location = foundLocation;
        service = nextSegment.substring(foundLocation.length + 1); // +1 for the hyphen
      } else {
        // This is just a service page (no location)
        service = nextSegment;
      }
      break;
    }
  }
  

  
  // Determine service name from the current page path
  let serviceName = "joinery"; // default fallback
  
  if (service) {
    // If service parameter exists, use it
    serviceName = service;
  } else {
    // Extract service name from the current page path for dynamic routes
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
          // Also remove any .html extension that might be present
          const rawServiceName = nextSegment.substring(foundLocation.length + 1); // +1 for the hyphen
          
          // Comprehensive cleaning of the raw service name
          serviceName = rawServiceName
            .replace(/\.html$/i, '')           // Remove .html extension
            .replace(/\.htm$/i, '')            // Remove .htm extension
            .replace(/html/gi, '')             // Remove any "html" text
            .replace(/htm/gi, '')              // Remove any "htm" text
            .trim();
            
          // Additional safety check for edge cases where "html" might be appended without a dot
          if (serviceName.toLowerCase().includes('html')) {
            serviceName = serviceName.replace(/html/gi, '').replace(/\s+/g, ' ').trim();
          }
        } else {
          // It's just a service name (no location)
          // Remove any .html extension that might be present
          
          // Comprehensive cleaning of the service name
          serviceName = nextSegment
            .replace(/\.html$/i, '')           // Remove .html extension
            .replace(/\.htm$/i, '')            // Remove .htm extension
            .replace(/html/gi, '')             // Remove any "html" text
            .replace(/htm/gi, '')              // Remove any "htm" text
            .trim();
            
          // Additional safety check for edge cases where "html" might be appended without a dot
          if (serviceName.toLowerCase().includes('html')) {
            serviceName = serviceName.replace(/html/gi, '').replace(/\s+/g, ' ').trim();
          }
        }
        break;
      }
    }
    
    // If we still don't have a service name, try to extract it from the filename
    if (serviceName === "joinery") {
      // This might be a static page, try to get the service from the current file path
      const currentFile = Astro.url.pathname.split('/').pop();
      if (currentFile && currentFile !== 'joinery-services') {
        // Remove any file extensions and clean the service name
        serviceName = currentFile
          .replace(/\.html$/i, '')           // Remove .html extension
          .replace(/\.htm$/i, '')            // Remove .htm extension
          .replace(/html/gi, '')             // Remove any "html" text
          .replace(/htm/gi, '')              // Remove any "htm" text
          .trim();
          
        // Additional safety check for static pages
        if (serviceName.toLowerCase().includes('html')) {
          serviceName = serviceName.replace(/html/gi, '').replace(/\s+/g, ' ').trim();
        }
      }
    }
    
    // Additional check: if this is a static service page (no location), ensure service name is clean
    if (!location && serviceName && serviceName !== "joinery") {
      // Clean the service name thoroughly
      const cleanedServiceName = serviceName
        .replace(/\.html$/i, '')           // Remove .html extension
        .replace(/\.htm$/i, '')            // Remove .htm extension
        .replace(/html/gi, '')             // Remove any "html" text
        .replace(/htm/gi, '')              // Remove any "htm" text
        .trim();
        
      if (cleanedServiceName !== serviceName) {
        serviceName = cleanedServiceName;
      }
    }
  }
  
  // Clean and format the service name - preserve hyphens for multi-word services
  // Remove any remaining .html or other file extensions and ensure no HTML artifacts
  let cleanRawType = serviceName
    .replace(/\.html$/i, '')           // Remove .html extension
    .replace(/\.htm$/i, '')            // Remove .htm extension
    .replace(/html/gi, '')             // Remove any "html" text
    .replace(/htm/gi, '')              // Remove any "htm" text
    .replace(/[^a-zA-Z-]/g, "")        // Keep only letters and hyphens
    .trim();
    
  // Additional safety check - if cleanRawType still contains "html" anywhere, remove it completely
  if (cleanRawType.toLowerCase().includes('html')) {
    cleanRawType = cleanRawType.replace(/html/gi, '').replace(/\s+/g, ' ').trim();
  }
  
  const baseType = cleanRawType;

  // Split by hyphens and capitalize each part, then join with spaces
  let formattedServiceName = baseType
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
    
  // CRITICAL SAFETY CHECK: Ensure formattedServiceName is completely clean
  // This is where the "html" issue is likely happening on the live site
  if (formattedServiceName.toLowerCase().includes('html')) {
    formattedServiceName = formattedServiceName.replace(/html/gi, '').replace(/\s+/g, ' ').trim();
  }

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
  
  // FINAL SAFETY CHECK: Ensure the page title is completely clean before any processing
  // This catches any edge cases that might have slipped through
  if (pageTitle.toLowerCase().includes('html')) {
    pageTitle = pageTitle.replace(/html/gi, '').replace(/\s+/g, ' ').trim();
  }

  // Ensure pageTitle doesn't contain any HTML or file extensions
  // This is the critical fix - remove ALL possible HTML artifacts
  // We need to be extremely thorough to catch any edge cases on the live site
  pageTitle = pageTitle
    .replace(/\.html$/i, '')           // Remove .html extension
    .replace(/\.htm$/i, '')            // Remove .htm extension
    .replace(/<[^>]*>/g, '')          // Remove any HTML tags
    .replace(/html/gi, '')             // Remove any remaining "html" text
    .replace(/htm/gi, '')              // Remove any remaining "htm" text
    .replace(/\s+/g, ' ')              // Normalize whitespace
    .trim();
    
  // Additional safety check - if pageTitle still contains "html" anywhere, remove it completely
  if (pageTitle.toLowerCase().includes('html')) {
    pageTitle = pageTitle.replace(/html/gi, '').replace(/\s+/g, ' ').trim();
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

  // Get nearby locations for enhanced areaServed
  const nearbyLocations = location 
    ? getNearbyLocations(location, 30).slice(0, 10).map(loc => {
        const locData = LOCATIONS.find(l => l.slug === loc.slug);
        return locData ? formatLocationName(locData.slug) : null;
      }).filter(Boolean)
    : [];

  // Enhanced areaServed with nearby locations
  const enhancedAreaServed = [
    cleanLocationName || "York",
    "Leeds",
    "Wetherby", 
    "Harrogate",
    "Yorkshire",
    ...(nearbyLocations as string[])
  ].filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

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
    // Enhanced areaServed with structured data
    areaServed: enhancedAreaServed.map((city) => ({
      "@type": "City",
      name: city,
      containedIn: {
        "@type": "State",
        name: "North Yorkshire"
      }
    })),
    // ServiceArea schema for geo-targeting SEO
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: String(geo.lat),
        longitude: String(geo.lng),
      },
      geoRadius: {
        "@type": "Distance",
        name: "30 miles"
      }
    },
    hasMap: `https://www.google.com/maps?q=${geo.lat},${geo.lng}`,
    sameAs: [
      "https://www.linkedin.com/company/coulsy-limited/?viewAsMember=true",
      "https://www.youtube.com/@coulsyjoinery"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "10",
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
    // Enhanced areaServed with multiple locations
    "areaServed": [
      {
        "@type": "City",
        "name": cleanLocationName || "York",
        "containedIn": {
          "@type": "State",
          "name": "North Yorkshire"
        }
      },
      ...enhancedAreaServed.slice(0, 5).map((city) => ({
        "@type": "City",
        "name": city,
        "containedIn": {
          "@type": "State",
          "name": "North Yorkshire"
        }
      }))
    ],
    // ServiceArea for geo-targeting
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": String(geo.lat),
        "longitude": String(geo.lng),
      },
      "geoRadius": {
        "@type": "Distance",
        "name": "30 miles"
      }
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

  // FAQ Schema for better search visibility with enhanced location-specific questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": location 
          ? `Do you provide ${formattedServiceName.toLowerCase()} services in ${cleanLocationName}?`
          : `What ${formattedServiceName.toLowerCase()} services do you offer?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": location
            ? `Yes, I regularly work in ${cleanLocationName} and surrounding areas. I offer comprehensive ${formattedServiceName.toLowerCase()} services ${locationInText} including bespoke joinery, kitchen installations, heritage restoration, and general carpentry. My local knowledge of ${cleanLocationName}'s building styles and planning requirements ensures quality work that complements the area's character.`
            : `We offer comprehensive ${formattedServiceName.toLowerCase()} services including bespoke joinery, kitchen installations, heritage restoration, and general carpentry. All work is carried out by qualified craftsmen with over 30 years' experience.`
        }
      },
      {
        "@type": "Question", 
        "name": `Are you qualified and insured${locationInText}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, I'm City & Guilds qualified since 1989, fully insured, and VAT registered. I hold a CSCS Gold Card and have over 30 years of experience in joinery and carpentry."
        }
      },
      {
        "@type": "Question",
        "name": `Do you provide free quotes${locationInText}?`,
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": location
            ? `Yes, I provide professional, no-obligation quotes for all joinery work in ${cleanLocationName} and surrounding areas. Contact me to discuss your project requirements and I'll provide a detailed, competitive quote tailored to your needs.`
            : "I provide professional quotes for all joinery work. Contact me to discuss your project requirements and I'll provide a detailed, competitive quote."
        }
      },
      ...(location ? [{
        "@type": "Question",
        "name": `What areas near ${cleanLocationName} do you serve?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `I serve ${cleanLocationName} and surrounding areas within approximately 30 miles. This includes ${nearbyLocations.slice(0, 5).join(", ")}${nearbyLocations.length > 5 ? ", and more" : ""}. If you're unsure whether you're within my service area, feel free to contact me and I'll be happy to confirm.`
        }
      }] : [])
    ]
  };

  // Restore the original pathname to avoid side effects
  Astro.url.pathname = originalPathname;
  
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