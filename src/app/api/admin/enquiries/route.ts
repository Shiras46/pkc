import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
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
    const enquiries = await Enquiry.find({}).sort({ _id: -1 });
    return NextResponse.json(enquiries);
}
