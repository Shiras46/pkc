"use client";

import { useState, useEffect } from 'react';
import styles from './VideoReviews.module.css';

export default function VideoReviews() {
    const [videos, setVideos] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/videos")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setVideos(data);
                }
            })
            .catch(console.error);
    }, []);

    if (videos.length === 0) return null; // Don't show section if no videos

    const getEmbedUrl = (video: any) => {
        if (!video || !video.videoUrl) return '';
        if (video.platform === 'youtube') {
            let id = '';
            if (video.videoUrl.includes('shorts/')) {
                id = video.videoUrl.split('shorts/')[1].split('?')[0];
            } else if (video.videoUrl.includes('v=')) {
                id = video.videoUrl.split('v=')[1].split('&')[0];
            } else if (video.videoUrl.includes('youtu.be/')) {
                id = video.videoUrl.split('youtu.be/')[1].split('?')[0];
            }
            return id ? `https://www.youtube.com/embed/${id}` : video.videoUrl;
        } else if (video.platform === 'instagram') {
            let url = video.videoUrl.split('?')[0];
            if (!url.endsWith('/')) url += '/';
            return `${url}embed/`;
        }
        return video.videoUrl;
    };

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>OUR HAPPY CLIENT VIDEO REVIEWS</h2>

                    <p className={styles.description}>
                        Pride Kitchen Caterers &amp; Events is a leader in luxury catering and event management, 
                        providing high-end, cost-effective event planning across Kerala. Watch our real-time live 
                        client video reviews recorded directly at event venues to see why we are the most trusted 
                        name for authentic events in the region.
                    </p>
                </div>

                <div className={styles.grid}>
                    {videos.map((video, index) => {
                        const embedUrl = getEmbedUrl(video);
                        if (!embedUrl) return null;
                        return (
                            <div key={video._id} className={styles.videoWrapper}>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={embedUrl}
                                    title={`Pride Kitchen Caterers & Events client video review ${index + 1} showcasing luxury catering, wedding events, and hospitality experiences in Kerala`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className={styles.iframe}
                                ></iframe>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
