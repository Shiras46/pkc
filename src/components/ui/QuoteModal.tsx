"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import styles from "./QuoteModal.module.css";
import { trackEvent } from "@/lib/tracking";

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
    const [formData, setFormData] = useState({ 
        name: "", 
        phone: "", 
        pax: "", 
        workDate: "", 
        auditorium: "", 
        eventType: "Wedding Catering" 
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        
        try {
            // 1. Open WhatsApp immediately to avoid popup blockers
            const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918138002333";
            let message = `*New Catering Consultation Request*\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService Required: ${formData.eventType}`;
            if (formData.pax) message += `\nPax (Guests): ${formData.pax}`;
            if (formData.workDate) message += `\nWorkdate (Event Date): ${formData.workDate}`;
            if (formData.auditorium) message += `\nAuditorium / Venue: ${formData.auditorium}`;
            message += `\n\nSubmitted from Website Quote Modal`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');

            // 2. Concurrently save enquiry to backend (Admin Panel)
            try {
                const res = await fetch("/api/enquiries", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.name,
                        phone: formData.phone,
                        service: `${formData.eventType}${formData.pax ? ` (${formData.pax} Pax)` : ''}${formData.auditorium ? ` - ${formData.auditorium}` : ''}`,
                        eventType: formData.eventType,
                        eventDate: formData.workDate,
                        guestCount: formData.pax ? Number(formData.pax) : undefined,
                        message: `Pax: ${formData.pax || 'N/A'} | Workdate: ${formData.workDate || 'N/A'} | Auditorium: ${formData.auditorium || 'N/A'}\nSubmitted from Website Quote Modal`
                    }),
                    keepalive: true
                });
                if (!res.ok) {
                    console.error("Failed to save enquiry:", await res.text());
                }
            } catch (apiError) {
                console.error("Failed to save enquiry to backend:", apiError);
            }

            trackEvent('form_submit', { form_type: 'modal_lead' });
            setStatus("success");
            setTimeout(() => {
                setStatus("idle");
                setFormData({ name: "", phone: "", pax: "", workDate: "", auditorium: "", eventType: "Wedding Catering" });
                onClose();
            }, 3000);
        } catch (error) {
            console.error("Form submit error:", error);
            setStatus("idle");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.modalOverlay} onClick={onClose} aria-modal="true" role="dialog">
                    <motion.div 
                        className={styles.modalContent}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
                            <X size={24} />
                        </button>
                        
                        <div className={styles.leadForm}>
                            <h3>Get a Free Quote</h3>
                            <p>Speak to our event specialists today.</p>
                            
                            {status === "success" ? (
                                <div className={styles.successMessage}>
                                    Thanks! We will contact you shortly.
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit}>
                                    <div className={styles.inputGroup}>
                                        <input 
                                            type="text" 
                                            placeholder="Your Name" 
                                            required 
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            aria-label="Your Name"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <input 
                                            type="tel" 
                                            placeholder="Phone Number" 
                                            required 
                                            value={formData.phone}
                                            onChange={e => setFormData({...formData, phone: e.target.value})}
                                            aria-label="Phone Number"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <input 
                                            type="number" 
                                            min="25"
                                            placeholder="Pax (Guest Count, e.g. 500)" 
                                            required
                                            value={formData.pax}
                                            onChange={e => setFormData({...formData, pax: e.target.value})}
                                            aria-label="Pax (Guest Count)"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <input 
                                            type="date" 
                                            placeholder="Workdate (Event Date)" 
                                            required
                                            value={formData.workDate}
                                            onChange={e => setFormData({...formData, workDate: e.target.value})}
                                            aria-label="Workdate (Event Date)"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <input 
                                            type="text" 
                                            placeholder="Auditorium / Venue (e.g. Lulu Ballroom)" 
                                            required
                                            value={formData.auditorium}
                                            onChange={e => setFormData({...formData, auditorium: e.target.value})}
                                            aria-label="Auditorium / Venue"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <select 
                                            value={formData.eventType}
                                            onChange={e => setFormData({...formData, eventType: e.target.value})}
                                            aria-label="Event Type"
                                        >
                                            <option>Wedding Catering</option>
                                            <option>Corporate Event</option>
                                            <option>Reception</option>
                                            <option>Private Party</option>
                                        </select>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className={styles.submitBtn} 
                                        disabled={status === 'submitting'}
                                    >
                                        {status === 'submitting' ? 'Sending...' : 'Request Quote'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
