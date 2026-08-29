"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { Blog } from "@/lib/types";
import { blogsData } from "@/lib/data";
import styles from "./BlogPreview.module.css";

export default function BlogPreview() {
    const [blogs, setBlogs] = useState<Blog[]>(blogsData as Blog[]);

    useEffect(() => {
        fetch("/api/admin/blogs")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setBlogs(data.filter((b: Blog) => b.published).slice(0, 3));
                }
            })
            .catch(() => { });
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <span style={{ color: '#000', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>Our Blog</span>
                        <h2 className="heading-lg" style={{ color: '#fcb318', marginTop: '10px' }}><span style={{ color: '#000000' }}>“Our thoughts and experiences</span> handcrafted into words”</h2>
                    </div>
                    <Link href="/blog" className="btn btn-outline">
                        Read Our Blog
                    </Link>
                </div>

                <div className={styles.grid}>
                    {blogs.map((blog) => (
                        <Link
                            key={blog.id}
                            href={`/blog/${blog.slug}`}
                            className={styles.card}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={blog.image || '/image/about.webp'}
                                    alt={`${blog.title} - ${blog.category || "Wedding Planning"} article by Pride Kitchen Caterers & Events (PKC Events) featuring premium wedding planning, luxury catering, and event management insights in Kerala`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.meta}>
                                    <div style={{ position: 'relative', width: '18px', height: '18px', borderRadius: '4px', overflow: 'hidden' }}>
                                        <Image src={blog.image || '/image/about.webp'} alt={`${blog.category || "Wedding Planning"} category thumbnail for ${blog.title}`} fill sizes="18px" style={{ objectFit: 'cover' }} />
                                    </div>
                                    <span>{blog.category ? blog.category.toUpperCase() : 'WEDDING PLANNING TIPS'}</span>
                                    <span className={styles.metaDot}>•</span>
                                    <span>{blog.date ? new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Jun 23'}</span>
                                </div>
                                <h3 className={styles.title}>{blog.title}</h3>
                                <p className={styles.description}>
                                    {blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : ''}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
