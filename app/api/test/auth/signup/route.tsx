import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  const { name, email, password, role } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) {
    return Response.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return Response.json({ message: "Signup successful" });
}