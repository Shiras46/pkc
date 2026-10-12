"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/tracking";

export default function QuotePopup() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "", service: "Wedding Catering" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    useEffect(() => {
        if (isAdmin) return;
        // Optional: Auto-trigger popup after 30 seconds
        const timer = setTimeout(() => {
            if (!sessionStorage.getItem("popupSeen")) {
                setIsOpen(true);
                sessionStorage.setItem("popupSeen", "true");
            }
        }, 30000);
        
        return () => clearTimeout(timer);
    }, [isAdmin]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        
        try {
            // 1. Open WhatsApp immediately with quote request details
            const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918138002333";
            const message = `*New Quote Request*\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService Required: ${formData.service}\n\nSubmitted from Website Quote Popup`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');

            // 2. Save enquiry to MongoDB Database (Admin Dashboard)
            await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    service: formData.service,
                    message: "Submitted from Website Quote Popup"
                })
            });
            
            trackEvent('form_submit', { form_type: 'popup_quote' });
            setStatus("success");
            
            setTimeout(() => {
                setIsOpen(false);
                setStatus("idle");
                setFormData({ name: "", phone: "", service: "Wedding Catering" });
            }, 3000);
        } catch {
            setStatus("idle");
        }
    };

    if (isAdmin) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={overlayStyle}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        style={modalStyle}
                        role="dialog"
                        aria-labelledby="popup-title"
                        aria-modal="true"
                    >
                        <button 
                            onClick={() => setIsOpen(false)} 
                            style={closeBtnStyle}
                            aria-label="Close Quote Popup"
                        >
                            <X size={24} />
                        </button>
                        
                        <h2 id="popup-title" style={{ marginTop: 0, color: '#333', fontSize: '1.5rem', marginBottom: '10px' }}>
                            Request a Custom Quote
                        </h2>
                        <p style={{ color: '#666', marginBottom: '20px', fontSize: '0.9rem' }}>
                            Tell us a bit about your event and our experts will get back to you with a personalized proposal.
                        </p>
                        
                        {status === "success" ? (
                            <div style={{ padding: '20px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '8px', textAlign: 'center' }}>
                                Thank you! We will contact you shortly.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div>
                                    <label style={labelStyle} htmlFor="popup-name">Your Name</label>
                                    <input 
                                        id="popup-name"
                                        type="text" 
                                        required 
                                        style={inputStyle} 
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle} htmlFor="popup-phone">Phone Number</label>
                                    <input 
                                        id="popup-phone"
                                        type="tel" 
                                        required 
                                        style={inputStyle} 
                                        value={formData.phone}
                                        onChange={e => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle} htmlFor="popup-service">Service Required</label>
                                    <select 
                                        id="popup-service"
                                        style={inputStyle}
                                        value={formData.service}
                                        onChange={e => setFormData({...formData, service: e.target.value})}
                                    >
                                        <option>Wedding Catering</option>
                                        <option>Corporate Catering</option>
                                        <option>Event Management</option>
                                        <option>Private Celebrations</option>
                                    </select>
                                </div>
                                <button 
                                    type="submit" 
                                    style={submitBtnStyle}
                                    disabled={status === 'submitting'}
                                    aria-label="Submit Quote Request"
                                >
                                    {status === 'submitting' ? 'Sending...' : 'Get My Quote'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px'
};

const modalStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: '16px',
    padding: '30px',
    width: '100%',
    maxWidth: '450px',
    position: 'relative',
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
};

const closeBtnStyle: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666'
};

const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#333'
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    background: '#fafafa',
    transition: 'border-color 0.3s'
};

const submitBtnStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px',
    background: '#FCB318',
    color: '#5c3812',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: '10px'
};
