import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    const sessionCookie = (await cookies()).get("admin_session")?.value;
    const session = await verifySessionToken(sessionCookie);
    if (!session) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  try {
    const conn = await dbConnect();
    return NextResponse.json({
      success: !!conn,
      message: conn ? "MongoDB connected successfully" : "MongoDB connection failed",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "MongoDB connection failed" },
      { status: 500 }
    );
  }
}
