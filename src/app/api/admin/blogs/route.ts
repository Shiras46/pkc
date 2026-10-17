import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function checkAuth() {
    const sessionCookie = (await cookies()).get('admin_session')?.value;
    const session = await verifySessionToken(sessionCookie);
    return !!session;
}

export async function GET() {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const blogs = await Blog.find({}).sort({ date: -1, createdAt: -1, _id: -1 });
    return NextResponse.json(blogs, {
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
    });
}

export async function POST(request: Request) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();

    delete data._id;
    delete data.id;

    const newBlog = await Blog.create({
        ...data,
        date: new Date().toISOString().split('T')[0]
    });

    try {
        revalidatePath('/blog');
        if (newBlog?.slug) {
            revalidatePath(`/blog/${newBlog.slug}`);
        }
        revalidatePath('/', 'layout');
    } catch (err) {
        console.error('Revalidation error:', err);
    }

    return NextResponse.json(newBlog, {
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
    });
}

