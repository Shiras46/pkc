import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const db = await dbConnect();
        if (db) {
            const blogs = await Blog.find({ published: true })
                .sort({ date: -1, createdAt: -1, _id: -1 })
                .limit(10)
                .lean();
            if (blogs) {
                return NextResponse.json(blogs, {
                    headers: {
                        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
                    },
                });
            }
        }
    } catch (e) {
        console.warn('Failed to fetch public blogs from DB:', e);
    }

    return NextResponse.json([], {
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
    });
}
