export interface MenuCourseSection {
    title: string;
    items: string[];
}

export interface MenuPortfolioItem {
    id: string;
    title: string;
    packageName?: string;
    category: string;
    filterCategory: string;
    isComingSoon?: boolean;
    servingCapacity: string;
    courseCount: string;
    dietary: string;
    image: string;
    objectPosition?: string;
    shortDesc: string;
    fullStory: string;
    highlights: string[];
    courseSections: MenuCourseSection[];
    chefSpecial: string;
}

export const menuCategories = [
    "All Celebrations",
    "Weddings & Receptions",
    "Traditional Sadhya",
    "Pre-Wedding Rituals",
    "Social & Birthdays"
] as const;

export const menuPortfolioItems: MenuPortfolioItem[] = [
    // 1. Wedding Reception (Active)
    {
        id: "wedding-reception",
        title: "Wedding Reception",
        category: "Wedding Reception",
        filterCategory: "Weddings & Receptions",
        isComingSoon: false,
        servingCapacity: "Min 200 – 5,000+ Guests",
        courseCount: "38 Signature Dishes",
        dietary: "Multi-Cuisine Non-Veg & Veg",
        image: "/image/services/buffet.webp",
        objectPosition: "center 35%",
        shortDesc: "A magnificent celebratory feast curated for grand wedding receptions across Kerala. Featuring live tandoor theatres, slow-dum biryanis, coastal seafood grills, and artisanal dessert studios.",
        fullStory: "Wedding receptions are the joyous climax of your wedding celebration—where families, colleagues, and international guests unite. Our Grand Reception menu is designed for seamless free-flow dining, featuring theatrical live grilling stations, slow-cooked royal dum biryanis, coastal seafood delicacies, and a lavish gourmet dessert boutique that leaves every guest delighted.",
        highlights: [
            "Live Charcoal Tandoor & Grill Theatres",
            "Authentic Malabar Chicken Dum Biryani",
            "Banana Leaf Wrapped Fish Pollichathu",
            "Gourmet Dessert & Payasam Studio"
        ],
        chefSpecial: "Our slow-smoked Tandoori Pomfret and 12-hour simmered Dal Bukhara served alongside live rumali rotis are the standout stars of this reception banquet.",
        courseSections: [
            {
                title: "Welcome Drinks & Mocktails",
                items: [
                    "Passion Fruit & Mint Sparkler",
                    "Blue Curaçao Citrus Fizz",
                    "Tender Coconut Elaneer Shake with Fresh Pulp",
                    "Spiced Kokum & Ginger Refresher"
                ]
            },
            {
                title: "Live Grills & Appetizers",
                items: [
                    "Murgh Malai Tikka with Mint Chutney",
                    "Tawa Fish Fry with Pickled Onions",
                    "Crispy Paneer Kurkure with Sweet Chilli Dip",
                    "Mutton Seekh Kebab with Garlic Aioli",
                    "Golden Corn & Cheese Croquettes"
                ]
            },
            {
                title: "The Grand Main Feast",
                items: [
                    "Thalassery Chicken Dum Biryani with Cashews & Sultanas",
                    "Slow-Simmered Mutton Rogan Josh in Kashmiri Spices",
                    "Kozhi Nirachathu (Traditional Stuffed Whole Chicken Roast)",
                    "Paneer Butter Masala in Rich Tomato Velouté",
                    "Saffron Fragrant Jeera Rice"
                ]
            },
            {
                title: "Artisanal Breads & Accompaniments",
                items: [
                    "Live Roomali Roti & Butter Naan",
                    "Flaky Kerala Parotta",
                    "Tangy Dates & Lime Chutney (Eenthapazham Achar)",
                    "Mint & Pomegranate Raitha",
                    "Crispy Kerala Pappad"
                ]
            },
            {
                title: "Gourmet Desserts & Payasam Studio",
                items: [
                    "Palada Pradhaman with Golden Boli",
                    "Warm Gulab Jamun with Kesari Shahi Rabri",
                    "Tender Coconut Soufflé",
                    "Artisanal Ice Creams with Belgian Chocolate Fudge"
                ]
            }
        ]
    },

    // 2. Hindu Wedding Sadhya
    {
        id: "hindu-wedding-sadhya",
        title: "Hindu Wedding Sadhya",
        packageName: "4 Curated Packages",
        category: "Hindu Wedding",
        filterCategory: "Traditional Sadhya",
        isComingSoon: false,
        servingCapacity: "Min 100 – 4,000+ Guests",
        courseCount: "4 Packages • Up to 48 Dishes",
        dietary: "100% Pure Vegetarian",
        image: "/image/services/sadhya.webp",
        objectPosition: "center 30%",
        shortDesc: "An authentic seated Kerala wedding feast on fresh plantain leaves. Interactive customizer featuring Executive (23 dishes), Classic (31 dishes), Premium (39 dishes), and Grand (48 dishes) spreads.",
        fullStory: "The Kerala Hindu Wedding Sadhya is an architectural symphony of the 6 sacred tastes (Shadruchi). Served strictly according to ceremonial seating etiquette on freshly harvested plantain leaves, our master sadhya chefs prepare 4 customizable tiers: Executive, Classic, Premium, and Grand Sadhya with cold-pressed virgin coconut oil, hand-ground spices, and pure desi cow ghee.",
        highlights: [
            "4 Packages: Executive, Classic, Premium & Grand",
            "Up to 48 Authentic Traditional Delicacies",
            "Twin to Quadruple Royal Payasams",
            "100% Pure Vegetarian & Cold-Pressed Coconut Oil"
        ],
        chefSpecial: "Our signature slow-simmered Palada Payasam and roasted coconut Parippu Payasam served hot over fragrant Chor, golden Ney Parippu, and crispy Pappadam on fresh plantain leaves.",
        courseSections: [
            {
                title: "RICE & MAIN CURRIES",
                items: [
                    "Chor",
                    "Ney Parippu",
                    "Sambar",
                    "Rasam",
                    "Moru"
                ]
            },
            {
                title: "SADHYA ITEMS",
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
                title: "VARAVU, KONDATTAM & VARATTI",
                items: [
                    "Kondattam",
                    "Sharkara Varatti",
                    "Kaya Varavu"
                ]
            },
            {
                title: "PAYASAM",
                items: [
                    "Palada Payasam",
                    "Parippu Payasam"
                ]
            }
        ]
    },

    // 3. Christian Wedding
    {
        id: "christian-wedding",
        title: "Christian Wedding",
        packageName: "3 Curated Packages",
        category: "Christian Wedding",
        filterCategory: "Weddings & Receptions",
        isComingSoon: false,
        servingCapacity: "Min 150 – 3,500+ Guests",
        courseCount: "38 Signature Dishes",
        dietary: "Non-Veg & Veg Specialties",
        image: "/image/services/Wedding Catering.webp",
        objectPosition: "center 30%",
        shortDesc: "Classic Syrian Christian and coastal church wedding hospitality. Featuring traditional Appam & Mutton Stew, Duck Mappas, slow-roasted Kerala pepper beef, and festive cakes.",
        fullStory: "Syrian Christian wedding hospitality is world-famous for its aromatic stews, rich coconut milk gravies, and slow-roasted meats. Curated specifically for church ceremony receptions and betrothal banquets, this menu brings generations of authentic Central Travancore and Coastal Christian culinary traditions to life.",
        highlights: [
            "Lace Kallappam with Rich Mutton Stew",
            "Central Travancore Kuttanad Duck Mappas",
            "Slow-Roasted Syrian Pepper Beef & Coconut Fry",
            "Festive Plum Cake & Spiced Wine Station"
        ],
        chefSpecial: "Traditional Kuttanadan Tharavu (Duck) Roast slow-cooked with fresh cracked black peppercorns, shallots, and thick first-extract coconut milk.",
        courseSections: [
            {
                title: "Church Reception Welcome & Starters",
                items: [
                    "Traditional Spiced Festive Grape Wine",
                    "Heritage Rich Fruit & Plum Cake",
                    "Golden Crumbed Chicken Cutlets with Mint Chutney",
                    "Crispy Fish Cutlets with Homemade Tartar Sauce",
                    "Fresh Green Apple & Mint Cooler"
                ]
            },
            {
                title: "Heritage Appam & Stew Bar",
                items: [
                    "Live Fluffy Lace Kallappam",
                    "Soft Steamed Vellayappam",
                    "Velvety Syrian Mutton Stew with Coconut Milk & Cinnamon",
                    "Creamy Potato & Green Pea Stew (Vegetarian)"
                ]
            },
            {
                title: "The Grand Christian Wedding Feast",
                items: [
                    "Kuttanadan Tharavu (Duck) Roast with Shallots & Pepper",
                    "Slow-Roasted Syrian Beef Pepper Fry with Coconut Slivers",
                    "Malabar Roast Chicken in Thick Brown Onion Gravy",
                    "Fragrant Ghee Rice (Neychoru) with Fried Onions & Cashews",
                    "Layered Kerala Parotta"
                ]
            },
            {
                title: "Coastal Seafood Specials",
                items: [
                    "Karimeen Pollichathu in Wilted Banana Leaf",
                    "Alleppey Fish Curry with Raw Mango & Coconut Milk",
                    "Fried Prawns with Crushed Garlic & Red Chillies"
                ]
            },
            {
                title: "Celebration Desserts",
                items: [
                    "Classic Caramel Bread Pudding",
                    "Tender Coconut Soufflé with Pistachios",
                    "Fresh Fruit Salad with Vanilla Bean Gelato"
                ]
            }
        ]
    },

    // 4. Nikah Wedding (soon)
    {
        id: "nikah-wedding",
        title: "Nikah Wedding (soon)",
        category: "Nikah Wedding",
        filterCategory: "Weddings & Receptions",
        isComingSoon: true,
        servingCapacity: "Min 200 – 6,000+ Guests",
        courseCount: "30 Royal Courses",
        dietary: "100% Halal Certified",
        image: "/image/services/catering.webp",
        objectPosition: "center 30%",
        shortDesc: "The quintessential Malabar Nikah hospitality. Authentic firewood dum Kaima biryani, Kozhi Nirachathu, Mutton Irachi Pathiri, and signature theatrical Sulaimani counters.",
        fullStory: "A Malabar Nikah celebration is an epic showcase of hospitality and rich royal flavors. Our master Ustads slow-cook fragrant Kaima dum biryani in giant copper deghs sealed with dough over burning firewood embers, ensuring every grain of rice is infused with saffron, pure ghee, and succulent halal meat.",
        highlights: [
            "Thalassery Kaima Dum Biryani in Copper Deghs",
            "Kozhi Nirachathu (Stuffed Whole Chicken Roast)",
            "Irachi Pathiri & Soft Chatti Pathiri",
            "Theatrical Samovar Sulaimani & Halwa Station"
        ],
        chefSpecial: "Authentic Thalassery Mutton Dum Biryani cooked with fragrant small-grain Kaima rice, served with our aged Dates & Lime Pickle and crispy fried cashews.",
        courseSections: [
            {
                title: "Nikah Welcome Drinks & Delicacies",
                items: [
                    "Tender Coconut Elaneer Shake with Rich Pulp",
                    "Nannari Sherbet with Basil Seeds",
                    "Mutton Irachi Pathiri (Steamed Stuffed Rice Pastry)",
                    "Crispy Unnakaya with Cashew & Raisin Filling",
                    "Malabar Kozhi Porichathu (Crispy Fried Chicken)"
                ]
            },
            {
                title: "The Imperial Nikah Dum Feast",
                items: [
                    "Thalassery Mutton Dum Biryani with Roasted Nuts & Sultanas",
                    "Malabar Chicken Dum Biryani in Sealed Copper Deghs",
                    "Kozhi Nirachathu (Traditional Stuffed Whole Chicken Roast)",
                    "Aromatic Neychoru (Jeerakasala Ghee Rice)",
                    "Mutton Dalcha Gravy with Lentils & Spices"
                ]
            },
            {
                title: "Traditional Breads & Gravies",
                items: [
                    "Paper-Thin Ari Pathiri",
                    "Flaky Malabar Coin Parotta",
                    "Slow-Cooked Malabar Mutton Korma",
                    "Chicken Varutharachathu in Roasted Coconut Gravy"
                ]
            },
            {
                title: "Accompaniments & Relishes",
                items: [
                    "Eenthapazham Achar (Sweet & Tangy Dates Pickle)",
                    "Pineapple Mint Raitha",
                    "Shallot & Green Chilli Salad",
                    "Crispy Kerala Pappad"
                ]
            },
            {
                title: "Royal Halwa & Tea Counters",
                items: [
                    "Kozhikode Halwa Assortment (Black, Wheat & Badam)",
                    "Tender Coconut Milk Pudding",
                    "Authentic Hot Samovar Sulaimani Tea with Cardamom & Mint",
                    "Traditional Mutta Mala & Pinjanathappam"
                ]
            }
        ]
    },

    // 5. Wedding Dinner
    {
        id: "wedding-dinner",
        title: "Wedding Dinner",
        packageName: "3 Curated Packages",
        category: "Wedding Dinner",
        filterCategory: "Weddings & Receptions",
        isComingSoon: false,
        servingCapacity: "Min 100 – 2,500+ Guests",
        courseCount: "38 Signature Dishes",
        dietary: "Gourmet Non-Veg & Veg",
        image: "/image/services/wedding-catering.webp",
        objectPosition: "center 40%",
        shortDesc: "An intimate, candlelit post-wedding banquet designed for modern evening celebrations. Featuring live continental pasta counters, charcoal grills, and slow roasts.",
        fullStory: "For contemporary couples looking for an upscale, relaxed evening dinner following their daytime wedding rituals. This menu combines the warmth of traditional charcoal grills with modern international live wok stations, handcrafted pasta counters, and plated gourmet desserts.",
        highlights: [
            "Live Handcrafted Pasta & Risotto Bar",
            "Charcoal Grilled Kebabs & Satay Skewers",
            "Herb-Crusted Roast Chicken with Rosemary Jus",
            "Artisanal Belgian Chocolate Fountain"
        ],
        chefSpecial: "Pan-seared Basa Fish in Lemon Butter Caper Sauce paired with creamy saffron garlic mash and grilled asparagus.",
        courseSections: [
            {
                title: "Evening Starters & Soups",
                items: [
                    "Cream of Roasted Wild Mushroom Soup with Garlic Toast",
                    "Chicken Tikka Tartlets with Mint Pearls",
                    "Crispy Herb Bruschetta with Balsamic Glaze",
                    "Fiery Sesame Chicken Strips",
                    "Spiced Watermelon & Mint Cooler"
                ]
            },
            {
                title: "Live Interactive Cooking Theatres",
                items: [
                    "Live Pasta Theatre (Penne & Fusilli in Alfredo & Arrabbiata Sauces)",
                    "Charcoal Tawa Kebab Grill (Chicken Malai Kebab, Paneer Tikka)",
                    "Indo-Chinese Live Wok Station (Hakka Noodles & Fried Rice)"
                ]
            },
            {
                title: "The Evening Banquet",
                items: [
                    "Herb-Roasted Whole Chicken with Peppercorn Jus",
                    "Awadhi Mutton Dum Biryani with Golden Fried Onions",
                    "Paneer Tikka Butter Masala in Velvety Gravy",
                    "Fresh Butter Garlic Naan & Rumali Roti",
                    "Dal Makhani Slow-Simmered for 16 Hours"
                ]
            },
            {
                title: "Salads & Continental Accompaniments",
                items: [
                    "Classic Caesar Salad with Herbed Croutons",
                    "Greek Salad with Crumbled Feta & Kalamata Olives",
                    "Garlic Herbed Potato Wedges"
                ]
            },
            {
                title: "Gourmet Desserts",
                items: [
                    "Warm Chocolate Walnut Brownie with Bourbon Vanilla Gelato",
                    "Blueberry Cheesecake Jars",
                    "Live Churro Counter with Warm Nutella Dip",
                    "Tender Coconut Soufflé"
                ]
            }
        ]
    },

    // 6. Haldi Ceremony
    {
        id: "haldi-ceremony",
        title: "Haldi Ceremony",
        packageName: "3 Curated Packages",
        category: "Haldi Ceremony",
        filterCategory: "Pre-Wedding Rituals",
        isComingSoon: false,
        servingCapacity: "Min 50 – 1,000+ Guests",
        courseCount: "38 Signature Dishes",
        dietary: "Pure Vegetarian & Refreshments",
        image: "/image/services/live-thattukada.webp",
        objectPosition: "center 35%",
        shortDesc: "Vibrant, playful, and sun-kissed flavors for energetic Haldi rituals. Fresh botanical mocktails, live chaat streets, street-style street foods, and colorful dessert bowls.",
        fullStory: "The Haldi ceremony is brimming with laughter, yellow marigolds, and playful family moments. Our Haldi menu focuses on refreshing botanical coolers, live street chaats, finger foods, and bite-sized delights that keep guests energized without interrupting the festive fun.",
        highlights: [
            "Live Delhi & Banarasi Chaat Street",
            "Botanical Citrus & Mango Mastani Counters",
            "Crispy Rajasthani Kachori & Samosa Chaat",
            "Live Kesari Matka Kulfi & Falooda Station"
        ],
        chefSpecial: "Signature Mango Mastani thick shake topped with chopped dry fruits, saffron strands, and artisanal vanilla scoops.",
        courseSections: [
            {
                title: "Sun-Kissed Coolers & Mocktails",
                items: [
                    "Aam Panna with Roasted Cumin & Black Salt",
                    "Fresh Watermelon & Holy Basil Fizz",
                    "Sugarcane & Ginger Mint Refresher",
                    "Kesari Thandai with Pistachio Dust"
                ]
            },
            {
                title: "Live Street Chaat Theatre",
                items: [
                    "Pani Puri with 3 Flavored Waters (Mint, Hing & Khatta-Meetha)",
                    "Dahi Papdi Chaat with Pomegranate & Sev",
                    "Crispy Aloo Tikki with Ragda & Chutneys",
                    "Bhel Puri in Paper Cones"
                ]
            },
            {
                title: "Savory Finger Foods",
                items: [
                    "Golden Rajasthani Pyaaz Kachori with Mint Dip",
                    "Mini Cocktail Samosas with Tamarind Chutney",
                    "Corn & Jalapeno Cheese Croquettes",
                    "Paneer Kathi Roll Bites"
                ]
            },
            {
                title: "Festive Light Mains",
                items: [
                    "Street-Style Butter Pav Bhaji with Toasted Pav",
                    "Delhi Chole with Fluffy Kulchas & Pickled Chillies",
                    "Fragrant Kashmiri Pulao with Boondi Raita"
                ]
            },
            {
                title: "Sweet Celebrations",
                items: [
                    "Live Hot Jalebi with Creamy Shahi Rabri",
                    "Kesari Matka Kulfi with Falooda & Rose Syrup",
                    "Mini Gulab Jamun Skewers"
                ]
            }
        ]
    },

    // 7. Sangeet Ceremony
    {
        id: "sangeet-ceremony",
        title: "Sangeet Ceremony",
        packageName: "3 Curated Packages",
        category: "Sangeet Ceremony",
        filterCategory: "Pre-Wedding Rituals",
        isComingSoon: false,
        servingCapacity: "Min 100 – 1,500+ Guests",
        courseCount: "38 Signature Dishes",
        dietary: "Finger Foods & Live Counters",
        image: "/image/gallery/catering section/DSC02202.webp",
        objectPosition: "center 30%",
        shortDesc: "A high-energy culinary spectacle tailored for a night of music and dance. Sizzling slider stations, live dim sum steamers, tawa kebabs, and craft mocktail mixology.",
        fullStory: "Sangeet nights are all about dynamic music, dancing, and non-stop celebration. Nobody wants to sit down for a heavy formal meal. Our Sangeet menu is built around roving finger food canapés, sizzling live tawa stations, and interactive party food counters designed to keep the dancefloor alive all night.",
        highlights: [
            "Sizzling Live Tawa Kebab Counter",
            "Steaming Bamboo Dim Sum & Bao Station",
            "Craft Mocktail Mixology Lounge",
            "Loaded Fries & Artisanal Slider Theatre"
        ],
        chefSpecial: "Smoked Galouti Kebabs on miniature Sheermal breads that literally melt in your mouth between dance performances.",
        courseSections: [
            {
                title: "Craft Mocktail Mixology Bar",
                items: [
                    "Smoked Orange & Rosemary Fizz",
                    "Spicy Guava Chilli Spritzer",
                    "Passion Fruit & Cranberry Punch",
                    "Virgin Mojito with Crushed Mint & Lime"
                ]
            },
            {
                title: "Pass-Around Party Canapés",
                items: [
                    "Melt-In-Mouth Galouti Kebab on Mini Sheermal",
                    "Crispy Peri Peri Chicken Poppers",
                    "Jalapeno & 3-Cheese Balls with Garlic Dip",
                    "Paneer Tikka Skewers with Mint Foam",
                    "Golden Fish Fingers with Tartar Sauce"
                ]
            },
            {
                title: "Theatrical Live Street Stalls",
                items: [
                    "Live Steaming Dim Sum with Fiery Chilli Oil & Garlic Soy",
                    "Pulled Chicken & Paneer Sliders on Brioche Buns",
                    "Tawa Chicken & Paneer Kathi Rolls Wrapped to Order",
                    "Loaded Truffle Parmesan Fries with Cheese Sauce"
                ]
            },
            {
                title: "Late-Night Munchies",
                items: [
                    "Mini Claypot Chicken Dum Biryani Pots",
                    "Slow-Simmered Dal Makhani with Garlic Naan Bites",
                    "Chilli Garlic Hakka Noodles"
                ]
            },
            {
                title: "Late-Night Sweet Indulgence",
                items: [
                    "Golden Churros with Warm Nutella Dip",
                    "Belgian Waffles with Caramelized Bananas & Cream",
                    "Mini Ice Cream Cones Assortment"
                ]
            }
        ]
    },

    // 8. Birthday Celebration
    {
        id: "birthday-celebration",
        title: "Birthday Celebration",
        packageName: "3 Curated Packages",
        category: "Birthday Celebration",
        filterCategory: "Social & Birthdays",
        isComingSoon: false,
        servingCapacity: "Min 50 – 1,000+ Guests",
        courseCount: "38 Signature Dishes",
        dietary: "Kids & Family Special",
        image: "/image/gallery/catering section/DSC01931.webp",
        objectPosition: "center 35%",
        shortDesc: "Joyful celebrations curated for milestone birthdays and family gatherings. Interactive live food stalls, gourmet pizza ovens, dessert fountains, and chef specials.",
        fullStory: "Whether it's a grand 1st birthday, a vibrant sweet sixteen, or a milestone 50th jubilee, our Birthday Celebration menu combines crowd-pleasing favorites with thrilling live cooking stations that entertain guests of all ages.",
        highlights: [
            "Live Woodfired Neapolitan Pizza Bar",
            "Interactive Belgian Chocolate Fountain with Dippers",
            "Loaded Nachos & Crispy Fries Theatre",
            "Customized Birthday Mocktail Station"
        ],
        chefSpecial: "Freshly spun live candy floss and chocolate fountain station paired with house-made churros and waffle pops.",
        courseSections: [
            {
                title: "Birthday Welcome Drinks & Shakes",
                items: [
                    "Bubblegum Milkshake with Sprinkles",
                    "Blue Lagoon Citrus Spritzer",
                    "Virgin Strawberry Mojito",
                    "Oreo & Chocolate Thick Shake"
                ]
            },
            {
                title: "Live Fun Food Theatres",
                items: [
                    "Live Woodfired Thin-Crust Pizzas (Margherita, BBQ Chicken, Veg Supreme)",
                    "Loaded Cheesy Nachos Bar with Guacamole & Jalapeno Salsa",
                    "Crispy French Fries Theatre (Peri-Peri, Cheese & Salted)"
                ]
            },
            {
                title: "Party Finger Foods",
                items: [
                    "Crispy Chicken Popcorn with Honey Mustard",
                    "Paneer Finger Fries with Sweet Chilli Sauce",
                    "Mini Chicken & Veg Sliders with Cheddar",
                    "Golden Vegetable Spring Rolls"
                ]
            },
            {
                title: "Comfort Family Mains",
                items: [
                    "Wok-Tossed Fried Rice & Chilli Chicken",
                    "Vegetable Hakka Noodles with Manchurian Balls",
                    "Creamy Butter Chicken with Soft Baby Naans",
                    "Jeera Rice with Yellow Dal Tadka"
                ]
            },
            {
                title: "The Birthday Dessert Carnival",
                items: [
                    "Flowing Belgian Chocolate Fountain (Marshmallows, Strawberries & Waffles)",
                    "Live Waffle Pops with Chocolate Drizzle & Rainbow Sprinkles",
                    "Red Velvet & Vanilla Cupcakes",
                    "Ice Cream Sundae Bar with Choice of Toppings"
                ]
            }
        ]
    }
];
