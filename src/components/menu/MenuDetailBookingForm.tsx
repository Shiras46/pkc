"use client";

import { useState } from "react";
import { Users, Calendar, MapPin, User, Phone, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import styles from "./MenuDetailBookingForm.module.css";
import { trackEvent } from "@/lib/tracking";

const WHATSAPP_NUMBER = "918138002333";

export interface MenuDetailBookingFormProps {
    occasionTitle: string;
    occasionSlug?: string;
    packageTitle?: string;
    selectedCount?: number;
    totalCount?: number;
    getMenuSummary?: () => string;
    className?: string;
}

export default function MenuDetailBookingForm({
    occasionTitle,
    occasionSlug = "menu",
    packageTitle,
    selectedCount,
    totalCount,
    getMenuSummary,
    className
}: MenuDetailBookingFormProps) {
    const [pax, setPax] = useState("");
    const [workDate, setWorkDate] = useState("");
    const [auditorium, setAuditorium] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
    const [successMessage, setSuccessMessage] = useState("");

    // Build the formatted text message for WhatsApp & DB
    const buildBookingMessage = () => {
        let msg = `*PKC Catering Booking Request*\n`;
        msg += `*Occasion:* ${occasionTitle}\n`;
        if (packageTitle) {
            msg += `*Package:* ${packageTitle}`;
            if (typeof selectedCount === "number" && typeof totalCount === "number" && totalCount > 0) {
                msg += ` (${selectedCount} of ${totalCount} dishes selected)`;
            }
            msg += `\n`;
        }

        msg += `\n*Event Details:*\n`;
        msg += `• *Pax (Guest Count):* ${pax || "To be confirmed"}\n`;
        msg += `• *Workdate (Event Date):* ${workDate || "To be confirmed"}\n`;
        msg += `• *Auditorium / Venue:* ${auditorium || "To be confirmed"}\n`;

        msg += `\n*Contact Details:*\n`;
        msg += `• *Name:* ${name}\n`;
        msg += `• *Phone:* ${phone}\n`;

        if (notes.trim()) {
            msg += `• *Special Notes:* ${notes.trim()}\n`;
        }

        if (getMenuSummary) {
            const summary = getMenuSummary();
            if (summary && summary.trim()) {
                msg += `\n*Menu Selection Details:*\n${summary.trim()}\n`;
            }
        }

        msg += `\nSubmitted from PKC Events Portal (https://pkcevents.com/menu/${occasionSlug})`;
        return msg;
    };

    // Save lead to backend database (/api/enquiries)
    const saveLeadToBackend = async () => {
        try {
            await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    phone: phone.trim(),
                    service: `${occasionTitle} Catering (${pax} Pax - ${auditorium})`,
                    eventType: occasionTitle,
                    eventDate: workDate,
                    guestCount: pax ? Number(pax) : undefined,
                    message: `Pax: ${pax} | Workdate: ${workDate} | Auditorium: ${auditorium}\nNotes: ${notes.trim() || "N/A"}\n\n${buildBookingMessage()}`
                }),
                keepalive: true
            });
        } catch (e) {
            console.error("Failed to save enquiry:", e);
        }
    };

    // Handler: Send via WhatsApp
    const handleWhatsAppSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim() || !pax || !workDate || !auditorium.trim()) {
            alert("Please provide Pax, Workdate, Auditorium, Name, and Phone number to proceed.");
            return;
        }

        setStatus("submitting");
        const fullMessage = buildBookingMessage();

        // 1. Open WhatsApp
        const encoded = encodeURIComponent(fullMessage);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");

        // 2. Concurrently record in database
        await saveLeadToBackend();

        trackEvent("form_submit", { form_type: "menu_detail_whatsapp", occasion: occasionTitle });
        setStatus("success");
        setSuccessMessage("Opening WhatsApp with your booking details! Our master catering coordinator will respond immediately.");
    };

    // Handler: Direct Submit online enquiry
    const handleDirectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim() || !pax || !workDate || !auditorium.trim()) {
            alert("Please provide Pax, Workdate, Auditorium, Name, and Phone number to proceed.");
            return;
        }

        setStatus("submitting");
        await saveLeadToBackend();

        trackEvent("form_submit", { form_type: "menu_detail_direct", occasion: occasionTitle });
        setStatus("success");
        setSuccessMessage(`Thank you, ${name}! Your booking request for ${pax} Pax at ${auditorium} on ${workDate} has been received. Our team will contact you shortly.`);
    };

    return (
        <section className={`${styles.formWrapper} ${className || ""}`} id="book-menu">
            <div className={styles.formHeader}>
                <span className={styles.headerEyebrow}>Direct Catering Booking & Consultation</span>
                <h3 className={styles.headerTitle}>Reserve Your Date & Get Instant Estimate</h3>
                <p className={styles.headerSubtitle}>
                    Enter your expected guest count (Pax), event date (Workdate), and auditorium/venue for immediate date availability and tailored pricing for your {occasionTitle}.
                </p>

                {packageTitle && (
                    <div className={styles.selectionPill}>
                        <span>Selected Package: <strong>{packageTitle}</strong></span>
                        {typeof selectedCount === "number" && typeof totalCount === "number" && totalCount > 0 && (
                            <span>• {selectedCount} of {totalCount} dishes chosen</span>
                        )}
                    </div>
                )}
            </div>

            <div className={styles.formBody}>
                {status === "success" && (
                    <div className={styles.successCard}>
                        <CheckCircle2 size={24} color="#166534" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div className={styles.successText}>
                            <strong>Booking Request Received!</strong>
                            <p>{successMessage}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleWhatsAppSubmit}>
                    {/* Row 1: Pax, Workdate, Auditorium */}
                    <div className={styles.fieldGridThree}>
                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel} htmlFor="booking-pax">
                                Pax (Guest Count) <span className={styles.requiredAsterisk}>*</span>
                            </label>
                            <div className={styles.inputWrapper}>
                                <Users size={18} className={styles.inputIcon} />
                                <input
                                    id="booking-pax"
                                    type="number"
                                    min="25"
                                    placeholder="e.g. 500 Pax"
                                    required
                                    value={pax}
                                    onChange={e => setPax(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel} htmlFor="booking-workdate">
                                Workdate (Event Date) <span className={styles.requiredAsterisk}>*</span>
                            </label>
                            <div className={styles.inputWrapper}>
                                <Calendar size={18} className={styles.inputIcon} />
                                <input
                                    id="booking-workdate"
                                    type="date"
                                    required
                                    value={workDate}
                                    onChange={e => setWorkDate(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel} htmlFor="booking-auditorium">
                                Auditorium / Venue <span className={styles.requiredAsterisk}>*</span>
                            </label>
                            <div className={styles.inputWrapper}>
                                <MapPin size={18} className={styles.inputIcon} />
                                <input
                                    id="booking-auditorium"
                                    type="text"
                                    placeholder="e.g. Lulu Grand Ballroom, Thrissur"
                                    required
                                    value={auditorium}
                                    onChange={e => setAuditorium(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Name & Phone */}
                    <div className={styles.fieldGridTwo}>
                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel} htmlFor="booking-name">
                                Your Name <span className={styles.requiredAsterisk}>*</span>
                            </label>
                            <div className={styles.inputWrapper}>
                                <User size={18} className={styles.inputIcon} />
                                <input
                                    id="booking-name"
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                        </div>

                        <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel} htmlFor="booking-phone">
                                Phone / WhatsApp Number <span className={styles.requiredAsterisk}>*</span>
                            </label>
                            <div className={styles.inputWrapper}>
                                <Phone size={18} className={styles.inputIcon} />
                                <input
                                    id="booking-phone"
                                    type="tel"
                                    placeholder="e.g. 98470 12345"
                                    required
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    className={styles.inputField}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Special Notes */}
                    <div className={`${styles.fieldGroup} ${styles.fullWidthGroup}`}>
                        <label className={styles.fieldLabel} htmlFor="booking-notes">
                            Special Requests / Notes (Optional)
                        </label>
                        <textarea
                            id="booking-notes"
                            rows={3}
                            placeholder="Any specific dietary preferences, live stall requests, or timings..."
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            className={styles.textareaField}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.actionsRow}>
                        <button
                            type="submit"
                            className={styles.whatsappSubmitBtn}
                            disabled={status === "submitting"}
                        >
                            <MessageCircle size={20} />
                            <span>{status === "submitting" ? "Connecting..." : "Book on WhatsApp (Instant)"}</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleDirectSubmit}
                            className={styles.directSubmitBtn}
                            disabled={status === "submitting"}
                        >
                            <Send size={18} />
                            <span>{status === "submitting" ? "Submitting..." : "Submit Online Enquiry"}</span>
                        </button>
                    </div>

                    <p className={styles.disclaimerText}>
                        Your details are encrypted and kept strictly confidential. Pride Kitchen Caterers guarantees 100% genuine master chef consultations with zero spam.
                    </p>
                </form>
            </div>
        </section>
    );
}
