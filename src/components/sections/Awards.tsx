"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Awards.module.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const awardsData: { year: string; title: string; subtitle: string; image: string; containImage?: boolean; imageStyle?: React.CSSProperties; frameStyle?: React.CSSProperties; width?: number; height?: number }[] = [
    {
        year: "2023",
        title: "South Indian Hospitality Awards 2023",
        subtitle: "Excellence in Client Hospitality",
        image: "/image/timeline/2023.webp",
        containImage: true,
        frameStyle: { aspectRatio: "auto", overflow: "visible" },
        imageStyle: { position: "relative", width: "100%", height: "auto", objectFit: "contain", top: 0, borderRadius: "inherit" },
        width: 1280,
        height: 933
    },
    {
        year: "2024",
        title: "Metro Food Awards 2024",
        subtitle: "Excellence in Culinary Services",
        image: "/image/timeline/2024 award.webp"
    },
    {
        year: "2025",
        title: "Metro Food Awards 2025",
        subtitle: "Excellence in Catering & Hospitality Services",
        image: "/image/timeline/2025 metro.webp"
    },
    {
        year: "2025",
        title: "Indian Express Feature",
        subtitle: "Media & Industry Spotlight",
        image: "/image/timeline/indain express.webp",
        imageStyle: { objectPosition: "center 15%" }
    }
];

export default function Awards() {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressLineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        // Progressive drawing of the central progress line
        gsap.fromTo(progressLineRef.current,
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 25%",
                    end: "bottom 75%",
                    scrub: true
                }
            }
        );

        const rows = gsap.utils.toArray<HTMLElement>(`.${styles.timelineRow}`);
        
        rows.forEach((row) => {
            const dot = row.querySelector(`.${styles.timelineDot}`);
            const content = row.querySelector(`.${styles.contentSide}`);
            const visual = row.querySelector(`.${styles.visualSide}`);
            const img = row.querySelector(`.${styles.image}`);
            const isLeft = content?.classList.contains(styles.leftContent);

            // Active Dot Glowing Trigger
            gsap.to(dot, {
                backgroundColor: "#FCB318",
                borderColor: "#FCB318",
                scale: 1.35,
                boxShadow: "0 0 18px rgba(252, 179, 24, 0.8)",
                scrollTrigger: {
                    trigger: dot,
                    start: "top 55%",
                    end: "top 35%",
                    toggleActions: "play reverse play reverse"
                }
            });

            // Content slide and fade up trigger
            gsap.fromTo(content,
                { opacity: 0, x: isLeft ? -45 : 45, y: 30 },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 0.85,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 72%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Image card slide and fade up trigger
            gsap.fromTo(visual,
                { opacity: 0, x: isLeft ? 45 : -45, y: 30, scale: 0.96 },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.85,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 68%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Parallax image scrolling - skipped for contained images
            if (img && !img.classList.contains(styles.containImage)) {
                gsap.fromTo(img,
                    { yPercent: -8 },
                    {
                        yPercent: 8,
                        ease: "none",
                        scrollTrigger: {
                            trigger: row,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={styles.section}>
            <div className="container">
                
                {/* Header */}
                <div className={styles.header}>
                    <h2><span style={{ color: '#000000' }}>Awards &</span> Recognition</h2>
                    <p>Celebrated for excellence in luxury event management and premium catering across India.</p>
                </div>

                {/* Timeline Container */}
                <div className={styles.timelineContainer}>
                    
                    {/* Background Central Tracking Line */}
                    <div className={styles.timelineLine}>
                        {/* Dynamic Progress Line */}
                        <div ref={progressLineRef} className={styles.progressLine}></div>
                    </div>

                    {/* Timeline Rows */}
                    {awardsData.map((award, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div 
                                key={index} 
                                className={`${styles.timelineRow} ${isLeft ? styles.rowLeft : styles.rowRight}`}
                            >
                                {/* Center Anchor dot */}
                                <div className={styles.timelineDot}></div>

                                {/* Content block */}
                                <div className={`${styles.contentSide} ${isLeft ? styles.leftContent : styles.rightContent}`}>
                                    <span className={styles.awardYear}>{award.year}</span>
                                    <h3 className={styles.awardTitle}>{award.title}</h3>
                                    <p className={styles.awardSubtitle}>{award.subtitle}</p>
                                </div>

                                {/* Event/Award Image Frame */}
                                <div className={styles.visualSide}>
                                    <div className={styles.imageFrame} style={award.frameStyle}>
                                        <Image
                                            src={award.image}
                                            alt={`${award.title} award recognizing excellence in luxury catering, event management, and hospitality services by Pride Kitchen Caterers & Events (PKC Events) in Kerala`}
                                            fill={!award.width}
                                            width={award.width}
                                            height={award.height}
                                            sizes="(max-width: 1024px) 100vw, 45vw"
                                            className={`${styles.image} ${award.containImage ? styles.containImage : ""}`}
                                            loading="lazy"
                                            style={award.imageStyle}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
