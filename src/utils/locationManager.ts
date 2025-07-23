import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// Enhanced location interface
export interface EnhancedLocation {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  county: string;
  region: string;
  population?: number;
  services: string[];
  nearbyLocations: string[];
  seoTitle?: string;
  seoDescription?: string;
  distance?: number;
}

// Service area interface
export interface ServiceArea {
  service: string;
  locations: string[];
  radius: number; // in miles
  featured: boolean;
}

// Haversine distance calculation (keeping existing logic)
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

// Get all locations with enhanced data
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

// Get nearby locations with distance calculation
export async function getNearbyLocations(
  centerLocation: string | { lat: number; lng: number },
  radius: number = 30,
  serviceFilter?: string
): Promise<EnhancedLocation[]> {
  const allLocations = await getAllLocations();
  
  let centerLat: number, centerLng: number;
  
  if (typeof centerLocation === 'string') {
    const center = allLocations.find(loc => loc.slug === centerLocation);
    if (!center) return [];
    centerLat = center.lat;
    centerLng = center.lng;
  } else {
    centerLat = centerLocation.lat;
    centerLng = centerLocation.lng;
  }

  return allLocations
    .map(location => ({
      ...location,
      distance: haversineDistance(centerLat, centerLng, location.lat, location.lng)
    }))
    .filter(location => {
      const withinRadius = location.distance! <= radius;
      const hasService = serviceFilter ? location.services.includes(serviceFilter) : true;
      return withinRadius && hasService;
    })
    .sort((a, b) => a.distance! - b.distance!);
}

// Get locations for a specific service
export async function getLocationsForService(serviceSlug: string): Promise<EnhancedLocation[]> {
  const allLocations = await getAllLocations();
  return allLocations.filter(location => 
    location.services.includes(serviceSlug)
  );
}

// Get service areas with optimized radius
export async function getServiceAreas(): Promise<ServiceArea[]> {
  const services = await getCollection('services');
  
  return services.map(service => ({
    service: service.data.slug,
    locations: service.data.serviceAreas,
    radius: getServiceRadius(service.data.category),
    featured: service.data.featured
  }));
}

// Dynamic service radius based on category
function getServiceRadius(category: string): number {
  const radiusMap = {
    'domestic': 25,    // Local domestic work
    'commercial': 50,  // Wider commercial reach
    'heritage': 100,   // Specialist heritage work
    'specialist': 75   // Specialist services
  };
  return radiusMap[category as keyof typeof radiusMap] || 30;
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
    ? `${service.data.title} in ${location.name}, ${location.county} | Coulsy Joinery`
    : `Joinery Services in ${location.name}, ${location.county} | Coulsy Joinery`;

  const description = service
    ? `Professional ${service.data.title.toLowerCase()} services in ${location.name}, ${location.county}. Over 30 years' experience. Free quotes and local expertise.`
    : `Trusted joinery services in ${location.name}, ${location.county}. From kitchens to heritage restoration. Over 30 years' experience. Free quotes.`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Coulsy Joinery",
    "description": description,
    "url": `https://coulsyjoinery.co.uk/joinery-services/${locationSlug}${serviceSlug ? `-${serviceSlug}` : ''}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.name,
      "addressRegion": location.county,
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.lat,
      "longitude": location.lng
    },
    "areaServed": {
      "@type": "City",
      "name": location.name
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": location.lat,
        "longitude": location.lng
      },
      "geoRadius": "50000"
    }
  };

  return { title, description, structuredData };
}

// Get optimized nearby locations for internal linking
export async function getOptimizedNearbyLocations(
  locationSlug: string,
  serviceSlug?: string,
  maxResults: number = 12
): Promise<EnhancedLocation[]> {
  const nearby = await getNearbyLocations(locationSlug, 30, serviceSlug);
  
  // Prioritize locations with the same service
  const prioritized = nearby.sort((a, b) => {
    const aHasService = serviceSlug ? a.services.includes(serviceSlug) : true;
    const bHasService = serviceSlug ? b.services.includes(serviceSlug) : true;
    
    if (aHasService && !bHasService) return -1;
    if (!aHasService && bHasService) return 1;
    
    return a.distance! - b.distance!;
  });

  return prioritized.slice(0, maxResults);
} 