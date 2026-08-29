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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = servicesData.find(s => s.id === slug);
    if (!service) {
        return {
            title: 'Service Not Found | Pride Kitchen Caterers & Events',
        };
    }

    const title = `${service.name} | Pride Kitchen Caterers & Events`;
    const description = `${service.desc.substring(0, 150)}... Experience premium ${service.name} services in Kerala by PKC Events.`;
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
