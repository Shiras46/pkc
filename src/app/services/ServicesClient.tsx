"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./Services.module.css";
import QuoteModal from "@/components/ui/QuoteModal";
import ServiceCards from "@/components/sections/ServiceCards";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ServicesClient() {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const mainRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // --- 1. HERO ANIMATION ---
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-reveal", {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            clearProps: "all"
        });

        if (!reduceMotion && backgroundRef.current && sectionRef.current) {
            gsap.to(backgroundRef.current, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        // --- 2. BENTO GRID REVEAL ---
        gsap.fromTo(".bento-item",
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: `.${styles.whySection}`,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            }
        );

        // --- 3. CTA SECTION REVEAL ---
        gsap.fromTo(".cta-content",
            {
                y: 40,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: `.${styles.ctaSection}`,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );

    }, { scope: mainRef, dependencies: [] });

    const bentoItems = [
        { title: "Industry Expertise", desc: "Over a decade of orchestrating elite events with precision.", colSpan: 2 },
        { title: "Reliable Execution", desc: "Flawless logistics you can trust.", colSpan: 1 },
        { title: "Client-Focused", desc: "Your vision is our ultimate blueprint.", colSpan: 1 },
        { title: "Luxury Quality", desc: "Uncompromising standards in every detail.", colSpan: 1 },
        { title: "Creative Innovation", desc: "Setting trends in the event space.", colSpan: 1 },
        { title: "Dedicated Team", desc: "A passionate crew available around the clock.", colSpan: 3 }
    ];

    return (
        <main ref={mainRef} className={styles.mainWrapper}>

            {/* HERO SECTION */}
            <section ref={sectionRef} className={styles.hero}>
                <div ref={backgroundRef} className={styles.videoContainer}>
                    <Image src="/image/services/ARUN8992.JPG.webp" alt="Premium wedding event decoration with purple lighting" fill sizes="100vw" priority style={{ objectFit: 'cover' }} />
                    <div className={styles.overlay}></div>
                </div>

                <div ref={contentRef} className={styles.contentContainer}>
                    <div className={`container ${styles.gridContainer}`}>
                        <div className={styles.textContent}>
                            <div className="hero-reveal">
                                <h1 className={styles.heading}>
                                    <span style={{ color: '#ffffff' }}>Flawless</span> <span className={styles.goldText}>Execution</span>,<br />
                                    <span style={{ color: '#fcb318' }}>Exceptional Experiences.</span>
                                </h1>
                            </div>
                            <div className="hero-reveal">
                                <p className={styles.subtext}>
                                    From intimate celebrations to grand-scale events, we bring creativity, precision, and elegance to every occasion.
                                </p>
                            </div>
                            <div className={`hero-reveal ${styles.btnGroup}`}>
                                <button className={styles.primaryLink} onClick={() => setIsQuoteOpen(true)}>
                                    Plan Your Event <ChevronRight size={18} />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES SHOWCASE */}
            <ServiceCards />

            {/* WHY CHOOSE US BENTO GRID */}
            <section className={styles.whySection}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionTag}>THE DIFFERENCE</span>
                    <h2>Why Choose Us</h2>
                    <div className={styles.goldLine}></div>
                </div>

                <div className={`bento-grid ${styles.bentoGrid}`}>
                    {bentoItems.map((item, idx) => (
                        <div
                            key={idx}
                            className={`bento-item ${styles.bentoCard}`}
                            style={{ gridColumn: `span ${item.colSpan}` }}
                        >
                            <div className={styles.bentoGlow}></div>
                            <div className={styles.bentoContent}>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaBackground}>
                    <Image
                        src="/image/services/luxury-wedding-caterers.webp"
                        alt="Pride Kitchen Caterers Kerala wedding feast setup"
                        fill
                        sizes="100vw"
                        style={{ objectFit: 'cover' }}
                    />
                    <div className={styles.ctaOverlay}></div>
                </div>

                <div className={`cta-content ${styles.ctaContent}`}>
                    <h2>Ready To Create Something Extraordinary?</h2>
                    <p>Let&apos;s transform your vision into an unforgettable experience.</p>
                    <div className={styles.ctaActions}>
                        <button className={styles.ctaPrimaryLink} onClick={() => setIsQuoteOpen(true)}>
                            Schedule Consultation <ChevronRight size={18} />
                        </button>
                        <a href="https://wa.me/918138002333" target="_blank" rel="noreferrer" className={styles.ctaSecondaryLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <FaWhatsapp size={19} /> WhatsApp Enquiry
                        </a>
                    </div>
                </div>
            </section>

            <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
        </main>
    );
}
