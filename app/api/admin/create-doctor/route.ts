import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, specialization, experience, gender } = body;

    // 🔐 Default password (if you want)
    const defaultPassword = "123456";

    // ✅ validation
    if (!name || !email) {
      return Response.json(
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    // ❌ check duplicate email
    const exists = await User.findOne({ email });
    if (exists) {
      return Response.json(
        { message: "Doctor already exists" },
        { status: 400 }
      );
    }

    // 🔐 hash password
    const hashed = await bcrypt.hash(defaultPassword, 10);

    const doctor = await User.create({
      name,
      email,
      password: hashed,
      role: "doctor",
      specialization,
      experience,
      gender: body.gender || "Not specified",
      profileImage: body.profileImage || "https://randomuser.me/api/portraits/lego/5.jpg", // optional
    });

    // console.log("Created doctor:", doctor);

    return Response.json({"message": "Doctor created successfully", doctor});

  } catch (err: any) {
    return Response.json(
      { message: err.message },
      { status: 500 }
    );
  }
}