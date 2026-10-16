import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { Blog as BlogType } from '@/lib/types';
import { getValidImageUrl } from '@/lib/image';
import styles from './Blog.module.css';

export const metadata: Metadata = {
  title: 'Wedding & Event Planning Blog | PKC Events Kerala',
  description: 'Discover wedding planning tips, catering ideas, event trends and celebration inspiration from Pride Kitchen Caterers & Events in Kerala.',
  alternates: {
    canonical: 'https://pkcevents.com/blog'
  },
  openGraph: {
    title: 'Wedding & Event Planning Blog | PKC Events Kerala',
    description: 'Discover wedding planning tips, catering ideas, event trends and celebration inspiration from Pride Kitchen Caterers & Events in Kerala.',
    url: 'https://pkcevents.com/blog',
    images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'PKC Events Blog' }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding & Event Planning Blog | PKC Events Kerala',
    description: 'Discover wedding planning tips, catering ideas, event trends and celebration inspiration from Pride Kitchen Caterers & Events in Kerala.',
    images: ['https://pkcevents.com/logo.png']
  }
};

export const dynamic = 'force-dynamic';

export default async function BlogListingPage() {
  let rawBlogs: BlogType[] = [];
  try {
    const db = await dbConnect();
    if (!db) throw new Error("No DB connection");
    rawBlogs = (await Blog.find({ published: true }).sort({ date: -1 }).lean()) as unknown as BlogType[];
  } catch (error) {
    console.error("Failed to connect to database or fetch blogs:", error);
  }

  const posts = (rawBlogs || []).map(blog => ({
    id: blog._id ? blog._id.toString() : (blog.id || blog.slug),
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '',
    date: blog.date,
    image: getValidImageUrl(blog.image),
    category: blog.category || 'Event Planning'
  }));

  return (
    <main className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className="heading-lg text-center" style={{ fontFamily: 'var(--font-heading)', color: '#fcb318' }}><span style={{ color: '#000000' }}>PKC Events</span> Blog</h1>
          <p className={`${styles.subtitle} text-center`}>Read the latest trends, tips, and ideas for event management.</p>
        </div>
      </div>

      <section className={styles.listingSection}>
        <div className={styles.container}>
          {posts.length === 0 ? (
            <div className="text-center" style={{ padding: '40px 0', color: '#666' }}>No blogs published yet.</div>
          ) : (
            <div className={styles.grid}>
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.meta}>
                    <div className={styles.sourceLogo}>
                      <Image src={post.image} alt={`${post.category} thumbnail`} fill sizes="40px" style={{ objectFit: 'cover' }} />
                    </div>
                    <span className={styles.category}>{post.category}</span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.date}>
                      {post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                    </span>
                  </div>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.description}>{post.excerpt}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
