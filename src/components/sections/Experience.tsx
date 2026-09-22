"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Clock, Trophy, ShieldCheck, HeartHandshake } from "lucide-react";
import styles from "./Experience.module.css";

const experienceItems = [
    {
        icon: <Clock aria-hidden="true" />,
        title: "18+",
        description: "Years of Excellence"
    },
    {
        icon: <Trophy aria-hidden="true" />,
        title: "2.5k+",
        description: "Events Successfully Managed"
    },
    {
        icon: <HeartHandshake aria-hidden="true" />,
        title: "2.5k+",
        description: "Happy Clients"
    },
    {
        icon: <ShieldCheck aria-hidden="true" />,
        title: "4.9★",
        description: "Customer Rating"
    }
];

function Counter({ value, duration = 1500 }: { value: string; duration?: number }) {
    // Extract the number and suffix (e.g. "18+", "2.5k+", "4.9★")
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    const targetNumber = match ? parseFloat(match[1]) : 0;
    const suffix = match ? match[2] : "";
    const decimalPlaces = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

    const [count, setCount] = useState<string | number>(() => {
        if (!match) return value;
        return decimalPlaces > 0 ? targetNumber.toFixed(decimalPlaces) : targetNumber;
    });
    const elementRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry && entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    setCount(decimalPlaces > 0 ? (0).toFixed(decimalPlaces) : 0);
                    let startTime: number | null = null;

                    const animate = (timestamp: number) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);

                        // easeOutExpo for premium feeling
                        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                        const currentVal = easeProgress * targetNumber;

                        if (progress < 1) {
                            if (decimalPlaces > 0) {
                                setCount(currentVal.toFixed(decimalPlaces));
                            } else {
                                setCount(Math.floor(currentVal));
                            }
                            requestAnimationFrame(animate);
                        } else {
                            setCount(decimalPlaces > 0 ? targetNumber.toFixed(decimalPlaces) : targetNumber);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [targetNumber, duration, decimalPlaces]);

    return (
        <span ref={elementRef} className={styles.counterWrapper}>
            <span className={styles.counterNumber}>{count}</span>
            {suffix && <span className={styles.counterSuffix}>{suffix}</span>}
        </span>
    );
}

export default function Experience() {
    return (
        <section className={styles.experience}>
            <div className="container">
                <div className={styles.header}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={styles.title}>EXPERIENCE & <span style={{ color: '#fcb318' }}>ACHIEVEMENTS</span></h2>
                        <p className={styles.subtitle}>A Legacy of Excellence Since 2008</p>
                    </motion.div>
                </div>

                <div className={styles.grid}>
                    {experienceItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={styles.iconWrapper}>{item.icon}</div>
                            <h3 className={styles.cardTitle}>
                                <Counter value={item.title} />
                            </h3>
                            <p className={styles.cardDesc}>{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
