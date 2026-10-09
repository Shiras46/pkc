import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { blogsData } from '@/lib/data';

export async function GET() {
    const baseUrl = 'https://pkcevents.com';
    const staticPaths = [
        '',
        '/about',
        '/services',
        '/services/cars',
        '/services/catering',
        '/services/decoration',
        '/services/entertainment',
        '/services/makeup',
        '/services/photography',
        '/services/venue',
        '/services/corporate-event',
        '/services/destination-wedding',
        '/gallery',
        '/locations',
        '/locations/kochi',
        '/locations/thrissur',
        '/blog',
        '/contact',
        '/legal/privacy',
        '/legal/terms',
        '/sitemap'
    ];

    // Fetch dynamic blogs
    let dbBlogs: any[] = [];
    try {
        await dbConnect();
        dbBlogs = await Blog.find({ published: true }).select('slug date').lean();
    } catch (e) {
        console.error('Error connecting to database for sitemap:', e);
    }

    const blogSlugs = new Set<string>();
    const blogPaths: { loc: string; lastmod: string }[] = [];

    // Add DB blogs
    dbBlogs.forEach((blog: any) => {
        if (blog.slug) {
            blogSlugs.add(blog.slug);
            blogPaths.push({
                loc: `/blog/${blog.slug}`,
                lastmod: blog.date ? new Date(blog.date).toISOString() : new Date().toISOString()
            });
        }
    });

    // Fallback/add static blogs if not in DB
    blogsData.forEach((blog) => {
        if (blog.published && blog.slug && !blogSlugs.has(blog.slug)) {
            blogPaths.push({
                loc: `/blog/${blog.slug}`,
                lastmod: blog.date ? new Date(blog.date).toISOString() : new Date().toISOString()
            });
        }
    });

    const urls = [
        ...staticPaths.map(path => {
            let priority = '0.7';
            let changefreq = 'monthly';
            if (path === '') {
                priority = '1.0';
                changefreq = 'weekly';
            } else if (path === '/services' || path === '/about' || path === '/contact') {
                priority = '0.9';
                changefreq = 'monthly';
            } else if (path.startsWith('/services/')) {
                priority = '0.8';
                changefreq = 'monthly';
            } else if (path === '/blog') {
                priority = '0.8';
                changefreq = 'weekly';
            }

            return `    <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
        }),
        ...blogPaths.map(blog => `    <url>
        <loc>${baseUrl}${blog.loc}</loc>
        <lastmod>${blog.lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
    </url>`)
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'text/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400'
        },
    });
}
