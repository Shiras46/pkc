import { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
    title: 'Wedding & Event Gallery in Thrissur | PKC Events Kerala',
    description: "Explore our wedding and event gallery featuring beautiful catering, decorations, venues, photography and memorable celebrations across Thrissur and Kerala.",
    alternates: {
        canonical: 'https://pkcevents.com/gallery'
    },
    openGraph: {
        title: 'Wedding & Event Gallery in Thrissur | PKC Events Kerala',
        description: "Explore our wedding and event gallery featuring beautiful catering, decorations, venues, photography and memorable celebrations across Thrissur and Kerala.",
        url: 'https://pkcevents.com/gallery',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'Pride Kitchen Logo' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Wedding & Event Gallery in Thrissur | PKC Events Kerala',
        description: "Explore our wedding and event gallery featuring beautiful catering, decorations, venues, photography and memorable celebrations across Thrissur and Kerala.",
        images: ['https://pkcevents.com/logo.png']
    }
};

export default function GalleryPage() {
    return <GalleryClient />;
}
