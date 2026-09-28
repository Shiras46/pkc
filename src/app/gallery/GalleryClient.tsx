"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { galleryCategories, galleryItems as staticGalleryItems, GalleryItem } from "@/lib/gallery";
import styles from "./Gallery.module.css";

export default function GalleryClient() {
    const [activeTab, setActiveTab] = useState("All");
    const [items, setItems] = useState<GalleryItem[]>(staticGalleryItems);

    useEffect(() => {
        async function loadGallery() {
            try {
                const res = await fetch("/api/gallery");
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        setItems(data);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch gallery:", err);
            }
        }
        loadGallery();
    }, []);

    // Dynamic list of categories combined with standard options
    const availableCategories = Array.from(
        new Set(["All", ...galleryCategories.filter(c => c !== "All"), ...items.map(i => i.category)])
    );

    const filteredItems = activeTab === "All"
        ? items
        : items.filter(item => item.category === activeTab);

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
                        {availableCategories.map(cat => (
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
                        {filteredItems.map((item, index) => (
                            <div key={item.id || item._id || index} className={styles.item}>
                                <Image
                                    src={item.src}
                                    alt={item.alt || `${item.category} setup managed by Pride Kitchen Caterers & Events in Kerala`}
                                    width={600}
                                    height={400}
                                    className={styles.image}
                                    unoptimized={item.src.startsWith('/uploads/') || item.src.includes('s3.amazonaws.com')}
                                />
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
