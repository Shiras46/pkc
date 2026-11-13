"use client";

import { motion } from "framer-motion";
import { Utensils, Home, Paintbrush, Camera, Sparkles, Music, Car, Briefcase, Plane, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ServiceCards.module.css";
import { servicesData } from "@/lib/data";

const iconConfig: Record<string, { icon: React.ReactNode }> = {
    catering: { icon: <Utensils size={20} color="#fcb318" aria-hidden="true" /> },
    venue: { icon: <Home size={20} color="#fcb318" aria-hidden="true" /> },
    decoration: { icon: <Paintbrush size={20} color="#fcb318" aria-hidden="true" /> },
    photography: { icon: <Camera size={20} color="#fcb318" aria-hidden="true" /> },
    makeup: { icon: <Sparkles size={20} color="#fcb318" aria-hidden="true" /> },
    entertainment: { icon: <Music size={20} color="#fcb318" aria-hidden="true" /> },
    cars: { icon: <Car size={20} color="#fcb318" aria-hidden="true" /> },
    "corporate-event": { icon: <Briefcase size={20} color="#fcb318" aria-hidden="true" /> },
    "destination-wedding": { icon: <Plane size={20} color="#fcb318" aria-hidden="true" /> }
};

export default function ServiceCards() {
    return (
        <section className={styles.section} id="services">
            <div className={`container ${styles.container}`}>
                
                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.eyebrow}>WHAT WE OFFER</span>
                    <h2 className={styles.title}>
                        Explore Our <span style={{ color: '#A66F00' }}>Services</span>
                    </h2>
                    <p className={styles.description}>
                        At Pride Kitchen Caterers & Events, we transform your plans, ideas, and vision into a full-fledged reality with a touch of professional perfectionism. From private events to large-scale festivals, our expert team handles every nuance of your events with precise execution and care. You experience every little joy of your precious moments, while we manage the details.
                    </p>
                </div>

                {/* Grid */}
                <div className={styles.grid}>
                    {servicesData.map((service, index) => {
                        const config = iconConfig[service.id] || iconConfig.catering;

                        return (
                            <motion.div 
                                key={service.id} 
                                className={styles.card}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                            >
                                {/* Top Half (Image) */}
                                <div className={styles.cardTop}>
                                    <Image
                                        src={service.image}
                                        alt={`${service.name} service by Pride Kitchen Caterers & Events showcasing premium event management, luxury catering, and hospitality services in Kerala`}
                                        fill
                                        quality={60}
                                        loading="lazy"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className={styles.cardImage}
                                    />
                                    <div className={styles.imageOverlay}></div>
                                </div>

                                {/* Bottom Half (Content) */}
                                <div className={styles.cardBottom}>
                                    <div className={styles.titleRow}>
                                        <h3 className={styles.cardTitle}>{service.name}</h3>
                                        <div className={styles.cardIcon}>{config.icon}</div>
                                    </div>
                                    <p className={styles.cardDesc}>{service.desc}</p>
                                    <div className={styles.cardAction}>
                                        <Link href={service.href} className={styles.exploreBtn} aria-label={`Explore details for ${service.name}`}>
                                            Explore Details <ChevronRight size={14} style={{ marginLeft: '4px' }} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
