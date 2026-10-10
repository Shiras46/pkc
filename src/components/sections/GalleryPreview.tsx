"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { galleryItems } from "@/lib/gallery";
import styles from "./GalleryPreview.module.css";

const galleryRows = [
    galleryItems.slice(0, 5),
    galleryItems.slice(5, 10),
    galleryItems.slice(10, 15),
];

export default function GalleryPreview() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 24,
        mass: 0.35,
    });

    const rowOneX = useTransform(smoothProgress, [0, 1], ["0%", "-15%"]);
    const rowTwoX = useTransform(smoothProgress, [0, 1], ["-15%", "0%"]);
    const rowThreeX = useTransform(smoothProgress, [0, 1], ["0%", "-15%"]);
    const rowTransforms = [rowOneX, rowTwoX, rowThreeX];

    return (
        <section ref={containerRef} className={styles.gallerySection}>
            <div className={styles.header}>
                <span className={styles.eyebrow}>Our Gallery</span>
                <h2 className={styles.title}><span style={{ color: '#000000' }}>A visual journey through our</span> timeless moments</h2>
            </div>

            <div className={styles.galleryWall}>
                {galleryRows.map((row, rowIndex) => (
                    <motion.div
                        key={rowIndex}
                        className={styles.galleryRow}
                        style={{ x: rowTransforms[rowIndex] }}
                    >
                        {row.map((item) => (
                            <Link
                                href="/gallery"
                                key={`${rowIndex}-${item.id}`}
                                className={styles.galleryItem}
                                aria-label={`View ${item.category} gallery`}
                            >
                                <Image
                                    src={item.src}
                                    alt={`${item.category} gallery photo showcasing premium catering, luxury weddings, event management, and memorable celebrations by Pride Kitchen Caterers & Events in Kerala`}
                                    fill
                                    sizes="(max-width: 768px) 180px, 280px"
                                    loading="lazy"
                                    className={styles.image}
                                />
                                <div className={styles.overlay}>
                                    <span>{item.category}</span>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                ))}
            </div>

            <div className={styles.footer}>
                <Link href="/gallery" className="btn btn-outline">View Full Gallery</Link>
            </div>
        </section>
    );
}
