import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Event Management in Thrissur | Pride Kitchen Caterers & Events',
    description: 'Pride Kitchen Caterers & Events provides professional event management services in Thrissur for weddings, celebrations, corporate events and special occasions.',
    alternates: {
        canonical: 'https://pkcevents.com/event-management-thrissur/'
    }
};

export default function EventManagementThrissurPage() {
    return (
        <div className="container section-padding" style={{ paddingTop: '150px', paddingBottom: '80px', minHeight: '60vh' }}>
            <h1 className="heading-md">Event Management in Thrissur</h1>
            <div style={{ marginTop: '30px', lineHeight: '1.8', color: '#555', maxWidth: '800px' }}>
                <p>
                    Pride Kitchen Caterers &amp; Events provides professional event management services in Thrissur for weddings, celebrations, corporate events and special occasions.
                </p>
                <p style={{ marginTop: '20px' }}>
                    From exquisite catering and thematic decor to seamless venue coordination and entertainment, our experienced team ensures your special day is executed to perfection.
                </p>
            </div>
        </div>
    );
}
