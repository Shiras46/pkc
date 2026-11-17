import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { createSessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const password = body.password;
    const email = body.email?.trim().toLowerCase();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Missing credentials" },
        { status: 400 }
      );
    }

    // Default admin credentials from env or fallback
    const defaultEmail = (process.env.ADMIN_DEFAULT_EMAIL || "admin@pkcevents.com").trim().toLowerCase();
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "PkcAdminSecure2026!";

    let user = await User.findOne({ email });

    // Auto-seed default admin if it doesn't exist yet
    if (!user && email === defaultEmail) {
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      user = await User.create({
        email: defaultEmail,
        password: hashedPassword,
      });
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    let isMatch = await bcrypt.compare(password, user.password);

    // If logging in as default admin and the entered password matches the configured defaultPassword
    // (e.g. if the DB had an old hash or ADMIN_DEFAULT_PASSWORD was updated in .env), auto-sync and allow
    if (!isMatch && email === defaultEmail && password === defaultPassword) {
      const newHash = await bcrypt.hash(defaultPassword, 10);
      await User.updateOne({ email: defaultEmail }, { password: newHash });
      isMatch = true;
    }

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
