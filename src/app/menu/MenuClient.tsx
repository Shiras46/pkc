"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Users, ChevronRight, X, CheckCircle2, 
    UtensilsCrossed, ChefHat, MessageCircle, ArrowUpRight, Sparkles
} from "lucide-react";
import styles from "./Menu.module.css";
import { 
    menuPortfolioItems, 
    MenuPortfolioItem 
} from "@/lib/menuPortfolioData";
import QuoteModal from "@/components/ui/QuoteModal";
import FinalCTA from "@/components/sections/FinalCTA";

const WHATSAPP_NUMBER = "918138002333";

export default function MenuClient() {
    const [selectedMenu, setSelectedMenu] = useState<MenuPortfolioItem | null>(null);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedMenu(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Prevent body scroll when detail modal is open
    useEffect(() => {
        if (selectedMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedMenu]);

    const handleOpenQuoteForMenu = (_menu: MenuPortfolioItem) => {
        setIsQuoteOpen(true);
    };

    const handleWhatsAppMenuInquiry = (menu: MenuPortfolioItem) => {
        const actionType = menu.isComingSoon ? "pre-booking and customizing" : "booking";
        const text = encodeURIComponent(
            `*Catering Menu Consultation - PKC Events*\n\n` +
            `Hello Pride Kitchen Caterers, I am interested in ${actionType} your menu package:\n` +
            `*${menu.title}*\n` +
            `Category: ${menu.category}\n` +
            `Serving Capacity: ${menu.servingCapacity}\n` +
            `Dietary: ${menu.dietary}\n\n` +
            `Please share customized pricing and availability for our celebration.`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    };

    return (
        <div className={styles.wrapper}>

            {/* 1. PORTFOLIO HERO SECTION */}
            <header className={styles.hero}>
                <Image
                    src="/image/services/catering.webp"
                    alt="Luxury catering menus and royal banquet feasts curated by Pride Kitchen Caterers in Kerala"
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
                    <span className={styles.eyebrow}>Signature Catering Portfolios</span>
                    <h1 className={styles.heroTitle}>
                        Crafting Culinary Elegance <br />
                        <span style={{ color: "#fcb318" }}>Across Kerala</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        A curated portfolio of royal wedding feasts, authentic 32-course Travancore sadhyas, and vibrant live food counters curated with master-chef precision across Thrissur, Kochi, and beyond.
                    </p>
                    <div className={styles.heroActions}>
                        <button
                            className={styles.primaryBtn}
                            onClick={() => setIsQuoteOpen(true)}
                            aria-label="Request a customized catering quote"
                        >
                            Get Customized Quote <ChevronRight size={16} />
                        </button>
                        <a href="#menus" className={styles.secondaryBtn}>
                            Browse Menu Collections
                        </a>
                    </div>
                </motion.div>
            </header>

            {/* 2. FLOATING STATS BAR */}
            <section className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>50,000+</div>
                        <div className={styles.statLabel}>Banquets Served</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>32+</div>
                        <div className={styles.statLabel}>Traditional Delicacies</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>100%</div>
                        <div className={styles.statLabel}>Halal &amp; Pure-Veg Certified</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>15+</div>
                        <div className={styles.statLabel}>Years Culinary Heritage</div>
                    </div>
                </div>
            </section>

            {/* 3. MENU PORTFOLIO SHOWCASE */}
            <section className={styles.portfolioSection} id="menus">
                <div className={styles.container}>

                    {/* Section Header */}
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>Signature Collections</span>
                        <h2 className={styles.sectionTitle}>
                            Every Banquet Has A <span style={{ color: "#fcb318" }}>Story</span>
                        </h2>
                        <p className={styles.sectionDesc}>
                            From traditional seated plantain-leaf sadhyas to international live wok stations, discover our masterfully crafted catering collections for unforgettable celebrations.
                        </p>
                    </div>

                    {/* Menu Cards Grid */}
                    <motion.div
                        className={styles.grid}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AnimatePresence>
                            {menuPortfolioItems.map((menu, index) => (
                                <motion.div
                                    key={menu.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.45, delay: index * 0.05 }}
                                    className={styles.card}
                                    onClick={() => setSelectedMenu(menu)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setSelectedMenu(menu);
                                        }
                                    }}
                                    aria-label={`View menu details for ${menu.title}`}
                                >
                                    <div className={styles.cardImageWrapper}>
                                        <Image
                                            src={menu.image}
                                            alt={`${menu.title} - ${menu.category} catering by Pride Kitchen Caterers in Kerala`}
                                            fill
                                            loading="lazy"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className={styles.cardImage}
                                            style={{ objectPosition: menu.objectPosition || "center 30%" }}
                                        />
                                        <span className={styles.categoryBadge}>{menu.category}</span>
                                        <span className={`${styles.courseBadge} ${menu.isComingSoon ? styles.comingSoonBadge : ""}`}>
                                            {menu.isComingSoon ? "COMING SOON" : menu.courseCount}
                                        </span>
                                    </div>

                                    <div className={styles.cardContent}>
                                        <div className={styles.metaRow}>
                                            <span className={styles.metaItem}>
                                                <Users size={14} className={styles.metaIcon} />
                                                {menu.servingCapacity}
                                            </span>
                                            <span className={styles.dietaryTag}>{menu.dietary}</span>
                                        </div>

                                        <h3 className={styles.cardTitle}>{menu.title}</h3>
                                        <p className={styles.cardDesc}>{menu.shortDesc}</p>

                                        {/* Highlights Chips */}
                                        <div className={styles.highlightsList}>
                                            {menu.highlights.slice(0, 3).map((h, i) => (
                                                <span key={i} className={styles.highlightChip}>
                                                    • {h}
                                                </span>
                                            ))}
                                        </div>

                                        <div className={styles.cardFooter}>
                                            <span className={styles.viewLink}>
                                                {menu.isComingSoon ? "Preview Menu & Pre-Book" : "Explore Complete Menu"} <ChevronRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* 4. BESPOKE MENU CUSTOMIZATION BANNER */}
            <section className={styles.customSection}>
                <div className={styles.container}>
                    <div className={styles.customCard}>
                        <div className={styles.customContent}>
                            <span className={styles.customEyebrow}>Bespoke Taste Customization</span>
                            <h2 className={styles.customTitle}>
                                Want To Design Your Own <span style={{ color: "#fcb318" }}>Dream Menu?</span>
                            </h2>
                            <p className={styles.customText}>
                                Every family celebration is unique. Our executive master chefs work directly with you to mix and match dishes, introduce family recipes, or curate custom live counters tailored to your guests and budget.
                            </p>
                            <div className={styles.customActions}>
                                <button
                                    className={styles.primaryBtn}
                                    onClick={() => setIsQuoteOpen(true)}
                                >
                                    Schedule Chef Tasting <ChevronRight size={16} />
                                </button>
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi PKC Events, I would like to consult with your master chef to customize a wedding catering menu.")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.whatsappBtn}
                                >
                                    <MessageCircle size={18} /> Chat with Chef on WhatsApp
                                </a>
                            </div>
                        </div>
                        <div className={styles.customImageWrapper}>
                            <Image
                                src="/image/services/sadhya.webp"
                                alt="Master chefs preparing authentic Kerala wedding feast"
                                fill
                                sizes="(max-width: 768px) 100vw, 500px"
                                className={styles.customImg}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. INTERACTIVE MENU DETAIL MODAL */}
            <AnimatePresence>
                {selectedMenu && (
                    <motion.div
                        className={styles.modalBackdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMenu(null)}
                        role="dialog"
                        aria-modal="true"
                    >
                        <motion.div
                            className={styles.modalContent}
                            initial={{ scale: 0.92, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 28 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                className={styles.modalCloseBtn}
                                onClick={() => setSelectedMenu(null)}
                                aria-label="Close menu detail modal"
                            >
                                <X size={20} />
                            </button>

                            {/* Modal Header Image */}
                            <div className={styles.modalHero}>
                                <Image
                                    src={selectedMenu.image}
                                    alt={selectedMenu.title}
                                    fill
                                    className={styles.modalHeroImage}
                                    style={{ objectPosition: selectedMenu.objectPosition || "center 30%" }}
                                />
                                <div className={styles.modalHeroOverlay} />
                                <div className={styles.modalHeroText}>
                                    <span className={styles.modalCategoryBadge}>{selectedMenu.category}</span>
                                    <h2 className={styles.modalTitle}>{selectedMenu.title}</h2>
                                    <div className={styles.modalMetaRow}>
                                        <span><Users size={15} /> {selectedMenu.servingCapacity}</span>
                                        <span>•</span>
                                        <span><UtensilsCrossed size={15} /> {selectedMenu.courseCount}</span>
                                        <span>•</span>
                                        <span className={styles.dietaryPill}>{selectedMenu.dietary}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className={styles.modalBody}>
                                {/* Coming Soon Notice Banner */}
                                {selectedMenu.isComingSoon && (
                                    <div className={styles.modalNotice}>
                                        <Sparkles size={18} className={styles.sparkleIcon} />
                                        <span>
                                            <strong>Menu in Final Curation:</strong> Early pre-reservations and custom tasting sessions are now open for upcoming wedding celebrations!
                                        </span>
                                    </div>
                                )}

                                {/* Culinary Story */}
                                <div className={styles.modalSection}>
                                    <h3 className={styles.modalSectionHeading}>The Culinary Vision</h3>
                                    <p className={styles.modalStory}>{selectedMenu.fullStory}</p>
                                </div>

                                {/* Key Highlights */}
                                <div className={styles.modalHighlightsGrid}>
                                    {selectedMenu.highlights.map((h, i) => (
                                        <div key={i} className={styles.modalHighlightCard}>
                                            <CheckCircle2 size={18} className={styles.checkIcon} />
                                            <span>{h}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Chef Special Box */}
                                {selectedMenu.chefSpecial && (
                                    <div className={styles.chefBox}>
                                        <div className={styles.chefIconCol}>
                                            <ChefHat size={24} />
                                        </div>
                                        <div className={styles.chefTextCol}>
                                            <strong>Master Chef's Signature Note:</strong>
                                            <p>{selectedMenu.chefSpecial}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Course Breakdown Sections */}
                                <div className={styles.modalCoursesContainer}>
                                    <h3 className={styles.modalSectionHeading}>Full Course-By-Course Menu</h3>
                                    <div className={styles.courseSectionsGrid}>
                                        {selectedMenu.courseSections.map((sec, secIdx) => (
                                            <div key={secIdx} className={styles.courseCard}>
                                                <h4 className={styles.courseCardTitle}>
                                                    <span className={styles.courseCardNum}>{secIdx + 1}</span>
                                                    {sec.title}
                                                </h4>
                                                <ul className={styles.courseItemList}>
                                                    {sec.items.map((item, itemIdx) => (
                                                        <li key={itemIdx} className={styles.courseItem}>
                                                            <span className={styles.dishDot} />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Modal Actions Footer */}
                                <div className={styles.modalFooter}>
                                    <button
                                        className={styles.modalPrimaryBtn}
                                        onClick={() => {
                                            const menu = selectedMenu;
                                            setSelectedMenu(null);
                                            handleOpenQuoteForMenu(menu);
                                        }}
                                    >
                                        {selectedMenu.isComingSoon ? "Pre-Book This Menu" : "Request Quote For This Menu"} <ArrowUpRight size={18} />
                                    </button>

                                    <button
                                        className={styles.modalWhatsAppBtn}
                                        onClick={() => handleWhatsAppMenuInquiry(selectedMenu)}
                                    >
                                        <MessageCircle size={18} />
                                        <span>Customize on WhatsApp</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 6. FINAL GLOBAL CALL TO ACTION */}
            <FinalCTA />

            {/* 7. QUOTE MODAL */}
            <QuoteModal
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
            />
        </div>
    );
}
