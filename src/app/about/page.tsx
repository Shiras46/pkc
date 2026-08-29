import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: 'About Us | Pride Kitchen Caterers & Events',
    description: "Learn about Pride Kitchen Caterers & Events (PKC Events), Kerala's leading luxury wedding and event management company since 2008. Read our story and core values.",
    alternates: {
        canonical: 'https://pkcevents.com/about'
    },
    openGraph: {
        title: 'About Us | Pride Kitchen Caterers & Events',
        description: "Learn about Pride Kitchen Caterers & Events (PKC Events), Kerala's leading luxury wedding and event management company since 2008. Read our story and core values.",
        url: 'https://pkcevents.com/about',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'Pride Kitchen Logo' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Us | Pride Kitchen Caterers & Events',
        description: "Learn about Pride Kitchen Caterers & Events (PKC Events), Kerala's leading luxury wedding and event management company since 2008. Read our story and core values.",
        images: ['https://pkcevents.com/logo.png']
    }
};

export default function AboutPage() {
    return <AboutClient />;
}
