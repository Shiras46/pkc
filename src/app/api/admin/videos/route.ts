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
    
    // Simple parsing to guess platform if not provided
    let platform = data.platform;
    if (!platform && data.videoUrl) {
        if (data.videoUrl.includes('instagram.com')) {
            platform = 'instagram';
        } else {
            platform = 'youtube'; // default to youtube
        }
    }

    const newVideo = await VideoReview.create({
        videoUrl: data.videoUrl,
        platform: platform,
        isActive: data.isActive !== undefined ? data.isActive : true
    });

    return NextResponse.json(newVideo);
}
