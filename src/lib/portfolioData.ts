export interface PortfolioProject {
    id: string;
    title: string;
    category: "Luxury Weddings" | "Stage & Floral Decor" | "Premium Catering" | "Corporate Galas" | "Destination Events";
    location: string;
    guestCount: string;
    image: string;
    objectPosition?: string;
    shortDesc: string;
    fullStory: string;
    highlights: string[];
    servicesDelivered: string[];
}

export const portfolioCategories = [
    "All Projects",
    "Luxury Weddings",
    "Stage & Floral Decor",
    "Premium Catering",
    "Corporate Galas",
    "Destination Events"
] as const;

export const portfolioProjects: PortfolioProject[] = [
    {
        id: "grand-waterfront-wedding",
        title: "The Grand Waterfront Wedding",
        category: "Luxury Weddings",
        location: "Bolgatty Palace, Kochi",
        guestCount: "1,500 Guests",
        image: "/image/hero1.webp",
        objectPosition: "center 30%",
        shortDesc: "A majestic 3-day royal waterfront celebration with bespoke floral styling, luxury hospitality, and five-star culinary banquets.",
        fullStory: "Set against the serene backwaters of Kochi, this 3-day celebration encompassed a colorful Mehendi evening, a traditional sunrise wedding ceremony, and an illuminated seaside reception. Our team curated everything from VIP guest logistics to custom waterfront stage structures and curated multi-cuisine dining.",
        highlights: ["Waterfront Mandap", "1,500 Guests Managed", "Cinematic Coverage", "Live Symphony Orchestra"],
        servicesDelivered: ["Complete Wedding Planning", "Floral Venue Styling", "Multi-Cuisine Catering", "VIP Hospitality"]
    },
    {
        id: "traditional-heritage-wedding",
        title: "Timeless Heritage Kerala Wedding",
        category: "Luxury Weddings",
        location: "Thrissur Cultural Capital",
        guestCount: "1,000 Guests",
        image: "/image/about.webp",
        objectPosition: "center 15%",
        shortDesc: "Rooted in authentic Kerala traditions with custom jasmine floral decor, temple percussion ensemble, and a grand 28-dish royal sadhya.",
        fullStory: "Infusing centuries-old cultural elegance with modern luxury, this Thrissur wedding featured traditional brass oil lamps, hand-strung fresh floral ceilings, and a seated royal sadhya executed with impeccable timing and warm hospitality.",
        highlights: ["Authentic 28-Dish Sadhya", "Panchavadyam Ensemble", "Jasmine Floral Ceiling", "FSSAI & ISO Certified"],
        servicesDelivered: ["Traditional Kerala Catering", "Temple Venue Decoration", "Percussion & Classical Music", "Guest Protocol"]
    },
    {
        id: "royal-emerald-floral-reception",
        title: "Royal Emerald & Champagne Stage",
        category: "Stage & Floral Decor",
        location: "Lulu Grand Ballroom, Thrissur",
        guestCount: "1,800 Guests",
        image: "/image/gallery/decoration/a65sqsjlwtcvds0jlbtg.webp",
        objectPosition: "center 40%",
        shortDesc: "Opulent emerald and champagne floral stage architecture with custom crystal chandeliers and synchronized ambient illumination.",
        fullStory: "A masterclass in contemporary event aesthetics, this ballroom transformation featured imported Dutch orchids, cascading crystal chandeliers, and an elevated VIP lounge layout crafted to create an unforgettable grand entrance.",
        highlights: ["Crystal Chandeliers", "Imported Fresh Orchids", "3D Acoustic Lighting", "Bespoke Couple Throne"],
        servicesDelivered: ["Stage Architecture & Decor", "Intelligent Light Design", "Lounge Seating Layout", "Photo Backdrop Installations"]
    },
    {
        id: "imperial-banquet-sadhya",
        title: "Imperial Kerala Feast & Global Counters",
        category: "Premium Catering",
        location: "International Convention Centre, Kochi",
        guestCount: "2,200 Guests",
        image: "/image/gallery/catering section/DSC01977.webp",
        objectPosition: "center 35%",
        shortDesc: "Flawless hospitality serving a 28-course traditional feast alongside live continental, tandoor, and artisanal dessert stations.",
        fullStory: "Food is the beating heart of Kerala celebrations. For this grand gathering, our executive master chefs orchestrated an exquisite multi-course culinary experience with zero waiting time, impeccable hygiene, and dedicated dining attendants.",
        highlights: ["2,200 Guests Served Seamlessly", "28-Course Royal Sadhya", "Live Tandoor & Dessert Counters", "100% On-Time Execution"],
        servicesDelivered: ["Five-Star Catering Service", "Live Food Theatres", "Professional Service Staff", "Custom Beverage Bars"]
    },
    {
        id: "sunset-beachside-destination",
        title: "Sunset Beachside Destination Nuptials",
        category: "Destination Events",
        location: "Leela Kovalam, Trivandrum",
        guestCount: "450 Guests",
        image: "/image/services/beach-backwater-weddings-v2.webp",
        objectPosition: "center 25%",
        shortDesc: "A breathtaking cliffside coastal celebration overlooking the Arabian Sea with bohemian chic decor and beachside twilight reception.",
        fullStory: "Perched atop the Kovalam coastline, this destination event offered guests an unforgettable weekend escape. From airport arrivals and welcome hampers to a twilight beachside exchange of vows and an open-air afterparty under the stars.",
        highlights: ["Cliffside Ocean View Mandap", "3-Day Destination Itinerary", "Beachside Acoustic Sangeet", "Curated Coastal Dining"],
        servicesDelivered: ["End-to-End Destination Planning", "Guest Accommodation Logistics", "Seaside Stage Architecture", "Sound & Lighting"]
    },
    {
        id: "annual-corporate-leadership-gala",
        title: "Annual Corporate Leadership Gala",
        category: "Corporate Galas",
        location: "Grand Hyatt Ballroom, Kochi",
        guestCount: "750 Delegates",
        image: "/image/services/corprative event bg.webp",
        objectPosition: "center center",
        shortDesc: "Sophisticated corporate awards evening with synchronized LED visual walls, state-of-the-art acoustics, and five-star banquet dining.",
        fullStory: "Designed for a multinational enterprise, this high-stakes summit required seamless audio-visual production, punctual executive schedules, and a curated gala dinner reflecting executive sophistication and precision.",
        highlights: ["750 Delegates Hosted", "Curved LED Wall Stage", "Live Synchronized Audio", "Executive Gala Dining"],
        servicesDelivered: ["Corporate Event Management", "Stage & AV Production", "VIP Protocol & Hostessing", "Gala Dinner Banquet"]
    },
    {
        id: "enchanted-garden-sangeet",
        title: "Enchanted Garden Sangeet & Music Night",
        category: "Stage & Floral Decor",
        location: "Emerald Greens, Calicut",
        guestCount: "800 Guests",
        image: "/image/gallery/decoration/vy8zosgf1unuxey8akxu.webp",
        objectPosition: "center 30%",
        shortDesc: "Fairy-tale canopy of warm lights with lush floral arches, an illuminated dance floor, and an open-air amphitheater setup.",
        fullStory: "Transforming an open garden into an ethereal wonderland of twinkling fairy lights, fragrant tuberoses, and glowing ambient lanterns. The central stage hosted high-energy dance performances and live musical fusion bands.",
        highlights: ["Over 50,000 Fairy Lights", "Interactive Photo Kiosks", "Custom LED Dance Floor", "Live Music Staging"],
        servicesDelivered: ["Open-Air Venue Styling", "Dance Floor & Truss Lighting", "Live Band Coordination", "Themed Food Trucks"]
    },
    {
        id: "cinematic-bridal-styling",
        title: "Bridal Elegance & Royal Styling",
        category: "Luxury Weddings",
        location: "Kumarakom Lake Resort",
        guestCount: "500 Guests",
        image: "/image/services/bridal Makeup.webp",
        objectPosition: "center 12%",
        shortDesc: "Signature bridal makeup, heritage jewelry coordination, and flawless HD camera-ready aesthetics tailored to cultural traditions.",
        fullStory: "Every bride deserves an aura of effortless royalty on her special day. Our elite bridal stylists delivered personalized skincare prep, authentic temple jewelry draping, and weather-resistant bridal artistry that remained radiant throughout.",
        highlights: ["HD Airbrush Artistry", "Temple Jewelry Styling", "Personal Bridal Attendant", "Pre-Shoot Touchups"],
        servicesDelivered: ["Bridal Makeup & Styling", "Groom Grooming Services", "Bridal Party Makeovers", "Pre-Wedding Shoot Styling"]
    },
    {
        id: "grand-palace-reception",
        title: "Grand Palace Heritage Reception",
        category: "Luxury Weddings",
        location: "Kowdiar Palace Grounds, Trivandrum",
        guestCount: "2,000 Guests",
        image: "/image/gallery/decoration/erkqiziwwjiquypin6j2.webp",
        objectPosition: "center 35%",
        shortDesc: "A grand palace affair with towering regal floral gates, illuminated red carpet driveways, and vintage car grand entry.",
        fullStory: "An affair of true aristocratic grandeur. Guests arrived along a private lantern-lit driveway flanked by vintage luxury cars, stepping into a monumental palace marquee illuminated by warm golden hues and classical chamber music.",
        highlights: ["Regal Entrance Gates", "Vintage Luxury Car Escort", "2,000 Guests Managed", "Classical Chamber Ensemble"],
        servicesDelivered: ["Complete Palace Styling", "Luxury Car Rental Fleet", "Five-Star Banquet Service", "Event Security & Crowd Flow"]
    }
];
