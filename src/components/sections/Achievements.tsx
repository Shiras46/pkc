"use client";

import { motion } from "framer-motion";
import { Award, Star, Trophy } from "lucide-react";
import styles from "./Achievements.module.css";

const items = [
    { icon: <Award aria-hidden="true" />, title: "Excellence in Catering & Hospitality Services", year: "2025", org: "Metro Food Awards" },
    { icon: <Star aria-hidden="true" />, title: "Excellence in Culinary Services", year: "2024", org: "Metro Food Awards" },
    { icon: <Trophy aria-hidden="true" />, title: "Excellence in Catering Services", year: "2023", org: "Metro Food Awards" },
];

export default function Achievements() {
    return (
        <section className={styles.achievements}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>AWARDS & RECOGNITION</h2>
                    <p className={styles.subtitle}>Excellence Recognized by the Industry</p>
                </div>
                <div className={styles.grid}>
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={styles.icon}>{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p className={styles.year}>{item.year}</p>
                            <p className={styles.org}>{item.org}</p>
                        </motion.div>
                    ))}
                </div>
                <div className={styles.quoteWrapper}>
                    <p className={styles.quote}>
                        &ldquo;Our awards reflect the trust of our clients and our dedication to delivering unforgettable experiences.&rdquo;
                    </p>
                </div>
            </div>
        </section>
    );
}
