"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FileCheck, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import styles from "./Certifications.module.css";

const certifications = [
    {
        icon: <FileCheck />,
        image: "/image/C1.webp",
        title: "FSSAI State License",
        subtitle: "License No: 11318008000766",
        details: ["Category: State License", "Business Type: Food Services – Caterer", "Validity: Up to 04 July 2029"]
    },

    {
        icon: <Shield />,
        image: "/image/C3.webp",
        title: "ISO 22000:2018",
        subtitle: "Food Safety Management System Certified",
        details: ["Scope: Catering Service", "Ensuring highest standards of food safety and hygiene"]
    }
];

export default function Certifications() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % certifications.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
    }, []);

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000); // 5 seconds per slide
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className={styles.certifications}>
            <div className="container">
                <div className={styles.header}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={styles.title}><span style={{ color: '#000000' }}>CERTIFICATIONS &</span> COMPLIANCE</h2>
                        <p className={styles.subtitle}>Certified for Quality, Safety & Professional Excellence</p>
                    </motion.div>
                </div>

                <div className={styles.carouselWrapper}>
                    <button onClick={prevSlide} className={`${styles.navButton} ${styles.prevButton}`} aria-label="Previous">
                        <ChevronLeft size={24} />
                    </button>
                    
                    <button onClick={nextSlide} className={`${styles.navButton} ${styles.nextButton}`} aria-label="Next">
                        <ChevronRight size={24} />
                    </button>

                    <div 
                        className={styles.carouselTrack}
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {certifications.map((cert, index) => (
                            <div key={index} className={styles.card}>
                                <div className={styles.imageSection}>
                                    <Image
                                        src={cert.image}
                                        alt={`${cert.title} certification document for Pride Kitchen Caterers & Events (PKC Events) demonstrating compliance with food safety, quality management, and professional catering standards in Kerala`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className={styles.contentSection}>
                                    <div className={styles.iconWrapper}>{cert.icon}</div>
                                    <h3 className={styles.cardTitle}>{cert.title}</h3>
                                    <p className={styles.cardSubtitle}>{cert.subtitle}</p>
                                    <ul className={styles.cardDetails}>
                                        {cert.details.map((detail, i) => (
                                            <li key={i}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
