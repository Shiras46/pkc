import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        const newEnquiry = await Enquiry.create({
            name: body.name,
            email: body.email || '',
            phone: body.phone || '',
            service: body.service || body.eventType || 'General Inquiry',
            message: body.message || 'Submitted from Website',
            date: new Date().toISOString().split('T')[0],
            status: "New"
        });

        return NextResponse.json({ success: true, message: "Enquiry submitted successfully", data: newEnquiry });
    } catch (error: any) {
        console.error('Enquiry error:', error);
        return NextResponse.json({ error: "Failed to submit enquiry", details: error?.message }, { status: 500 });
    }
}
