import { Metadata } from 'next';
import KochiPageClient from './KochiPageClient';

export const metadata: Metadata = {
    title: 'Event Management in Kochi | Wedding & Corporate | PKC Events',
    description: 'Event management in Kochi for weddings, corporate events and destination receptions. Certified catering, decor and full planning by PKC Events since 2008.',
    alternates: {
        canonical: 'https://pkcevents.com/event-management-kochi'
    },
    openGraph: {
        title: 'Event Management in Kochi | Wedding & Corporate | PKC Events',
        description: 'Event management in Kochi for weddings, corporate events and destination receptions. Certified catering, decor and full planning by PKC Events since 2008.',
        url: 'https://pkcevents.com/event-management-kochi',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'PKC Events Kochi' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Event Management in Kochi | Wedding & Corporate | PKC Events',
        description: 'Event management in Kochi for weddings, corporate events and destination receptions. Certified catering, decor and full planning by PKC Events since 2008.',
        images: ['https://pkcevents.com/logo.png']
    }
};

const trustItems = [
    { icon: 'calendar', text: '2,500+ events since 2008' },
    { icon: 'shield', text: 'FSSAI & ISO 22000 certified catering' },
    { icon: 'award', text: 'Metro Food Award 2023, 2024, 2025' },
    { icon: 'users', text: 'Weddings to corporate summits' }
];

const whyChoosePoints = [
    {
        title: 'Our own certified kitchen.',
        desc: 'Food is cooked by our team under FSSAI and ISO 22000 standards, not outsourced to the lowest bidder.'
    },
    {
        title: 'Award-recognised hospitality.',
        desc: 'Metro Food Award winner in 2023, 2024 and 2025.'
    },
    {
        title: 'Built for scale.',
        desc: '2,500+ events delivered, from boardroom lunches to large wedding receptions.'
    },
    {
        title: 'Corporate-ready.',
        desc: 'Written run-of-show, GST invoicing, single point of contact and on-time delivery for HR, marketing and admin teams.'
    },
    {
        title: 'Everything under one contract.',
        desc: 'Catering, decor, AV, photography and transport are planned together, so vendors never work at cross purposes.'
    }
];

const planningSteps = [
    {
        step: '1',
        title: 'Brief',
        desc: 'Share your date, venue, guest count and goals by call or WhatsApp.'
    },
    {
        step: '2',
        title: 'Proposal',
        desc: 'We visit the venue and send a written plan with menus, decor concepts and an itemised quote.'
    },
    {
        step: '3',
        title: 'Design & tasting',
        desc: 'Approve the stage design and taste the menu before anything is final.'
    },
    {
        step: '4',
        title: 'Run-of-show',
        desc: 'Your event manager locks timings, vendor arrivals and guest flow in the final week.'
    },
    {
        step: '5',
        title: 'Event day',
        desc: 'Our crew sets up early, runs the schedule and stays until close.'
    }
];

const areasServedList = [
    'Kakkanad',
    'Edappally',
    'Palarivattom',
    'Kaloor',
    'Vyttila',
    'MG Road',
    'Marine Drive',
    'Panampilly Nagar',
    'Fort Kochi',
    'Mattancherry',
    'Tripunithura',
    'Aluva',
    'Angamaly',
    'Nedumbassery',
    'Perumbavoor',
    'Kolenchery',
    'Cherai',
    'Alappuzha',
    'Kottayam',
    'Thrissur HQ'
];

const faqs = [
    {
        q: 'How much does event management in Kochi cost?',
        a: 'It depends on guest count, venue, menu and decor scale. After the first consultation we send an itemised written quote with no hidden charges.'
    },
    {
        q: 'Do you have a team in Kochi?',
        a: 'Yes. Our coordinators and crew travel to every Kochi event, and our central Kerala kitchen and decor team supports the full Ernakulam district.'
    },
    {
        q: 'Do you manage corporate events in Kakkanad and Infopark?',
        a: 'Yes. We run conferences, launches, annual days, offsites and gala dinners for businesses across Kakkanad and the rest of Kochi.'
    },
    {
        q: 'Can you plan a destination wedding in Kochi for guests flying in?',
        a: 'Yes. We handle venue selection, airport pickups, guest coordination, catering, decor and all wedding functions.'
    },
    {
        q: 'Do you provide catering only?',
        a: 'Yes. Catering can be booked on its own or as part of full event management.'
    },
    {
        q: 'Is your food FSSAI and ISO certified?',
        a: 'Yes. Our kitchen holds an FSSAI licence and ISO 22000 certification for food safety.'
    },
    {
        q: 'How far in advance should we book?',
        a: 'Three to six months for peak November–February dates; smaller events can often be arranged in two to four weeks.'
    }
];

export default function EventManagementKochiPage() {
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': 'Event Management',
        'name': 'Event Management in Kochi | Wedding & Corporate | PKC Events',
        'provider': {
            '@type': 'Organization',
            'name': 'Pride Kitchen Caterers & Events',
            'url': 'https://pkcevents.com'
        },
        'areaServed': [
            {
                '@type': 'City',
                'name': 'Kochi'
            },
            {
                '@type': 'AdministrativeArea',
                'name': 'Ernakulam'
            },
            {
                '@type': 'AdministrativeArea',
                'name': 'Kerala'
            }
        ],
        'description': 'Event management in Kochi for weddings, corporate events and destination receptions. Certified catering, decor and full planning by PKC Events since 2008.'
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.q,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.a
            }
        }))
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://pkcevents.com'
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Event Management in Kochi',
                'item': 'https://pkcevents.com/event-management-kochi'
            }
        ]
    };

    return (
        <>
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <KochiPageClient
                trustItems={trustItems}
                whyChoosePoints={whyChoosePoints}
                planningSteps={planningSteps}
                areasServedList={areasServedList}
                faqs={faqs}
            />
        </>
    );
}
