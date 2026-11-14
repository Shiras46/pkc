"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import styles from "./AboutPreview.module.css";
import BrandName from "@/components/ui/BrandName";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (typeof window === "undefined") return;
        const isMobile = window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // On mobile and tablets: ensure text and visuals are immediately 100% visible without scroll blocking
        if (isMobile || reduceMotion) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        // 1. Text Reveal on Desktop
        tl.from(".about-content-fade", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out"
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className={styles.section} id="about">
            <div className={styles.container}>
                <div className={styles.grid}>

                    {/* Left: Content Story */}
                    <div className={styles.contentSide}>
                        <div className={styles.decoPattern}></div>

                        <div className={`${styles.label} about-content-fade`}>
                            <span className={styles.labelLine}></span>
                            <span>WHAT WE DO</span>
                        </div>

                        <div className="about-content-fade">
                            <h2 className={styles.heading}>
                                Your Vision, <br />
                                <span style={{ color: '#8C5D00' }}>Our Golden Touch</span>
                            </h2>
                        </div>

                        <div className={`${styles.storyText} about-content-fade`}>
                            <p>
                                Every celebration is a symphony of love reflected as cherished memories. And we make it a
                                seamless experience from concept to execution, providing you with a stress-free special day.
                            </p>
                            <p>
                                Founded in 2008, <BrandName /> is a premium catering and event management
                                company evolved from the cultural capital of Kerala, Thrissur. For nearly two decades, we have
                                been the pioneers in transforming grand visions into timeless experiences.
                            </p>
                        </div>

                        <div className={`${styles.storyHighlight} about-content-fade`}>
                            &ldquo;We don&apos;t just plan, execute and deliver - we craft your moments woven into a lifetime of memories.&rdquo;
                        </div>

                        <div className="about-content-fade">
                            <Link href="/about" className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-black pb-2 hover:text-gold hover:border-gold transition-colors">
                                <span>Read Our Full Story</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Visual */}
                    <div className={styles.visualSide}>
                        <Image
                            src="/image/about.webp"
                            alt="Pride Kitchen Caterers & Events (PKC Events) premium wedding and event management team creating elegant celebrations with luxury catering and hospitality services in Kerala"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className={styles.image}
                            style={{ objectFit: 'cover', objectPosition: 'center 15%', transformOrigin: 'center 15%' }}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
