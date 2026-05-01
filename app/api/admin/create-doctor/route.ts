import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  const { name, email, password, specialization } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  const doctor = await User.create({
    name,
    email,
    password: hashed,
    role: "doctor",
    specialization,
  });

  return Response.json(doctor);
}