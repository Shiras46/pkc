import { Metadata } from 'next';
import { servicesData } from '@/lib/data';
import ServiceDetailClient from './ServiceDetailClient';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return servicesData.map((service) => ({
        slug: service.id,
    }));
}

const serviceSeoMetadata: Record<string, { title: string; description: string }> = {
    cars: {
        title: 'Luxury & Vintage Car Rental for Weddings | Thrissur & Kochi',
        description: 'Make a grand entry with our fleet of premium vintage and modern luxury cars for weddings and events across Thrissur, Kochi & Kerala.',
    },
    catering: {
        title: 'Premium Wedding & Event Catering in Thrissur, Kerala | PKC Events',
        description: 'FSSAI & ISO 22000 certified catering blending authentic Kerala sadhya with global cuisine. Trusted for weddings, receptions & corporate events in Thrissur & Kochi.',
    },
    decoration: {
        title: 'Luxury Wedding & Event Decoration Thrissur | Pride Kitchen Events',
        description: 'Breathtaking wedding and event decor crafted by our artistic design team. Serving Thrissur, Kochi & across Kerala with bespoke themes and setups.',
    },
    entertainment: {
        title: 'Wedding & Event Entertainment Thrissur | PKC Events Kerala',
        description: 'Live music, cultural performances & entertainment that bring your celebration to life. Book premium event entertainment in Thrissur and Kochi.',
    },
    makeup: {
        title: 'Bridal Makeup Artists in Thrissur & Kochi | PKC Events Kerala',
        description: "Expert bridal and event makeup services that enhance your natural beauty for your special day. Trusted by Kerala's brides for luxury weddings.",
    },
    photography: {
        title: 'Wedding Photography & Videography Thrissur | PKC Events Kerala',
        description: 'Cinematic wedding photography and videography capturing every precious moment. Serving Thrissur, Kochi & across Kerala since 2008.',
    },
    venue: {
        title: 'Wedding Venue Selection & Management Thrissur | PKC Events Kerala',
        description: 'End-to-end venue selection and management for weddings and events in Thrissur, Kochi & Kerala, from layout planning to flawless execution.',
    },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = servicesData.find(s => s.id === slug);
    if (!service) {
        return {
            title: 'Service Not Found | Pride Kitchen Caterers & Events',
        };
    }

    const seo = serviceSeoMetadata[slug];
    const title = seo?.title || `${service.name} | Pride Kitchen Caterers & Events`;
    const description = seo?.description || `${service.desc.substring(0, 150)}... Experience premium ${service.name} services in Kerala by PKC Events.`;
    const canonical = `https://pkcevents.com/services/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical
        },
        openGraph: {
            title,
            description,
            url: canonical,
            images: [{ url: `https://pkcevents.com${service.image}`, width: 800, height: 600, alt: service.name }],
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`https://pkcevents.com${service.image}`]
        }
    };
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params;
    const service = servicesData.find(s => s.id === slug);

    if (!service) {
        return <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>Service not found.</div>;
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://pkcevents.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://pkcevents.com/services"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": service.name,
                "item": `https://pkcevents.com/services/${slug}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ServiceDetailClient slug={slug} />
        </>
    );
}
