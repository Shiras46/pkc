import { Metadata } from "next";
import WeddingReceptionPageClient from "@/app/menu/wedding-reception/WeddingReceptionPageClient";

export const metadata: Metadata = {
    title: "Haldi Ceremony Menu Builder | Interactive Catering Customizer | PKC Events Kerala",
    description: "Customise your vibrant haldi ceremony catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
    alternates: {
        canonical: "https://pkcevents.com/menu/haldi-ceremony"
    },
    openGraph: {
        title: "Haldi Ceremony Menu Builder | Interactive Catering Customizer | PKC Events",
        description: "Customise your vibrant haldi ceremony catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
        url: "https://pkcevents.com/menu/haldi-ceremony",
        images: [{ url: "https://pkcevents.com/image/services/live-thattukada.webp", width: 1200, height: 800, alt: "PKC Events Haldi Ceremony Menu Builder" }],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Haldi Ceremony Menu Builder | Interactive Catering Customizer | PKC Events",
        description: "Customise your vibrant haldi ceremony catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
        images: ["https://pkcevents.com/image/services/live-thattukada.webp"]
    }
};

export default function HaldiCeremonyPage() {
    return <WeddingReceptionPageClient occasionTitle="Haldi Ceremony" occasionSlug="haldi-ceremony" />;
}
