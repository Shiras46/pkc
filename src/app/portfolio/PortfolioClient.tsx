"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, ChevronRight, X, Sparkles, CheckCircle2 } from "lucide-react";
import styles from "./Portfolio.module.css";
import { portfolioCategories, portfolioProjects, PortfolioProject } from "@/lib/portfolioData";
import QuoteModal from "@/components/ui/QuoteModal";
import FinalCTA from "@/components/sections/FinalCTA";
import BrandName from "@/components/ui/BrandName";

export default function PortfolioClient() {
    const [activeCategory, setActiveCategory] = useState<string>("All Projects");
    const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    // Filter projects
    const filteredProjects = activeCategory === "All Projects"
        ? portfolioProjects
        : portfolioProjects.filter(project => project.category === activeCategory);

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedProject(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedProject]);

    return (
        <div className={styles.wrapper}>

            {/* 1. HERO SECTION */}
            <header className={styles.hero}>
                <Image
                    src="/image/hero1.webp"
                    alt="Luxury wedding portfolio and grand celebration management by Pride Kitchen Caterers & Events in Kerala"
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
                    <span className={styles.eyebrow}>Our Signature Portfolio</span>
                    <h1 className={styles.heroTitle}>
                        Crafting Timeless <br />
                        <span style={{ color: "#fcb318" }}>Celebrations in Kerala</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        A visual chronicle of bespoke weddings, majestic receptions, and fine dining experiences curated with flawless precision across Thrissur, Kochi, and beyond.
                    </p>
                    <div className={styles.heroActions}>
                        <button
                            className={styles.primaryBtn}
                            onClick={() => setIsQuoteOpen(true)}
                            aria-label="Book an event consultation"
                        >
                            Plan Your Celebration <ChevronRight size={16} />
                        </button>
                        <a href="#projects" className={styles.secondaryBtn}>
                            Browse Portfolio
                        </a>
                    </div>
                </motion.div>
            </header>

            {/* 2. STATS BAR */}
            <section className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>5,000+</div>
                        <div className={styles.statLabel}>Events Managed</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>15+</div>
                        <div className={styles.statLabel}>Years of Heritage</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>100%</div>
                        <div className={styles.statLabel}>Bespoke Execution</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>14</div>
                        <div className={styles.statLabel}>Kerala Districts Covered</div>
                    </div>
                </div>
            </section>

            {/* 3. PORTFOLIO SHOWCASE */}
            <section className={styles.portfolioSection} id="projects">
                <div className={styles.container}>

                    {/* Section Header */}
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionEyebrow}>Selected Projects</span>
                        <h2 className={styles.sectionTitle}>
                            Every Celebration Has A <span style={{ color: "#fcb318" }}>Story</span>
                        </h2>
                        <p className={styles.sectionDesc}>
                            From intimate temple ceremonies to monumental waterfront gatherings, discover how we turn grand visions into seamless reality with our golden touch.
                        </p>
                    </div>

                    {/* Category Tabs */}
                    <div className={styles.tabsContainer} role="tablist" aria-label="Portfolio Categories">
                        {portfolioCategories.map(cat => (
                            <button
                                key={cat}
                                role="tab"
                                aria-selected={activeCategory === cat}
                                className={`${styles.filterTab} ${activeCategory === cat ? styles.filterTabActive : ""}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Project Cards Grid */}
                    <motion.div
                        className={styles.grid}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AnimatePresence>
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.45, delay: index * 0.05 }}
                                    className={styles.card}
                                    onClick={() => setSelectedProject(project)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setSelectedProject(project);
                                        }
                                    }}
                                    aria-label={`View project details for ${project.title}`}
                                >
                                    <div className={styles.cardImageWrapper}>
                                        <Image
                                            src={project.image}
                                            alt={`${project.title} - ${project.category} organized by Pride Kitchen Caterers & Events in Kerala`}
                                            fill
                                            loading="lazy"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className={styles.cardImage}
                                            style={{ objectPosition: project.objectPosition || "center 20%" }}
                                        />
                                        <span className={styles.categoryBadge}>{project.category}</span>
                                    </div>

                                    <div className={styles.cardBody}>
                                        <div className={styles.cardMetaRow}>
                                            <span className={styles.location}>
                                                <MapPin size={14} /> {project.location}
                                            </span>
                                            <span className={styles.guestCount}>
                                                <Users size={14} /> {project.guestCount}
                                            </span>
                                        </div>

                                        <h3 className={styles.cardTitle}>{project.title}</h3>
                                        <p className={styles.cardDesc}>{project.shortDesc}</p>

                                        <div className={styles.highlightPills}>
                                            {project.highlights.slice(0, 2).map((h, i) => (
                                                <span key={i} className={styles.highlightChip}>
                                                    {h}
                                                </span>
                                            ))}
                                        </div>

                                        <div className={styles.cardAction}>
                                            <span>Explore Details</span>
                                            <ChevronRight size={15} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </section>

            {/* 4. FEATURED CASE STUDY SPOTLIGHT (Matching AboutPreview Model) */}
            <section className={styles.spotlightSection}>
                <div className={styles.container}>
                    <div className={styles.spotlightGrid}>

                        {/* Content Left */}
                        <div className={styles.spotlightContent}>
                            <span className={styles.sectionEyebrow}>Featured Spotlight</span>
                            <h2 className={styles.sectionTitle}>
                                Waterfront Grandeur at <br />
                                <span style={{ color: "#fcb318" }}>Bolgatty Palace</span>
                            </h2>
                            <p className={styles.sectionDesc}>
                                When our clients envisioned a 3-day royal gathering by the Kochi backwaters, every logistical element—from floating stage structures to authentic culinary service for over 1,500 VIP attendees—was engineered with effortless poise.
                            </p>

                            <div className={styles.quoteBox}>
                                &ldquo;Pride Kitchen Caterers & Events turned our wedding into an unforgettable fairytale. Every guest was treated like royalty, and the food was spoken about for months.&rdquo;
                            </div>

                            <button
                                className={styles.primaryBtn}
                                onClick={() => setIsQuoteOpen(true)}
                            >
                                Discuss Your Event With Us <ChevronRight size={16} />
                            </button>
                        </div>

                        {/* Visual Right */}
                        <div className={styles.spotlightVisual}>
                            <Image
                                src="/image/about.webp"
                                alt="Pride Kitchen Caterers & Events Kerala luxury wedding spotlight"
                                fill
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className={styles.spotlightImage}
                                style={{ objectPosition: "center 15%" }}
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. PROJECT DETAILS LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-project-title"
                    >
                        <motion.div
                            className={styles.modalBox}
                            initial={{ scale: 0.94, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.94, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.modalCloseBtn}
                                onClick={() => setSelectedProject(null)}
                                aria-label="Close project modal"
                            >
                                <X size={20} />
                            </button>

                            <div className={styles.modalImageHeader}>
                                <Image
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    fill
                                    className={styles.cardImage}
                                    style={{ objectPosition: selectedProject.objectPosition || "center 25%" }}
                                />
                                <span className={styles.categoryBadge}>{selectedProject.category}</span>
                            </div>

                            <div className={styles.modalBody}>
                                <div className={styles.modalMeta}>
                                    <span className={styles.location}>
                                        <MapPin size={16} /> {selectedProject.location}
                                    </span>
                                    <span className={styles.guestCount}>
                                        <Users size={16} /> {selectedProject.guestCount}
                                    </span>
                                </div>

                                <h2 id="modal-project-title" className={styles.modalTitle}>
                                    {selectedProject.title}
                                </h2>

                                <p className={styles.modalStory}>{selectedProject.fullStory}</p>

                                <div className={styles.modalSectionLabel}>Key Highlights</div>
                                <div className={styles.modalChipsGrid}>
                                    {selectedProject.highlights.map((h, i) => (
                                        <span key={i} className={styles.modalChip}>
                                            <Sparkles size={14} style={{ display: "inline", marginRight: "6px" }} />
                                            {h}
                                        </span>
                                    ))}
                                </div>

                                <div className={styles.modalSectionLabel}>Services Delivered</div>
                                <div className={styles.modalChipsGrid}>
                                    {selectedProject.servicesDelivered.map((s, i) => (
                                        <span key={i} className={styles.modalChip}>
                                            <CheckCircle2 size={14} style={{ display: "inline", marginRight: "6px" }} />
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                <div className={styles.modalFooter}>
                                    <button
                                        className={styles.primaryBtn}
                                        onClick={() => {
                                            setSelectedProject(null);
                                            setIsQuoteOpen(true);
                                        }}
                                    >
                                        Plan A Similar Event <ChevronRight size={16} />
                                    </button>
                                    <Link href="/contact" className={styles.secondaryBtn} style={{ color: "#1a1a1a", borderColor: "rgba(0,0,0,0.15)" }}>
                                        Contact Us Directly
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 6. FINAL INVITATION CTA */}
            <FinalCTA />

            {/* Consultation Quote Modal */}
            <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />

        </div>
    );
}

