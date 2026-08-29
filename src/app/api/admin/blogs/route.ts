import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { cookies } from 'next/headers';

async function checkAuth() {
    const session = (await cookies()).get('admin_session');
    return !!session;
}

export async function GET() {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ date: -1 });
    return NextResponse.json(blogs);
}

export async function POST(request: Request) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();

    const newBlog = await Blog.create({
        ...data,
        date: new Date().toISOString().split('T')[0]
    });

    return NextResponse.json(newBlog);
}
