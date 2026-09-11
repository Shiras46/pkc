import { Metadata } from 'next';
import BrandName from "@/components/ui/BrandName";

export const metadata: Metadata = {
    title: 'Privacy Policy | Pride Kitchen Caterers & Events',
    description: 'Read the privacy policy of Pride Kitchen Caterers & Events to understand how website information and user data are collected and handled.',
    alternates: {
        canonical: 'https://pkcevents.com/legal/privacy'
    },
    openGraph: {
        title: 'Privacy Policy | Pride Kitchen Caterers & Events',
        description: 'Read the privacy policy of Pride Kitchen Caterers & Events to understand how website information and user data are collected and handled.',
        url: 'https://pkcevents.com/legal/privacy',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'Pride Kitchen Logo' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy | Pride Kitchen Caterers & Events',
        description: 'Read the privacy policy of Pride Kitchen Caterers & Events to understand how website information and user data are collected and handled.',
        images: ['https://pkcevents.com/logo.png']
    }
};

export default function PrivacyPage() {
    return (
        <div className="container section-padding" style={{ paddingTop: '150px' }}>
            <h1 className="heading-md">Privacy Policy</h1>
            <div style={{ marginTop: '40px', lineHeight: '1.8', color: '#666' }}>
                <p>Your privacy is important to us. It is <BrandName />'s policy to respect your privacy regarding any information we may collect from you across our website.</p>
                <p style={{ marginTop: '20px' }}>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
                <p style={{ marginTop: '20px' }}>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
            </div>
        </div>
    );
}
