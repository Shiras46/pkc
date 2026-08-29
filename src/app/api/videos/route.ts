import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VideoReview from '@/models/VideoReview';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();
        const videos = await VideoReview.find({ isActive: true }).sort({ createdAt: -1 });
        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
    }
}
