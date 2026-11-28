import { Metadata } from "next";
import WeddingReceptionPageClient from "@/app/menu/wedding-reception/WeddingReceptionPageClient";

export const metadata: Metadata = {
    title: "Wedding Dinner Menu Builder | Interactive Catering Customizer | PKC Events Kerala",
    description: "Customise your grand wedding dinner catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
    alternates: {
        canonical: "https://pkcevents.com/menu/wedding-dinner"
    },
    openGraph: {
        title: "Wedding Dinner Menu Builder | Interactive Catering Customizer | PKC Events",
        description: "Customise your grand wedding dinner catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
        url: "https://pkcevents.com/menu/wedding-dinner",
        images: [{ url: "https://pkcevents.com/image/services/wedding-catering.webp", width: 1200, height: 800, alt: "PKC Events Wedding Dinner Menu Builder" }],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Wedding Dinner Menu Builder | Interactive Catering Customizer | PKC Events",
        description: "Customise your grand wedding dinner catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
        images: ["https://pkcevents.com/image/services/wedding-catering.webp"]
    }
};

export default function WeddingDinnerPage() {
    return <WeddingReceptionPageClient occasionTitle="Wedding Dinner" occasionSlug="wedding-dinner" />;
}
