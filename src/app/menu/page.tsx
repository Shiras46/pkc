import { Metadata } from "next";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
    title: "Catering Menu Selection | 32 Pages of Royal Delicacies | PKC Events Kerala",
    description: "Explore and curate your custom event menu across 32 pages of authentic Kerala catering delicacies: welcome drinks, starters, dum biryani, live counters, grand sadhya, and desserts by Pride Kitchen Caterers & Events.",
    alternates: {
        canonical: "https://pkcevents.com/menu"
    },
    openGraph: {
        title: "Catering Menu Selection | 32 Pages of Royal Delicacies | PKC Events Kerala",
        description: "Explore and curate your custom event menu across 32 pages of authentic Kerala catering delicacies: welcome drinks, starters, dum biryani, live counters, grand sadhya, and desserts by Pride Kitchen Caterers & Events.",
        url: "https://pkcevents.com/menu",
        images: [{ url: "https://pkcevents.com/image/services/catering.webp", width: 1200, height: 800, alt: "PKC Events Catering Menu" }],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Catering Menu Selection | 32 Pages of Royal Delicacies | PKC Events Kerala",
        description: "Explore and curate your custom event menu across 32 pages of authentic Kerala catering delicacies: welcome drinks, starters, dum biryani, live counters, grand sadhya, and desserts by Pride Kitchen Caterers & Events.",
        images: ["https://pkcevents.com/image/services/catering.webp"]
    }
};

export default function MenuPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": "Pride Kitchen Caterers & Events Catering Menu",
        "description": "Comprehensive 32-page event catering menu including live welcome drinks, starters, dum biryanis, seafood specialties, live food counters, and authentic Kerala Sadhya.",
        "url": "https://pkcevents.com/menu",
        "hasMenuSection": [
            {
                "@type": "MenuSection",
                "name": "Welcome Drinks & Mocktails"
            },
            {
                "@type": "MenuSection",
                "name": "Starters & Appetizers"
            },
            {
                "@type": "MenuSection",
                "name": "Biryani & Fragrant Pulao"
            },
            {
                "@type": "MenuSection",
                "name": "Coastal Seafood Specials"
            },
            {
                "@type": "MenuSection",
                "name": "Live Food Counters & Thattu Kada"
            },
            {
                "@type": "MenuSection",
                "name": "Grand Kerala Sadhya"
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <MenuClient />
        </>
    );
}
