// src/pages/api/reviews.ts
import type { APIRoute } from "astro";

const API_KEY = import.meta.env.GOOGLE_API_KEY; // secure this in your .env file
// const PLACE_ID = "ChIJ-cM-AEtIeUgRiwUaaopTiaQ";
const PLACE_ID = "ChIJFREqq2Poe0gRFoS-2A2H_cg";

export const GET: APIRoute = async () => {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=id,displayName,formattedAddress,rating,userRatingCount,reviews&key=${API_KEY}`;

  const res = await fetch(url, {
    headers: {
      "X-Goog-FieldMask":
        "id,displayName,formattedAddress,rating,userRatingCount,reviews",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return new Response(`Failed to fetch reviews: ${res.statusText}`, {
      status: 500,
    });
  }

  if (!data.reviews) {
    return new Response("No reviews found for this place", { status: 404 });
  }

  // Transform the reviews into a cleaner format
  const formattedReviews = data.reviews.map((review: any) => ({
    author: review.authorAttribution.displayName,
    authorPhoto: review.authorAttribution.photoUri,
    rating: review.rating,
    text: review.text.text,
    relativeTime: review.relativePublishTimeDescription,
    publishTime: review.publishTime,
  }));

  return new Response(
    JSON.stringify({
      placeName: data.displayName.text,
      rating: data.rating,
      totalReviews: data.userRatingCount,
      reviews: formattedReviews,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

console.log("API KEY:", API_KEY);
