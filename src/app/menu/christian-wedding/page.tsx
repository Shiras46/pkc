import { Metadata } from "next";
import WeddingReceptionPageClient from "@/app/menu/wedding-reception/WeddingReceptionPageClient";

export const metadata: Metadata = {
    title: "Christian Wedding Menu Builder | Interactive Catering Customizer | PKC Events Kerala",
    description: "Customise your grand Christian wedding catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
    alternates: {
        canonical: "https://pkcevents.com/menu/christian-wedding"
    },
    openGraph: {
        title: "Christian Wedding Menu Builder | Interactive Catering Customizer | PKC Events",
        description: "Customise your grand Christian wedding catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
        url: "https://pkcevents.com/menu/christian-wedding",
        images: [{ url: "https://pkcevents.com/image/services/Wedding%20Catering.webp", width: 1200, height: 800, alt: "PKC Events Christian Wedding Menu Builder" }],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Christian Wedding Menu Builder | Interactive Catering Customizer | PKC Events",
        description: "Customise your grand Christian wedding catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
        images: ["https://pkcevents.com/image/services/Wedding%20Catering.webp"]
    }
};

export default function ChristianWeddingPage() {
    return <WeddingReceptionPageClient occasionTitle="Christian Wedding" occasionSlug="christian-wedding" />;
}
