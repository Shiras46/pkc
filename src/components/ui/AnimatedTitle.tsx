
"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AnimatedTitle.module.css';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
    title: string;
    containerClass?: string;
    align?: 'left' | 'center' | 'right';
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ title, containerClass = '', align = 'center' }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: '100 bottom',
                    end: 'center bottom',
                    toggleActions: 'play none none reverse',
                }
            });

            titleAnimation.to(`.${styles.word}`, {
                opacity: 1,
                transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
                ease: 'power2.inOut',
                stagger: 0.02,
                duration: 1 // Slower, more cinematic
            });
        }, containerRef);

        return () => ctx.revert();
    }, { scope: containerRef });

    // Determine alignment class
    let alignClass = styles.alignCenter;
    if (align === 'left') alignClass = styles.alignLeft;
    if (align === 'right') alignClass = styles.alignRight;

    return (
        <div
            ref={containerRef}
            className={`${styles.titleWrapper} ${alignClass} ${containerClass}`}
        >
            {title.split("<br />").map((line, index) => (
                <div key={index} className={styles.line}>
                    {line.split(" ").map((word, i) => (
                        <span
                            key={i}
                            className={styles.word}
                            style={{
                                transform: 'translate3d(10px, 50px, -50px) rotateY(60deg) rotateX(-45deg)', // Default start state for animation
                                opacity: 0
                            }}
                            dangerouslySetInnerHTML={{ __html: word }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AnimatedTitle;
