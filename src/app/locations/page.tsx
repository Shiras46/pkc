import { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import styles from "./Locations.module.css";

export const metadata: Metadata = {
    title: 'Our Locations | Thrissur & Kochi | Pride Kitchen Caterers & Events',
    description: "Find our offices in Thrissur and Kochi. PKC Events provides premium wedding planning and luxury catering services across Thrissur, Kochi, Ernakulam, and all of Kerala.",
    alternates: {
        canonical: 'https://pkcevents.com/locations'
    },
    openGraph: {
        title: 'Our Locations | Thrissur & Kochi | Pride Kitchen Caterers & Events',
        description: "Find our offices in Thrissur and Kochi. PKC Events provides premium wedding planning and luxury catering services across Thrissur, Kochi, Ernakulam, and all of Kerala.",
        url: 'https://pkcevents.com/locations',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'Pride Kitchen Logo' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Locations | Thrissur & Kochi | Pride Kitchen Caterers & Events',
        description: "Find our offices in Thrissur and Kochi. PKC Events provides premium wedding planning and luxury catering services across Thrissur, Kochi, Ernakulam, and all of Kerala.",
        images: ['https://pkcevents.com/logo.png']
    }
};

const offices = [
    {
        city: "Thrissur",
        address: "Arammel Arcade, nr. Mannuthy - Madakkathara Road, Sree Lakshmi Nagar, Mannuthy, Thrissur, Kerala 680651",
        phone: "+91 81380 02333",
        email: "tsr@pkcevents.com",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.271509378036!2d76.24956181480084!3d10.529810892495914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ef98babf5719%3A0x9e0358ad8193ac61!2sPride+Kitchen+Caterers+%26+Events!5e0!3m2!1sen!2sin!4v1720529805500!5m2!1sen!2sin"
    },
    {
        city: "Kochi",
        address: "Opposite Lulu Mall, Edappally, Kochi - 682024",
        phone: "+91 81380 02333",
        email: "cok@pkcevents.com",
        map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15716.481515286576!2d76.3056461!3d10.0270528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6578a00000001%3A0x6a05315589139266!2sLulu%20International%20Shopping%20Mall!5e0!3m2!1sen!2sin!4v1625555555556!5m2!1sen!2sin"
    }
];

export default function LocationsPage() {
    const locationsSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "LocalBusiness",
                "name": "Pride Kitchen Caterers & Events Thrissur (Headquarters)",
                "image": "https://pkcevents.com/image/services/catering.webp",
                "@id": "https://pkcevents.com/locations#thrissur-office",
                "url": "https://pkcevents.com/locations",
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
                }
            },
            {
                "@type": "LocalBusiness",
                "name": "Pride Kitchen Caterers & Events Kochi Office",
                "image": "https://pkcevents.com/image/about.webp",
                "@id": "https://pkcevents.com/locations#kochi-office",
                "url": "https://pkcevents.com/locations",
                "telephone": "+91 81380 02333",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Opposite Lulu Mall, Edappally",
                    "addressLocality": "Kochi",
                    "addressRegion": "Kerala",
                    "postalCode": "682024",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 10.0270528,
                    "longitude": 76.3056461
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
                }
            }
        ]
    };

    return (
        <div className={styles.wrapper}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsSchema) }}
            />
            <header className={styles.header}>
                <div className="container">
                    <h1 className="heading-xl text-center" style={{ color: '#fcb318' }}><span style={{ color: '#000000' }}>Our</span> Locations</h1>
                    <p className={styles.subtitle}>Serving Every Corner of Kerala with Excellence</p>
                </div>
            </header>

            <section className="section-padding">
                <div className="container">
                    <div className={styles.grid}>
                        {offices.map((office) => (
                            <div key={office.city} className={styles.card}>
                                <div className={styles.info}>
                                    <h2 className="heading-md">{office.city} Office</h2>
                                    <div className={styles.details}>
                                        <div className={styles.detailItem}>
                                            <MapPin size={20} className="text-gold" />
                                            <p>{office.address}</p>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <Phone size={20} className="text-gold" />
                                            <p>{office.phone}</p>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <Mail size={20} className="text-gold" />
                                            <p>{office.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.map}>
                                    <iframe
                                        src={office.map}
                                        width="100%"
                                        height="300"
                                        style={{ border: 0, borderRadius: '12px' }}
                                        allowFullScreen
                                        loading="lazy"
                                        title={`Google Maps Location of PKC Events ${office.city} Office`}
                                    ></iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
