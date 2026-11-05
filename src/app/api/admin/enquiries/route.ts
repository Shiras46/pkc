import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { cookies } from 'next/headers';
import { verifySessionToken } from '@/lib/auth';

async function checkAuth() {
    const sessionCookie = (await cookies()).get('admin_session')?.value;
    const session = await verifySessionToken(sessionCookie);
    return !!session;
}

export async function GET() {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        await dbConnect();
        const enquiries = await Enquiry.find({}).sort({ _id: -1 }).lean();
        
        const formatted = enquiries.map((item: any) => ({
            ...item,
            id: item._id ? item._id.toString() : item.id,
            service: item.service || item.eventType || 'General Inquiry',
            date: item.date || (item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : ''),
            status: item.status || 'New',
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        console.error('Admin GET enquiries error:', error);
        return NextResponse.json({ error: error?.message || 'Failed to fetch enquiries' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        await dbConnect();
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing enquiry id or status' }, { status: 400 });
        }

        const updated = await Enquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updated });
    } catch (error: any) {
        console.error('Admin PATCH enquiry error:', error);
        return NextResponse.json({ error: error?.message || 'Failed to update enquiry' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing enquiry id' }, { status: 400 });
        }

        await Enquiry.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: 'Enquiry deleted' });
    } catch (error: any) {
        console.error('Admin DELETE enquiry error:', error);
        return NextResponse.json({ error: error?.message || 'Failed to delete enquiry' }, { status: 500 });
    }
}
