"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FullscreenServices.module.css";

const services = [
    {
        id: "01",
        title: "Premium Catering",
        desc: "Authentic flavours crafted with passion and precision.\n\nFrom traditional Kerala feasts to global gourmet experiences, our culinary team creates unforgettable dining experiences tailored to every celebration.",
        image: "/image/services/premium cat.webp",
        alt: "Elegant wedding catering setup with decorated dining area",
        link: "/services/catering"
    },
    {
        id: "02",
        title: "Luxury Cars",
        desc: "Arrive with elegance and distinction.\n\nChoose from a curated collection of premium luxury vehicles that create a memorable first impression for your special day.",
        image: "/image/services/Premium Cars/HERO IMAGE.webp",
        alt: "Sleek premium luxury car offering an elegant arrival for weddings and special events",
        link: "/services/cars"
    },
    {
        id: "03",
        title: "Wedding Planning",
        desc: "Turning dreams into extraordinary celebrations.\n\nFrom intimate ceremonies to grand weddings, we orchestrate every detail with creativity, sophistication, and flawless execution.",
        image: "/image/services/Every Frame.webp",
        alt: "Wedding couple photography in a natural outdoor setting",
        link: "/services"
    },
    {
        id: "04",
        title: "Venue Decoration",
        desc: "Spaces transformed into timeless masterpieces.\n\nElegant floral arrangements, luxurious stage designs, and immersive decor concepts designed exclusively for your celebration.",
        image: "/image/services/decoration.webp",
        alt: "Elegant outdoor wedding table decoration",
        link: "/services/decoration"
    },
    {
        id: "05",
        title: "Entertainment",
        desc: "Creating moments that captivate and inspire.\n\nLive performances, cultural programs, celebrity appearances, and immersive entertainment experiences curated to elevate every event.",
        image: "/image/services/entertainment.webp",
        alt: "Live entertainment performance at a wedding event",
        link: "/services/entertainment"
    },
    {
        id: "06",
        title: "Corporate Events",
        desc: "Professional experiences with lasting impact.\n\nFrom conferences and product launches to gala dinners and annual celebrations, we deliver seamless corporate event experiences.",
        image: "/image/services/Whisper Stories.webp",
        alt: "Elegant wedding venue interior with decorative lighting",
        link: "/services"
    }
];

export default function FullscreenServices() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className={styles.section} id="services">
            <div className={styles.container}>

                {/* Left Side: Navigation & Content (40%) */}
                <div className={styles.leftPane}>
                    <div className={styles.header}>
                        <span className={styles.subtitle}>Crafting Extraordinary Experiences</span>
                        <p className={styles.headerDesc}>
                            Every celebration tells a unique story. From world-class catering and luxury event management to premium transportation and bespoke experiences, we curate every detail to transform moments into timeless memories.
                        </p>
                    </div>

                    <div className={styles.navContainer}>
                        {services.map((service, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div
                                    key={service.id}
                                    className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <div className={styles.navTitleRow}>
                                        <div className={styles.navTitleGroup}>
                                            <span className={styles.navNum}>{service.id}</span>
                                            <h3 className={styles.navTitle}>{service.title}</h3>
                                        </div>
                                        <div className={styles.progressTrack}>
                                            {isActive && (
                                                <motion.div
                                                    className={styles.progressBar}
                                                    layoutId="progressBar"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 6, ease: "linear" }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                className={styles.activeContentWrapper}
                                            >
                                                <div className={styles.activeContent}>
                                                    {service.desc.split('\n\n').map((paragraph, i) => (
                                                        <p key={i} className={i === 0 ? styles.primaryDesc : styles.secondaryDesc}>
                                                            {paragraph}
                                                        </p>
                                                    ))}
                                                    <Link href={service.link} className={styles.exploreBtn}>
                                                        Explore Service →
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side: Media (60%) */}
                <div className={styles.rightPane}>
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={activeIndex}
                            className={styles.imageWrapper}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                        >
                            <Image
                                src={services[activeIndex].image}
                                alt={services[activeIndex].alt || `${services[activeIndex].title} service by Pride Kitchen Caterers & Events showcasing premium catering, luxury event management, and hospitality solutions in Kerala`}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                className={styles.bgImage}
                            />
                            <div className={styles.imageOverlay}></div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
