import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VideoReview from '@/models/VideoReview';
import { cookies } from 'next/headers';
import { getDB, saveDB } from '@/lib/dbHelper';
import { verifySessionToken } from '@/lib/auth';

async function checkAuth() {
    const sessionCookie = (await cookies()).get('admin_session')?.value;
    const session = await verifySessionToken(sessionCookie);
    return !!session;
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await context.params;
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

        const updatedData = { ...data };
        if (platform) updatedData.platform = platform;

        const conn = await dbConnect();
        if (conn) {
            const updatedVideo = await VideoReview.findByIdAndUpdate(id, updatedData, { new: true });
            if (!updatedVideo) {
                return NextResponse.json({ error: 'Video not found' }, { status: 404 });
            }
            return NextResponse.json(updatedVideo);
        } else {
            const db = getDB();
            if (!db.videoReviews) db.videoReviews = [];
            const index = db.videoReviews.findIndex((v: { _id?: string; id?: string }) => v._id === id || v.id === id);
            if (index === -1) {
                return NextResponse.json({ error: 'Video not found' }, { status: 404 });
            }
            db.videoReviews[index] = { ...db.videoReviews[index], ...updatedData };
            saveDB(db);
            return NextResponse.json(db.videoReviews[index]);
        }
    } catch (error) {
        console.error("Failed to update video:", error);
        return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await context.params;
        const conn = await dbConnect();
        if (conn) {
            const deletedVideo = await VideoReview.findByIdAndDelete(id);
            if (!deletedVideo) {
                return NextResponse.json({ error: 'Video not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true });
        } else {
            const db = getDB();
            if (!db.videoReviews) db.videoReviews = [];
            db.videoReviews = db.videoReviews.filter((v: { _id?: string; id?: string }) => v._id !== id && v.id !== id);
            saveDB(db);
            return NextResponse.json({ success: true });
        }
    } catch (error) {
        console.error("Failed to delete video:", error);
        return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
    }
}
