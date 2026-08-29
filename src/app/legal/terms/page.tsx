import { Metadata } from 'next';
import BrandName from "@/components/ui/BrandName";

export const metadata: Metadata = {
    title: 'Terms & Conditions | Pride Kitchen Caterers & Events',
    description: 'Review the terms and conditions for booking and working with Pride Kitchen Caterers & Events (PKC Events) for luxury weddings and catering in Kerala.',
    alternates: {
        canonical: 'https://pkcevents.com/legal/terms'
    },
    openGraph: {
        title: 'Terms & Conditions | Pride Kitchen Caterers & Events',
        description: 'Review the terms and conditions for booking and working with Pride Kitchen Caterers & Events (PKC Events) for luxury weddings and catering in Kerala.',
        url: 'https://pkcevents.com/legal/terms',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'Pride Kitchen Logo' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Terms & Conditions | Pride Kitchen Caterers & Events',
        description: 'Review the terms and conditions for booking and working with Pride Kitchen Caterers & Events (PKC Events) for luxury weddings and catering in Kerala.',
        images: ['https://pkcevents.com/logo.png']
    }
};

export default function TermsPage() {
    return (
        <div className="container section-padding" style={{ paddingTop: '150px' }}>
            <h1 className="heading-md">Terms & Conditions</h1>
            <div style={{ marginTop: '40px', lineHeight: '1.8', color: '#666' }}>
                <p>By accessing the website at pkcevents.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
                <p style={{ marginTop: '20px' }}>The materials on <BrandName />'s website are provided on an 'as is' basis. <BrandName /> makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.</p>
            </div>
        </div>
    );
}
