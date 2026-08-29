
"use client";

import { ReactNode } from "react";

const VideoPreview = ({ children }: { children: ReactNode }) => {
    return (
        <section className="absolute top-0 right-0 z-50 overflow-hidden">
            {children}
        </section>
    );
};

export default VideoPreview;
