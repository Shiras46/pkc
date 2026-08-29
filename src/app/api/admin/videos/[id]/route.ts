import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VideoReview from '@/models/VideoReview';
import { cookies } from 'next/headers';

async function checkAuth() {
    const session = (await cookies()).get('admin_session');
    return !!session;
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    await dbConnect();
    const data = await request.json();
    
    // Simple parsing to guess platform if not provided and videoUrl changed
    let platform = data.platform;
    if (!platform && data.videoUrl) {
        if (data.videoUrl.includes('instagram.com')) {
            platform = 'instagram';
        } else {
            platform = 'youtube'; // default to youtube
        }
    }

    const updatedData = { ...data };
    if (platform) updatedData.platform = platform;

    const updatedVideo = await VideoReview.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!updatedVideo) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(updatedVideo);
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    await dbConnect();
    const deletedVideo = await VideoReview.findByIdAndDelete(id);
    
    if (!deletedVideo) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
}
