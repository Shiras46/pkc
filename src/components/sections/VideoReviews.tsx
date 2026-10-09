"use client";

import { useState, useEffect } from 'react';
import styles from './VideoReviews.module.css';

interface VideoItem {
    _id?: string;
    id?: string;
    title?: string;
    videoUrl: string;
    thumbnailUrl?: string;
    platform?: 'youtube' | 'instagram' | 'custom';
    isActive?: boolean;
}


export default function VideoReviews() {
    const [videos, setVideos] = useState<VideoItem[]>([]);
    const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/videos")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setVideos(data);
                } else {
                    setVideos([]);
                }
            })
            .catch(() => {
                setVideos([]);
            });
    }, []);

    const getEmbedUrl = (video: VideoItem) => {
        if (!video || !video.videoUrl) return '';
        const rawUrl = video.videoUrl.trim();

        if (rawUrl.includes('instagram.com') || rawUrl.includes('instagr.am')) {
            let cleanUrl = rawUrl.split('?')[0];
            if (!cleanUrl.endsWith('/')) cleanUrl += '/';
            return `${cleanUrl}embed/`;
        }

        if (rawUrl.includes('youtube.com') || rawUrl.includes('youtu.be')) {
            let id = '';
            if (rawUrl.includes('shorts/')) {
                id = rawUrl.split('shorts/')[1].split('?')[0];
            } else if (rawUrl.includes('v=')) {
                id = rawUrl.split('v=')[1].split('&')[0];
            } else if (rawUrl.includes('youtu.be/')) {
                id = rawUrl.split('youtu.be/')[1].split('?')[0];
            }
            return id ? `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&rel=0` : rawUrl;
        }

        return rawUrl;
    };

    const getVideoThumbnail = (video: VideoItem) => {
        // Priority 1: Exact custom uploaded thumbnail (WebP/JPG/PNG)
        if (video.thumbnailUrl && video.thumbnailUrl.trim()) {
            return video.thumbnailUrl.trim();
        }

        if (!video || !video.videoUrl) return '/image/services/Beach & Backwater Weddings.webp';
        const rawUrl = video.videoUrl.trim();

        // Priority 2: YouTube real video thumbnail
        if (rawUrl.includes('youtube.com') || rawUrl.includes('youtu.be')) {
            let id = '';
            if (rawUrl.includes('shorts/')) {
                id = rawUrl.split('shorts/')[1].split('?')[0];
            } else if (rawUrl.includes('v=')) {
                id = rawUrl.split('v=')[1].split('&')[0];
            } else if (rawUrl.includes('youtu.be/')) {
                id = rawUrl.split('youtu.be/')[1].split('?')[0];
            }
            if (id && id !== 'dQw4w9WgXcQ') {
                return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            }
        }

        // Priority 3: Instagram / Custom videos fallback cover (ensures video cards never appear pitch black)
        return '/image/services/Beach & Backwater Weddings.webp';
    };

    const handlePlayClick = (videoId: string) => {
        setActivePlayingId(activePlayingId === videoId ? null : videoId);
    };

    if (videos.length === 0) return null;

    return (
        <section className={styles.section}>
            <div className="container">


                {/* Shorts / Video Cards Grid */}
                <div className={styles.grid}>
                    {videos.slice(0, 4).map((video, index) => {
                        const videoId = video._id || video.id || `v-${index}`;
                        const isPlaying = activePlayingId === videoId;
                        const embedUrl = getEmbedUrl(video);
                        const thumbUrl = getVideoThumbnail(video);
                        const isInstagram = video.videoUrl.includes('instagram.com') || video.platform === 'instagram';
                        
                        const displayTitle = video.title || [
                            "Another Happy Couple, Another Beautiful Story",
                            "A Magical Destination",
                            "Emotional Family Reaction",
                            "Destination Wedding Setup"
                        ][index % 4];

                        return (
                            <div key={videoId} className={styles.card}>
                                {isPlaying ? (
                                    <div className={`${styles.playerContainer} ${isInstagram ? styles.instaContainer : ''}`}>
                                        <iframe
                                            src={embedUrl}
                                            title={displayTitle}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className={`${styles.iframe} ${isInstagram ? styles.instaIframe : ''}`}
                                        ></iframe>
                                        <button 
                                            className={styles.closeBtn} 
                                            onClick={() => setActivePlayingId(null)}
                                            aria-label="Close Video"
                                            title="Stop Video"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <div 
                                        className={styles.cardThumbnail} 
                                        style={{
                                            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%), url('${thumbUrl}')`
                                        }}
                                        onClick={() => handlePlayClick(videoId)}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Play video inline: ${displayTitle}`}
                                    >
                                        {/* Top Header Overlay inside Card */}
                                        <div className={styles.cardHeaderOverlay}>
                                            <div className={styles.avatarWrapper}>
                                                <img src="/logo.png" alt="PKC Logo" className={styles.avatarImg} />
                                            </div>
                                            <div className={styles.metaText}>
                                                <h3 className={styles.videoTitle}>{displayTitle}</h3>
                                                <p className={styles.brandName}>Pride Kitchen Caterers &amp; Events</p>
                                            </div>
                                        </div>

                                        {/* Red Shorts Play Icon Overlay in Center */}
                                        <div className={styles.playButtonOverlay}>
                                            <div className={styles.redPlayIcon}>
                                                {isInstagram ? (
                                                    <svg width="52" height="52" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="48" height="48" rx="14" fill="url(#instaGrad)" />
                                                        <path d="M19 15.5L31 23.5L19 31.5V15.5Z" fill="white" />
                                                        <defs>
                                                            <linearGradient id="instaGrad" x1="0" y1="48" x2="48" y2="0" gradientUnits="userSpaceOnUse">
                                                                <stop stopColor="#FEE440"/>
                                                                <stop offset="0.3" stopColor="#F72585"/>
                                                                <stop offset="0.7" stopColor="#7209B7"/>
                                                                <stop offset="1" stopColor="#3A0CA3"/>
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                ) : (
                                                    <svg width="52" height="52" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path 
                                                            d="M39.6 14.2C38.3 9.4 34.2 5.8 29.3 5.3C23.6 4.7 17.8 4.7 12.1 5.4C7.3 6 3.4 9.8 2.2 14.6C1 19.4 1 24.5 2.2 29.4C3.4 34.2 7.3 38 12.1 38.6C17.8 39.3 23.6 39.3 29.3 38.7C34.2 38.2 38.3 34.4 39.6 29.6C40.8 24.7 40.8 19.1 39.6 14.2Z" 
                                                            fill="#FF0033" 
                                                        />
                                                        <path d="M19 15.5L31 23.5L19 31.5V15.5Z" fill="white" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>

                                        {/* Bottom Label */}
                                        <div className={styles.bottomLabel}>
                                            <span>{isInstagram ? "Reels" : "Shorts"}</span>
                                        </div>

                                        {/* Gradient backdrop shading */}
                                        <div className={styles.gradientShade}></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
