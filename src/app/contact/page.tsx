import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact Pride Kitchen Caterers & Events | Thrissur & Kochi',
    description: "Contact Pride Kitchen Caterers & Events for wedding catering, event management, venues, decoration and other services in Thrissur, Kochi and Kerala.",
    alternates: {
        canonical: 'https://pkcevents.com/contact'
    },
    openGraph: {
        title: 'Contact Pride Kitchen Caterers & Events | Thrissur & Kochi',
        description: "Contact Pride Kitchen Caterers & Events for wedding catering, event management, venues, decoration and other services in Thrissur, Kochi and Kerala.",
        url: 'https://pkcevents.com/contact',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'Pride Kitchen Logo' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Pride Kitchen Caterers & Events | Thrissur & Kochi',
        description: "Contact Pride Kitchen Caterers & Events for wedding catering, event management, venues, decoration and other services in Thrissur, Kochi and Kerala.",
        images: ['https://pkcevents.com/logo.png']
    }
};

export default function ContactPage() {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Pride Kitchen Caterers & Events (PKC Events)",
        "image": "https://pkcevents.com/logo.png",
        "@id": "https://pkcevents.com/contact#localbusiness",
        "url": "https://pkcevents.com/contact",
        "telephone": "+91 81380 02333",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Arammel Arcade, nr. Mannuthy - Madakkathara Road, Sree Lakshmi Nagar, Mannuthy",
            "addressLocality": "Thrissur",
            "addressRegion": "Kerala",
            "postalCode": "680651",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 10.529810892495914,
            "longitude": 76.24956181480084
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "09:00",
            "closes": "21:00"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "245"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <ContactClient />
        </>
    );
}
