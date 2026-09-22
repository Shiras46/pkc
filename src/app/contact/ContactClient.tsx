"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import BrandName from "@/components/ui/BrandName";
import styles from "./Contact.module.css";
import { trackContactClick, trackEvent } from "@/lib/tracking";

export default function ContactClient() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "Wedding",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            // 1. Open WhatsApp immediately with enquiry details
            const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918138002333";
            const message = `*New Contact Enquiry*\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'N/A'}\nEvent Type: ${formData.service}\nMessage: ${formData.message || 'N/A'}\n\nSubmitted from Website Contact Form`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');

            // 2. Save enquiry to MongoDB Database (Admin Dashboard)
            const res = await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                trackEvent('form_submit', { form_type: 'contact_page' });
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", service: "Wedding", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className="container">
                    <h1 className="heading-xl text-center" style={{ color: '#fcb318' }}><span style={{ color: '#000000' }}>Contact</span> Us</h1>
                    <p className={styles.subtitle}>Let's Start Planning Your Extraordinary Event</p>
                </div>
            </header>

            <section className="section-padding">
                <div className="container">
                    <div className={styles.grid}>
                        <div className={styles.contactInfo}>
                            <h2 className="heading-md">Headquarters</h2>
                            <p className={styles.description}>
                                Have questions or ready to book? Reach out to us through any of the following channels.
                            </p>

                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <div className={styles.iconBox}><Phone size={24} aria-hidden="true" /></div>
                                    <div>
                                        <h3>Phone</h3>
                                        <a href="tel:+918138002333" onClick={() => trackContactClick('phone', 'contact_page')} style={{ color: 'inherit', textDecoration: 'none' }}>
                                            +91 81380 02333
                                        </a>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.iconBox}><Mail size={24} aria-hidden="true" /></div>
                                    <div>
                                        <h3>Email</h3>
                                        <a href="mailto:pridekitchencaterers@gmail.com" onClick={() => trackContactClick('email', 'contact_page')} style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
                                            pridekitchencaterers@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.iconBox}><MapPin size={24} aria-hidden="true" /></div>
                                    <div>
                                        <h3>Visit Us</h3>
                                        <a 
                                            href="https://maps.app.goo.gl/a39cG6zMdG82upn96" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            style={{ color: 'inherit', textDecoration: 'none' }}
                                            onClick={() => trackEvent('contact_click', { method: 'map', location: 'contact_page' })}
                                        >
                                            <address style={{ fontStyle: 'normal', cursor: 'pointer' }}>
                                                <BrandName />, Arammel Arcade, nr. Mannuthy - Madakkathara Road, Sree Lakshmi Nagar, Mannuthy, Thrissur, Kerala 680651
                                            </address>
                                        </a>
                                    </div>
                                </div>

                                <div className={styles.infoItem}>
                                    <div className={styles.iconBox}><Clock size={24} aria-hidden="true" /></div>
                                    <div>
                                        <h3>Business Hours</h3>
                                        <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                                        <p>Sun: By Appointment</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.whatsappBox}>
                                <MessageCircle size={30} aria-hidden="true" />
                                <div>
                                    <h3>Quick Support</h3>
                                    <p>Chat with our event experts on WhatsApp for instant replies.</p>
                                    <a href="https://wa.me/918138002333" onClick={() => trackContactClick('whatsapp', 'contact_page')} className={styles.whatsappLink}>Chat Now</a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formSection}>
                            <div className={styles.formCard}>
                                <h2 style={{ color: '#fcb318' }}>Get a Quote</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="contact-name">Your Name</label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            placeholder="John Doe"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="contact-phone">Phone Number</label>
                                        <input
                                            id="contact-phone"
                                            type="tel"
                                            placeholder="+91 81380 02333"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="contact-email">Email Address</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            placeholder="john@example.com"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="contact-service">Event Type</label>
                                        <select
                                            id="contact-service"
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        >
                                            <option>Wedding</option>
                                            <option>Corporate Event</option>
                                            <option>Birthday Party</option>
                                            <option>Engagement</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="contact-message">Your Message</label>
                                        <textarea
                                            id="contact-message"
                                            placeholder="Tell us about your event..."
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ width: '100%' }}
                                        disabled={status === 'submitting'}
                                    >
                                        {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
                                    </button>
                                    {status === 'success' && <p style={{ color: 'green', marginTop: '10px', textAlign: 'center' }} role="alert">Thank you! We will contact you shortly.</p>}
                                    {status === 'error' && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }} role="alert">Failed to send. Please try again.</p>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.mapSection} aria-label="Location Map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.271509378036!2d76.24956181480084!3d10.529810892495914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ef98babf5719%3A0x9e0358ad8193ac61!2sPride+Kitchen+Caterers+%26+Events!5e0!3m2!1sen!2sin!4v1720529805500!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Google Maps Location of PKC Events"
                ></iframe>
            </section>
        </div>
    );
}
