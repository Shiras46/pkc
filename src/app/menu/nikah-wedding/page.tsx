import { Metadata } from "next";
import WeddingReceptionPageClient from "@/app/menu/wedding-reception/WeddingReceptionPageClient";

export const metadata: Metadata = {
    title: "Nikah Wedding Menu Builder | 100% Halal Certified Catering Customizer | PKC Events Kerala",
    description: "Customise your grand Malabar Nikah wedding catering menu online. 100% Halal certified feast featuring royal dum biryanis, live charcoal grills, and gourmet desserts across Premium, Classic, and Executive packages with Pride Kitchen Caterers in Kerala.",
    alternates: {
        canonical: "https://pkcevents.com/menu/nikah-wedding"
    },
    openGraph: {
        title: "Nikah Wedding Menu Builder | 100% Halal Catering Customizer | PKC Events",
        description: "Customise your grand Malabar Nikah wedding catering menu online. 100% Halal certified feast featuring royal dum biryanis, live charcoal grills, and gourmet desserts across Premium, Classic, and Executive packages with Pride Kitchen Caterers in Kerala.",
        url: "https://pkcevents.com/menu/nikah-wedding",
        images: [{ url: "https://pkcevents.com/image/services/catering.webp", width: 1200, height: 800, alt: "PKC Events Nikah Wedding Menu Builder" }],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Nikah Wedding Menu Builder | 100% Halal Catering Customizer | PKC Events",
        description: "Customise your grand Malabar Nikah wedding catering menu online. 100% Halal certified feast featuring royal dum biryanis, live charcoal grills, and gourmet desserts across Premium, Classic, and Executive packages with Pride Kitchen Caterers in Kerala.",
        images: ["https://pkcevents.com/image/services/catering.webp"]
    }
};

export default function NikahWeddingPage() {
    return (
        <WeddingReceptionPageClient
            occasionTitle="Nikah Wedding"
            occasionSlug="nikah-wedding"
            isHalal={true}
            excludedSubgroups={["Pork"]}
            excludedDishes={["Kallappam"]}
        />
    );
}
