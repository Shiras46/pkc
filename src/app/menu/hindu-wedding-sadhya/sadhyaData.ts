export interface SadhyaCourse {
    title: string;
    items: string[];
}

export interface SadhyaPackage {
    key: string;
    title: string;
    subtitle: string;
    description: string;
    courses: SadhyaCourse[];
}

export const SADHYA_PACKAGES: Record<string, SadhyaPackage> = {
    executive: {
        key: "executive",
        title: "Executive Sadhya",
        subtitle: "Compact and authentic (23 Dishes)",
        description: "An authentic selection of traditional Kerala wedding Sadhya favourites, served ceremonial-style on fresh plantain leaves.",
        courses: [
            {
                title: "Rice & Main Curries",
                items: [
                    "Chor",
                    "Ney Parippu",
                    "Sambar",
                    "Rasam",
                    "Moru"
                ]
            },
            {
                title: "Sadhya Items",
                items: [
                    "Pappadam",
                    "Kalan",
                    "Kovakka Thoran",
                    "Avial",
                    "Masala Curry",
                    "Thakali Curry",
                    "Olan",
                    "Koottucurry",
                    "Pachadi",
                    "Kichadi",
                    "Achar",
                    "Pul Inchi",
                    "Pazham"
                ]
            },
            {
                title: "Varavu, Kondattam & Varatti",
                items: [
                    "Kondattam",
                    "Sharkara Varatti",
                    "Kaya Varavu"
                ]
            },
            {
                title: "Payasam",
                items: [
                    "Palada Payasam",
                    "Parippu Payasam"
                ]
            }
        ]
    },

    classic: {
        key: "classic",
        title: "Classic Sadhya",
        subtitle: "Balanced traditional spread (31 Dishes)",
        description: "A fuller selection of traditional Kerala wedding Sadhya favourites featuring festive delicacies and time-honoured spices.",
        courses: [
            {
                title: "Rice & Main Curries",
                items: [
                    "Chor",
                    "Ney Parippu",
                    "Sambar",
                    "Rasam",
                    "Moru"
                ]
            },
            {
                title: "Sadhya Items",
                items: [
                    "Pappadam",
                    "Kalan",
                    "Kovakka Thoran",
                    "Avial",
                    "Masala Curry",
                    "Thakali Curry",
                    "Olan",
                    "Koottucurry",
                    "Pachadi",
                    "Kichadi",
                    "Vadugapuli Achar",
                    "Manga Achar",
                    "Pul Inchi",
                    "Inji Thayir",
                    "Ishtew",
                    "Cabbage Thoran",
                    "Mezhukkupuratti",
                    "Pazham",
                    "Parippuvada",
                    "Jilebi"
                ]
            },
            {
                title: "Varavu, Kondattam & Varatti",
                items: [
                    "Kaya Varavu",
                    "Sharkara Varatti",
                    "Kondattam",
                    "Chena Varavu"
                ]
            },
            {
                title: "Payasam",
                items: [
                    "Palada Payasam",
                    "Parippu Payasam"
                ]
            }
        ]
    },

    premium: {
        key: "premium",
        title: "Premium Sadhya",
        subtitle: "Elaborate feast & rich flavours (39 Dishes)",
        description: "An elaborate Kerala wedding feast featuring an extensive selection of traditional delicacies, festive favourites and rich flavours.",
        courses: [
            {
                title: "Rice & Main Curries",
                items: [
                    "Chor",
                    "Ney Parippu",
                    "Sambar",
                    "Rasam",
                    "Moru"
                ]
            },
            {
                title: "Sadhya Items",
                items: [
                    "Pappadam",
                    "Erissery",
                    "Gobi Fry",
                    "Potato Fry",
                    "Ulli Thiyal",
                    "Kalan",
                    "Kovakka Thoran",
                    "Avial",
                    "Masala Curry",
                    "Thakali Curry",
                    "Olan",
                    "Koottucurry",
                    "Pachadi",
                    "Kichadi",
                    "Vadugapuli Achar",
                    "Manga Achar",
                    "Nellikka Achar",
                    "Pul Inchi",
                    "Inji Thayir",
                    "Ishtew",
                    "Cabbage Thoran",
                    "Mezhukkupuratti",
                    "Pazham",
                    "Parippuvada",
                    "Jilebi",
                    "Boli"
                ]
            },
            {
                title: "Varavu, Kondattam & Varatti",
                items: [
                    "Kaya Varavu",
                    "Sharkara Varatti",
                    "Kondattam",
                    "Chena Varavu",
                    "Kayapaka Kondattam"
                ]
            },
            {
                title: "Payasam",
                items: [
                    "Palada Payasam",
                    "Parippu Payasam",
                    "Pazham Payasam"
                ]
            }
        ]
    },

    grand: {
        key: "grand",
        title: "Grand Sadhya",
        subtitle: "Imperial royal spread (48 Dishes)",
        description: "The ultimate imperial royal celebratory Sadhya with the grandest spread of heritage specialties, delicacies, and festival sweets.",
        courses: [
            {
                title: "Rice & Main Curries",
                items: [
                    "Chor",
                    "Ney Parippu",
                    "Sambar",
                    "Rasam",
                    "Moru"
                ]
            },
            {
                title: "Sadhya Items",
                items: [
                    "Pappadam",
                    "Pul Inchi",
                    "Erissery",
                    "Inji Thayir",
                    "Gobi Fry",
                    "Ishtew",
                    "Potato Fry",
                    "Cabbage Thoran",
                    "Ulli Thiyal",
                    "Mezhukkupuratti",
                    "Kalan",
                    "Pazham",
                    "Kovakka Thoran",
                    "Parippuvada",
                    "Avial",
                    "Jilebi",
                    "Masala Curry",
                    "Boli",
                    "Thakali Curry",
                    "Vendakka Kichadi",
                    "Olan",
                    "Thoran",
                    "Koottucurry",
                    "Koorka Mezhukkupuratti",
                    "Pachadi",
                    "Paneer Bhurji",
                    "Kichadi",
                    "Soya Perattu",
                    "Vadugapuli Achar",
                    "Ari Noorukku",
                    "Manga Achar",
                    "Kesari",
                    "Nellikka Achar",
                    "Unniyappam"
                ]
            },
            {
                title: "Varavu, Kondattam & Varatti",
                items: [
                    "Kaya Varavu",
                    "Chena Varavu",
                    "Sharkara Varatti",
                    "Kayapaka Kondattam",
                    "Kondattam"
                ]
            },
            {
                title: "Payasam",
                items: [
                    "Palada Payasam",
                    "Pazham Payasam",
                    "Parippu Payasam",
                    "Mathanga Payasam"
                ]
            }
        ]
    }
};
