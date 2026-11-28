"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Copy, Users, Calendar, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./HinduWeddingSadhya.module.css";
import { SADHYA_FLOW_PACKAGES, SadhyaPackageFlow } from "./sadhyaData";
import QuoteModal from "@/components/ui/QuoteModal";
import FinalCTA from "@/components/sections/FinalCTA";

const WHATSAPP_NUMBER = "918138002333";

export default function HinduWeddingSadhyaClient() {
    const [selectedPkgKey, setSelectedPkgKey] = useState<string>("executive");
    const [copyStatus, setCopyStatus] = useState<string>("Copy Menu Text");
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const [pax, setPax] = useState("");
    const [workDate, setWorkDate] = useState("");
    const [auditorium, setAuditorium] = useState("");

    const activePkg: SadhyaPackageFlow = SADHYA_FLOW_PACKAGES[selectedPkgKey] || SADHYA_FLOW_PACKAGES.executive;

    // Generate formatted WhatsApp / clipboard text
    const generateMenuText = () => {
        let text = `*PKC Events – ${activePkg.title}*\n`;
        text += `${activePkg.subtitle}\n\n`;

        if (pax || workDate || auditorium) {
            text += `*Event Details:*\n`;
            if (pax) text += `• Pax: ${pax}\n`;
            if (workDate) text += `• Workdate: ${workDate}\n`;
            if (auditorium) text += `• Auditorium: ${auditorium}\n\n`;
        }

        activePkg.courses.forEach(course => {
            text += `*${course.title}:*\n`;
            course.leftColumn.forEach(item => {
                text += `• ${item}\n`;
            });
            course.rightColumn.forEach(item => {
                text += `• ${item}\n`;
            });
            text += `\n`;
        });

        text += `*Dietary:* 100% Pure Vegetarian | Traditional Plantain Leaf Seating\n`;
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
        setTimeout(() => setCopyStatus("Copy Menu Text"), 2500);
    };

    const handleWhatsApp = async () => {
        const text = encodeURIComponent(generateMenuText());
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");

        if (pax || workDate || auditorium) {
            try {
                await fetch("/api/enquiries", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: "Website Sadhya Inquiry",
                        phone: "",
                        service: `Hindu Wedding Sadhya - ${activePkg.title} (${pax || "N/A"} Pax - ${auditorium || "N/A"})`,
                        eventType: "Hindu Wedding Sadhya",
                        eventDate: workDate,
                        guestCount: pax ? Number(pax) : undefined,
                        message: `Pax: ${pax || "N/A"} | Workdate: ${workDate || "N/A"} | Auditorium: ${auditorium || "N/A"}\n\n${generateMenuText()}`
                    }),
                    keepalive: true
                });
            } catch (e) {
                console.error("Enquiry log error:", e);
            }
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>

                {/* Back Link */}
                <Link href="/menu" className={styles.backLink}>
                    <ChevronLeft size={16} /> Back to Menu Collections
                </Link>

                {/* Header Flow Title & Subtitle */}
                <header className={styles.flowHeader}>
                    <h1 className={styles.mainTitle}>SADHYA MENU FLOW</h1>
                    <p className={styles.mainSubtitle}>
                        A traditional Kerala feast, served with warmth and celebration
                    </p>
                </header>

                {/* Package Switcher Tabs */}
                <nav 
                    className={styles.packageSwitcher} 
                    aria-label="Sadhya Packages"
                    data-lenis-prevent="true"
                >
                    {Object.values(SADHYA_FLOW_PACKAGES).map(pkg => {
                        const isActive = pkg.key === selectedPkgKey;
                        return (
                            <button
                                key={pkg.key}
                                type="button"
                                className={`${styles.packageTab} ${isActive ? styles.packageTabActive : ""}`}
                                onClick={() => setSelectedPkgKey(pkg.key)}
                                aria-pressed={isActive}
                            >
                                <span>{pkg.title}</span>
                                <span className={styles.tabBadge}>{pkg.badge}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Sadhya Menu Flow Presentation Card */}
                <main className={styles.menuCard}>

                    {/* Active Package Hero Title & Subtitle */}
                    <div className={styles.packageHero}>
                        <h2 className={styles.packageTitle}>{activePkg.title}</h2>
                        <p className={styles.packageSubtitle}>{activePkg.subtitle}</p>
                    </div>

                    {/* Solid Dark Green Separator */}
                    <div className={styles.mainDivider} />

                    {/* Course Sections */}
                    {activePkg.courses.map(course => (
                        <section key={course.title} className={styles.courseSection}>
                            <h3 className={styles.courseHeader}>{course.title}</h3>

                            <div className={styles.twoColGrid}>
                                {/* Left Column */}
                                <div className={styles.colList}>
                                    {course.leftColumn.map(item => (
                                        <div key={item} className={styles.dishItem}>
                                            <span className={styles.bulletDot}>•</span>
                                            <span className={styles.dishName}>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Column */}
                                <div className={styles.colList}>
                                    {course.rightColumn.map(item => (
                                        <div key={item} className={styles.dishItem}>
                                            <span className={styles.bulletDot}>•</span>
                                            <span className={styles.dishName}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    ))}
                </main>

                {/* Event Details: Pax, Workdate, Auditorium */}
                <div className={styles.sadhyaEventDetailsBar}>
                    <div className={styles.sadhyaField}>
                        <label htmlFor="sd-pax">Pax (Guest Count)</label>
                        <div className={styles.inputWrap}>
                            <Users size={15} className={styles.inputIcon} />
                            <input 
                                id="sd-pax"
                                type="number" 
                                placeholder="e.g. 500 Pax" 
                                value={pax} 
                                onChange={e => setPax(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className={styles.sadhyaField}>
                        <label htmlFor="sd-workdate">Workdate (Event Date)</label>
                        <div className={styles.inputWrap}>
                            <Calendar size={15} className={styles.inputIcon} />
                            <input 
                                id="sd-workdate"
                                type="date" 
                                value={workDate} 
                                onChange={e => setWorkDate(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className={styles.sadhyaField}>
                        <label htmlFor="sd-auditorium">Auditorium / Venue</label>
                        <div className={styles.inputWrap}>
                            <MapPin size={15} className={styles.inputIcon} />
                            <input 
                                id="sd-auditorium"
                                type="text" 
                                placeholder="Auditorium / Hall name" 
                                value={auditorium} 
                                onChange={e => setAuditorium(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className={styles.bottomActionBar}>
                    <button type="button" className={styles.copyBtn} onClick={handleCopy}>
                        <Copy size={16} /> {copyStatus}
                    </button>

                    <button type="button" className={styles.whatsappBtn} onClick={handleWhatsApp}>
                        <FaWhatsapp size={20} /> Inquire on WhatsApp
                    </button>
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
