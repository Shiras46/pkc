import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
    title: 'Our Services | Pride Kitchen Caterers & Events',
    description: "Explore our premium event services in Kerala by PKC Events. Specializing in luxury wedding planning, professional catering, venue decoration, entertainment, bridal makeup, and elite rentals.",
    alternates: {
        canonical: 'https://pkcevents.com/services'
    },
    openGraph: {
        title: 'Our Services | Pride Kitchen Caterers & Events',
        description: "Explore our premium event services in Kerala by PKC Events. Specializing in luxury wedding planning, professional catering, venue decoration, entertainment, bridal makeup, and elite rentals.",
        url: 'https://pkcevents.com/services',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'Pride Kitchen Logo' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Services | Pride Kitchen Caterers & Events',
        description: "Explore our premium event services in Kerala by PKC Events. Specializing in luxury wedding planning, professional catering, venue decoration, entertainment, bridal makeup, and elite rentals.",
        images: ['https://pkcevents.com/logo.png']
    }
};

export default function ServicesPage() {
    return <ServicesClient />;
}
