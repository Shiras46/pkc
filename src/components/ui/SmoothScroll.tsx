"use client";

import { ReactNode, useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const isTouch = window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (isTouch || reduceMotion) {
            setIsTouchDevice(true);
        }
    }, []);

    if (isTouchDevice) {
        return <>{children}</>;
    }

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
            {children}
        </ReactLenis>
    );
}
