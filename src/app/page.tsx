import { Metadata } from 'next';
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import AboutPreview from "@/components/sections/AboutPreview";
import ServiceCards from "@/components/sections/ServiceCards";
import Awards from "@/components/sections/Awards";
import Certifications from "@/components/sections/Certifications";
import GoogleReviews from "@/components/GoogleReviews";
import GalleryPreview from "@/components/sections/GalleryPreview";
import LeadershipTeam from "@/components/sections/LeadershipTeam";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import VideoReviews from "@/components/sections/VideoReviews";
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { Blog as BlogType } from '@/lib/types';

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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getFeaturedBlogs(): Promise<BlogType[]> {
    try {
        const db = await dbConnect();
        if (db) {
            const blogs = await Blog.find({ published: true })
                .sort({ date: -1, createdAt: -1, _id: -1 })
                .limit(3)
                .lean();
            if (blogs && blogs.length > 0) {
                return blogs.map((b: any) => ({
                    id: b._id ? b._id.toString() : (b.id || b.slug),
                    _id: b._id ? b._id.toString() : (b.id || b.slug),
                    title: b.title || '',
                    slug: b.slug || '',
                    category: b.category || '',
                    content: b.content || '',
                    image: b.image || '',
                    author: b.author || '',
                    date: b.date ? (typeof b.date === 'string' ? b.date : new Date(b.date).toISOString()) : '',
                    published: b.published ?? true,
                    metaTitle: b.metaTitle || '',
                    metaDescription: b.metaDescription || '',
                }));
            }
        }
    } catch (error) {
        console.error("Failed to fetch featured blogs from DB:", error);
    }
    return [];
}

export default async function Home() {
    const featuredBlogs = await getFeaturedBlogs();

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
            <BlogPreview initialBlogs={featuredBlogs} />
        </>
    );
}
