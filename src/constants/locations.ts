export const LOCATIONS = [
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

export const NEARBY_LOCATIONS: Record<string, string[]> = {
  default: [
    "york",
    "leeds",
    "harrogate",
    "wetherby",
    "linton",
    "boston-spa",
    "collingham",
    "spofforth",
    "bramham",
  ],
  aberford: [
    "boston-spa",
    "tadcaster",
    "linton",
    "leeds",
    "collingham",
    "barwick-in-elmet",
    "monk-fryston",
  ],
  alwoodley: [
    "scarcroft",
    "harewood",
    "leeds",
    "shadwell",
    "moortown",
    "roundhay",
    "chapel-allerton",
  ],
  bardsey: [
    "collingham",
    "east-keswick",
    "scarcroft",
    "thorner",
    "shadwell",
    "wetherby",
  ],
  castleford: [
    "pontefract",
    "garforth",
    "rothwell",
    "normanton",
    "knottingley",
    "altofts",
    "featherstone",
  ],
  clifford: ["boston-spa", "bramham", "thorp-arch"],
  "east-keswick": ["bardsey", "collingham", "scarcroft"],
  scarcroft: ["alwoodley", "bardsey", "east-keswick"],
  pontefract: ["castleford", "rothwell", "wakefield"],
  wakefield: [
    "rothwell",
    "castleford",
    "pontefract",
    "horbury",
    "ossett",
    "normanton",
    "knottingley",
  ],
  walton: ["thorp-arch", "wetherby", "tadcaster"],
  leeds: [
    "york",
    "harrogate",
    "knaresborough",
    "garforth",
    "rothwell",
    "horsforth",
    "ilkley",
    "otley",
    "wetherby",
  ],
  york: [
    "selby",
    "malton",
    "tadcaster",
    "pocklington",
    "elvington",
    "welburn",
    "stamford-bridge",
    "towton",
    "wetherby",
    "leeds",
  ],
  ripon: ["thirsk", "masham", "boroughbridge", "leeds", "york"],
  harrogate: ["knaresborough", "spofforth", "pannal", "ripley", "follifoot"],
  knaresborough: ["harrogate", "ripley", "follifoot", "york"],
  wetherby: ["leeds", "boston-spa", "tadcaster", "bramham", "collingham"],
  selby: ["york", "tadcaster", "goole", "howden"],
  malton: ["york", "pocklington", "norton", "pickering"],
  ilkley: ["otley", "keighley", "skipton", "menston"],
};

const EARTH_RADIUS_MILES = 3958.8;

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) ** 2;

  return EARTH_RADIUS_MILES * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getLocationsWithinRadius(
  centerLat: number,
  centerLng: number,
  radiusMiles: number
): string[] {
  return LOCATIONS.filter(({ lat, lng }) => {
    const distance = haversineDistance(centerLat, centerLng, lat, lng);
    return distance <= radiusMiles;
  }).map(({ slug }) => slug);
}