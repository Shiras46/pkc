import { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
    title: 'Gallery | Pride Kitchen Caterers & Events',
    description: "Browse through our visual portfolio of luxury weddings, premium catering presentation, stunning venue decorations, and memorable events managed by PKC Events in Kerala.",
    alternates: {
        canonical: 'https://pkcevents.com/gallery'
    },
    openGraph: {
        title: 'Gallery | Pride Kitchen Caterers & Events',
        description: "Browse through our visual portfolio of luxury weddings, premium catering presentation, stunning venue decorations, and memorable events managed by PKC Events in Kerala.",
        url: 'https://pkcevents.com/gallery',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'Pride Kitchen Logo' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gallery | Pride Kitchen Caterers & Events',
        description: "Browse through our visual portfolio of luxury weddings, premium catering presentation, stunning venue decorations, and memorable events managed by PKC Events in Kerala.",
        images: ['https://pkcevents.com/logo.png']
    }
};

export default function GalleryPage() {
    return <GalleryClient />;
}
