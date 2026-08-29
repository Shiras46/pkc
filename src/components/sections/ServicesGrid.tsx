
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Utensils, Home, Paintbrush, Camera, Sparkles, Music, Car } from "lucide-react";
import { servicesData } from "@/lib/data";
import styles from "./ServicesGrid.module.css";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Define icons mapping (reused from Overview)
const iconMap: Record<string, React.ReactNode> = {
    catering: <Utensils size={24} />,
    venue: <Home size={24} />,
    decoration: <Paintbrush size={24} />,
    photography: <Camera size={24} />,
    makeup: <Sparkles size={24} />,
    entertainment: <Music size={24} />,
    cars: <Car size={24} />,
};

// Merge data with icons
const services = servicesData.map(s => ({
    ...s,
    icon: iconMap[s.id]
}));

export default function ServicesGrid() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animation: Fade in + Upward Movement with Stagger
        const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);

        // Batch animation for performance and smooth scroll reveal
        ScrollTrigger.batch(cards, {
            start: "top 85%",
            onEnter: (elements) => {
                gsap.to(elements, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    overwrite: true
                });
            },
            once: true // Animate only once
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {services.map((service) => (
                        <article key={service.id} className={styles.card}>
                            {/* Visual Area */}
                            <div className={styles.imageWrapper}>
                                <div className={styles.overlay}></div>
                                <Image
                                    src={service.image}
                                    alt={service.name}
                                    fill
                                    className={styles.cardImage}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                />
                            </div>

                            {/* Content Area */}
                            <div className={styles.content}>
                                <div className={styles.header}>
                                    <div className={styles.icon}>{service.icon}</div>
                                    <h3 className={styles.title}>{service.name}</h3>
                                </div>
                                <p className={styles.description}>{service.desc}</p>
                                <Link href={service.href} className={styles.link}>
                                    <span>View Details</span>
                                    <span className={styles.linkArrow}>→</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
