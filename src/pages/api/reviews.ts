// src/pages/api/reviews.ts
import type { APIRoute } from "astro";

const API_KEY = import.meta.env.GOOGLE_API_KEY;
const PLACE_ID = "ChIJFREqq2Poe0gRFoS-2A2H_cg";

export const GET: APIRoute = async () => {
  if (!API_KEY) {
    return new Response("Google API key not configured", { status: 500 });
  }

  try {
    // Use the legacy Google Places API endpoint which is more reliable
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&key=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Google Places API error:", res.status, errorText);
      return new Response(`Failed to fetch reviews: ${res.status} ${res.statusText}`, {
        status: res.status,
      });
    }

    const data = await res.json();

    if (data.status !== "OK") {
      console.error("Google Places API status error:", data.status, data.error_message);
      return new Response(JSON.stringify({
        error: true,
        message: `Google Places API error: ${data.status} - ${data.error_message || 'Unknown error'}`,
        status: data.status
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (!data.result || !data.result.reviews) {
      return new Response("No reviews found for this place", { status: 404 });
    }

    // Transform the reviews into a cleaner format
    const formattedReviews = data.result.reviews.map((review: any) => ({
      author: review.author_name || "Anonymous",
      authorPhoto: review.profile_photo_url || "",
      rating: review.rating || 0,
      text: review.text || "",
      relativeTime: review.relative_time_description || "",
      publishTime: review.time || "",
    }));

    return new Response(
      JSON.stringify({
        placeName: data.result.name || "Coulsy Joinery",
        rating: data.result.rating || 0,
        totalReviews: data.result.user_ratings_total || 0,
        reviews: formattedReviews,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in reviews API:", error);
    return new Response(`Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`, {
      status: 500,
    });
  }
};
