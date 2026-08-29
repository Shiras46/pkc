import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    await dbConnect();

    // Auto-seed/reset default admin to ensure the code-defined credentials always work
    const defaultEmail = "admin@pkcevents.com";
    const defaultPassword = "PkcAdminSecure2026!";
    const adminExists = await User.findOne({ email: defaultEmail });
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    if (!adminExists) {
      await User.create({
        email: defaultEmail,
        password: hashedPassword,
      });
    } else {
      // If user exists, force reset/update password using updateOne to avoid Mongoose tracking issues
      await User.updateOne({ email: defaultEmail }, { password: hashedPassword });
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
      console.error("Login failed: User not found for email:", email);
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.error("Login failed: Invalid password for email:", email);
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // ✅ Create response
    const response = NextResponse.json({ success: true });

    // ✅ Set cookie via response (NO TypeScript error)
    response.cookies.set("admin_session", crypto.randomUUID(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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
