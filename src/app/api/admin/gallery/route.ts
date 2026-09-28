import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
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
            const items = await Gallery.find({}).sort({ createdAt: -1 });
            return NextResponse.json(items);
        } else {
            const db = getDB();
            return NextResponse.json(db.gallery || []);
        }
    } catch (error) {
        console.error("Failed to fetch admin gallery items:", error);
        return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = await request.json();
        const { src, category, alt } = data;

        if (!src) {
            return NextResponse.json({ error: 'Image URL (src) is required' }, { status: 400 });
        }

        const conn = await dbConnect();
        if (conn) {
            const newItem = await Gallery.create({
                src,
                category: category || 'Events & Celebrations',
                alt: alt || '',
                createdAt: new Date(),
            });
            return NextResponse.json(newItem);
        } else {
            const db = getDB();
            if (!db.gallery) db.gallery = [];
            const newItem = {
                id: Date.now().toString(),
                src,
                category: category || 'Events & Celebrations',
                alt: alt || '',
                createdAt: new Date().toISOString(),
            };
            db.gallery.unshift(newItem);
            saveDB(db);
            return NextResponse.json(newItem);
        }
    } catch (error) {
        console.error("Failed to create gallery item:", error);
        const message = error instanceof Error ? error.message : 'Failed to create item';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
