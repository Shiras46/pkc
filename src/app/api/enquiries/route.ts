import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        const newEnquiry = await Enquiry.create({
            name: body.name,
            email: body.email,
            phone: body.phone,
            service: body.service,
            message: body.message,
            date: new Date().toISOString().split('T')[0],
            status: "New"
        });

        return NextResponse.json({ success: true, message: "Enquiry submitted successfully" });
    } catch (error) {
        console.error('Enquiry error:', error);
        return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
    }
}
