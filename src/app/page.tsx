import { Metadata } from 'next';
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import AboutPreview from "@/components/sections/AboutPreview";
import ServiceCards from "@/components/sections/ServiceCards";
import Awards from "@/components/sections/Awards";
import Certifications from "@/components/sections/Certifications";
import Testimonials from "@/components/sections/Testimonials";
import GoogleReviews from "@/components/GoogleReviews";
import GalleryPreview from "@/components/sections/GalleryPreview";
import LeadershipTeam from "@/components/sections/LeadershipTeam";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import VideoReviews from "@/components/sections/VideoReviews";

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
            <Testimonials />
            <VideoReviews />
            <GalleryPreview />
            <LeadershipTeam />
            <FAQ />
            <BlogPreview />
        </>
    );
}
