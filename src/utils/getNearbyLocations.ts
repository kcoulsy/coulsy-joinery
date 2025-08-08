import { LOCATIONS, NEARBY_LOCATIONS } from "../constants/locations";

const BASE_LAT = 53.9655;
const BASE_LNG = -1.205;

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

export function getNearbyLocations(location?: string, radius = 30) {
  // Get all locations with their distances from base, excluding "yorkshire" (county)
  const allLocationsWithDistance = LOCATIONS
    .filter((loc) => loc.slug !== "yorkshire") // Exclude Yorkshire county
    .map((loc) => ({
      slug: loc.slug,
      distance: haversineDistance(BASE_LAT, BASE_LNG, loc.lat, loc.lng),
    }))
    .filter(({ slug, distance }) => slug !== location && distance <= radius)
    .sort((a, b) => a.distance - b.distance);

  // If we have a curated list for this location, prioritize those locations
  const curated = location && NEARBY_LOCATIONS[location]
    ? NEARBY_LOCATIONS[location]
    : NEARBY_LOCATIONS.default;

  if (curated && curated.length > 0) {
    // Get curated locations that are within radius (excluding yorkshire)
    const curatedLocations = allLocationsWithDistance
      .filter(({ slug }) => curated.includes(slug) && slug !== "yorkshire")
      .slice(0, 6); // Take up to 6 from curated list

    // Get additional locations from the full list to fill up to 8
    const remainingSlots = 8 - curatedLocations.length;
    const additionalLocations = allLocationsWithDistance
      .filter(({ slug }) => !curated.includes(slug) && slug !== "yorkshire")
      .slice(0, remainingSlots);

    return [...curatedLocations, ...additionalLocations];
  }

  // If no curated list, just return the closest locations within radius
  return allLocationsWithDistance.slice(0, 8);
}