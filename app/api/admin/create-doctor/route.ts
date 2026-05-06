import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  const { name, email, password, specialization,experience } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  const doctor = await User.create({
    name,
    email,
    password: hashed,
    role: "doctor",
    specialization,
    experience
  });

  return Response.json(doctor);
}