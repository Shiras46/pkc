import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { galleryItems as staticGalleryItems } from '@/lib/gallery';
import { getDB } from '@/lib/dbHelper';

export async function GET() {
    try {
        let dynamicItems: any[] = [];
        const conn = await dbConnect();
        
        if (conn) {
            dynamicItems = await Gallery.find({}).sort({ createdAt: -1 });
        } else {
            // Fallback to local db.json
            try {
                const db = getDB();
                dynamicItems = db.gallery || [];
            } catch (err) {
                console.error("Failed to read db.json gallery", err);
            }
        }

        const formattedDynamic = dynamicItems.map((item: any) => ({
            id: item._id ? item._id.toString() : item.id,
            _id: item._id ? item._id.toString() : item.id,
            category: item.category,
            src: item.src,
            alt: item.alt || '',
            createdAt: item.createdAt,
            isDynamic: true,
        }));

        // Merge dynamic gallery items first, followed by static fallback items
        const allItems = [...formattedDynamic, ...staticGalleryItems];

        return NextResponse.json(allItems);
    } catch (error) {
        console.error("Failed to fetch gallery items:", error);
        return NextResponse.json(staticGalleryItems);
    }
}
