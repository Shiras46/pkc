"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Check, Copy, MessageCircle, RotateCcw, CheckCheck } from "lucide-react";
import styles from "./HinduWeddingSadhya.module.css";
import { SADHYA_PACKAGES, SadhyaPackage } from "./sadhyaData";
import QuoteModal from "@/components/ui/QuoteModal";
import FinalCTA from "@/components/sections/FinalCTA";

const WHATSAPP_NUMBER = "918138002333";

export default function HinduWeddingSadhyaClient() {
    const [selectedPkgKey, setSelectedPkgKey] = useState<string>("classic");
    
    // Track selected dishes per package key: { [pkgKey]: string[] }
    // Initialize with all dishes selected for each package
    const [selections, setSelections] = useState<Record<string, string[]>>(() => {
        const initial: Record<string, string[]> = {};
        Object.values(SADHYA_PACKAGES).forEach(pkg => {
            const allItems: string[] = [];
            pkg.courses.forEach(c => allItems.push(...c.items));
            initial[pkg.key] = allItems;
        });
        return initial;
    });

    const [copyStatus, setCopyStatus] = useState<string>("Copy Menu");
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    const activePkg: SadhyaPackage = SADHYA_PACKAGES[selectedPkgKey] || SADHYA_PACKAGES.classic;
    const currentSelectedDishes = selections[selectedPkgKey] || [];

    // Total dishes available in active package
    const allDishesInActivePkg = useMemo(() => {
        const list: string[] = [];
        activePkg.courses.forEach(c => list.push(...c.items));
        return list;
    }, [activePkg]);

    const totalAvailable = allDishesInActivePkg.length;
    const totalChosen = currentSelectedDishes.length;
    const progressPercent = totalAvailable ? Math.round((totalChosen / totalAvailable) * 100) : 0;

    // Toggle a dish on or off
    const handleToggleDish = (dishName: string) => {
        setSelections(prev => {
            const current = prev[selectedPkgKey] || [];
            if (current.includes(dishName)) {
                return {
                    ...prev,
                    [selectedPkgKey]: current.filter(d => d !== dishName)
                };
            } else {
                return {
                    ...prev,
                    [selectedPkgKey]: [...current, dishName]
                };
            }
        });
    };

    // Select all dishes for active package
    const handleSelectAll = () => {
        setSelections(prev => ({
            ...prev,
            [selectedPkgKey]: [...allDishesInActivePkg]
        }));
    };

    // Reset / clear selections for active package
    const handleClearAll = () => {
        setSelections(prev => ({
            ...prev,
            [selectedPkgKey]: []
        }));
    };

    // Generate formatted WhatsApp / clipboard text
    const generateMenuText = () => {
        let text = `*PKC Hindu Wedding Sadhya – ${activePkg.title}*\n`;
        text += `${activePkg.description}\n\n`;

        activePkg.courses.forEach(course => {
            const chosenInCourse = course.items.filter(d => currentSelectedDishes.includes(d));
            text += `*${course.title.toUpperCase()} (${chosenInCourse.length}/${course.items.length}):*\n`;
            if (chosenInCourse.length > 0) {
                text += `• ${chosenInCourse.join("\n• ")}\n\n`;
            } else {
                text += `• (None selected)\n\n`;
            }
        });

        text += `*Total items selected:* ${totalChosen} of ${totalAvailable}\n`;
        text += `*Dietary:* 100% Pure Vegetarian | Traditional Plantain Leaf Seating\n\n`;
        text += `Curated via PKC Events Hindu Wedding Sadhya (https://pkcevents.com/menu/hindu-wedding-sadhya)`;
        return text;
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generateMenuText());
            setCopyStatus("Copied to Clipboard!");
        } catch {
            setCopyStatus("Copy failed");
        }
        setTimeout(() => setCopyStatus("Copy Menu"), 2500);
    };

    const handleWhatsApp = () => {
        const text = encodeURIComponent(generateMenuText());
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>

                {/* Back Link */}
                <Link href="/menu" className={styles.backLink}>
                    <ChevronLeft size={16} /> Back to Menu Collections
                </Link>

                {/* 2-Column Main Layout */}
                <div className={styles.builderMainGrid}>

                    {/* Left Column: Package Switcher, Overview Box, Course Sections */}
                    <div className={styles.leftColumn}>

                        {/* Top Package Switcher Cards */}
                        <div className={styles.packageGrid} role="group" aria-label="Sadhya Packages">
                            {Object.values(SADHYA_PACKAGES).map(pkg => {
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

                        {/* Overview Box: What is included */}
                        <div className={styles.overviewBox}>
                            <b>What is included in the {activePkg.title}:</b>
                            <p className={styles.overviewDescription}>{activePkg.description}</p>
                            <ul>
                                {activePkg.courses.map(course => (
                                    <li key={course.title}>
                                        <strong>{course.title}:</strong> {course.items.length} traditional items
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Course Breakdown & Interactive Dish Chips */}
                        {activePkg.courses.map(course => {
                            const chosenInCourse = course.items.filter(d => currentSelectedDishes.includes(d));
                            const isCourseFull = chosenInCourse.length === course.items.length;

                            return (
                                <div key={course.title}>
                                    {/* Section Heading */}
                                    <h2 className={styles.courseHeading}>
                                        <span>{course.title.toUpperCase()}</span>
                                        <span className={`${styles.courseCountBadge} ${isCourseFull ? styles.courseCountBadgeOk : ""}`}>
                                            {chosenInCourse.length} of {course.items.length} selected
                                        </span>
                                    </h2>

                                    {/* Dish Chips Card */}
                                    <div className={styles.slotCard}>
                                        <div className={styles.slotHeader}>
                                            <strong>Select or customize dishes for this course</strong>
                                            <span className={`${styles.slotCountBadge} ${isCourseFull ? styles.slotCountBadgeOk : ""}`}>
                                                {chosenInCourse.length} of {course.items.length} included
                                            </span>
                                        </div>

                                        <div className={styles.chipsContainer}>
                                            {course.items.map(dish => {
                                                const isSelected = currentSelectedDishes.includes(dish);
                                                return (
                                                    <button
                                                        key={dish}
                                                        type="button"
                                                        className={`${styles.dishChip} ${isSelected ? styles.dishChipActive : ""}`}
                                                        onClick={() => handleToggleDish(dish)}
                                                        aria-pressed={isSelected}
                                                    >
                                                        {isSelected && <Check size={13} style={{ marginRight: 6, display: "inline" }} />}
                                                        {dish}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Sticky Summary Sidebar */}
                    <aside className={styles.summarySidebar} data-lenis-prevent="true">
                        <h3>Your Menu</h3>
                        <div className={styles.progressLabel}>
                            {activePkg.title}: {totalChosen} of {totalAvailable} dishes chosen
                        </div>
                        <div className={styles.progressBarTrack}>
                            <i className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
                        </div>

                        {/* Grouped Course Summary List */}
                        <div 
                            className={styles.summaryListContainer} 
                            data-lenis-prevent="true"
                            onWheel={(e) => e.stopPropagation()}
                        >
                            {activePkg.courses.map(course => {
                                const chosenInCourse = course.items.filter(d => currentSelectedDishes.includes(d));
                                return (
                                    <div key={course.title} className={styles.summaryCourseSection}>
                                        <b className={styles.summaryCourseCategory}>
                                            {course.title.toUpperCase()} ({chosenInCourse.length} of {course.items.length})
                                        </b>
                                        <ul className={styles.summaryCourseList}>
                                            {chosenInCourse.length > 0 ? (
                                                chosenInCourse.map(d => <li key={d}>{d}</li>)
                                            ) : (
                                                <li className={styles.emptySlotNotice}>No items selected</li>
                                            )}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.actionBtnsContainer}>
                            <button type="button" className={styles.copyActionBtn} onClick={handleCopy}>
                                <Copy size={16} /> {copyStatus}
                            </button>

                            <button type="button" className={styles.whatsappActionBtn} onClick={handleWhatsApp}>
                                <MessageCircle size={18} /> Send on WhatsApp
                            </button>

                            {totalChosen < totalAvailable ? (
                                <button type="button" className={styles.selectAllActionBtn} onClick={handleSelectAll}>
                                    <CheckCheck size={14} /> Select All Dishes
                                </button>
                            ) : (
                                <button type="button" className={styles.resetActionBtn} onClick={handleClearAll}>
                                    <RotateCcw size={14} /> Clear selections
                                </button>
                            )}
                        </div>
                    </aside>
                </div>
            </div>

            {/* Global Final CTA */}
            <FinalCTA />

            {/* Quote Modal */}
            <QuoteModal
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
            />
        </div>
    );
}
