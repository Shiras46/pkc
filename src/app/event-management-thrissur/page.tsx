import { Metadata } from 'next';
import Link from 'next/link';
import { Award, ShieldCheck, MapPin } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Event Management in Thrissur | Wedding & Event Caterers | PKC Events',
    description: 'Award-winning event management and luxury catering in Thrissur by Pride Kitchen Caterers & Events. FSSAI & ISO certified wedding planners and corporate event organizers since 2008.',
    alternates: {
        canonical: 'https://pkcevents.com/event-management-thrissur'
    },
    openGraph: {
        title: 'Event Management in Thrissur | Wedding & Event Caterers | PKC Events',
        description: 'Award-winning event management and luxury catering in Thrissur by Pride Kitchen Caterers & Events. FSSAI & ISO certified wedding planners and corporate event organizers since 2008.',
        url: 'https://pkcevents.com/event-management-thrissur',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'PKC Events Thrissur' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Event Management in Thrissur | PKC Events',
        description: 'Award-winning event management and luxury catering in Thrissur by Pride Kitchen Caterers & Events.',
        images: ['https://pkcevents.com/logo.png']
    }
};

export default function EventManagementThrissurPage() {
    const thrissurServices = [
        {
            title: "Traditional & Contemporary Wedding Planning",
            desc: "Expertly orchestrated Kerala wedding ceremonies, engagement functions, and grand receptions across top convention centers and heritage venues in Thrissur."
        },
        {
            title: "Authentic Sadhya & Multi-Cuisine Catering",
            desc: "Renowned culinary heritage featuring traditional Kerala sadhya served with authentic flavours, alongside modern North Indian, Continental, and live food counters."
        },
        {
            title: "Theme Stage Decor & Floral Architecture",
            desc: "Custom stage concepts, traditional temple-inspired wedding floral arrangements, LED production, and bespoke bridal entrance designs."
        },
        {
            title: "Corporate Meets & Public Celebrations",
            desc: "End-to-end planning for conferences, trade exhibits, college festivals, and family milestones throughout Thrissur district."
        }
    ];

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Event Management",
        "name": "Event Management in Thrissur",
        "provider": {
            "@type": "Organization",
            "name": "Pride Kitchen Caterers & Events",
            "url": "https://pkcevents.com"
        },
        "areaServed": {
            "@type": "City",
            "name": "Thrissur"
        },
        "description": "Professional luxury wedding planning, corporate event management, and authentic catering services in Thrissur, Kerala."
    };

    return (
        <main className="container section-padding" style={{ paddingTop: '150px', paddingBottom: '90px' }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            <header style={{ maxWidth: '900px', marginBottom: '50px' }}>
                <span style={{ color: 'var(--primary, #D4AF37)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                    Thrissur Headquarters &amp; Central Kerala Specialists
                </span>
                <h1 className="heading-md" style={{ marginTop: '10px', lineHeight: '1.2' }}>
                    Event Management in Thrissur for Weddings, Receptions &amp; Celebrations
                </h1>
                <p style={{ marginTop: '20px', fontSize: '1.15rem', lineHeight: '1.8', color: '#555' }}>
                    Based in Mannuthy, Thrissur since 2008, Pride Kitchen Caterers &amp; Events is the cultural capital&apos;s leading name in hospitality, wedding production, and catering. With over 18 years of experience and three-time Metro Food Award honors, our dedicated team manages every logistical detail so your celebration is stress-free and unforgettable.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '60px' }}>
                {thrissurServices.map((svc) => (
                    <div key={svc.title} style={{ padding: '30px', background: '#fafafa', borderRadius: '12px', border: '1px solid #eee' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '12px', color: '#111' }}>{svc.title}</h2>
                        <p style={{ color: '#666', lineHeight: '1.7', fontSize: '0.95rem' }}>{svc.desc}</p>
                    </div>
                ))}
            </div>

            <section style={{ background: '#1C1B19', color: '#fff', padding: '50px 40px', borderRadius: '16px', marginBottom: '60px' }}>
                <div style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '1.8rem', color: '#fcb318', marginBottom: '15px' }}>The PKC Events Advantage in Thrissur</h2>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', display: 'grid', gap: '15px' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ShieldCheck color="#fcb318" size={22} />
                            <span><strong>FSSAI &amp; ISO 22000 Certified Kitchens</strong> — Unmatched standards in hygiene and taste.</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Award color="#fcb318" size={22} />
                            <span><strong>Metro Food Award Winner (2023, 2024, 2025)</strong> — Top-ranked catering service in Kerala.</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <MapPin color="#fcb318" size={22} />
                            <span><strong>Headquartered in Thrissur</strong> — Arammel Arcade, Mannuthy with deep local network of convention centers and auditoriums.</span>
                        </li>
                    </ul>
                    <div style={{ marginTop: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <Link href="/contact" className="btn btn-primary">
                            Plan Your Event
                        </Link>
                        <a href="https://wa.me/918138002333" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>
                            WhatsApp Enquiry
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
                    <Link href="/services/cars" style={{ color: '#666', textDecoration: 'underline' }}>Luxury Wedding Cars</Link>
                    <span>•</span>
                    <Link href="/event-management-kochi" style={{ color: '#666', textDecoration: 'underline' }}>Event Management Kochi</Link>
                </div>
            </section>
        </main>
    );
}
