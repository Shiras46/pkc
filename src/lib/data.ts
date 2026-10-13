import { Utensils, Home, Paintbrush, Camera, Sparkles, Music, Car } from "lucide-react";
import React from "react";

// Helper to render icons in server components (if needed as plain SVG or just pass the component)
// For simplicity in client components, we can store the ReactNode. 
// Note: importing lucide-react icons in a pure data file might be tricky if used in Server Components, but usually fine.

export const servicesData = [
    {
        id: "catering",
        name: "Premium Catering",
        desc: "Authentic flavours, wrapped in a heritage of shared love. We meticulously choose the best flavours to tantalize the taste buds, converting every event to a delicious affair with a fusion of global delicacies.",
        href: "/services/catering",
        image: "/image/services/catering.webp"
    },
    {
        id: "venue",
        name: "Venue Management",
        desc: "Spaces that Whisper Stories. We go far beyond simple logistics to bring your vision to life from the initial layout to the subtle nuances of decor and flow, ensuring perfection in every detail.",
        href: "/services/venue",
        image: "/image/services/venue-banner.webp"
    },
    {
        id: "decoration",
        name: "Event Decoration",
        desc: "Imprints of Happiness Shared. Our artistic design team paints their magic in weaving a breathtaking canvas for celebrating your events, making it an imprint of happiness for a lifetime.",
        href: "/services/decoration",
        image: "/image/services/decoration.webp"
    },
    {
        id: "photography",
        name: "Photography & Video",
        desc: "Every Frame Tells A Unique Story of Joy. Our visual storytellers capture those little glances in a cinematic style, allowing your future generations to relive those special moments.",
        href: "/services/photography",
        image: "/image/services/cinematic-videography.webp"
    },
    {
        id: "makeup",
        name: "Make-up Services",
        desc: "Enhancing the Royalness in You. We provide the expert touch needed for you to meet the royalty within, enhancing your natural features while expressing your unique style.",
        href: "/services/makeup",
        image: "/image/services/bridal Makeup.webp"
    },
    {
        id: "entertainment",
        name: "Entertainment",
        desc: "Experiences That Touch Your Soul. We ensure your event is a vibrant festival of joy and celebration with live music, cultural performances, and energetic beats that resonate with every guest.",
        href: "/services/entertainment",
        image: "/image/services/entertainment.webp"
    },
    {
        id: "cars",
        name: "Premium Cars",
        desc: "An Entry That Defines You. We offer a pool of elite premium cars from the timeless elegance of vintage classics to the sleek sophistication of modern luxury sedans for your grand entry.",
        href: "/services/cars",
        image: "/image/services/Premium Cars/LUXURY WEDDING CARS.webp"
    },
    {
        id: "corporate-event",
        name: "Corporate Event",
        desc: "Professional events, served with precision and warmth. We plan and cater business events, conferences, launches, and celebrations that are punctual, polished, and memorable.",
        href: "/services/corporate-event",
        image: "/image/services/corprative event bg.webp"
    },
    {
        id: "destination-wedding",
        name: "Destination Wedding",
        desc: "Your love story, celebrated where Kerala is at its most beautiful. Bringing Kerala hospitality to beaches, backwaters, hill stations, and heritage homes across the state.",
        href: "/services/destination-wedding",
        image: "/image/services/beach-backwater-weddings.webp"
    },
];
export const blogsData = [
    {
        id: "blog-1",
        title: "Top 10 Wedding Decor Trends for 2026",
        slug: "wedding-decor-trends-2026",
        category: "Event Trends",
        content: "Discover the most breathtaking decor trends that are redefining luxury weddings this year, from sustainable florals to immersive digital backdrops.",
        image: "/image/services/decoration.webp",
        date: "2026-01-20",
        author: "Meera Nair",
        published: true
    },
    {
        id: "blog-2",
        title: "Curating the Perfect Fusion Menu",
        slug: "perfect-fusion-menu",
        category: "Catering & Menu Guides",
        content: "How to perfectly blend traditional Kerala flavors with international gourmet cuisine for a menu that satisfies every palate.",
        image: "/image/services/catering.webp",
        date: "2026-01-15",
        author: "Chef Arjun",
        published: true
    }
];
