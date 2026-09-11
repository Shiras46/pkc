import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Event Management in Kochi | Pride Kitchen Caterers & Events',
    description: 'Pride Kitchen Caterers & Events provides professional event management services in Kochi for weddings, celebrations, corporate events and special occasions.',
    alternates: {
        canonical: 'https://pkcevents.com/event-management-kochi/'
    }
};

export default function EventManagementKochiPage() {
    return (
        <div className="container section-padding" style={{ paddingTop: '150px', paddingBottom: '80px', minHeight: '60vh' }}>
            <h1 className="heading-md">Event Management in Kochi</h1>
            <div style={{ marginTop: '30px', lineHeight: '1.8', color: '#555', maxWidth: '800px' }}>
                <p>
                    Pride Kitchen Caterers &amp; Events provides professional event management services in Kochi for weddings, celebrations, corporate events and special occasions.
                </p>
                <p style={{ marginTop: '20px' }}>
                    From bespoke weddings and corporate galas to private celebrations, our dedicated event management specialists bring unmatched elegance and quality to every event in Kochi.
                </p>
            </div>
        </div>
    );
}
