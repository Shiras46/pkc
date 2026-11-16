import { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
    title: "Portfolio | Luxury Weddings & Event Management Kerala | PKC Events",
    description: "Explore the signature portfolio of Pride Kitchen Caterers & Events. Showcasing luxury weddings, bespoke stage decors, royal banquets, and corporate galas across Thrissur, Kochi, and Kerala.",
    alternates: {
        canonical: "https://pkcevents.com/portfolio"
    },
    openGraph: {
        title: "Portfolio | Luxury Weddings & Event Management Kerala | PKC Events",
        description: "Explore the signature portfolio of Pride Kitchen Caterers & Events. Showcasing luxury weddings, bespoke stage decors, royal banquets, and corporate galas across Thrissur, Kochi, and Kerala.",
        url: "https://pkcevents.com/portfolio",
        images: [{ url: "https://pkcevents.com/image/hero1.webp", width: 1200, height: 800, alt: "PKC Events Signature Portfolio" }],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Portfolio | Luxury Weddings & Event Management Kerala | PKC Events",
        description: "Explore the signature portfolio of Pride Kitchen Caterers & Events. Showcasing luxury weddings, bespoke stage decors, royal banquets, and corporate galas across Thrissur, Kochi, and Kerala.",
        images: ["https://pkcevents.com/image/hero1.webp"]
    }
};

export default function PortfolioPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "PKC Events Signature Portfolio",
        "description": "Showcase of luxury weddings, corporate galas, and catering banquets by Pride Kitchen Caterers & Events in Kerala.",
        "url": "https://pkcevents.com/portfolio",
        "publisher": {
            "@type": "Organization",
            "name": "Pride Kitchen Caterers & Events",
            "url": "https://pkcevents.com",
            "logo": "https://pkcevents.com/logo.png"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PortfolioClient />
        </>
    );
}

