"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./FinalCTA.module.css";
import QuoteModal from "@/components/ui/QuoteModal";
import { trackContactClick } from "@/lib/tracking";
import { FaWhatsapp } from "react-icons/fa";

export default function FinalCTA() {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    return (
        <>
            <section className={styles.cta}>
                <div className={styles.imageBackdrop}>
                    <Image
                        src="/image/hero2.webp"
                        alt="Pride Kitchen Caterers and Events Grand Wedding Celebration Backdrop"
                        fill
                        quality={45}
                        loading="lazy"
                        sizes="100vw"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                </div>
                <div className={styles.overlay}></div>
                <div className={`container ${styles.container}`}>
                    <motion.div
                        className={styles.content}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="heading-lg">Ready to Create Magic?</h2>
                        <p>Contact us today for a bespoke consultation and let&apos;s craft an event that will be remembered for generations.</p>
                        <div className={styles.actions}>
                            <button 
                                className="btn btn-primary"
                                onClick={() => {
                                    trackContactClick('quote', 'final_cta');
                                    setIsQuoteModalOpen(true);
                                }}
                            >
                                Book Your Consultation
                            </button>
                            <a 
                                href="https://wa.me/918138002333" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="btn btn-outline" 
                                style={{ color: 'white', borderColor: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                onClick={() => trackContactClick('whatsapp', 'final_cta')}
                            >
                                <FaWhatsapp size={19} /> WhatsApp Enquiry
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
            <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
        </>
    );
}
