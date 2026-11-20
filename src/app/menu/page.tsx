import { Metadata } from "next";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
    title: "Catering Menu Portfolio | Signature Kerala Feasts & Banquets | PKC Events",
    description: "Explore our curated catering menu portfolio: royal Malabar Dum Biryani, 32-course Travancore Sadhya, coastal Arabian seafood spreads, and artisanal live food stations by Pride Kitchen Caterers in Kerala.",
    alternates: {
        canonical: "https://pkcevents.com/menu"
    },
    openGraph: {
        title: "Catering Menu Portfolio | Signature Kerala Feasts & Banquets | PKC Events",
        description: "Explore our curated catering menu portfolio: royal Malabar Dum Biryani, 32-course Travancore Sadhya, coastal Arabian seafood spreads, and artisanal live food stations by Pride Kitchen Caterers in Kerala.",
        url: "https://pkcevents.com/menu",
        images: [{ url: "https://pkcevents.com/image/services/catering.webp", width: 1200, height: 800, alt: "PKC Events Catering Menu Portfolio" }],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Catering Menu Portfolio | Signature Kerala Feasts & Banquets | PKC Events",
        description: "Explore our curated catering menu portfolio: royal Malabar Dum Biryani, 32-course Travancore Sadhya, coastal Arabian seafood spreads, and artisanal live food stations by Pride Kitchen Caterers in Kerala.",
        images: ["https://pkcevents.com/image/services/catering.webp"]
    }
};

export default function MenuPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": "Pride Kitchen Caterers & Events Signature Menu Portfolio",
        "description": "Curated royal wedding feasts, authentic 32-course Travancore sadhyas, Malabar dum biryanis, and live food counters across Kerala.",
        "url": "https://pkcevents.com/menu",
        "hasMenuSection": [
            {
                "@type": "MenuSection",
                "name": "The Royal Malabar Dum Biryani Feast"
            },
            {
                "@type": "MenuSection",
                "name": "Grand Travancore 32-Course Royal Sadhya"
            },
            {
                "@type": "MenuSection",
                "name": "The Majestic Grand Reception Buffet"
            },
            {
                "@type": "MenuSection",
                "name": "Vibrant Thattu Kada & Kerala Live Street Food"
            },
            {
                "@type": "MenuSection",
                "name": "Contemporary Pan-Asian & Continental Spread"
            },
            {
                "@type": "MenuSection",
                "name": "Royal Mughlai & Nawabi Heritage Feast"
            },
            {
                "@type": "MenuSection",
                "name": "Royal Coastal Arabian & Seafood Extravaganza"
            },
            {
                "@type": "MenuSection",
                "name": "Artisanal Dessert & Gourmet Payasam Studio"
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
