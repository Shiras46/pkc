import { Metadata } from 'next';
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import AboutPreview from "@/components/sections/AboutPreview";
import ServiceCards from "@/components/sections/ServiceCards";
import Awards from "@/components/sections/Awards";
import Certifications from "@/components/sections/Certifications";
import Testimonials from "@/components/sections/Testimonials";
import GalleryPreview from "@/components/sections/GalleryPreview";
import LeadershipTeam from "@/components/sections/LeadershipTeam";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import VideoReviews from "@/components/sections/VideoReviews";

export const metadata: Metadata = {
    title: 'Pride Kitchen Caterers & Events | Luxury Wedding & Event Management Kerala',
    description: "Experience the pinnacle of luxury with Pride Kitchen Caterers & Events. We specialize in end-to-end wedding planning, premium catering, decoration, and more across Kerala.",
    alternates: {
        canonical: 'https://pkcevents.com'
    },
    openGraph: {
        title: 'Pride Kitchen Caterers & Events | Luxury Wedding & Event Management Kerala',
        description: "Experience the pinnacle of luxury with Pride Kitchen Caterers & Events. We specialize in end-to-end wedding planning, premium catering, decoration, and more across Kerala.",
        url: 'https://pkcevents.com',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'Pride Kitchen Logo' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pride Kitchen Caterers & Events | Luxury Wedding & Event Management Kerala',
        description: "Experience the pinnacle of luxury with Pride Kitchen Caterers & Events. We specialize in end-to-end wedding planning, premium catering, decoration, and more across Kerala.",
        images: ['https://pkcevents.com/logo.png']
    }
};

export default function Home() {
    return (
        <>
            <Hero />
            <Experience />
            <AboutPreview />
            <ServiceCards />
            <FinalCTA />
            <Awards />
            <Certifications />
            <Testimonials />
            <VideoReviews />
            <GalleryPreview />
            <LeadershipTeam />
            <FAQ />
            <BlogPreview />
        </>
    );
}
