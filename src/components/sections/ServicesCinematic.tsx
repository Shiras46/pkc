
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/lib/data";
import styles from "./ServicesCinematic.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesCinematic() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const rows = gsap.utils.toArray<HTMLElement>(`.${styles.serviceRow}`);

        rows.forEach((row, index) => {
            // Scoped selectors
            const imageWrapper = row.querySelector(`.${styles.imageWrapper}`);
            const image = row.querySelector(`.${styles.serviceImage}`);
            const content = row.querySelector(`.${styles.contentColInner}`);

            // 1. Image Wipe Reveal (Inset Clip Path)
            gsap.fromTo(imageWrapper,
                { clipPath: "inset(100% 0 0 0)" },
                {
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 75%", // Triggers when top of row is 75% down viewport
                        end: "top 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // 2. Parallax Image Inside
            gsap.fromTo(image,
                { yPercent: -15, scale: 1.1 },
                {
                    yPercent: 15,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: row,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );

            // 3. Content Slide In
            // Standard staggered fade up
            gsap.fromTo(content?.children || [],
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 60%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className={styles.section} id="services-cinematic">

            {/* Intro Header */}
            <div className={styles.intro}>
                <span className={styles.introSubtitle}>Our Expertise</span>
                <h1 className={styles.introTitle}>Curated Experiences</h1>
            </div>

            {/* Service Rows */}
            <div className={styles.rowsContainer}>
                {servicesData.map((service, index) => (
                    <article key={service.id} className={styles.serviceRow}>

                        {/* Image Column */}
                        <div className={styles.imageCol}>
                            <div className={styles.imageWrapper}>
                                <div className={styles.overlay}></div>
                                <Image
                                    src={service.image}
                                    alt={service.name}
                                    fill
                                    className={styles.serviceImage}
                                    sizes="(max-width: 768px) 100vw, 70vw"
                                    priority={index === 0}
                                />
                            </div>
                        </div>

                        {/* Content Column */}
                        <div className={styles.contentCol}>
                            <div className={styles.contentColInner}>
                                <div className={styles.serviceNum}>{(index + 1).toString().padStart(2, '0')}</div>
                                <h2 className={styles.serviceTitle}>{service.name}</h2>
                                <p className={styles.serviceDesc}>{service.desc}</p>
                                <Link href={service.href} className={styles.linkBtn}>
                                    <span>Explore Service</span>
                                    <span className={styles.arrow}>→</span>
                                </Link>
                            </div>
                        </div>

                    </article>
                ))}
            </div>

        </section>
    );
}
