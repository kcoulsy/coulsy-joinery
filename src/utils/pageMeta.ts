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

  const fallbackLocation = {
    slug: "york",
    lat: 53.9655,
    lng: -1.205,
    postcode: "YO26",
    type: "city" as const,
    region: "North Yorkshire",
  };
  const locationData = LOCATIONS.find((l) => l.slug === location) ?? fallbackLocation;
  const geo = { lat: locationData.lat, lng: locationData.lng };
  const locationPostcode = locationData.postcode;
  const locationRegion = locationData.region;
  const locationType = locationData.type;

  // Deterministic hash so the same slug always picks the same variant.
  // This stabilises output across builds (Google dislikes flapping content).
  const variantKey = `${location ?? "base"}-${baseType}`;
  let variantHash = 0;
  for (let i = 0; i < variantKey.length; i++) {
    variantHash = ((variantHash << 5) - variantHash + variantKey.charCodeAt(i)) | 0;
  }
  variantHash = Math.abs(variantHash);

  const lowerService = formattedServiceName.toLowerCase();
  const locTypeWord =
    locationType === "city" ? "city"
    : locationType === "market-town" ? "market town"
    : locationType === "town" ? "town"
    : locationType === "suburb" ? "suburb"
    : locationType === "village" ? "village"
    : "area";

  // Pool of 5 description variants picked deterministically per slug+service.
  // Each variant opens differently and highlights a different angle (experience,
  // locality, qualifications, scope, trust) so near-duplicate signals drop.
  const descriptionVariants = location
    ? [
        `Joiner since 1988, City & Guilds qualified, covering ${cleanLocationName} (${locationPostcode}) — ${lowerService} and general joinery across ${locationRegion}. £5m public liability cover, free quotes.`,
        `${formattedServiceName} in ${cleanLocationName} and the wider ${locationRegion} area. Local joiner, on the tools since 1988, City & Guilds qualified, £5m public liability cover. Free no-obligation quotes.`,
        `Quality ${lowerService} in ${cleanLocationName} ${locationPostcode}. City & Guilds qualified in 1989, CSCS Gold, VAT registered. Serving homes and businesses across ${locationRegion}.`,
        `Professional ${lowerService} for homes and businesses in ${cleanLocationName} — a ${locTypeWord} I've worked across for decades. Joiner since 1988, reliable service.`,
        `Trusted joiner in ${cleanLocationName} (${locationPostcode}) — ${lowerService}, kitchens, doors, heritage repairs and general carpentry. Qualified, with £5m public liability cover. Covering ${locationRegion}.`,
      ]
    : [
        `Joiner since 1988, City & Guilds qualified, covering Yorkshire — ${lowerService} and general joinery. £5m public liability cover, free quotes.`,
        `${formattedServiceName} across Yorkshire. Local joiner, on the tools since 1988, City & Guilds qualified, £5m public liability cover. Free no-obligation quotes.`,
        `Quality ${lowerService} across Yorkshire. City & Guilds qualified in 1989, CSCS Gold, VAT registered.`,
        `Professional ${lowerService} for homes and businesses across Yorkshire. Joiner since 1988, reliable service.`,
        `Trusted joiner across Yorkshire — ${lowerService}, kitchens, doors, heritage repairs and general carpentry. Qualified, with £5m public liability cover.`,
      ];

  const defaultDescription = descriptionVariants[variantHash % descriptionVariants.length];
  const enhancedDescription = defaultDescription;

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
    award: ["City & Guilds Qualified", "Joiner Since 1988"],
    address: {
      "@type": "PostalAddress",
      addressLocality: cleanLocationName || "York",
      addressRegion: locationRegion,
      postalCode: locationPostcode,
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
        name: locationRegion,
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
    // No aggregateRating: these pages link to reviews but don't render them, and
    // Google requires the rated reviews to be present on the page claiming the rating.
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
        "addressRegion": locationRegion,
        "postalCode": locationPostcode,
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
          "name": locationRegion,
        }
      },
      ...enhancedAreaServed.slice(0, 5).map((city) => ({
        "@type": "City",
        "name": city,
        "containedIn": {
          "@type": "State",
          "name": locationRegion,
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

  // FAQ Schema: pool of candidate questions; each page shows 4 picked
  // deterministically by slug hash. This breaks near-duplicate signals vs the
  // previous single 4-Q template applied to every page.
  const faqPool: { name: string; text: string }[] = [];

  if (location) {
    faqPool.push({
      name: `Are you available for work in ${cleanLocationName}?`,
      text: `Yes — I regularly carry out ${lowerService} and general joinery work in ${cleanLocationName} and nearby ${locationRegion}. My familiarity with the ${locTypeWord}'s housing stock (${locationPostcode} and surrounding postcodes) means the job fits the building first time.`,
    });
    faqPool.push({
      name: `Do you cover the ${locationPostcode} postcode area?`,
      text: `Yes, ${locationPostcode} is firmly within my service area. I work across ${cleanLocationName} and the wider ${locationRegion} region daily, so travel and scheduling are rarely a problem.`,
    });
    if (nearbyLocations.length > 0) {
      faqPool.push({
        name: `What areas near ${cleanLocationName} do you serve?`,
        text: `I serve ${cleanLocationName} and surrounding areas within roughly 30 miles — including ${nearbyLocations.slice(0, 5).join(", ")}${nearbyLocations.length > 5 ? ", and more" : ""}. If you're unsure whether you're in my service area, just get in touch.`,
      });
    }
    if (locationType === "market-town" || locationType === "village" || locationType === "city") {
      faqPool.push({
        name: `Do you work on period or listed properties in ${cleanLocationName}?`,
        text: `Yes. ${cleanLocationName} has a lot of older and period buildings, and I handle sympathetic joinery repairs — sash window restoration, door repairs, timber-frame and heritage work — while respecting the property's character and any conservation requirements.`,
      });
    }
  } else {
    faqPool.push({
      name: `What ${lowerService} services do you offer?`,
      text: `I offer ${lowerService} across Yorkshire — bespoke joinery, kitchen installation, heritage repairs, and general carpentry. All work is carried out personally, on the tools since 1988.`,
    });
  }

  // Trust / commercial FAQs (service-flavoured but not location-coupled)
  faqPool.push({
    name: `Are you qualified and insured${locationInText}?`,
    text: "Yes — City & Guilds qualified in 1989, CSCS Gold Card holder, VAT registered, and insured with £5m public and products liability and £10m employers' liability cover. Joinery and carpentry experience going back to 1988.",
  });
  faqPool.push({
    name: `Do you provide free quotes${locationInText}?`,
    text: location
      ? `Yes — I provide professional, no-obligation quotes for ${lowerService} work across ${cleanLocationName} and surrounding areas. Get in touch to discuss your project.`
      : `Yes — I provide professional, no-obligation quotes for all joinery work. Get in touch to discuss your project.`,
  });
  faqPool.push({
    name: `How long does a typical job take${locationInText}?`,
    text: `Project time varies with scope — a small repair or single-door job can be a day, a full kitchen or larger build runs one to three weeks. I'll give you a realistic timeline with the quote, not a best-case guess.`,
  });
  faqPool.push({
    name: `What payment methods do you accept?`,
    text: "Bank transfer and cash are both fine. I'm VAT registered so a proper invoice is issued for every job. No deposits required for standard work — materials for larger jobs may be billed separately up front.",
  });

  // Pick 4 FAQs deterministically from the pool, offset by variantHash so
  // different pages show different subsets.
  const faqCount = Math.min(4, faqPool.length);
  const pickedFaqs: typeof faqPool = [];
  const seen = new Set<number>();
  for (let i = 0; i < faqPool.length && pickedFaqs.length < faqCount; i++) {
    const idx = (variantHash + i * 3) % faqPool.length;
    if (seen.has(idx)) continue;
    seen.add(idx);
    pickedFaqs.push(faqPool[idx]);
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pickedFaqs.map((f) => ({
      "@type": "Question",
      "name": f.name,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.text,
      },
    })),
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