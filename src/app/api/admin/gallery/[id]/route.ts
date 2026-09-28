import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { cookies } from 'next/headers';
import { getDB, saveDB } from '@/lib/dbHelper';

async function checkAuth() {
    const session = (await cookies()).get('admin_session');
    return !!session;
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();

    try {
        const conn = await dbConnect();
        if (conn) {
            const updatedItem = await Gallery.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true }
            );
            if (!updatedItem) {
                return NextResponse.json({ error: 'Item not found' }, { status: 404 });
            }
            return NextResponse.json(updatedItem);
        } else {
            const db = getDB();
            if (!db.gallery) db.gallery = [];
            const index = db.gallery.findIndex((item: any) => item.id === id || item._id === id);
            if (index === -1) {
                return NextResponse.json({ error: 'Item not found' }, { status: 404 });
            }
            db.gallery[index] = { ...db.gallery[index], ...data };
            saveDB(db);
            return NextResponse.json(db.gallery[index]);
        }
    } catch (error) {
        console.error("Failed to update gallery item:", error);
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    try {
        const conn = await dbConnect();
        if (conn) {
            await Gallery.findByIdAndDelete(id);
            return NextResponse.json({ success: true });
        } else {
            const db = getDB();
            if (db.gallery) {
                db.gallery = db.gallery.filter((item: any) => item.id !== id && item._id !== id);
                saveDB(db);
            }
            return NextResponse.json({ success: true });
        }
    } catch (error) {
        console.error("Failed to delete gallery item:", error);
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
}
