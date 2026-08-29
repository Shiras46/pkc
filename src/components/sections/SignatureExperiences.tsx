"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./SignatureExperiences.module.css";
import QuoteModal from "@/components/ui/QuoteModal";

const services = [
    {
        id: "wedding",
        title: "Wedding Planning",
        desc: "From intimate ceremonies to grand celebrations, we manage every detail with creativity and precision.",
        position: "top"
    },
    {
        id: "catering",
        title: "Premium Catering",
        desc: "Award-winning culinary experiences crafted with authentic flavors, elegant presentation, and exceptional hospitality.",
        position: "left"
    },
    {
        id: "cars",
        title: "Luxury Cars",
        desc: "A collection of premium vehicles designed to make every arrival unforgettable.",
        position: "right"
    },
    {
        id: "venue",
        title: "Venue Decoration",
        desc: "Transforming ordinary spaces into extraordinary celebrations through elegant styling and bespoke décor.",
        position: "bottomLeft"
    },
    {
        id: "entertainment",
        title: "Entertainment",
        desc: "Live performances, cultural programs, and immersive experiences tailored to every occasion.",
        position: "bottomRight"
    },
    {
        id: "corporate",
        title: "Corporate Events",
        desc: "Professional event management solutions designed to create meaningful business experiences.",
        position: "bottom"
    }
];

export default function SignatureExperiences() {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    return (
        <section className={styles.section} id="signature-experiences">
            <div className={`container ${styles.container}`}>
                
                {/* Section Title */}
                <div className={styles.header}>
                    <h2 className={styles.title}><span style={{ color: '#000000' }}>Our Signature</span> Experiences</h2>
                    <p className={styles.subtitle}>
                        Everything required for a flawless celebration, thoughtfully curated under one roof.
                    </p>
                </div>

                {/* Hub & Spoke Diagram */}
                <div className={styles.hubWrapper}>
                    {/* Center Image */}
                    <motion.div 
                        className={styles.centerImageWrapper}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                    >
                        <Image
                            src="/image/services/venue.webp"
                            alt="Luxury wedding venue decoration showcasing premium event management, catering, entertainment, and celebration services by Pride Kitchen Caterers & Events in Kerala"
                            fill
                            className={styles.centerImage}
                            sizes="(max-width: 1024px) 100vw, 400px"
                        />
                        <div className={styles.imageOverlay}></div>
                    </motion.div>

                    {/* SVG Connecting Lines (Desktop Only) */}
                    <div className={styles.linesContainer}>
                        <svg className={styles.svgLines} preserveAspectRatio="none">
                            {/* Top: 50% X, 10% Y to 50% X, 30% Y */}
                            <line x1="50%" y1="15%" x2="50%" y2="30%" className={styles.line} />
                            {/* Left: 20% X, 45% Y to 35% X, 45% Y */}
                            <line x1="28%" y1="42%" x2="40%" y2="45%" className={styles.line} />
                            {/* Right: 80% X, 45% Y to 65% X, 45% Y */}
                            <line x1="72%" y1="42%" x2="60%" y2="45%" className={styles.line} />
                            {/* Bottom Left: 25% X, 75% Y to 40% X, 60% Y */}
                            <line x1="28%" y1="70%" x2="40%" y2="60%" className={styles.line} />
                            {/* Bottom Right: 75% X, 75% Y to 60% X, 60% Y */}
                            <line x1="72%" y1="70%" x2="60%" y2="60%" className={styles.line} />
                            {/* Bottom: 50% X, 85% Y to 50% X, 65% Y */}
                            <line x1="50%" y1="85%" x2="50%" y2="70%" className={styles.line} />
                        </svg>
                    </div>

                    {/* Service Blocks */}
                    {services.map((service, index) => (
                        <motion.div 
                            key={service.id} 
                            className={`${styles.serviceBlock} ${styles[service.position]}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className={styles.dot}>●</div>
                            <div className={styles.blockContent}>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <div className={styles.bottomSection}>
                    <h3 className={styles.bottomTitle}>
                        One Team.<br/>One Vision.<br/>Endless Possibilities.
                    </h3>
                    <p className={styles.bottomDesc}>
                        From planning and catering to décor and entertainment, every service works together seamlessly to create extraordinary celebrations.
                    </p>
                    <button 
                        className={styles.quoteBtn}
                        onClick={() => setIsQuoteModalOpen(true)}
                    >
                        Get Free Quote
                    </button>
                </div>

            </div>

            <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
        </section>
    );
}
