import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';

async function checkAuth() {
    const sessionCookie = (await cookies()).get('admin_session')?.value;
    const session = await verifySessionToken(sessionCookie);
    return !!session;
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const data = await request.json();

    const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });

    if (!updatedBlog) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
}
