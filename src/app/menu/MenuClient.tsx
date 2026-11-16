"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Search, X, Check, Share2, FileDown, 
    ChevronRight, Sparkles, Trash2, Copy, CheckCheck, 
    PhoneCall, Download
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./Menu.module.css";
import { menuCatalog, totalMenuItemsCount } from "@/lib/menuData";
import QuoteModal from "@/components/ui/QuoteModal";
import BrandName from "@/components/ui/BrandName";

const WHATSAPP_NUMBER = "918138002333";
const PDF_URL = "https://pkcevents-storage.s3.us-east-1.amazonaws.com/menucard/wedding-menu.pdf";

export default function MenuClient() {
    const [selectedDishes, setSelectedDishes] = useState<Map<string, { name: string; section: string; type: string }>>(new Map());
    const [searchQuery, setSearchQuery] = useState("");
    const [activeDietary, setActiveDietary] = useState<"all" | "veg" | "non-veg" | "beverage" | "dessert">("all");
    const [activeCategoryPill, setActiveCategoryPill] = useState("all");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Load saved selection from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("pkc_selected_menu");
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    const newMap = new Map();
                    parsed.forEach((item: any) => newMap.set(item.name, item));
                    setSelectedDishes(newMap);
                }
            }
        } catch (e) {
            console.error("Failed to load saved menu", e);
        }
    }, []);

    // Save selection to localStorage on changes
    useEffect(() => {
        try {
            const arr = Array.from(selectedDishes.values());
            localStorage.setItem("pkc_selected_menu", JSON.stringify(arr));
        } catch (e) {
            console.error("Failed to save menu", e);
        }
    }, [selectedDishes]);

    // Toggle dish selection
    const toggleDish = (dishName: string, sectionTitle: string, type: string) => {
        setSelectedDishes(prev => {
            const next = new Map(prev);
            if (next.has(dishName)) {
                next.delete(dishName);
            } else {
                next.set(dishName, { name: dishName, section: sectionTitle, type });
            }
            return next;
        });
    };

    // Filter menu catalog based on search & dietary
    const filteredCatalog = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return menuCatalog.map(section => {
            const matchingSubSections = section.subSections.map(sub => {
                const matchingItems = sub.items.filter(item => {
                    const matchesSearch = query === "" || 
                        item.name.toLowerCase().includes(query) ||
                        sub.title.toLowerCase().includes(query) ||
                        section.title.toLowerCase().includes(query);

                    const matchesDietary = activeDietary === "all" || item.type === activeDietary;

                    return matchesSearch && matchesDietary;
                });

                return {
                    ...sub,
                    items: matchingItems
                };
            }).filter(sub => sub.items.length > 0);

            return {
                ...section,
                subSections: matchingSubSections
            };
        }).filter(section => {
            const matchesCategory = activeCategoryPill === "all" || section.id === activeCategoryPill;
            return matchesCategory && section.subSections.length > 0;
        });
    }, [searchQuery, activeDietary, activeCategoryPill]);

    // Group selected dishes by category for the drawer & WhatsApp
    const selectedGrouped = useMemo(() => {
        const map: Record<string, string[]> = {};
        selectedDishes.forEach(item => {
            if (!map[item.section]) map[item.section] = [];
            map[item.section].push(item.name);
        });
        return map;
    }, [selectedDishes]);

    // Format selection text for WhatsApp
    const generateWhatsAppText = () => {
        let text = `*Custom Catering Menu Selection - Pride Kitchen Caterers & Events*\n`;
        text += `Total Delicacies Selected: ${selectedDishes.size}\n\n`;

        Object.entries(selectedGrouped).forEach(([section, items]) => {
            text += `*${section.toUpperCase()}*\n`;
            items.forEach(dish => {
                text += ` • ${dish}\n`;
            });
            text += `\n`;
        });

        text += `Please review this bespoke menu and provide a customized quote for our upcoming celebration.`;
        return encodeURIComponent(text);
    };

    const handleWhatsAppShare = () => {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateWhatsAppText()}`;
        window.open(url, "_blank");
    };

    const copyMenuToClipboard = () => {
        let text = `Pride Kitchen Caterers & Events - Custom Menu Selection\n\n`;
        Object.entries(selectedGrouped).forEach(([section, items]) => {
            text += `${section}:\n`;
            items.forEach(dish => {
                text += ` - ${dish}\n`;
            });
            text += `\n`;
        });

        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };

    const clearAllSelection = () => {
        if (confirm("Are you sure you want to clear your selected menu?")) {
            setSelectedDishes(new Map());
            setIsDrawerOpen(false);
        }
    };

    return (
        <main className={styles.wrapper}>

            {/* 1. HERO BANNER */}
            <header className={styles.hero}>
                <Image
                    src="/image/services/catering.webp"
                    alt="Luxury wedding catering menu and grand feast selection by Pride Kitchen Caterers & Events in Kerala"
                    fill
                    priority
                    className={styles.heroImage}
                />
                <div className={styles.heroOverlay} />

                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85 }}
                >
                    <span className={styles.eyebrow}>Interactive Catering Menu</span>
                    <h1 className={styles.heroTitle}>
                        Bespoke Menu Selection <br />
                        <span style={{ color: "#fcb318" }}>Across 32 Curated Pages</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Explore over {totalMenuItemsCount}+ authentic Kerala delicacies, live counters, Mughlai biryanis, and grand sadhyas. Select your favorite dishes to create your personalized event menu and get an instant quote.
                    </p>

                    <div className={styles.heroActions}>
                        <a href="#menu-explorer" className={styles.primaryBtn}>
                            Start Menu Selection <ChevronRight size={16} />
                        </a>
                        <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className={styles.pdfBtn}>
                            <FileDown size={16} /> Download Checklist PDF
                        </a>
                    </div>
                </motion.div>
            </header>

            {/* 2. STICKY FILTER TOOLBAR */}
            <div className={styles.toolbarSection} id="menu-explorer">
                <div className={styles.container}>
                    <div className={styles.toolbarRow}>

                        {/* Search Input */}
                        <div className={styles.searchBox}>
                            <Search size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search dishes (e.g. Biryani, Mojito, Karimeen, Payasam)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                                aria-label="Search dishes"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className={styles.clearSearchBtn}
                                    aria-label="Clear search"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Dietary Filter Buttons */}
                        <div className={styles.dietaryFilters}>
                            <button
                                className={`${styles.dietaryBtn} ${activeDietary === "all" ? styles.dietaryBtnActive : ""}`}
                                onClick={() => setActiveDietary("all")}
                            >
                                All Dishes
                            </button>
                            <button
                                className={`${styles.dietaryBtn} ${activeDietary === "veg" ? styles.dietaryBtnActive : ""}`}
                                onClick={() => setActiveDietary("veg")}
                            >
                                🌱 Pure Veg
                            </button>
                            <button
                                className={`${styles.dietaryBtn} ${activeDietary === "non-veg" ? styles.dietaryBtnActive : ""}`}
                                onClick={() => setActiveDietary("non-veg")}
                            >
                                🍗 Non-Veg
                            </button>
                            <button
                                className={`${styles.dietaryBtn} ${activeDietary === "beverage" ? styles.dietaryBtnActive : ""}`}
                                onClick={() => setActiveDietary("beverage")}
                            >
                                🍹 Beverages
                            </button>
                            <button
                                className={`${styles.dietaryBtn} ${activeDietary === "dessert" ? styles.dietaryBtnActive : ""}`}
                                onClick={() => setActiveDietary("dessert")}
                            >
                                🍨 Desserts
                            </button>
                        </div>
                    </div>

                    {/* Quick Category Jump Pills */}
                    <div className={styles.categoryPillsBar}>
                        <button
                            className={`${styles.categoryPill} ${activeCategoryPill === "all" ? styles.categoryPillActive : ""}`}
                            onClick={() => setActiveCategoryPill("all")}
                        >
                            All Categories
                        </button>
                        {menuCatalog.map(sec => (
                            <button
                                key={sec.id}
                                className={`${styles.categoryPill} ${activeCategoryPill === sec.id ? styles.categoryPillActive : ""}`}
                                onClick={() => {
                                    setActiveCategoryPill(sec.id);
                                    const el = document.getElementById(sec.id);
                                    if (el) el.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                {sec.title}
                            </button>
                        ))}
                    </div>

                </div>
            </div>

            {/* 3. MENU CATALOG SECTIONS */}
            <div className={styles.contentArea}>
                <div className={styles.container}>

                    {filteredCatalog.length === 0 ? (
                        <div className={styles.emptyState}>
                            <Sparkles size={40} color="#8C5D00" />
                            <h3 className={styles.emptyStateTitle}>No Delicacies Match Your Filter</h3>
                            <p className={styles.emptyStateText}>
                                Try clearing your search query or switching dietary filters to view our full catering selection.
                            </p>
                            <button
                                className={styles.primaryBtn}
                                onClick={() => {
                                    setSearchQuery("");
                                    setActiveDietary("all");
                                    setActiveCategoryPill("all");
                                }}
                            >
                                Reset All Filters
                            </button>
                        </div>
                    ) : (
                        filteredCatalog.map(section => (
                            <section key={section.id} id={section.id} className={styles.sectionBlock}>

                                {/* Section Banner */}
                                <div className={styles.sectionBanner}>
                                    <div className={styles.sectionHeaderLeft}>
                                        <div className={styles.sectionIconWrapper}>
                                            <Sparkles size={22} />
                                        </div>
                                        <div>
                                            <h2 className={styles.sectionTitle}>{section.title}</h2>
                                            <p className={styles.sectionSubtitle}>{section.subtitle}</p>
                                        </div>
                                    </div>
                                    <span className={styles.pageBadge}>
                                        Pages {section.pages[0]} {section.pages.length > 1 ? `- ${section.pages[section.pages.length - 1]}` : ""}
                                    </span>
                                </div>

                                {/* Subsections & Items */}
                                {section.subSections.map((sub, sIdx) => (
                                    <div key={sIdx} className={styles.subSectionBlock}>
                                        <div className={styles.subSectionTitle}>
                                            <span>{sub.title}</span>
                                            <span style={{ fontSize: "0.8rem", color: "#8C5D00", fontWeight: 600 }}>
                                                (Page {sub.page})
                                            </span>
                                            <div className={styles.subSectionTitleLine} />
                                        </div>

                                        <div className={styles.itemsGrid}>
                                            {sub.items.map(item => {
                                                const isSelected = selectedDishes.has(item.name);

                                                return (
                                                    <div
                                                        key={item.name}
                                                        className={`${styles.dishCard} ${isSelected ? styles.dishCardSelected : ""}`}
                                                        onClick={() => toggleDish(item.name, section.title, item.type)}
                                                        role="checkbox"
                                                        aria-checked={isSelected}
                                                        tabIndex={0}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter" || e.key === " ") {
                                                                e.preventDefault();
                                                                toggleDish(item.name, section.title, item.type);
                                                            }
                                                        }}
                                                    >
                                                        <div className={styles.dishCardLeft}>
                                                            <span
                                                                className={`
                                                                    ${styles.dietDot} 
                                                                    ${item.type === "veg" ? styles.dietDotVeg : ""}
                                                                    ${item.type === "non-veg" ? styles.dietDotNonVeg : ""}
                                                                    ${item.type === "beverage" ? styles.dietDotBeverage : ""}
                                                                    ${item.type === "dessert" ? styles.dietDotDessert : ""}
                                                                `}
                                                                title={item.type.toUpperCase()}
                                                            />
                                                            <h3 className={styles.dishName}>{item.name}</h3>
                                                        </div>

                                                        <div className={styles.selectBtn}>
                                                            <Check size={16} />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}

                            </section>
                        ))
                    )}

                </div>
            </div>

            {/* 4. FLOATING BOTTOM BAR (When >= 1 item is selected) */}
            <AnimatePresence>
                {selectedDishes.size > 0 && (
                    <motion.div
                        className={styles.floatingBar}
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 80, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.floatingBarLeft}>
                            <span className={styles.counterBadge}>{selectedDishes.size}</span>
                            <span className={styles.floatingBarText}>
                                {selectedDishes.size === 1 ? "1 Dish Selected" : `${selectedDishes.size} Delicacies Selected`}
                            </span>
                        </div>

                        <div className={styles.floatingBarActions}>
                            <button
                                className={styles.reviewBtn}
                                onClick={() => setIsDrawerOpen(true)}
                                aria-label="Review selected menu"
                            >
                                Review
                            </button>

                            <button
                                className={styles.whatsappBtn}
                                onClick={handleWhatsAppShare}
                                aria-label="Send menu via WhatsApp"
                            >
                                <FaWhatsapp size={16} /> WhatsApp
                            </button>

                            <button
                                className={styles.quoteTriggerBtn}
                                onClick={() => setIsQuoteOpen(true)}
                                aria-label="Request quote for this menu"
                            >
                                Get Quote <ChevronRight size={14} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 5. SELECTION REVIEW MODAL */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsDrawerOpen(false)}
                        role="dialog"
                        aria-modal="true"
                    >
                        <motion.div
                            className={styles.modalBox}
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.modalHeader}>
                                <div>
                                    <h3 className={styles.modalTitle}>Your Custom Event Menu</h3>
                                    <span style={{ fontSize: "0.85rem", color: "#666" }}>
                                        {selectedDishes.size} items curated for your celebration
                                    </span>
                                </div>
                                <button
                                    className={styles.modalCloseBtn}
                                    onClick={() => setIsDrawerOpen(false)}
                                    aria-label="Close menu drawer"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className={styles.modalBody}>
                                {Object.entries(selectedGrouped).map(([sectionTitle, dishes]) => (
                                    <div key={sectionTitle} className={styles.selectedGroup}>
                                        <div className={styles.selectedGroupTitle}>{sectionTitle} ({dishes.length})</div>
                                        {dishes.map(dish => (
                                            <div key={dish} className={styles.selectedItemRow}>
                                                <span>• {dish}</span>
                                                <button
                                                    onClick={() => toggleDish(dish, sectionTitle, "")}
                                                    className={styles.removeDishBtn}
                                                    aria-label={`Remove ${dish}`}
                                                >
                                                    <X size={15} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className={styles.modalFooter}>
                                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                    <button onClick={clearAllSelection} className={styles.clearAllBtn}>
                                        <Trash2 size={14} style={{ display: "inline", marginRight: "4px" }} /> Clear All
                                    </button>
                                    <button onClick={copyMenuToClipboard} className={styles.clearAllBtn} style={{ color: copied ? "#2e7d32" : "#8C5D00" }}>
                                        {copied ? <CheckCheck size={14} style={{ display: "inline", marginRight: "4px" }} /> : <Copy size={14} style={{ display: "inline", marginRight: "4px" }} />}
                                        {copied ? "Copied!" : "Copy Text"}
                                    </button>
                                </div>

                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button onClick={handleWhatsAppShare} className={styles.whatsappBtn}>
                                        <FaWhatsapp size={16} /> Send to WhatsApp
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsDrawerOpen(false);
                                            setIsQuoteOpen(true);
                                        }}
                                        className={styles.quoteTriggerBtn}
                                    >
                                        Request Quote
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Consultation Quote Modal */}
            <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />

        </main>
    );
}
