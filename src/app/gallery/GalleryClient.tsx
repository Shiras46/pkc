"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryCategories, galleryItems } from "@/lib/gallery";
import styles from "./Gallery.module.css";

export default function GalleryClient() {
    const [activeTab, setActiveTab] = useState("All");

    const filteredItems = activeTab === "All"
        ? galleryItems
        : galleryItems.filter(item => item.category === activeTab);

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className="container">
                    <h1 className="heading-xl text-center" style={{ color: '#fcb318' }}><span style={{ color: '#000000' }}>Our</span> Gallery</h1>
                    <p className={styles.subtitle}>A Visual Journey Through Our Most Memorable Events</p>
                </div>
            </header>

            <section className="section-padding">
                <div className="container">
                    <div className={styles.tabs}>
                        {galleryCategories.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.tab} ${activeTab === cat ? styles.activeTab : ""}`}
                                onClick={() => setActiveTab(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className={styles.masonry}>
                        {filteredItems.map(item => (
                            <div key={item.id} className={styles.item}>
                                <Image src={item.src} alt={`${item.category} setup managed by Pride Kitchen Caterers & Events in Kerala`} width={600} height={400} className={styles.image} />
                                <div className={styles.overlay}>
                                    <span>{item.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
