import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import styles from './Blog.module.css';

export const metadata: Metadata = {
  title: 'PKC Events Blog | Wedding Planning & Event Insights Kerala',
  description: 'Read the latest articles from PKC Events. Get expert tips, luxury wedding decor trends, menu curation guides, and event planning inspiration in Kerala.',
  alternates: {
    canonical: 'https://pkcevents.com/blog'
  },
  openGraph: {
    title: 'PKC Events Blog | Wedding Planning & Event Insights Kerala',
    description: 'Read the latest articles from PKC Events. Get expert tips, luxury wedding decor trends, menu curation guides, and event planning inspiration in Kerala.',
    url: 'https://pkcevents.com/blog',
    images: [{ url: 'https://pkcevents.com/logo.png', width: 800, height: 600, alt: 'PKC Events Blog' }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PKC Events Blog | Wedding Planning & Event Insights Kerala',
    description: 'Read the latest articles from PKC Events. Get expert tips, luxury wedding decor trends, menu curation guides, and event planning inspiration in Kerala.',
    images: ['https://pkcevents.com/logo.png']
  }
};

export const dynamic = 'force-dynamic';

export default async function BlogListingPage() {
  let rawBlogs: any[] = [];
  try {
    await dbConnect();
    rawBlogs = await Blog.find({ published: true }).sort({ date: -1 }).lean() as any[];
  } catch (error) {
    console.error("Failed to connect to database or fetch blogs, falling back to static data:", error);
  }

  if (!rawBlogs || rawBlogs.length === 0) {
    const { blogsData } = await import('@/lib/data');
    rawBlogs = blogsData.filter(b => b.published);
  }

  const posts = rawBlogs.map(blog => ({
    id: blog._id ? blog._id.toString() : (blog.id || blog.slug),
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '',
    date: blog.date,
    image: blog.image || '/image/about.webp',
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
                      <Image src={post.image} alt="icon" fill sizes="40px" style={{ objectFit: 'cover' }} />
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
