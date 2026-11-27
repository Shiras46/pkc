import { Metadata } from "next";
import HinduWeddingSadhyaClient from "./HinduWeddingSadhyaClient";

export const metadata: Metadata = {
    title: "Hindu Wedding Sadhya Menu Customizer | Authentic Kerala Feast | PKC Events",
    description: "Interactive Hindu Wedding Sadhya menu customizer by Pride Kitchen Caterers in Kerala. Choose between Executive (23 dishes), Classic (31 dishes), Premium (39 dishes), and Grand (48 dishes) spreads on fresh plantain leaves.",
    alternates: {
        canonical: "https://pkcevents.com/menu/hindu-wedding-sadhya"
    },
    openGraph: {
        title: "Hindu Wedding Sadhya Menu Customizer | Authentic Kerala Feast | PKC Events",
        description: "Interactive Hindu Wedding Sadhya menu customizer by Pride Kitchen Caterers in Kerala. Choose between Executive (23 dishes), Classic (31 dishes), Premium (39 dishes), and Grand (48 dishes) spreads on fresh plantain leaves.",
        url: "https://pkcevents.com/menu/hindu-wedding-sadhya",
        images: [{ url: "https://pkcevents.com/image/services/sadhya.webp", width: 1200, height: 800, alt: "PKC Events Hindu Wedding Sadhya Menu Customizer" }],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Hindu Wedding Sadhya Menu Customizer | Authentic Kerala Feast | PKC Events",
        description: "Interactive Hindu Wedding Sadhya menu customizer by Pride Kitchen Caterers in Kerala. Choose between Executive, Classic, Premium, and Grand Sadhya spreads.",
        images: ["https://pkcevents.com/image/services/sadhya.webp"]
    }
};

export default function HinduWeddingSadhyaPage() {
    return <HinduWeddingSadhyaClient />;
}
