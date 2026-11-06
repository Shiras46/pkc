import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const PLACE_ID = "ChIJGVe_upjvpzsRYayTga1YA54";

const FALLBACK_REVIEWS = [
  {
    authorName: "Dr. Rahul Varma",
    authorPhoto: "",
    authorUri: "https://www.google.com/maps/place/Pride+Kitchen+Caterers+%26+Events/@10.5276,76.2144,17z",
    relativeTime: "1 month ago",
    rating: 5,
    text: "Exceptional service and authentic Kerala cuisine. The team took care of all arrangements seamlessly. Best event management and catering team in Kerala.",
    publishTime: "2026-10-06T10:00:00Z",
  },
  {
    authorName: "Anjali Ramesh",
    authorPhoto: "",
    authorUri: "https://www.google.com/maps/place/Pride+Kitchen+Caterers+%26+Events/@10.5276,76.2144,17z",
    relativeTime: "2 months ago",
    rating: 5,
    text: "Pride Kitchen Caterers organized our wedding reception catering and decor in Thrissur. Every single dish was praised by our guests. Highly recommended for any grand celebration!",
    publishTime: "2026-09-06T10:00:00Z",
  },
  {
    authorName: "Eric",
    authorPhoto: "",
    authorUri: "https://www.google.com/maps/place/Pride+Kitchen+Caterers+%26+Events/@10.5276,76.2144,17z",
    relativeTime: "3 months ago",
    rating: 5,
    text: "We had ordered catering for our marriage function, and the entire experience was excellent. The food was extremely tasty, well-prepared, and appreciated by all our guests. The team was very professional and dealt with us in a friendly and supportive...",
    publishTime: "2026-08-06T10:00:00Z",
  },
  {
    authorName: "Hanson J.",
    authorPhoto: "",
    authorUri: "https://www.google.com/maps/place/Pride+Kitchen+Caterers+%26+Events/@10.5276,76.2144,17z",
    relativeTime: "3 months ago",
    rating: 5,
    text: "PKC Caterers handled the catering for my daughter’s baptism, and they were truly exceptional. The food was delicious and remained piping hot until the very end of the event. The staff provided excellent service with warm smiles throughout, while the...",
    publishTime: "2026-08-01T10:00:00Z",
  },
];

function parseRelativeTimeToDays(relativeTime: string): number {
  if (!relativeTime) return 9999;
  const lower = relativeTime.toLowerCase().trim();
  if (lower.includes("just now") || lower.includes("today")) return 0;
  if (lower.includes("yesterday")) return 1;

  const match = lower.match(/(\d+)\s*(minute|hour|day|week|month|year)/);
  if (match) {
    const count = parseInt(match[1], 10);
    const unit = match[2];
    if (unit.startsWith("minute") || unit.startsWith("hour")) return 0.5;
    if (unit.startsWith("day")) return count;
    if (unit.startsWith("week")) return count * 7;
    if (unit.startsWith("month")) return count * 30;
    if (unit.startsWith("year")) return count * 365;
  }

  if (lower.includes("a day ago")) return 1;
  if (lower.includes("a week ago")) return 7;
  if (lower.includes("a month ago")) return 30;
  if (lower.includes("a year ago")) return 365;

  return 9999;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${PLACE_ID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask":
              "id,displayName,rating,userRatingCount,googleMapsUri,reviewSummary,reviews",
          },
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (response.ok && Array.isArray(data.reviews) && data.reviews.length > 0) {
        // Sort reviews fetched from Google so the latest review is first
        const sortedReviews = data.reviews
          .map((r: any) => ({
            authorName: r.authorAttribution?.displayName ?? "Google User",
            authorPhoto: r.authorAttribution?.photoUri ?? "",
            authorUri: r.authorAttribution?.uri ?? data.googleMapsUri ?? "",
            relativeTime: r.relativePublishTimeDescription ?? "",
            rating: r.rating ?? 5,
            text: r.text?.text ?? r.originalText?.text ?? "",
            publishTime: r.publishTime ?? "",
          }))
          .sort((a: any, b: any) => {
            if (a.publishTime && b.publishTime) {
              return new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime();
            }
            return parseRelativeTimeToDays(a.relativeTime) - parseRelativeTimeToDays(b.relativeTime);
          });

        return NextResponse.json({
          id: data.id,
          businessName:
            data.displayName?.text ?? "Pride Kitchen Caterers & Events",
          rating: data.rating ?? 4.9,
          reviewCount: data.userRatingCount ?? 451,
          googleMapsUri: data.googleMapsUri ?? "",
          reviewSummary: data.reviewSummary?.text?.text ?? "",
          reviewSummaryDisclosure:
            data.reviewSummary?.disclosureText?.text ?? "",
          reviewsUri: data.reviewSummary?.reviewsUri ?? "",
          reviews: sortedReviews,
          source: "google_live",
        });
      } else {
        if (!response.ok) {
          console.warn("Google Places API error response:", data?.error?.message || data);
        }
      }
    } catch (error) {
      console.error("Google Places API fetch error:", error);
    }
  }

  // Gracefully fallback to sorted reviews (latest first)
  return NextResponse.json({
    businessName: "Pride Kitchen Caterers & Events",
    rating: 4.9,
    reviewCount: 451,
    googleMapsUri: "https://www.google.com/maps/place/Pride+Kitchen+Caterers+%26+Events/@10.5276,76.2144,17z",
    reviews: FALLBACK_REVIEWS,
    source: "fallback",
  });
}
