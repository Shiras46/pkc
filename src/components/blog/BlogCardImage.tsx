"use client";

import { useState } from "react";
import Image from "next/image";

interface BlogCardImageProps {
    src: string;
    alt: string;
}

export default function BlogCardImage({ src, alt }: BlogCardImageProps) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            onError={() => {
                if (imgSrc !== '/image/services/wedding-catering.webp') {
                    setImgSrc('/image/services/wedding-catering.webp');
                } else {
                    setImgSrc('/image/about.webp');
                }
            }}
        />
    );
}
