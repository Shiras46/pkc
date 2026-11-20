"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Copy, MessageCircle, ArrowUpRight, RotateCcw } from "lucide-react";
import styles from "./WeddingReceptionMenuBuilder.module.css";

const WHATSAPP_NUMBER = "918138002333";

export const OCCASIONS = [
    "Wedding Reception",
    "Hindu Wedding Sadhya",
    "Christian Wedding",
    "Nikah Wedding",
    "Wedding Dinner",
    "Haldi Ceremony",
    "Sangeet Ceremony",
    "Birthday Celebration"
] as const;

export const DISH_POOLS: Record<string, Record<string, string[]>> = {
    fruit: {
        "": ["Pineapple", "Watermelon", "Papaya", "Mint Lime", "Grape", "Guava", "Shammam (Musk Melon)", "Mosambi Orange", "Apple", "Mango"]
    },
    moj: {
        "": ["Virgin Mojito", "Blue Lady", "Green Lagoon", "Green Apple Vibe", "Melonade Vibe", "Kiwi Splash", "Strawberry Splash", "Orange Splash", "Litchi Splash"]
    },
    milk: {
        "": ["Naruneendi Sarbath", "Mohabbat Ka Sarbath", "Badam Milk"]
    },
    nvS: {
        Chicken: ["Classic Chicken Lollipop", "Breaded Chicken Lollipop", "Chicken Finger", "Chicken Cheesy Finger", "Chicken Spring Roll", "Chicken Popcorn", "Chicken Nuggets", "Mini Chicken Samosa", "Chicken Cutlet", "Chicken Momos"],
        Beef: ["Classic Meat Ball", "Breaded Meat Ball", "Meat Samosa", "Meat Cutlet"],
        Egg: ["Breaded Egg Nuggets", "Egg Samosa", "Egg Pakoda", "Egg Momos"],
        Fish: ["Fish Finger", "Fish Popcorn", "Fish Cutlet"],
        Seafood: ["Prawns Tempura", "Butterfly Shrimp", "Crab Claw", "Popcorn Shrimp", "Lobster Bite", "Seafood Spring Roll"]
    },
    vS: {
        "": ["Breaded Veg Nuggets", "Veggie Spring Roll", "Veg Cutlet", "Veg Samosa", "Veg Momos", "French Fries", "Jalapeno Cheesy Pops", "Hyfun Jalapeno Cheesy Pops", "Potato Pops", "Paneer Pakoda", "Paneer Tikka", "Cheese Ball", "Onion Rings"]
    },
    nvSoup: {
        Chicken: ["Sweet Corn Chicken Soup", "Hot & Sour Chicken Soup", "Chicken Manchow Soup", "Chicken Clear Soup", "Cream of Chicken Soup", "Thai Chicken Soup"],
        Mutton: ["Mutton Paya Soup"],
        Seafood: ["Seafood Chowder Soup"]
    },
    vSoup: {
        "": ["Sweet Corn Veg Soup", "Hot & Sour Veg Soup", "Veg Manchow Soup", "Clear Veg Soup", "Cream of Tomato Soup", "Cream of Mushroom Soup", "Cream of Broccoli Soup"]
    },
    bread: {
        Appam: ["Vellappam", "Palappam", "Noolappam", "Kallappam", "Vattayappam"],
        Pathiri: ["Pathiri", "Nai Pathiri", "Pal Pathiri", "Thenga Pathiri"],
        Rotti: ["Rumali Rotti", "Tandoor Rotti", "Phulka"],
        Naan: ["Naan", "Butter Naan", "Garlic Naan", "Battoora"],
        Porotta: ["Big Porotta", "Coin Porotta", "Nool Porotta", "Bun Porotta", "Silon Porotta", "Aloo Porotta"],
        Chapathi: ["Chapathi", "Palak Chapathi", "Kuboos"],
        Bread: ["White Bread", "Wheat Bread", "Garlic Bread", "Bread Roll", "Croissant"]
    },
    mg: {
        "": ["Mutton Stew", "Mutton Kurma", "Mutton Mappas", "Mutton Pepper Roast", "Mutton Nihari", "Mutton Rogan Josh", "Mutton Varutharacha Curry", "Mutton Kadai", "Kuttanadan Duck Roast", "Duck Nadan Curry", "Duck Peralan", "Duck Green Pepper Roast", "Duck Pepper Masala", "Duck Varutharacha Curry"]
    },
    dg: {
        "": ["Kuttanadan Duck Roast", "Duck Nadan Curry", "Duck Peralan", "Duck Green Pepper Roast", "Duck Pepper Masala", "Duck Varutharacha Curry"]
    },
    vg: {
        "": ["Veg Khorma", "Navarathna Khorma", "Veg Stew", "Veg Kadai", "Paneer Butter Masala", "Kadai Paneer", "Paneer Chilly", "Shahi Paneer", "Aloo Mutter Masala", "Aloo Gobi Masala", "Malai Kofta", "Mushroom Masala", "Crispy Fried Veg Masala"]
    },
    rice: {
        Biryani: ["Chicken Dum Biryani", "Mutton Dum Biryani", "Beef Dum Biryani", "Fish Dum Biryani", "Vegetable Dum Biryani", "Hyderabadi Dum Biryani", "Ambur Chicken Biryani", "Donne Chicken Biryani", "Ravuthar Chicken Biryani"],
        Arabic: ["Chicken Mandi", "Chicken Majboos"],
        Fried: ["Chicken Fried Rice", "Egg Fried Rice", "Veg Fried Rice", "Mixed Fried Rice", "Schezwan Fried Rice"],
        Pulao: ["Ghee Rice", "Jeera Rice", "Biryani Rice", "Veg Pulao", "Kashmiri Pulao", "Navarathna Pulao", "Afghani Pulao"],
        Plain: ["Tomato Rice", "Lemon Rice", "Boiled Rice", "White Rice"]
    },
    nvM: {
        Chicken: ["Chicken 65", "Chicken Chilly", "Dragon Chicken", "Payyoli Chicken Fry", "Kanthari Chicken Fry", "Chicken Pepper Fry", "Korean Fried Chicken", "Ginger Chicken", "Nadan Chicken Curry", "Chicken Roast", "Butter Chicken", "Chicken Varutharacha Curry", "Chicken Malabar Kuruma", "Chicken Mappas", "Kadai Chicken", "Chicken Stew", "Chicken Chettinad", "Chicken Tikka Masala", "Al Faham Chicken", "Reshmi Kebab"],
        Fish: ["Tawa Grilled King Fish", "Fish Pollichathu – Karimeen", "Fish Pollichathu – King Fish", "Fish Mango Curry", "Fish Moilee", "Fish Masala", "Chilli Fish"],
        Prawns: ["Prawns Chilli", "Prawns Fry", "Prawns Roast", "Prawns Ularthu"],
        Squid: ["Koonthal Roast", "Koonthal Fry"],
        Beef: ["Beef Dry Fry", "Beef Coconut Fry", "Beef Roast", "Beef with Kaya", "Beef Korma", "Beef Stew", "Beef Peralan", "Beef Vindaloo", "Beef Mappas", "Beef Pepper Roast", "Chilli Beef", "Beef Ribs"],
        Pork: ["Pork Nadan Fry", "Pork Chilly", "Dragon Pork", "Pork Kalyana Varattu", "Pork Vindaloo", "Pork Masala", "Pork Barbecue Ribs"],
        Duck: ["Kuttanadan Duck Roast", "Duck Nadan Curry", "Duck Peralan", "Duck Pepper Masala"]
    },
    pick: {
        "": ["Pickle – Lime", "Pickle – Gooseberry", "Pickle – Mango"]
    },
    live: {
        "": ["Thattukada Counter", "Arabic Food Counter"]
    },
    ice: {
        "": ["Vanilla", "Strawberry", "Chocolate", "Butter Scotch"]
    },
    past: {
        "": ["Muffins", "Assorted Pastries", "Choco Brownie", "Cakes"]
    },
    sw: {
        "": ["Gulab Jamun", "Yellow Jilebi", "Ras Malai", "Carrot Halwa"]
    },
    sw2: {
        "": ["Gulab Jamun", "Yellow Jilebi", "Ras Malai", "Carrot Halwa", "Fruit Salad"]
    },
    swp: {
        "": ["Gulab Jamun", "Yellow Jilebi", "Ras Malai", "Carrot Halwa", "Muffins", "Assorted Pastries", "Choco Brownie", "Cakes", "Pudding", "Fruit Salad"]
    }
};

export interface SlotDef {
    course: string;
    label: string;
    poolKey: string | null;
    count: number;
}

export interface PackageDef {
    key: string;
    title: string;
    subtitle: string;
    slots: SlotDef[];
}

export const PACKAGES: Record<string, PackageDef> = {
    prem: {
        key: "prem",
        title: "Premium",
        subtitle: "Full spread, live station",
        slots: [
            { course: "Welcome drinks", label: "Seasonal fruit drinks", poolKey: "fruit", count: 4 },
            { course: "Welcome drinks", label: "Mojitos", poolKey: "moj", count: 3 },
            { course: "Welcome drinks", label: "Milk-based drinks", poolKey: "milk", count: 2 },
            { course: "Starters", label: "Non-veg starters", poolKey: "nvS", count: 2 },
            { course: "Starters", label: "Veg starters", poolKey: "vS", count: 2 },
            { course: "Soups", label: "Non-veg soup", poolKey: "nvSoup", count: 1 },
            { course: "Soups", label: "Veg soup", poolKey: "vSoup", count: 1 },
            { course: "First course", label: "Breads", poolKey: "bread", count: 3 },
            { course: "First course", label: "Mutton / Duck gravy", poolKey: "mg", count: 1 },
            { course: "First course", label: "Veg gravy", poolKey: "vg", count: 1 },
            { course: "Main course", label: "Rice", poolKey: "rice", count: 3 },
            { course: "Main course", label: "Non-veg dishes", poolKey: "nvM", count: 4 },
            { course: "Main course", label: "Veg dishes", poolKey: "vg", count: 2 },
            { course: "Salad bar", label: "Salads", poolKey: null, count: 10 },
            { course: "Salad bar", label: "Uppilittadhu", poolKey: null, count: 4 },
            { course: "Salad bar", label: "Pickles", poolKey: "pick", count: 3 },
            { course: "Live food station", label: "Counter", poolKey: "live", count: 1 },
            { course: "Dessert", label: "Ice cream", poolKey: "ice", count: 1 },
            { course: "Dessert", label: "Pastries", poolKey: "past", count: 3 },
            { course: "Dessert", label: "Sweets", poolKey: "sw", count: 2 },
            { course: "Dessert", label: "PKC special dessert", poolKey: null, count: 1 }
        ]
    },
    clas: {
        key: "clas",
        title: "Classic",
        subtitle: "Balanced, no live station",
        slots: [
            { course: "Welcome drinks", label: "Seasonal fruit drinks", poolKey: "fruit", count: 4 },
            { course: "Welcome drinks", label: "Mojitos", poolKey: "moj", count: 2 },
            { course: "Starters", label: "Non-veg starter", poolKey: "nvS", count: 1 },
            { course: "Starters", label: "Veg starter", poolKey: "vS", count: 1 },
            { course: "Soups", label: "Non-veg soup", poolKey: "nvSoup", count: 1 },
            { course: "Soups", label: "Veg soup", poolKey: "vSoup", count: 1 },
            { course: "First course", label: "Breads", poolKey: "bread", count: 2 },
            { course: "First course", label: "Mutton / Duck gravy", poolKey: "mg", count: 1 },
            { course: "First course", label: "Veg gravy", poolKey: "vg", count: 1 },
            { course: "Main course", label: "Rice", poolKey: "rice", count: 2 },
            { course: "Main course", label: "Non-veg dishes", poolKey: "nvM", count: 3 },
            { course: "Main course", label: "Veg dishes", poolKey: "vg", count: 2 },
            { course: "Salad bar", label: "Salads", poolKey: null, count: 6 },
            { course: "Salad bar", label: "Uppilittadhu", poolKey: null, count: 3 },
            { course: "Salad bar", label: "Pickles", poolKey: "pick", count: 2 },
            { course: "Dessert", label: "Ice cream", poolKey: "ice", count: 1 },
            { course: "Dessert", label: "2 sweets / pastries / pudding", poolKey: "swp", count: 2 }
        ]
    },
    exec: {
        key: "exec",
        title: "Executive",
        subtitle: "Compact and elegant",
        slots: [
            { course: "Welcome drinks", label: "Seasonal fruit drinks", poolKey: "fruit", count: 3 },
            { course: "Welcome drinks", label: "Mojitos", poolKey: "moj", count: 2 },
            { course: "Starters", label: "Non-veg starter", poolKey: "nvS", count: 1 },
            { course: "Starters", label: "Veg starter", poolKey: "vS", count: 1 },
            { course: "First course", label: "Breads", poolKey: "bread", count: 2 },
            { course: "First course", label: "Duck gravy", poolKey: "dg", count: 1 },
            { course: "First course", label: "Veg gravy", poolKey: "vg", count: 1 },
            { course: "Main course", label: "Rice", poolKey: "rice", count: 1 },
            { course: "Main course", label: "Non-veg dishes", poolKey: "nvM", count: 2 },
            { course: "Main course", label: "Veg dishes", poolKey: "vg", count: 2 },
            { course: "Salad bar", label: "Salads", poolKey: null, count: 4 },
            { course: "Salad bar", label: "Pickles", poolKey: "pick", count: 2 },
            { course: "Dessert", label: "Ice cream", poolKey: "ice", count: 1 },
            { course: "Dessert", label: "Sweet / fruit salad", poolKey: "sw2", count: 1 }
        ]
    }
};

interface WeddingReceptionMenuBuilderProps {
    onClose: () => void;
    onOpenQuote: (customSummaryText?: string) => void;
}

export default function WeddingReceptionMenuBuilder({ onClose, onOpenQuote }: WeddingReceptionMenuBuilderProps) {
    const [selectedPkgKey, setSelectedPkgKey] = useState<string>("prem");
    const [selections, setSelections] = useState<Record<string, string[]>>({});
    const [copyStatus, setCopyStatus] = useState<string>("Copy Menu");

    const activePkg = PACKAGES[selectedPkgKey];
    const slots = activePkg.slots;

    const makeKey = (slotIdx: number) => `${selectedPkgKey}_${slotIdx}`;

    // Toggle dish selection for a given slot
    const handleToggleDish = (slotIdx: number, dishName: string) => {
        const key = makeKey(slotIdx);
        const currentList = selections[key] || [];
        const maxCount = slots[slotIdx].count;

        if (currentList.includes(dishName)) {
            setSelections(prev => ({
                ...prev,
                [key]: prev[key].filter(d => d !== dishName)
            }));
        } else {
            if (currentList.length < maxCount) {
                setSelections(prev => ({
                    ...prev,
                    [key]: [...(prev[key] || []), dishName]
                }));
            }
        }
    };

    // Calculate section progress
    const getCourseSectionStats = (courseName: string) => {
        let chosenCount = 0;
        let totalCount = 0;
        let otherCount = 0;

        slots.forEach((s, idx) => {
            if (s.course !== courseName) return;
            if (s.poolKey) {
                totalCount += s.count;
                chosenCount += (selections[makeKey(idx)] || []).length;
            } else {
                otherCount += s.count;
            }
        });

        return { chosenCount, totalCount, otherCount };
    };

    // Overall progress
    const { totalSelectable, totalChosen } = useMemo(() => {
        let totalSelectable = 0;
        let totalChosen = 0;

        slots.forEach((s, idx) => {
            if (s.poolKey) {
                totalSelectable += s.count;
                totalChosen += (selections[makeKey(idx)] || []).length;
            }
        });

        return { totalSelectable, totalChosen };
    }, [slots, selections, selectedPkgKey]);

    const progressPercent = totalSelectable ? Math.round((totalChosen / totalSelectable) * 100) : 0;

    // Overview course groupings
    const overviewGroupings = useMemo(() => {
        const map: Record<string, string[]> = {};
        slots.forEach(s => {
            if (!map[s.course]) map[s.course] = [];
            map[s.course].push(`${s.count} ${s.label}`);
        });
        return map;
    }, [slots]);

    // Build formatted text for copy / WhatsApp
    const generateMenuText = () => {
        let text = `*PKC Wedding Reception – ${activePkg.title} Menu*\n`;
        let lastCourse = "";

        slots.forEach((s, idx) => {
            const chosen = selections[makeKey(idx)] || [];
            if (s.course !== lastCourse) {
                text += `\n*${s.course}:*\n`;
                lastCourse = s.course;
            }

            if (s.poolKey) {
                text += `• ${s.label}: ${chosen.length > 0 ? chosen.join(", ") : "Not selected yet"}\n`;
            } else {
                text += `• ${s.label}: ${s.count} (to be chosen with PKC team)\n`;
            }
        });

        text += `\n*Total dishes selected:* ${totalChosen} of ${totalSelectable}\n`;
        text += `\nCurated via PKC Events Menu Builder (https://pkcevents.com/menu)`;
        return text;
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generateMenuText());
            setCopyStatus("Copied!");
        } catch {
            setCopyStatus("Copy failed");
        }
        setTimeout(() => setCopyStatus("Copy Menu"), 2500);
    };

    const handleWhatsApp = () => {
        const text = encodeURIComponent(generateMenuText());
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    };

    const handleReset = () => {
        setSelections(prev => {
            const next = { ...prev };
            Object.keys(next).forEach(k => {
                if (k.startsWith(`${selectedPkgKey}_`)) {
                    delete next[k];
                }
            });
            return next;
        });
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
            <motion.div
                className={styles.builderContainer}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <header className={styles.builderHeader}>
                    <div className={styles.headerTitleRow}>
                        <div>
                            <h2>PKC Wedding Reception Menu Builder</h2>
                            <p>Pick your package and customize your courses. Each course section shows how many delicacies you can select.</p>
                        </div>
                        <button className={styles.closeBtn} onClick={onClose} aria-label="Close builder">
                            <X size={20} />
                        </button>
                    </div>
                </header>

                {/* Main 2-Column Builder Studio */}
                <div className={styles.builderMain}>

                    {/* Left Column: Packages, Course Slots */}
                    <div className={styles.leftCol}>

                        {/* Package Selection Cards */}
                        <div className={styles.packageGrid} role="group" aria-label="Package">
                            {Object.values(PACKAGES).map(pkg => {
                                const isActive = pkg.key === selectedPkgKey;
                                return (
                                    <button
                                        key={pkg.key}
                                        type="button"
                                        className={`${styles.packageCard} ${isActive ? styles.packageCardActive : ""}`}
                                        onClick={() => setSelectedPkgKey(pkg.key)}
                                        aria-pressed={isActive}
                                    >
                                        <b>{pkg.title}</b>
                                        <span>{pkg.subtitle}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* What is included in this package overview */}
                        <div className={styles.overviewBox}>
                            <b>What is included in the {activePkg.title} menu:</b>
                            <ul>
                                {Object.entries(overviewGroupings).map(([course, itemsList]) => (
                                    <li key={course}>
                                        <strong>{course}:</strong> {itemsList.join(", ")}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Course Sections and Slots */}
                        {(() => {
                            let lastCourseHeading = "";
                            return slots.map((slot, slotIdx) => {
                                const isNewCourse = slot.course !== lastCourseHeading;
                                if (isNewCourse) lastCourseHeading = slot.course;

                                const slotKey = makeKey(slotIdx);
                                const selectedDishes = selections[slotKey] || [];
                                const isFulfilled = selectedDishes.length === slot.count;
                                const poolData = slot.poolKey ? DISH_POOLS[slot.poolKey] : null;

                                const stats = isNewCourse ? getCourseSectionStats(slot.course) : null;
                                const isCourseFulfilled = stats && stats.totalCount > 0 && stats.chosenCount === stats.totalCount;

                                return (
                                    <div key={slotIdx}>
                                        {/* Course Section Heading (Rendered once per unique course) */}
                                        {isNewCourse && stats && (
                                            <h3 className={styles.courseHeading}>
                                                <span>{slot.course}</span>
                                                <span className={`${styles.courseCountBadge} ${isCourseFulfilled ? styles.courseCountBadgeOk : ""}`}>
                                                    {stats.totalCount > 0 ? `${stats.chosenCount} of ${stats.totalCount} selected` : ""}
                                                    {stats.otherCount > 0 ? `${stats.totalCount > 0 ? " + " : ""}${stats.otherCount} chosen with team` : ""}
                                                </span>
                                            </h3>
                                        )}

                                        {/* Slot Card */}
                                        <div className={styles.slotCard}>
                                            <div className={styles.slotHeader}>
                                                <strong>
                                                    {slot.label} <small className={styles.slotCountBadge}>(select {slot.count})</small>
                                                </strong>
                                                <span className={`${styles.slotCountBadge} ${isFulfilled ? styles.slotCountBadgeOk : ""}`}>
                                                    {selectedDishes.length} of {slot.count} chosen
                                                </span>
                                            </div>

                                            {/* Note for unlisted items */}
                                            {!slot.poolKey && (
                                                <p className={styles.slotNote}>
                                                    {slot.count} items to be chosen directly with our master chef team.
                                                </p>
                                            )}

                                            {/* Dish Chips */}
                                            {poolData && Object.entries(poolData).map(([groupTitle, dishArray]) => (
                                                <div key={groupTitle}>
                                                    {groupTitle && <div className={styles.subgroupLabel}>{groupTitle}</div>}
                                                    <div className={styles.chipsContainer}>
                                                        {dishArray.map(dish => {
                                                            const isSelected = selectedDishes.includes(dish);
                                                            const isSlotFull = selectedDishes.length >= slot.count;
                                                            const isDisabled = !isSelected && isSlotFull;

                                                            return (
                                                                <button
                                                                    key={dish}
                                                                    type="button"
                                                                    className={`${styles.dishChip} ${isSelected ? styles.dishChipActive : ""} ${isDisabled ? styles.dishChipDisabled : ""}`}
                                                                    onClick={() => handleToggleDish(slotIdx, dish)}
                                                                    disabled={isDisabled}
                                                                    aria-pressed={isSelected}
                                                                >
                                                                    {isSelected && <Check size={13} style={{ marginRight: 4, display: "inline" }} />}
                                                                    {dish}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            });
                        })()}
                    </div>

                    {/* Right Column: Sticky Summary & Actions */}
                    <aside className={styles.summarySidebar}>
                        <h3>Your Menu</h3>
                        <div className={styles.progressLabel}>
                            {activePkg.title} menu: {totalChosen} of {totalSelectable} dishes chosen
                        </div>
                        <div className={styles.progressBarTrack}>
                            <i className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
                        </div>

                        {/* Summary List */}
                        <div className={styles.summaryListContainer}>
                            {(() => {
                                let lastCourse = "";
                                return slots.map((s, idx) => {
                                    if (!s.poolKey) return null;
                                    const isNew = s.course !== lastCourse;
                                    if (isNew) lastCourse = s.course;

                                    const chosen = selections[makeKey(idx)] || [];
                                    const courseStats = isNew ? getCourseSectionStats(s.course) : null;

                                    return (
                                        <div key={idx} className={styles.summaryCourseSection}>
                                            {isNew && courseStats && (
                                                <b className={styles.summaryCourseTitle}>
                                                    {s.course} ({courseStats.chosenCount} of {courseStats.totalCount})
                                                </b>
                                            )}
                                            <ul className={styles.summaryCourseList}>
                                                {chosen.length > 0 ? (
                                                    chosen.map(d => <li key={d}>{d}</li>)
                                                ) : (
                                                    <li className={styles.emptySlotNotice}>{s.label}: not chosen yet</li>
                                                )}
                                            </ul>
                                        </div>
                                    );
                                });
                            })()}
                        </div>

                        {/* Actions */}
                        <div className={styles.actionBtnsContainer}>
                            <button type="button" className={styles.whatsappActionBtn} onClick={handleWhatsApp}>
                                <MessageCircle size={18} /> Send on WhatsApp
                            </button>

                            <button type="button" className={styles.copyActionBtn} onClick={handleCopy}>
                                <Copy size={16} /> {copyStatus}
                            </button>

                            <button type="button" className={styles.quoteActionBtn} onClick={() => onOpenQuote(generateMenuText())}>
                                Request Quote With Menu <ArrowUpRight size={16} />
                            </button>

                            <button type="button" className={styles.resetActionBtn} onClick={handleReset}>
                                <RotateCcw size={13} style={{ display: "inline", marginRight: 4 }} /> Clear selections
                            </button>
                        </div>
                    </aside>
                </div>
            </motion.div>
        </div>
    );
}
