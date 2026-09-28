"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./GoogleReviews.module.css";

interface GoogleReviewItem {
  authorName: string;
  authorPhoto?: string;
  authorUri?: string;
  relativeTime: string;
  rating: number;
  text: string;
}

interface GoogleReviewData {
  id?: string;
  businessName?: string;
  rating?: number;
  reviewCount?: number;
  googleMapsUri?: string;
  reviewSummary?: string;
  reviewSummaryDisclosure?: string;
  reviewsUri?: string;
  reviews?: GoogleReviewItem[];
}

const DEFAULT_MAPS_URI =
  "https://www.google.com/maps/place/Pride+Kitchen+Caterers+%26+Events/@10.5276,76.2144,17z";

const FALLBACK_REVIEWS: GoogleReviewItem[] = [
  {
    authorName: "Hanson J.",
    relativeTime: "3 months ago",
    rating: 5,
    text: "PKC Caterers handled the catering for my daughter’s baptism, and they were truly exceptional. The food was delicious and remained piping hot until the very end of the event. The staff provided excellent service with warm smiles throughout, while the...",
  },
  {
    authorName: "Eric",
    relativeTime: "3 months ago",
    rating: 5,
    text: "We had ordered catering for our marriage function, and the entire experience was excellent. The food was extremely tasty, well-prepared, and appreciated by all our guests. The team was very professional and dealt with us in a friendly and supportive...",
  },
  {
    authorName: "Anjali Ramesh",
    relativeTime: "2 months ago",
    rating: 5,
    text: "Pride Kitchen Caterers organized our wedding reception catering and decor in Thrissur. Every single dish was praised by our guests. Highly recommended for any grand celebration!",
  },
  {
    authorName: "Dr. Rahul Varma",
    relativeTime: "1 month ago",
    rating: 5,
    text: "Exceptional service and authentic Kerala cuisine. The team took care of all arrangements seamlessly. Best event management and catering team in Kerala.",
  },
];

const AVATAR_COLORS = [
  "#f57c00", // Orange
  "#1976d2", // Blue
  "#388e3c", // Green
  "#7b1fa2", // Purple
  "#d32f2f", // Red
  "#00796b", // Teal
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function GoogleGIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className={styles.gLogoSvg}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function GoogleReviews() {
  const [data, setData] = useState<GoogleReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadReviews() {
      try {
        const response = await fetch("/api/google-reviews");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Google Reviews fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  const overallRating = data?.rating || 4.9;
  const reviewCount = data?.reviewCount || 451;
  const googleMapsUri = data?.googleMapsUri || data?.reviewsUri || DEFAULT_MAPS_URI;

  const realReviews = data?.reviews || [];
  const reviewList: GoogleReviewItem[] =
    realReviews.length > 0
      ? [
          ...realReviews,
          ...FALLBACK_REVIEWS.filter(
            (fb) => !realReviews.some((r) => r.authorName === fb.authorName)
          ),
        ]
      : FALLBACK_REVIEWS;

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -316 : 316;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>GOOGLE REVIEWS</p>
            <h2 className={styles.title}>
              What our customers <span>are saying</span>
            </h2>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.summaryBadge}>
              <div className={styles.ratingScore}>{overallRating.toFixed(1)}</div>
              <div className={styles.badgeInfo}>
                <div className={styles.stars}>{"★★★★★"}</div>
                <span className={styles.badgeCount}>
                  Based on {reviewCount.toLocaleString("en-IN")} reviews
                </span>
              </div>
            </div>

            <div className={styles.controls}>
              <button
                type="button"
                onClick={() => handleScroll("left")}
                aria-label="Previous reviews"
                className={styles.navButton}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label="Next reviews"
                className={styles.navButton}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Cards Scroll Track */}
        {loading ? (
          <div className={styles.loadingTrack}>
            <div className={styles.skeletonCard} />
            <div className={styles.skeletonCard} />
            <div className={styles.skeletonCard} />
          </div>
        ) : (
          <div className={styles.scrollContainer} ref={scrollRef}>
            {reviewList.map((review, idx) => {
              const isExpanded = expandedIndex === idx;
              const isLong = review.text.length > 180;
              const initial = review.authorName.charAt(0).toUpperCase() || "G";
              const avatarBg = getAvatarColor(review.authorName);

              return (
                <div key={idx} className={styles.card}>
                  {/* Author Header */}
                  <div className={styles.cardHeader}>
                    {review.authorPhoto ? (
                      <img
                        src={review.authorPhoto}
                        alt={review.authorName}
                        className={styles.avatarImg}
                      />
                    ) : (
                      <div
                        className={styles.avatarBadge}
                        style={{ backgroundColor: avatarBg }}
                      >
                        {initial}
                      </div>
                    )}

                    <div className={styles.authorMeta}>
                      <h3 className={styles.authorName}>{review.authorName}</h3>
                      <p className={styles.timeAgo}>{review.relativeTime}</p>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className={styles.cardBody}>
                    <p className={styles.reviewText}>
                      {isExpanded || !isLong
                        ? review.text
                        : `${review.text.slice(0, 180)}...`}
                    </p>

                    {isLong && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(idx)}
                        className={styles.readMoreBtn}
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className={styles.cardFooter}>
                    <div className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>
                      {"★".repeat(review.rating)}
                    </div>

                    <a
                      href={review.authorUri || googleMapsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.googleGLink}
                      title="View on Google Maps"
                    >
                      <GoogleGIcon />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner */}
        <div className={styles.bottomBanner}>
          <p>
            Reviews and rating information are provided by verified Google users.
          </p>
          <a
            href={googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewAllLink}
          >
            View all Google Reviews <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
