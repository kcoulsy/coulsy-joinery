// src/pages/api/reviews.ts
import type { APIRoute } from "astro";

const API_KEY = import.meta.env.GOOGLE_API_KEY; // secure this in your .env file
const PLACE_ID = "ChIJ-cM-AEtIeUgRiwUaaopTiaQ";


export const GET: APIRoute = async () => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok || !data.result) {
    return new Response("Failed to fetch reviews", { status: 500 });
  }

  const reviews = data.result.reviews.slice(0, 5); // limit to 5

  return new Response(JSON.stringify(reviews), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

console.log("API KEY:", API_KEY);