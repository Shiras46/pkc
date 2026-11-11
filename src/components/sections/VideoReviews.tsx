"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
        let active = true;

        const loadVideos = () => {
            fetch("/api/videos")
                .then(res => res.json())
                .then(data => {
                    if (active && Array.isArray(data) && data.length > 0) {
                        setVideos(data);
                    } else if (active) {
                        setVideos([]);
                    }
                })
                .catch(() => {
                    if (active) setVideos([]);
                });
        };

        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            const idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
                loadVideos,
                { timeout: 4000 }
            );
            return () => {
                active = false;
                (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
            };
        } else {
            const timer = setTimeout(loadVideos, 2000);
            return () => {
                active = false;
                clearTimeout(timer);
            };
        }
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

        if (!video || !video.videoUrl) return '';
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

        return '';
    };

    const handlePlayClick = (videoId: string) => {
        setActivePlayingId(activePlayingId === videoId ? null : videoId);
    };

    if (videos.length === 0) return null;

    return (
        <section className={`${styles.section} defer-render`}>
            <div className="container">
                {/* Shorts / Video Cards Grid */}
                <div className={styles.grid}>
                    {videos.slice(0, 4).map((video, index) => {
                        const videoId = video._id || video.id || `v-${index}`;
                        const isPlaying = activePlayingId === videoId;
                        const embedUrl = getEmbedUrl(video);
                        const thumbUrl = getVideoThumbnail(video) || '/image/hero1.webp';
                        const isInstagram = video.videoUrl.includes('instagram.com') || video.videoUrl.includes('instagr.am') || video.platform === 'instagram';
                        const isDirectVideo = Boolean(
                            video.videoUrl && (
                                video.platform === 'custom' ||
                                video.videoUrl.endsWith('.mp4') ||
                                video.videoUrl.endsWith('.webm') ||
                                video.videoUrl.endsWith('.mov') ||
                                video.videoUrl.endsWith('.m4v') ||
                                video.videoUrl.includes('/uploads/videos') ||
                                video.videoUrl.includes('.s3.') ||
                                video.videoUrl.includes('amazonaws.com')
                            ) &&
                            !video.videoUrl.includes('youtube.com') &&
                            !video.videoUrl.includes('youtu.be') &&
                            !video.videoUrl.includes('instagram.com') &&
                            !video.videoUrl.includes('instagr.am')
                        );
                        
                        const displayTitle = video.title || [
                            "Another Happy Couple, Another Beautiful Story",
                            "A Magical Destination",
                            "Emotional Family Reaction",
                            "Destination Wedding Setup"
                        ][index % 4];

                        const cardInner = (
                            <>
                                {/* Top Header Overlay inside Card */}
                                <div className={styles.cardHeaderOverlay}>
                                    <div className={styles.avatarWrapper}>
                                        <Image src="/logo.png" alt="PKC Logo" width={32} height={32} className={styles.avatarImg} />
                                    </div>
                                    <div className={styles.metaText}>
                                        <h3 className={styles.videoTitle}>{displayTitle}</h3>
                                        <p className={styles.brandName}>Pride Kitchen Caterers &amp; Events</p>
                                    </div>
                                </div>

                                {/* Play Icon Overlay in Center */}
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
                                    <span>{isInstagram ? "Instagram ↗" : isDirectVideo ? "Video" : "Shorts"}</span>
                                </div>

                                {/* Gradient backdrop shading */}
                                <div className={styles.gradientShade}></div>
                            </>
                        );

                        // All cards render thumbnail facade initially; direct video / YouTube iframe loads ONLY when user clicks play
                        return (
                            <div key={videoId} className={styles.card}>
                                {isPlaying && !isInstagram ? (
                                    <div className={styles.playerContainer}>
                                        {isDirectVideo ? (
                                            <video
                                                src={video.videoUrl}
                                                controls
                                                autoPlay
                                                playsInline
                                                poster={thumbUrl}
                                                className={styles.videoPlayer}
                                            >
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <iframe
                                                src={embedUrl}
                                                title={displayTitle}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                                className={styles.iframe}
                                            ></iframe>
                                        )}
                                        <button 
                                            className={styles.closeBtn} 
                                            onClick={() => setActivePlayingId(null)}
                                            aria-label="Close Video"
                                            title="Stop Video"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : isInstagram ? (
                                    <a
                                        href={video.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.cardThumbnail}
                                        style={{
                                            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.8) 100%), url('${thumbUrl}')`,
                                            textDecoration: "none"
                                        }}
                                        aria-label={`Watch Reel on Instagram in new tab: ${displayTitle}`}
                                    >
                                        {cardInner}
                                    </a>
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
                                        {cardInner}
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
