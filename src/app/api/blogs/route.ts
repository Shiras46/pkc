import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = await dbConnect();
        if (db) {
            const blogs = await Blog.find({ published: true }).sort({ date: -1 }).limit(10).lean();
            if (blogs) {
                return NextResponse.json(blogs);
            }
        }
    } catch (e) {
        console.warn('Failed to fetch public blogs from DB:', e);
    }

    return NextResponse.json([]);
}
