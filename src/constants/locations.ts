export type LocationType = "city" | "market-town" | "town" | "suburb" | "village" | "region";

export interface Location {
  slug: string;
  lat: number;
  lng: number;
  postcode: string;
  type: LocationType;
  region: string;
}

export const LOCATIONS: Location[] = [
  { slug: "aberford", lat: 53.838, lng: -1.332, postcode: "LS25", type: "village", region: "West Yorkshire" },
  { slug: "alwoodley", lat: 53.859, lng: -1.542, postcode: "LS17", type: "suburb", region: "West Yorkshire" },
  { slug: "bardsey", lat: 53.881, lng: -1.459, postcode: "LS17", type: "village", region: "West Yorkshire" },
  { slug: "boston-spa", lat: 53.903, lng: -1.330, postcode: "LS23", type: "village", region: "West Yorkshire" },
  { slug: "boroughbridge", lat: 54.095, lng: -1.399, postcode: "YO51", type: "market-town", region: "North Yorkshire" },
  { slug: "bramham", lat: 53.892, lng: -1.372, postcode: "LS23", type: "village", region: "West Yorkshire" },
  { slug: "castleford", lat: 53.724, lng: -1.354, postcode: "WF10", type: "town", region: "West Yorkshire" },
  { slug: "clifford", lat: 53.899, lng: -1.378, postcode: "LS23", type: "village", region: "West Yorkshire" },
  { slug: "collingham", lat: 53.901, lng: -1.415, postcode: "LS22", type: "village", region: "West Yorkshire" },
  { slug: "east-keswick", lat: 53.892, lng: -1.468, postcode: "LS17", type: "village", region: "West Yorkshire" },
  { slug: "elvington", lat: 53.917, lng: -0.948, postcode: "YO41", type: "village", region: "North Yorkshire" },
  { slug: "follifoot", lat: 53.970, lng: -1.493, postcode: "HG3", type: "village", region: "North Yorkshire" },
  { slug: "garforth", lat: 53.791, lng: -1.381, postcode: "LS25", type: "suburb", region: "West Yorkshire" },
  { slug: "harewood", lat: 53.891, lng: -1.512, postcode: "LS17", type: "village", region: "West Yorkshire" },
  { slug: "harrogate", lat: 53.992, lng: -1.541, postcode: "HG1", type: "town", region: "North Yorkshire" },
  { slug: "horsforth", lat: 53.843, lng: -1.637, postcode: "LS18", type: "suburb", region: "West Yorkshire" },
  { slug: "ilkley", lat: 53.924, lng: -1.825, postcode: "LS29", type: "market-town", region: "West Yorkshire" },
  { slug: "knaresborough", lat: 54.009, lng: -1.465, postcode: "HG5", type: "market-town", region: "North Yorkshire" },
  { slug: "leeds", lat: 53.800, lng: -1.549, postcode: "LS1", type: "city", region: "West Yorkshire" },
  { slug: "linton", lat: 53.915, lng: -1.437, postcode: "LS22", type: "village", region: "West Yorkshire" },
  { slug: "malton", lat: 54.134, lng: -0.798, postcode: "YO17", type: "market-town", region: "North Yorkshire" },
  { slug: "masham", lat: 54.222, lng: -1.656, postcode: "HG4", type: "market-town", region: "North Yorkshire" },
  { slug: "otley", lat: 53.905, lng: -1.691, postcode: "LS21", type: "market-town", region: "West Yorkshire" },
  { slug: "pannal", lat: 53.964, lng: -1.537, postcode: "HG3", type: "village", region: "North Yorkshire" },
  { slug: "pocklington", lat: 53.930, lng: -0.780, postcode: "YO42", type: "market-town", region: "East Riding of Yorkshire" },
  { slug: "pontefract", lat: 53.693, lng: -1.312, postcode: "WF8", type: "market-town", region: "West Yorkshire" },
  { slug: "ripley", lat: 54.039, lng: -1.537, postcode: "HG3", type: "village", region: "North Yorkshire" },
  { slug: "ripon", lat: 54.137, lng: -1.521, postcode: "HG4", type: "city", region: "North Yorkshire" },
  { slug: "rothwell", lat: 53.752, lng: -1.478, postcode: "LS26", type: "suburb", region: "West Yorkshire" },
  { slug: "scarcroft", lat: 53.865, lng: -1.464, postcode: "LS14", type: "village", region: "West Yorkshire" },
  { slug: "selby", lat: 53.781, lng: -1.070, postcode: "YO8", type: "market-town", region: "North Yorkshire" },
  { slug: "spofforth", lat: 53.978, lng: -1.470, postcode: "HG3", type: "village", region: "North Yorkshire" },
  { slug: "stamford-bridge", lat: 54.017, lng: -0.909, postcode: "YO41", type: "village", region: "East Riding of Yorkshire" },
  { slug: "tadcaster", lat: 53.885, lng: -1.264, postcode: "LS24", type: "market-town", region: "North Yorkshire" },
  { slug: "thirsk", lat: 54.232, lng: -1.343, postcode: "YO7", type: "market-town", region: "North Yorkshire" },
  { slug: "thorp-arch", lat: 53.900, lng: -1.336, postcode: "LS23", type: "village", region: "West Yorkshire" },
  { slug: "towton", lat: 53.847, lng: -1.277, postcode: "LS24", type: "village", region: "North Yorkshire" },
  { slug: "wakefield", lat: 53.683, lng: -1.496, postcode: "WF1", type: "city", region: "West Yorkshire" },
  { slug: "walton", lat: 53.885, lng: -1.342, postcode: "LS23", type: "village", region: "West Yorkshire" },
  { slug: "wetherby", lat: 53.928, lng: -1.386, postcode: "LS22", type: "market-town", region: "West Yorkshire" },
  { slug: "welburn", lat: 54.111, lng: -0.864, postcode: "YO60", type: "village", region: "North Yorkshire" },
  { slug: "york", lat: 53.959, lng: -1.082, postcode: "YO1", type: "city", region: "North Yorkshire" },
  { slug: "yorkshire", lat: 53.957, lng: -1.082, postcode: "YO1", type: "region", region: "Yorkshire" },
  { slug: "barwick-in-elmet", lat: 53.827, lng: -1.411, postcode: "LS15", type: "village", region: "West Yorkshire" },
  { slug: "monk-fryston", lat: 53.757, lng: -1.231, postcode: "LS25", type: "village", region: "North Yorkshire" },
  { slug: "shadwell", lat: 53.848, lng: -1.469, postcode: "LS17", type: "suburb", region: "West Yorkshire" },
  { slug: "moortown", lat: 53.840, lng: -1.546, postcode: "LS17", type: "suburb", region: "West Yorkshire" },
  { slug: "roundhay", lat: 53.836, lng: -1.496, postcode: "LS8", type: "suburb", region: "West Yorkshire" },
  { slug: "chapel-allerton", lat: 53.829, lng: -1.535, postcode: "LS7", type: "suburb", region: "West Yorkshire" },
  { slug: "thorner", lat: 53.855, lng: -1.429, postcode: "LS14", type: "village", region: "West Yorkshire" },
  { slug: "normanton", lat: 53.698, lng: -1.419, postcode: "WF6", type: "town", region: "West Yorkshire" },
  { slug: "knottingley", lat: 53.705, lng: -1.252, postcode: "WF11", type: "town", region: "West Yorkshire" },
  { slug: "altofts", lat: 53.707, lng: -1.417, postcode: "WF6", type: "village", region: "West Yorkshire" },
  { slug: "featherstone", lat: 53.681, lng: -1.353, postcode: "WF7", type: "town", region: "West Yorkshire" },
  { slug: "horbury", lat: 53.659, lng: -1.571, postcode: "WF4", type: "town", region: "West Yorkshire" },
  { slug: "ossett", lat: 53.681, lng: -1.580, postcode: "WF5", type: "town", region: "West Yorkshire" }
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
  clifford: ["boston-spa", "bramham", "thorp-arch", "tadcaster"],
  "east-keswick": ["bardsey", "collingham", "scarcroft", "wetherby"],
  scarcroft: ["alwoodley", "bardsey", "east-keswick", "leeds"],
  pontefract: ["castleford", "rothwell", "wakefield", "normanton"],
  wakefield: [
    "rothwell",
    "castleford",
    "pontefract",
    "horbury",
    "ossett",
    "normanton",
    "knottingley",
  ],
  walton: ["thorp-arch", "wetherby", "tadcaster", "boston-spa"],
  leeds: [
    "york",
    "harrogate",
    "knaresborough",
    "garforth",
    "rothwell",
    "horsforth",
    "ilkley",
    "otley",
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
  ],
  ripon: ["thirsk", "masham", "boroughbridge", "knaresborough", "harrogate"],
  harrogate: ["knaresborough", "spofforth", "pannal", "ripley", "follifoot", "otley"],
  knaresborough: ["harrogate", "ripley", "follifoot", "pannal", "spofforth", "boroughbridge"],
  wetherby: ["leeds", "boston-spa", "tadcaster", "bramham", "collingham", "scarcroft"],
  selby: ["york", "tadcaster", "pocklington", "elvington"],
  malton: ["york", "pocklington", "elvington", "welburn", "stamford-bridge"],
  ilkley: ["otley", "harrogate", "horsforth", "leeds"],
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
