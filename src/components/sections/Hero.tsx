"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./Hero.module.css";
import { trackContactClick } from "@/lib/tracking";
import QuoteModal from "@/components/ui/QuoteModal";

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== "undefined") {
    ScrollTrigger.config({ ignoreMobileResize: true });
}

const heroImages = [
    "/image/hero1.webp",
    "/image/hero2.webp",
    "/image/HERO3.webp",
    "/image/hero4.webp"
];

export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 9000);
        return () => clearInterval(timer);
    }, []);

    useGSAP(() => {
        if (typeof window === "undefined") return;
        const isMobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (isMobile || reduceMotion || !backgroundRef.current) return;

        const timer = setTimeout(() => {
            if (backgroundRef.current && sectionRef.current) {
                gsap.to(backgroundRef.current, {
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    }
                });
            }
        }, 150);

        return () => clearTimeout(timer);
    }, { scope: sectionRef, dependencies: [] });

    return (
        <section ref={sectionRef} className={styles.hero}>
            <div ref={backgroundRef} className={styles.videoContainer}>
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentIndex}
                        className={styles.carouselImage}
                        initial={false}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0.8 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        <Image
                            src={heroImages[currentIndex]}
                            alt="Luxury wedding and event celebration with elegant catering and premium event management in Kerala"
                            fill
                            sizes="100vw"
                            priority={currentIndex === 0}
                            quality={60}
                            loading={currentIndex === 0 ? "eager" : "lazy"}
                            fetchPriority={currentIndex === 0 ? "high" : "auto"}
                            style={{ objectFit: 'cover', objectPosition: 'center 78%' }}
                        />
                    </motion.div>
                </AnimatePresence>
                <div className={styles.overlay}></div>
            </div>

            <div ref={contentRef} className={styles.contentContainer}>
                <div className={`container ${styles.gridContainer}`}>
                    
                    <div className={styles.textContent}>

                        <div className="hero-reveal">
                            <h1 className={styles.heading}>
                                Event Management in Thrissur <br />
                                <span className={styles.goldTextNormal}>for Weddings and Corporate Events</span>
                            </h1>
                        </div>
                        <div className="hero-reveal">
                            <p className={styles.subtext}>
                                Your Celebrations, Our Premium Touch
                            </p>
                        </div>
                        <div className="hero-reveal">
                            <button
                                className={styles.heroConsultationBtn}
                                onClick={() => {
                                    trackContactClick('quote', 'hero');
                                    setIsQuoteModalOpen(true);
                                }}
                                aria-label="Book Your Consultation"
                            >
                                BOOK YOUR CONSULTATION
                            </button>
                        </div>
                        <div className={`hero-reveal ${styles.googleReview}`}>
                            <div className={styles.reviewContent}>
                                <div className={styles.stars}>
                                    <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                </div>
                                <span className={styles.ratingText}>4.9/5 Rating</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
        </section>
    );
}
