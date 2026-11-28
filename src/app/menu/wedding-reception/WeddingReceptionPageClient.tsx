"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Check, Copy, MessageCircle, RotateCcw } from "lucide-react";
import styles from "./WeddingReceptionPage.module.css";
import { 
    DISH_POOLS, 
    PACKAGES 
} from "@/components/menu/WeddingReceptionMenuBuilder";
import QuoteModal from "@/components/ui/QuoteModal";
import FinalCTA from "@/components/sections/FinalCTA";
import MenuDetailBookingForm from "@/components/menu/MenuDetailBookingForm";

const WHATSAPP_NUMBER = "918138002333";

export interface WeddingReceptionPageClientProps {
    occasionTitle?: string;
    occasionSlug?: string;
    isHalal?: boolean;
    excludedSubgroups?: string[];
    excludedDishes?: string[];
}

export default function WeddingReceptionPageClient({
    occasionTitle = "Wedding Reception",
    occasionSlug = "wedding-reception",
    isHalal = false,
    excludedSubgroups = [],
    excludedDishes = []
}: WeddingReceptionPageClientProps = {}) {
    const [selectedPkgKey, setSelectedPkgKey] = useState<string>("prem");
    const [selections, setSelections] = useState<Record<string, string[]>>({});
    const [copyStatus, setCopyStatus] = useState<string>("Copy Menu");
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    const activePkg = PACKAGES[selectedPkgKey];
    const slots = activePkg.slots;

    const makeKey = (slotIdx: number) => `${selectedPkgKey}_${slotIdx}`;

    const excludedGroupsSet = useMemo(() => {
        const set = new Set(excludedSubgroups.map(s => s.toLowerCase()));
        if (isHalal) {
            set.add("pork");
        }
        return set;
    }, [excludedSubgroups, isHalal]);

    const excludedDishesSet = useMemo(() => {
        const set = new Set(excludedDishes.map(d => d.toLowerCase()));
        if (isHalal) {
            set.add("kallappam");
        }
        return set;
    }, [excludedDishes, isHalal]);

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
        let text = `*PKC ${occasionTitle} – ${activePkg.title} Menu*\n`;
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
        text += `\nCurated via PKC Events Menu Builder (https://pkcevents.com/menu/${occasionSlug})`;
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
        <div className={styles.pageWrapper}>
            <div className={styles.container}>

                {/* Back to Menu Collections */}
                <Link href="/menu" className={styles.backLink}>
                    <ChevronLeft size={16} /> Back to Menu Collections
                </Link>

                {/* 2-Column Main Layout */}
                <div className={styles.builderMainGrid}>

                    {/* Left Column: Package Cards, Overview, Dish Slots */}
                    <div className={styles.leftColumn}>

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

                        {/* What is included overview */}
                        <div className={styles.overviewBox}>
                            <b>What is included in the {activePkg.title} {occasionTitle} menu:</b>
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
                                        {/* Course Section Heading */}
                                        {isNewCourse && stats && (
                                            <h2 className={styles.courseHeading}>
                                                <span>{slot.course}</span>
                                                <span className={`${styles.courseCountBadge} ${isCourseFulfilled ? styles.courseCountBadgeOk : ""}`}>
                                                    {stats.totalCount > 0 ? `${stats.chosenCount} of ${stats.totalCount} selected` : ""}
                                                    {stats.otherCount > 0 ? `${stats.totalCount > 0 ? " + " : ""}${stats.otherCount} chosen with team` : ""}
                                                </span>
                                            </h2>
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
                                            {poolData && Object.entries(poolData).map(([groupTitle, dishArray]) => {
                                                if (excludedGroupsSet.has(groupTitle.toLowerCase())) return null;
                                                const availableDishes = dishArray.filter(d => !excludedDishesSet.has(d.toLowerCase()));
                                                if (availableDishes.length === 0) return null;

                                                return (
                                                    <div key={groupTitle}>
                                                        {groupTitle && <div className={styles.subgroupLabel}>{groupTitle}</div>}
                                                        <div className={styles.chipsContainer}>
                                                            {availableDishes.map(dish => {
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
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            });
                        })()}
                    </div>

                    {/* Right Column: Sticky Summary & Actions */}
                    <aside className={styles.summarySidebar} data-lenis-prevent="true">
                        <h3>Your {occasionTitle} Menu</h3>
                        <div className={styles.progressLabel}>
                            {activePkg.title} {occasionTitle} menu: {totalChosen} of {totalSelectable} dishes chosen
                        </div>
                        <div className={styles.progressBarTrack}>
                            <i className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
                        </div>

                        {/* Summary List */}
                        <div 
                            className={styles.summaryListContainer} 
                            data-lenis-prevent="true"
                            onWheel={(e) => e.stopPropagation()}
                        >
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
                                                <b className={styles.summaryCourseCategory}>
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
                            <button type="button" className={styles.copyActionBtn} onClick={handleCopy}>
                                <Copy size={16} /> {copyStatus}
                            </button>

                            <button type="button" className={styles.whatsappActionBtn} onClick={handleWhatsApp}>
                                <MessageCircle size={18} /> Send on WhatsApp
                            </button>

                            <button type="button" className={styles.resetActionBtn} onClick={handleReset}>
                                <RotateCcw size={14} /> Clear selections
                            </button>
                        </div>
                    </aside>
                </div>

                {/* Direct Catering Booking Form (Pax, Workdate, Auditorium) */}
                <MenuDetailBookingForm
                    occasionTitle={occasionTitle}
                    occasionSlug={occasionSlug}
                    packageTitle={activePkg.title}
                    selectedCount={totalChosen}
                    totalCount={totalSelectable}
                    getMenuSummary={generateMenuText}
                />
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
