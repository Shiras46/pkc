import { Metadata } from 'next';
import ThrissurPageClient from './ThrissurPageClient';

export const metadata: Metadata = {
    title: 'Event Management in Thrissur | Wedding Planners | PKC Events',
    description: 'Event management in Thrissur since 2008. Weddings, sadhya catering, stage decor and corporate events by PKC Events, Mannuthy. FSSAI & ISO certified.',
    alternates: {
        canonical: 'https://pkcevents.com/event-management-thrissur'
    },
    openGraph: {
        title: 'Event Management in Thrissur | Wedding Planners | PKC Events',
        description: 'Event management in Thrissur since 2008. Weddings, sadhya catering, stage decor and corporate events by PKC Events, Mannuthy. FSSAI & ISO certified.',
        url: 'https://pkcevents.com/event-management-thrissur',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'PKC Events Thrissur' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Event Management in Thrissur | Wedding Planners | PKC Events',
        description: 'Event management in Thrissur since 2008. Weddings, sadhya catering, stage decor and corporate events by PKC Events, Mannuthy. FSSAI & ISO certified.',
        images: ['https://pkcevents.com/logo.png']
    }
};

const trustItems = [
    { icon: 'clock', text: '18+ years in Thrissur' },
    { icon: 'users', text: '2,500+ events delivered' },
    { icon: 'shield', text: 'FSSAI & ISO 22000 certified kitchen' },
    { icon: 'award', text: 'Metro Food Award 2023, 2024, 2025' }
];

const whyFamiliesChoose = [
    {
        title: 'We are local.',
        desc: "Our headquarters at Arammel Arcade, Mannuthy, means faster site visits, same-day tastings and a team that already knows Thrissur's auditoriums, parking limits and traffic patterns."
    },
    {
        title: 'We cook, not subcontract.',
        desc: 'Food is the part guests remember most. Ours comes from our own certified kitchen, not a third-party caterer.'
    },
    {
        title: 'Award-recognised.',
        desc: 'Metro Food Award winner three years running (2023, 2024, 2025).'
    },
    {
        title: 'One contract, one coordinator.',
        desc: 'Catering, decor, photography, make-up and cars are planned together, so nothing falls between vendors.'
    },
    {
        title: 'Proven at scale.',
        desc: 'More than 2,500 events delivered since 2008, from 50-guest family lunches to large wedding receptions.'
    }
];

const planningSteps = [
    {
        step: '1',
        title: 'Consultation',
        desc: 'Call or WhatsApp us. We note the date, guest count, venue and budget.'
    },
    {
        step: '2',
        title: 'Site visit & proposal',
        desc: 'We visit the venue, then send a written plan with menu options, decor concepts and a clear quote.'
    },
    {
        step: '3',
        title: 'Tasting & design sign-off',
        desc: 'Taste the menu at our Mannuthy kitchen and approve the stage design.'
    },
    {
        step: '4',
        title: 'Coordination',
        desc: 'Your event manager confirms every vendor, timing and guest-flow detail in the final week.'
    },
    {
        step: '5',
        title: 'Event day',
        desc: 'Our team sets up, runs the schedule and stays until the venue is cleared.'
    }
];

const areasCoveredList = [
    'Thrissur Town',
    'Swaraj Round',
    'Mannuthy HQ',
    'Ollur',
    'Puzhakkal',
    'Guruvayur',
    'Chavakkad',
    'Kunnamkulam',
    'Wadakkanchery',
    'Irinjalakuda',
    'Chalakudy',
    'Kodungallur',
    'Triprayar',
    'Kodakara',
    'Palakkad',
    'Malappuram',
    'Kochi'
];

const faqs = [
    {
        q: 'How much does event management in Thrissur cost?',
        a: 'Cost depends on guest count, menu, decor scale and the services you add. We give a written, itemised quote after the first consultation, with no hidden charges.'
    },
    {
        q: 'Do you provide catering only, or full event management?',
        a: 'Both. Many clients book us for catering alone; others hand over the full event, from decor to photography and wedding cars.'
    },
    {
        q: 'How early should we book for a wedding in Thrissur?',
        a: 'Three to six months for peak muhurtham, Onam and Christmas dates. Smaller events can often be arranged in two to four weeks.'
    },
    {
        q: 'Do you handle Guruvayur temple weddings?',
        a: 'Yes. We manage the sadhya, reception, decor and guest transport around the temple ceremony slot.'
    },
    {
        q: 'Is your kitchen certified?',
        a: 'Yes. Our kitchen is FSSAI licensed and ISO 22000 certified for food safety.'
    },
    {
        q: 'Can we taste the menu before booking?',
        a: 'Yes. We arrange menu tastings at our Mannuthy kitchen once the proposal is shared.'
    },
    {
        q: 'Do you manage corporate events in Thrissur too?',
        a: 'Yes. We run conferences, dealer meets, launches, annual days and award nights with full AV and catering.'
    }
];

export default function EventManagementThrissurPage() {
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': 'Event Management',
        'name': 'Event Management in Thrissur | Wedding Planners | PKC Events',
        'provider': {
            '@type': 'Organization',
            'name': 'Pride Kitchen Caterers & Events',
            'url': 'https://pkcevents.com',
            'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'Arammel Arcade, Mannuthy–Madakkathara Road',
                'addressLocality': 'Thrissur',
                'postalCode': '680651',
                'addressRegion': 'Kerala',
                'addressCountry': 'IN'
            }
        },
        'areaServed': [
            {
                '@type': 'City',
                'name': 'Thrissur'
            },
            {
                '@type': 'AdministrativeArea',
                'name': 'Kerala'
            }
        ],
        'description': 'Event management in Thrissur since 2008. Weddings, sadhya catering, stage decor and corporate events by PKC Events, Mannuthy. FSSAI & ISO certified.'
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
                'name': 'Event Management in Thrissur',
                'item': 'https://pkcevents.com/event-management-thrissur'
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

            <ThrissurPageClient
                whyFamiliesChoose={whyFamiliesChoose}
                planningSteps={planningSteps}
                areasCoveredList={areasCoveredList}
                faqs={faqs}
            />
        </>
    );
}
