import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// CREATE DOCTOR
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, password } = body;

    // check existing
    const exists = await User.findOne({ email });
    if (exists) {
      return Response.json(
        { message: "Doctor already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const doctor = await User.create({
      name,
      email,
      password: hashed,
      role: "doctor", // ✅ key
    });

    return Response.json(doctor);
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

// GET ALL DOCTORS
export async function GET() {
  try {
    await connectDB();

    const doctors = await User.find({ role: "doctor" })
                .select("name specialization email _id profileImage experience gender");

    return Response.json(doctors);
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}