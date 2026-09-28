"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Users, Eye, TrendingUp } from "lucide-react";
import styles from "./Dashboard.module.css";
import { Blog } from "@/lib/types";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalBlogs: 0,
        publishedBlogs: 0,
        views: 1250, // Mock data
        enquiries: 45 // Mock data
    });

    useEffect(() => {
        // Fetch Blogs
        fetch("/api/admin/blogs")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setStats(prev => ({
                        ...prev,
                        totalBlogs: data.length,
                        publishedBlogs: data.filter((b: Blog) => b.published).length
                    }));
                }
            })
            .catch(() => { });

        // Fetch Enquiries
        fetch("/api/admin/enquiries")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setStats(prev => ({
                        ...prev,
                        enquiries: data.length
                    }));
                }
            })
            .catch(() => { });
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Dashboard Overview</h1>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <div className={styles.iconBox} style={{ background: '#E3F2FD', color: '#1976D2' }}>
                        <FileText size={24} />
                    </div>
                    <div>
                        <h3>{stats.totalBlogs}</h3>
                        <p>Total Blog Posts</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.iconBox} style={{ background: '#E8F5E9', color: '#388E3C' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <h3>{stats.publishedBlogs}</h3>
                        <p>Published Articles</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.iconBox} style={{ background: '#FFF3E0', color: '#F57C00' }}>
                        <Eye size={24} />
                    </div>
                    <div>
                        <h3>{stats.views}</h3>
                        <p>Total Page Views</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.iconBox} style={{ background: '#F3E5F5', color: '#7B1FA2' }}>
                        <Users size={24} />
                    </div>
                    <div>
                        <h3>{stats.enquiries}</h3>
                        <p>Total Enquiries</p>
                    </div>
                </div>
            </div>

            <div className={styles.recentActivity}>
                <h2>Actions</h2>
                <div className={styles.actionGrid}>
                    <Link href="/admin/blog/new" className={styles.actionBtn}>Create New Post</Link>
                    <Link href="/admin/gallery" className={styles.actionBtn}>Manage Gallery</Link>
                    <Link href="/admin/enquiries" className={styles.actionBtn}>Manage Enquiries</Link>
                </div>
            </div>
        </div>
    );
}
