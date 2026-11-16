import { Metadata } from "next";
import MenuClient from "../menu/MenuClient";

export const metadata: Metadata = {
    title: "Interactive Menu Selection | PKC Events Kerala",
    description: "Curate your custom catering menu from 32 pages of authentic Kerala delicacies, live counters, and grand sadhya spreads by Pride Kitchen Caterers & Events.",
    alternates: {
        canonical: "https://pkcevents.com/menu"
    }
};

export default function MenuSelectionPage() {
    return <MenuClient />;
}
