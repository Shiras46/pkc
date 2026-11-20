export interface MenuCourseSection {
    title: string;
    items: string[];
}

export interface MenuPortfolioItem {
    id: string;
    title: string;
    category: "Royal Wedding Feasts" | "Grand Kerala Sadhya" | "Reception Buffets" | "Live Food Counters" | "Continental & Pan-Asian" | "Gourmet Desserts";
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
    "All Collections",
    "Royal Wedding Feasts",
    "Grand Kerala Sadhya",
    "Reception Buffets",
    "Live Food Counters",
    "Continental & Pan-Asian",
    "Gourmet Desserts"
] as const;

export const menuPortfolioItems: MenuPortfolioItem[] = [
    {
        id: "royal-malabar-dum-biryani-feast",
        title: "The Royal Malabar Dum Biryani Feast",
        category: "Royal Wedding Feasts",
        servingCapacity: "Min 150 – 5,000+ Guests",
        courseCount: "26 Signature Courses",
        dietary: "Halal Non-Veg & Vegetarian",
        image: "/image/services/catering.webp",
        objectPosition: "center 30%",
        shortDesc: "The undisputed crown jewel of Malabar wedding hospitality. Slow-dum cooked in sealed deghs with fragrant Kaima rice, tender choice cuts, and pure golden ghee.",
        fullStory: "Food is the beating soul of Malabar weddings. Our master chefs prepare this royal feast using centuries-old dum techniques—slow-simmering tender chicken and succulent mutton over fragrant firewood coals. Served with authentic accompaniments and theatrical beverage counters, this menu guarantees an unforgettable culinary milestone.",
        highlights: [
            "Authentic Thalassery Kaima Dum",
            "Kozhi Nirachathu (Stuffed Chicken)",
            "Wayanad Hand-Ground Spices",
            "Theatrical Sulaimani Counter"
        ],
        courseSections: [
            {
                title: "Welcome Drinks & Starters",
                items: [
                    "Tender Coconut Elaneer Shake with Pulp",
                    "Fresh Mint & Kaffir Lime Refresher",
                    "Mutton Irachi Pathiri",
                    "Golden Malabar Kozhi Porichathu",
                    "Crispy Vegetable Spring Rolls with Sweet Chilli"
                ]
            },
            {
                title: "The Royal Dum Main Feast",
                items: [
                    "Thalassery Chicken Dum Biryani with Roasted Cashews & Sultanas",
                    "Slow-Cooked Malabar Mutton Curry in Rich Coconut Gravy",
                    "Kozhi Nirachathu (Traditional Stuffed Whole Chicken Roast)",
                    "Fragrant Jeerakasala Ghee Rice (Neychoru)",
                    "Malabar Coin Parotta & Soft Ari Pathiri",
                    "Tangy Dates & Lime Chutney (Eenthapazham Achar)",
                    "Pineapple & Mint Raitha",
                    "Crispy Kerala Pappad"
                ]
            },
            {
                title: "Vegetarian Delights",
                items: [
                    "Paneer Butter Masala in Velvet Gravy",
                    "Vegetable Kurma with Cashew Paste",
                    "Malabar Dal Tadka with Golden Garlic"
                ]
            },
            {
                title: "Desserts & Live Brews",
                items: [
                    "Warm Carrot Halwa with Madagascar Vanilla Ice Cream",
                    "PKC Signature Tender Coconut Souffle",
                    "Theatrical Malabar Sulaimani with Cardamom & Mint"
                ]
            }
        ],
        chefSpecial: "Prepared in traditional heavy copper deghs sealed with wheat dough, ensuring aromatic spices permeate every single grain of Kaima rice."
    },
    {
        id: "grand-travancore-royal-sadhya",
        title: "Grand Travancore 32-Course Royal Sadhya",
        category: "Grand Kerala Sadhya",
        servingCapacity: "Min 100 – 4,000+ Guests",
        courseCount: "32 Traditional Courses",
        dietary: "100% Pure Vegetarian",
        image: "/image/services/sadhya.webp",
        objectPosition: "center 25%",
        shortDesc: "An imperial seated banquet served traditionally on fresh green plantain leaves, curated with cold-pressed coconut oil, fresh garden vegetables, and 4 artisanal payasams.",
        fullStory: "A celebration of Kerala's sacred culinary heritage. Rooted in traditional temple-feast principles, every dish is prepared with zero artificial food colors or preservatives. Served in orchestrated harmony by our traditional dining attendants, this 32-course spread transforms dining into an auspicious cultural ritual.",
        highlights: [
            "32 Auspicious Plantain Leaf Dishes",
            "4 Artisanal Traditional Payasams",
            "Cold-Pressed Kerala Coconut Oil",
            "Seated Dining Protocol & Hospitality"
        ],
        courseSections: [
            {
                title: "The Plantain Leaf Starters",
                items: [
                    "Sweet Jaggery Banana Chips (Sharkara Upperi)",
                    "Crisp Salted Banana Chips (Kaya Varuthathu)",
                    "Sweet Small Nendran Banana",
                    "Twin Crispy Pappadams (Small & Big)"
                ]
            },
            {
                title: "The Four Auspicious Pickles & Relishes",
                items: [
                    "Inji Puli (Ginger, Tamarind & Dark Jaggery Confiture)",
                    "Kadu Manga Achar (Fiery Tender Cut-Mango Pickle)",
                    "Nellika Achar (Country Gooseberry Pickle)",
                    "Naranga Achar (Sun-Cured Wild Lime Pickle)"
                ]
            },
            {
                title: "Traditional Curries & Side Delicacies",
                items: [
                    "Parippu (Yellow Moong Lentil with Pure Cow Ghee)",
                    "Thiruvithamkoor Sambar with 7 Country Vegetables",
                    "Authentic Travancore Aviyal in Rich Coconut Paste",
                    "Pineapple Pachadi with Mustard Tempered Yogurt",
                    "Vellarikka Kichadi (Crisp Cucumber in Curd)",
                    "Olan (Ash Gourd & Red Beans in Gentle Coconut Milk)",
                    "Kalan (Sweet Yam in Tangy Fenugreek Yogurt Gravy)",
                    "Koottukari (Black Chickpeas with Roasted Coconut & Jaggery)",
                    "Erissery (Pumpkin & Red Gram with Toasted Coconut)",
                    "Vendakka Thoran (Crispy Okra with Fresh Coconut Flakes)",
                    "Ulli Theeyal (Shallots in Smoky Roasted Coconut Paste)",
                    "Spiced Pachamoru (Tempered Country Buttermilk)",
                    "Pepper Rasam with Crushed Coriander"
                ]
            },
            {
                title: "Artisanal Payasam Quartet",
                items: [
                    "Palada Pradhaman (Slow-Simmered Rice Flakes in Thick Milk)",
                    "Parippu Payasam (Split Moong Lentils in Dark Marayoor Jaggery)",
                    "Chakka Pradhaman (Sun-Ripened Jackfruit Preserve with Coconut Milk)",
                    "Gothambu Payasam with Soft Ghee Boli"
                ]
            }
        ],
        chefSpecial: "Prepared under the direction of master temple asans following strict Sattvic hygiene principles, using pure Marayoor organic jaggery and fresh farm coconuts."
    },
    {
        id: "majestic-grand-reception-buffet",
        title: "The Majestic Grand Reception Buffet",
        category: "Reception Buffets",
        servingCapacity: "Min 250 – 5,000+ Guests",
        courseCount: "38 Multi-Cuisine Dishes",
        dietary: "Multi-Cuisine Non-Veg & Veg",
        image: "/image/services/buffet.webp",
        objectPosition: "center 35%",
        shortDesc: "A multi-regional culinary voyage featuring live tandoor theatres, coastal seafood grills, Mughlai delicacies, and artisanal dessert stations.",
        fullStory: "Designed for high-profile wedding receptions and grand evening galas. Guests enjoy interactive live chef stations alongside opulent banquet chafers brimming with freshly cooked North Indian, coastal Malabar, and continental specialties.",
        highlights: [
            "Live Charcoal Tandoor Station",
            "Banana Leaf Wrapped Fish Pollichathu",
            "Slow-Simmered Mutton Rogan Josh",
            "Interactive Dessert Parlour"
        ],
        courseSections: [
            {
                title: "Live Welcome Sips & Appetizers",
                items: [
                    "Blue Lagoon Citrus Fizz & Guava Chilli Cooler",
                    "Murgh Malai Kebab fresh off the Tandoor",
                    "Crispy Prawn Tempura with Sweet Garlic Dip",
                    "Paneer Tikka Angara with Mint Chutney",
                    "Golden Corn & Cheese Croquettes"
                ]
            },
            {
                title: "Royal Mains & Coastal Curries",
                items: [
                    "Karimeen Pollichathu (Pearl Spot Roasted in Banana Leaf)",
                    "Kashmiri Mutton Rogan Josh with Ratanjot Gravy",
                    "Murgh Makhani (Butter Chicken in Rich Tomato-Cashew Gravy)",
                    "Paneer Lababdar & Dal Makhani",
                    "Alleppey Fish Curry with Raw Mango & Coconut Milk"
                ]
            },
            {
                title: "Rice, Dum & Breads",
                items: [
                    "Zafrani Chicken Dum Biryani with Saffron Essence",
                    "Jeera Pulao with Toasted Cashews",
                    "Live Tandoor: Garlic Naan, Butter Roti & Laccha Paratha",
                    "Malabar Flaky Coin Parottas"
                ]
            },
            {
                title: "Artisanal Dessert Studio",
                items: [
                    "Hot Gulab Jamun with Saffron Rabri",
                    "Chilled Saffron Rasmalai in Pistachio Milk",
                    "Assorted Gourmet Ice Cream with Belgian Chocolate Fountain",
                    "Carved Exotic Tropical Fruits"
                ]
            }
        ],
        chefSpecial: "Features our signature Live Fish Tawa station where fresh fish steaks are marinated on display and seared to order with shallots and curry leaves."
    },
    {
        id: "vibrant-thattu-kada-street-theatre",
        title: "Vibrant Thattu Kada & Kerala Live Street Food",
        category: "Live Food Counters",
        servingCapacity: "Min 150 – 3,000+ Guests",
        courseCount: "18 Live Interactive Theatres",
        dietary: "Live Counters (Non-Veg & Veg)",
        image: "/image/services/live-thattukada.webp",
        objectPosition: "center 40%",
        shortDesc: "Recreating the unforgettable charm of Kerala's nocturnal street culture. Sizzling tawa roasts, live appams, and theatrical frothing meter tea.",
        fullStory: "A sensation at evening Sangeets, Mehendi parties, and cocktail receptions. We bring authentic handcrafted wooden carts, vintage kerosene-style lantern decor, and theatrical master chefs who toss, sizzle, and pour right before your guests' eyes.",
        highlights: [
            "Live Appam & Stew Theatre",
            "Interactive Dosa Studio with 6 Fillings",
            "Pazham Pori with Spicy Beef Roast",
            "Theatrical Frothing Meter Chaya"
        ],
        courseSections: [
            {
                title: "Live Steamer & Tawa Counter",
                items: [
                    "Lace Vellayappam made to order",
                    "Creamy Vegetable Stew with Coconut Milk",
                    "Nadan Chicken Stew with Crushed Black Pepper",
                    "Steamed Chiratta Puttu with Spicy Kadala Curry",
                    "Kallappam with Kuttanadan Duck Roast"
                ]
            },
            {
                title: "The Live Dosa Studio",
                items: [
                    "Ghee Roast & Crispy Paper Dosa",
                    "Podi Dosa with Homemade Gunpowder",
                    "Spicy Mysore Masala Dosa",
                    "Cheese & Sweet Corn Dosa for younger guests",
                    "Hot Sambar & Trio of Coconut Chutneys"
                ]
            },
            {
                title: "Kerala Street Legends",
                items: [
                    "Hot Crispy Pazham Pori paired with Slow-Roasted Beef Roast",
                    "Steaming Kappa (Tapioca) with Fiery Fish Curry",
                    "Theatrical Kothu Parotta (Egg, Chicken & Veg options chopped on iron griddle)"
                ]
            },
            {
                title: "Live Chai & Evening Bites",
                items: [
                    "Theatrical Meter Chaya (Frothing Chai with cardamom kick)",
                    "Sulaimani Tea with Fresh Mint",
                    "Crunchy Parippu Vada & Golden Onion Uzhunnu Vada",
                    "Hot Chicken Cutlets with Sweet Dip"
                ]
            }
        ],
        chefSpecial: "Complete with traditional tea stalls, brass samovars, and live sound effects that create an unforgettable festival vibe for social guests."
    },
    {
        id: "contemporary-pan-asian-continental",
        title: "Contemporary Pan-Asian & Continental Spread",
        category: "Continental & Pan-Asian",
        servingCapacity: "Min 150 – 1,500+ Guests",
        courseCount: "24 Global Delicacies",
        dietary: "Gourmet Global (Veg & Non-Veg)",
        image: "/image/gallery/catering section/DSC01977.webp",
        objectPosition: "center 30%",
        shortDesc: "For cosmopolitan couples seeking global refinement. Live Mongolian woks, handcrafted dim sums, Italian wood-style flatbreads, and grilled coastal cuts.",
        fullStory: "Curated for destination weddings and contemporary receptions where international guests appreciate world-class flavors. Masterfully balanced sauces, fresh imported herbs, and zero MSG.",
        highlights: [
            "Live Mongolian Stir-Fry Wok",
            "Handcrafted Steamed Dim Sum Bar",
            "Live Italian Pasta Theatre",
            "Wood-Fired Style Artisanal Flatbreads"
        ],
        courseSections: [
            {
                title: "Handcrafted Dim Sum & Canapes",
                items: [
                    "Steamed Chicken Suimai with Scallion Dip",
                    "Crystal Edamame & Water Chestnut Dumplings",
                    "Bruschetta with Sun-Ripened Plum Tomatoes & Fresh Basil",
                    "Thai Chicken Satay with Creamy Peanut Sauce",
                    "Crispy Vegetable Tempura with Ponzu Dip"
                ]
            },
            {
                title: "Live Pasta & Flatbread Station",
                items: [
                    "Penne, Fusilli & Spaghetti Live Tossed",
                    "Choice of Sauces: Creamy Truffle Alfredo, Spicy Arrabbiata, Fresh Basil Pesto",
                    "Artisanal Flatbreads: Roasted Mediterranean Veggie & Barbeque Chicken",
                    "Warm Garlic Herb Focaccia"
                ]
            },
            {
                title: "Pan-Asian Wok Mains",
                items: [
                    "Singapore Golden Prawns in Sweet Garlic Sauce",
                    "Kung Pao Chicken with Roasted Peanuts",
                    "Exotic Asian Greens in Fragrant Black Bean Sauce",
                    "Classic Hakka Noodles & Burnt Garlic Fried Rice"
                ]
            },
            {
                title: "European Dessert Confections",
                items: [
                    "Classic Italian Espresso Tiramisu",
                    "Belgian Dark Chocolate Mousse Cups",
                    "Vanilla Panna Cotta with Passion Fruit Glaze"
                ]
            }
        ],
        chefSpecial: "Our live pasta and stir-fry chefs cook in full view with flames, tossing fresh pastas with extra virgin olive oil and imported parmesan cheese."
    },
    {
        id: "royal-mughlai-nawabi-banquet",
        title: "Royal Mughlai & Nawabi Heritage Feast",
        category: "Royal Wedding Feasts",
        servingCapacity: "Min 200 – 3,000+ Guests",
        courseCount: "28 Imperial Recipes",
        dietary: "Halal Non-Veg & Vegetarian",
        image: "/image/services/Wedding Catering.webp",
        objectPosition: "center 20%",
        shortDesc: "Inspired by the royal courts of Lucknow and Old Delhi. Velvety Awadhi kormas, melt-in-the-mouth kebabs, and saffron-perfumed biryanis.",
        fullStory: "A tribute to regal culinary grandeur. Each recipe honors slow-cooking techniques (dum pukht) where meat is marinated for 12 hours in yogurt, raw papaya, and whole spices before cooking over gentle charcoal embers.",
        highlights: [
            "Melt-in-Mouth Mutton Galouti Kebabs",
            "Slow-Simmered Awadhi Gosht Biryani",
            "Live Roomali Roti Tossing Theatre",
            "Rich Zafrani Shahi Tukda"
        ],
        courseSections: [
            {
                title: "The Nawabi Kebab Platter",
                items: [
                    "Melt-in-Mouth Mutton Galouti Kebabs on Mini Sheermal",
                    "Murgh Tikka Angara with Smoked Charcoal Infusion",
                    "Dahi Ke Kebab with Mint & Coriander Center",
                    "Tandoori Malai Broccoli with Cardamom Glaze"
                ]
            },
            {
                title: "Regal Gravies & Curries",
                items: [
                    "Murgh Handi Lazeez in Silken Cashew Gravy",
                    "Nalli Nihari (Slow-Simmered Lamb Shanks with Bone Marrow)",
                    "Paneer Khas Mahal in Rich Saffron Cream",
                    "Dal Bukhara (Black Lentils Simmered for 16 Hours with Butter)"
                ]
            },
            {
                title: "Royal Rice & Breads",
                items: [
                    "Awadhi Gosht Dum Biryani with Kashmiri Saffron",
                    "Mirchi Ka Salan & Burani Garlic Raita",
                    "Theatrical Roomali Roti (Spun and baked on inverted woks)",
                    "Butter Garlic Naan & Amritsari Kulcha"
                ]
            },
            {
                title: "Imperial Sweet Confections",
                items: [
                    "Royal Shahi Tukda garnished with Silver Vark & Pistachio Rabri",
                    "Zafrani Matka Phirni served in Chilled Earthen Clay Pots",
                    "Rose Petal Ice Cream with Roasted Almonds"
                ]
            }
        ],
        chefSpecial: "All gravies are finished with genuine Kashmiri saffron, hand-ground mace, and pure silver foil for authentic royal presentation."
    },
    {
        id: "coastal-arabian-seafood-extravaganza",
        title: "Royal Coastal Arabian & Seafood Extravaganza",
        category: "Reception Buffets",
        servingCapacity: "Min 150 – 2,500+ Guests",
        courseCount: "24 Ocean Catch Delicacies",
        dietary: "Fresh Catch & Halal Specialties",
        image: "/image/services/wedding-catering.webp",
        objectPosition: "center 30%",
        shortDesc: "Celebrating Kerala's 580km coastline alongside Arabian Mandi traditions. Live tawa fish grills, jumbo prawns, and fragrant smoked lamb Mandi.",
        fullStory: "Perfect for seafood aficionados and grand evening banquets. Our seafood is sourced before dawn directly from harbor auctions in Kochi and Munambam, ensuring unmatched freshness and ocean sweetness.",
        highlights: [
            "Fresh Catch Karimeen & Seer Fish Tawa",
            "Arabian Mutton & Chicken Kuzhi Mandi",
            "Spicy Kuttanadan Crab Masala",
            "Live Arabian Kunafa Counter"
        ],
        courseSections: [
            {
                title: "Ocean Starters",
                items: [
                    "Butter Garlic Jumbo Prawns",
                    "Crispy Calamari / Squid Pepper Rings",
                    "Nadan Fish Cutlets with Mint Mayo",
                    "Fish Tikka Char-Grilled with Ajwain"
                ]
            },
            {
                title: "Arabian & Coastal Mains",
                items: [
                    "Smoked Mutton Kuzhi Mandi with Fragrant Basmati Rice",
                    "Traditional Garlic Toum & Spicy Tomato Daqoos Sauce",
                    "Whole Stuffed Sea Bream Roasted in Spices",
                    "Kuttanadan Crab Roast with Roasted Coconut Spices",
                    "Alleppey Seer Fish Curry with Raw Green Mango"
                ]
            },
            {
                title: "Breads & Rice",
                items: [
                    "Fresh Fluffy Kerala Porotta",
                    "Warm Arabian Kuboos & Soft Roomali Roti",
                    "Fluffy Appam with Coconut Milk"
                ]
            },
            {
                title: "Arabian Desserts",
                items: [
                    "Hot Crispy Cheese Kunafa with Rose Sugar Syrup & Pistachios",
                    "Assorted Honey Baklava Squares",
                    "Chilled Watermelon & Mint Cooler"
                ]
            }
        ],
        chefSpecial: "Every fish is cooked fresh to order on oversized cast-iron tawas with shallots, crushed green chillies, and curry leaves."
    },
    {
        id: "artisanal-dessert-payasam-studio",
        title: "Artisanal Dessert & Gourmet Payasam Studio",
        category: "Gourmet Desserts",
        servingCapacity: "Min 150 – 5,000+ Guests",
        courseCount: "22 Sweet Masterpieces",
        dietary: "Pure Veg & Eggless Options",
        image: "/image/gallery/catering section/DSC02202.webp",
        objectPosition: "center 40%",
        shortDesc: "The ultimate sweet finale to any celebration. Bringing together traditional Kerala payasams, live Jalebi theatres, and European chocolate confectionery.",
        fullStory: "The dessert counter is the lasting memory of every wedding banquet. Our dedicated pastry master chefs and traditional sweet halwais create an irresistible spectacle of steaming jalebis, slow-simmered payasams, and artisanal ice creams.",
        highlights: [
            "4-Payasam Tasting Flight in Copper Cups",
            "Live Jalebi & Chilled Rabri Theatre",
            "PKC Signature Elaneer (Tender Coconut) Pudding",
            "Nitro Belgian Chocolate Gelato Station"
        ],
        courseSections: [
            {
                title: "Traditional Kerala Payasam Flight",
                items: [
                    "Classic Palada Pradhaman with Golden Cream Layer",
                    "Authentic Ada Pradhaman in Dark Marayoor Jaggery",
                    "Moong Dal Parippu Payasam with Coconut Chips",
                    "Chakka (Jackfruit) Pradhaman with Fresh Cardamom"
                ]
            },
            {
                title: "Live Indian Sweet Theatre",
                items: [
                    "Saffron Kesariya Jalebi fried fresh and dipped in syrup",
                    "Chilled Laccha Rabri with Crushed Pistachios",
                    "Warm Moong Dal Halwa with Ghee & Almond Slivers",
                    "Mini Angoori Gulab Jamun with Rose Caviar"
                ]
            },
            {
                title: "Continental Puddings & Mousses",
                items: [
                    "PKC Signature Tender Coconut Souffle",
                    "Mango & Passionfruit Panna Cotta",
                    "Belgian Dark Chocolate Ganache Cups",
                    "Classic Baked Caramel Custard"
                ]
            },
            {
                title: "Live Waffles & Ice Cream Parlour",
                items: [
                    "Fresh Belgian Waffles with Nutella, Maple Syrup & Strawberries",
                    "Six Gourmet Ice Cream Flavors with Toppings Bar",
                    "Chilled Falooda with Rose Jelly, Basil Seeds & Rabri"
                ]
            }
        ],
        chefSpecial: "Guests love our signature 'Payasam Flight' experience, letting them sample 4 distinct Kerala payasams in mini traditional copper cups."
    }
];
