"use client";

import { ReactNode, useSyncExternalStore } from "react";
import { ReactLenis } from "lenis/react";

function subscribe(callback: () => void) {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
    if (typeof window === "undefined") return false;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return isTouch || reduceMotion;
}

function getServerSnapshot() {
    return false;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const isTouchOrReduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    if (isTouchOrReduced) {
        return <>{children}</>;
    }

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
            {children}
        </ReactLenis>
    );
}
