import { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Sitemap | Pride Kitchen Caterers & Events',
    description: "Browse the sitemap of Pride Kitchen Caterers & Events to easily find information about services, events, locations, blogs and contact details.",
    alternates: {
        canonical: 'https://pkcevents.com/sitemap'
    },
    openGraph: {
        title: 'Sitemap | Pride Kitchen Caterers & Events',
        description: "Browse the sitemap of Pride Kitchen Caterers & Events to easily find information about services, events, locations, blogs and contact details.",
        url: 'https://pkcevents.com/sitemap',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'Pride Kitchen Logo' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sitemap | Pride Kitchen Caterers & Events',
        description: "Browse the sitemap of Pride Kitchen Caterers & Events to easily find information about services, events, locations, blogs and contact details.",
        images: ['https://pkcevents.com/logo.png']
    }
};

export default function SitemapPage() {
    const links = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Global Catering", href: "/services/catering" },
        { name: "Venue Planning", href: "/services/venue" },
        { name: "Event Decoration", href: "/services/decoration" },
        { name: "Cinematic Photography", href: "/services/photography" },
        { name: "Bridal Makeup", href: "/services/makeup" },
        { name: "Entertainment Zone", href: "/services/entertainment" },
        { name: "Luxury Cars", href: "/services/cars" },
        { name: "Corporate Event", href: "/services/corporate-event" },
        { name: "Destination Wedding", href: "/services/destination-wedding" },
        { name: "Catering Menu Selection", href: "/menu" },
        { name: "Wedding Reception Menu", href: "/menu/wedding-reception" },
        { name: "Hindu Wedding Sadhya", href: "/menu/hindu-wedding-sadhya" },
        { name: "Wedding Dinner Menu", href: "/menu/wedding-dinner" },
        { name: "Birthday Celebration Menu", href: "/menu/birthday-celebration" },
        { name: "Sangeet Ceremony Menu", href: "/menu/sangeet-ceremony" },
        { name: "Haldi Ceremony Menu", href: "/menu/haldi-ceremony" },
        { name: "Christian Wedding Menu", href: "/menu/christian-wedding" },
        { name: "Nikah Wedding Menu", href: "/menu/nikah-wedding" },
        { name: "Signature Portfolio", href: "/portfolio" },
        { name: "Our Gallery", href: "/gallery" },
        { name: "Our Locations", href: "/locations" },
        { name: "Event Management Thrissur", href: "/event-management-thrissur" },
        { name: "Event Management Kochi", href: "/event-management-kochi" },
        { name: "Insights Blog", href: "/blog" },
        { name: "Contact Us", href: "/contact" },
        { name: "Privacy Policy", href: "/legal/privacy" },
        { name: "Terms & Conditions", href: "/legal/terms" },
    ];

    return (
        <div className="container section-padding" style={{ paddingTop: '150px' }}>
            <h1 className="heading-md">Sitemap</h1>
            <ul style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {links.map(link => (
                    <li key={link.href}>
                        <Link href={link.href} style={{ color: 'var(--primary)', fontWeight: '600' }}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
