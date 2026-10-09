import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VideoReview from '@/models/VideoReview';
import { cookies } from 'next/headers';
import { getDB, saveDB } from '@/lib/dbHelper';

async function checkAuth() {
    const session = (await cookies()).get('admin_session');
    return !!session;
}

export async function GET() {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const conn = await dbConnect();
        if (conn) {
            const videos = await VideoReview.find({}).sort({ createdAt: -1 });
            return NextResponse.json(videos);
        } else {
            const db = getDB();
            return NextResponse.json(db.videoReviews || []);
        }
    } catch (error) {
        console.error("Failed to fetch admin videos:", error);
        const db = getDB();
        return NextResponse.json(db.videoReviews || []);
    }
}

export async function POST(request: Request) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await request.json();

        let platform = data.platform;
        if (!platform && data.videoUrl) {
            if (data.videoUrl.includes('instagram.com') || data.videoUrl.includes('instagr.am')) {
                platform = 'instagram';
            } else if (data.videoUrl.includes('youtube.com') || data.videoUrl.includes('youtu.be')) {
                platform = 'youtube';
            } else {
                platform = 'custom';
            }
        }

        const conn = await dbConnect();
        if (conn) {
            const newVideo = await VideoReview.create({
                title: data.title || '',
                videoUrl: data.videoUrl,
                thumbnailUrl: data.thumbnailUrl || '',
                platform: platform || 'youtube',
                isActive: data.isActive !== undefined ? data.isActive : true
            });
            return NextResponse.json(newVideo);
        } else {
            const db = getDB();
            if (!db.videoReviews) db.videoReviews = [];
            const newVideo = {
                id: Date.now().toString(),
                _id: Date.now().toString(),
                title: data.title || '',
                videoUrl: data.videoUrl,
                thumbnailUrl: data.thumbnailUrl || '',
                platform: platform || 'youtube',
                isActive: data.isActive !== undefined ? data.isActive : true,
                createdAt: new Date().toISOString()
            };
            db.videoReviews.unshift(newVideo);
            saveDB(db);
            return NextResponse.json(newVideo);
        }
    } catch (error) {
        console.error("Failed to create video:", error);
        return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
    }
}

