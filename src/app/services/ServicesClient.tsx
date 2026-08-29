"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
    ChevronRight, Star, Users, Clock, ShieldCheck, Sparkles,
    Award, CalendarCheck, Heart, MapPin, Briefcase, Camera, Music, Gift, Plane,
    Car, Utensils, Paintbrush, Home, Trophy, HeartHandshake, ChevronDown
} from "lucide-react";
import styles from "./Services.module.css";
import QuoteModal from "@/components/ui/QuoteModal";

import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ServicesClient() {
    const mainRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    useGSAP(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const tl = gsap.timeline();

        tl.from(".hero-reveal", {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: "expo.out",
            delay: 0.2
        });

        if (!reduceMotion) {
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
    }, { scope: sectionRef, dependencies: [] });

    useGSAP(() => {

        // Features Strip Reveal
        gsap.fromTo(".feature-item",
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".features-strip",
                    start: "top 80%",
                }
            }
        );

        // Counters
        const counters = document.querySelectorAll(".counter-val");
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target") || "0");
            gsap.to(counter, {
                innerHTML: target,
                duration: 2,
                snap: { innerHTML: 1 },
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".achievements-section",
                    start: "top 75%",
                },
                onUpdate: function () {
                    const el = counter as HTMLElement;
                    if (target > 1000) el.innerHTML = Math.ceil(this.targets()[0].innerHTML) + "+";
                    else if (target === 100) el.innerHTML = Math.ceil(this.targets()[0].innerHTML) + "%";
                    else el.innerHTML = Math.ceil(this.targets()[0].innerHTML) + "+";
                }
            });
        });

        // Service Cards Reveal
        gsap.fromTo(".service-card",
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 80%"
                }
            }
        );

        // Bento Grid Reveal
        gsap.fromTo(".bento-item",
            { scale: 0.95, y: 30, opacity: 0 },
            {
                scale: 1,
                y: 0,
                opacity: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".bento-grid",
                    start: "top 75%"
                }
            }
        );

        // CTA Parallax
        gsap.fromTo(".cta-content",
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: {
                    trigger: ".cta-section",
                    start: "top 80%"
                }
            }
        );

    }, { scope: mainRef, dependencies: [] });

    const services = [
        { id: "cars", title: "Luxury Cars", img: "/image/services/Premium Cars/MOJO-216.webp", alt: "Classic vintage premium vehicle displaying an elegant wedding transportation service", icon: <Car />, desc: "Premium vehicles for a grand and elegant entrance." },
        { id: "catering", title: "Premium Catering", img: "/image/services/premium cat.webp", alt: "Elegant wedding catering setup with decorated dining area", icon: <Utensils />, desc: "Authentic flavours and exquisite culinary experiences." },
        { id: "decoration", title: "Venue Decoration", img: "/image/services/Decoration event.webp", alt: "Elegant outdoor wedding table decoration", icon: <Paintbrush />, desc: "Stunning themes and breathtaking floral arrangements." },
        { id: "entertainment", title: "Entertainment", img: "/image/services/entertainment.webp", alt: "Live entertainment performance at a wedding event", icon: <Music />, desc: "Live music, DJs, and engaging performances." },
        { id: "makeup", title: "Bridal Makeup", img: "/image/services/ROYAL ESSENCE.webp", alt: "Professional bridal makeup and traditional hairstyle", icon: <Sparkles />, desc: "Professional artists for a flawless, radiant look." },
        { id: "photography", title: "Photography", img: "/image/services/Every Frame.webp", alt: "Wedding couple photography in a natural outdoor setting", icon: <Camera />, desc: "Capturing your precious moments with cinematic brilliance." },
        { id: "venue", title: "Venue Selection", img: "/image/services/Whisper Stories.webp", alt: "Elegant wedding venue interior with decorative lighting", icon: <Home />, desc: "Finding the perfect luxurious location for your event." }
    ];

    const features = [
        { title: "Premium Quality", icon: <Star size={24} /> },
        { title: "Expert Team", icon: <Users size={24} /> },
        { title: "On-Time Delivery", icon: <Clock size={24} /> },
        { title: "Reliable Service", icon: <ShieldCheck size={24} /> },
        { title: "Attention To Detail", icon: <Sparkles size={24} /> }
    ];

    const achievements = [
        { target: 5000, label: "Events Delivered", icon: <Trophy aria-hidden="true" /> },
        { target: 10, label: "Years Experience", icon: <Clock aria-hidden="true" /> },
        { target: 100, label: "Client Satisfaction", icon: <HeartHandshake aria-hidden="true" /> },
        { target: 24, label: "24/7 Support", icon: <ShieldCheck aria-hidden="true" />, isHours: true }
    ];

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
            <section className={styles.showcaseSection}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionTag}>WHAT WE DO</span>
                    <h2><span style={{ color: '#000000' }}>Our Signature</span> Services</h2>
                    <div className={styles.goldLine}></div>
                </div>

                <div className={`services-grid ${styles.servicesGrid}`}>
                    {services.map((srv, idx) => (
                        <Link href={`/services/${srv.id}`} key={idx} className={`service-card ${styles.serviceCard}`}>
                            <div className={styles.cardImageWrapper}>
                                <Image src={srv.img} alt={srv.alt || `${srv.title} services by Pride Kitchen Caterers & Events`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className={styles.cardImg} />
                                <div className={styles.cardGradient}></div>
                                <div className={styles.cardBadge}>{srv.icon}</div>
                            </div>
                            <div className={styles.cardContent}>
                                <h3>{srv.title}</h3>
                                <p>{srv.desc}</p>
                                <span className={styles.cardLink}>Explore <ChevronRight size={16} /></span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

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
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA SECTION */}
            <section className={`cta-section ${styles.ctaSection}`}>
                <div className={styles.ctaBackground}>
                    <Image src="/image/services/catering.webp" alt="Catering services contact background" fill sizes="100vw" className={styles.ctaBgImg} />
                    <div className={styles.ctaOverlay}></div>
                </div>

                <div className={`cta-content ${styles.ctaContent}`}>
                    <h2>Ready To Create Something Extraordinary?</h2>
                    <p>Let's transform your vision into an unforgettable experience.</p>
                    <div className={styles.ctaActions}>
                        <button className={styles.ctaPrimaryLink} onClick={() => setIsQuoteOpen(true)}>
                            Schedule Consultation <ChevronRight size={18} />
                        </button>
                        <a href="https://wa.me/918138002333" target="_blank" rel="noreferrer" className={styles.ctaSecondaryLink}>
                            WhatsApp Enquiry
                        </a>
                    </div>
                </div>
            </section>

            <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
        </main>
    );
}
