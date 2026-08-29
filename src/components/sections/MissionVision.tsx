"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import BrandName from "@/components/ui/BrandName";
import styles from "./MissionVision.module.css";

gsap.registerPlugin(ScrollTrigger);

const missionData = [
    {
        number: "01",
        label: "Our Mission",
        title: "Uncompromising Perfection",
        description: "To redefine event management by blending traditional Kerala values with global luxury standards. We don't just meet expectations; we shatter them with precision and grace.",
        image: "/image/services/catering.webp",
        color: "#FDF5E6" // Cream color from user request and attached image
    },
    {
        number: "02",
        label: "Our Vision",
        title: "The Future of Celebration",
        description: <>To establish <BrandName /> as the undisputed leader in luxury event curation, recognized globally for our creative philosophy and artisanal craftsmanship.</>,
        image: "/image/services/venue.webp",
        color: "#FFFFFF" // White
    },
    {
        number: "03",
        label: "Core Value",
        title: "Artisanal Craftsmanship",
        description: "We treat every event as a masterpiece, meticulously crafting every detail to ensure a unique and unforgettable experience for our clients.",
        image: "/image/services/decoration.webp",
        color: "#FDF5E6" // Cream
    }
];

export default function MissionVision() {
    const galleryRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 992px)", () => {
            const sections = gsap.utils.toArray<HTMLElement>(`.${styles.desktopContentSection}`);
            const photos = gsap.utils.toArray<HTMLElement>(`.${styles.desktopPhoto}`);

            // Set initial state for photos (except the first one)
            gsap.set(photos.slice(1), { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 1 });

            sections.forEach((section, i) => {
                const bgColor = missionData[i].color;

                // Color transition
                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    onToggle: (self) => {
                        if (self.isActive) {
                            gsap.to(galleryRef.current, { backgroundColor: bgColor, duration: 0.8 });
                        }
                    }
                });

                // Image reveal
                if (i > 0) {
                    const headline = section.querySelector(`.${styles.reveal}`);
                    const animation = gsap.timeline()
                        .to(photos[i], { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, duration: 1.5 });

                    ScrollTrigger.create({
                        trigger: headline || section,
                        start: "top 80%",
                        end: "top 20%",
                        animation: animation,
                        scrub: true,
                    });
                }
            });

            // Pinning the right side
            ScrollTrigger.create({
                trigger: galleryRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: `.${styles.right}`,
                pinSpacing: false,
            });
        });

        // Mobile version
        mm.add("(max-width: 991px)", () => {
            const sections = gsap.utils.toArray<HTMLElement>(`.${styles.desktopContentSection}`);

            sections.forEach((section, i) => {
                const bgColor = missionData[i].color;
                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    onToggle: (self) => {
                        if (self.isActive) {
                            gsap.to(galleryRef.current, { backgroundColor: bgColor, duration: 0.5 });
                        }
                    }
                });
            });
        });

        return () => mm.revert();
    }, { scope: galleryRef });

    return (
        <section ref={galleryRef} className={styles.gallery}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.desktopContent}>
                        {missionData.map((item, index) => (
                            <div key={index} className={styles.desktopContentSection}>
                                <div className={styles.reveal}>
                                    <div className={styles.blockHeader}>
                                        <span className={styles.number}>{item.number}</span>
                                        <h3 className={styles.label}>{item.label}</h3>
                                    </div>
                                    <h4 className={styles.subHeading}>
                                        {item.title.split(' ').map((word, i) => (
                                            <span key={i}>
                                                {word === "Perfection" || word === "Celebration" || word === "Craftsmanship" ? (
                                                    <span className={styles.italic}>{word} </span>
                                                ) : (
                                                    <>{word} </>
                                                )}
                                            </span>
                                        ))}
                                    </h4>
                                    <p className={styles.text}>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.desktopPhotos}>
                        {missionData.map((item, index) => (
                            <div key={index} className={styles.desktopPhoto}>
                                <Image
                                    src={item.image}
                                    alt={`${item.label}: ${item.title} – Pride Kitchen Caterers & Events showcasing premium catering, luxury event management, and hospitality excellence in Kerala`}
                                    fill
                                    className={styles.mainImage}
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
