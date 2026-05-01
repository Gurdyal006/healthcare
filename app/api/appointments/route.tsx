import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// CREATE
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const exists = await Appointment.findOne({
      doctorId: body.doctorId,
      date: body.date,
      time: body.time,
      status: { $ne: "cancelled" },
    });

    if (exists) {
      return Response.json(
        { message: "Slot already booked" },
        { status: 400 }
      );
    }

    const saved = await Appointment.create(body);

    return Response.json(saved);
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}

// GET (ROLE BASED)
export async function GET() {
  try {
    await connectDB();

    // ✅ get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ message: "No token" }, { status: 401 });
    }

    // ✅ verify user
    const user: any = jwt.verify(token, process.env.JWT_SECRET!);

    let data;

    // ✅ ROLE BASED FILTER
      if (user.role === "admin") {
      // ✅ FULL SYSTEM ACCESS
      data = await Appointment.find().sort({ createdAt: -1 });

    } else if (user.role === "doctor") {
      data = await Appointment.find({
        doctorId: user.userId,
      }).sort({ createdAt: -1 });
    } else {
      data = await Appointment.find({
        patientId: user.userId,
      }).sort({ createdAt: -1 });
    }

    return Response.json(data);
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}