import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: 'Pride Kitchen Caters & Events Thrissur | About Us',
    description: "18+ Years of Luxury Events | Pride Kitchen Caters & Events",
    alternates: {
        canonical: 'https://pkcevents.com/about'
    },
    openGraph: {
        title: 'Pride Kitchen Caters & Events Thrissur | About Us',
        description: "18+ Years of Luxury Events | Pride Kitchen Caters & Events",
        url: 'https://pkcevents.com/about',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'Pride Kitchen Logo' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pride Kitchen Caters & Events Thrissur | About Us',
        description: "18+ Years of Luxury Events | Pride Kitchen Caters & Events",
        images: ['https://pkcevents.com/logo.png']
    }
};

export default function AboutPage() {
    return <AboutClient />;
}
