import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  console.log("User found: login", user);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role , name: user.name,},
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  console.log("Login successful, token generated", token);

  const response = NextResponse.json({ message: "Login successful" });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: false, // true in production
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}