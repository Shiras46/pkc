"use client";

import { ReactNode, useEffect } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (typeof window === "undefined") return;
        const isTouch = window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (isTouch || reduceMotion) return;

        let lenisInstance: { raf: (time: number) => void; destroy: () => void } | null = null;
        let rafId: number;

        import("lenis").then(({ default: Lenis }) => {
            lenisInstance = new Lenis({
                lerp: 0.1,
                duration: 1.2,
                smoothWheel: true,
            });

            function raf(time: number) {
                if (lenisInstance) {
                    lenisInstance.raf(time);
                    rafId = requestAnimationFrame(raf);
                }
            }
            rafId = requestAnimationFrame(raf);
        }).catch(() => {});

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            if (lenisInstance) lenisInstance.destroy();
        };
    }, []);

    return <>{children}</>;
}
