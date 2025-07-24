import { getCollection } from 'astro:content';

// Enhanced location interface for better SEO
export interface EnhancedLocation {
  slug: string;
  title: string;
  description: string;
  location: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  services: string[];
  areas: string[];
  phone: string;
  testimonials: string;
  distance?: number;
}

// Haversine distance calculation
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) ** 2;
  return 3958.8 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Get all locations with enhanced data from JSON files
export async function getAllLocations(): Promise<EnhancedLocation[]> {
  try {
    const locations = await getCollection('locations');
    return locations.map(entry => ({
      ...entry.data,
      slug: entry.id
    }));
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

// Legacy wrapper for backward compatibility
export function getNearbyLocations(
  location?: string,
  radius = 30
): Promise<EnhancedLocation[]> {
  return getNearbyLocationsAsync(location || "york", radius);
}

// Get nearby locations with distance calculation and SEO optimization
export async function getNearbyLocationsAsync(
  centerLocation: string | { lat: number; lng: number },
  radius: number = 30,
  serviceFilter?: string
): Promise<EnhancedLocation[]> {
  const allLocations = await getAllLocations();
  
  let centerLat: number, centerLng: number;
  
  if (typeof centerLocation === 'string') {
    const center = allLocations.find(loc => loc.slug === centerLocation);
    if (!center) return [];
    centerLat = center.coordinates.lat;
    centerLng = center.coordinates.lng;
  } else {
    centerLat = centerLocation.lat;
    centerLng = centerLocation.lng;
  }

  return allLocations
    .map(location => ({
      ...location,
      distance: haversineDistance(centerLat, centerLng, location.coordinates.lat, location.coordinates.lng)
    }))
    .filter(location => {
      const withinRadius = location.distance! <= radius;
      const hasService = serviceFilter ? location.services.includes(serviceFilter) : true;
      return withinRadius && hasService;
    })
    .sort((a, b) => a.distance! - b.distance!);
}

// Get optimized nearby locations for internal linking and SEO
export async function getOptimizedNearbyLocations(
  locationSlug: string,
  serviceSlug?: string,
  maxResults: number = 12
): Promise<EnhancedLocation[]> {
  const nearby = await getNearbyLocationsAsync(locationSlug, 30, serviceSlug);
  
  // Prioritize locations with the same service for better SEO
  const prioritized = nearby.sort((a, b) => {
    const aHasService = serviceSlug ? a.services.includes(serviceSlug) : true;
    const bHasService = serviceSlug ? b.services.includes(serviceSlug) : true;
    
    if (aHasService && !bHasService) return -1;
    if (!aHasService && bHasService) return 1;
    
    return a.distance! - b.distance!;
  });

  return prioritized.slice(0, maxResults);
}

// Get locations for a specific service (for service pages)
export async function getLocationsForService(serviceSlug: string): Promise<EnhancedLocation[]> {
  const allLocations = await getAllLocations();
  return allLocations.filter(location => 
    location.services.includes(serviceSlug)
  );
}

// Generate location-specific SEO data
export async function generateLocationSEO(
  locationSlug: string,
  serviceSlug?: string
): Promise<{
  title: string;
  description: string;
  structuredData: any;
}> {
  const locations = await getAllLocations();
  const location = locations.find(loc => loc.slug === locationSlug);
  
  if (!location) {
    throw new Error(`Location ${locationSlug} not found`);
  }

  const services = await getCollection('services');
  const service = serviceSlug ? services.find(s => s.data.slug === serviceSlug) : null;

  const title = service 
    ? `${service.data.title} in ${location.location}, ${location.region} | Coulsy Joinery`
    : `Joinery Services in ${location.location}, ${location.region} | Coulsy Joinery`;

  const description = service
    ? `Professional ${service.data.title.toLowerCase()} services in ${location.location}, ${location.region}. Over 30 years' experience. Free quotes and local expertise.`
    : `Trusted joinery services in ${location.location}, ${location.region}. From kitchens to heritage restoration. Over 30 years' experience. Free quotes.`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Coulsy Joinery",
    "description": description,
    "url": `https://coulsyjoinery.co.uk/joinery-services/${locationSlug}${serviceSlug ? `-${serviceSlug}` : ''}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.location,
      "addressRegion": location.region,
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.coordinates.lat,
      "longitude": location.coordinates.lng
    },
    "areaServed": {
      "@type": "City",
      "name": location.location
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": location.coordinates.lat,
        "longitude": location.coordinates.lng
      },
      "geoRadius": "50000"
    }
  };

  return { title, description, structuredData };
}