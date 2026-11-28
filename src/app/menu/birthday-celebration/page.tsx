import { Metadata } from "next";
import WeddingReceptionPageClient from "@/app/menu/wedding-reception/WeddingReceptionPageClient";

export const metadata: Metadata = {
    title: "Birthday Celebration Menu Builder | Interactive Catering Customizer | PKC Events Kerala",
    description: "Customise your joyful birthday celebration catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
    alternates: {
        canonical: "https://pkcevents.com/menu/birthday-celebration"
    },
    openGraph: {
        title: "Birthday Celebration Menu Builder | Interactive Catering Customizer | PKC Events",
        description: "Customise your joyful birthday celebration catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
        url: "https://pkcevents.com/menu/birthday-celebration",
        images: [{ url: "https://pkcevents.com/image/gallery/catering%20section/DSC01931.webp", width: 1200, height: 800, alt: "PKC Events Birthday Celebration Menu Builder" }],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Birthday Celebration Menu Builder | Interactive Catering Customizer | PKC Events",
        description: "Customise your joyful birthday celebration catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
        images: ["https://pkcevents.com/image/gallery/catering%20section/DSC01931.webp"]
    }
};

export default function BirthdayCelebrationPage() {
    return <WeddingReceptionPageClient occasionTitle="Birthday Celebration" occasionSlug="birthday-celebration" />;
}
