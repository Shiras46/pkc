import { NextResponse } from "next/server";

const PLACE_ID = "ChIJGVe_upjvpzsRYayTga1YA54";

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "GOOGLE_PLACES_API_KEY is missing",
        },
        { status: 500 }
      );
    }

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
        next: {
          revalidate: 3600,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Google Places API error:", data);

      return NextResponse.json(
        {
          error: "Google Places API request failed.",
          googleStatus: response.status,
          googleResponse: data,
        },
        { status: response.status }
      );
    }

    const reviews = Array.isArray(data.reviews)
      ? data.reviews
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
            return 0;
          })
      : [];

    return NextResponse.json({
      id: data.id,
      businessName:
        data.displayName?.text ?? "Pride Kitchen Caterers & Events",
      rating: data.rating ?? 0,
      reviewCount: data.userRatingCount ?? 0,
      googleMapsUri: data.googleMapsUri ?? "",
      reviewSummary: data.reviewSummary?.text?.text ?? "",
      reviewSummaryDisclosure:
        data.reviewSummary?.disclosureText?.text ?? "",
      reviewsUri: data.reviewSummary?.reviewsUri ?? "",
      reviews,
    });
  } catch (error) {
    console.error("Google Reviews API error:", error);

    return NextResponse.json(
      {
        error: "Unable to load Google review information.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
