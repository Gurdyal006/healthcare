import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import mongoose from "mongoose";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid ID" }, { status: 400 });
    }

    const updated = await Appointment.findByIdAndUpdate(id, body, {
      new: true,
    });

    return Response.json(updated);
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}