"use client";

import { Utensils, Home, Paintbrush, Camera, Sparkles, Music, Car } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ServicesOverview.module.css";
import { servicesData } from "@/lib/data";
import BrandName from "@/components/ui/BrandName";

const iconMap: Record<string, React.ReactNode> = {
    catering: <Utensils size={24} />,
    venue: <Home size={24} />,
    decoration: <Paintbrush size={24} />,
    photography: <Camera size={24} />,
    makeup: <Sparkles size={24} />,
    entertainment: <Music size={24} />,
    cars: <Car size={24} />,
};

const services = servicesData.map(s => ({
    ...s,
    icon: iconMap[s.id]
}));

export default function ServicesOverview() {
    return (
        <section id="services" className={`section-padding ${styles.section}`}>
            <div className={styles.container}>
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="text-gold font-semibold tracking-widest uppercase text-sm">Explore Our Services</span>
                    <h2 className="heading-lg mt-2">What We Offer</h2>
                    <p className="text-muted mt-6 text-lg">
                        At <BrandName />, we transform your plans, ideas, and vision into a
                        full-fledged reality with a touch of professional perfectionism. From private events to large-scale
                        festivals, our expert team handles every nuance of your events with precise execution and care.
                    </p>
                </div>

                <div className={styles.cardsContainer}>
                    {services.map((service, index) => (
                        <div
                            key={service.name}
                            className={styles.card}
                            style={{
                                top: `calc(100px + ${index * 30}px)`
                            }}
                        >
                            <div className={styles.imageSection}>
                                <Image
                                    src={service.image}
                                    alt={service.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className={styles.contentSection}>
                                <div className={styles.header}>
                                    <div className={styles.icon}>{service.icon}</div>
                                    <h3 className={styles.title}>{service.name}</h3>
                                </div>
                                <p className={styles.description}>{service.desc}</p>
                                <Link href={service.href} className={styles.link}>
                                    Explore Service →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
