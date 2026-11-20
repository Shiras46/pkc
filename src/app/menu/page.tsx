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
                "name": "Wedding Reception"
            },
            {
                "@type": "MenuSection",
                "name": "Hindu Wedding Sadhya (soon)"
            },
            {
                "@type": "MenuSection",
                "name": "Christian Wedding (soon)"
            },
            {
                "@type": "MenuSection",
                "name": "Nikah Wedding (soon)"
            },
            {
                "@type": "MenuSection",
                "name": "Wedding Dinner (soon)"
            },
            {
                "@type": "MenuSection",
                "name": "Haldi Ceremony (soon)"
            },
            {
                "@type": "MenuSection",
                "name": "Sangeet Ceremony (soon)"
            },
            {
                "@type": "MenuSection",
                "name": "Birthday Celebration (soon)"
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
