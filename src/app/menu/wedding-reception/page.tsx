import { Metadata } from "next";
import WeddingReceptionPageClient from "./WeddingReceptionPageClient";

export const metadata: Metadata = {
    title: "Wedding Reception Menu Builder | Interactive Catering Customizer | PKC Events Kerala",
    description: "Customise your grand wedding reception catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
    alternates: {
        canonical: "https://pkcevents.com/menu/wedding-reception"
    },
    openGraph: {
        title: "Wedding Reception Menu Builder | Interactive Catering Customizer | PKC Events",
        description: "Customise your grand wedding reception catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
        url: "https://pkcevents.com/menu/wedding-reception",
        images: [{ url: "https://pkcevents.com/image/services/buffet.webp", width: 1200, height: 800, alt: "PKC Events Wedding Reception Menu Builder" }],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Wedding Reception Menu Builder | Interactive Catering Customizer | PKC Events",
        description: "Customise your grand wedding reception catering menu online. Choose between Premium, Classic, and Executive packages across 38+ authentic delicacies with Pride Kitchen Caterers in Kerala.",
        images: ["https://pkcevents.com/image/services/buffet.webp"]
    }
};

export default function WeddingReceptionPage() {
    return <WeddingReceptionPageClient />;
}
