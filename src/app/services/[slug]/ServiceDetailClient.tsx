"use client";

import { servicesData } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import {
    ChevronRight, Download, ChefHat, Leaf, Utensils, ShieldCheck, Users,
    CheckCircle, Users2, Calendar, Star, Clock, Palette, Award, Sparkles, MapPin, DownloadCloud, Phone, PhoneCall, ChevronDown,
    Camera, Music, Car
} from "lucide-react";
import styles from "./ServiceDetail.module.css";
import { useEffect, useState, useRef } from "react";
import QuoteModal from "@/components/ui/QuoteModal";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BrandName from "@/components/ui/BrandName";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const serviceSpecificData: Record<string, any> = {
    catering: {
        headline: "Catering Service",
        subheadline: "",
        useHalfHero: true,
        useStaggeredLayout: true,
        intro: {
            tag: "PREMIUM CATERING",
            title: "Authentic flavours, wrapped [in a heritage of shared love]",
            desc: "The soul of any celebration is reflected in the shared meal, where the taste of a culture meets the warmth of a community. Pride Kitchen Caterers & Events takes immense pride in meticulously choosing the best flavours to tantalize the taste buds, converting every event to a delicious affair. As a leading provider of wedding caterers in Kerala, we cater the cultural feast of Kerala with a fusion of the global delicacies. Reflecting a service which is more than serving.",
            image: "/image/services/premium cat.webp",
            alt: "Exquisite gourmet catering buffet styled with premium cuisines by Pride Kitchen Caterers"
        },
        floatingCard: {
            title: "Award Winning Chefs",
            desc: "Experienced chefs delivering world-class culinary artistry for every celebration.",
            icon: <ChefHat size={32} color="#fcb318" />
        },
        features: [
            { icon: <ChefHat />, title: "EXPERT CHEFS", desc: "Trained & Experienced Culinary Professionals" },
            { icon: <Leaf />, title: "FRESH INGREDIENTS", desc: "Locally Sourced & Premium Quality" },
            { icon: <Utensils />, title: "MULTI-CUISINE", desc: "Traditional, Continental, Arabian & More" },
            { icon: <ShieldCheck />, title: "HYGIENE ASSURED", desc: "Highest Standards of Safety & Cleanliness" },
            { icon: <Users />, title: "CUSTOMIZED MENUS", desc: "Tailored Menus For Every Occasion & Taste" }
        ],
        stats: [
            { icon: <Users2 size={28} />, number: "5000+", label: "Happy Clients" },
            { icon: <Award size={28} />, number: "10+", label: "Years of Excellence" },
            { icon: <Calendar size={28} />, number: "5000+", label: "Events Completed" },
            { icon: <Star size={28} />, number: "100%", label: "Client Satisfaction" }
        ],
        subServices: [
            {
                image: "/image/services/Wedding Catering.webp", icon: <Utensils color="#fcb318" />,
                title: "Wedding Catering", desc: "Weddings are a celebration of love, union and culture, embraced in the whims of tradition. We customize a hand-picked menu that reflects your distinctive story. Whether it is the soul-warming comfort of authentic Kerala dishes, continental menu, Arabic starters, or a vibrant fusion fest to grand south Indian traditional food, as specialists in luxury wedding catering in Thrissur,we curate cuisines that echo beyond the celebration.",
                alt: "Authentic Kerala wedding feast and buffet catering setup by Pride Kitchen Caterers"
            },
            {
                image: "/image/services/ARUN8992.JPG.webp", icon: <Utensils color="#fcb318" />,
                title: "Corporate Catering", desc: "In a corporate world, every detail carries weight and the food served on such events are no exception. It’s the true reflection of your company’s etiquette and standard. From high-stakes boardroom luncheon, a creative continental spread for a seminar to an expansive feast for an annual gala, we organize the perfect global cuisine that enhances your brand.",
                alt: "Corporate catering buffet line setup for premium business events in Kerala"
            },
            {
                image: "/image/services/catering.webp", icon: <Utensils color="#fcb318" />,
                title: "Kerala Traditional Sadhya", desc: "Authentic Kerala traditional sadhya is unlike any other meal. It’s the symbol of a cultural heritage wrapped in the flavour of a living tradition. We offer a true Kerala traditional menu where every district in Kerala reflects its own unique rhythm to the feast. For premium weddings, we take pride in bringing that local diversity to your banana leaf according to your preferred choice.",
                alt: "Traditional Kerala Sadhya served on banana leaf with side dishes"
            },
            {
                image: "/image/services/buffet.webp", icon: <Utensils color="#fcb318" />,
                title: "Premium Buffet Catering", desc: "A collection of food choices can be offered by any, but to offer a premium buffet experience it requires the expertise of professionals. A premium buffet is more about flavour, dishes, presentation and variety, than a collection of food items. We offer a North Indian, premium buffet and an array of veg & non-veg options. By blending the soul of regional traditions with the sophistication of our culinary artistry, we curate an exclusive menu that is as diverse as it is refined, maintaining the highest standards of hygiene & sourcing.",
                alt: "Premium buffet catering dining line with hot entrées and gourmet selection by PKC Events"
            },
            {
                image: "/image/services/live thattukada.webp", icon: <Utensils color="#fcb318" />,
                title: "Live Counters & Snack Stations", desc: "Live Counters & Snack Stations are the most anticipated attraction of any event. It’s the most loved spot where social interaction happens over sizzling fitters, fresh chaats, and indulgent desserts. We meticulously design exceptional interactive spaces for your event where chat happens over the Chaats and many varieties of short eateries.",
                alt: "Live food counters and standard Thattukada snack setup by Pride Kitchen Caterers"
            }
        ],
        whyChooseUs: [
            { icon: <Palette size={32} color="#fcb318" />, title: "Customized Menus", desc: "Tailor-made menus that match your theme and preferences." },
            { icon: <Award size={32} color="#fcb318" />, title: "Premium Quality", desc: "We use only the finest ingredients for rich and authentic taste." },
            { icon: <Clock size={32} color="#fcb318" />, title: "On-Time Service", desc: "Punctual, professional and seamless service every single time." },
            { icon: <ShieldCheck size={32} color="#fcb318" />, title: "Hygiene & Safety", desc: "Maintaining the highest standards of hygiene and food safety." },
            { icon: <Sparkles size={32} color="#fcb318" />, title: "Elegant Presentation", desc: "Beautifully presented dishes that elevate the experience." }
        ]
    },
    venue: {
        headline: "Venue Planning &\nManagement\u00a0service",
        subheadline: "",
        heroImage: "/image/services/venue banner.webp",
        heroAlt: "Grand conventions center and wedding hall banquet setup for luxury events in Kerala",
        useHalfHero: true,
        useStaggeredLayout: true,
        intro: {
            tag: "VENUE MANAGEMENT",
            title: "Spaces that [Whisper Stories]",
            desc: "The real magic of any event is unleashed in the space where it happens. Every celebration echoes a unique story, and the space must be a reflection of that narrative. As experts in event venue management in Kerala, we go far beyond simple logistics to bring that vision to life from the initial layout to the subtle nuances of decor and flow. Ensuring perfection in every detail, where the final experience feels entirely effortless.",
            image: "/image/services/Whisper Stories.webp",
            alt: "Beautifully styled outdoor wedding venue entrance representing the Whisper Stories theme by Pride Kitchen Caterers"
        },
        floatingCard: {
            title: "Premium Venues",
            desc: "Handpicked premium and luxury venues across Kerala.",
            icon: <MapPin size={32} color="#fcb318" />
        },
        features: [
            { icon: <MapPin />, title: "EXCLUSIVE VENUES", desc: "Access to Premium & Unexplored Spaces" },
            { icon: <Users />, title: "EXPERT COORDINATORS", desc: "Dedicated On-site Event Managers" },
            { icon: <Clock />, title: "LOGISTICS CONTROL", desc: "Flawless Setup & Vendor Timelines" },
            { icon: <ShieldCheck />, title: "SAFETY & LICENSES", desc: "Permits, Security & Crowd Management" },
            { icon: <Sparkles />, title: "END-TO-END EXECUTION", desc: "Effortless Execution & Spotless Cleanup" }
        ],
        stats: [
            { icon: <Users2 size={28} />, number: "5000+", label: "Happy Clients" },
            { icon: <Award size={28} />, number: "10+", label: "Years of Excellence" },
            { icon: <Calendar size={28} />, number: "5000+", label: "Events Completed" },
            { icon: <Star size={28} />, number: "100%", label: "Client Satisfaction" }
        ],
        subServices: [
            {
                image: "/image/services/Venue Selection.webp", icon: <MapPin color="#fcb318" />,
                title: "Venue Selection", desc: "The perfect destination is a dream everyone envisions for their special moments. Our discerning eyes always look out at those spaces which reflect the right character, light, and energy for your specific celebration demands. From unexplored architectural gems to scenic natural landscapes, we curate a venue for your beautiful story that finally feels at home.",
                alt: "Luxurious open-air beachfront and scenic wedding venue layouts in Kerala"
            },
            {
                image: "/image/services/On-site Coordination.webp", icon: <Users color="#fcb318" />,
                title: "On-site Coordination", desc: "Hosting is not just about arranging the event, it’s about being fully present to share in the joy. With us as your watchful guardians of your vision, you never have to miss a precious moment of your special day. Our on site-cordination team handles all the nuances behind the scenes, resolving all the complexities while you immerse yourself in the celebration.",
                alt: "Professional event coordinator managing venue settings and guest services on-site"
            },
            {
                image: "/image/services/venue3.webp", icon: <Sparkles color="#fcb318" />,
                title: "Event Execution Support", desc: "Success of any event is reflected in the perfection in the execution. With Pride Kitchen Caterers & Events, execution will never be a Herculean task, as we expertly provide logistical precision and technical strength ensuring the smooth sailing of the event. From managing the minutiae of vendor arrivals and load-ins to handling all the heavy lifting we oversee every detail to arrange a perfect physical set up for your event.",
                alt: "PKC event execution support and technical setups at wedding venue"
            }
        ],
        whyChooseUs: [
            { icon: <Palette size={32} color="#fcb318" />, title: "Custom Layouts", desc: "Bespoke venue spacing designed around your event theme." },
            { icon: <Award size={32} color="#fcb318" />, title: "Premium Access", desc: "Top conventions, heritage spots, and luxury halls." },
            { icon: <Clock size={32} color="#fcb318" />, title: "On-site Supervision", desc: "Professional coordination from start to final load-out." },
            { icon: <ShieldCheck size={32} color="#fcb318" />, title: "Risk Mitigation", desc: "Proactive backup plans for weather and operations." },
            { icon: <Sparkles size={32} color="#fcb318" />, title: "Seamless Flow", desc: "Optimized guest routing, dining area, and stage layout." }
        ]
    },
    decoration: {
        headline: "Event\nDecoration\u00a0Services",
        subheadline: "",
        heroImage: "/image/services/decoration.webp",
        heroAlt: "Breathtaking wedding entrance and stage decoration in Thrissur by Pride Kitchen Caterers",
        useHalfHero: true,
        useStaggeredLayout: true,
        intro: {
            tag: "EVENT DECORATION",
            title: "Imprints of\n[Happiness Shared]",
            desc: "Sharing is beautiful, but making it meaningful matters a lot. Every detail in your precious moments should tell a story worth remembering and at Pride Kitchen Caterers & Events, we perfectly craft that story to perfection. As experts in event decoration in Thrissur, our artistic design team paints their magic in weaving a breathtaking canvas for celebrating your events, making it an imprint of happiness for a lifetime.",
            image: "/image/services/decoration.webp",
            alt: "Grand and luxurious indoor wedding stage floral design and backdrop by Pride Kitchen Caterers"
        },
        floatingCard: {
            title: "Exquisite Decor",
            desc: "Breathtaking custom stage designs and floral artistry.",
            icon: <Sparkles size={32} color="#fcb318" />
        },
        features: [
            { icon: <Sparkles />, title: "THEME DECOR", desc: "Custom Concepts & Color Palettes" },
            { icon: <Leaf />, title: "FLORAL DESIGN", desc: "Lush & Fresh Floral Artistry" },
            { icon: <Palette />, title: "LIGHTING DESIGN", desc: "Ambient, Mood & Accent Lighting" },
            { icon: <ShieldCheck />, title: "SAFETY ASSURED", desc: "Secure Installations & High Quality Materials" },
            { icon: <Users />, title: "PERSONALISED TOUCH", desc: "Designed Around Your Unique Story" }
        ],
        stats: [
            { icon: <Users2 size={28} />, number: "5000+", label: "Happy Clients" },
            { icon: <Award size={28} />, number: "10+", label: "Years of Excellence" },
            { icon: <Calendar size={28} />, number: "5000+", label: "Events Completed" },
            { icon: <Star size={28} />, number: "100%", label: "Client Satisfaction" }
        ],
        subServices: [
            {
                image: "/image/services/floral.webp", icon: <Sparkles color="#fcb318" />,
                title: "Stage & Floral Decoration", desc: "Every shared smile deserves a backdrop which reflects the day of your happy moments. Our professional team makes every vision of your event exceptional that syncs perfectly with both the event’s spirit and your desire. We specialize in wedding stage decorations in Kerala, transforming your vision into a visual treat with lush floral artistry to grand stage designs. With us your special moments are not only special, but truly unforgettable as well.",
                alt: "Fascinating stage and fresh floral decoration for Kerala wedding ceremony"
            },
            {
                image: "/image/services/lighting-ambience-design.webp", icon: <Sparkles color="#fcb318" />,
                title: "Lighting & Ambience Design", desc: "The soul of any event lies in the harmony of its ambience and lighting. Creating an ambience highlighting the emotions is an essential element of any event. We masterfully design the lights to create the perfect mood for your precious moments. By layering different layers, tones, textures and colours, we transform your special day to a magical dreamy affair.",
                alt: "Elegant lighting and premium ambience setup for dinner reception"
            }
        ],
        whyChooseUs: [
            { icon: <Palette size={32} color="#fcb318" />, title: "Artistic Vision", desc: "Talented design team that breathes life into spaces." },
            { icon: <Award size={32} color="#fcb318" />, title: "Premium Quality", desc: "Finest silks, florals, and state-of-the-art lighting equipment." },
            { icon: <Clock size={32} color="#fcb318" />, title: "Punctual Setup", desc: "Early venue decoration completion for dynamic adjustments." },
            { icon: <ShieldCheck size={32} color="#fcb318" />, title: "Reliability", desc: "Trusted by families and corporations across Thrissur." },
            { icon: <Sparkles size={32} color="#fcb318" />, title: "Unique Ambience", desc: "Immersive mood creation highlighting core sentiments." }
        ]
    },
    photography: {
        headline: "Photography & Videography",
        subheadline: "",
        heroImage: "/image/services/photography.webp",
        heroAlt: "Professional event photography service by PKC Events in Thrissur",
        useHalfHero: true,
        useStaggeredLayout: true,
        intro: {
            tag: "VISUAL STORYTELLERS",
            title: "Every Frame Tells\n[A Unique Story of Joy]",
            desc: "Every special event is an imprint of beautiful memories. Framing the shared laugh, quiet glances and the tears of joy are the unscripted true essence of every beautiful celebration. As a leading name for wedding photography in Thrissur, our visual storytellers capture every those little glimpses in a cinematic style, allowing your future generations to relive those special moments of your life.",
            image: "/image/services/Every Frame.webp",
            alt: "Candid close-up capture of a happy wedding bride, showcasing professional photography by PKC visual storytellers"
        },
        floatingCard: {
            title: "Cinematic Capture",
            desc: "Capturing unscripted emotions and artistic visual stories.",
            icon: <Camera size={32} color="#fcb318" />
        },
        features: [
            { icon: <Camera />, title: "EXPERT TEAMS", desc: "Trained Candid & Traditional Artists" },
            { icon: <Sparkles />, title: "CINEMATIC STYLE", desc: "High Definition Films & Reel Creation" },
            { icon: <Palette />, title: "PREMIUM GRADING", desc: "Professional Color Correction & Editing" },
            { icon: <ShieldCheck />, title: "SECURE BACKUP", desc: "Double Storage to Prevent Any Data Loss" },
            { icon: <Users />, title: "GUEST COMFORT", desc: "Friendly Shooters Ensuring Natural Smiles" }
        ],
        stats: [
            { icon: <Users2 size={28} />, number: "5000+", label: "Happy Clients" },
            { icon: <Award size={28} />, number: "10+", label: "Years of Excellence" },
            { icon: <Calendar size={28} />, number: "5000+", label: "Events Completed" },
            { icon: <Star size={28} />, number: "100%", label: "Client Satisfaction" }
        ],
        subServices: [
            {
                image: "/image/services/Wedding Photography.webp", icon: <Camera color="#fcb318" />,
                title: "Wedding Photography", desc: "A wedding is the beginning of a lifetime of togetherness. A union which needs to be framed and treasured forever. Every glance, excitement, fun and the pure depth of emotions tells a distinctive story, which deserves to be framed. Our photographers are specialized in capturing those unique beautiful instants, transforming them into a timeless visual heirloom. We don’t just deliver photographs, but a portal to revisit the magic of your wedding day, year after year.",
                alt: "Candid wedding couple portrait photography with natural outdoor background in Kerala"
            },
            {
                image: "/image/services/Cinematic Videography.webp", icon: <Camera color="#fcb318" />,
                title: "Cinematic Videography", desc: "Your wedding story deserves the magic of an eternal cinema. Recording the whole rituals alone won’t bring the magic it deserves. As experts in event videography in Kerala, we produce films that capture the true essence of your wedding day, weaving a revisit to the memory lane of your most special day for a lifetime. Our creative filmmakers with their artistic and professional expertise create a high-definition masterpiece out of your wedding day.",
                alt: "Professional videographer filming a wedding ceremony with modern camera gear"
            },
            {
                image: "/image/services/event-highlights-reels.webp", icon: <Camera color="#fcb318" />,
                title: "Event Highlights & Reels", desc: "The best moments are often the short-lived and irreplaceable ones. Such moments deserve to be visualized beautifully and shared instantly. Our expert team specializes in crafting instagramable reels and high-energy highlights that artfully capture all the vibrant spirit of your event into a sharable story. Transforming your wedding story into a digital imprint of happiness.",
                alt: "A fast-paced video highlight/reel capture of wedding guest expressions and celebrations"
            }
        ],
        whyChooseUs: [
            { icon: <Palette size={32} color="#fcb318" />, title: "Artistic Direction", desc: "Beautiful posing, lighting setup, and candid timing." },
            { icon: <Award size={32} color="#fcb318" />, title: "Modern Gear", desc: "Ultra HD cameras, drones, stable gimbals and tools." },
            { icon: <Clock size={32} color="#fcb318" />, title: "Timely Delivery", desc: "Quick color-graded album and video drafts." },
            { icon: <ShieldCheck size={32} color="#fcb318" />, title: "Hygiene & Setup", desc: "Punctual, unobtrusive and neat execution on site." },
            { icon: <Sparkles size={32} color="#fcb318" />, title: "Emotion Focused", desc: "Catching the raw laughter and tears of your loved ones." }
        ]
    },
    makeup: {
        headline: "Make-up Services",
        subheadline: "",
        heroImage: "/image/services/makeup banner.webp",
        heroAlt: "Premium bridal makeup styling and skin care by Pride Kitchen Caterers",
        useHalfHero: true,
        useStaggeredLayout: true,
        intro: {
            tag: "ROYAL ESSENCE",
            title: "Enhancing the\n[Royalness in You]",
            desc: "Beauty lies in the eyes of the beholder and we turn every sight into a fairytale. The true essence of makeup is not to change, but to uplift your authentic self by enhancing your natural features while expressing your unique style. At Pride Kitchen Caterers & Events, we provide the expert touch needed for you to meet the royalty within.",
            image: "/image/services/ROYAL ESSENCE.webp",
            alt: "Exquisite traditional Kerala bridal makeup with fine jewelry and crown, reflecting the royal essence"
        },
        floatingCard: {
            title: "Expert Make-up Artists",
            desc: "Bridal queen and kingly groom styling with radiant grace.",
            icon: <Sparkles size={32} color="#fcb318" />
        },
        features: [
            { icon: <Sparkles />, title: "BRIDAL ARTISTRY", desc: "Expert Artists For An Unforgettable Elegant Glow" },
            { icon: <Users />, title: "GROOM STYLING", desc: "Meticulous Styling Defining Kingly Confidence" },
            { icon: <Palette />, title: "PRE-WEDDING LOOKS", desc: "Versatile Camera-Ready Makeup Design" },
            { icon: <ShieldCheck />, title: "HYGIENE FIRST", desc: "Premium Sanitized Brands & Clean Tools" },
            { icon: <Award />, title: "ROYAL FINISH", desc: "Natural Feature Enhancement & Durability" }
        ],
        stats: [
            { icon: <Users2 size={28} />, number: "5000+", label: "Happy Clients" },
            { icon: <Award size={28} />, number: "10+", label: "Years of Excellence" },
            { icon: <Calendar size={28} />, number: "5000+", label: "Events Completed" },
            { icon: <Star size={28} />, number: "100%", label: "Client Satisfaction" }
        ],
        subServices: [
            {
                image: "/image/services/bridal Makeup.webp", icon: <Sparkles color="#fcb318" />,
                title: "Bridal Makeup", desc: "Growing up, every woman dreams of her wedding day and the way she flaunts on her special day. The princess in her would be preparing herself to unleash the royal queen in her. As a premier provider for bridal makeup in Kerala, we truly understand this precious dream and treat every bride with precision and care. Consider us the fairy godmother to your inner Cinderella, enchanting you with an unforgettable, radiant grace the moment you walk down the aisle.",
                alt: "Traditional Kerala bridal makeup showing beautiful jewelry and flowers"
            },
            {
                image: "/image/services/Kerala Groom Attire Guide_ Mundu vs Sherwani and Everything In Between.webp", icon: <Sparkles color="#fcb318" />,
                title: "Groom Styling", desc: "A wedding is a special day not just for the bride, but is equally significant for the groom. Groom styling is more than dressing up the groom with a sharp suit, it is about the minute meticulous details that defines the royalty within him. We specialize in creating a statement with your look, ensuring you stand tall with confidence beside your bride. With our magical touch you walk into your new beginning with a style that is truly kingly.",
                alt: "Kerala groom styling with standard Mundu and wedding attire"
            },
            {
                image: "/image/services/Pre-wedding Makeup.webp", icon: <Sparkles color="#fcb318" />,
                title: "Pre-wedding Makeup", desc: "The bliss before the wedding is something to cherish forever and that exactly happens with pre-wedding shoots. Your look should highlight the radiance and elegance of your love story and our make-up artists excel in creating camera-ready, versatile make-up which enhances your natural glow. Be it a sun-drenched outdoor session or a cinematic evening shoot, we craft personalized looks defining your unique style reflecting the preciousness in you.",
                alt: "Professional cameras and tools for pre-wedding makeup and photoshoots"
            }
        ],
        whyChooseUs: [
            { icon: <Palette size={32} color="#fcb318" />, title: "Premium Products", desc: "Using only top-tier globally recognized makeup brands." },
            { icon: <Award size={32} color="#fcb318" />, title: "Pro Artists", desc: "Years of specialized bridal and photography makeup expertise." },
            { icon: <Clock size={32} color="#fcb318" />, title: "Punctual Timing", desc: "Ensuring you are ready well ahead of your event timeline." },
            { icon: <ShieldCheck size={32} color="#fcb318" />, title: "Strict Hygiene", desc: "Clean brushes, sanitized setups, and safe application." },
            { icon: <Sparkles size={32} color="#fcb318" />, title: "Flawless Glow", desc: "Crafting camera-ready natural looking radiant skin." }
        ]
    },
    entertainment: {
        headline: "Entertainment Services",
        subheadline: "",
        heroImage: "/image/services/entire tainment banner.jpg",
        heroAlt: "Vibrant live musical band concert with colorful stage lights and drums at wedding party banner",
        useHalfHero: true,
        useStaggeredLayout: true,
        intro: {
            tag: "ROYAL CELEBRATIONS",
            title: "Experiences That\n[Touch Your Soul]",
            desc: "A memorable event is marked by the experience it offers you and entertainment plays a crucial role in creating it. At Pride Kitchen Caterers & Events, we make sure that your event is a vibrant festival of joy and celebration which touches every guest of yours long after the event.",
            image: "/image/services/entertainment.webp",
            alt: "Grand wedding entertainment live stage performance by PKC Events"
        },
        floatingCard: {
            title: "Live Entertainment",
            desc: "Vibrant musical bands, professional DJs, and heritage art forms.",
            icon: <Music size={32} color="#fcb318" />
        },
        features: [
            { icon: <Music />, title: "LIVE BANDS", desc: "Finest Unplugged, Classical & Fusion Ensembles" },
            { icon: <Sparkles />, title: "VIBRANT DJ", desc: "World-Class DJs paired with High-Fidelity Audio" },
            { icon: <Award />, title: "HERITAGE ARTS", desc: "Authentic Chenda Melam & Classical Art Forms" },
            { icon: <ShieldCheck />, title: "PERFECT SETUP", desc: "Premium Sound Systems & Professional Sound Engineers" },
            { icon: <Users />, title: "JOYFUL AMBIENCE", desc: "Vibrant Festival of Celebration for Every Guest" }
        ],
        stats: [
            { icon: <Users2 size={28} />, number: "5000+", label: "Happy Clients" },
            { icon: <Award size={28} />, number: "10+", label: "Years of Excellence" },
            { icon: <Calendar size={28} />, number: "5000+", label: "Events Completed" },
            { icon: <Star size={28} />, number: "100%", label: "Client Satisfaction" }
        ],
        subServices: [
            {
                image: "/image/services/live-music-bands.webp", icon: <Music color="#fcb318" />,
                title: "Live Music & Bands", desc: "Music touches the soul on a deeper level and to experience it in live is something truly magical. It’s one of the most sought-after welcome gifts you can arrange for your beloved guests. We arrange and bring the finest talents to make your celebrations a heavenly experience. Be it the classical fusion ensemble, a live unplugged band, or the high-energy performance of a grand musical troupe, we curate a musical experience transforming your venue into a haven of pure harmony.",
                alt: "Live band musicians performing on stage with musical instruments at a wedding reception"
            },
            {
                image: "/image/services/dj-sound-systems.webp", icon: <Music color="#fcb318" />,
                title: "DJ & Sound Systems", desc: "Ignite the night with a rhythm of vibrant music that resonates through every guest. Our team helps you to transform your event into an energetic retreat of music paired with world-class DJs and high-fidelity sound systems. With us backing you up, you turn on the fire on the dance floor with a vibration that stirs the spirit of everyone present.",
                alt: "Professional DJ mixer and sound systems with bright ambient club lighting"
            },
            {
                image: "/image/services/Cultural Performances.webp", icon: <Music color="#fcb318" />,
                title: "Cultural Performances", desc: "The beauty of traditional heritage is reflected in our cultural artforms. Blending those reflections through a beautiful presentation is like bringing a soul to your event. From the prestigious Chenda Melam to the different classical dance forms, we curate authentic cultural performances creating a royal charm and a spiritual depth that truly touches the soul",
                alt: "Traditional Kerala temple art performance and cultural dancers at an event reception"
            }
        ],
        whyChooseUs: [
            { icon: <Palette size={32} color="#fcb318" />, title: "Artistic Curation", desc: "Customized entertainment lineup matched to your themes." },
            { icon: <Award size={32} color="#fcb318" />, title: "Elite Artists", desc: "Professional musicians, anchors, and traditional dancers." },
            { icon: <Clock size={32} color="#fcb318" />, title: "Punctual Timeline", desc: "Perfect staging coordination with zero downtime delays." },
            { icon: <ShieldCheck size={32} color="#fcb318" />, title: "Technical Fidelity", desc: "Crystal clear acoustics with premium sound systems." },
            { icon: <Sparkles size={32} color="#fcb318" />, title: "Soulful Vibe", desc: "Creating deep emotional bonds and long-lasting memories." }
        ]
    },
    cars: {
        headline: "Wedding\nPremium Cars",
        subheadline: "",
        heroImage: "/image/services/Premium Cars/HERO IMAGE.webp",
        heroAlt: "Sleek and polished premium wedding cars fleet for grand entry in Kerala",
        useHalfHero: true,
        useStaggeredLayout: true,
        intro: {
            tag: "ROYAL RIDE",
            title: "An Entry That [Defines You]",
            desc: "Stepping into your fairytale forever deserves a celebrated entry. A royal couple deserves a royal ride that matches their stature. At Pride Kitchen Caterers & Events, we offer a pool of elite premium cars from the timeless elegance of vintage classics to the sleek sophistication of modern luxury sedans.",
            image: "/image/services/Premium Cars/MOJO-216.webp",
            alt: "A classic vintage premium wedding car parked elegantly representing royal entry by Pride Kitchen Caterers"
        },
        floatingCard: {
            title: "Luxury Wedding Cars",
            desc: "Timeless classics and sleek modern luxury sedans.",
            icon: <Car size={32} color="#fcb318" />
        },
        features: [
            { icon: <Car />, title: "PREMIUM POOL", desc: "Vintage Classics & Sleek Modern Luxury Sedans" },
            { icon: <Sparkles />, title: "BRIDAL DECOR", desc: "Floral Arrangements Coordinating with Themes" },
            { icon: <Users />, title: "EXPERT CHAUFFEURS", desc: "Professional, Safe & Courteous Drivers" },
            { icon: <ShieldCheck />, title: "HASSLE FREE", desc: "Stress-Free Journey With Poise & Peace" },
            { icon: <Award />, title: "ROYAL ENTRY", desc: "Grand Unforgettable Headturner First Appearance" }
        ],
        stats: [
            { icon: <Users2 size={28} />, number: "5000+", label: "Happy Clients" },
            { icon: <Award size={28} />, number: "10+", label: "Years of Excellence" },
            { icon: <Calendar size={28} />, number: "5000+", label: "Events Completed" },
            { icon: <Star size={28} />, number: "100%", label: "Client Satisfaction" }
        ],
        subServices: [
            {
                image: "/image/services/Premium Cars/LUXURY WEDDING CARS.webp", icon: <Car color="#fcb318" />,
                title: "Luxury Wedding Cars", desc: "Luxury is not something to be demanded, but a lifestyle to imbibe. At Pride Kitchen Caterers & Events, we understand that on your wedding day, a grand entry is never fulfilled without the presence of a masterclass luxury car. We provide you a seamless blend of class and style luxury cars that imprints an unforgettable first appearance.",
                alt: "Modern premium wedding cars entry in Kerala by PKC"
            },
            {
                image: "/image/services/Premium Cars/Bridal Entry Cars.webp", icon: <Car color="#fcb318" />,
                title: "Bridal Entry Cars", desc: "The most anticipated moment of the wedding is the grand entry of the royal bride. The bride deserves an entry which is nothing short of a cinematic experience in a luxurious premium car. We offer a wide range of a stunning selection of cars styled with the floral arrangements, complimenting the event and the bride’s grace. With our assistance we assure a breathtaking arrival of the royal bride making it a headturner moment, imprinting it into a soulful memory.",
                alt: "Bridal entry premium car beautifully decorated with dynamic floral garlands"
            },
            {
                image: "/image/services/Premium Cars/Chauffeur-driven Services.webp", icon: <Car color="#fcb318" />,
                title: "Chauffeur-driven Services", desc: "Luxury without comfort is a liability and comfort is never a demand, but a necessity. Our chauffeur-driven services deliver a hassle-free journey and professional hospitality. With a chauffeur by your side, your journey becomes a stress-free experience of pure elegance, allowing you to grace your presence with the poise and peace of mind a royal couple deserves. We handle the wheel so you can stay immersed in the joy of your celebration.",
                alt: "Polished wedding car driven by a professional chauffeur for royal comfort"
            }
        ],
        whyChooseUs: [
            { icon: <Palette size={32} color="#fcb318" />, title: "Custom Decor", desc: "Customized floral car styling that fits your wedding theme." },
            { icon: <Award size={32} color="#fcb318" />, title: "Elite Fleet", desc: "Rolls Royce, Jaguar, Audi, Mercedes, and Vintage Classics." },
            { icon: <Clock size={32} color="#fcb318" />, title: "Punctuality", desc: "Arriving early to ensure perfect timeline execution." },
            { icon: <ShieldCheck size={32} color="#fcb318" />, title: "Safe & Insured", desc: "Fully serviced, clean, safe, and certified premium vehicles." },
            { icon: <Sparkles size={32} color="#fcb318" />, title: "Grand Presence", desc: "Stunning photo-ready look for entrance snapshots." }
        ]
    }
};

const defaultData = {
    headline: "Exceptional Service.\nFlawless Execution.",
    subheadline: "We bring passion, precision, and a wealth of experience to ensure your event is nothing short of extraordinary.",
    floatingCard: {
        title: "Industry Experts",
        desc: "Dedicated professionals committed to delivering perfection.",
        icon: <Award size={32} color="#fcb318" />
    },
    features: [
        { icon: <Award />, title: "PREMIUM QUALITY", desc: "Highest standard of service" },
        { icon: <Users />, title: "EXPERT TEAM", desc: "Trained professionals" },
        { icon: <Clock />, title: "PUNCTUAL", desc: "On-time execution" },
        { icon: <CheckCircle />, title: "RELIABLE", desc: "Trusted by thousands" },
        { icon: <Sparkles />, title: "ELEGANT", desc: "Attention to detail" }
    ],
    stats: [
        { icon: <Users2 size={28} />, number: "5000+", label: "Happy Clients" },
        { icon: <Award size={28} />, number: "10+", label: "Years of Excellence" },
        { icon: <Calendar size={28} />, number: "5000+", label: "Events Completed" },
        { icon: <Star size={28} />, number: "100%", label: "Client Satisfaction" }
    ],
    subServices: [
        { image: "/image/about.webp", icon: <Star color="#fcb318" />, title: "Premium Option 1", desc: "The highest tier of service customized for your specific needs.", alt: "Pride Kitchen Caterers Option 1" },
        { image: "/image/about.webp", icon: <Star color="#fcb318" />, title: "Premium Option 2", desc: "The highest tier of service customized for your specific needs.", alt: "Pride Kitchen Caterers Option 2" },
        { image: "/image/about.webp", icon: <Star color="#fcb318" />, title: "Premium Option 3", desc: "The highest tier of service customized for your specific needs.", alt: "Pride Kitchen Caterers Option 3" },
        { image: "/image/about.webp", icon: <Star color="#fcb318" />, title: "Premium Option 4", desc: "The highest tier of service customized for your specific needs.", alt: "Pride Kitchen Caterers Option 4" }
    ],
    whyChooseUs: [
        { icon: <Award size={32} color="#fcb318" />, title: "Expertise", desc: "Years of experience in the industry." },
        { icon: <Clock size={32} color="#fcb318" />, title: "Reliability", desc: "We deliver on our promises, every time." },
        { icon: <Users size={32} color="#fcb318" />, title: "Client First", desc: "Your satisfaction is our primary goal." },
        { icon: <CheckCircle size={32} color="#fcb318" />, title: "Quality", desc: "Uncompromising standards." },
        { icon: <Sparkles size={32} color="#fcb318" />, title: "Innovation", desc: "Bringing fresh ideas to the table." }
    ]
};

export default function ServiceDetailClient({ slug }: { slug: string }) {
    const [service, setService] = useState<typeof servicesData[0] | null>(null);
    const [loading, setLoading] = useState(true);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (slug) {
            const found = servicesData.find(s => s.id === slug);
            setService(found || null);
            setLoading(false);
        }
    }, [slug]);

    useGSAP(() => {
        if (loading || !service) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const tl = gsap.timeline();

        tl.from(".hero-reveal", {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: "expo.out",
            delay: 0.2
        });

        if (!reduceMotion) {
            gsap.to(backgroundRef.current, {
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });
        }
    }, { scope: sectionRef, dependencies: [loading, service] });

    if (loading) return <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>Loading...</div>;
    if (!service) return <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>Service not found.</div>;

    const pageData = serviceSpecificData[slug] || defaultData;

    return (
        <main className={styles.detailPage}>

            {/* HERO SECTION */}
            <section ref={sectionRef} className={`${styles.hero} ${pageData.useHalfHero ? styles.halfHero : ""}`}>
                <div ref={backgroundRef} className={styles.videoContainer}>
                    <Image src={pageData.heroImage || service.image} alt={pageData.heroAlt || `${service.name} event service in Kerala by Pride Kitchen Caterers & Events`} fill sizes="100vw" priority style={{ objectFit: 'cover' }} />
                    <div className={styles.overlay}></div>
                </div>

                <div ref={contentRef} className={styles.contentContainer}>
                    <div className={`container ${styles.gridContainer}`}>
                        <div className={styles.textContent}>
                            <div className="hero-reveal">
                                <div className={styles.breadcrumb}>
                                    <Link href="/">Home</Link> <ChevronRight size={14} />
                                    <Link href="/services">Services</Link> <ChevronRight size={14} />
                                    <span className={styles.activeCrumb}>{service.name}</span>
                                </div>
                            </div>

                            <div className="hero-reveal">
                                <span className={styles.heroTag}>{service.name.toUpperCase()}</span>
                            </div>

                            <div className="hero-reveal">
                                <h1 className={styles.heading}>
                                    {(() => {
                                        const headline = pageData.headline;
                                        if (headline.includes('\n')) {
                                            return headline.split('\n').map((line: string, i: number) => (
                                                <span key={i} style={i === 1 ? { color: '#fcb318' } : undefined}>
                                                    {line}
                                                    {i < headline.split('\n').length - 1 && <br />}
                                                </span>
                                            ));
                                        }
                                        const lastSpaceIndex = headline.lastIndexOf(' ');
                                        if (lastSpaceIndex !== -1) {
                                            const firstPart = headline.substring(0, lastSpaceIndex);
                                            const lastWord = headline.substring(lastSpaceIndex + 1);
                                            return (
                                                <span>
                                                    {firstPart}{' '}
                                                    <span style={{ color: '#fcb318' }}>{lastWord}</span>
                                                </span>
                                            );
                                        }
                                        return <span>{headline}</span>;
                                    })()}
                                </h1>
                            </div>

                            {pageData.subheadline && (
                                <div className="hero-reveal">
                                    <p className={styles.subtext}>{pageData.subheadline}</p>
                                </div>
                            )}

                            <div className={`hero-reveal ${styles.btnGroup}`}>
                                <button className={styles.primaryLink} onClick={() => setIsQuoteOpen(true)}>
                                    BOOK A CONSULTATION <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* INTRO SECTION (Alternate text section below banner) */}
            {pageData.intro && (
                <section className={styles.introSection}>
                    <div className="container">
                        <div className={styles.introGrid}>
                            <motion.div
                                className={styles.introContent}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className={styles.introTag}>{pageData.intro.tag}</span>
                                <h2>
                                    {pageData.intro.title.split('\n').map((line: string, idx: number) => {
                                        const match = line.match(/^(.*?)\[(.*?)\](.*)$/);
                                        return (
                                            <span key={idx}>
                                                {match ? (
                                                    <>
                                                        {match[1]}
                                                        <span style={{ color: '#fcb318' }}>{match[2]}</span>
                                                        {match[3]}
                                                    </>
                                                ) : line}
                                                {idx < pageData.intro.title.split('\n').length - 1 && <br />}
                                            </span>
                                        );
                                    })}
                                </h2>
                                <p>{pageData.intro.desc}</p>
                                <button className={styles.introButton} onClick={() => setIsQuoteOpen(true)}>
                                    BOOK A CONSULTATION <ChevronRight size={16} />
                                </button>
                            </motion.div>
                            <motion.div
                                className={styles.introImageWrapper}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <Image
                                    src={pageData.intro.image}
                                    alt={pageData.intro.alt || `${pageData.intro.title} by PKC Events`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    style={{ objectFit: 'cover' }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* WHAT WE OFFER (SUB-SERVICES) */}
            <section className={styles.offerSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionTag}>WHAT WE OFFER</span>
                        <h2><span style={{ color: '#000000' }}>Our {service.name.split(' ')[0]}</span> Services</h2>
                    </div>

                    {pageData.useStaggeredLayout ? (
                        <div className={styles.staggeredList}>
                            {pageData.subServices.map((sub: any, idx: number) => {
                                const isEven = idx % 2 === 0;
                                return (
                                    <motion.div
                                        key={idx}
                                        className={`${styles.staggeredRow} ${!isEven ? styles.reverse : ""}`}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                    >
                                        <div className={styles.staggeredImageWrapper}>
                                            <Image
                                                src={sub.image}
                                                alt={sub.alt || `${sub.title} - ${service.name} by PKC Events`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className={styles.staggeredContent}>
                                            <h3>{sub.title}</h3>
                                            <p>{sub.desc}</p>
                                            <button className={styles.staggeredButton} onClick={() => setIsQuoteOpen(true)}>
                                                BOOK A CONSULTATION <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={styles.offerGrid}>
                            {pageData.subServices.map((sub: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    className={styles.subCard}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                >
                                    <div className={styles.subCardImage}>
                                        <Image src={sub.image} alt={sub.alt || `${sub.title} - ${service.name} by PKC Events`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                        <div className={styles.subCardIconWrapper}>
                                            <div className={styles.subCardIcon}>{sub.icon}</div>
                                        </div>
                                    </div>
                                    <div className={styles.subCardContent}>
                                        <h3>{sub.title}</h3>
                                        <p>{sub.desc}</p>
                                        <button className={styles.knowMoreBtn}>
                                            KNOW MORE <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className={styles.whySection}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionTag}>WHY CHOOSE US</span>
                    <h2><span style={{ color: '#000000' }}>Why</span> Choose Us</h2>
                </div>


                <div className={styles.whyGrid}>
                    {pageData.whyChooseUs.map((item: any, idx: number) => (
                        <motion.div
                            key={idx}
                            className={styles.whyItem}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <div className={styles.whyIcon}>{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* BOTTOM CTA */}
            <motion.section
                className={styles.bottomCtaSection}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.ctaBox}>
                    <div className={styles.ctaImagePart}>
                        <Image src={service.image} alt={`${service.name} CTA background`} fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.ctaImg} />
                    </div>
                    <div className={styles.ctaContentPart}>
                        <span className={styles.ctaTag}>LET'S CREATE SOMETHING EXCEPTIONAL</span>
                        <h2><span style={{ color: '#ffffff' }}>Ready to Create Something</span><br />Extraordinary?</h2>
                        <p>Let's design a menu that makes your event absolutely unforgettable.</p>

                        <div className={styles.ctaButtons}>
                            <button className={styles.ctaPrimaryBtn} onClick={() => setIsQuoteOpen(true)}>
                                GET A FREE QUOTE <ChevronRight size={16} />
                            </button>
                            <button className={styles.ctaOutlineBtn}>
                                TALK TO OUR EXPERTS <PhoneCall size={16} />
                            </button>
                        </div>

                        <div className={styles.ctaContact}>
                            <span><Phone size={14} /> +91 81380 02333</span>
                            <span>info@pkcevents.com</span>
                            <span><ShieldCheck size={14} /> Quick Response Guaranteed</span>
                        </div>
                    </div>
                </div>
            </motion.section>

            <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
        </main>
    );
}
