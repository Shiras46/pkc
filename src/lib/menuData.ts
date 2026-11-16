export interface MenuItem {
    id: string;
    name: string;
    type: "veg" | "non-veg" | "beverage" | "dessert";
    page: number;
    section: string;
    subSection: string;
}

export interface MenuSection {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    pages: number[];
    subSections: {
        title: string;
        page: number;
        items: {
            name: string;
            type: "veg" | "non-veg" | "beverage" | "dessert";
        }[];
    }[];
}

export const menuCatalog: MenuSection[] = [
    {
        id: "welcome-drinks",
        title: "Welcome Drinks & Mocktails",
        subtitle: "Live seasonal juices, milk sarbaths, fruit punches & refreshing mojitos",
        icon: "GlassWater",
        pages: [1, 2],
        subSections: [
            {
                title: "Live – Seasonal Juices",
                page: 1,
                items: [
                    { name: "Pineapple Juice", type: "beverage" },
                    { name: "Watermelon Juice", type: "beverage" },
                    { name: "Papaya Juice", type: "beverage" },
                    { name: "Mint Lime", type: "beverage" },
                    { name: "Grape Juice", type: "beverage" },
                    { name: "Guava Juice", type: "beverage" },
                    { name: "Shammam (Musk Melon)", type: "beverage" },
                    { name: "Mosambi Orange Juice", type: "beverage" },
                    { name: "Apple Juice", type: "beverage" },
                    { name: "Mango Juice", type: "beverage" }
                ]
            },
            {
                title: "Special – Milk Based",
                page: 1,
                items: [
                    { name: "Naruneendi Sarbath", type: "beverage" },
                    { name: "Mohabbat Ka Sarbath", type: "beverage" },
                    { name: "Badam Milk", type: "beverage" }
                ]
            },
            {
                title: "Classic – Fruit Crush Punch",
                page: 2,
                items: [
                    { name: "Lemon Punch", type: "beverage" },
                    { name: "Grape Punch", type: "beverage" },
                    { name: "Passion Fruit Punch", type: "beverage" },
                    { name: "Mango Punch", type: "beverage" },
                    { name: "Strawberry Punch", type: "beverage" },
                    { name: "Mixed Fruit Punch", type: "beverage" }
                ]
            },
            {
                title: "Mocktails – Mojito Variants",
                page: 2,
                items: [
                    { name: "Virgin Mojito", type: "beverage" },
                    { name: "Blue Lady", type: "beverage" },
                    { name: "Green Lagoon", type: "beverage" },
                    { name: "Green Apple Vibe", type: "beverage" },
                    { name: "Melonade Vibe", type: "beverage" },
                    { name: "Kiwi Splash", type: "beverage" },
                    { name: "Strawberry Splash", type: "beverage" },
                    { name: "Orange Splash", type: "beverage" },
                    { name: "Litchi Splash", type: "beverage" }
                ]
            }
        ]
    },
    {
        id: "starters",
        title: "Starters & Appetizers",
        subtitle: "Handcrafted chicken, beef, seafood, egg & crispy vegetarian finger bites",
        icon: "Utensils",
        pages: [3, 4, 5],
        subSections: [
            {
                title: "Non-Veg – Chicken Starters",
                page: 3,
                items: [
                    { name: "Classic Chicken Lollipop", type: "non-veg" },
                    { name: "Breaded Chicken Lollipop", type: "non-veg" },
                    { name: "Chicken Finger", type: "non-veg" },
                    { name: "Chicken Cheesy Finger", type: "non-veg" },
                    { name: "Chicken Spring Roll", type: "non-veg" },
                    { name: "Chicken Popcorn", type: "non-veg" },
                    { name: "Chicken Nuggets", type: "non-veg" },
                    { name: "Mini Chicken Samosa", type: "non-veg" },
                    { name: "Chicken Cutlet", type: "non-veg" },
                    { name: "Chicken Momos", type: "non-veg" }
                ]
            },
            {
                title: "Non-Veg – Beef Starters",
                page: 3,
                items: [
                    { name: "Classic Meat Ball", type: "non-veg" },
                    { name: "Breaded Meat Ball", type: "non-veg" },
                    { name: "Meat Samosa", type: "non-veg" },
                    { name: "Meat Cutlet", type: "non-veg" }
                ]
            },
            {
                title: "Non-Veg – Egg Starters",
                page: 4,
                items: [
                    { name: "Breaded Egg Nuggets", type: "non-veg" },
                    { name: "Egg Samosa", type: "non-veg" },
                    { name: "Egg Pakoda", type: "non-veg" },
                    { name: "Egg Momos", type: "non-veg" }
                ]
            },
            {
                title: "Fish Starters",
                page: 4,
                items: [
                    { name: "Fish Finger", type: "non-veg" },
                    { name: "Fish Popcorn", type: "non-veg" },
                    { name: "Fish Cutlet", type: "non-veg" }
                ]
            },
            {
                title: "Non-Veg – Seafood Starters",
                page: 4,
                items: [
                    { name: "Prawns Tempura", type: "non-veg" },
                    { name: "Butterfly Shrimp", type: "non-veg" },
                    { name: "Crab Claw", type: "non-veg" },
                    { name: "Popcorn Shrimp", type: "non-veg" },
                    { name: "Lobster Bite", type: "non-veg" },
                    { name: "Seafood Spring Roll", type: "non-veg" }
                ]
            },
            {
                title: "Vegetarian Starters",
                page: 5,
                items: [
                    { name: "Breaded Veg Nuggets", type: "veg" },
                    { name: "Veggie Spring Roll", type: "veg" },
                    { name: "Veg Cutlet", type: "veg" },
                    { name: "Veg Samosa", type: "veg" },
                    { name: "Veg Momos", type: "veg" },
                    { name: "French Fries", type: "veg" },
                    { name: "Jalapeno Cheesy Pops", type: "veg" },
                    { name: "Hyfun Jalapeno Cheesy Pops", type: "veg" },
                    { name: "Potato Pops", type: "veg" },
                    { name: "Paneer Pakoda", type: "veg" },
                    { name: "Paneer Tikka", type: "veg" },
                    { name: "Cheese Ball", type: "veg" },
                    { name: "Onion Rings", type: "veg" }
                ]
            }
        ]
    },
    {
        id: "soups-breads",
        title: "Soups & Kerala Breads",
        subtitle: "Hearty soups, classic Appams, Malabar Pathiris, Naans & Porottas",
        icon: "Bowl",
        pages: [6, 7, 8, 9],
        subSections: [
            {
                title: "Non-Veg – Soups",
                page: 6,
                items: [
                    { name: "Sweet Corn Chicken Soup", type: "non-veg" },
                    { name: "Hot & Sour Chicken Soup", type: "non-veg" },
                    { name: "Chicken Manchow Soup", type: "non-veg" },
                    { name: "Chicken Clear Soup", type: "non-veg" },
                    { name: "Cream of Chicken Soup", type: "non-veg" },
                    { name: "Thai Chicken Soup", type: "non-veg" },
                    { name: "Mutton Paya Soup", type: "non-veg" },
                    { name: "Seafood Chowder Soup", type: "non-veg" }
                ]
            },
            {
                title: "Vegetarian Soups",
                page: 7,
                items: [
                    { name: "Sweet Corn Veg Soup", type: "veg" },
                    { name: "Hot & Sour Veg Soup", type: "veg" },
                    { name: "Veg Manchow Soup", type: "veg" },
                    { name: "Clear Veg Soup", type: "veg" },
                    { name: "Cream of Tomato Soup", type: "veg" },
                    { name: "Cream of Mushroom Soup", type: "veg" },
                    { name: "Cream of Broccoli Soup", type: "veg" }
                ]
            },
            {
                title: "Rice Products – Appam Varieties",
                page: 7,
                items: [
                    { name: "Vellappam", type: "veg" },
                    { name: "Palappam", type: "veg" },
                    { name: "Noolappam", type: "veg" },
                    { name: "Kallappam", type: "veg" },
                    { name: "Vattayappam", type: "veg" }
                ]
            },
            {
                title: "Rice Products – Pathiri Varieties",
                page: 8,
                items: [
                    { name: "Pathiri", type: "veg" },
                    { name: "Nai Pathiri (Ghee Pathiri)", type: "veg" },
                    { name: "Pal Pathiri (Milk Pathiri)", type: "veg" },
                    { name: "Thenga Pathiri (Coconut Pathiri)", type: "veg" }
                ]
            },
            {
                title: "Rotti & Naan Varieties",
                page: 8,
                items: [
                    { name: "Rumali Rotti", type: "veg" },
                    { name: "Tandoor Rotti", type: "veg" },
                    { name: "Phulka", type: "veg" },
                    { name: "Naan", type: "veg" },
                    { name: "Butter Naan", type: "veg" },
                    { name: "Garlic Naan", type: "veg" },
                    { name: "Battoora", type: "veg" }
                ]
            },
            {
                title: "Porotta Varieties",
                page: 9,
                items: [
                    { name: "Big Porotta", type: "veg" },
                    { name: "Coin Porotta", type: "veg" },
                    { name: "Nool Porotta", type: "veg" },
                    { name: "Bun Porotta", type: "veg" },
                    { name: "Silon Porotta", type: "veg" },
                    { name: "Aloo Porotta", type: "veg" }
                ]
            },
            {
                title: "Chapathi & Bakery Breads",
                page: 9,
                items: [
                    { name: "Chapathi", type: "veg" },
                    { name: "Palak Chapathi", type: "veg" },
                    { name: "Kuboos", type: "veg" },
                    { name: "White Bread", type: "veg" },
                    { name: "Wheat Bread", type: "veg" },
                    { name: "Garlic Bread", type: "veg" },
                    { name: "Bread Roll", type: "veg" },
                    { name: "Croissant", type: "veg" }
                ]
            }
        ]
    },
    {
        id: "rice-biryani",
        title: "Biryani, Rice & Pulao",
        subtitle: "Authentic Dum Biryanis, Arabic Mandi, Fragrant Pulaos & Chinese Fried Rice",
        icon: "CookingPot",
        pages: [10, 11, 12, 13],
        subSections: [
            {
                title: "Biryani – Classic Varieties",
                page: 10,
                items: [
                    { name: "Chicken Dum Biryani", type: "non-veg" },
                    { name: "Mutton Dum Biryani", type: "non-veg" },
                    { name: "Beef Dum Biryani", type: "non-veg" },
                    { name: "Fish Dum Biryani", type: "non-veg" },
                    { name: "Kuttan Dum Biryani", type: "non-veg" }
                ]
            },
            {
                title: "Biryani – Vegetarian Varieties",
                page: 10,
                items: [
                    { name: "Vegetable Dum Biryani", type: "veg" },
                    { name: "Mushroom Dum Biryani", type: "veg" },
                    { name: "Paneer Dum Biryani", type: "veg" }
                ]
            },
            {
                title: "Biryani – Regional & Special Varieties",
                page: 11,
                items: [
                    { name: "Prawns Dum Biryani", type: "non-veg" },
                    { name: "Hyderabadi Dum Biryani", type: "non-veg" },
                    { name: "Mughlai Biryani", type: "non-veg" },
                    { name: "Ambur Chicken Biryani", type: "non-veg" },
                    { name: "Ambur Mutton Biryani", type: "non-veg" },
                    { name: "Donne Chicken Biryani", type: "non-veg" },
                    { name: "Donne Mutton Biryani", type: "non-veg" },
                    { name: "Manjali Chicken Dum Biryani", type: "non-veg" },
                    { name: "Ravuthar Chicken Biryani", type: "non-veg" },
                    { name: "Ravuthar Mutton Biryani", type: "non-veg" }
                ]
            },
            {
                title: "Arabic Specials",
                page: 11,
                items: [
                    { name: "Chicken Mandi", type: "non-veg" },
                    { name: "Chicken Majboos", type: "non-veg" }
                ]
            },
            {
                title: "Chinese Rice Varieties",
                page: 12,
                items: [
                    { name: "Chicken Fried Rice", type: "non-veg" },
                    { name: "Egg Fried Rice", type: "non-veg" },
                    { name: "Veg Fried Rice", type: "veg" },
                    { name: "Paneer Fried Rice", type: "veg" },
                    { name: "Mushroom Fried Rice", type: "veg" },
                    { name: "Gobi Fried Rice", type: "veg" },
                    { name: "Mixed Fried Rice", type: "non-veg" },
                    { name: "Schezwan Fried Rice", type: "veg" }
                ]
            },
            {
                title: "Classic Rice & Pulao Varieties",
                page: 12,
                items: [
                    { name: "Biryani Rice", type: "veg" },
                    { name: "Ghee Rice", type: "veg" },
                    { name: "Jeera Rice", type: "veg" },
                    { name: "Mandi Rice", type: "veg" },
                    { name: "Veg Pulao", type: "veg" },
                    { name: "Kashmiri Pulao", type: "veg" },
                    { name: "Navarathna Pulao", type: "veg" },
                    { name: "Afghani Pulao", type: "veg" }
                ]
            },
            {
                title: "Standard Rice Varieties",
                page: 13,
                items: [
                    { name: "Tomato Rice", type: "veg" },
                    { name: "Lemon Rice", type: "veg" },
                    { name: "Boiled Rice (Kerala Matta)", type: "veg" },
                    { name: "White Rice", type: "veg" }
                ]
            }
        ]
    },
    {
        id: "noodles",
        title: "Noodles Corner",
        subtitle: "Hakka style, Schezwan & tossed wok noodles in vegetarian and non-veg options",
        icon: "Wheat",
        pages: [13, 14],
        subSections: [
            {
                title: "Vegetarian Noodles",
                page: 13,
                items: [
                    { name: "Veg Noodles", type: "veg" },
                    { name: "Paneer Noodles", type: "veg" },
                    { name: "Veg Schezwan Noodle", type: "veg" }
                ]
            },
            {
                title: "Egg & Non-Veg Noodles",
                page: 14,
                items: [
                    { name: "Egg Noodles", type: "non-veg" },
                    { name: "Chicken Noodles", type: "non-veg" },
                    { name: "Chicken Schezwan Noodles", type: "non-veg" },
                    { name: "Mixed Noodles", type: "non-veg" }
                ]
            }
        ]
    },
    {
        id: "chicken",
        title: "Chicken Delicacies",
        subtitle: "Classic dry fries, Payyoli specialties, Arabic kebabs & aromatic curries",
        icon: "Drumstick",
        pages: [14, 15, 16, 17],
        subSections: [
            {
                title: "Dry – Classic Chicken",
                page: 14,
                items: [
                    { name: "Chicken 65", type: "non-veg" },
                    { name: "Chicken Kebab", type: "non-veg" },
                    { name: "Chicken Chilly", type: "non-veg" },
                    { name: "Chicken Kondattam", type: "non-veg" },
                    { name: "Dragon Chicken", type: "non-veg" },
                    { name: "Chicken Golden Fry", type: "non-veg" }
                ]
            },
            {
                title: "Dry – Special Chicken",
                page: 15,
                items: [
                    { name: "Payyoli Chicken Fry", type: "non-veg" },
                    { name: "Spring Chicken Fry", type: "non-veg" },
                    { name: "Chicken Drumstick", type: "non-veg" },
                    { name: "Kanthari Chicken Fry", type: "non-veg" },
                    { name: "Chicken Pepper Fry", type: "non-veg" },
                    { name: "Fried Chicken", type: "non-veg" },
                    { name: "Chicken Perattu", type: "non-veg" },
                    { name: "Chicken Peralan", type: "non-veg" },
                    { name: "Ginger Chicken", type: "non-veg" },
                    { name: "Garlic Chicken", type: "non-veg" },
                    { name: "Chicken Manchurian", type: "non-veg" },
                    { name: "Lemon Chicken", type: "non-veg" },
                    { name: "Hong Kong Chicken", type: "non-veg" },
                    { name: "Korean Fried Chicken", type: "non-veg" },
                    { name: "French Chicken", type: "non-veg" },
                    { name: "Broasted Chicken", type: "non-veg" }
                ]
            },
            {
                title: "Arabic – Classic Kebabs",
                page: 16,
                items: [
                    { name: "Malai Tikka", type: "non-veg" },
                    { name: "Hariyali Kebab", type: "non-veg" },
                    { name: "Reshmi Kebab", type: "non-veg" },
                    { name: "Tangdi Kebab", type: "non-veg" },
                    { name: "Al Faham Chicken", type: "non-veg" }
                ]
            },
            {
                title: "Curries – Special Chicken",
                page: 16,
                items: [
                    { name: "Nadan Chicken Curry", type: "non-veg" },
                    { name: "Chicken Roast", type: "non-veg" },
                    { name: "Butter Chicken", type: "non-veg" },
                    { name: "Chicken Varutharacha Curry", type: "non-veg" },
                    { name: "Chicken Malabar Kuruma", type: "non-veg" },
                    { name: "Chicken Mappas", type: "non-veg" },
                    { name: "Kadai Chicken", type: "non-veg" },
                    { name: "Chicken Kurma", type: "non-veg" },
                    { name: "Chicken Stew", type: "non-veg" },
                    { name: "Chicken Pepper Roast", type: "non-veg" },
                    { name: "Chicken with Ash Gourd (Kumbalanga)", type: "non-veg" }
                ]
            },
            {
                title: "Curries – Regional & Exotic",
                page: 17,
                items: [
                    { name: "Afghani Chicken", type: "non-veg" },
                    { name: "Chicken Vindaloo", type: "non-veg" },
                    { name: "Chicken Mulakittadhu (Spicy Curry)", type: "non-veg" },
                    { name: "Chicken Do Pyaza", type: "non-veg" },
                    { name: "Pudhina Chicken (Mint Chicken)", type: "non-veg" },
                    { name: "Guntur Chicken", type: "non-veg" },
                    { name: "Chicken Chettinad", type: "non-veg" },
                    { name: "Chicken Tikka Masala", type: "non-veg" }
                ]
            }
        ]
    },
    {
        id: "seafood",
        title: "Coastal Seafood Specials",
        subtitle: "Karimeen Pollichathu, Tawa Grilled King Fish, Prawns Ularthu & Squid Roast",
        icon: "Fish",
        pages: [17, 18, 19],
        subSections: [
            {
                title: "Fish – Tawa Grilled",
                page: 17,
                items: [
                    { name: "Tawa Grilled King Fish", type: "non-veg" },
                    { name: "Tawa Grilled Basa", type: "non-veg" },
                    { name: "Tawa Grilled Squid", type: "non-veg" },
                    { name: "Tawa Grilled Prawns", type: "non-veg" }
                ]
            },
            {
                title: "Fish – Pollichathu",
                page: 18,
                items: [
                    { name: "Fish Pollichathu – Karimeen (Pearl Spot)", type: "non-veg" },
                    { name: "Fish Pollichathu – King Fish", type: "non-veg" }
                ]
            },
            {
                title: "Fish – Curries & Traditional Specials",
                page: 18,
                items: [
                    { name: "Fish Mango Curry", type: "non-veg" },
                    { name: "Fish Vattichathu (Traditional Kerala Style)", type: "non-veg" },
                    { name: "Fish Moilee", type: "non-veg" },
                    { name: "Fish Masala", type: "non-veg" },
                    { name: "Fish Mappas", type: "non-veg" },
                    { name: "Fish Nirvana", type: "non-veg" },
                    { name: "Chilli Fish", type: "non-veg" },
                    { name: "Fish Kebab", type: "non-veg" }
                ]
            },
            {
                title: "Prawns, Squid & Clams Specials",
                page: 19,
                items: [
                    { name: "Prawns Chilli", type: "non-veg" },
                    { name: "Prawns Fry", type: "non-veg" },
                    { name: "Prawns Roast", type: "non-veg" },
                    { name: "Prawns Ularthu (Dry Roasted)", type: "non-veg" },
                    { name: "Koonthal (Squid) Roast", type: "non-veg" },
                    { name: "Koonthal Fry", type: "non-veg" },
                    { name: "Kakka (Clams) Fry", type: "non-veg" }
                ]
            }
        ]
    },
    {
        id: "meats",
        title: "Beef, Mutton, Duck & Pork",
        subtitle: "Kerala Beef Fry, Mutton Rogan Josh, Kuttanadan Duck Roast & Pork specialties",
        icon: "Flame",
        pages: [20, 21, 22, 23],
        subSections: [
            {
                title: "Beef – Dry & Curries",
                page: 20,
                items: [
                    { name: "Beef Dry Fry (BDR)", type: "non-veg" },
                    { name: "Beef Coconut Fry", type: "non-veg" },
                    { name: "Beef Kondattam", type: "non-veg" },
                    { name: "Beef Roast", type: "non-veg" },
                    { name: "Beef with Kaya (Raw Plantain)", type: "non-veg" },
                    { name: "Beef Korma", type: "non-veg" },
                    { name: "Beef Stew", type: "non-veg" },
                    { name: "Beef Peralan", type: "non-veg" },
                    { name: "Beef Vindaloo", type: "non-veg" },
                    { name: "Beef Mappas", type: "non-veg" },
                    { name: "Beef Malabari", type: "non-veg" },
                    { name: "Beef Pepper Roast", type: "non-veg" },
                    { name: "Chilli Beef", type: "non-veg" },
                    { name: "Beef Ribs", type: "non-veg" }
                ]
            },
            {
                title: "Mutton – Curries & Roasts",
                page: 21,
                items: [
                    { name: "Mutton Stew", type: "non-veg" },
                    { name: "Mutton Kurma", type: "non-veg" },
                    { name: "Mutton Mappas", type: "non-veg" },
                    { name: "Mutton Pepper Roast", type: "non-veg" },
                    { name: "Mutton Nihari", type: "non-veg" },
                    { name: "Mutton Rogan Josh", type: "non-veg" },
                    { name: "Mutton Varutharacha Curry", type: "non-veg" },
                    { name: "Mutton Kadai", type: "non-veg" }
                ]
            },
            {
                title: "Duck Curries & Roasts",
                page: 22,
                items: [
                    { name: "Kuttanadan Duck Roast", type: "non-veg" },
                    { name: "Duck Nadan Curry", type: "non-veg" },
                    { name: "Duck Peralan", type: "non-veg" },
                    { name: "Duck Green Pepper Roast", type: "non-veg" },
                    { name: "Duck Pepper Masala", type: "non-veg" },
                    { name: "Duck Varutharacha Curry", type: "non-veg" }
                ]
            },
            {
                title: "Pork – Dry & Curries",
                page: 22,
                items: [
                    { name: "Pork Nadan Fry", type: "non-veg" },
                    { name: "Pork Chilly", type: "non-veg" },
                    { name: "Pork Pepper Fry", type: "non-veg" },
                    { name: "Dragon Pork", type: "non-veg" },
                    { name: "Pork Kalyana Varattu", type: "non-veg" },
                    { name: "Pork with Kaya", type: "non-veg" },
                    { name: "Pork with Koorka", type: "non-veg" },
                    { name: "Pork Peralan", type: "non-veg" },
                    { name: "Pork Barbecue Ribs", type: "non-veg" },
                    { name: "Korean Pork", type: "non-veg" },
                    { name: "Pork Vindaloo", type: "non-veg" },
                    { name: "Pork Masala", type: "non-veg" }
                ]
            }
        ]
    },
    {
        id: "vegetarian",
        title: "Vegetarian Curries",
        subtitle: "Paneer Butter Masala, Malai Kofta, Veg Stew, Navarathna Khorma & Mushroom Masala",
        icon: "Leaf",
        pages: [24],
        subSections: [
            {
                title: "Curries Classic & Royal Gravies",
                page: 24,
                items: [
                    { name: "Veg Khorma", type: "veg" },
                    { name: "Navarathna Khorma", type: "veg" },
                    { name: "Veg Stew", type: "veg" },
                    { name: "Veg Kadai", type: "veg" },
                    { name: "Paneer Butter Masala", type: "veg" },
                    { name: "Kadai Paneer", type: "veg" },
                    { name: "Paneer Chilly", type: "veg" },
                    { name: "Shahi Paneer", type: "veg" },
                    { name: "Aloo Mutter Masala", type: "veg" },
                    { name: "Aloo Gobi Masala", type: "veg" },
                    { name: "Malai Kofta", type: "veg" },
                    { name: "Mushroom Masala", type: "veg" },
                    { name: "Crispy Fried Veg Masala", type: "veg" }
                ]
            }
        ]
    },
    {
        id: "live-counters",
        title: "Live Food Stations",
        subtitle: "Live Dosa Bar, Thattu Kada, Chaat Counter, Pizza, Burgers & Special Beverages",
        icon: "Sparkles",
        pages: [25, 26, 27, 28],
        subSections: [
            {
                title: "Live Dosa Station",
                page: 25,
                items: [
                    { name: "Masala Dosa", type: "veg" },
                    { name: "Ghee Roast", type: "veg" },
                    { name: "Plain Dosa", type: "veg" },
                    { name: "Onion Roast", type: "veg" },
                    { name: "Onion Uthappam", type: "veg" },
                    { name: "Mix Veg Uthappam", type: "veg" },
                    { name: "Thattu Dosa", type: "veg" },
                    { name: "Egg Dosa", type: "non-veg" },
                    { name: "Chicken Dosa", type: "non-veg" },
                    { name: "Podi Dosa", type: "veg" }
                ]
            },
            {
                title: "Thattu Kada & Hot Beverages",
                page: 26,
                items: [
                    { name: "Kappa & Meen Curry", type: "non-veg" },
                    { name: "Puttu & Kadala", type: "veg" },
                    { name: "Kappa Biriyani", type: "non-veg" },
                    { name: "Traditional Tea Snacks", type: "veg" },
                    { name: "Filter Coffee", type: "beverage" },
                    { name: "Chukku Kappi", type: "beverage" },
                    { name: "Masala Tea", type: "beverage" },
                    { name: "Sulaimani", type: "beverage" },
                    { name: "Hibiscus Tea", type: "beverage" },
                    { name: "Blue Tea", type: "beverage" },
                    { name: "Arabian Tea", type: "beverage" }
                ]
            },
            {
                title: "Chaat & Pizza Corner",
                page: 27,
                items: [
                    { name: "Pani Puri", type: "veg" },
                    { name: "Bhel Puri", type: "veg" },
                    { name: "Dahi Puri", type: "veg" },
                    { name: "Masala Puri", type: "veg" },
                    { name: "Sev Puri", type: "veg" },
                    { name: "Aloo Puri", type: "veg" },
                    { name: "Pav Bhaji", type: "veg" },
                    { name: "Vada Pav", type: "veg" },
                    { name: "Aloo Tikki Chaat", type: "veg" },
                    { name: "Samosa Chaat", type: "veg" },
                    { name: "Margarita Pizza", type: "veg" },
                    { name: "Garden Fresh Pizza", type: "veg" },
                    { name: "Tandoor Spicy Pizza", type: "veg" },
                    { name: "Pastami Pizza", type: "non-veg" }
                ]
            },
            {
                title: "Burgers, Sandwiches & Festive Stations",
                page: 28,
                items: [
                    { name: "Mini Chicken Burger", type: "non-veg" },
                    { name: "Mini Veg Burger", type: "veg" },
                    { name: "Egg Sandwich", type: "non-veg" },
                    { name: "Club Sandwich", type: "non-veg" },
                    { name: "Live Sugar Candy Station", type: "dessert" },
                    { name: "Live Popcorn Cart", type: "veg" },
                    { name: "Grand Chocolate Fountain", type: "dessert" }
                ]
            }
        ]
    },
    {
        id: "desserts",
        title: "Desserts & Royal Sweets",
        subtitle: "Handcrafted Indian sweets, premium ice creams, brownies, pastries & cakes",
        icon: "IceCream",
        pages: [28, 29],
        subSections: [
            {
                title: "Ice Creams & Sweets",
                page: 28,
                items: [
                    { name: "Vanilla Ice Cream", type: "dessert" },
                    { name: "Strawberry Ice Cream", type: "dessert" },
                    { name: "Chocolate Ice Cream", type: "dessert" },
                    { name: "Butter Scotch Ice Cream", type: "dessert" },
                    { name: "Gulab Jamun", type: "dessert" },
                    { name: "Yellow Jilebi", type: "dessert" },
                    { name: "Ras Malai", type: "dessert" },
                    { name: "Carrot Halwa", type: "dessert" },
                    { name: "Muffins", type: "dessert" },
                    { name: "Assorted Pastries", type: "dessert" },
                    { name: "Choco Brownie", type: "dessert" },
                    { name: "Celebration Cakes", type: "dessert" }
                ]
            }
        ]
    },
    {
        id: "grand-sadya",
        title: "Grand Kerala Sadhya",
        subtitle: "Authentic 30+ course plantain-leaf feast with classic curries, crisps & 12 Payasams",
        icon: "Crown",
        pages: [30, 31, 32],
        subSections: [
            {
                title: "Main & Traditional Curries",
                page: 30,
                items: [
                    { name: "Kerala Matta Rice / White Rice", type: "veg" },
                    { name: "Sambar", type: "veg" },
                    { name: "Rasam", type: "veg" },
                    { name: "Moru Curry", type: "veg" },
                    { name: "Katta Thairu (Set Curd)", type: "veg" },
                    { name: "Kalan", type: "veg" },
                    { name: "Masala Curry", type: "veg" },
                    { name: "Kootu Curry", type: "veg" },
                    { name: "Olan", type: "veg" },
                    { name: "Meen Curry (Veg Style)", type: "veg" },
                    { name: "Istew (Veg Stew)", type: "veg" },
                    { name: "Pachadi", type: "veg" },
                    { name: "Kichadi", type: "veg" },
                    { name: "Injithairu", type: "veg" },
                    { name: "Neyparippu (Ghee Dal)", type: "veg" },
                    { name: "Elissery", type: "veg" },
                    { name: "Pulissery", type: "veg" }
                ]
            },
            {
                title: "Side Dishes, Pickles & Crisps",
                page: 31,
                items: [
                    { name: "Thoran", type: "veg" },
                    { name: "Avial", type: "veg" },
                    { name: "Mezhukkuperatty", type: "veg" },
                    { name: "Pulinichi (Inji Puli)", type: "veg" },
                    { name: "Pickle - Lime", type: "veg" },
                    { name: "Pickle - Gooseberry (Nellikka)", type: "veg" },
                    { name: "Pickle - Mango", type: "veg" },
                    { name: "Kaya Varavu (Banana Chips)", type: "veg" },
                    { name: "Chena Varavu (Yam Crisps)", type: "veg" },
                    { name: "Kaipakka Varavu (Bitter Gourd Chips)", type: "veg" },
                    { name: "Kondattam Mulaku", type: "veg" },
                    { name: "Sharkkara Varatty (Jaggery Banana Chips)", type: "veg" },
                    { name: "Mini Parippu Vada", type: "veg" }
                ]
            },
            {
                title: "Accompaniments & Royal Payasam Selection",
                page: 32,
                items: [
                    { name: "Pappadam", type: "veg" },
                    { name: "Pazham (Poovan Banana)", type: "veg" },
                    { name: "Boli (Sweet Boli)", type: "dessert" },
                    { name: "Kesari", type: "dessert" },
                    { name: "Payasam - Palada Pradhaman", type: "dessert" },
                    { name: "Payasam - Parippu Pradhaman", type: "dessert" },
                    { name: "Payasam - Ada Pradhaman", type: "dessert" },
                    { name: "Payasam - Pazham (Banana)", type: "dessert" },
                    { name: "Payasam - Semiya", type: "dessert" },
                    { name: "Payasam - Gothambu (Wheat)", type: "dessert" },
                    { name: "Payasam - Karikku (Tender Coconut)", type: "dessert" },
                    { name: "Payasam - Mathanga (Pumpkin)", type: "dessert" },
                    { name: "Payasam - Kumbalanga (Ash Gourd)", type: "dessert" },
                    { name: "Payasam - Carrot", type: "dessert" },
                    { name: "Payasam - Chakka (Jackfruit)", type: "dessert" }
                ]
            }
        ]
    }
];

// Helper to get total number of items
export const totalMenuItemsCount = menuCatalog.reduce((acc, section) => {
    return acc + section.subSections.reduce((subAcc, sub) => subAcc + sub.items.length, 0);
}, 0);
