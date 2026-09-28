import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VideoReview from '@/models/VideoReview';
import { cookies } from 'next/headers';

async function checkAuth() {
    const session = (await cookies()).get('admin_session');
    return !!session;
}

export async function GET() {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    const videos = await VideoReview.find({}).sort({ createdAt: -1 });
    return NextResponse.json(videos);
}

export async function POST(request: Request) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();
    
    // Auto-detect platform if not explicitly provided
    let platform = data.platform;
    if (!platform && data.videoUrl) {
        if (data.videoUrl.includes('instagram.com')) {
            platform = 'instagram';
        } else if (data.videoUrl.includes('youtube.com') || data.videoUrl.includes('youtu.be')) {
            platform = 'youtube';
        } else {
            platform = 'custom';
        }
    }

    const newVideo = await VideoReview.create({
        title: data.title || '',
        videoUrl: data.videoUrl,
        thumbnailUrl: data.thumbnailUrl || '',
        platform: platform || 'youtube',
        isActive: data.isActive !== undefined ? data.isActive : true
    });

    return NextResponse.json(newVideo);
}
