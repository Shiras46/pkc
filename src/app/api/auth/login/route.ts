import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { createSessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();

    // Auto-seed default admin only if no users exist in the database yet
    const defaultEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@pkcevents.com";
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "PkcAdminSecure2026!";
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      await User.create({
        email: defaultEmail,
        password: hashedPassword,
      });
    }

    const body = await req.json();
    const password = body.password;
    const email = body.email?.trim().toLowerCase();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Missing credentials" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate cryptographically signed session token
    const token = await createSessionToken(user.email);

    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
