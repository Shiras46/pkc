export interface SadhyaColumnCourse {
    title: string;
    leftColumn: string[];
    rightColumn: string[];
}

export interface SadhyaPackageFlow {
    key: string;
    title: string;
    badge: string;
    subtitle: string;
    description: string;
    courses: SadhyaColumnCourse[];
}

export const SADHYA_FLOW_PACKAGES: Record<string, SadhyaPackageFlow> = {
    executive: {
        key: "executive",
        title: "EXECUTIVE SADHYA",
        badge: "23 Dishes",
        subtitle: "A TRADITIONAL AND THOUGHTFULLY CURATED WEDDING SADHYA",
        description: "An authentic selection of traditional Kerala wedding Sadhya favourites, served ceremonial-style on fresh plantain leaves.",
        courses: [
            {
                title: "RICE & MAIN CURRIES",
                leftColumn: [
                    "Chor",
                    "Ney Parippu",
                    "Sambar"
                ],
                rightColumn: [
                    "Rasam",
                    "Moru"
                ]
            },
            {
                title: "SADHYA ITEMS",
                leftColumn: [
                    "Pappadam",
                    "Kalan",
                    "Kovakka Thoran",
                    "Avial",
                    "Masala Curry",
                    "Thakali Curry",
                    "Olan"
                ],
                rightColumn: [
                    "Koottucurry",
                    "Pachadi",
                    "Kichadi",
                    "Achar",
                    "Pulinchi",
                    "Pazham"
                ]
            },
            {
                title: "VARAVU, KONDATTAM & VARATTI",
                leftColumn: [
                    "Kondattam",
                    "Kaya Varavu"
                ],
                rightColumn: [
                    "Sharkara Varatti"
                ]
            },
            {
                title: "PAYASAM",
                leftColumn: [
                    "Palada Payasam"
                ],
                rightColumn: [
                    "Parippu Payasam"
                ]
            }
        ]
    },

    classic: {
        key: "classic",
        title: "CLASSIC SADHYA",
        badge: "31 Dishes",
        subtitle: "A FULLER SELECTION OF TRADITIONAL KERALA WEDDING SADHYA FAVOURITES",
        description: "A fuller selection of traditional Kerala wedding Sadhya favourites featuring festive delicacies and time-honoured spices.",
        courses: [
            {
                title: "RICE & MAIN CURRIES",
                leftColumn: [
                    "Chor",
                    "Ney Parippu",
                    "Sambar"
                ],
                rightColumn: [
                    "Rasam",
                    "Moru"
                ]
            },
            {
                title: "SADHYA ITEMS",
                leftColumn: [
                    "Pappadam",
                    "Kalan",
                    "Kovakka Thoran",
                    "Avial",
                    "Masala Curry",
                    "Thakali Curry",
                    "Olan",
                    "Koottucurry",
                    "Pachadi",
                    "Kichadi"
                ],
                rightColumn: [
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
                title: "VARAVU, KONDATTAM & VARATTI",
                leftColumn: [
                    "Kaya Varavu",
                    "Sharkara Varatti"
                ],
                rightColumn: [
                    "Kondattam",
                    "Chena Varavu"
                ]
            },
            {
                title: "PAYASAM",
                leftColumn: [
                    "Palada Payasam"
                ],
                rightColumn: [
                    "Parippu Payasam"
                ]
            }
        ]
    },

    premium: {
        key: "premium",
        title: "PREMIUM SADHYA",
        badge: "39 Dishes",
        subtitle: "AN ELABORATE KERALA WEDDING FEAST FEATURING AN EXTENSIVE SELECTION OF TRADITIONAL DELICACIES, FESTIVE FAVOURITES AND RICH FLAVOURS",
        description: "An elaborate Kerala wedding feast featuring an extensive selection of traditional delicacies, festive favourites and rich flavours.",
        courses: [
            {
                title: "RICE & MAIN CURRIES",
                leftColumn: [
                    "Chor",
                    "Ney Parippu",
                    "Sambar"
                ],
                rightColumn: [
                    "Rasam",
                    "Moru"
                ]
            },
            {
                title: "SADHYA ITEMS",
                leftColumn: [
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
                    "Pachadi"
                ],
                rightColumn: [
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
                title: "VARAVU, KONDATTAM & VARATTI",
                leftColumn: [
                    "Kaya Varavu",
                    "Sharkara Varatti",
                    "Kondattam"
                ],
                rightColumn: [
                    "Chena Varavu",
                    "Kayapaka Kondattam"
                ]
            },
            {
                title: "PAYASAM",
                leftColumn: [
                    "Palada Payasam",
                    "Parippu Payasam"
                ],
                rightColumn: [
                    "Pazham Payasam"
                ]
            }
        ]
    },

    grand: {
        key: "grand",
        title: "GRAND SADHYA",
        badge: "48 Dishes",
        subtitle: "AN IMPERIAL ROYAL FEAST WITH THE GRANDEST SPREAD OF HERITAGE RECIPES AND CELEBRATORY SWEETS",
        description: "The ultimate imperial royal celebratory Sadhya with the grandest spread of heritage specialties, delicacies, and festival sweets.",
        courses: [
            {
                title: "RICE & MAIN CURRIES",
                leftColumn: [
                    "Chor",
                    "Ney Parippu",
                    "Sambar"
                ],
                rightColumn: [
                    "Rasam",
                    "Moru"
                ]
            },
            {
                title: "SADHYA ITEMS",
                leftColumn: [
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
                    "Nellikka Achar"
                ],
                rightColumn: [
                    "Pul Inchi",
                    "Inji Thayir",
                    "Ishtew",
                    "Cabbage Thoran",
                    "Mezhukkupuratti",
                    "Pazham",
                    "Parippuvada",
                    "Jilebi",
                    "Boli",
                    "Vendakka Kichadi",
                    "Thoran",
                    "Koorka Mezhukkupuratti",
                    "Paneer Bhurji",
                    "Soya Perattu",
                    "Ari Noorukku",
                    "Kesari",
                    "Unniyappam"
                ]
            },
            {
                title: "VARAVU, KONDATTAM & VARATTI",
                leftColumn: [
                    "Kaya Varavu",
                    "Sharkara Varatti",
                    "Kondattam"
                ],
                rightColumn: [
                    "Chena Varavu",
                    "Kayapaka Kondattam"
                ]
            },
            {
                title: "PAYASAM",
                leftColumn: [
                    "Palada Payasam",
                    "Parippu Payasam"
                ],
                rightColumn: [
                    "Pazham Payasam",
                    "Mathanga Payasam"
                ]
            }
        ]
    }
};
