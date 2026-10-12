import { Metadata } from 'next';
import Link from 'next/link';
import { Award, ShieldCheck, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Event Management in Kochi | Wedding & Corporate Event Planners | PKC Events',
    description: 'Premier event management and luxury catering in Kochi by Pride Kitchen Caterers & Events. Specializing in bespoke weddings, destination receptions, and corporate galas across Ernakulam & Kochi.',
    alternates: {
        canonical: 'https://pkcevents.com/event-management-kochi'
    },
    openGraph: {
        title: 'Event Management in Kochi | Wedding & Corporate Event Planners | PKC Events',
        description: 'Premier event management and luxury catering in Kochi by Pride Kitchen Caterers & Events. Specializing in bespoke weddings, destination receptions, and corporate galas across Ernakulam & Kochi.',
        url: 'https://pkcevents.com/event-management-kochi',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'PKC Events Kochi' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Event Management in Kochi | PKC Events',
        description: 'Premier event management and luxury catering in Kochi by Pride Kitchen Caterers & Events.',
        images: ['https://pkcevents.com/logo.png']
    }
};

export default function EventManagementKochiPage() {
    const kochiServices = [
        {
            title: "Luxury Wedding Planning",
            desc: "Complete wedding management from stage decor and floral themes to authentic multi-course sadhyas and continental wedding banquets across prime Kochi venues."
        },
        {
            title: "Corporate Events & Summits",
            desc: "Seamless conferences, dealer meets, gala dinners, and annual celebrations executed with precision for businesses in Kochi, Kakkanad, and Ernakulam."
        },
        {
            title: "Premium Catering Services",
            desc: "FSSAI & ISO 22000 certified culinary experiences blending traditional Kerala hospitality with international cuisines, live cooking stations, and artistic dessert displays."
        },
        {
            title: "Venue Selection & Production",
            desc: "End-to-end management covering sound, cinematic lighting, celebrity artist coordination, photography, and luxury bridal car arrangements."
        }
    ];

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Event Management",
        "name": "Event Management in Kochi",
        "provider": {
            "@type": "Organization",
            "name": "Pride Kitchen Caterers & Events",
            "url": "https://pkcevents.com"
        },
        "areaServed": {
            "@type": "City",
            "name": "Kochi"
        },
        "description": "Professional luxury wedding planning, corporate event management, and premium catering services in Kochi, Kerala."
    };

    return (
        <main className="container section-padding" style={{ paddingTop: '150px', paddingBottom: '90px' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            <header style={{ maxWidth: '900px', marginBottom: '50px' }}>
                <span style={{ color: 'var(--primary, #D4AF37)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                    Kochi &amp; Ernakulam Event Specialists
                </span>
                <h1 className="heading-md" style={{ marginTop: '10px', lineHeight: '1.2' }}>
                    Event Management in Kochi for Weddings, Corporate Summits &amp; Galas
                </h1>
                <p style={{ marginTop: '20px', fontSize: '1.15rem', lineHeight: '1.8', color: '#555' }}>
                    Pride Kitchen Caterers &amp; Events brings nearly two decades of culinary mastery and experiential event production to Kochi. Whether you are hosting an intimate backwater wedding reception, a grand coastal celebration, or an executive corporate summit, our experienced coordinators deliver flawless hospitality and memorable moments.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '60px' }}>
                {kochiServices.map((svc) => (
                    <div key={svc.title} style={{ padding: '30px', background: '#fafafa', borderRadius: '12px', border: '1px solid #eee' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '12px', color: '#111' }}>{svc.title}</h2>
                        <p style={{ color: '#666', lineHeight: '1.7', fontSize: '0.95rem' }}>{svc.desc}</p>
                    </div>
                ))}
            </div>

            <section style={{ background: '#1C1B19', color: '#fff', padding: '50px 40px', borderRadius: '16px', marginBottom: '60px' }}>
                <div style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '1.8rem', color: '#fcb318', marginBottom: '15px' }}>Why Families &amp; Corporations in Kochi Choose PKC Events</h2>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', display: 'grid', gap: '15px' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ShieldCheck color="#fcb318" size={22} />
                            <span><strong>FSSAI &amp; ISO 22000 Certified</strong> — Guaranteed food hygiene, safety, and consistent culinary excellence.</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Award color="#fcb318" size={22} />
                            <span><strong>Metro Food Award Winner (2023, 2024, 2025)</strong> — Recognized across Kerala for hospitality.</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Clock color="#fcb318" size={22} />
                            <span><strong>18+ Years of Experience</strong> — Over 2,500 successful celebrations delivered on schedule.</span>
                        </li>
                    </ul>
                    <div style={{ marginTop: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <Link href="/contact" className="btn btn-primary">
                            Request a Proposal
                        </Link>
                        <a href="https://wa.me/918138002333" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>
                            Chat with Event Manager
                        </a>
                    </div>
                </div>
            </section>

            <section style={{ borderTop: '1px solid #eee', paddingTop: '40px' }}>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>Explore Our Event Services in Kerala</h2>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <Link href="/services/catering" style={{ color: '#666', textDecoration: 'underline' }}>Premium Catering</Link>
                    <span>•</span>
                    <Link href="/services/venue" style={{ color: '#666', textDecoration: 'underline' }}>Venue Management</Link>
                    <span>•</span>
                    <Link href="/services/decoration" style={{ color: '#666', textDecoration: 'underline' }}>Event Decoration</Link>
                    <span>•</span>
                    <Link href="/services/photography" style={{ color: '#666', textDecoration: 'underline' }}>Photography &amp; Films</Link>
                    <span>•</span>
                    <Link href="/event-management-thrissur" style={{ color: '#666', textDecoration: 'underline' }}>Event Management Thrissur</Link>
                </div>
            </section>
        </main>
    );
}
