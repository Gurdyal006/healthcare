import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// CREATE
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const exists = await Appointment.findOne({
      doctorId: body.doctorId,
      doctor: body.doctorName,
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
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;

  let data;

  if (user.role === "admin") {
    data = await Appointment.find().sort({ createdAt: -1 });
  } else if (user.role === "doctor") {
    data = await Appointment.find({ doctorId: user.id });
  } else {
    data = await Appointment.find({ patientId: user.id });
  }

  return Response.json(data);
}