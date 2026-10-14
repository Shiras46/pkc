import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { Blog as BlogType } from '@/lib/types';
import styles from './BlogPost.module.css';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post: BlogType | null = null;
  try {
    const db = await dbConnect();
    if (!db) throw new Error("No DB connection");
    post = (await Blog.findOne({ slug }).lean()) as unknown as BlogType;
  } catch (error) {
    console.error("Failed to fetch blog post metadata:", error);
  }

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const canonical = `https://pkcevents.com/blog/${slug}`;
  const desc = post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 160) : '';

  return {
    title: `${post.title} | PKC Events Blog`,
    description: desc,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${post.title} | PKC Events Blog`,
      description: desc,
      url: canonical,
      images: [post.image ? (post.image.startsWith('http') ? post.image : `https://pkcevents.com${post.image}`) : 'https://pkcevents.com/logo.png'],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | PKC Events Blog`,
      description: desc,
      images: [post.image ? (post.image.startsWith('http') ? post.image : `https://pkcevents.com${post.image}`) : 'https://pkcevents.com/logo.png'],
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post: BlogType | null = null;
  try {
    const db = await dbConnect();
    if (!db) throw new Error("No DB connection");
    post = (await Blog.findOne({ slug }).lean()) as unknown as BlogType;
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
  }

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'PKC Admin',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pride Kitchen Caterers & Events (PKC Events)',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pkcevents.com/logo.png',
      },
    },
    description: post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 160) : '',
  };

  return (
    <main className={styles.wrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={styles.container}>
        <div className={styles.backLink}>
          <Link href="/blog">
            <ArrowLeft size={16} />
            <span>Back to Blog</span>
          </Link>
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <User size={14} />
              <span>{post.author || 'PKC Admin'}</span>
            </div>
            <div className={styles.metaItem}>
              <Calendar size={14} />
              <span>{post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }) : '6/23/2026'}</span>
            </div>
            <div className={styles.metaItem}>
              <Tag size={14} />
              <span>{post.category || 'Wedding Planning Tips'}</span>
            </div>
          </div>
        </header>

        <div className={styles.imageWrapper}>
          <Image
            src={post.image || '/image/about.webp'}
            alt={post.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className={styles.content}>
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p>hai</p>
          )}
        </div>

        <div className={styles.ctaCard}>
          <h2>Planning your own big day?</h2>
          <p>Let PRIDE KITCHEN CATERERS &amp; EVENTS handle the details while you enjoy the magic.</p>
          <Link href="/contact" className="btn btn-primary" style={{ marginTop: '10px' }}>
            GET A FREE CONSULTATION
          </Link>
        </div>
      </article>
    </main>
  );
}
