import { LOCATIONS, NEARBY_LOCATIONS } from "../constants/locations";

const BASE_LAT = 53.9655;
const BASE_LNG = -1.205;

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lat2 - lat1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) ** 2;
  return 3958.8 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getNearbyLocations(location?: string, radius = 30) {
  const curated = location && NEARBY_LOCATIONS[location]
    ? NEARBY_LOCATIONS[location]
    : NEARBY_LOCATIONS.default;

  return LOCATIONS
    .filter((loc) => curated.includes(loc.slug))
    .map((loc) => ({
      slug: loc.slug,
      distance: haversineDistance(BASE_LAT, BASE_LNG, loc.lat, loc.lng),
    }))
    .filter(({ slug, distance }) => slug !== location && distance <= radius);
}