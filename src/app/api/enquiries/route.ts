import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        const serviceName = body.service || body.eventType || 'General Inquiry';
        const todayStr = new Date().toISOString().split('T')[0];

        const newEnquiry = await Enquiry.create({
            name: body.name || 'Website Visitor',
            email: body.email || '',
            phone: body.phone || '',
            service: serviceName,
            eventType: serviceName,
            eventDate: body.eventDate || body.date || '',
            guestCount: body.guestCount ? Number(body.guestCount) : undefined,
            message: body.message || 'Submitted from Website',
            date: body.date || todayStr,
            status: body.status || "New"
        });

        return NextResponse.json({ 
            success: true, 
            message: "Enquiry submitted successfully", 
            data: newEnquiry 
        });
    } catch (error: any) {
        console.error('Enquiry submission error:', error);
        return NextResponse.json({ 
            error: "Failed to submit enquiry", 
            details: error?.message || 'Unknown database error' 
        }, { status: 500 });
    }
}
