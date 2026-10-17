import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { Blog as BlogType } from '@/lib/types';
import { getValidImageUrl } from '@/lib/image';
import BlogPostClient from './BlogPostClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
  const desc = post.metaDescription || (post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 160) : '');
  const title = post.metaTitle || `${post.title} | PKC Events Blog`;
  const validImageUrl = getValidImageUrl(post.image);
  const fullImageUrl = validImageUrl.startsWith('http') ? validImageUrl : `https://pkcevents.com${validImageUrl}`;

  return {
    title,
    description: desc,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      images: [fullImageUrl],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [fullImageUrl],
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post: BlogType | null = null;
  let relatedPosts: BlogType[] = [];

  try {
    const db = await dbConnect();
    if (!db) throw new Error("No DB connection");

    post = (await Blog.findOne({ slug }).lean()) as unknown as BlogType;

    if (post) {
      // Fetch 3 related posts (excluding current post)
      relatedPosts = (await Blog.find({ slug: { $ne: slug }, published: true })
        .sort({ date: -1, createdAt: -1, _id: -1 })
        .limit(3)
        .lean()) as unknown as BlogType[];
    }
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
  }

  if (!post) {
    notFound();
  }

  // Ensure plain JSON-serializable objects for client component
  const serializablePost: BlogType = {
    id: post._id ? post._id.toString() : (post.id || post.slug),
    _id: post._id ? post._id.toString() : (post.id || post.slug),
    title: post.title,
    slug: post.slug,
    category: post.category,
    content: post.content,
    image: post.image,
    author: post.author,
    date: post.date,
    published: post.published,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    showCta: post.showCta !== false,
    ctaEyebrow: post.ctaEyebrow ?? 'START PLANNING YOUR CELEBRATION',
    ctaTitle: post.ctaTitle ?? 'Ready to make your dream event a reality?',
    ctaDescription: post.ctaDescription ?? 'Whether it is an intimate engagement, a grand royal wedding, or an elegant corporate event, our master chefs and planners handle every detail seamlessly.',
    ctaButtonText: post.ctaButtonText ?? 'Request Free Consultation',
    ctaButtonLink: post.ctaButtonLink ?? '/contact',
    ctaSecondaryText: post.ctaSecondaryText ?? 'Chat on WhatsApp',
    ctaSecondaryLink: post.ctaSecondaryLink ?? 'https://api.whatsapp.com/send?phone=918138002333&text=Hi%20PKC%20Events,%20I%20would%20like%20to%20inquire%20about%20event%20management%20and%20catering.',
    ctaPhone: post.ctaPhone ?? '+91 81380 02333',
    ctaEmail: post.ctaEmail ?? 'pridekitchencaterers@gmail.com',
  };

  const serializableRelated: BlogType[] = (relatedPosts || []).map((r: any) => ({
    id: r._id ? r._id.toString() : (r.id || r.slug),
    _id: r._id ? r._id.toString() : (r.id || r.slug),
    title: r.title,
    slug: r.slug,
    category: r.category,
    content: r.content,
    image: r.image,
    author: r.author,
    date: r.date,
    published: r.published,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: getValidImageUrl(post.image),
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={serializablePost} relatedPosts={serializableRelated} />
    </>
  );
}
