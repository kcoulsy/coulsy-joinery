import { LOCATIONS } from "../constants/locations";

export function capitalizeFirstLetter(str: string) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

export function getFormattedPageData(Astro: any): {
  formattedServiceName: string;
  locationFormated: string;
  locationInText: string;
  defaultDescription: string;
  businessSchema: any;
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


  const fallbackGeo = { lat: 53.9655, lng: -1.205 };
  const geo = LOCATIONS.find((l) => l.slug === location) ?? fallbackGeo;

  const defaultDescription = `Trusted local joiner offering bespoke joinery services ${locationInText.trim()}, including kitchens, staircases, windows, doors, and heritage woodwork. Over 30 years' experience. Free quotes across Yorkshire.`;

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://coulsyjoinery.co.uk/#business",
    name: "Coulsy Joinery",
    description: defaultDescription,
    url: `https://coulsyjoinery.co.uk/joinery-services/${location ? `${location}-${baseType}` : baseType}`,
    image: "https://coulsyjoinery.co.uk/images/logo.png",
    email: "robert@coulsy.co.uk",
    telephone: "+44 7544 030486",
    address: {
      "@type": "PostalAddress",
      addressLocality: locationFormated || "York",
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
      locationFormated || "York",
      "Leeds",
      "Wetherby",
      "Harrogate",
      "Yorkshire"
    ],
    hasMap: `https://www.google.com/maps?q=${geo.lat},${geo.lng}`,
    sameAs: [
      "https://www.linkedin.com/company/coulsy-limited/?viewAsMember=true",
      "https://www.facebook.com/coulsyjoinery/"
    ]
  };

  return {
    formattedServiceName,
    locationFormated,
    locationInText,
    defaultDescription,
    businessSchema,
  };
}