import { Metadata } from "next";
import WeddingReceptionPageClient from "@/app/menu/wedding-reception/WeddingReceptionPageClient";

export const metadata: Metadata = {
    title: "Sangeet Ceremony Menu Builder | Interactive Catering Customizer | PKC Events Kerala",
    description: "Customise your energetic sangeet ceremony party catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
    alternates: {
        canonical: "https://pkcevents.com/menu/sangeet-ceremony"
    },
    openGraph: {
        title: "Sangeet Ceremony Menu Builder | Interactive Catering Customizer | PKC Events",
        description: "Customise your energetic sangeet ceremony party catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
        url: "https://pkcevents.com/menu/sangeet-ceremony",
        images: [{ url: "https://pkcevents.com/image/gallery/catering%20section/DSC02202.webp", width: 1200, height: 800, alt: "PKC Events Sangeet Ceremony Menu Builder" }],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Sangeet Ceremony Menu Builder | Interactive Catering Customizer | PKC Events",
        description: "Customise your energetic sangeet ceremony party catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
        images: ["https://pkcevents.com/image/gallery/catering%20section/DSC02202.webp"]
    }
};

export default function SangeetCeremonyPage() {
    return <WeddingReceptionPageClient occasionTitle="Sangeet Ceremony" occasionSlug="sangeet-ceremony" />;
}
