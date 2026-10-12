import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { blogsData } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = await dbConnect();
        if (db) {
            const blogs = await Blog.find({ published: true }).sort({ date: -1 }).limit(10).lean();
            if (blogs && blogs.length > 0) {
                return NextResponse.json(blogs);
            }
        }
    } catch (e) {
        console.warn('Failed to fetch public blogs from DB, returning static fallback', e);
    }

    return NextResponse.json(blogsData);
}
