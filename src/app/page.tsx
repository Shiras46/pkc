import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";

const GoogleReviews = dynamic(() => import("@/components/GoogleReviews"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const AboutPreview = dynamic(() => import("@/components/sections/AboutPreview"));
const ServiceCards = dynamic(() => import("@/components/sections/ServiceCards"));
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"));
const Awards = dynamic(() => import("@/components/sections/Awards"));
const Certifications = dynamic(() => import("@/components/sections/Certifications"));
const GalleryPreview = dynamic(() => import("@/components/sections/GalleryPreview"));
const LeadershipTeam = dynamic(() => import("@/components/sections/LeadershipTeam"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const VideoReviews = dynamic(() => import("@/components/sections/VideoReviews"));
const BlogPreview = dynamic(() => import("@/components/sections/BlogPreview"));

export const metadata: Metadata = {
    title: 'Best Event Management in Thrissur, Kerala | Pride Kitchen Caters & Events',
    description: "Luxury wedding & event management in Thrissur and Kochi since 2008. Premium catering, decoration, venues, photography & more — FSSAI & ISO certified.",
    alternates: {
        canonical: 'https://pkcevents.com'
    },
    openGraph: {
        title: 'Best Event Management in Thrissur, Kerala | Pride Kitchen Caters & Events',
        description: "Luxury wedding & event management in Thrissur and Kochi since 2008. Premium catering, decoration, venues, photography & more — FSSAI & ISO certified.",
        url: 'https://pkcevents.com',
        images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'Pride Kitchen Logo' }],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best Event Management in Thrissur, Kerala | Pride Kitchen Caters & Events',
        description: "Luxury wedding & event management in Thrissur and Kochi since 2008. Premium catering, decoration, venues, photography & more — FSSAI & ISO certified.",
        images: ['https://pkcevents.com/logo.png']
    }
};

export default function Home() {
    return (
        <>
            <Hero />
            <GoogleReviews />
            <Experience />
            <AboutPreview />
            <ServiceCards />
            <FinalCTA />
            <Awards />
            <Certifications />
            <GalleryPreview />
            <LeadershipTeam />
            <FAQ />
            <VideoReviews />
            <BlogPreview />
        </>
    );
}
