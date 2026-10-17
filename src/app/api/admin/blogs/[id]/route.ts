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

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    const blog = await Blog.findById(id).lean();

    if (!blog) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(blog, {
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
    });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const data = await request.json();

    // Remove immutable fields that would throw MongoServerError
    delete data._id;
    delete data.id;

    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: false }
    );

    if (!updatedBlog) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    try {
        revalidatePath('/blog');
        revalidatePath(`/blog/${updatedBlog.slug}`);
        revalidatePath('/', 'layout');
    } catch (err) {
        console.error('Revalidation error:', err);
    }

    return NextResponse.json(updatedBlog, {
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
    });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    const deleted = await Blog.findByIdAndDelete(id);

    try {
        revalidatePath('/blog');
        if (deleted?.slug) {
            revalidatePath(`/blog/${deleted.slug}`);
        }
        revalidatePath('/', 'layout');
    } catch (err) {
        console.error('Revalidation error:', err);
    }

    return NextResponse.json({ success: true });
}

